import { describe, expect, it } from "vitest";
import { createProject, deleteProject, findUsers, updateProject } from "@/actions/projects";
import { addComment, createTask, deleteTask, updateTask } from "@/actions/tasks";
import { INITIAL_ACTION_STATE } from "@/lib/action-state";
import { API, fail, http, ok, server, signIn } from "../helpers/backend";
import { alice, bob, carol, makeProject } from "../helpers/fixtures";

function form(fields: Record<string, string | string[]>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    for (const item of Array.isArray(value) ? value : [value]) data.append(key, item);
  }
  return data;
}

/** Records every backend call: "METHOD /path body". */
function recordCalls() {
  const calls: string[] = [];
  server.events.on("request:start", async ({ request }) => {
    const body = request.method === "GET" || request.method === "DELETE" ? "" : ` ${await request.clone().text()}`;
    calls.push(`${request.method} ${new URL(request.url).pathname}${body}`);
  });
  return calls;
}

describe("project Server Actions", () => {
  it("creates a project with its contributors (the creator becomes its administrator)", async () => {
    signIn();
    const calls = recordCalls();
    server.use(http.post(`${API}/projects`, () => ok({ project: makeProject({ id: "p9" }) }, 201)));
    const state = await createProject(
      INITIAL_ACTION_STATE,
      form({ name: "Site vitrine", description: "Refonte", contributorEmails: [bob.email] }),
    );
    expect(state).toEqual({ status: "success", message: "Projet créé.", id: "p9" });
    expect(calls).toEqual([
      `POST /projects ${JSON.stringify({ name: "Site vitrine", description: "Refonte", contributors: [bob.email] })}`,
    ]);
    server.events.removeAllListeners();
  });

  it("rejects an invalid project without calling the backend", async () => {
    signIn();
    const state = await createProject(INITIAL_ACTION_STATE, form({ name: "A", description: "" }));
    expect(state.status).toBe("error");
  });

  it("updates a project and synchronizes contributors (add and remove)", async () => {
    signIn();
    const calls = recordCalls();
    server.use(
      http.get(`${API}/projects/p1`, () => ok({ project: makeProject() })),
      http.put(`${API}/projects/p1`, () => ok({ project: makeProject() })),
      http.delete(`${API}/projects/p1/contributors/${bob.id}`, () => ok(undefined)),
      http.post(`${API}/projects/p1/contributors`, () => ok(undefined)),
    );
    const state = await updateProject(
      "p1",
      INITIAL_ACTION_STATE,
      form({ name: "API v2", description: "Nouvelle version", contributorEmails: [carol.email, alice.email] }),
    );
    expect(state.status).toBe("success");
    expect(calls).toEqual([
      "GET /projects/p1",
      `PUT /projects/p1 ${JSON.stringify({ name: "API v2", description: "Nouvelle version" })}`,
      `DELETE /projects/p1/contributors/${bob.id}`,
      `POST /projects/p1/contributors ${JSON.stringify({ email: carol.email })}`,
    ]);
    server.events.removeAllListeners();
  });

  it("refuses the update for a non-administrator (backend 403)", async () => {
    signIn();
    server.use(
      http.get(`${API}/projects/p1`, () => ok({ project: makeProject({ userRole: "CONTRIBUTOR" }) })),
      http.put(`${API}/projects/p1`, () => fail(403, "Vous n'avez pas les droits pour modifier ce projet")),
    );
    const state = await updateProject("p1", INITIAL_ACTION_STATE, form({ name: "API v2", description: "x" }));
    expect(state).toMatchObject({ status: "error", message: "Vous n'avez pas les droits pour modifier ce projet" });
  });

  it("deletes a project and goes back to the list", async () => {
    signIn();
    server.use(http.delete(`${API}/projects/p1`, () => ok(undefined)));
    await expect(deleteProject("p1")).rejects.toMatchObject({ url: "/projects" });
  });

  it("searches users for the contributor picker, excluding the current user", async () => {
    signIn();
    server.use(
      http.get(`${API}/auth/profile`, () => ok({ user: alice })),
      http.get(`${API}/users/search`, () => ok({ users: [alice, bob] })),
    );
    await expect(findUsers("a")).resolves.toEqual([]);
    await expect(findUsers("ex")).resolves.toEqual([bob]);
  });
});

describe("task Server Actions", () => {
  const taskForm = {
    title: "Maquettes",
    description: "Créer les maquettes",
    dueDate: "2026-03-09",
    assigneeIds: [bob.id],
  };

  it("creates a task then applies a non-default status", async () => {
    signIn();
    const calls = recordCalls();
    server.use(
      http.post(`${API}/projects/p1/tasks`, () => ok({ task: { id: "t1" } }, 201)),
      http.put(`${API}/projects/p1/tasks/t1`, () => ok({ task: { id: "t1" } })),
    );
    const state = await createTask("p1", INITIAL_ACTION_STATE, form({ ...taskForm, status: "DONE" }));
    expect(state).toEqual({ status: "success", message: "Tâche créée.", id: "t1" });
    expect(calls).toEqual([
      `POST /projects/p1/tasks ${JSON.stringify({ title: "Maquettes", description: "Créer les maquettes", dueDate: "2026-03-09", assigneeIds: [bob.id] })}`,
      `PUT /projects/p1/tasks/t1 ${JSON.stringify({ status: "DONE" })}`,
    ]);
    server.events.removeAllListeners();
  });

  it("creates a TODO task with a single call", async () => {
    signIn();
    const calls = recordCalls();
    server.use(http.post(`${API}/projects/p1/tasks`, () => ok({ task: { id: "t2" } }, 201)));
    await createTask("p1", INITIAL_ACTION_STATE, form({ ...taskForm, status: "TODO" }));
    expect(calls).toHaveLength(1);
    server.events.removeAllListeners();
  });

  it("requires the due date", async () => {
    signIn();
    const state = await createTask("p1", INITIAL_ACTION_STATE, form({ ...taskForm, dueDate: "" }));
    expect(state.status === "error" && state.fieldErrors?.dueDate).toBeTruthy();
  });

  it("updates, deletes and comments a task", async () => {
    signIn();
    server.use(
      http.put(`${API}/projects/p1/tasks/t1`, () => ok({ task: { id: "t1" } })),
      http.delete(`${API}/projects/p1/tasks/t1`, () => ok(undefined)),
      http.post(`${API}/projects/p1/tasks/t1/comments`, () => ok({ comment: { id: "c1" } }, 201)),
    );
    await expect(updateTask("p1", "t1", INITIAL_ACTION_STATE, form({ ...taskForm, status: "IN_PROGRESS" }))).resolves.toMatchObject({
      status: "success",
    });
    await expect(deleteTask("p1", "t1")).resolves.toMatchObject({ status: "success" });
    await expect(addComment("p1", "t1", INITIAL_ACTION_STATE, form({ content: "Bien vu" }))).resolves.toMatchObject({
      status: "success",
    });
    await expect(addComment("p1", "t1", INITIAL_ACTION_STATE, form({ content: "  " }))).resolves.toMatchObject({
      status: "error",
    });
  });

  it("hides server errors behind a generic message", async () => {
    signIn();
    server.use(http.delete(`${API}/projects/p1/tasks/t1`, () => fail(500, "SQLITE_BUSY: database is locked")));
    await expect(deleteTask("p1", "t1")).resolves.toEqual({
      status: "error",
      message: "La suppression de la tâche a échoué.",
      fieldErrors: undefined,
    });
  });
});
