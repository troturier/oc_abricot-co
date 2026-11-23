import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface ViewOption {
  value: string;
  label: string;
  href: string;
  icon: ReactNode;
}

/**
 * Mockup "Chips" used to switch views (Liste / Kanban / Calendrier). Each view
 * has its own URL so it can be bookmarked and keeps working without JavaScript.
 */
export function ViewSwitcher({
  options,
  current,
  label,
}: {
  options: ViewOption[];
  current: string;
  label: string;
}) {
  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap gap-2.5">
        {options.map((option) => {
          const active = option.value === current;
          return (
            <li key={option.value}>
              <Link
                href={option.href}
                scroll={false}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex h-[45px] items-center gap-2.5 rounded-chip px-4 text-sm text-brand-strong transition-colors",
                  active ? "bg-brand-light" : "bg-white hover:bg-brand-light/60",
                )}
              >
                <span className="text-brand">{option.icon}</span>
                {option.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
