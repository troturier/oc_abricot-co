"use client";

import { useState } from "react";
import { TASK_STATUSES } from "@/lib/validation";
import { STATUS_LABELS } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { TaskStatus } from "@/lib/types";

const COLORS: Record<(typeof TASK_STATUSES)[number], string> = {
  TODO: "bg-todo-bg text-todo",
  IN_PROGRESS: "bg-progress-bg text-progress",
  DONE: "bg-done-bg text-done",
};

/**
 * "Statut :" row of the task modals: the three status tags behave as a radio
 * group (native radios, so arrows and Space work). The checked tag gets a ring.
 */
export function StatusPicker({ defaultValue = "TODO" }: { defaultValue?: TaskStatus }) {
  // Controlled so that the choice survives the automatic form reset of React 19.
  const [value, setValue] = useState<TaskStatus>(defaultValue);
  return (
    <fieldset className="flex flex-col gap-[7px]">
      <legend className="mb-[7px] text-sm text-black">Statut :</legend>
      <div className="flex flex-wrap gap-2">
        {TASK_STATUSES.map((status) => (
          <label key={status} className="cursor-pointer">
            <input
              type="radio"
              name="status"
              value={status}
              checked={status === value}
              onChange={() => setValue(status)}
              className="peer sr-only"
            />
            <span
              className={cn(
                "inline-flex h-[25px] items-center rounded-full px-4 text-sm ring-offset-2 peer-checked:ring-2 peer-checked:ring-current peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-brand-strong",
                COLORS[status],
              )}
            >
              {STATUS_LABELS[status]}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
