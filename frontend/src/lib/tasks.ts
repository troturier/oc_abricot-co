import type { Project, ProjectWithTasks, Task, TaskPriority, TaskStatus, User } from "@/lib/types";

const PRIORITY_RANK: Record<TaskPriority, number> = { URGENT: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
const STATUS_RANK: Record<TaskStatus, number> = { IN_PROGRESS: 0, TODO: 1, DONE: 2, CANCELLED: 3 };

function dueTime(task: Pick<Task, "dueDate">) {
  return task.dueDate ? new Date(task.dueDate).getTime() : Number.POSITIVE_INFINITY;
}

/**
 * "Most urgent first": unfinished tasks before finished ones, then the nearest
 * due date, then the priority. The backend sorts the priority alphabetically
 * (HIGH < LOW < MEDIUM < URGENT), so the order is recomputed here.
 */
export function compareByUrgency(a: Task, b: Task) {
  const aDone = a.status === "DONE" || a.status === "CANCELLED";
  const bDone = b.status === "DONE" || b.status === "CANCELLED";
  if (aDone !== bDone) return aDone ? 1 : -1;
  const byDate = dueTime(a) - dueTime(b);
  if (byDate !== 0) return byDate;
  const byPriority = PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
  if (byPriority !== 0) return byPriority;
  return STATUS_RANK[a.status] - STATUS_RANK[b.status];
}

export function sortByUrgency(tasks: Task[]) {
  return [...tasks].sort(compareByUrgency);
}

/** Case- and accent-insensitive search on the title and description. */
export function filterTasks(tasks: Task[], query: string, status: TaskStatus | "ALL" = "ALL") {
  const needle = normalize(query.trim());
  return tasks.filter(
    (task) =>
      (status === "ALL" || task.status === status) &&
      (!needle || normalize(`${task.title} ${task.description ?? ""}`).includes(needle)),
  );
}

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

/** Tasks whose due date falls in the given month (`YYYY-MM`), compared in UTC. */
export function filterTasksOfMonth(tasks: Task[], month: string) {
  return tasks.filter((task) => task.dueDate?.slice(0, 7) === month);
}

export type KanbanColumns = Record<"TODO" | "IN_PROGRESS" | "DONE", Task[]>;

export function groupTasksByStatus(tasks: Task[]): KanbanColumns {
  const columns: KanbanColumns = { TODO: [], IN_PROGRESS: [], DONE: [] };
  for (const task of sortByUrgency(tasks)) {
    if (task.status in columns) columns[task.status as keyof KanbanColumns].push(task);
  }
  return columns;
}

/** Groups tasks by due day (`YYYY-MM-DD`, chronological); tasks without a date come last. */
export function groupTasksByDueDate(tasks: Task[]) {
  const groups = new Map<string, Task[]>();
  for (const task of [...tasks].sort((a, b) => dueTime(a) - dueTime(b))) {
    const key = task.dueDate?.slice(0, 10) ?? "none";
    groups.set(key, [...(groups.get(key) ?? []), task]);
  }
  return [...groups.entries()].map(([date, items]) => ({ date, tasks: items }));
}

/**
 * Projects in which the user has assigned tasks, the most urgent first: the
 * project whose nearest unfinished task is due the soonest comes first.
 */
export function sortProjectsByUrgency(projects: ProjectWithTasks[]) {
  const nextDeadline = (project: ProjectWithTasks) =>
    Math.min(
      ...project.tasks.filter((task) => task.status !== "DONE").map(dueTime),
      Number.POSITIVE_INFINITY,
    );
  return [...projects].sort((a, b) => nextDeadline(a) - nextDeadline(b));
}

/** Every person of a project: the owner first, then the members. */
export function getProjectPeople(project: Pick<Project, "owner" | "members">): User[] {
  const members = project.members.map((member) => member.user);
  return [project.owner, ...members.filter((user) => user.id !== project.owner.id)];
}

export function canEditProject(project: Pick<Project, "userRole">) {
  return project.userRole === "ADMIN";
}

/** Shifts a `YYYY-MM` month by `delta` months. */
export function shiftMonth(month: string, delta: number) {
  const [year, monthIndex] = month.split("-").map(Number);
  const date = new Date(Date.UTC(year, monthIndex - 1 + delta, 1));
  return date.toISOString().slice(0, 7);
}

export function currentMonth(now = new Date()) {
  return now.toISOString().slice(0, 7);
}

/** Validates a `YYYY-MM` search param, falling back to the current month. */
export function parseMonthParam(value: unknown, now = new Date()) {
  return typeof value === "string" && /^\d{4}-(0[1-9]|1[0-2])$/.test(value)
    ? value
    : currentMonth(now);
}
