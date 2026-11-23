import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { generateTasks, saveGeneratedTasks } from "@/actions/ai";
import { generateTaskSuggestions } from "@/lib/ai/generate";
import { CachedEmbedding, FakeEmbedding, fakeChatModel } from "@/lib/ai/models";
import { retrieveSimilarTasks } from "@/lib/ai/retrieval";
import type { ChatModel, ContextTask } from "@/lib/ai/types";
import { API, fail, http, ok, server, signIn } from "../helpers/backend";
import { alice, makeProject, makeTask } from "../helpers/fixtures";

const existingTasks: ContextTask[] = [
  {
    id: "1",
    title: "Intégrer le paiement Stripe",
    description: "Paiement par carte bancaire",
    status: "IN_PROGRESS",
  },
  {
    id: "2",
    title: "Créer la page panier",
    description: "Liste des produits du panier",
    status: "DONE",
  },
  {
    id: "3",
    title: "Rédiger les mentions légales",
    description: "Pages CGV et RGPD",
    status: "TODO",
  },
  {
    id: "4",
    title: "Optimiser les images",
    description: "Compression et formats modernes",
    status: "TODO",
  },
];

describe("RAG retrieval with LlamaIndex", () => {
  it("returns the existing tasks closest to the request", async () => {
    const similar = await retrieveSimilarTasks(
      existingTasks,
      "paiement par carte et remboursement",
      new FakeEmbedding(),
      2,
    );
    expect(similar[0].id).toBe("1");
    expect(similar).toHaveLength(2);
  });

  it("does nothing for a project without tasks", async () => {
    await expect(retrieveSimilarTasks([], "n'importe quoi", new FakeEmbedding())).resolves.toEqual(
      [],
    );
  });

  it("caches embeddings between requests", async () => {
    const inner = new FakeEmbedding();
    const spy = vi.spyOn(inner, "getTextEmbedding");
    const cached = new CachedEmbedding(inner);
    await cached.getTextEmbedding("Créer la page panier");
    await cached.getTextEmbedding("Créer la page panier");
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe("generateTaskSuggestions", () => {
  const project = { name: "Boutique", description: "Site e-commerce" };

  it("augments the prompt with the retrieved tasks before generating", async () => {
    const chat = vi.fn<ChatModel["chat"]>().mockResolvedValue({
      message: {
        content:
          '{"tasks":[{"title":"Gérer les remboursements","description":"Via Stripe","priority":"HIGH"}]}',
      },
    });
    const result = await generateTaskSuggestions({
      project,
      existingTasks,
      request: "Ajouter les remboursements de paiement",
      llm: { chat },
      embedModel: new FakeEmbedding(),
    });
    expect(result.tasks).toEqual([
      { title: "Gérer les remboursements", description: "Via Stripe", priority: "HIGH" },
    ]);
    const [{ messages }] = chat.mock.calls[0];
    expect(messages[0].role).toBe("system");
    expect(messages[1].content).toContain("Intégrer le paiement Stripe");
    expect(result.contextTasks.map((task) => task.id)).toContain("1");
  });

  it("retries once when the answer is not valid JSON", async () => {
    const chat = vi
      .fn<ChatModel["chat"]>()
      .mockResolvedValueOnce({ message: { content: "Désolé" } })
      .mockResolvedValueOnce({ message: { content: '{"tasks":[{"title":"Tâche valide"}]}' } });
    const result = await generateTaskSuggestions({
      project,
      existingTasks: [],
      request: "x",
      llm: { chat },
      embedModel: new FakeEmbedding(),
    });
    expect(chat).toHaveBeenCalledTimes(2);
    expect(result.tasks[0].title).toBe("Tâche valide");
  });

  it("gives up with a clear message after two invalid answers", async () => {
    const chat = vi
      .fn<ChatModel["chat"]>()
      .mockResolvedValue({ message: { content: "pas de JSON" } });
    await expect(
      generateTaskSuggestions({
        project,
        existingTasks: [],
        request: "x",
        llm: { chat },
        embedModel: new FakeEmbedding(),
      }),
    ).rejects.toMatchObject({ kind: "invalid-output" });
  });

  it("maps quota and authentication errors of the provider", async () => {
    const failing = (statusCode: number): ChatModel => ({
      chat: () => Promise.reject(Object.assign(new Error("API error"), { statusCode })),
    });
    const params = { project, existingTasks: [], request: "x", embedModel: new FakeEmbedding() };
    vi.spyOn(console, "error").mockImplementation(() => {});
    await expect(generateTaskSuggestions({ ...params, llm: failing(429) })).rejects.toMatchObject({
      kind: "quota",
    });
    await expect(generateTaskSuggestions({ ...params, llm: failing(401) })).rejects.toMatchObject({
      kind: "config",
    });
    await expect(generateTaskSuggestions({ ...params, llm: failing(503) })).rejects.toMatchObject({
      kind: "unavailable",
    });
  });

  it("fake model used by the end-to-end tests returns 3 tasks", async () => {
    const result = await generateTaskSuggestions({
      project,
      existingTasks,
      request: "Newsletter",
      llm: fakeChatModel,
      embedModel: new FakeEmbedding(),
    });
    expect(result.tasks).toHaveLength(3);
  });
});

describe("AI Server Actions", () => {
  const previousProvider = process.env.AI_PROVIDER;
  const previousKey = process.env.MISTRAL_API_KEY;
  beforeEach(() => {
    process.env.AI_PROVIDER = "fake";
  });
  afterEach(() => {
    process.env.AI_PROVIDER = previousProvider;
    process.env.MISTRAL_API_KEY = previousKey;
  });

  function mockProject(status = 200) {
    server.use(
      http.get(`${API}/auth/profile`, () => ok({ user: alice })),
      http.get(`${API}/projects/p1`, () =>
        status === 200 ? ok({ project: makeProject() }) : fail(status, "Accès refusé à ce projet"),
      ),
      http.get(`${API}/projects/p1/tasks`, () => ok({ tasks: [makeTask()] })),
    );
  }

  it("generates suggestions for a member of the project", async () => {
    signIn();
    mockProject();
    const result = await generateTasks("p1", "Mettre en place la newsletter");
    expect(result).toMatchObject({ status: "success", contextCount: 1 });
    if (result.status === "success") expect(result.tasks).toHaveLength(3);
  });

  it("refuses a project the user cannot access", async () => {
    signIn();
    mockProject(403);
    await expect(generateTasks("p1", "Mettre en place la newsletter")).resolves.toEqual({
      status: "error",
      message: "Accès refusé à ce projet",
    });
  });

  it("validates the prompt", async () => {
    await expect(generateTasks("p1", " a ")).resolves.toMatchObject({ status: "error" });
  });

  it("explains that the AI is not configured when the API key is missing", async () => {
    process.env.AI_PROVIDER = "";
    delete process.env.MISTRAL_API_KEY;
    signIn();
    mockProject();
    await expect(generateTasks("p1", "Mettre en place la newsletter")).resolves.toEqual({
      status: "error",
      message: "La génération par IA n'est pas configurée sur ce serveur.",
    });
  });

  it("saves the reviewed tasks in the current project, in order", async () => {
    signIn();
    const bodies: unknown[] = [];
    server.use(
      http.post(`${API}/projects/p1/tasks`, async ({ request }) => {
        bodies.push(await request.json());
        return ok({ task: { id: `t${bodies.length}` } }, 201);
      }),
    );
    const result = await saveGeneratedTasks("p1", [
      { title: "Choisir l'outil d'emailing", description: "Comparer 3 outils", priority: "HIGH" },
      { title: "Créer le formulaire d'inscription", description: "", priority: "MEDIUM" },
    ]);
    expect(result).toEqual({ status: "success", message: "2 tâches ajoutées au projet." });
    expect(bodies).toEqual([
      { title: "Choisir l'outil d'emailing", description: "Comparer 3 outils", priority: "HIGH" },
      { title: "Créer le formulaire d'inscription", priority: "MEDIUM" },
    ]);
  });

  it("refuses an empty list or an untitled task", async () => {
    await expect(saveGeneratedTasks("p1", [])).resolves.toMatchObject({ status: "error" });
    await expect(
      saveGeneratedTasks("p1", [{ title: " ", description: "", priority: "LOW" }]),
    ).resolves.toMatchObject({
      status: "error",
    });
  });
});
