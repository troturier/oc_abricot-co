"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { ChevronDownIcon, CloseIcon } from "@/components/icons";
import { Avatar } from "@/components/ui/Avatar";
import { FieldShell } from "@/components/ui/Field";
import { cn } from "@/lib/cn";
import { getDisplayName } from "@/lib/format";
import type { User } from "@/lib/types";

interface PeoplePickerProps {
  label: string;
  /** Name of the hidden inputs submitted with the form (one per selected person). */
  name: string;
  /** Submitted value: the email (project contributors) or the id (task assignees). */
  valueKey: "email" | "id";
  defaultSelected?: User[];
  /** Static options, filtered locally (task assignees = project members). */
  options?: User[];
  /** Remote search (project contributors), called with at least 2 characters. */
  search?: (query: string) => Promise<User[]>;
  error?: string[];
}

/**
 * Mockup "Combo box" (« Choisir un ou plusieurs collaborateurs »), implemented as an
 * ARIA 1.2 combobox with autocomplete: type to filter, arrows to move, Enter to
 * select, Escape to close. Selected people are shown as removable tags.
 */
export function PeoplePicker({
  label,
  name,
  valueKey,
  defaultSelected = [],
  options,
  search,
  error,
}: PeoplePickerProps) {
  const inputId = useId();
  const listboxId = useId();
  const [selected, setSelected] = useState<User[]>(defaultSelected);
  const [query, setQuery] = useState("");
  const [remoteResults, setRemoteResults] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced remote search.
  useEffect(() => {
    if (!search) return;
    const trimmed = query.trim();
    if (trimmed.length < 2) return;
    let cancelled = false;
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const users = await search(trimmed);
        if (!cancelled) setRemoteResults(users);
      } catch {
        if (!cancelled) setRemoteResults([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query, search]);

  const needle = query.trim().toLowerCase();
  const candidates = search
    ? needle.length >= 2
      ? remoteResults
      : []
    : (options ?? []).filter((user) =>
        `${user.name ?? ""} ${user.email}`.toLowerCase().includes(needle),
      );
  const results = candidates.filter((user) => !selected.some((item) => item.id === user.id));
  const expanded = open && (results.length > 0 || (Boolean(search) && needle.length >= 2));

  function select(user: User) {
    setSelected((current) => [...current, user]);
    setQuery("");
    setActiveIndex(0);
    // The list closes after each choice; typing or ArrowDown opens it again.
    setOpen(false);
    inputRef.current?.focus();
  }

  function remove(user: User) {
    setSelected((current) => current.filter((item) => item.id !== user.id));
    inputRef.current?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((index) => Math.min(index + 1, Math.max(results.length - 1, 0)));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter" && expanded && results[activeIndex]) {
      event.preventDefault();
      select(results[activeIndex]);
    } else if (event.key === "Escape" && expanded) {
      // Close the list only: the Escape key must not also close the modal.
      event.preventDefault();
      event.stopPropagation();
      setOpen(false);
    } else if (event.key === "Backspace" && !query && selected.length) {
      remove(selected[selected.length - 1]);
    }
  }

  const summary = selected.length
    ? `${selected.length} collaborateur${selected.length > 1 ? "s" : ""}`
    : "Choisir un ou plusieurs collaborateurs";

  return (
    <FieldShell label={label} id={inputId} error={error}>
      {selected.map((user) => (
        <input key={user.id} type="hidden" name={name} value={user[valueKey]} />
      ))}
      <div className="relative">
        <div
          className={cn(
            "flex min-h-[53px] flex-wrap items-center gap-2 rounded-input border bg-white px-[17px] py-2 pr-12 focus-within:border-brand",
            error?.length ? "border-todo" : "border-gray-200",
          )}
        >
          {selected.length > 0 && (
            <ul className="flex flex-wrap gap-2" aria-label="Collaborateurs sélectionnés">
              {selected.map((user) => (
                <li
                  key={user.id}
                  className="flex items-center gap-1 rounded-full bg-gray-200 py-0.5 pr-1 pl-1 text-sm text-gray-600"
                >
                  <Avatar user={user} decorative className="size-5 text-[8px]" />
                  {getDisplayName(user)}
                  <button
                    type="button"
                    onClick={() => remove(user)}
                    className="flex size-5 items-center justify-center rounded-full hover:bg-white"
                    aria-label={`Retirer ${getDisplayName(user)}`}
                  >
                    <CloseIcon className="size-2" />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <input
            ref={inputRef}
            id={inputId}
            type="text"
            role="combobox"
            autoComplete="off"
            aria-autocomplete="list"
            aria-expanded={expanded}
            aria-controls={listboxId}
            aria-activedescendant={
              expanded && results[activeIndex]
                ? `${listboxId}-${results[activeIndex].id}`
                : undefined
            }
            aria-invalid={error?.length ? true : undefined}
            aria-describedby={error?.length ? `${inputId}-error` : undefined}
            value={query}
            placeholder={selected.length ? "Ajouter…" : summary}
            onChange={(event) => {
              setQuery(event.target.value);
              setOpen(true);
              setActiveIndex(0);
            }}
            onClick={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            onKeyDown={handleKeyDown}
            className="min-w-[8rem] flex-1 bg-transparent py-2 text-xs text-black placeholder:text-gray-500 focus:outline-none"
          />
        </div>
        <ChevronDownIcon className="pointer-events-none absolute top-[22px] right-[17px] text-ink" />
        <ul
          id={listboxId}
          role="listbox"
          aria-label={label}
          hidden={!expanded}
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-input border border-gray-200 bg-white py-1 shadow-lg"
        >
          {results.map((user, index) => (
            <li
              key={user.id}
              id={`${listboxId}-${user.id}`}
              role="option"
              aria-selected={index === activeIndex}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => select(user)}
              className={cn(
                "flex cursor-pointer items-center gap-3 px-4 py-2 text-sm",
                index === activeIndex && "bg-brand-light",
              )}
            >
              <Avatar user={user} decorative />
              <span className="flex flex-col">
                {getDisplayName(user)}
                {user.name && <span className="text-xs text-gray-600">{user.email}</span>}
              </span>
            </li>
          ))}
          {search && needle.length >= 2 && !results.length && (
            <li
              role="option"
              aria-selected={false}
              aria-disabled="true"
              className="px-4 py-2 text-sm text-gray-600"
            >
              {loading ? "Recherche…" : "Aucun utilisateur trouvé"}
            </li>
          )}
        </ul>
      </div>
    </FieldShell>
  );
}
