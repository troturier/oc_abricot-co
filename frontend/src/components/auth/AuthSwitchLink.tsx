import Link from "next/link";

/** "Pas encore de compte ? Créer un compte" line at the bottom of the auth panel. */
export function AuthSwitchLink({ text, href, label }: { text: string; href: string; label: string }) {
  return (
    <p className="flex flex-wrap gap-2.5 text-sm text-black">
      {text}
      <Link href={href} className="text-brand-strong underline underline-offset-2 hover:text-ink">
        {label}
      </Link>
    </p>
  );
}
