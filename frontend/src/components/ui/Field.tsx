import { useId, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/cn";

// Mockup "Input": label (Inter 14) 7px above a 53px field, radius 4, border #e5e7eb.
export const FIELD_CLASSES =
  "w-full rounded-input border border-gray-200 bg-white px-[17px] py-[15px] text-sm text-black placeholder:text-gray-500 focus:border-brand aria-[invalid=true]:border-todo";

interface FieldShellProps {
  label: ReactNode;
  id: string;
  error?: string[];
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

/** Label, control, hint and error message wired together for assistive technologies. */
export function FieldShell({ label, id, error, hint, required, children, className }: FieldShellProps) {
  return (
    <div className={cn("flex flex-col gap-[7px]", className)}>
      <label htmlFor={id} className="text-sm text-black">
        {label}
        {required && (
          <span aria-hidden="true" className="text-black">
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error?.length && (
        <p id={`${id}-hint`} className="text-xs text-gray-500">
          {hint}
        </p>
      )}
      {error?.length ? (
        <p id={`${id}-error`} className="text-xs text-todo">
          {error.join(" ")}
        </p>
      ) : null}
    </div>
  );
}

export function describedBy(id: string, error?: string[], hint?: string) {
  if (error?.length) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

interface TextFieldProps extends Omit<ComponentProps<"input">, "id"> {
  label: ReactNode;
  error?: string[];
  hint?: string;
  trailingIcon?: ReactNode;
}

export function TextField({ label, error, hint, required, className, trailingIcon, ...props }: TextFieldProps) {
  const id = useId();
  return (
    <FieldShell label={label} id={id} error={error} hint={hint} required={required} className={className}>
      <div className="relative">
        <input
          id={id}
          required={required}
          aria-invalid={error?.length ? true : undefined}
          aria-describedby={describedBy(id, error, hint)}
          className={cn(FIELD_CLASSES, trailingIcon ? "pr-12" : undefined)}
          {...props}
        />
        {trailingIcon && (
          <span className="pointer-events-none absolute top-1/2 right-[17px] -translate-y-1/2 text-gray-500">
            {trailingIcon}
          </span>
        )}
      </div>
    </FieldShell>
  );
}

interface TextAreaFieldProps extends Omit<ComponentProps<"textarea">, "id"> {
  label: ReactNode;
  error?: string[];
  hint?: string;
}

export function TextAreaField({ label, error, hint, required, className, ...props }: TextAreaFieldProps) {
  const id = useId();
  return (
    <FieldShell label={label} id={id} error={error} hint={hint} required={required} className={className}>
      <textarea
        id={id}
        rows={2}
        required={required}
        aria-invalid={error?.length ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(FIELD_CLASSES, "min-h-[53px] resize-y")}
        {...props}
      />
    </FieldShell>
  );
}
