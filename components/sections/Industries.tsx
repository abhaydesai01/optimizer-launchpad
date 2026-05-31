import { Reveal } from "@/components/Reveal";

const INDUSTRIES = [
  "Franchise & Retail",
  "EdTech & Universities",
  "Financial Services",
  "Real Estate",
  "Healthcare & Wellness",
  "SaaS & Technology",
  "Legal Services",
  "D2C & E-commerce",
  "Consulting & Professional Services",
];

export function Industries() {
  return (
    <section className="section-pad">
      <Reveal className="section-wrap">
        <h2 className="display text-4xl font-bold md:text-5xl">
          GEO that understands your industry
        </h2>
        <div className="mt-8 flex flex-wrap gap-3">
          {INDUSTRIES.map((industry) => (
            <button
              key={industry}
              className="rounded-full border border-[var(--border-color)] bg-[var(--bg-card)] px-4 py-2 text-sm text-[var(--text-muted)] transition-colors hover:border-[#00E5A040] hover:text-[var(--text-primary)]"
            >
              {industry}
            </button>
          ))}
        </div>
        <p className="mt-5 text-[var(--text-muted)]">
          Industry-specific GEO strategy - because "best tool" means something
          different in every vertical.
        </p>
      </Reveal>
    </section>
  );
}
