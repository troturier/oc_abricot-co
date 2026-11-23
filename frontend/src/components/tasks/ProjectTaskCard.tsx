"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { deleteTask } from "@/actions/tasks";
import { CalendarIcon } from "@/components/icons";
import { Avatar } from "@/components/ui/Avatar";
import { StatusTag } from "@/components/ui/StatusTag";
import { Tag } from "@/components/ui/Tag";
import { formatFullDate, formatShortDate, getDisplayName } from "@/lib/format";
import type { Task, User } from "@/lib/types";
import { TaskActionsMenu } from "./TaskActionsMenu";
import { TaskComments } from "./TaskComments";

/** Mockup "Tâche liste › projet / projet comment": a task of the project page. */
export function ProjectTaskCard({
  task,
  projectId,
  currentUser,
  onEdit,
}: {
  task: Task;
  projectId: string;
  currentUser: User;
  onEdit: (task: Task) => void;
}) {
  const [deleting, startDelete] = useTransition();

  function handleDelete() {
    if (!window.confirm(`Supprimer la tâche « ${task.title} » ?`)) return;
    startDelete(async () => {
      const result = await deleteTask(projectId, task.id);
      if (result.status === "success") toast.success(result.message);
      else if (result.status === "error") toast.error(result.message);
    });
  }

  return (
    <article
      id={`task-${task.id}`}
      aria-labelledby={`task-${task.id}-title`}
      aria-busy={deleting}
      className="flex scroll-mt-8 flex-col gap-6 rounded-card border border-gray-200 bg-white px-6 py-[25px] target:border-brand sm:px-10"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-[7px]">
          <div className="flex flex-wrap items-center gap-2">
            <h3 id={`task-${task.id}-title`} className="font-heading text-lg font-semibold text-black">
              {task.title}
            </h3>
            <StatusTag status={task.status} />
          </div>
          {task.description && <p className="text-sm text-gray-500">{task.description}</p>}
        </div>
        <TaskActionsMenu taskTitle={task.title} onEdit={() => onEdit(task)} onDelete={handleDelete} />
      </div>
      <dl className="flex flex-col gap-4 text-xs">
        <div className="flex items-center gap-2">
          <dt className="text-gray-600">Échéance :</dt>
          <dd className="flex items-center gap-2 text-black">
            <CalendarIcon className="h-[15px] w-auto text-ink-soft" />
            {task.dueDate ? (
              <time dateTime={task.dueDate.slice(0, 10)} aria-label={formatFullDate(task.dueDate)}>
                {formatShortDate(task.dueDate)}
              </time>
            ) : (
              "Non définie"
            )}
          </dd>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <dt className="text-gray-600">Assigné à :</dt>
          <dd>
            {task.assignees.length ? (
              <ul className="flex flex-wrap gap-2">
                {task.assignees.map(({ user }) => (
                  <li key={user.id} className="flex items-center gap-1">
                    <Avatar user={user} decorative />
                    <Tag>{getDisplayName(user)}</Tag>
                  </li>
                ))}
              </ul>
            ) : (
              <span className="text-gray-600">Personne</span>
            )}
          </dd>
        </div>
      </dl>
      <TaskComments projectId={projectId} taskId={task.id} comments={task.comments} currentUser={currentUser} />
    </article>
  );
}
