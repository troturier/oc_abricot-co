import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { proxy } from "./proxy";

function token(secondsFromNow: number) {
  const encode = (value: object) => btoa(JSON.stringify(value)).replace(/=+$/, "");
  return `${encode({ alg: "HS256" })}.${encode({ exp: Math.floor(Date.now() / 1000) + secondsFromNow })}.sig`;
}

function request(path: string, sessionToken?: string) {
  const req = new NextRequest(new URL(path, "http://localhost:3001"));
  if (sessionToken) req.cookies.set("abricot_session", sessionToken);
  return req;
}

const location = (response: Response) => response.headers.get("location");

describe("proxy (route protection)", () => {
  it("redirects anonymous visitors of protected pages to the login page", () => {
    const response = proxy(request("/projects/42?view=calendar"));
    expect(location(response)).toBe(
      "http://localhost:3001/login?from=%2Fprojects%2F42%3Fview%3Dcalendar",
    );
  });

  it("treats an expired token as no session", () => {
    expect(location(proxy(request("/dashboard", token(-10))))).toContain("/login");
  });

  it("lets authenticated users through and keeps them away from auth pages", () => {
    expect(location(proxy(request("/account", token(600))))).toBeNull();
    expect(location(proxy(request("/login", token(600))))).toBe("http://localhost:3001/dashboard");
  });

  it("routes the home page depending on the session", () => {
    expect(location(proxy(request("/")))).toBe("http://localhost:3001/login");
    expect(location(proxy(request("/", token(600))))).toBe("http://localhost:3001/dashboard");
  });

  it("leaves public pages alone", () => {
    expect(location(proxy(request("/register")))).toBeNull();
  });
});
