import type { TaskPriority, TaskStatus } from "@/lib/types";

/** Task proposed by the AI, editable by the user before being saved. */
export interface GeneratedTask {
  title: string;
  description: string;
  priority: TaskPriority;
}

/** Existing task of the project, as given to the retrieval step. */
export interface ContextTask {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
}

/** Minimal chat interface: satisfied by LlamaIndex's MistralAI and by the fake model. */
export interface ChatModel {
  chat(params: {
    messages: { role: "system" | "user" | "assistant"; content: string }[];
  }): Promise<{ message: { content: unknown } }>;
}
