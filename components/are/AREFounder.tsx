import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export function AREFounder() {
  return (
    <section className="are-section section-pad bg-white">
      <Reveal className="section-wrap">
        <h2 className="are-h2">
          Built by someone who's actually built brands
        </h2>

        <article className="mt-10 rounded-2xl border border-[#E2E7F0] bg-white p-8 shadow-[0_2px_16px_rgba(34,39,53,0.06)] md:p-12">
          <blockquote className="display border-l-4 border-[#00D2A0] pl-6 text-2xl leading-relaxed text-[var(--text-primary)] md:text-[28px]">
            "Every business I've built has lived or died by distribution.
            Provogue needed distribution before malls existed. Prozone needed
            distribution in cities nobody believed in. ARE is distribution
            infrastructure for the AI era — and it runs without you having to
            build a team around it."
          </blockquote>
          <p className="mt-8 text-xl font-semibold text-[var(--text-primary)]">
            Salil Chaturvedi
          </p>
          <p className="text-[#00D2A0]">Founder, Optimizer360</p>
          <p className="mt-5 max-w-4xl leading-relaxed text-[var(--text-muted)]">
            Salil Chaturvedi is the co-founder of Provogue, India's first organised
            lifestyle and fashion brand — built before modern retail infrastructure
            existed. He then founded Prozone Realty, pioneering large-format retail
            in Tier 2 Indian cities when no one believed the market was there.
            Across three decades, Salil has done one thing consistently: identified
            where revenue was going before the mainstream caught on, then built the
            infrastructure to capture it. Optimizer360 is that same conviction
            applied to AI.
          </p>
        </article>

        <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
          Also by Optimizer360:{" "}
          <Link href="/" className="font-medium text-[#00D2A0]">
            GEO — Get Cited by Every AI Engine →
          </Link>
        </p>
      </Reveal>
    </section>
  );
}
