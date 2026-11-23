"use client";

import { useId } from "react";
import { SearchIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

/** Mockup search bar (radius 8, padding 23/32, magnifier on the right). */
export function SearchField({
  value,
  onChange,
  label = "Rechercher une tâche",
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}) {
  const id = useId();
  return (
    <div className={cn("relative", className)}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={label}
        className="h-[63px] w-full rounded-chip border border-gray-200 bg-white pr-14 pl-8 text-sm placeholder:text-gray-500 focus:border-brand"
      />
      <SearchIcon className="pointer-events-none absolute top-1/2 right-8 -translate-y-1/2 text-gray-500" />
    </div>
  );
}
