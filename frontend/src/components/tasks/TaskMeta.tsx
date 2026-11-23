import { CalendarIcon, CommentIcon, FolderSmallIcon } from "@/components/icons";
import { formatFullDate, formatShortDate, pluralize } from "@/lib/format";
import type { Task } from "@/lib/types";

/** "📁 Nom du projet | 📅 9 mars | 💬 2" line of the task cards. */
export function TaskMeta({ task }: { task: Task }) {
  const separator = <span aria-hidden="true" className="h-[11px] w-px bg-gray-400" />;
  return (
    <ul className="flex flex-wrap items-center gap-x-[15px] gap-y-2 text-xs text-gray-500">
      {task.project && (
        <li className="flex items-center gap-2">
          <FolderSmallIcon className="text-gray-400" />
          <span className="sr-only">Projet :</span>
          {task.project.name}
        </li>
      )}
      {task.project && separator}
      <li className="flex items-center gap-2">
        <CalendarIcon className="h-[15px] w-auto text-gray-500" />
        {task.dueDate ? (
          <time dateTime={task.dueDate.slice(0, 10)} aria-label={`Échéance : ${formatFullDate(task.dueDate)}`}>
            {formatShortDate(task.dueDate)}
          </time>
        ) : (
          <span>Sans échéance</span>
        )}
      </li>
      {separator}
      <li className="flex items-center gap-2">
        <CommentIcon className="text-gray-500" />
        <span aria-label={pluralize(task.comments.length, "commentaire")}>{task.comments.length}</span>
      </li>
    </ul>
  );
}
