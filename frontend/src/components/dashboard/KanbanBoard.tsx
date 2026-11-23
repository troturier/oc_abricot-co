import Link from "next/link";
import { AssignedTaskCard } from "@/components/tasks/AssignedTaskCard";
import { formatMonth, STATUS_LABELS } from "@/lib/format";
import { groupTasksByStatus, shiftMonth } from "@/lib/tasks";
import type { Task } from "@/lib/types";

const COLUMNS = [
  { status: "TODO", title: "À faire" },
  { status: "IN_PROGRESS", title: "En cours" },
  { status: "DONE", title: "Terminées" },
] as const;

/**
 * Kanban view of the tasks of the month, by status (functional spec §5).
 * The month selector is not in the mockup: it lets the user browse other months.
 */
export function KanbanBoard({ tasks, month }: { tasks: Task[]; month: string }) {
  const columns = groupTasksByStatus(tasks);
  const monthDate = new Date(`${month}-01T00:00:00Z`);
  const monthHref = (delta: number) => `/dashboard?view=kanban&month=${shiftMonth(month, delta)}`;

  return (
    <section aria-labelledby="kanban-title" className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link
          href={monthHref(-1)}
          scroll={false}
          className="rounded-chip px-3 py-2 text-brand-strong hover:bg-brand-light"
          aria-label="Mois précédent"
        >
          ‹
        </Link>
        <h2
          id="kanban-title"
          className="font-heading text-lg font-semibold text-ink-soft first-letter:uppercase"
        >
          Tâches de {formatMonth(monthDate)}
        </h2>
        <Link
          href={monthHref(1)}
          scroll={false}
          className="rounded-chip px-3 py-2 text-brand-strong hover:bg-brand-light"
          aria-label="Mois suivant"
        >
          ›
        </Link>
      </div>
      <div className="grid gap-[22px] lg:-mr-[55px] lg:-ml-[30px] lg:grid-cols-3">
        {COLUMNS.map(({ status, title }) => (
          <section
            key={status}
            aria-labelledby={`column-${status}`}
            className="flex flex-col gap-10 rounded-card border border-todo-bg bg-white px-6 py-10"
          >
            <h3
              id={`column-${status}`}
              className="flex items-center gap-2 font-heading text-lg font-semibold text-black"
            >
              {title}
              <span className="rounded-full bg-gray-200 px-4 py-0.5 font-sans text-sm font-normal text-gray-600">
                <span className="sr-only">Nombre de tâches :</span>
                {columns[status].length}
              </span>
            </h3>
            {columns[status].length ? (
              <ul className="flex flex-col gap-[17px]">
                {columns[status].map((task) => (
                  <li key={task.id}>
                    <AssignedTaskCard task={task} compact />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-600">
                Aucune tâche « {STATUS_LABELS[status].toLowerCase()} » ce mois-ci.
              </p>
            )}
          </section>
        ))}
      </div>
    </section>
  );
}
