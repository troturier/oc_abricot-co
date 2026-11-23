import type { Project, Task, User } from "@/lib/types";

export const alice: User = { id: "u1", email: "alice@example.com", name: "Alice Martin" };
export const bob: User = { id: "u2", email: "bob@example.com", name: "Bob Dupont" };
export const carol: User = { id: "u3", email: "caroline@example.com", name: "Caroline Leroy" };

export function makeTask(overrides: Partial<Task> = {}): Task {
  return {
    id: "t1",
    title: "Authentification JWT",
    description: "Implémenter le système d'authentification avec tokens JWT",
    status: "TODO",
    priority: "MEDIUM",
    dueDate: "2026-03-09T00:00:00.000Z",
    createdAt: "2026-01-01T00:00:00.000Z",
    projectId: "p1",
    project: { id: "p1", name: "API REST" },
    assignees: [],
    comments: [],
    ...overrides,
  };
}

export function makeProject(overrides: Partial<Project> = {}): Project {
  return {
    id: "p1",
    name: "API REST",
    description: "Nouvelle version de l'API",
    ownerId: alice.id,
    owner: alice,
    members: [{ id: "m1", role: "CONTRIBUTOR", userId: bob.id, user: bob }],
    userRole: "ADMIN",
    ...overrides,
  };
}
