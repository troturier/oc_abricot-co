import "server-only";
import type { BaseEmbedding } from "llamaindex";
import { contentToText, parseGeneratedTasks } from "./parse";
import { buildUserPrompt, SYSTEM_PROMPT } from "./prompt";
import { retrieveSimilarTasks } from "./retrieval";
import { AiError, toAiError } from "./errors";
import type { ChatModel, ContextTask, GeneratedTask } from "./types";

interface GenerateParams {
  project: { name: string; description: string | null };
  existingTasks: ContextTask[];
  request: string;
  llm: ChatModel;
  embedModel: BaseEmbedding;
}

/**
 * RAG pipeline: 1) retrieve the existing tasks similar to the request,
 * 2) augment the prompt with them, 3) generate and validate the task list.
 * The generation is retried once when the model answer is not valid JSON.
 */
export async function generateTaskSuggestions({
  project,
  existingTasks,
  request,
  llm,
  embedModel,
}: GenerateParams): Promise<{ tasks: GeneratedTask[]; contextTasks: ContextTask[] }> {
  try {
    const contextTasks = await retrieveSimilarTasks(existingTasks, request, embedModel);
    const messages = [
      { role: "system" as const, content: SYSTEM_PROMPT },
      {
        role: "user" as const,
        content: buildUserPrompt({
          projectName: project.name,
          projectDescription: project.description,
          similarTasks: contextTasks,
          totalTasks: existingTasks.length,
          request,
        }),
      },
    ];

    for (let attempt = 1; attempt <= 2; attempt += 1) {
      const response = await llm.chat({ messages });
      try {
        return {
          tasks: parseGeneratedTasks(contentToText(response.message.content)),
          contextTasks,
        };
      } catch (parseError) {
        if (attempt === 2) {
          console.error("Invalid AI output", parseError);
          throw new AiError(
            "invalid-output",
            "L'IA n'a pas renvoyé de tâches exploitables. Reformulez votre demande.",
          );
        }
      }
    }
    throw new AiError("invalid-output", "L'IA n'a pas renvoyé de tâches exploitables.");
  } catch (error) {
    if (!(error instanceof AiError)) console.error("AI generation failed", error);
    throw toAiError(error);
  }
}
