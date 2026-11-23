// Helpers shared by the proxy (edge-compatible) and the server session code.

export const SESSION_COOKIE = "abricot_session";

/**
 * Reads the expiry (`exp`, in seconds) of a JWT without verifying its signature.
 * The signature is verified by the backend on every API call; this value is only
 * used for the cookie lifetime and for the optimistic check of the proxy.
 */
export function getTokenExpiry(token: string): number | null {
  const payload = token.split(".")[1];
  if (!payload) return null;
  try {
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = JSON.parse(atob(base64)) as { exp?: unknown };
    return typeof json.exp === "number" ? json.exp : null;
  } catch {
    return null;
  }
}

/** True when the token is well formed and not expired at `now` (milliseconds). */
export function isTokenUsable(token: string | undefined, now = Date.now()): token is string {
  if (!token) return false;
  const exp = getTokenExpiry(token);
  return exp !== null && exp * 1000 > now;
}

/**
 * Returns a safe in-app path to redirect to after login, or the dashboard.
 * Rejects absolute and protocol-relative URLs to prevent open redirects.
 */
export function getSafeRedirectPath(value: unknown, fallback = "/dashboard"): string {
  if (typeof value !== "string") return fallback;
  if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) return fallback;
  return value;
}
