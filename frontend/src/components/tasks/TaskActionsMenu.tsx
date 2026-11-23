"use client";

import { useEffect, useId, useRef, useState } from "react";
import { MoreIcon } from "@/components/icons";

/**
 * Mockup "Icon button › See more" (« … »): a disclosure listing the task actions.
 * Closes on Escape and when the focus leaves it.
 */
export function TaskActionsMenu({
  taskTitle,
  onEdit,
  onDelete,
}: {
  taskTitle: string;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.stopPropagation();
          setOpen(false);
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`Actions pour la tâche ${taskTitle}`}
        onClick={() => setOpen((value) => !value)}
        className="flex size-[57px] items-center justify-center rounded-card border border-gray-200 bg-white text-gray-500 hover:border-brand hover:text-brand"
      >
        <MoreIcon />
      </button>
      <ul
        id={menuId}
        hidden={!open}
        className="absolute right-0 z-10 mt-2 w-44 overflow-hidden rounded-card border border-gray-200 bg-white py-1 shadow-lg"
      >
        <li>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onEdit();
            }}
            className="w-full px-4 py-2 text-left text-sm hover:bg-brand-light"
          >
            Modifier
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
            className="w-full px-4 py-2 text-left text-sm text-todo hover:bg-todo-bg"
          >
            Supprimer
          </button>
        </li>
      </ul>
    </div>
  );
}
