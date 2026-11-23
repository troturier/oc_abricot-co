"use server";

import { redirect } from "next/navigation";
import { apiRequest } from "@/lib/api/client";
import { readText, toErrorState, validationError } from "@/lib/action-helpers";
import type { ActionState } from "@/lib/action-state";
import { createSession, deleteSession } from "@/lib/auth/session";
import { getSafeRedirectPath } from "@/lib/auth/token";
import type { User } from "@/lib/types";
import { loginSchema, registerSchema, toFieldErrors } from "@/lib/validation";

interface AuthPayload {
  user: User;
  token: string;
}

export async function login(_state: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = loginSchema.safeParse({
    email: readText(formData, "email"),
    password: readText(formData, "password"),
  });
  if (!parsed.success) return validationError(toFieldErrors(parsed.error));

  try {
    const { token } = await apiRequest<AuthPayload>("/auth/login", {
      method: "POST",
      body: parsed.data,
    });
    await createSession(token);
  } catch (error) {
    // The backend answers 401 for both unknown email and wrong password: keep a single
    // message so that the form does not reveal which accounts exist.
    return toErrorState(error, "La connexion a échoué. Réessayez plus tard.");
  }

  redirect(getSafeRedirectPath(readText(formData, "from")));
}

export async function register(_state: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = registerSchema.safeParse({
    email: readText(formData, "email"),
    password: readText(formData, "password"),
  });
  if (!parsed.success) return validationError(toFieldErrors(parsed.error));

  try {
    const { token } = await apiRequest<AuthPayload>("/auth/register", {
      method: "POST",
      body: parsed.data,
    });
    await createSession(token);
  } catch (error) {
    return toErrorState(error, "L'inscription a échoué. Réessayez plus tard.");
  }

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
