import "server-only";
import { cookies } from "next/headers";
import { getTokenExpiry, isTokenUsable, SESSION_COOKIE } from "./token";

const ONE_WEEK_SECONDS = 7 * 24 * 60 * 60;

/**
 * Stores the backend JWT in an httpOnly cookie: it is sent automatically to the
 * Next.js server but can never be read by client-side JavaScript (XSS protection).
 */
export async function createSession(token: string) {
  const exp = getTokenExpiry(token);
  const maxAge = exp ? Math.max(0, exp - Math.floor(Date.now() / 1000)) : ONE_WEEK_SECONDS;
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
}

/** Returns the session token if present and not expired. */
export async function getSessionToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return isTokenUsable(token) ? token : null;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
