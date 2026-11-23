import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../../tests/helpers/a11y";
import { AiTaskModal } from "../AiTaskModal";

const { generateTasks, saveGeneratedTasks } = vi.hoisted(() => ({
  generateTasks: vi.fn(),
  saveGeneratedTasks: vi.fn(),
}));
vi.mock("@/actions/ai", () => ({ generateTasks, saveGeneratedTasks }));
vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

const suggestions = [
  { title: "Choisir l'outil d'emailing", description: "Comparer 3 outils", priority: "HIGH" },
  { title: "Créer le formulaire", description: "Inscription", priority: "MEDIUM" },
];

describe("AiTaskModal", () => {
  beforeEach(() => {
    generateTasks.mockResolvedValue({ status: "success", tasks: suggestions, contextCount: 2 });
    saveGeneratedTasks.mockResolvedValue({ status: "success", message: "1 tâche ajoutée au projet." });
  });

  it("generates, lets the user edit and delete, then saves the tasks", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<AiTaskModal projectId="p1" onClose={onClose} />);

    expect(screen.getByRole("dialog", { name: "Créer une tâche" })).toBeInTheDocument();
    await user.type(screen.getByLabelText("Décrivez les tâches que vous souhaitez ajouter"), "Lancer une newsletter");
    await user.click(screen.getByRole("button", { name: "Générer les tâches avec l'IA" }));

    expect(generateTasks).toHaveBeenCalledWith("p1", "Lancer une newsletter");
    expect(await screen.findByRole("dialog", { name: "Vos tâches..." })).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(2);

    await user.click(screen.getByRole("button", { name: "Supprimer la tâche Créer le formulaire" }));
    await user.click(screen.getByRole("button", { name: "Modifier la tâche Choisir l'outil d'emailing" }));
    const title = screen.getByLabelText("Titre");
    await user.clear(title);
    await user.type(title, "Choisir Brevo");
    await user.click(screen.getByRole("button", { name: "Valider" }));

    await user.click(screen.getByRole("button", { name: "+ Ajouter les tâches" }));
    expect(saveGeneratedTasks).toHaveBeenCalledWith("p1", [
      { title: "Choisir Brevo", description: "Comparer 3 outils", priority: "HIGH" },
    ]);
    expect(onClose).toHaveBeenCalled();
  });

  it("shows the error returned by the server (quota, configuration…)", async () => {
    generateTasks.mockResolvedValue({ status: "error", message: "Le quota du service d'IA est atteint." });
    const user = userEvent.setup();
    render(<AiTaskModal projectId="p1" onClose={vi.fn()} />);
    await user.type(screen.getByLabelText("Décrivez les tâches que vous souhaitez ajouter"), "Lancer une newsletter");
    await user.keyboard("{Enter}");
    expect(await screen.findByRole("alert")).toHaveTextContent("Le quota du service d'IA est atteint.");
  });

  it("is accessible", async () => {
    render(<AiTaskModal projectId="p1" onClose={vi.fn()} />);
    await expectNoA11yViolations(screen.getByRole("dialog"));
  });
});
