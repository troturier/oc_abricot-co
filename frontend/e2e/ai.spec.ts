import { expect, expectAccessible, STORAGE, test } from "./fixtures";

// The e2e server runs with AI_PROVIDER=fake: deterministic answers, same pipeline
// (LlamaIndex retrieval over the project tasks, prompt, validation, saving).
test.describe("AI task generation", () => {
  test.use({ storageState: STORAGE.alice });

  test("generates tasks, lets the user review them and adds them to the project", async ({ page }) => {
    await page.goto("/projects");
    await page.getByRole("link", { name: "Application E-commerce" }).click();
    await page.getByRole("button", { name: /^IA/ }).click();

    const dialog = page.getByRole("dialog", { name: "Créer une tâche" });
    await expect(dialog).toBeVisible();
    await expectAccessible(page, "dialog");
    await expect(dialog.getByRole("button", { name: "Générer les tâches avec l'IA" })).toBeDisabled();

    await dialog.getByLabel("Décrivez les tâches que vous souhaitez ajouter").fill("Programme de fidélité");
    await dialog.getByRole("button", { name: "Générer les tâches avec l'IA" }).click();

    const listDialog = page.getByRole("dialog", { name: "Vos tâches..." });
    const proposals = listDialog.getByRole("list", { name: "Tâches proposées par l'IA" }).getByRole("listitem");
    await expect(proposals).toHaveCount(3);
    await expectAccessible(page, "dialog");

    // Review: delete one, edit one.
    await listDialog.getByRole("button", { name: "Supprimer la tâche Tester : Programme de fidélité" }).click();
    await expect(proposals).toHaveCount(2);
    await listDialog.getByRole("button", { name: "Modifier la tâche Réaliser : Programme de fidélité" }).click();
    await listDialog.getByLabel("Titre").fill("Développer le programme de fidélité");
    await listDialog.getByRole("button", { name: "Valider" }).click();

    await listDialog.getByRole("button", { name: "+ Ajouter les tâches" }).click();
    await expect(listDialog).toBeHidden();
    await expect(page.getByText("2 tâches ajoutées au projet.")).toBeVisible();
    await expect(page.getByRole("article", { name: "Développer le programme de fidélité" })).toBeVisible();
    await expect(page.getByRole("article", { name: "Analyser le besoin : Programme de fidélité" })).toBeVisible();
    await expect(page.getByRole("article", { name: "Tester : Programme de fidélité" })).toHaveCount(0);
  });
});
