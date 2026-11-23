import { expect, test as setup } from "@playwright/test";
import { loginThroughForm, STORAGE } from "./fixtures";

// Logs the seed users in once and saves their session cookie for the other tests.
for (const [name, path] of Object.entries(STORAGE)) {
  setup(`log in as ${name}`, async ({ page }) => {
    await loginThroughForm(page, `${name}@example.com`);
    await expect(page).toHaveURL(/\/dashboard$/);
    await page.context().storageState({ path });
  });
}
