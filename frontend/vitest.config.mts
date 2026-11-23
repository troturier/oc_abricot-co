import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// Two test projects:
// - "unit": pure functions and React components, rendered in jsdom;
// - "integration": server-side modules (API client, server actions, AI pipeline)
//   running in Node against a mocked backend (MSW) and fake AI models.
export default defineConfig({
  plugins: [react()],
  resolve: { tsconfigPaths: true },
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          environment: "jsdom",
          include: ["src/**/*.test.{ts,tsx}"],
          setupFiles: ["./tests/setup/unit.ts"],
        },
      },
      {
        extends: true,
        test: {
          name: "integration",
          environment: "node",
          include: ["tests/integration/**/*.test.ts"],
          setupFiles: ["./tests/setup/integration.ts"],
        },
      },
      {
        extends: true,
        test: {
          name: "ai-eval",
          environment: "node",
          include: ["tests/ai-eval/**/*.test.ts"],
          setupFiles: ["./tests/setup/ai-eval.ts"],
        },
      },
    ],
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/*.test.{ts,tsx}", "src/components/icons/**"],
    },
  },
});
