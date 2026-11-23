import * as z from "zod";
import { MAX_GENERATED_TASKS } from "./prompt";
import type { GeneratedTask } from "./types";

const generatedTaskSchema = z.object({
  title: z.string().trim().min(2).max(200),
  description: z.string().trim().max(1000).default(""),
  priority: z
    .enum(["LOW", "MEDIUM", "HIGH", "URGENT"])
    .catch("MEDIUM")
    .default("MEDIUM"),
});

const responseSchema = z.object({
  tasks: z.array(z.unknown()).min(1),
});

/** Extracts the first JSON object of a model answer (tolerates ```json fences and prose). */
function extractJson(text: string) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : text;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start === -1 || end <= start) throw new Error("No JSON object in the model answer");
  return JSON.parse(candidate.slice(start, end + 1));
}

/** Turns the model content (string or content parts) into plain text. */
export function contentToText(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((part) => (typeof part === "object" && part && "text" in part ? String(part.text) : ""))
      .join("");
  }
  return "";
}

/**
 * Validates the model answer. Invalid items are dropped rather than failing the
 * whole generation; duplicates (same title) are removed; the list is capped.
 */
export function parseGeneratedTasks(text: string): GeneratedTask[] {
  const { tasks } = responseSchema.parse(extractJson(text));
  const seen = new Set<string>();
  const result: GeneratedTask[] = [];
  for (const item of tasks) {
    const parsed = generatedTaskSchema.safeParse(item);
    if (!parsed.success) continue;
    const key = parsed.data.title.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(parsed.data);
  }
  if (!result.length) throw new Error("The model answer contains no valid task");
  return result.slice(0, MAX_GENERATED_TASKS);
}
