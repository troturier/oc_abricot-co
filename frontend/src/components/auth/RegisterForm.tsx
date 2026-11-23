"use client";

import { useActionState, useState } from "react";
import { register } from "@/actions/auth";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Field";
import { FormMessage } from "@/components/ui/FormMessage";
import { INITIAL_ACTION_STATE } from "@/lib/action-state";
import { PASSWORD_HINT } from "@/lib/validation";

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(register, INITIAL_ACTION_STATE);
  const errors = state.status === "error" ? state.fieldErrors : undefined;
  // Controlled fields: React 19 resets uncontrolled inputs after every form action.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form action={formAction} noValidate className="flex w-full flex-col items-center gap-[29px]">
      <div className="flex w-full flex-col gap-[29px]">
        <TextField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          aria-required="true"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={errors?.email}
        />
        <TextField
          label="Mot de passe"
          name="password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          aria-required="true"
          hint={PASSWORD_HINT}
          error={errors?.password}
        />
      </div>
      <FormMessage state={state} />
      <Button type="submit" disabled={pending} className="w-[249px]">
        {pending ? "Inscription…" : "S'inscrire"}
      </Button>
    </form>
  );
}
