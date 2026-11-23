import Link from "next/link";
import { CalendarIcon } from "@/components/icons";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatusTag } from "@/components/ui/StatusTag";
import { formatFullDate, formatShortDate, pluralize } from "@/lib/format";
import { sortByUrgency, sortProjectsByUrgency } from "@/lib/tasks";
import type { ProjectWithTasks } from "@/lib/types";

/**
 * Third dashboard view (functional spec §5): projects in which the user has
 * assigned tasks, the most urgent first. Not drawn in the mockup: it reuses the
 * card and tag styles of the other views.
 */
export function UrgentProjectsList({ projects }: { projects: ProjectWithTasks[] }) {
  const sortedProjects = sortProjectsByUrgency(projects);
  return (
    <section
      aria-labelledby="urgent-projects-title"
      className="flex flex-col gap-10 rounded-card border border-gray-200 bg-white px-4 py-10 sm:px-[59px]"
    >
      <div className="flex flex-col gap-2">
        <h2 id="urgent-projects-title" className="font-heading text-lg font-semibold text-ink-soft">
          Mes projets avec tâches assignées
        </h2>
        <p className="text-base text-gray-500">Les plus urgents d&apos;abord</p>
      </div>
      {sortedProjects.length ? (
        <ul className="flex flex-col gap-[17px]">
          {sortedProjects.map((project) => {
            const tasks = sortByUrgency(project.tasks);
            const nextTask = tasks.find((task) => task.status !== "DONE" && task.dueDate);
            return (
              <li key={project.id}>
                <article className="flex flex-col gap-4 rounded-card border border-gray-200 px-6 py-[25px] sm:px-10">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <h3 className="font-heading text-lg font-semibold">
                      <Link href={`/projects/${project.id}`} className="hover:text-brand-strong hover:underline">
                        {project.name}
                      </Link>
                    </h3>
                    <span className="text-sm text-gray-600">
                      {pluralize(project.tasks.length, "tâche assignée", "tâches assignées")}
                    </span>
                  </div>
                  {nextTask?.dueDate && (
                    <p className="flex items-center gap-2 text-sm text-gray-600">
                      <CalendarIcon className="h-[15px] w-auto" />
                      Prochaine échéance :
                      <time dateTime={nextTask.dueDate.slice(0, 10)} aria-label={formatFullDate(nextTask.dueDate)}>
                        {formatShortDate(nextTask.dueDate)}
                      </time>
                      ({nextTask.title})
                    </p>
                  )}
                  <ul className="flex flex-wrap gap-2" aria-label={`Tâches assignées dans ${project.name}`}>
                    {tasks.map((task) => (
                      <li key={task.id} className="flex items-center gap-2 rounded-chip bg-gray-50 px-3 py-1 text-sm">
                        {task.title}
                        <StatusTag status={task.status} />
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            );
          })}
        </ul>
      ) : (
        <EmptyState>Aucun projet ne contient de tâche qui vous est assignée.</EmptyState>
      )}
    </section>
  );
}
