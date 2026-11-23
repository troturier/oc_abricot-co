import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export const metadata: Metadata = { title: "Page introuvable" };

/** 404 page (required by the self-assessment grid; not drawn in the mockup). */
export default function NotFound() {
  return (
    <main
      id="main-content"
      className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-20 text-center"
    >
      <Logo className="w-[200px] text-brand" />
      <p
        className="font-heading text-[96px] leading-none font-bold text-brand-strong"
        aria-hidden="true"
      >
        404
      </p>
      <div className="flex flex-col gap-3">
        <h1 className="font-heading text-2xl font-semibold text-ink-soft">Page introuvable</h1>
        <p className="text-lg text-gray-600">
          Cette page n&apos;existe pas ou vous n&apos;avez pas accès à son contenu.
        </p>
      </div>
      <ButtonLink href="/dashboard">Retour au tableau de bord</ButtonLink>
    </main>
  );
}
