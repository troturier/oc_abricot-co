import type { Metadata } from "next";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectModalButton } from "@/components/projects/ProjectModalButton";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { fetchProjectSummaries } from "@/lib/api/abricot";

export const metadata: Metadata = { title: "Mes projets" };

export default async function ProjectsPage() {
  const projects = await fetchProjectSummaries();
  return (
    <div className="flex flex-col gap-16 lg:pr-[12px] lg:pl-[37px]">
      <PageHeader
        title="Mes projets"
        subtitle="Gérez vos projets"
        actions={<ProjectModalButton>+ Créer un projet</ProjectModalButton>}
      />
      {projects.length ? (
        <ul className="grid gap-[15px] sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState>Vous ne participez à aucun projet. Créez-en un pour commencer.</EmptyState>
      )}
    </div>
  );
}
