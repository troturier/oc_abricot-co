import "server-only";
import { MistralAI, MistralAIEmbedding } from "@llamaindex/mistral";
import { BaseEmbedding } from "llamaindex";
import { AiError } from "./errors";
import type { ChatModel } from "./types";

export const MISTRAL_CHAT_MODEL = "mistral-small-latest";

/**
 * Wraps an embedding model with an in-memory cache: the tasks of a project are
 * re-indexed on every generation, so their vectors are reused between requests.
 */
export class CachedEmbedding extends BaseEmbedding {
  private cache = new Map<string, number[]>();

  constructor(
    private readonly inner: BaseEmbedding,
    private readonly maxEntries = 5000,
  ) {
    super();
  }

  async getTextEmbedding(text: string) {
    const cached = this.cache.get(text);
    if (cached) return cached;
    const vector = await this.inner.getTextEmbedding(text);
    if (this.cache.size >= this.maxEntries)
      this.cache.delete(this.cache.keys().next().value as string);
    this.cache.set(text, vector);
    return vector;
  }
}

/**
 * Deterministic embedding used by the automated tests (AI_PROVIDER=fake):
 * a hashed bag of words, so that texts sharing words are close.
 */
export class FakeEmbedding extends BaseEmbedding {
  constructor(private readonly dimensions = 256) {
    super();
  }

  async getTextEmbedding(text: string) {
    const vector = new Array<number>(this.dimensions).fill(0);
    const words =
      text
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase()
        .match(/[a-z0-9]{3,}/g) ?? [];
    for (const word of words) {
      let hash = 0;
      for (const char of word) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
      vector[hash % this.dimensions] += 1;
    }
    return vector;
  }
}

/** Deterministic chat model used by the automated tests (AI_PROVIDER=fake). */
export const fakeChatModel: ChatModel = {
  async chat({ messages }) {
    const request =
      messages
        .at(-1)
        ?.content.match(/"""\n([\s\S]*?)\n"""/)?.[1]
        ?.trim() ?? "la demande";
    const subject = request.slice(0, 60);
    return {
      message: {
        content: JSON.stringify({
          tasks: [
            {
              title: `Analyser le besoin : ${subject}`,
              description: "Recenser les attentes et les contraintes.",
              priority: "HIGH",
            },
            {
              title: `Réaliser : ${subject}`,
              description: "Développer la fonctionnalité demandée.",
              priority: "MEDIUM",
            },
            {
              title: `Tester : ${subject}`,
              description: "Vérifier le bon fonctionnement et corriger les anomalies.",
              priority: "MEDIUM",
            },
          ],
        }),
      },
    };
  },
};

let mistralModels: { llm: ChatModel; embedModel: BaseEmbedding } | null = null;

/**
 * Models of the RAG pipeline. The Mistral API key is only read on the server
 * (never prefixed with NEXT_PUBLIC_), so it never reaches the browser.
 */
export function getAiModels(): { llm: ChatModel; embedModel: BaseEmbedding } {
  if (process.env.AI_PROVIDER === "fake") {
    return { llm: fakeChatModel, embedModel: new FakeEmbedding() };
  }
  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    throw new AiError("config", "La génération par IA n'est pas configurée sur ce serveur.");
  }
  mistralModels ??= {
    llm: new MistralAI({ apiKey, model: MISTRAL_CHAT_MODEL, temperature: 0.3, maxTokens: 1500 }),
    embedModel: new CachedEmbedding(new MistralAIEmbedding({ apiKey })),
  };
  return mistralModels;
}
