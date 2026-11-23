"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { toast } from "sonner";
import { addComment } from "@/actions/tasks";
import { ChevronDownIcon, ChevronUpIcon } from "@/components/icons";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { INITIAL_ACTION_STATE, type ActionState } from "@/lib/action-state";
import { formatCommentDate, getDisplayName } from "@/lib/format";
import type { Comment, User } from "@/lib/types";

/** "Commentaires (n)" collapsible block of a task, with the form to add a comment. */
export function TaskComments({
  projectId,
  taskId,
  comments,
  currentUser,
}: {
  projectId: string;
  taskId: string;
  comments: Comment[];
  currentUser: User;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const inputId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    addComment.bind(null, projectId, taskId),
    INITIAL_ACTION_STATE,
  );

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
    if (state.status === "error") toast.error(state.message);
  }, [state]);

  // Oldest first, like a conversation.
  const sortedComments = [...comments].sort((a, b) => a.createdAt.localeCompare(b.createdAt));

  return (
    <div className="border-t border-gray-200 pt-[25px]">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between text-left text-sm text-black"
      >
        Commentaires ({comments.length})
        {open ? <ChevronUpIcon className="text-ink" /> : <ChevronDownIcon className="text-ink" />}
      </button>
      <div id={panelId} hidden={!open} className="mt-6 flex flex-col gap-4">
        {sortedComments.length ? (
          <ul className="flex flex-col gap-4">
            {sortedComments.map((comment) => (
              <li key={comment.id} className="flex gap-3">
                <Avatar user={comment.author} />
                <div className="flex flex-1 flex-col gap-1 rounded-card bg-gray-100 px-[14px] py-[18px]">
                  <p className="flex flex-wrap justify-between gap-2 text-[10px] text-gray-600">
                    <span className="font-semibold text-black">
                      {getDisplayName(comment.author)}
                    </span>
                    <time dateTime={comment.createdAt}>{formatCommentDate(comment.createdAt)}</time>
                  </p>
                  <p className="text-xs whitespace-pre-line text-black">{comment.content}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600">Aucun commentaire pour le moment.</p>
        )}
        <form ref={formRef} action={formAction} className="flex items-start gap-3">
          <Avatar user={currentUser} tone="brand" decorative />
          <label htmlFor={inputId} className="sr-only">
            Ajouter un commentaire
          </label>
          <textarea
            id={inputId}
            name="content"
            required
            maxLength={2000}
            rows={2}
            placeholder="Ajouter un commentaire…"
            className="min-h-[60px] flex-1 resize-y rounded-card border border-gray-200 bg-gray-50 px-[14px] py-3 text-xs placeholder:text-gray-500 focus:border-brand"
          />
          <Button type="submit" size="sm" disabled={pending}>
            {pending ? "Envoi…" : "Envoyer"}
          </Button>
        </form>
      </div>
    </div>
  );
}
