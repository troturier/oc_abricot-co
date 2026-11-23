import { getDisplayName, getInitials } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { User } from "@/lib/types";

type AvatarTone = "brand" | "grey" | "active";

const TONE_CLASSES: Record<AvatarTone, string> = {
  brand: "bg-brand-light text-ink",
  grey: "bg-gray-200 text-ink",
  active: "bg-brand-strong text-white",
};

interface AvatarProps {
  user: Pick<User, "name" | "email">;
  size?: "sm" | "lg";
  tone?: AvatarTone;
  /** Decorative when the name is written next to it. */
  decorative?: boolean;
  className?: string;
}

/** Mockup "User icon": initials in a circle (27px in lists, 65px in the menu). */
export function Avatar({ user, size = "sm", tone = "grey", decorative, className }: AvatarProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-normal tracking-[0.02em] uppercase",
        size === "lg" ? "size-[65px] text-sm" : "size-[27px] text-[10px]",
        TONE_CLASSES[tone],
        className,
      )}
      {...(decorative
        ? { "aria-hidden": true }
        : { role: "img", "aria-label": getDisplayName(user) })}
    >
      {getInitials(user)}
    </span>
  );
}
