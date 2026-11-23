"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { createProject, deleteProject, findUsers, updateProject } from "@/actions/projects";
import { Button } from "@/components/ui/Button";
import { TextAreaField, TextField } from "@/components/ui/Field";
import { FormMessage } from "@/components/ui/FormMessage";
import { Modal } from "@/components/ui/Modal";
import { PeoplePicker } from "@/components/ui/PeoplePicker";
import { INITIAL_ACTION_STATE, type ActionState } from "@/lib/action-state";
import type { Project } from "@/lib/types";

interface ProjectFormModalProps {
  open: boolean;
  onClose: () => void;
  /** Edit mode when a project is given, creation mode otherwise. */
  project?: Project;
  /** The owner can delete the project from the edit modal. */
  canDelete?: boolean;
}

/** Mockups "Modale création projet" and "Modale modifier projet". */
export function ProjectFormModal({ open, onClose, project, canDelete }: ProjectFormModalProps) {
  const router = useRouter();
  const action = project ? updateProject.bind(null, project.id) : createProject;
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    action,
    INITIAL_ACTION_STATE,
  );
  const [deleting, startDelete] = useTransition();
  const [name, setName] = useState(project?.name ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const errors = state.status === "error" ? state.fieldErrors : undefined;

  useEffect(() => {
    if (state.status !== "success") return;
    toast.success(state.message);
    onClose();
    if (!project && state.id) router.push(`/projects/${state.id}`);
  }, [state, onClose, project, router]);

  const contributors =
    project?.members
      .filter((member) => member.userId !== project.ownerId)
      .map((member) => member.user) ?? [];
  const isValid = name.trim().length >= 2 && description.trim().length > 0;

  function handleDelete() {
    if (
      !project ||
      !window.confirm(
        `Supprimer définitivement le projet « ${project.name} » et toutes ses tâches ?`,
      )
    )
      return;
    startDelete(async () => {
      const result = await deleteProject(project.id);
      if (result?.status === "error") toast.error(result.message);
    });
  }

  return (
    <Modal open={open} onClose={onClose} title={project ? "Modifier un projet" : "Créer un projet"}>
      <form action={formAction} noValidate className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <TextField
            label="Titre"
            name="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            error={errors?.name}
          />
          <TextAreaField
            label="Description"
            name="description"
            required
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            error={errors?.description}
          />
          <PeoplePicker
            label="Contributeurs"
            name="contributorEmails"
            valueKey="email"
            defaultSelected={contributors}
            search={findUsers}
            error={errors?.contributorEmails}
          />
        </div>
        <FormMessage state={state} />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Button type="submit" disabled={!isValid || pending} className="w-[181px]">
            {pending ? "Enregistrement…" : project ? "Enregistrer" : "Ajouter un projet"}
          </Button>
          {project && canDelete && (
            <Button variant="danger" onClick={handleDelete} disabled={deleting}>
              {deleting ? "Suppression…" : "Supprimer le projet"}
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
}
