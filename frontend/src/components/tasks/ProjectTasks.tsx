"use client";

import { useCallback, useId, useState } from "react";
import { ChevronDownIcon } from "@/components/icons";
import { EmptyState } from "@/components/ui/EmptyState";
import { SearchField } from "@/components/ui/SearchField";
import { formatFullDate, STATUS_LABELS } from "@/lib/format";
import { filterTasks, groupTasksByDueDate, sortByUrgency } from "@/lib/tasks";
import type { Task, TaskStatus, User } from "@/lib/types";
import { TASK_STATUSES } from "@/lib/validation";
import { ProjectTaskCard } from "./ProjectTaskCard";
import { TaskFormModal } from "./TaskFormModal";

interface ProjectTasksProps {
  projectId: string;
  tasks: Task[];
  people: User[];
  currentUser: User;
  view: "list" | "calendar";
  viewSwitcher: React.ReactNode;
}

/** "Tâches" block of the project page: status filter, search, list or calendar view. */
export function ProjectTasks({
  projectId,
  tasks,
  people,
  currentUser,
  view,
  viewSwitcher,
}: ProjectTasksProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<TaskStatus | "ALL">("ALL");
  const [editedTask, setEditedTask] = useState<Task | null>(null);
  const closeEdit = useCallback(() => setEditedTask(null), []);
  const statusId = useId();

  const visibleTasks = sortByUrgency(filterTasks(tasks, query, status));

  const renderCard = (task: Task) => (
    <ProjectTaskCard
      task={task}
      projectId={projectId}
      currentUser={currentUser}
      onEdit={setEditedTask}
    />
  );

  return (
    <section
      aria-labelledby="project-tasks-title"
      className="flex flex-col gap-10 rounded-card border border-gray-200 bg-white px-4 py-10 sm:px-[59px]"
    >
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h2 id="project-tasks-title" className="font-heading text-lg font-semibold text-ink-soft">
            Tâches
          </h2>
          <p className="text-base text-gray-500">Par ordre de priorité</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          {viewSwitcher}
          <div className="relative">
            <label htmlFor={statusId} className="sr-only">
              Filtrer par statut
            </label>
            <select
              id={statusId}
              value={status}
              onChange={(event) => setStatus(event.target.value as TaskStatus | "ALL")}
              className="h-[63px] w-[152px] appearance-none rounded-chip border border-gray-200 bg-white pr-12 pl-8 text-sm text-gray-600 focus:border-brand"
            >
              <option value="ALL">Statut</option>
              {TASK_STATUSES.map((value) => (
                <option key={value} value={value}>
                  {STATUS_LABELS[value]}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-8 -translate-y-1/2 text-gray-500" />
          </div>
          <SearchField value={query} onChange={setQuery} className="w-full sm:w-[283px]" />
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {visibleTasks.length} tâche(s) affichée(s)
      </p>

      {!visibleTasks.length ? (
        <EmptyState>
          {tasks.length
            ? "Aucune tâche ne correspond à ces critères."
            : "Ce projet ne contient encore aucune tâche."}
        </EmptyState>
      ) : view === "list" ? (
        <ul className="flex flex-col gap-[17px] lg:px-[40px]">
          {visibleTasks.map((task) => (
            <li key={task.id}>{renderCard(task)}</li>
          ))}
        </ul>
      ) : (
        // Calendar view (not drawn in the mockup): tasks grouped by due date.
        <ol className="flex flex-col gap-8 lg:px-[40px]">
          {groupTasksByDueDate(visibleTasks).map(({ date, tasks: dayTasks }) => (
            <li key={date} className="flex flex-col gap-4">
              <h3 className="font-heading text-base font-semibold text-ink-soft first-letter:uppercase">
                {date === "none" ? "Sans échéance" : formatFullDate(date)}
              </h3>
              <ul className="flex flex-col gap-[17px]">
                {dayTasks.map((task) => (
                  <li key={task.id}>{renderCard(task)}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      )}

      {editedTask && (
        <TaskFormModal
          projectId={projectId}
          people={people}
          task={editedTask}
          onClose={closeEdit}
        />
      )}
    </section>
  );
}
