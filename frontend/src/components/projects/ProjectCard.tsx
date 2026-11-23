import Link from "next/link";
import { UsersIcon } from "@/components/icons";
import { Avatar } from "@/components/ui/Avatar";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Tag } from "@/components/ui/Tag";
import { getDisplayName } from "@/lib/format";
import { getProjectPeople } from "@/lib/tasks";
import type { ProjectSummary } from "@/lib/types";

/** Mockup "Card projet": title, description, progression, team. The whole card is a link. */
export function ProjectCard({ project }: { project: ProjectSummary }) {
  const people = getProjectPeople(project);
  const others = people.slice(1);
  const percent = project.totalTasks
    ? Math.round((project.doneTasks / project.totalTasks) * 100)
    : 0;

  return (
    <article className="relative flex h-full flex-col gap-12 rounded-card border border-gray-200 bg-white px-[34px] py-[30px] transition-shadow focus-within:shadow-md hover:shadow-md">
      <div className="flex flex-col gap-[7px]">
        <h2 className="font-heading text-lg font-semibold text-black">
          {/* The ::after pseudo-element stretches the link over the whole card. */}
          <Link
            href={`/projects/${project.id}`}
            className="after:absolute after:inset-0 after:rounded-card"
          >
            {project.name}
          </Link>
        </h2>
        {project.description && (
          <p className="line-clamp-3 text-sm text-gray-500">{project.description}</p>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Progression</span>
          <span aria-hidden="true" className="text-black">
            {percent}%
          </span>
        </div>
        <ProgressBar value={percent} label={`Progression du projet ${project.name}`} />
        <p className="text-[10px] text-gray-600">
          {project.doneTasks}/{project.totalTasks} tâches terminées
        </p>
      </div>
      <div className="mt-auto flex flex-col gap-[15px]">
        <p className="flex items-center gap-2 text-[10px] text-gray-600">
          <UsersIcon /> Équipe ({people.length})
        </p>
        <div className="flex flex-wrap items-center gap-1">
          <Avatar user={project.owner} tone="brand" />
          <Tag tone="brand">Propriétaire</Tag>
          {others.length > 0 && (
            <ul className="ml-1 flex -space-x-1.5" aria-label="Autres membres">
              {others.map((user) => (
                <li key={user.id}>
                  <Avatar user={user} className="ring-1 ring-white" />
                </li>
              ))}
            </ul>
          )}
          <span className="sr-only">Propriétaire : {getDisplayName(project.owner)}</span>
        </div>
      </div>
    </article>
  );
}
