import AxeBuilder from "@axe-core/playwright";
import { test as base, expect, type Page } from "@playwright/test";

export const PASSWORD = "P@ssword123";
export const STORAGE = {
  alice: "e2e/.auth/alice.json",
  bob: "e2e/.auth/bob.json",
};

/**
 * Every test fails if the browser console logs an error or if the page throws:
 * the self-assessment grid requires "no error on the site nor in the console".
 */
export const test = base.extend<{ consoleErrors: string[] }>({
  consoleErrors: [
    async ({ page }, use) => {
      const errors: string[] = [];
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      page.on("pageerror", (error) => errors.push(error.message));
      await use(errors);
      expect(errors, "Console errors").toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };

/** WCAG 2.1 A/AA audit with axe-core (the engine used by many checkers, close to WAVE). */
export async function expectAccessible(page: Page, include?: string) {
  let builder = new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]);
  if (include) builder = builder.include(include);
  const { violations } = await builder.analyze();
  const summary = violations.map(
    (violation) => `${violation.id}: ${violation.help} → ${violation.nodes.map((node) => node.target.join(" ")).join(", ")}`,
  );
  expect(summary, "Accessibility violations").toEqual([]);
}

export async function loginThroughForm(page: Page, email: string, password = PASSWORD) {
  await page.goto("/login");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Mot de passe").fill(password);
  await page.getByRole("button", { name: "Se connecter" }).click();
}

/** Unique suffix so that tests can be re-run against the same database. */
export function uid() {
  return Math.random().toString(36).slice(2, 8);
}

/** Drops the "status of 404" console message logged by the browser for an expected 404 page. */
export function removeExpected404(errors: string[]) {
  const kept = errors.filter((message) => !message.includes("status of 404"));
  errors.splice(0, errors.length, ...kept);
}
