import { describe, expect, it } from "vitest";
import { generateTaskSuggestions } from "@/lib/ai/generate";
import { getAiModels } from "@/lib/ai/models";
import type { ContextTask } from "@/lib/ai/types";

/**
 * Evaluation of the real Mistral pipeline (`npm run test:ai`, needs MISTRAL_API_KEY).
 * It is not part of `npm test` because every run calls the paid API. Each scenario
 * checks the format, the language, the absence of duplicates with the existing
 * tasks (the RAG context) and a minimal relevance (expected keywords).
 */
const hasKey = Boolean(process.env.MISTRAL_API_KEY);

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const scenarios: {
  name: string;
  project: { name: string; description: string };
  existingTasks: ContextTask[];
  request: string;
  keywords: string[];
}[] = [
  {
    name: "e-commerce: payment features",
    project: {
      name: "Application E-commerce",
      description: "Boutique en ligne avec paiement sécurisé et gestion des stocks.",
    },
    existingTasks: [
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
        title: "Concevoir la base de données",
        description: "Produits, commandes, utilisateurs",
        status: "DONE",
      },
    ],
    request: "Gérer les remboursements et les factures après un paiement",
    keywords: ["rembours", "factur"],
  },
  {
    name: "training platform: quiz",
    project: {
      name: "Plateforme de formation",
      description: "Cours en ligne avec vidéos, quiz et suivi des progrès.",
    },
    existingTasks: [
      {
        id: "1",
        title: "Développer le lecteur vidéo",
        description: "Contrôles de lecture et reprise",
        status: "IN_PROGRESS",
      },
      {
        id: "2",
        title: "Créer le système de quiz",
        description: "QCM et correction automatique",
        status: "TODO",
      },
    ],
    request: "Ajouter des badges et un tableau de suivi de progression pour motiver les élèves",
    keywords: ["badge", "progres", "suivi", "tableau"],
  },
  {
    name: "empty project: showcase website",
    project: { name: "Site vitrine", description: "Site vitrine pour un artisan menuisier." },
    existingTasks: [],
    request: "Créer le site de A à Z : maquettes, développement, mise en ligne",
    keywords: ["maquette", "develop", "mise en ligne", "deploi", "heberg"],
  },
];

describe.skipIf(!hasKey)("AI prompt quality with Mistral (real API)", () => {
  for (const scenario of scenarios) {
    it(`${scenario.name}`, { timeout: 60_000 }, async () => {
      const { llm, embedModel } = getAiModels();
      const { tasks, contextTasks } = await generateTaskSuggestions({
        ...scenario,
        llm,
        embedModel,
      });
      console.info(
        `\n### ${scenario.name}\nRequest: ${scenario.request}\nRAG context: ${contextTasks.map((t) => t.title).join(" | ") || "(none)"}\n` +
          tasks
            .map((task) => `- [${task.priority}] ${task.title} — ${task.description}`)
            .join("\n"),
      );

      expect(tasks.length).toBeGreaterThanOrEqual(1);
      expect(tasks.length).toBeLessThanOrEqual(8);
      // RAG: the existing tasks are given as context, so none should be proposed again.
      const existing = new Set(scenario.existingTasks.map((task) => normalize(task.title)));
      for (const task of tasks) expect(existing.has(normalize(task.title))).toBe(false);
      // French output.
      const text = normalize(tasks.map((task) => `${task.title} ${task.description}`).join(" "));
      expect(text).toMatch(/\b(le|la|les|des|du|de)\b/);
      // Relevance: the proposal talks about the request.
      expect(scenario.keywords.some((keyword) => text.includes(keyword))).toBe(true);
    });
  }
});
