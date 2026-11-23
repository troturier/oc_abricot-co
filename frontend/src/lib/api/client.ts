import "server-only";

/** Base URL of the Express backend. Only read on the server, never exposed to the browser. */
export function getApiUrl() {
  return process.env.API_URL ?? "http://localhost:8000";
}

/** Error raised for any non-2xx answer of the backend. */
export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string,
    public readonly fieldErrors: { field: string; message: string }[] = [],
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  token?: string | null;
}

/**
 * Calls the backend and unwraps its `{ success, message, data }` envelope.
 * Requests are never cached: every page shows per-user data.
 */
export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, token } = options;
  const headers: Record<string, string> = { Accept: "application/json" };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;

  let response: Response;
  try {
    response = await fetch(`${getApiUrl()}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: "no-store",
    });
  } catch {
    throw new ApiError("Le serveur est injoignable. Réessayez dans quelques instants.", 503);
  }

  const payload = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;

  if (!response.ok || !payload?.success) {
    const fieldErrors =
      (payload?.data as { errors?: { field: string; message: string }[] } | undefined)?.errors ??
      [];
    throw new ApiError(
      payload?.message ?? "Une erreur inattendue est survenue.",
      response.status,
      payload?.error,
      fieldErrors,
    );
  }

  return payload.data as T;
}
