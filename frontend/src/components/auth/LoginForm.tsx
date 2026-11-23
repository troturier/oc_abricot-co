"use client";

import { useActionState, useState } from "react";
import { login } from "@/actions/auth";
import { ForgotPassword } from "@/components/auth/ForgotPassword";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Field";
import { FormMessage } from "@/components/ui/FormMessage";
import { INITIAL_ACTION_STATE } from "@/lib/action-state";

export function LoginForm({ from }: { from?: string }) {
  const [state, formAction, pending] = useActionState(login, INITIAL_ACTION_STATE);
  const errors = state.status === "error" ? state.fieldErrors : undefined;
  // Controlled fields: React 19 resets uncontrolled inputs after every form action.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form action={formAction} noValidate className="flex w-full flex-col items-center gap-[21px]">
      <input type="hidden" name="from" value={from ?? ""} />
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
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          aria-required="true"
          error={errors?.password}
        />
      </div>
      <FormMessage state={state} />
      <Button type="submit" disabled={pending} className="w-[249px]">
        {pending ? "Connexion…" : "Se connecter"}
      </Button>
      <ForgotPassword />
    </form>
  );
}
