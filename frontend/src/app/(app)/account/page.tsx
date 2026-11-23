import type { Metadata } from "next";
import { logout } from "@/actions/auth";
import { AccountForm } from "@/components/account/AccountForm";
import { Button } from "@/components/ui/Button";
import { requireUser } from "@/lib/auth/dal";
import { getDisplayName } from "@/lib/format";

export const metadata: Metadata = { title: "Mon compte" };

export default async function AccountPage() {
  const user = await requireUser();
  return (
    <section
      aria-labelledby="account-title"
      className="flex flex-col gap-10 rounded-card border border-gray-200 bg-white px-4 py-10 sm:px-[59px] lg:-mt-[33px]"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 id="account-title" className="font-heading text-lg font-semibold text-ink-soft">
            Mon compte
          </h1>
          <p className="text-base text-gray-500">{getDisplayName(user)}</p>
        </div>
        {/* Not in the mockup: the logout button ("Button Outline orange" style). */}
        <form action={logout}>
          <Button type="submit" variant="outline">
            Se déconnecter
          </Button>
        </form>
      </div>
      <AccountForm user={user} />
    </section>
  );
}
