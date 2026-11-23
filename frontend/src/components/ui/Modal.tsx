"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { CloseIcon, SparkleIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Shows the orange star of the AI modals before the title. */
  aiTitle?: boolean;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

/**
 * Modal built on the native <dialog> element: showModal() makes the rest of the
 * page inert, traps the focus, closes on Escape and gives the focus back to the
 * opener when it closes. Mockup: 598px wide, padding 79/73, title Manrope 24.
 */
export function Modal({ open, onClose, title, aiTitle, children, footer, className }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        // A click on the backdrop targets the <dialog> element itself.
        if (event.target === dialogRef.current) onClose();
      }}
      className={cn(
        "m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[598px] rounded-card bg-white p-0 text-black",
        className,
      )}
    >
      {open && (
        <div className="relative flex flex-col gap-8 px-6 pt-16 pb-10 sm:gap-14 sm:px-[73px] sm:pt-[79px] sm:pb-[79px]">
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="absolute top-6 right-6 flex size-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 sm:top-[23px] sm:right-[31px]"
          >
            <CloseIcon />
          </button>
          <h2
            id={titleId}
            className="flex items-center gap-2.5 font-heading text-2xl font-semibold text-ink-soft"
          >
            {aiTitle && <SparkleIcon className="text-sparkle" />}
            {title}
          </h2>
          {children}
          {footer}
        </div>
      )}
    </dialog>
  );
}
