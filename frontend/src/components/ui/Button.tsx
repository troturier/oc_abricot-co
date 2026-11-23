import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "outline" | "brand" | "ghost" | "danger";

// Mockup "Button": 50px high, radius 10, Inter 16. "primary" = Default (#1f1f1f),
// "outline" = Outline orange, "brand" = orange "IA" button, disabled = grey.
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-ink-soft text-white hover:bg-ink active:bg-black",
  outline: "border border-brand bg-white text-brand-strong hover:bg-brand-light",
  brand: "bg-brand-strong text-white hover:bg-[#963f07]",
  ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
  danger: "border border-todo bg-white text-todo hover:bg-todo-bg",
};

type ButtonSize = "md" | "sm";

const SIZE_CLASSES: Record<ButtonSize, string> = {
  md: "min-h-[50px] px-6 text-base",
  sm: "min-h-10 px-4 text-sm",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2.5 rounded-card whitespace-nowrap transition-colors disabled:cursor-not-allowed disabled:border-transparent disabled:bg-gray-200 disabled:text-gray-500";

/** `className` must only add layout utilities (width, margin…), not override the variant. */
export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  return cn(BASE_CLASSES, SIZE_CLASSES[size], VARIANT_CLASSES[variant], className);
}

interface ButtonProps extends ComponentProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}

interface ButtonLinkProps extends ComponentProps<typeof Link> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/** A link styled as a button (navigation, not an action). */
export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonLinkProps) {
  return <Link className={buttonClasses(variant, size, className)} {...props} />;
}
