import { Code2, FileSearch, Link2, Radio, Search, Target } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const FEATURES = [
  {
    title: "Real-Time Citation Monitor",
    icon: Radio,
    body: "Track every citation across ChatGPT, Perplexity, Google AI Overviews, Claude, and Gemini. Updated live.",
  },
  {
    title: "See Who's Beating You (and Why)",
    icon: Target,
    body: "Compare citation share against competitors across every AI engine. Know which queries you're losing and to whom.",
  },
  {
    title: "AI-Ready Content Audit",
    icon: FileSearch,
    body: "We audit every page on your site and flag what needs to change for AI engines to cite it. Prioritised by impact.",
  },
  {
    title: "Automated Schema Implementation",
    icon: Code2,
    body: "FAQ, HowTo, Product, and QAPage schema deployed across your site. The technical layer AI engines need to read you.",
  },
  {
    title: "Third-Party Citation Network",
    icon: Link2,
    body: "Our team places your brand in external publications, startup databases, and industry directories - sources AI engines trust most.",
  },
  {
    title: "Know What Your Buyers Ask AI",
    icon: Search,
    body: "We identify the exact questions your buyers ask ChatGPT and Perplexity and build content that answers each one with your brand as the solution.",
  },
];

export function Features() {
  return (
    <section className="section-pad border-y border-[var(--border-color)] bg-[var(--bg-surface)]">
      <Reveal className="section-wrap">
        <h2 className="display text-4xl font-bold md:text-5xl">
          Everything in your GEO dashboard
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <article
              key={feature.title}
              className="surface-card cursor-default p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#00E5A040]"
            >
              <feature.icon className="text-[var(--accent-green)]" />
              <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-3 text-[var(--text-muted)]">{feature.body}</p>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
