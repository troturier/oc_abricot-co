import { describe, expect, it } from "vitest";
import { loginSchema, profileSchema, projectSchema, registerSchema, taskSchema, toFieldErrors } from "./validation";

describe("validation schemas", () => {
  it("requires a valid email and a password to log in", () => {
    const result = loginSchema.safeParse({ email: "nope", password: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = toFieldErrors(result.error);
      expect(errors.email).toEqual(["Adresse email invalide."]);
      expect(errors.password).toEqual(["Le mot de passe est requis."]);
    }
  });

  it("applies the backend password rule on registration", () => {
    expect(registerSchema.safeParse({ email: "a@b.fr", password: "password" }).success).toBe(false);
    expect(registerSchema.safeParse({ email: "a@b.fr", password: "P@ssword123" }).success).toBe(true);
  });

  it("requires the current password to set a new one", () => {
    const base = { firstName: "Alice", lastName: "Martin", email: "a@b.fr", currentPassword: "" };
    const result = profileSchema.safeParse({ ...base, newPassword: "N3w@Password" });
    expect(result.success).toBe(false);
    if (!result.success) expect(toFieldErrors(result.error).currentPassword).toBeDefined();
    expect(profileSchema.safeParse({ ...base, newPassword: "" }).success).toBe(true);
  });

  it("validates projects", () => {
    expect(projectSchema.safeParse({ name: "A", description: "x" }).success).toBe(false);
    const parsed = projectSchema.parse({ name: " Site ", description: "Refonte", contributorEmails: ["bob@example.com"] });
    expect(parsed).toEqual({ name: "Site", description: "Refonte", contributorEmails: ["bob@example.com"] });
  });

  it("validates tasks and defaults the status to TODO", () => {
    expect(taskSchema.safeParse({ title: "Tâche", description: "Desc", dueDate: "" }).success).toBe(false);
    expect(taskSchema.safeParse({ title: "Tâche", description: "Desc", dueDate: "2026-03-09", status: "LATE" }).success).toBe(false);
    expect(taskSchema.parse({ title: "Tâche", description: "Desc", dueDate: "2026-03-09" })).toMatchObject({
      status: "TODO",
      assigneeIds: [],
    });
  });
});
