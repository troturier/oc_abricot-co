"use client";

import { useState } from "react";
import { AssignedTaskCard } from "@/components/tasks/AssignedTaskCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { SearchField } from "@/components/ui/SearchField";
import { filterTasks } from "@/lib/tasks";
import type { Task } from "@/lib/types";

/** "Mes tâches assignées" list view, with the client-side search of the mockup. */
export function AssignedTaskList({ tasks }: { tasks: Task[] }) {
  const [query, setQuery] = useState("");
  const visibleTasks = filterTasks(tasks, query);

  return (
    <section
      aria-labelledby="assigned-tasks-title"
      className="flex flex-col gap-10 rounded-card border border-gray-200 bg-white px-4 py-10 sm:px-[59px]"
    >
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h2
            id="assigned-tasks-title"
            className="font-heading text-lg font-semibold text-ink-soft"
          >
            Mes tâches assignées
          </h2>
          <p className="text-base text-gray-500">Par ordre de priorité</p>
        </div>
        <SearchField value={query} onChange={setQuery} className="w-full sm:w-[357px]" />
      </div>
      <p className="sr-only" aria-live="polite">
        {visibleTasks.length} tâche(s) affichée(s)
      </p>
      {visibleTasks.length ? (
        <ul className="flex flex-col gap-[17px]">
          {visibleTasks.map((task) => (
            <li key={task.id}>
              <AssignedTaskCard task={task} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState>
          {tasks.length
            ? "Aucune tâche ne correspond à votre recherche."
            : "Aucune tâche ne vous est assignée pour le moment."}
        </EmptyState>
      )}
    </section>
  );
}
