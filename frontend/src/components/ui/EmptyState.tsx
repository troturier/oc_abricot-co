import type { ReactNode } from "react";

/** Message shown when a list has no item (not drawn in the mockup). */
export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-card border border-dashed border-gray-200 bg-white px-6 py-10 text-center text-sm text-gray-600">
      {children}
    </p>
  );
}
