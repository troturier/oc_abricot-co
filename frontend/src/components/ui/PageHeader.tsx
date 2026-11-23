import type { ReactNode } from "react";

/** Page title (Manrope 24) with its subtitle (Inter 18) and optional actions on the right. */
export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-6">
      <div className="flex flex-col gap-[17px]">
        <h1 className="font-heading text-2xl font-semibold text-ink-soft">{title}</h1>
        {subtitle && <p className="text-lg text-black">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2.5">{actions}</div>}
    </div>
  );
}
