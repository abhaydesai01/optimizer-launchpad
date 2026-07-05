import { Reveal } from "@/components/marketing/Reveal";
import { CONTACT_EMAIL } from "@/lib/site";

export function EarlyMover() {
  return (
    <section className="mk-section mk-hairline bg-[var(--ink-900)]" aria-labelledby="early-mover-heading">
      <div className="mk-wrap grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="mk-kicker">The early-mover window</p>
            <h2 id="early-mover-heading" className="mk-h2 mt-5 text-[var(--paper)]">
              Category answers are hardening right now.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mk-body mt-7">
              Once an AI engine settles on which brands it trusts for a
              question, that answer gets reinforced every time it&apos;s
              cited, referenced and repeated. The brands being named today are
              compounding an advantage that gets more expensive to overturn
              every quarter. The best time to earn your category&apos;s answer
              is before it hardens — and in most categories, it hasn&apos;t
              yet.
            </p>
          </Reveal>
        </div>

        <Reveal delay={140} className="h-full">
          <aside className="flex h-full flex-col justify-center border border-[var(--ink-line-strong)] bg-[var(--ink-850)] p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--mint)]">
              A word on proof
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-[var(--paper-soft)]">
              You won&apos;t find fabricated case studies or borrowed logos on
              this site — we&apos;re building our first public case studies
              now, with clients who will be named with their permission. Until
              then, our proof is the audit itself: everything we show you, you
              can verify in any engine.
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-[var(--paper-muted)]">
              Early engagements shape our public track record — which is why
              founding clients get our most senior attention.{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Founding%20client%20terms`}
                className="font-medium text-[var(--mint)] underline decoration-[var(--ink-line-strong)] underline-offset-4 hover:decoration-[var(--mint)]"
              >
                Ask about founding-client terms
              </a>
              .
            </p>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
