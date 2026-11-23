import { expect, loginThroughForm, removeExpected404, STORAGE, test, uid } from "./fixtures";

const projectName = `Projet E2E ${uid()}`;
let projectUrl = "";

/** YYYY-MM-DD of the 15th of the current month (kanban = tasks of the month). */
function midMonthDate() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-15`;
}

test.describe.serial("projects and tasks", () => {
  test.use({ storageState: STORAGE.alice });

  test("anyone can create a project and becomes its administrator", async ({ page }) => {
    await page.goto("/projects");
    await page.getByRole("button", { name: "+ Créer un projet" }).click();
    const dialog = page.getByRole("dialog", { name: "Créer un projet" });
    await expect(dialog.getByRole("button", { name: "Ajouter un projet" })).toBeDisabled();

    await dialog.getByLabel("Titre").fill(projectName);
    await dialog.getByLabel("Description").fill("Projet créé par les tests end-to-end");
    await dialog.getByRole("combobox", { name: "Contributeurs" }).fill("bob");
    await dialog.getByRole("option", { name: /Bob Dupont/ }).click();
    await dialog.getByRole("button", { name: "Ajouter un projet" }).click();

    await expect(page).toHaveURL(/\/projects\/[a-z0-9]+$/);
    projectUrl = new URL(page.url()).pathname;
    await expect(page.getByRole("heading", { level: 1, name: projectName })).toBeVisible();
    const contributors = page.getByRole("region", { name: /Contributeurs/ });
    await expect(contributors.getByText("2 personnes")).toBeVisible();
    await expect(contributors.getByText("Bob Dupont")).toBeVisible();
    await expect(page.getByRole("button", { name: "Modifier le projet" })).toBeVisible();
  });

  test("the administrator edits the project", async ({ page }) => {
    await page.goto(projectUrl);
    await page.getByRole("button", { name: "Modifier le projet" }).click();
    const dialog = page.getByRole("dialog", { name: "Modifier un projet" });
    await dialog.getByLabel("Description").fill("Description modifiée");
    await dialog.getByRole("button", { name: "Enregistrer" }).click();
    await expect(dialog).toBeHidden();
    await expect(page.getByText("Description modifiée")).toBeVisible();
  });

  test("a member creates, edits, comments and finds a task on the dashboard", async ({ page }) => {
    await page.goto(projectUrl);
    await page.getByRole("button", { name: "Créer une tâche" }).click();
    const dialog = page.getByRole("dialog", { name: "Créer une tâche" });
    await dialog.getByLabel("Titre").fill("Rédiger le cahier de recette");
    await dialog.getByLabel("Description").fill("Lister les scénarios de test");
    await dialog.getByLabel("Échéance").fill(midMonthDate());
    await dialog.getByRole("combobox", { name: "Assigné à :" }).fill("alice");
    await dialog.getByRole("option", { name: /Alice Martin/ }).click();
    await dialog.getByText("En cours", { exact: true }).click();
    await dialog.getByRole("button", { name: "+ Ajouter une tâche" }).click();
    await expect(dialog).toBeHidden();

    const card = page.getByRole("article", { name: "Rédiger le cahier de recette" });
    await expect(card.getByText("En cours")).toBeVisible();
    await expect(card.getByText("Alice Martin")).toBeVisible();

    // Edit: switch to "Terminée".
    await card.getByRole("button", { name: /Actions pour la tâche/ }).click();
    await card.getByRole("button", { name: "Modifier" }).click();
    const editDialog = page.getByRole("dialog", { name: "Modifier" });
    await expect(editDialog.getByLabel("Titre")).toHaveValue("Rédiger le cahier de recette");
    await editDialog.getByText("Terminée", { exact: true }).click();
    await editDialog.getByRole("button", { name: "Enregistrer" }).click();
    await expect(editDialog).toBeHidden();
    await expect(card.getByText("Terminée")).toBeVisible();

    // Comment.
    await card.getByRole("button", { name: "Commentaires (0)" }).click();
    await card.getByLabel("Ajouter un commentaire").fill("Recette planifiée vendredi");
    await card.getByRole("button", { name: "Envoyer" }).click();
    await expect(card.getByText("Recette planifiée vendredi")).toBeVisible();
    await expect(card.getByRole("button", { name: "Commentaires (1)" })).toBeVisible();

    // Dashboard: list, kanban (tasks of the month) and projects views.
    await page.goto("/dashboard");
    await expect(page.getByRole("article", { name: "Rédiger le cahier de recette" })).toBeVisible();
    await page.getByLabel("Rechercher une tâche").fill("cahier");
    await expect(page.getByRole("article")).toHaveCount(1);

    await page.getByRole("link", { name: "Kanban" }).click();
    await expect(page).toHaveURL(/view=kanban/);
    const doneColumn = page.getByRole("region", { name: /Terminées/ });
    await expect(doneColumn.getByRole("article", { name: "Rédiger le cahier de recette" })).toBeVisible();

    await page.getByRole("link", { name: "Projets", exact: true }).last().click();
    await expect(page.getByRole("heading", { name: projectName })).toBeVisible();
  });

  test("a member deletes a task", async ({ page }) => {
    await page.goto(projectUrl);
    page.once("dialog", (dialog) => dialog.accept());
    const card = page.getByRole("article", { name: "Rédiger le cahier de recette" });
    await card.getByRole("button", { name: /Actions pour la tâche/ }).click();
    await card.getByRole("button", { name: "Supprimer" }).click();
    await expect(card).toBeHidden();
    await expect(page.getByText("Ce projet ne contient encore aucune tâche.")).toBeVisible();
  });

  test.describe("as a contributor", () => {
    test.use({ storageState: STORAGE.bob });

    test("sees the project and can add tasks, but cannot edit the project", async ({ page }) => {
      await page.goto(projectUrl);
      await expect(page.getByRole("heading", { level: 1, name: projectName })).toBeVisible();
      await expect(page.getByRole("button", { name: "Modifier le projet" })).toHaveCount(0);
      await expect(page.getByRole("button", { name: "Créer une tâche" })).toBeVisible();
    });
  });

  test.describe("as a non-member", () => {
    test.use({ storageState: { cookies: [], origins: [] } });

    test("cannot access the project (404)", async ({ page, consoleErrors }) => {
      await loginThroughForm(page, "caroline@example.com");
      await expect(page).toHaveURL(/\/dashboard$/);
      const response = await page.goto(projectUrl);
      expect(response?.status()).toBe(404);
      await expect(page.getByRole("heading", { level: 1, name: "Page introuvable" })).toBeVisible();
      // The browser logs the expected 404 document status as a console error.
      removeExpected404(consoleErrors);
    });
  });
});
