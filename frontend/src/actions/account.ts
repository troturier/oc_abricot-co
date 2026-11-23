"use server";

import { revalidatePath } from "next/cache";
import { readText, toErrorState, validationError } from "@/lib/action-helpers";
import type { ActionState } from "@/lib/action-state";
import { authedRequest, requireUser } from "@/lib/auth/dal";
import { profileSchema, toFieldErrors } from "@/lib/validation";

/**
 * Updates the name/email and, when a new password is typed, the password.
 * The backend stores a single `name`: first and last names are joined with a space.
 */
export async function updateAccount(_state: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = profileSchema.safeParse({
    firstName: readText(formData, "firstName"),
    lastName: readText(formData, "lastName"),
    email: readText(formData, "email"),
    currentPassword: readText(formData, "currentPassword"),
    newPassword: readText(formData, "newPassword"),
  });
  if (!parsed.success) return validationError(toFieldErrors(parsed.error));

  const { firstName, lastName, email, currentPassword, newPassword } = parsed.data;
  const user = await requireUser();
  const name = `${firstName} ${lastName}`.trim();

  try {
    if (name !== (user.name ?? "") || email !== user.email) {
      await authedRequest("/auth/profile", {
        method: "PUT",
        body: { email, ...(name ? { name } : {}) },
      });
    }
    if (newPassword) {
      await authedRequest("/auth/password", {
        method: "PUT",
        body: { currentPassword, newPassword },
      });
    }
  } catch (error) {
    return toErrorState(error, "La mise à jour a échoué. Réessayez plus tard.");
  }

  revalidatePath("/", "layout");
  return {
    status: "success",
    message: newPassword
      ? "Informations et mot de passe mis à jour."
      : "Informations mises à jour.",
  };
}
