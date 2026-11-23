import "server-only";
import { BaseEmbedding, Document, Settings, VectorStoreIndex } from "llamaindex";
import type { ContextTask } from "./types";

/** Number of existing tasks given to the model as context. */
export const SIMILAR_TASKS_TOP_K = 6;
/** Upper bound of tasks indexed per request, to bound the embedding cost. */
const MAX_INDEXED_TASKS = 200;

/** Text that represents a task in the vector index. */
export function taskToText(task: ContextTask) {
  return `${task.title}\n${task.description ?? ""}`.trim();
}

/**
 * Retrieval step of the RAG pipeline (LlamaIndex.TS): each existing task of the
 * project becomes a Document, the documents are embedded into an in-memory
 * VectorStoreIndex, and the tasks closest to the user request are retrieved.
 */
export async function retrieveSimilarTasks(
  tasks: ContextTask[],
  request: string,
  embedModel: BaseEmbedding,
  topK = SIMILAR_TASKS_TOP_K,
): Promise<ContextTask[]> {
  if (!tasks.length) return [];
  const indexed = tasks.slice(0, MAX_INDEXED_TASKS);
  const byId = new Map(indexed.map((task) => [task.id, task]));

  const documents = indexed.map(
    (task) => new Document({ id_: task.id, text: taskToText(task), metadata: { taskId: task.id, status: task.status } }),
  );

  return Settings.withEmbedModel(embedModel, async () => {
    const index = await VectorStoreIndex.fromDocuments(documents);
    const retriever = index.asRetriever({ similarityTopK: Math.min(topK, indexed.length) });
    const results = await retriever.retrieve({ query: request });
    return results
      .map((result) => byId.get(String(result.node.metadata.taskId)))
      .filter((task): task is ContextTask => Boolean(task));
  });
}
