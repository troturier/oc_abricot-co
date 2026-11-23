import { defineConfig, devices } from "@playwright/test";

// Dedicated ports, distinct from the development servers (8000 and 3001), so that the
// tests can run while `npm run dev` is up. Override them if they are already taken:
// E2E_BACKEND_PORT=8020 E2E_FRONTEND_PORT=3020 npm run test:e2e
const BACKEND_PORT = Number(process.env.E2E_BACKEND_PORT ?? 8010);
const FRONTEND_PORT = Number(process.env.E2E_FRONTEND_PORT ?? 3010);

/**
 * End-to-end tests: the real backend (fresh seeded database) and a production
 * build of the frontend. The AI uses a deterministic fake model (AI_PROVIDER=fake)
 * so that the tests do not depend on the Mistral API.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  timeout: 45_000,
  use: {
    baseURL: `http://localhost:${FRONTEND_PORT}`,
    locale: "fr-FR",
    timezoneId: "Europe/Paris",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "setup", testMatch: /auth\.setup\.ts/ },
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 } },
      dependencies: ["setup"],
      testIgnore: /responsive\.spec\.ts/,
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 7"] },
      dependencies: ["setup"],
      testMatch: /responsive\.spec\.ts/,
    },
  ],
  webServer: [
    {
      command: "./e2e/start-backend.sh",
      url: `http://localhost:${BACKEND_PORT}/health`,
      env: { E2E_BACKEND_PORT: String(BACKEND_PORT) },
      reuseExistingServer: false,
      timeout: 120_000,
    },
    {
      command: `npm run build && npx next start --port ${FRONTEND_PORT}`,
      url: `http://localhost:${FRONTEND_PORT}/login`,
      env: { API_URL: `http://localhost:${BACKEND_PORT}`, AI_PROVIDER: "fake" },
      reuseExistingServer: false,
      timeout: 300_000,
    },
  ],
});
