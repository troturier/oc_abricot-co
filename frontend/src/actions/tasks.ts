"use server";

import { revalidatePath } from "next/cache";
import { readList, readText, toErrorState, validationError } from "@/lib/action-helpers";
import type { ActionState } from "@/lib/action-state";
import { authedRequest } from "@/lib/auth/dal";
import type { Task, TaskStatus } from "@/lib/types";
import { commentSchema, taskSchema, toFieldErrors } from "@/lib/validation";

const tasksPath = (projectId: string) => `/projects/${encodeURIComponent(projectId)}/tasks`;
const taskPath = (projectId: string, taskId: string) =>
  `${tasksPath(projectId)}/${encodeURIComponent(taskId)}`;

function parseTaskForm(formData: FormData) {
  return taskSchema.safeParse({
    title: readText(formData, "title"),
    description: readText(formData, "description"),
    dueDate: readText(formData, "dueDate"),
    assigneeIds: readList(formData, "assigneeIds"),
    status: readText(formData, "status") || undefined,
  });
}

/** Revalidates every page that lists tasks (project, dashboard). */
function revalidateTaskPages(projectId: string) {
  revalidatePath(`/projects/${projectId}`);
  revalidatePath("/dashboard");
  revalidatePath("/projects");
}

/**
 * Creates a task. The backend creation route ignores the status (always TODO),
 * so a second call sets the chosen status when it differs.
 */
export async function createTask(
  projectId: string,
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = parseTaskForm(formData);
  if (!parsed.success) return validationError(toFieldErrors(parsed.error));

  const { status, ...fields } = parsed.data;
  try {
    const { task } = await authedRequest<{ task: Task }>(tasksPath(projectId), {
      method: "POST",
      body: fields,
    });
    if (status !== "TODO") {
      await authedRequest(taskPath(projectId, task.id), { method: "PUT", body: { status } });
    }
    revalidateTaskPages(projectId);
    return { status: "success", message: "Tâche créée.", id: task.id };
  } catch (error) {
    return toErrorState(error, "La création de la tâche a échoué.");
  }
}

export async function updateTask(
  projectId: string,
  taskId: string,
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = parseTaskForm(formData);
  if (!parsed.success) return validationError(toFieldErrors(parsed.error));

  try {
    await authedRequest(taskPath(projectId, taskId), { method: "PUT", body: parsed.data });
    revalidateTaskPages(projectId);
    return { status: "success", message: "Tâche modifiée.", id: taskId };
  } catch (error) {
    return toErrorState(error, "La modification de la tâche a échoué.");
  }
}

export async function updateTaskStatus(
  projectId: string,
  taskId: string,
  status: TaskStatus,
): Promise<ActionState> {
  try {
    await authedRequest(taskPath(projectId, taskId), { method: "PUT", body: { status } });
    revalidateTaskPages(projectId);
    return { status: "success", message: "Statut mis à jour." };
  } catch (error) {
    return toErrorState(error, "La mise à jour du statut a échoué.");
  }
}

export async function deleteTask(projectId: string, taskId: string): Promise<ActionState> {
  try {
    await authedRequest(taskPath(projectId, taskId), { method: "DELETE" });
    revalidateTaskPages(projectId);
    return { status: "success", message: "Tâche supprimée." };
  } catch (error) {
    return toErrorState(error, "La suppression de la tâche a échoué.");
  }
}

export async function addComment(
  projectId: string,
  taskId: string,
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = commentSchema.safeParse({ content: readText(formData, "content") });
  if (!parsed.success) return validationError(toFieldErrors(parsed.error));

  try {
    await authedRequest(`${taskPath(projectId, taskId)}/comments`, {
      method: "POST",
      body: parsed.data,
    });
    revalidateTaskPages(projectId);
    return { status: "success", message: "Commentaire ajouté." };
  } catch (error) {
    return toErrorState(error, "L'ajout du commentaire a échoué.");
  }
}
