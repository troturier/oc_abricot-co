import { ButtonLink } from "@/components/ui/Button";
import { StatusTag } from "@/components/ui/StatusTag";
import { cn } from "@/lib/cn";
import type { Task } from "@/lib/types";
import { TaskMeta } from "./TaskMeta";

/**
 * Mockup "Tâche liste › thumbnail" (dashboard list) and "Tâche Kanban".
 * "Voir" opens the task in its project page.
 */
export function AssignedTaskCard({ task, compact = false }: { task: Task; compact?: boolean }) {
  return (
    <article
      aria-labelledby={`task-${task.id}-title`}
      className={cn(
        "flex gap-6 rounded-card border border-gray-200 bg-white",
        compact ? "flex-col px-6 py-[25px] sm:px-10" : "flex-col px-6 py-[25px] sm:flex-row sm:items-stretch sm:justify-between sm:px-10",
      )}
    >
      <div className="flex min-w-0 flex-col gap-8">
        <div className="flex flex-col gap-[7px]">
          <div className="flex items-start justify-between gap-4">
            <h3 id={`task-${task.id}-title`} className="font-heading text-lg font-semibold text-black">
              {task.title}
            </h3>
            {compact && <StatusTag status={task.status} />}
          </div>
          {task.description && <p className="line-clamp-2 text-sm text-gray-500">{task.description}</p>}
        </div>
        <TaskMeta task={task} />
      </div>
      <div className={cn("flex shrink-0 gap-4", compact ? "" : "items-end justify-between sm:flex-col")}>
        {!compact && <StatusTag status={task.status} />}
        <ButtonLink
          href={`/projects/${task.projectId}#task-${task.id}`}
          className="w-[121px]"
          aria-label={`Voir la tâche ${task.title}`}
        >
          Voir
        </ButtonLink>
      </div>
    </article>
  );
}
