"use client";

import { useCallback, useState } from "react";
import { SparkleIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { AiTaskModal } from "./AiTaskModal";

/** Orange "IA" button of the project page, opening the AI task generation modal. */
export function AiTaskButton({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  return (
    <>
      <Button variant="brand" onClick={() => setOpen(true)} className="w-[94px]">
        <SparkleIcon className="size-[19px]" />
        IA<span className="sr-only"> : générer des tâches</span>
      </Button>
      {open && <AiTaskModal projectId={projectId} onClose={close} />}
    </>
  );
}
