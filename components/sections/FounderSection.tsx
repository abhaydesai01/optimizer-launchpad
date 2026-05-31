import { Reveal } from "@/components/Reveal";

export function FounderSection() {
  return (
    <section className="section-pad">
      <Reveal className="section-wrap">
        <h2 className="display text-4xl font-bold md:text-5xl">
          Built by someone who's actually built brands
        </h2>
        <article className="surface-card mt-10 p-8 md:p-12">
          <blockquote className="display border-l-4 border-[var(--accent-green)] pl-6 text-2xl leading-relaxed md:text-[28px]">
            "I built Provogue before Indian malls existed. I built Prozone
            before Tier 2 cities were investable. Now I'm building the revenue
            infrastructure for the AI era - because the pattern is the same: be
            early, be right."
          </blockquote>
          <p className="mt-8 text-xl font-semibold">Salil Chaturvedi</p>
          <p className="text-[var(--accent-green)]">Founder, Optimizer360</p>
          <p className="mt-5 max-w-4xl leading-relaxed text-[var(--text-muted)]">
            Salil Chaturvedi is the co-founder of Provogue, India's first
            organised lifestyle and fashion brand - built before modern retail
            infrastructure existed. He then founded Prozone Realty, pioneering
            large-format retail in Tier 2 Indian cities when no one believed
            the market was there. Across three decades, Salil has done one
            thing consistently: identified where revenue was going before the
            mainstream caught on, then built the infrastructure to capture it.
            Optimizer360 is that same conviction applied to AI.
          </p>
        </article>
        <p className="mt-6 text-center text-sm italic text-[var(--text-muted)]">
          "When someone with Salil's track record bets on a category, it's
          worth paying attention."
        </p>
      </Reveal>
    </section>
  );
}
