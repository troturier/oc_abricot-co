"use client";

import { useCallback, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import type { Project } from "@/lib/types";
import { ProjectFormModal } from "./ProjectFormModal";

/**
 * Button opening the project modal: "+ Créer un projet" (dashboard, projects page)
 * or the "Modifier" link of the project page.
 */
export function ProjectModalButton({
  project,
  canDelete,
  appearance = "button",
  children,
}: {
  project?: Project;
  canDelete?: boolean;
  appearance?: "button" | "link";
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      {appearance === "link" ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-sm text-brand-strong underline underline-offset-2 hover:text-ink"
        >
          {children}
        </button>
      ) : (
        <Button onClick={() => setOpen(true)} className="w-[181px]">
          {children}
        </Button>
      )}
      {/* Remounted on each opening so the form starts from the current values. */}
      {open && <ProjectFormModal open onClose={close} project={project} canDelete={canDelete} />}
    </>
  );
}
