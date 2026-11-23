import "server-only";
import { unstable_rethrow } from "next/navigation";
import { ApiError } from "@/lib/api/client";
import type { ActionState } from "@/lib/action-state";
import type { FieldErrors } from "@/lib/validation";

export function validationError(fieldErrors: FieldErrors): ActionState {
  return { status: "error", message: "Le formulaire contient des erreurs.", fieldErrors };
}

/**
 * Converts any error thrown while calling the backend into a user-facing state.
 * Unknown errors are logged on the server and replaced by a generic message so
 * that no technical detail leaks to the browser. Next.js control-flow errors
 * (redirect() of an expired session, notFound()) are rethrown untouched.
 */
export function toErrorState(error: unknown, fallback: string): ActionState {
  unstable_rethrow(error);
  if (error instanceof ApiError) {
    const fieldErrors: FieldErrors = {};
    for (const { field, message } of error.fieldErrors) {
      fieldErrors[field] = [...(fieldErrors[field] ?? []), message];
    }
    return {
      status: "error",
      message: error.status >= 500 ? fallback : error.message,
      fieldErrors: error.fieldErrors.length ? fieldErrors : undefined,
    };
  }
  console.error(error);
  return { status: "error", message: fallback };
}

/** Reads a text field from a FormData, `""` when absent. */
export function readText(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

/** Reads every value of a repeated field (checkbox lists). */
export function readList(formData: FormData, name: string) {
  return formData.getAll(name).filter((value): value is string => typeof value === "string");
}
