import { expect, loginThroughForm, PASSWORD, test, uid } from "./fixtures";

test.describe("authentication", () => {
  test("protected pages redirect anonymous visitors to the login page", async ({ page }) => {
    await page.goto("/projects");
    await expect(page).toHaveURL(/\/login\?from=%2Fprojects$/);
    await expect(page.getByRole("heading", { level: 1, name: "Connexion" })).toBeVisible();
  });

  test("wrong credentials show an error and keep the user logged out", async ({ page }) => {
    await loginThroughForm(page, "alice@example.com", "Wrong@Pass1");
    await expect(page.getByText("Email ou mot de passe incorrect")).toBeVisible();
    await expect(page).toHaveURL(/\/login/);
  });

  test("the session cookie is httpOnly and the token is never exposed to JavaScript", async ({ page }) => {
    await loginThroughForm(page, "alice@example.com");
    await expect(page).toHaveURL(/\/dashboard$/);
    const cookie = (await page.context().cookies()).find((item) => item.name === "abricot_session");
    expect(cookie).toMatchObject({ httpOnly: true, sameSite: "Lax" });
    expect(await page.evaluate(() => document.cookie)).not.toContain("abricot_session");
    expect(await page.evaluate(() => JSON.stringify(localStorage))).not.toMatch(/eyJ/);
  });

  test("a visitor can register, log out, log back in and change the password", async ({ page }) => {
    const email = `e2e-${uid()}@example.com`;
    const newPassword = "N3w@Password";

    await page.goto("/register");
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Mot de passe").fill("weak");
    await page.getByRole("button", { name: "S'inscrire" }).click();
    await expect(page.getByText(/8 caractères minimum/)).toBeVisible();

    await page.getByLabel("Mot de passe").fill(PASSWORD);
    await page.getByRole("button", { name: "S'inscrire" }).click();
    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(page.getByText(`Bonjour ${email}`)).toBeVisible();

    await page.getByRole("link", { name: "Mon compte" }).click();
    await page.getByLabel("Prénom").fill("Zoé");
    await page.getByLabel("Nom", { exact: true }).fill("Test");
    await page.getByLabel("Mot de passe actuel").fill(PASSWORD);
    await page.getByLabel("Nouveau mot de passe").fill(newPassword);
    await page.getByRole("button", { name: "Modifier les informations" }).click();
    await expect(page.getByText("Informations et mot de passe mis à jour.")).toBeVisible();
    await expect(page.getByRole("main").getByText("Zoé Test")).toBeVisible();

    await page.getByRole("button", { name: "Se déconnecter" }).click();
    await expect(page).toHaveURL(/\/login$/);

    await loginThroughForm(page, email, PASSWORD);
    await expect(page.getByText("Email ou mot de passe incorrect")).toBeVisible();
    await loginThroughForm(page, email, newPassword);
    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(page.getByText("Bonjour Zoé Test")).toBeVisible();
  });
});
