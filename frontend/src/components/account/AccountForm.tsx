"use client";

import { useActionState, useState } from "react";
import { toast } from "sonner";
import { updateAccount } from "@/actions/account";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Field";
import { FormMessage } from "@/components/ui/FormMessage";
import { INITIAL_ACTION_STATE, type ActionState } from "@/lib/action-state";
import { splitName } from "@/lib/format";
import type { User } from "@/lib/types";
import { PASSWORD_HINT } from "@/lib/validation";

/**
 * Mockup "Mon compte". Changing the password requires the current one (backend
 * rule): the mockup's single "Mot de passe" field is split into "current" and "new".
 */
export function AccountForm({ user }: { user: User }) {
  // Controlled fields: React 19 resets uncontrolled inputs after every form action.
  const [values, setValues] = useState({
    ...splitName(user.name),
    email: user.email,
    currentPassword: "",
    newPassword: "",
  });
  const [state, formAction, pending] = useActionState(async (previous: ActionState, formData: FormData) => {
    const result = await updateAccount(previous, formData);
    if (result.status === "success") {
      toast.success(result.message);
      // Never keep passwords in the form once saved.
      setValues((current) => ({ ...current, currentPassword: "", newPassword: "" }));
    }
    return result;
  }, INITIAL_ACTION_STATE);
  const errors = state.status === "error" ? state.fieldErrors : undefined;

  const bind = (name: keyof typeof values) => ({
    name,
    value: values[name],
    onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
      setValues((current) => ({ ...current, [name]: event.target.value })),
    error: errors?.[name],
  });

  return (
    <form action={formAction} noValidate className="flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <TextField label="Nom" autoComplete="family-name" {...bind("lastName")} />
        <TextField label="Prénom" autoComplete="given-name" {...bind("firstName")} />
        <TextField label="Email" type="email" autoComplete="email" required {...bind("email")} />
        <TextField
          label="Mot de passe actuel"
          type="password"
          autoComplete="current-password"
          hint="Requis uniquement pour changer de mot de passe."
          {...bind("currentPassword")}
        />
        <TextField
          label="Nouveau mot de passe"
          type="password"
          autoComplete="new-password"
          hint={PASSWORD_HINT}
          {...bind("newPassword")}
        />
      </div>
      <FormMessage state={state} />
      <Button type="submit" disabled={pending} className="self-start sm:w-[242px]">
        {pending ? "Enregistrement…" : "Modifier les informations"}
      </Button>
    </form>
  );
}
