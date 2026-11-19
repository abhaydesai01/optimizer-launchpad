import { Reveal } from "@/components/marketing/Reveal";
import { MARKETING_FAQ } from "@/lib/marketing-faq";

export function Faq() {
  return (
    <section id="faq" className="mk-section mk-hairline bg-[var(--ink-900)]" aria-labelledby="faq-heading">
      <div className="mk-wrap grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <Reveal>
          <div>
            <p className="mk-kicker">Questions</p>
            <h2 id="faq-heading" className="mk-h2 mt-5 text-[var(--paper)]">
              Straight answers, in writing.
            </h2>
            <p className="mk-body mt-6">
              If your question isn&apos;t here, ask us directly at{" "}
              <a
                href="mailto:hello@optimizer360.ai"
                className="text-[var(--mint)] underline decoration-[var(--ink-line-strong)] underline-offset-4 hover:decoration-[var(--mint)]"
              >
                hello@optimizer360.ai
              </a>
              .
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="divide-y divide-[var(--ink-line)] border-y border-[var(--ink-line)]">
            {MARKETING_FAQ.map((item) => (
              <details key={item.question} className="group py-2">
                <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-4 font-serif-display text-lg text-[var(--paper)] transition-colors hover:text-[var(--mint)] [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span
                    className="shrink-0 text-[var(--paper-muted)] transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-6 pr-8 text-[15px] leading-relaxed text-[var(--paper-muted)]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
