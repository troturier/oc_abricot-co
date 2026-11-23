import { ButtonLink } from "@/components/ui/Button";

/** Unknown project, or project the user is not a member of (backend 403/404). */
export default function ProjectNotFound() {
  return (
    <div className="flex flex-col items-center gap-6 py-16 text-center">
      <h1 className="font-heading text-2xl font-semibold text-ink-soft">Page introuvable</h1>
      <p className="text-lg text-gray-600">
        Ce projet n&apos;existe pas ou vous n&apos;en êtes pas membre.
      </p>
      <ButtonLink href="/projects">Retour à mes projets</ButtonLink>
    </div>
  );
}
