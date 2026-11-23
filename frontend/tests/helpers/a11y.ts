import axe from "axe-core";
import { expect } from "vitest";

/**
 * Runs axe-core on a rendered DOM subtree and fails with a readable list of
 * WCAG 2.1 A/AA violations. Color contrast is checked by the Playwright suite,
 * because jsdom does not compute styles.
 */
export async function expectNoA11yViolations(container: Element) {
  const results = await axe.run(container, {
    runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
    rules: { "color-contrast": { enabled: false } },
  });
  const summary = results.violations.map(
    (violation) => `${violation.id}: ${violation.help} (${violation.nodes.length} node(s))`,
  );
  expect(summary).toEqual([]);
}
