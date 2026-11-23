import { afterAll, afterEach, beforeAll, vi } from "vitest";
import { cookieJar, server } from "../helpers/backend";

// `server-only` throws outside of a React Server environment: neutralized for Node tests.
vi.mock("server-only", () => ({}));

// Next.js request APIs are replaced by in-memory fakes (see tests/helpers/backend.ts).
vi.mock("next/headers", () => ({
  cookies: async () => cookieJar,
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("next/navigation", () => {
  class RedirectError extends Error {
    constructor(public readonly url: string) {
      super(`NEXT_REDIRECT:${url}`);
    }
  }
  return {
    RedirectError,
    redirect: (url: string) => {
      throw new RedirectError(url);
    },
    notFound: () => {
      throw new Error("NEXT_NOT_FOUND");
    },
    // Mirrors Next.js: control-flow errors must not be swallowed by try/catch blocks.
    unstable_rethrow: (error: unknown) => {
      if (error instanceof RedirectError) throw error;
    },
  };
});

beforeAll(() => server.listen({ onUnhandledFrame: "error" }));
afterEach(() => {
  server.resetHandlers();
  cookieJar.clear();
  vi.clearAllMocks();
});
afterAll(() => server.close());
