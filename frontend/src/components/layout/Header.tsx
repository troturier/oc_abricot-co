import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import type { User } from "@/lib/types";
import { AccountLink } from "./AccountLink";
import { MainNav } from "./MainNav";

/** Mockup "Menu": white bar, 94px high, logo / tabs / avatar, light shadow. */
export function Header({ user }: { user: User }) {
  return (
    <header className="bg-white shadow-[0_4px_10px_rgb(0_0_0/0.04)]">
      <div className="mx-auto flex min-h-[94px] max-w-[1440px] items-center justify-between gap-4 px-4 py-2 sm:px-8 lg:px-[100px]">
        <Link
          href="/dashboard"
          className="shrink-0 text-brand"
          aria-label="Abricot, tableau de bord"
        >
          <Logo className="w-[110px] sm:w-[147px]" decorative />
        </Link>
        <MainNav />
        <AccountLink user={user} />
      </div>
    </header>
  );
}
