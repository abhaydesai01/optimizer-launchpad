import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/marketing/Reveal";
import { Button } from "@/components/ui/button";
import { CAL_LINK } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="border-t border-[var(--ink-line)] py-24 sm:py-32" aria-labelledby="final-cta-heading">
      <div className="mk-wrap grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <Reveal>
          <h2
            id="final-cta-heading"
            className="font-serif-display text-[clamp(2.4rem,5.6vw,4.8rem)] leading-[1.02]"
          >
            See what AI says about you <span className="mk-mark">today</span>.
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="max-w-md text-[16px] leading-relaxed text-[var(--paper-soft)]">
            On a short call we run your brand through the engines and show you
            the honest picture: where you&apos;re named, where you&apos;re
            missing, and what it would take to change that.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={CAL_LINK} target="_blank" rel="noreferrer">
                Book a demo
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/request-audit">
                Request an audit
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <p className="mk-mono mt-6 text-[12px] text-[var(--paper-muted)]">
            Confidential · No obligation · Every finding verifiable
          </p>
        </Reveal>
      </div>
    </section>
  );
}
