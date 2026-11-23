import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { ApiError, apiRequest } from "@/lib/api/client";
import type { User } from "@/lib/types";
import { getSessionToken } from "./session";

/** Route that clears an invalid session cookie, then redirects to the login page. */
export const SESSION_EXPIRED_PATH = "/api/auth/session-expired";

/**
 * Data Access Layer: every authenticated backend call goes through this function.
 * The token is read from the httpOnly cookie on the server; a missing or rejected
 * token sends the user back to the login page.
 */
export async function authedRequest<T>(
  path: string,
  options: Omit<Parameters<typeof apiRequest>[1], "token"> = {},
): Promise<T> {
  const token = await getSessionToken();
  if (!token) redirect("/login");
  try {
    return await apiRequest<T>(path, { ...options, token });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) redirect(SESSION_EXPIRED_PATH);
    throw error;
  }
}

/**
 * Returns the logged-in user, or null. Memoized per request with React `cache`
 * so that the layout and the page share a single /auth/profile call.
 */
export const getCurrentUser = cache(async (): Promise<User | null> => {
  const token = await getSessionToken();
  if (!token) return null;
  try {
    const { user } = await apiRequest<{ user: User }>("/auth/profile", { token });
    return user;
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) return null;
    throw error;
  }
});

/** Same as getCurrentUser but redirects to the login page when there is no valid session. */
export async function requireUser(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) redirect(SESSION_EXPIRED_PATH);
  return user;
}
