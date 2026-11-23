"use client";

import { useId, useState, useTransition, type FormEvent } from "react";
import { toast } from "sonner";
import { generateTasks, saveGeneratedTasks } from "@/actions/ai";
import { EditIcon, SparkleIcon, TrashIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { FIELD_CLASSES } from "@/components/ui/Field";
import { Modal } from "@/components/ui/Modal";
import type { GeneratedTask } from "@/lib/ai/types";
import { cn } from "@/lib/cn";

interface DraftTask extends GeneratedTask {
  key: string;
}

let draftCounter = 0;
const toDraft = (task: GeneratedTask): DraftTask => ({ ...task, key: `draft-${(draftCounter += 1)}` });

/**
 * Mockups "Modale création de tâche IA" (empty) and "Modale liste de tâche IA".
 * The user describes the tasks, reviews the AI proposal (edit, delete, add) and
 * saves them into the current project.
 */
export function AiTaskModal({ projectId, onClose }: { projectId: string; onClose: () => void }) {
  const [prompt, setPrompt] = useState("");
  const [drafts, setDrafts] = useState<DraftTask[]>([]);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [generating, startGenerating] = useTransition();
  const [saving, startSaving] = useTransition();
  const promptId = useId();

  function handleGenerate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!prompt.trim() || generating) return;
    setError(null);
    startGenerating(async () => {
      const result = await generateTasks(projectId, prompt);
      if (result.status === "error") {
        setError(result.message);
        return;
      }
      // A new prompt adds tasks to the current proposal instead of replacing it.
      setDrafts((current) => {
        const titles = new Set(current.map((task) => task.title.toLowerCase()));
        return [...current, ...result.tasks.filter((task) => !titles.has(task.title.toLowerCase())).map(toDraft)];
      });
      setPrompt("");
    });
  }

  function updateDraft(key: string, changes: Partial<GeneratedTask>) {
    setDrafts((current) => current.map((task) => (task.key === key ? { ...task, ...changes } : task)));
  }

  function removeDraft(key: string) {
    setDrafts((current) => current.filter((task) => task.key !== key));
  }

  function addEmptyDraft() {
    const draft = toDraft({ title: "", description: "", priority: "MEDIUM" });
    setDrafts((current) => [...current, draft]);
    setEditingKey(draft.key);
  }

  function handleSave() {
    if (drafts.some((task) => task.title.trim().length < 2)) {
      setError("Chaque tâche doit avoir un titre d'au moins 2 caractères.");
      return;
    }
    setError(null);
    startSaving(async () => {
      const result = await saveGeneratedTasks(
        projectId,
        drafts.map(({ title, description, priority }) => ({ title, description, priority })),
      );
      if (result.status === "error") {
        setError(result.message);
        return;
      }
      toast.success(result.message);
      onClose();
    });
  }

  return (
    <Modal open onClose={onClose} title={drafts.length ? "Vos tâches..." : "Créer une tâche"} aiTitle className="sm:max-h-[calc(100dvh-4rem)]">
      <div className="flex min-h-[200px] flex-col gap-6 sm:min-h-[420px]">
        <p className="sr-only" aria-live="polite">
          {generating ? "Génération des tâches en cours…" : drafts.length ? `${drafts.length} tâche(s) proposée(s).` : ""}
        </p>

        {drafts.length > 0 && (
          <ul className="flex flex-col gap-6" aria-label="Tâches proposées par l'IA">
            {drafts.map((task) => (
              <li key={task.key}>
                {editingKey === task.key ? (
                  <DraftEditor task={task} onChange={(changes) => updateDraft(task.key, changes)} onDone={() => setEditingKey(null)} />
                ) : (
                  <article className="flex flex-col gap-6 rounded-card border border-gray-200 px-6 py-[25px] sm:px-10">
                    <div className="flex flex-col gap-[7px]">
                      <h3 className="font-heading text-lg font-semibold text-black">{task.title}</h3>
                      {task.description && <p className="text-sm text-gray-500">{task.description}</p>}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <button
                        type="button"
                        onClick={() => removeDraft(task.key)}
                        aria-label={`Supprimer la tâche ${task.title}`}
                        className="flex items-center gap-2 hover:text-todo"
                      >
                        <TrashIcon className="text-gray-400" /> Supprimer
                      </button>
                      <span aria-hidden="true" className="h-[11px] w-px bg-gray-400" />
                      <button
                        type="button"
                        onClick={() => setEditingKey(task.key)}
                        aria-label={`Modifier la tâche ${task.title}`}
                        className="flex items-center gap-2 hover:text-brand-strong"
                      >
                        <EditIcon /> Modifier
                      </button>
                    </div>
                  </article>
                )}
              </li>
            ))}
          </ul>
        )}

        {generating && (
          <div role="status" className="flex items-center justify-center gap-3 py-6 text-sm text-gray-600">
            <SparkleIcon className="animate-spin text-sparkle [animation-duration:2s]" />
            Génération en cours, l&apos;IA analyse les tâches existantes du projet…
          </div>
        )}

        {!drafts.length && !generating && (
          <p className="my-auto text-center text-sm text-gray-600">
            Décrivez ce que vous voulez accomplir : l&apos;IA s&apos;appuie sur les tâches déjà présentes dans le projet pour
            proposer des tâches complémentaires, que vous pourrez modifier avant de les ajouter.
          </p>
        )}

        {error && (
          <p role="alert" className="rounded-input bg-todo-bg px-4 py-3 text-sm text-todo">
            {error}
          </p>
        )}

        {drafts.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button onClick={handleSave} disabled={saving || generating || editingKey !== null}>
              {saving ? "Ajout en cours…" : "+ Ajouter les tâches"}
            </Button>
            <Button variant="ghost" size="sm" onClick={addEmptyDraft} disabled={saving}>
              Ajouter une tâche manuellement
            </Button>
          </div>
        )}
      </div>

      <form onSubmit={handleGenerate} className="-mx-6 border-t border-gray-200 px-6 pt-8 sm:-mx-[73px] sm:px-[52px]">
        <label htmlFor={promptId} className="sr-only">
          Décrivez les tâches que vous souhaitez ajouter
        </label>
        <div className="flex items-center gap-3 rounded-[80px] bg-gray-50 py-2 pr-2 pl-8 focus-within:outline-2 focus-within:outline-brand-strong">
          <input
            id={promptId}
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Décrivez les tâches que vous souhaitez ajouter..."
            maxLength={1000}
            disabled={generating}
            className="min-w-0 flex-1 bg-transparent py-3 text-xs text-black placeholder:text-gray-600 focus:outline-none"
          />
          <button
            type="submit"
            disabled={generating || prompt.trim().length < 3}
            aria-label="Générer les tâches avec l'IA"
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-strong text-white transition-colors hover:bg-brand-light hover:text-brand-strong",
              "disabled:cursor-not-allowed disabled:opacity-60",
            )}
          >
            <SparkleIcon className="size-3" />
          </button>
        </div>
      </form>
    </Modal>
  );
}

/** Inline editor of a proposed task ("Modifier"). */
function DraftEditor({
  task,
  onChange,
  onDone,
}: {
  task: DraftTask;
  onChange: (changes: Partial<GeneratedTask>) => void;
  onDone: () => void;
}) {
  const titleId = useId();
  const descriptionId = useId();
  return (
    <div className="flex flex-col gap-4 rounded-card border border-brand px-6 py-[25px] sm:px-10">
      <div className="flex flex-col gap-[7px]">
        <label htmlFor={titleId} className="text-sm">
          Titre
        </label>
        <input id={titleId} value={task.title} onChange={(event) => onChange({ title: event.target.value })} className={FIELD_CLASSES} autoFocus />
      </div>
      <div className="flex flex-col gap-[7px]">
        <label htmlFor={descriptionId} className="text-sm">
          Description
        </label>
        <textarea
          id={descriptionId}
          value={task.description}
          rows={3}
          onChange={(event) => onChange({ description: event.target.value })}
          className={cn(FIELD_CLASSES, "resize-y")}
        />
      </div>
      <Button size="sm" onClick={onDone} disabled={task.title.trim().length < 2} className="self-start">
        Valider
      </Button>
    </div>
  );
}
