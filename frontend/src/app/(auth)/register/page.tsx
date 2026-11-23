import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthSwitchLink } from "@/components/auth/AuthSwitchLink";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = { title: "Inscription" };

export default function RegisterPage() {
  return (
    <AuthShell
      title="Inscription"
      image="/images/signup-background.png"
      footer={<AuthSwitchLink text="Déjà inscrit ?" href="/login" label="Se connecter" />}
    >
      <RegisterForm />
    </AuthShell>
  );
}
