/** Loading state shown while a page fetches its data. */
export default function Loading() {
  return (
    <div role="status" className="flex flex-col gap-6" aria-live="polite">
      <span className="sr-only">Chargement…</span>
      <div className="h-8 w-64 animate-pulse rounded-card bg-gray-200" />
      <div className="h-5 w-96 max-w-full animate-pulse rounded-card bg-gray-200" />
      <div className="h-72 animate-pulse rounded-card bg-white" />
    </div>
  );
}
