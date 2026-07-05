import type { Metadata } from "next";
import { SubPageShell } from "@/components/marketing/SubPageShell";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Optimizer360.ai — a Stack Intel company building the discipline of AI SEO for enterprise brands.",
  alternates: { canonical: "https://optimizer360.ai/careers" },
};

export default function CareersPage() {
  return (
    <SubPageShell
      kicker="Careers"
      title="Help brands earn the answer."
      intro="We are a lean team building the discipline of AI SEO — strategy, content and engineering that make enterprise brands citable by AI engines. If you like shipping fast with visible customer impact, we want to hear from you."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <article className="mk-card p-8">
          <h2 className="font-serif-display text-xl text-[var(--paper)]">
            Open applications
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[var(--paper-muted)]">
            We accept open applications for GEO strategy, content, and
            engineering roles. Tell us what you would own.
          </p>
          <a
            href="mailto:careers@optimizer360.ai?subject=Open%20Application%20-%20Optimizer360.ai"
            className="mk-btn mk-btn-primary mt-6"
          >
            Send application
          </a>
        </article>

        <article className="mk-card p-8">
          <h2 className="font-serif-display text-xl text-[var(--paper)]">
            What we look for
          </h2>
          <ul className="mt-3 space-y-3 text-[15px] leading-relaxed text-[var(--paper-muted)]">
            <li className="flex gap-3">
              <span className="mt-2.5 h-px w-5 shrink-0 bg-[var(--mint)]" aria-hidden="true" />
              Ownership mindset with strong execution speed
            </li>
            <li className="flex gap-3">
              <span className="mt-2.5 h-px w-5 shrink-0 bg-[var(--mint)]" aria-hidden="true" />
              Clear written communication
            </li>
            <li className="flex gap-3">
              <span className="mt-2.5 h-px w-5 shrink-0 bg-[var(--mint)]" aria-hidden="true" />
              Curiosity about how AI engines read, trust and cite
            </li>
            <li className="flex gap-3">
              <span className="mt-2.5 h-px w-5 shrink-0 bg-[var(--mint)]" aria-hidden="true" />
              Comfort working across strategy and implementation
            </li>
          </ul>
        </article>
      </div>
    </SubPageShell>
  );
}
