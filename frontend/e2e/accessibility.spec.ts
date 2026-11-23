import { expect, expectAccessible, removeExpected404, STORAGE, test } from "./fixtures";

test.describe("accessibility (WCAG 2.1 AA, axe-core)", () => {
  test.describe("public pages", () => {
    for (const path of ["/login", "/register"]) {
      test(`${path} has no violation`, async ({ page }) => {
        await page.goto(path);
        await expectAccessible(page);
      });
    }

    test("the login form is usable with the keyboard only", async ({ page }) => {
      await page.goto("/login");
      await page.keyboard.press("Tab");
      await expect(page.getByLabel("Email")).toBeFocused();
      await page.keyboard.type("alice@example.com");
      await page.keyboard.press("Tab");
      await expect(page.getByLabel("Mot de passe")).toBeFocused();
      await page.keyboard.type("P@ssword123");
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(/\/dashboard$/);
    });
  });

  test.describe("authenticated pages", () => {
    test.use({ storageState: STORAGE.alice });

    for (const path of [
      "/dashboard",
      "/dashboard?view=kanban",
      "/dashboard?view=projects",
      "/projects",
      "/account",
    ]) {
      test(`${path} has no violation`, async ({ page }) => {
        await page.goto(path);
        await expectAccessible(page);
      });
    }

    test("project page, its views and its modals have no violation", async ({ page }) => {
      await page.goto("/projects");
      await page.getByRole("link", { name: "Application E-commerce" }).click();
      await expect(page.getByRole("heading", { level: 1 })).toHaveText("Application E-commerce");
      await expectAccessible(page);

      await page.getByRole("link", { name: "Calendrier" }).click();
      await expect(page).toHaveURL(/view=calendar/);
      await expectAccessible(page);

      await page.getByRole("button", { name: "Créer une tâche" }).click();
      await expect(page.getByRole("dialog")).toBeVisible();
      await expectAccessible(page, "dialog");
      await page.keyboard.press("Escape");
      await expect(page.getByRole("dialog")).toBeHidden();

      await page.getByRole("button", { name: "Modifier le projet" }).click();
      await expectAccessible(page, "dialog");
    });

    test("the skip link and the menu are reachable with the keyboard", async ({ page }) => {
      await page.goto("/dashboard");
      await page.keyboard.press("Tab");
      const skipLink = page.getByRole("link", { name: "Aller au contenu principal" });
      await expect(skipLink).toBeFocused();
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await expect(page.getByRole("link", { name: "Tableau de bord", exact: true })).toBeFocused();
      await expect(
        page.getByRole("link", { name: "Tableau de bord", exact: true }),
      ).toHaveAttribute("aria-current", "page");
    });

    test("the 404 page has no violation", async ({ page, consoleErrors }) => {
      const response = await page.goto("/cette-page-n-existe-pas");
      expect(response?.status()).toBe(404);
      await expect(page.getByRole("heading", { name: "Page introuvable" })).toBeVisible();
      await expectAccessible(page);
      removeExpected404(consoleErrors);
    });

    test("every image has a text alternative", async ({ page }) => {
      for (const path of ["/dashboard", "/projects", "/account"]) {
        await page.goto(path);
        const imagesWithoutAlt = await page
          .locator("img:not([alt]), svg[role=img]:not([aria-label])")
          .count();
        expect(imagesWithoutAlt).toBe(0);
      }
    });
  });
});
