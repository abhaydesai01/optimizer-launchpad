import Link from "next/link";
import { AnswerBeams } from "@/components/marketing/AnswerMark";
import { Reveal } from "@/components/marketing/Reveal";
import { CAL_LINK } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="mk-section relative overflow-hidden" aria-labelledby="final-cta-heading">
      <AnswerBeams className="absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 60%, rgba(60,232,180,0.07), transparent 70%)",
        }}
      />
      <div className="mk-wrap relative text-center">
        <Reveal>
          <p className="mk-kicker">The answer is being decided right now</p>
          <h2 id="final-cta-heading" className="mk-h2 mx-auto mt-5 max-w-3xl text-[var(--paper)]">
            Let&apos;s see how AI answers about you{" "}
            <span className="mk-shimmer">today</span>.
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mk-body mx-auto mt-7 max-w-2xl">
            We&apos;ll run your brand across all five engines and show you the
            honest picture — where you&apos;re named, where you&apos;re missed,
            and what it would take to own the answer.
          </p>
        </Reveal>
        <Reveal delay={180}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/request-audit" className="mk-btn mk-btn-primary !px-10 !py-4 text-base">
              Request an Audit
            </Link>
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noreferrer"
              className="mk-btn mk-btn-ghost !px-8 !py-4 text-base"
            >
              Or book a 20-minute call
            </a>
          </div>
          <p className="mt-5 text-xs uppercase tracking-[0.18em] text-[var(--paper-muted)]">
            Confidential · No obligation · Every finding verifiable
          </p>
        </Reveal>
      </div>
    </section>
  );
}
