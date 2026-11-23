import { describe, expect, it } from "vitest";
import { login, logout, register } from "@/actions/auth";
import { INITIAL_ACTION_STATE } from "@/lib/action-state";
import { API, cookieJar, fail, fakeToken, http, ok, server } from "../helpers/backend";

function form(fields: Record<string, string>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

describe("auth Server Actions", () => {
  it("logs in: stores the token in an httpOnly cookie and redirects to the requested page", async () => {
    const token = fakeToken();
    server.use(http.post(`${API}/auth/login`, () => ok({ user: { id: "u1" }, token })));

    await expect(
      login(
        INITIAL_ACTION_STATE,
        form({ email: "alice@example.com", password: "P@ssword123", from: "/projects" }),
      ),
    ).rejects.toMatchObject({ url: "/projects" });

    const cookie = cookieJar.get("abricot_session");
    expect(cookie?.value).toBe(token);
    expect(cookie?.options).toMatchObject({ httpOnly: true, sameSite: "lax", path: "/" });
    expect(cookie?.options?.maxAge).toBeGreaterThan(3500);
  });

  it("ignores an external redirect target after login", async () => {
    server.use(
      http.post(`${API}/auth/login`, () => ok({ user: { id: "u1" }, token: fakeToken() })),
    );
    await expect(
      login(
        INITIAL_ACTION_STATE,
        form({ email: "alice@example.com", password: "x", from: "https://evil.example" }),
      ),
    ).rejects.toMatchObject({ url: "/dashboard" });
  });

  it("returns the backend message on wrong credentials, without creating a session", async () => {
    server.use(http.post(`${API}/auth/login`, () => fail(401, "Email ou mot de passe incorrect")));
    const state = await login(
      INITIAL_ACTION_STATE,
      form({ email: "alice@example.com", password: "bad" }),
    );
    expect(state).toEqual({
      status: "error",
      message: "Email ou mot de passe incorrect",
      fieldErrors: undefined,
    });
    expect(cookieJar.get("abricot_session")).toBeUndefined();
  });

  it("validates the form before calling the backend", async () => {
    const state = await login(INITIAL_ACTION_STATE, form({ email: "", password: "" }));
    expect(state.status).toBe("error");
    if (state.status === "error")
      expect(Object.keys(state.fieldErrors ?? {})).toEqual(["email", "password"]);
  });

  it("registers a new account and opens a session", async () => {
    let body: unknown;
    server.use(
      http.post(`${API}/auth/register`, async ({ request }) => {
        body = await request.json();
        return ok({ user: { id: "u9" }, token: fakeToken() }, 201);
      }),
    );
    await expect(
      register(INITIAL_ACTION_STATE, form({ email: "new@example.com", password: "P@ssword123" })),
    ).rejects.toMatchObject({ url: "/dashboard" });
    expect(body).toEqual({ email: "new@example.com", password: "P@ssword123" });
    expect(cookieJar.get("abricot_session")).toBeDefined();
  });

  it("reports an already used email", async () => {
    server.use(
      http.post(`${API}/auth/register`, () =>
        fail(409, "Un utilisateur avec cet email existe déjà"),
      ),
    );
    const state = await register(
      INITIAL_ACTION_STATE,
      form({ email: "alice@example.com", password: "P@ssword123" }),
    );
    expect(state).toMatchObject({
      status: "error",
      message: "Un utilisateur avec cet email existe déjà",
    });
  });

  it("logs out by deleting the cookie", async () => {
    cookieJar.set("abricot_session", fakeToken());
    await expect(logout()).rejects.toMatchObject({ url: "/login" });
    expect(cookieJar.get("abricot_session")).toBeUndefined();
  });
});
