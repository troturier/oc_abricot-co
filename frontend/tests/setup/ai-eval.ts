import { vi } from "vitest";
import { loadEnvConfig } from "@next/env";

// Loads MISTRAL_API_KEY from .env.local, like `next dev` does.
loadEnvConfig(process.cwd());
vi.mock("server-only", () => ({}));
