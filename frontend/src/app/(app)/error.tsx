"use client";

import { Button } from "@/components/ui/Button";

/** Error boundary of the authenticated pages (backend down, unexpected error). */
export default function AppError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div role="alert" className="flex flex-col items-start gap-6 rounded-card border border-gray-200 bg-white px-6 py-10 sm:px-[59px]">
      <h1 className="font-heading text-2xl font-semibold text-ink-soft">Une erreur est survenue</h1>
      <p className="text-base text-gray-600">
        Les données n&apos;ont pas pu être chargées. Vérifiez votre connexion puis réessayez.
      </p>
      <Button onClick={reset}>Réessayer</Button>
    </div>
  );
}
