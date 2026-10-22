import { ArticleLinks } from "@/components/marketing/ArticleLinks";
import { Reveal } from "@/components/marketing/Reveal";
import { EXPLAINER_ARTICLES } from "@/lib/featured-articles";

export function Explainers() {
  return (
    <section className="mk-section mk-hairline" aria-labelledby="explainers-heading">
      <div className="mk-wrap">
        <Reveal>
          <p className="mk-kicker">Learn</p>
          <h2 id="explainers-heading" className="mk-h2 mt-5 max-w-2xl text-[var(--paper)]">
            The explainers, in plain language.
          </h2>
          <p className="mk-body mt-6 max-w-2xl">
            What AI GEO is, how it differs from SEO, and what to do when an AI answer gets your
            brand wrong. Every claim is dated and sourced.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-10">
            <ArticleLinks items={EXPLAINER_ARTICLES} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
