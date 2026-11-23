import type { TaskStatus, User } from "@/lib/types";

const shortDateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  timeZone: "UTC",
});
const fullDateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
const monthFormatter = new Intl.DateTimeFormat("fr-FR", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
const commentDateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Paris",
});

// Due dates are stored as midnight UTC: format them in UTC so the day never shifts.

/** "9 mars" (mockup format). */
export function formatShortDate(isoDate: string) {
  return shortDateFormatter.format(new Date(isoDate));
}

/** "9 mars 2026", used in accessible labels. */
export function formatFullDate(isoDate: string) {
  return fullDateFormatter.format(new Date(isoDate));
}

/** "novembre 2026". */
export function formatMonth(date: Date) {
  return monthFormatter.format(date);
}

export function formatCommentDate(isoDate: string) {
  return commentDateFormatter.format(new Date(isoDate));
}

/** Value of an `<input type="date">` (YYYY-MM-DD) from an ISO date. */
export function toDateInputValue(isoDate: string | null) {
  return isoDate ? isoDate.slice(0, 10) : "";
}

/** Display name of a user, falling back to the email when no name is set. */
export function getDisplayName(user: Pick<User, "name" | "email">) {
  return user.name?.trim() || user.email;
}

/** Two-letter initials shown in avatars ("Alice Martin" → "AM"). */
export function getInitials(user: Pick<User, "name" | "email">) {
  const source = user.name?.trim() || user.email.split("@")[0];
  const words = source.split(/[\s._-]+/).filter(Boolean);
  const initials =
    words.length >= 2 ? `${words[0][0]}${words[words.length - 1][0]}` : source.slice(0, 2);
  return initials.toUpperCase();
}

/** Splits the single backend `name` field into the first/last name of the account form. */
export function splitName(name: string | null) {
  const trimmed = name?.trim() ?? "";
  const spaceIndex = trimmed.indexOf(" ");
  if (spaceIndex === -1) return { firstName: trimmed, lastName: "" };
  return { firstName: trimmed.slice(0, spaceIndex), lastName: trimmed.slice(spaceIndex + 1) };
}

export const STATUS_LABELS: Record<TaskStatus, string> = {
  TODO: "À faire",
  IN_PROGRESS: "En cours",
  DONE: "Terminée",
  CANCELLED: "Annulée",
};

/** "1 personne", "3 personnes"… */
export function pluralize(count: number, singular: string, plural = `${singular}s`) {
  return `${count} ${count > 1 ? plural : singular}`;
}
