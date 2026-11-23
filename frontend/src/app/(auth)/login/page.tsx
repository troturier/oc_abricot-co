import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthSwitchLink } from "@/components/auth/AuthSwitchLink";
import { LoginForm } from "@/components/auth/LoginForm";
import { getSafeRedirectPath } from "@/lib/auth/token";

export const metadata: Metadata = { title: "Connexion" };

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { from, session } = await searchParams;
  return (
    <AuthShell
      title="Connexion"
      image="/images/login-background.png"
      footer={<AuthSwitchLink text="Pas encore de compte ?" href="/register" label="Créer un compte" />}
    >
      {session === "expired" && (
        <p role="status" className="rounded-input bg-progress-bg px-4 py-3 text-sm text-progress">
          Votre session a expiré, reconnectez-vous.
        </p>
      )}
      <LoginForm from={getSafeRedirectPath(from)} />
    </AuthShell>
  );
}
