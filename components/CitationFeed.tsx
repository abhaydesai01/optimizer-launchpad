const ITEMS = [
  '🤖 ChatGPT cited "Optimizer360" for: "best GEO tool India"',
  '🤖 Perplexity cited your brand for: "autonomous revenue engine"',
  '🤖 Google AI featured: "what is generative engine optimization"',
  '🤖 Claude cited your case study for: "AI marketing without a team"',
  '🤖 Gemini cited your brand for: "scale revenue without hiring"',
];

export function CitationFeed() {
  const track = [...ITEMS, ...ITEMS].join("  ·  ");

  return (
    <section className="citation-track overflow-hidden border-y border-[var(--border-color)] bg-[var(--bg-surface)] py-4">
      <div className="citation-marquee w-[200%] whitespace-nowrap text-sm text-[var(--text-muted)]">
        <span className="mono">{track}</span>
      </div>
    </section>
  );
}
