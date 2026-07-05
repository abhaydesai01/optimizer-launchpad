import {
  Activity,
  PenLine,
  Braces,
  Users,
  FileBarChart,
  Camera,
} from "lucide-react";
import { Reveal } from "@/components/marketing/Reveal";

const DELIVERABLES = [
  {
    icon: Activity,
    title: "Live tracking dashboard",
    body: "Your citation position across all five engines, updated weekly. Every data point reproducible by you.",
  },
  {
    icon: PenLine,
    title: "GEO content engine",
    body: "Gap-targeted content built for the questions you're losing — approved by you before anything is published.",
  },
  {
    icon: Braces,
    title: "Technical & entity structuring",
    body: "Schema, structured data and AI-readability work so the engines can parse, verify and cite what you publish.",
  },
  {
    icon: Users,
    title: "An assigned team",
    body: "A GEO strategist, a content writer and a technical developer — assigned to your account, accountable to your outcomes.",
  },
  {
    icon: FileBarChart,
    title: "Clear reporting",
    body: "A weekly status, a monthly report and a quarterly review. You always know what was done and what moved.",
  },
  {
    icon: Camera,
    title: "A real baseline",
    body: "A full before-snapshot of how AI answers about you on day one — so progress is measured against truth, not memory.",
  },
];

export function Deliverables() {
  return (
    <section id="what-you-get" className="mk-section mk-hairline" aria-labelledby="what-you-get-heading">
      <div className="mk-wrap">
        <Reveal>
          <p className="mk-kicker">What you get</p>
          <h2 id="what-you-get-heading" className="mk-h2 mt-5 max-w-2xl text-[var(--paper)]">
            Everything required to earn the answer. Nothing decorative.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DELIVERABLES.map((item, index) => (
            <Reveal key={item.title} delay={(index % 3) * 90} className="h-full">
              <article className="mk-card h-full p-8">
                <item.icon
                  className="h-6 w-6 text-[var(--mint)]"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="mt-6 font-serif-display text-lg text-[var(--paper)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--paper-muted)]">
                  {item.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
