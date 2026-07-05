import Link from "next/link";
import { Reveal } from "@/components/marketing/Reveal";

const ENGINES = [
  {
    slug: "chatgpt",
    name: "ChatGPT",
    tagline: "The default answer engine for millions of buyers.",
    tracks: ["Brand mentions in answers", "Citation URLs cited", "Competitor shortlists", "Prompt-level visibility trends"],
  },
  {
    slug: "perplexity",
    name: "Perplexity",
    tagline: "Research-mode answers with explicit source links.",
    tracks: ["Source domains cited", "Position in synthesised answers", "Per-prompt mention rate", "Citation authority mapping"],
  },
  {
    slug: "google-ai-overviews",
    name: "Google AI Overviews",
    tagline: "The AI layer on top of the world's largest search surface.",
    tracks: ["Overview inclusion", "Entity recognition", "Schema-readability signals", "Share of voice vs competitors"],
  },
  {
    slug: "gemini",
    name: "Gemini",
    tagline: "Google's generative layer across Search and Workspace.",
    tracks: ["Visibility by prompt cluster", "Sentiment framing", "Source overlap with Search", "Weekly delta tracking"],
  },
  {
    slug: "claude",
    name: "Claude",
    tagline: "The engine enterprise teams use for due diligence.",
    tracks: ["Trust-framing in answers", "Third-party source reliance", "Category recommendation lists", "Gap vs named competitors"],
  },
];

export function EngineCoverage() {
  return (
    <section
      id="engines"
      className="mk-section mk-hairline bg-[var(--ink-900)]"
      aria-labelledby="engines-heading"
    >
      <div className="mk-wrap">
        <Reveal>
          <p className="mk-kicker">Engine coverage</p>
          <h2 id="engines-heading" className="mk-h2 mt-5 max-w-2xl text-[var(--paper)]">
            All five engines. One tracking layer.
          </h2>
          <p className="mk-body mt-6 max-w-2xl">
            Peec and other trackers measure one surface at a time. We track
            every major answer engine your buyers reach — weekly, prompt by
            prompt, with the same methodology across all five.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ENGINES.map((engine, index) => (
            <Reveal key={engine.slug} delay={(index % 3) * 80} className="h-full">
              <article className="mk-card flex h-full flex-col p-8">
                <h3 className="font-serif-display text-xl text-[var(--paper)]">
                  {engine.name}
                </h3>
                <p className="mt-2 text-sm text-[var(--paper-muted)]">
                  {engine.tagline}
                </p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {engine.tracks.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[14px] leading-relaxed text-[var(--paper-soft)]"
                    >
                      <span
                        className="mt-2 h-px w-4 shrink-0 bg-[var(--mint)]"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160}>
          <div className="mt-10 text-center">
            <Link href="/engines" className="mk-btn mk-btn-ghost">
              Full engine coverage details
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
