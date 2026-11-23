"use server";

import { revalidatePath } from "next/cache";
import * as z from "zod";
import { toErrorState } from "@/lib/action-helpers";
import { generateTaskSuggestions } from "@/lib/ai/generate";
import { AiError } from "@/lib/ai/errors";
import { getAiModels } from "@/lib/ai/models";
import { createRateLimiter } from "@/lib/ai/rate-limit";
import type { GeneratedTask } from "@/lib/ai/types";
import { fetchProject, fetchProjectTasks } from "@/lib/api/abricot";
import { ApiError } from "@/lib/api/client";
import { authedRequest, requireUser } from "@/lib/auth/dal";

export type GenerateTasksResult =
  | { status: "success"; tasks: GeneratedTask[]; contextCount: number }
  | { status: "error"; message: string };

const promptSchema = z
  .string()
  .trim()
  .min(3, { error: "Décrivez les tâches souhaitées (3 caractères minimum)." })
  .max(1000, { error: "1000 caractères maximum." });

// 10 generations per minute and per user.
const consumeGeneration = createRateLimiter(10, 60_000);

/**
 * Generates task suggestions for a project with the RAG pipeline. The project
 * and its tasks are loaded with the user's token: a non-member gets a 403 from
 * the backend and cannot use the feature on that project.
 */
export async function generateTasks(
  projectId: string,
  prompt: string,
): Promise<GenerateTasksResult> {
  const parsedPrompt = promptSchema.safeParse(prompt);
  if (!parsedPrompt.success)
    return { status: "error", message: parsedPrompt.error.issues[0].message };

  const user = await requireUser();
  if (!consumeGeneration(user.id).allowed) {
    return {
      status: "error",
      message: "Trop de demandes : patientez une minute avant de relancer l'IA.",
    };
  }

  try {
    const [project, tasks] = await Promise.all([
      fetchProject(projectId),
      fetchProjectTasks(projectId),
    ]);
    const { llm, embedModel } = getAiModels();
    const result = await generateTaskSuggestions({
      project,
      existingTasks: tasks.map(({ id, title, description, status }) => ({
        id,
        title,
        description,
        status,
      })),
      request: parsedPrompt.data,
      llm,
      embedModel,
    });
    return { status: "success", tasks: result.tasks, contextCount: result.contextTasks.length };
  } catch (error) {
    if (error instanceof AiError) return { status: "error", message: error.message };
    if (error instanceof ApiError) {
      const state = toErrorState(error, "Le projet n'a pas pu être chargé.");
      return { status: "error", message: state.status === "error" ? state.message : "" };
    }
    throw error;
  }
}

const generatedTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, { error: "Chaque tâche doit avoir un titre (2 caractères minimum)." })
    .max(200),
  description: z.string().trim().max(1000),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).default("MEDIUM"),
});
const generatedTasksSchema = z
  .array(generatedTaskSchema)
  .min(1, { error: "Aucune tâche à ajouter." })
  .max(20);

/**
 * Saves the tasks reviewed by the user: they are automatically attached to the
 * current project (functional spec §4, "Association au projet").
 */
export async function saveGeneratedTasks(
  projectId: string,
  tasks: GeneratedTask[],
): Promise<{ status: "success"; message: string } | { status: "error"; message: string }> {
  const parsed = generatedTasksSchema.safeParse(tasks);
  if (!parsed.success) return { status: "error", message: parsed.error.issues[0].message };

  let created = 0;
  try {
    // Sequential creation keeps the order chosen by the AI and the user.
    for (const task of parsed.data) {
      await authedRequest(`/projects/${encodeURIComponent(projectId)}/tasks`, {
        method: "POST",
        body: {
          title: task.title,
          description: task.description || undefined,
          priority: task.priority,
        },
      });
      created += 1;
    }
  } catch (error) {
    revalidatePath(`/projects/${projectId}`);
    const state = toErrorState(error, "L'enregistrement des tâches a échoué.");
    const message = state.status === "error" ? state.message : "";
    return {
      status: "error",
      message: created ? `${created} tâche(s) ajoutée(s), puis erreur : ${message}` : message,
    };
  }

  revalidatePath(`/projects/${projectId}`);
  revalidatePath("/dashboard");
  revalidatePath("/projects");
  return {
    status: "success",
    message: `${created} tâche${created > 1 ? "s" : ""} ajoutée${created > 1 ? "s" : ""} au projet.`,
  };
}
