import { existsSync } from "node:fs";
import { vi } from "vitest";

// Vitest sets NODE_ENV=test, and Next.js' env loader then skips `.env.local` on
// purpose. This suite needs the real MISTRAL_API_KEY, so the file is loaded here
// (variables already defined in the shell take precedence).
if (!process.env.MISTRAL_API_KEY && existsSync(".env.local")) {
  process.loadEnvFile(".env.local");
}
vi.mock("server-only", () => ({}));
