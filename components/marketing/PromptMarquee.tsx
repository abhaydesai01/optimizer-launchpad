const PROMPTS = [
  "\u201CWhich hospital can I trust for my mother's surgery?\u201D",
  "\u201CIs this bank safe for my family's savings?\u201D",
  "\u201CBest jewellery house for certified diamonds?\u201D",
  "\u201CWhich developer actually delivers on time?\u201D",
  "\u201CWhich business school is worth the fees?\u201D",
  "\u201CMost trusted resort for a honeymoon?\u201D",
  "\u201CWho are the top wealth managers here?\u201D",
  "\u201CWhich clinic has real specialist credentials?\u201D",
];

export function PromptMarquee() {
  const items = [...PROMPTS, ...PROMPTS];
  return (
    <section
      className="mk-hairline overflow-hidden border-b border-[var(--ink-line)] bg-[var(--ink-900)] py-5"
      aria-label="Questions buyers are asking AI right now"
    >
      <p className="sr-only">
        Buyers are already asking AI these questions: {PROMPTS.join(" ")}
      </p>
      <div className="mk-marquee-track" aria-hidden="true">
        <div className="mk-marquee items-center">
          {items.map((prompt, index) => (
            <span
              key={index}
              className="flex items-center gap-4 whitespace-nowrap font-serif-display text-[15px] text-[var(--paper-muted)]"
            >
              {prompt}
              <span className="h-1 w-1 rounded-full bg-[var(--mint)]" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
