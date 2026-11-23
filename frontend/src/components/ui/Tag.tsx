import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Mockup "Tag" variants "brand" (owner) and "grey" (people, counters). */
export function Tag({
  children,
  tone = "grey",
  className,
}: {
  children: ReactNode;
  tone?: "brand" | "grey";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-[25px] items-center rounded-full px-4 text-sm whitespace-nowrap",
        tone === "brand" ? "bg-brand-light text-brand-strong" : "bg-gray-200 text-gray-600",
        className,
      )}
    >
      {children}
    </span>
  );
}
