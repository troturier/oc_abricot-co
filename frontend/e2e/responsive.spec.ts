import { expect, STORAGE, test } from "./fixtures";

/** True when the page needs a horizontal scrollbar (content wider than the viewport). */
async function hasHorizontalOverflow(page: import("@playwright/test").Page) {
  return page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
}

test.describe("responsive (mobile viewport)", () => {
  test("auth pages fit the screen and hide the photo", async ({ page }) => {
    for (const path of ["/login", "/register"]) {
      await page.goto(path);
      expect(await hasHorizontalOverflow(page), path).toBe(false);
      await expect(page.locator("img")).toBeHidden();
    }
  });

  test.describe("authenticated pages", () => {
    test.use({ storageState: STORAGE.alice });

    test("no horizontal scroll and the navigation stays usable", async ({ page }) => {
      for (const path of ["/dashboard", "/dashboard?view=kanban", "/dashboard?view=projects", "/projects", "/account"]) {
        await page.goto(path);
        expect(await hasHorizontalOverflow(page), path).toBe(false);
        await expect(page.getByRole("link", { name: "Projets", exact: true }).first()).toBeVisible();
      }
      await page.goto("/projects");
      await page.getByRole("link", { name: "Application E-commerce" }).click();
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(await hasHorizontalOverflow(page)).toBe(false);
      await page.getByRole("button", { name: "Créer une tâche" }).click();
      const dialog = page.getByRole("dialog");
      const box = await dialog.boundingBox();
      expect(box && box.width <= (page.viewportSize()?.width ?? 0)).toBe(true);
    });
  });
});
