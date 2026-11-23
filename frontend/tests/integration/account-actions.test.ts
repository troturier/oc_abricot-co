import { describe, expect, it } from "vitest";
import { updateAccount } from "@/actions/account";
import { INITIAL_ACTION_STATE } from "@/lib/action-state";
import { API, fail, http, ok, server, signIn } from "../helpers/backend";
import { alice } from "../helpers/fixtures";

function form(fields: Record<string, string>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

const unchanged = {
  firstName: "Alice",
  lastName: "Martin",
  email: alice.email,
  currentPassword: "",
  newPassword: "",
};

describe("updateAccount", () => {
  it("joins first and last names and changes the password with the current one", async () => {
    signIn();
    const calls: { path: string; body: unknown }[] = [];
    server.use(
      http.get(`${API}/auth/profile`, () => ok({ user: alice })),
      http.put(`${API}/auth/profile`, async ({ request }) => {
        calls.push({ path: "profile", body: await request.json() });
        return ok({ user: alice });
      }),
      http.put(`${API}/auth/password`, async ({ request }) => {
        calls.push({ path: "password", body: await request.json() });
        return ok(undefined);
      }),
    );

    const state = await updateAccount(
      INITIAL_ACTION_STATE,
      form({
        ...unchanged,
        firstName: "Alicia",
        currentPassword: "P@ssword123",
        newPassword: "N3w@Password",
      }),
    );

    expect(state).toEqual({
      status: "success",
      message: "Informations et mot de passe mis à jour.",
    });
    expect(calls).toEqual([
      { path: "profile", body: { email: alice.email, name: "Alicia Martin" } },
      { path: "password", body: { currentPassword: "P@ssword123", newPassword: "N3w@Password" } },
    ]);
  });

  it("does not call the backend when nothing changed", async () => {
    signIn();
    server.use(http.get(`${API}/auth/profile`, () => ok({ user: alice })));
    const state = await updateAccount(INITIAL_ACTION_STATE, form(unchanged));
    expect(state.status).toBe("success");
  });

  it("surfaces a wrong current password", async () => {
    signIn();
    server.use(
      http.get(`${API}/auth/profile`, () => ok({ user: alice })),
      http.put(`${API}/auth/password`, () => fail(400, "Mot de passe actuel incorrect")),
    );
    const state = await updateAccount(
      INITIAL_ACTION_STATE,
      form({ ...unchanged, currentPassword: "wrong", newPassword: "N3w@Password" }),
    );
    expect(state).toMatchObject({ status: "error", message: "Mot de passe actuel incorrect" });
  });

  it("redirects to the session reset route when the backend rejects the token", async () => {
    signIn();
    server.use(http.get(`${API}/auth/profile`, () => fail(401, "Token invalide")));
    await expect(updateAccount(INITIAL_ACTION_STATE, form(unchanged))).rejects.toMatchObject({
      url: "/api/auth/session-expired",
    });
  });
});
