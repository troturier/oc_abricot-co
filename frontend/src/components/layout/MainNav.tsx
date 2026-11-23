"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardIcon, FolderIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

const LINKS = [
  { href: "/dashboard", label: "Tableau de bord", Icon: DashboardIcon },
  { href: "/projects", label: "Projets", Icon: FolderIcon },
];

/** Mockup "Menu items": the active tab is dark (#0f0f0f) with white text. */
export function MainNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Navigation principale">
      <ul className="flex gap-1 sm:gap-4">
        {LINKS.map(({ href, label, Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-14 items-center gap-3 rounded-card px-3 text-base transition-colors sm:h-[78px] sm:px-8 lg:w-[248px] lg:justify-center",
                  active ? "bg-ink text-white" : "text-brand-strong hover:bg-brand-light",
                )}
              >
                <Icon className={cn("h-6 w-auto shrink-0", active ? "text-white" : "text-brand")} />
                <span className="max-sm:sr-only">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
