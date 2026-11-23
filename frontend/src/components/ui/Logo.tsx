import { LogoMark } from "@/components/icons";
import { cn } from "@/lib/cn";

/**
 * Abricot logo; its color comes from the text color (orange or black variants).
 * Pass `decorative` when the surrounding element (a link) already has a name.
 */
export function Logo({ className, decorative }: { className?: string; decorative?: boolean }) {
  return (
    <LogoMark
      className={cn("h-auto", className)}
      {...(decorative ? {} : { role: "img", "aria-hidden": undefined, "aria-label": "Abricot" })}
    />
  );
}
