"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { createTask, updateTask } from "@/actions/tasks";
import { CalendarIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { TextAreaField, TextField } from "@/components/ui/Field";
import { FormMessage } from "@/components/ui/FormMessage";
import { Modal } from "@/components/ui/Modal";
import { PeoplePicker } from "@/components/ui/PeoplePicker";
import { INITIAL_ACTION_STATE, type ActionState } from "@/lib/action-state";
import { toDateInputValue } from "@/lib/format";
import type { Task, User } from "@/lib/types";
import { StatusPicker } from "./StatusPicker";

interface TaskFormModalProps {
  projectId: string;
  /** People who can be assigned: the project owner and members. */
  people: User[];
  /** Edit mode when a task is given. */
  task?: Task;
  onClose: () => void;
}

/** Mockups "Modale création de tâche" and "Modale modifier une tâche". */
export function TaskFormModal({ projectId, people, task, onClose }: TaskFormModalProps) {
  const action = task ? updateTask.bind(null, projectId, task.id) : createTask.bind(null, projectId);
  const [state, formAction, pending] = useActionState<ActionState, FormData>(action, INITIAL_ACTION_STATE);
  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [dueDate, setDueDate] = useState(toDateInputValue(task?.dueDate ?? null));
  const errors = state.status === "error" ? state.fieldErrors : undefined;
  const isValid = title.trim().length >= 2 && description.trim().length > 0 && dueDate !== "";

  useEffect(() => {
    if (state.status !== "success") return;
    toast.success(state.message);
    onClose();
  }, [state, onClose]);

  return (
    <Modal open onClose={onClose} title={task ? "Modifier" : "Créer une tâche"}>
      <form action={formAction} noValidate className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <TextField label="Titre" name="title" required={!task} value={title} onChange={(event) => setTitle(event.target.value)} error={errors?.title} />
          <TextAreaField
            label="Description"
            name="description"
            required={!task}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            error={errors?.description}
          />
          <TextField
            label="Échéance"
            name="dueDate"
            type="date"
            required={!task}
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            error={errors?.dueDate}
            trailingIcon={<CalendarIcon className="h-4 w-auto" />}
          />
          <PeoplePicker
            label="Assigné à :"
            name="assigneeIds"
            valueKey="id"
            options={people}
            defaultSelected={task?.assignees.map((assignee) => assignee.user) ?? []}
            error={errors?.assigneeIds}
          />
          <StatusPicker defaultValue={task?.status} />
        </div>
        <FormMessage state={state} />
        <Button type="submit" disabled={!isValid || pending} className="self-start sm:w-[244px]">
          {pending ? "Enregistrement…" : task ? "Enregistrer" : "+ Ajouter une tâche"}
        </Button>
      </form>
    </Modal>
  );
}
