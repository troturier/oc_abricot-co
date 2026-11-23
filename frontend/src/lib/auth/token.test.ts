import { describe, expect, it } from "vitest";
import { getSafeRedirectPath, getTokenExpiry, isTokenUsable } from "./token";

function token(payload: object) {
  const encode = (value: object) => btoa(JSON.stringify(value)).replace(/=+$/, "");
  return `${encode({ alg: "HS256" })}.${encode(payload)}.sig`;
}

describe("session token helpers", () => {
  it("reads the expiry of a JWT", () => {
    expect(getTokenExpiry(token({ exp: 1700000000 }))).toBe(1700000000);
    expect(getTokenExpiry("not-a-jwt")).toBeNull();
    expect(getTokenExpiry(token({ userId: "u1" }))).toBeNull();
  });

  it("rejects missing, malformed and expired tokens", () => {
    const now = 1_700_000_000_000;
    expect(isTokenUsable(undefined, now)).toBe(false);
    expect(isTokenUsable("garbage", now)).toBe(false);
    expect(isTokenUsable(token({ exp: now / 1000 - 1 }), now)).toBe(false);
    expect(isTokenUsable(token({ exp: now / 1000 + 60 }), now)).toBe(true);
  });

  it("only accepts in-app redirect paths (no open redirect)", () => {
    expect(getSafeRedirectPath("/projects/1?view=calendar")).toBe("/projects/1?view=calendar");
    expect(getSafeRedirectPath("https://evil.example")).toBe("/dashboard");
    expect(getSafeRedirectPath("//evil.example")).toBe("/dashboard");
    expect(getSafeRedirectPath("/\\evil.example")).toBe("/dashboard");
    expect(getSafeRedirectPath(undefined)).toBe("/dashboard");
  });
});
