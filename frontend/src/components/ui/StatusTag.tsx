import { STATUS_LABELS } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { TaskStatus } from "@/lib/types";

const STATUS_CLASSES: Record<TaskStatus, string> = {
  TODO: "bg-todo-bg text-todo",
  IN_PROGRESS: "bg-progress-bg text-progress",
  DONE: "bg-done-bg text-done",
  CANCELLED: "bg-gray-200 text-gray-600",
};

/** Mockup "Tag" (pill, padding 4/16) colored by task status. */
export function StatusTag({ status, className }: { status: TaskStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-[25px] shrink-0 items-center rounded-full px-4 text-sm whitespace-nowrap",
        STATUS_CLASSES[status],
        className,
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
