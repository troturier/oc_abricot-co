/** First focusable element: lets keyboard users jump over the navigation (WCAG 2.4.1). */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only rounded-card bg-ink px-4 py-3 text-white focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50"
    >
      Aller au contenu principal
    </a>
  );
}
