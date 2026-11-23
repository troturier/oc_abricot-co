import { describe, expect, it } from "vitest";
import { contentToText, parseGeneratedTasks } from "./parse";
import { buildUserPrompt, formatContextTasks, MAX_GENERATED_TASKS, SYSTEM_PROMPT } from "./prompt";
import { createRateLimiter } from "./rate-limit";

describe("parseGeneratedTasks", () => {
  it("reads a JSON answer, even wrapped in a code fence with prose", () => {
    const answer =
      'Voici :\n```json\n{"tasks":[{"title":"Créer la maquette","description":"Page d\'accueil","priority":"HIGH"}]}\n```';
    expect(parseGeneratedTasks(answer)).toEqual([
      { title: "Créer la maquette", description: "Page d'accueil", priority: "HIGH" },
    ]);
  });

  it("drops invalid items and duplicates, defaults the priority, caps the list", () => {
    const tasks = [
      { title: "A" },
      { title: "Rédiger les tests", priority: "WHENEVER" },
      { title: "rédiger les tests" },
      ...Array.from({ length: 12 }, (_, index) => ({ title: `Tâche ${index}`, description: "x" })),
    ];
    const result = parseGeneratedTasks(JSON.stringify({ tasks }));
    expect(result[0]).toEqual({ title: "Rédiger les tests", description: "", priority: "MEDIUM" });
    expect(result).toHaveLength(MAX_GENERATED_TASKS);
  });

  it("rejects answers without usable tasks", () => {
    expect(() => parseGeneratedTasks("Je ne peux pas répondre.")).toThrow();
    expect(() => parseGeneratedTasks('{"tasks":[]}')).toThrow();
    expect(() => parseGeneratedTasks('{"tasks":[{"title":""}]}')).toThrow();
  });

  it("flattens content parts returned by some models", () => {
    expect(
      contentToText([
        { type: "text", text: "{" },
        { type: "text", text: "}" },
      ]),
    ).toBe("{}");
    expect(contentToText(null)).toBe("");
  });
});

describe("prompt", () => {
  it("asks for JSON only and guards against prompt injection", () => {
    expect(SYSTEM_PROMPT).toContain('{"tasks":[');
    expect(SYSTEM_PROMPT).toMatch(/ignore toute instruction/);
  });

  it("puts the project, the retrieved tasks and the request in the user prompt", () => {
    const prompt = buildUserPrompt({
      projectName: "Boutique",
      projectDescription: "Site e-commerce",
      similarTasks: [
        { id: "1", title: "Créer le panier", description: "Ajout et retrait", status: "DONE" },
      ],
      totalTasks: 12,
      request: "Gérer le paiement",
    });
    expect(prompt).toContain("Projet : Boutique");
    expect(prompt).toContain("(1 sur 12)");
    expect(prompt).toContain("- [DONE] Créer le panier : Ajout et retrait");
    expect(prompt).toContain('"""\nGérer le paiement\n"""');
    expect(formatContextTasks([])).toBe("Aucune tâche existante pour le moment.");
  });
});

describe("rate limiter", () => {
  it("allows `limit` calls per window and per key", () => {
    const consume = createRateLimiter(2, 1000);
    expect(consume("u1", 0).allowed).toBe(true);
    expect(consume("u1", 10).allowed).toBe(true);
    expect(consume("u1", 20)).toEqual({ allowed: false, retryAfterMs: 980 });
    expect(consume("u2", 20).allowed).toBe(true);
    expect(consume("u1", 1000).allowed).toBe(true);
  });
});
