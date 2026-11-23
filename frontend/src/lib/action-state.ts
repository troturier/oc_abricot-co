import type { FieldErrors } from "@/lib/validation";

/** Result returned by every form Server Action (consumed by `useActionState`). */
export type ActionState =
  | { status: "idle" }
  | { status: "success"; message: string; id?: string }
  | { status: "error"; message: string; fieldErrors?: FieldErrors };

export const INITIAL_ACTION_STATE: ActionState = { status: "idle" };
