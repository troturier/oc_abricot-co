"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { readList, readText, toErrorState, validationError } from "@/lib/action-helpers";
import type { ActionState } from "@/lib/action-state";
import { fetchProject, searchUsers } from "@/lib/api/abricot";
import { authedRequest, requireUser } from "@/lib/auth/dal";
import type { Project, User } from "@/lib/types";
import { projectSchema, toFieldErrors } from "@/lib/validation";

function parseProjectForm(formData: FormData) {
  return projectSchema.safeParse({
    name: readText(formData, "name"),
    description: readText(formData, "description"),
    contributorEmails: readList(formData, "contributorEmails"),
  });
}

/** Creates a project; the backend makes the creator its owner (administrator). */
export async function createProject(_state: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = parseProjectForm(formData);
  if (!parsed.success) return validationError(toFieldErrors(parsed.error));

  const { name, description, contributorEmails } = parsed.data;
  try {
    const { project } = await authedRequest<{ project: Project }>("/projects", {
      method: "POST",
      body: { name, description, contributors: contributorEmails },
    });
    revalidatePath("/", "layout");
    return { status: "success", message: "Projet créé.", id: project.id };
  } catch (error) {
    return toErrorState(error, "La création du projet a échoué.");
  }
}

/**
 * Updates the name/description, then synchronizes the contributors: the backend
 * exposes one route to add a contributor (by email) and one to remove one (by id).
 */
export async function updateProject(
  projectId: string,
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = parseProjectForm(formData);
  if (!parsed.success) return validationError(toFieldErrors(parsed.error));

  const { name, description, contributorEmails } = parsed.data;
  try {
    const project = await fetchProject(projectId);
    await authedRequest(`/projects/${encodeURIComponent(projectId)}`, {
      method: "PUT",
      body: { name, description },
    });

    const wanted = new Set(contributorEmails.map((email) => email.toLowerCase()));
    const current = project.members.filter((member) => member.userId !== project.ownerId);
    const currentEmails = new Set(current.map((member) => member.user.email.toLowerCase()));

    for (const member of current) {
      if (!wanted.has(member.user.email.toLowerCase())) {
        await authedRequest(
          `/projects/${encodeURIComponent(projectId)}/contributors/${encodeURIComponent(member.userId)}`,
          { method: "DELETE" },
        );
      }
    }
    for (const email of wanted) {
      if (!currentEmails.has(email) && email !== project.owner.email.toLowerCase()) {
        await authedRequest(`/projects/${encodeURIComponent(projectId)}/contributors`, {
          method: "POST",
          body: { email },
        });
      }
    }
  } catch (error) {
    revalidatePath(`/projects/${projectId}`);
    return toErrorState(error, "La modification du projet a échoué.");
  }

  revalidatePath("/", "layout");
  return { status: "success", message: "Projet modifié.", id: projectId };
}

/** Deletes a project (only its owner is allowed by the backend). */
export async function deleteProject(projectId: string): Promise<ActionState> {
  try {
    await authedRequest(`/projects/${encodeURIComponent(projectId)}`, { method: "DELETE" });
  } catch (error) {
    return toErrorState(error, "La suppression du projet a échoué.");
  }
  revalidatePath("/", "layout");
  redirect("/projects");
}

/** Autocomplete of the contributor picker; the backend requires at least 2 characters. */
export async function findUsers(query: string): Promise<User[]> {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];
  const currentUser = await requireUser();
  const users = await searchUsers(trimmed);
  return users.filter((user) => user.id !== currentUser.id).slice(0, 8);
}
