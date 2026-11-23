import type { ActionState } from "@/lib/action-state";

/** Global form message, announced by screen readers when it appears. */
export function FormMessage({ state }: { state: ActionState }) {
  return (
    <div aria-live="polite" role="status" className="empty:hidden">
      {state.status === "error" && !state.fieldErrors && (
        <p className="rounded-input bg-todo-bg px-4 py-3 text-sm text-todo">{state.message}</p>
      )}
    </div>
  );
}
