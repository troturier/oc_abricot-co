"use client";

import { useId, useState } from "react";

/**
 * The backend has no password reset route: instead of a dead link, the mockup's
 * "Mot de passe oublié ?" link reveals how to recover the account.
 */
export function ForgotPassword() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="text-sm text-brand-strong underline underline-offset-2 hover:text-ink"
      >
        Mot de passe oublié ?
      </button>
      <p id={panelId} hidden={!open} className="text-xs text-gray-600">
        La réinitialisation en ligne n&apos;est pas encore disponible. Contactez
        l&apos;administrateur de votre espace Abricot pour récupérer votre accès.
      </p>
    </div>
  );
}
