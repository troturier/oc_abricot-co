/** Project progression bar (mockup: grey track #e5e7eb, radius 40). */
export function ProgressBar({ value, label }: { value: number; label: string }) {
  const percent = Math.round(Math.min(100, Math.max(0, value)));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      className="h-[7px] w-full overflow-hidden rounded-[40px] bg-gray-200"
    >
      <div className="h-full rounded-[40px] bg-brand" style={{ width: `${percent}%` }} />
    </div>
  );
}
