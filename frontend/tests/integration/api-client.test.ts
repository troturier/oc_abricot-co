import { describe, expect, it } from "vitest";
import { ApiError, apiRequest } from "@/lib/api/client";
import { API, fail, http, HttpResponse, ok, server } from "../helpers/backend";

describe("apiRequest", () => {
  it("unwraps the backend envelope and sends the bearer token", async () => {
    let authorization: string | null = null;
    server.use(
      http.get(`${API}/auth/profile`, ({ request }) => {
        authorization = request.headers.get("authorization");
        return ok({ user: { id: "u1" } });
      }),
    );
    await expect(apiRequest("/auth/profile", { token: "abc" })).resolves.toEqual({
      user: { id: "u1" },
    });
    expect(authorization).toBe("Bearer abc");
  });

  it("maps backend errors, including field errors", async () => {
    server.use(
      http.post(`${API}/projects`, () =>
        fail(400, "Données invalides", [{ field: "name", message: "Le nom est requis" }]),
      ),
    );
    const error = (await apiRequest("/projects", { method: "POST", body: {} }).catch(
      (e) => e,
    )) as ApiError;
    expect(error).toBeInstanceOf(ApiError);
    expect(error).toMatchObject({ status: 400, message: "Données invalides" });
    expect(error.fieldErrors).toEqual([{ field: "name", message: "Le nom est requis" }]);
  });

  it("turns a network failure into a 503 ApiError", async () => {
    server.use(http.get(`${API}/health`, () => HttpResponse.error()));
    await expect(apiRequest("/health")).rejects.toMatchObject({ status: 503 });
  });
});
