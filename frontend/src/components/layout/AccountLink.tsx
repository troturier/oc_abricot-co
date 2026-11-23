"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar } from "@/components/ui/Avatar";
import type { User } from "@/lib/types";

/** Avatar of the menu, linking to "Mon compte" (orange when the page is active). */
export function AccountLink({ user }: { user: User }) {
  const active = usePathname() === "/account";
  return (
    <Link href="/account" aria-current={active ? "page" : undefined} className="rounded-full">
      <Avatar user={user} size="lg" tone={active ? "active" : "brand"} decorative />
      <span className="sr-only">Mon compte</span>
    </Link>
  );
}
