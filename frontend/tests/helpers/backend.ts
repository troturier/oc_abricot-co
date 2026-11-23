import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

/** Base URL used by the API client when API_URL is not set. */
export const API = "http://localhost:8000";

export const server = setupServer();

/** Successful backend envelope. */
export function ok<T>(data: T, status = 200) {
  return HttpResponse.json({ success: true, message: "OK", data }, { status });
}

/** Error backend envelope. */
export function fail(
  status: number,
  message: string,
  errors?: { field: string; message: string }[],
) {
  return HttpResponse.json(
    { success: false, message, error: "ERROR", ...(errors ? { data: { errors } } : {}) },
    { status },
  );
}

/** Builds an unsigned JWT whose payload expires in `secondsFromNow`. */
export function fakeToken(secondsFromNow = 3600) {
  const encode = (value: object) => Buffer.from(JSON.stringify(value)).toString("base64url");
  const exp = Math.floor(Date.now() / 1000) + secondsFromNow;
  return `${encode({ alg: "HS256" })}.${encode({ userId: "u1", exp })}.signature`;
}

interface StoredCookie {
  name: string;
  value: string;
  options?: Record<string, unknown>;
}

/** In-memory replacement of the `cookies()` store of next/headers. */
class CookieJar {
  private store = new Map<string, StoredCookie>();
  get(name: string) {
    return this.store.get(name);
  }
  set(name: string, value: string, options?: Record<string, unknown>) {
    this.store.set(name, { name, value, options });
  }
  delete(name: string) {
    this.store.delete(name);
  }
  clear() {
    this.store.clear();
  }
}

export const cookieJar = new CookieJar();

/** Puts a valid session cookie in the jar (logged-in user). */
export function signIn(token = fakeToken()) {
  cookieJar.set("abricot_session", token);
  return token;
}

export { http, HttpResponse };
