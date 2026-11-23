"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { User } from "@/lib/types";
import { TaskFormModal } from "./TaskFormModal";

export function CreateTaskButton({ projectId, people }: { projectId: string; people: User[] }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Créer une tâche
      </Button>
      {open && <TaskFormModal projectId={projectId} people={people} onClose={close} />}
    </>
  );
}
