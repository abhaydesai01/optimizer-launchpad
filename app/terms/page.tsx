import type { Metadata } from "next";
import { SubPageShell } from "@/components/marketing/SubPageShell";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern Optimizer360.ai's AI SEO and Generative Engine Optimisation services.",
  alternates: { canonical: "https://optimizer360.ai/terms" },
};

const SECTIONS = [
  {
    heading: "Scope of services",
    body: "Optimizer360.ai provides AI SEO (Generative Engine Optimisation) strategy, content, technical structuring and tracking services as defined in individual engagement agreements.",
  },
  {
    heading: "No guaranteed placements",
    body: "AI engines independently decide what they cite. We do not promise or guarantee specific citations, rankings or placements, and no communication from us should be read as such a guarantee. We commit to the work that earns citations and to transparent weekly reporting of results.",
  },
  {
    heading: "Client responsibilities",
    body: "You are responsible for providing accurate information, timely feedback, and rights to any materials supplied for service delivery.",
  },
  {
    heading: "Intellectual property",
    body: "Unless otherwise stated in a signed agreement, deliverables created for your engagement are licensed for your business use after payment.",
  },
  {
    heading: "Limitation of liability",
    body: "Services are provided in good faith. To the maximum extent permitted by law, Optimizer360.ai is not liable for indirect or consequential damages.",
  },
  {
    heading: "Contact",
    body: `For legal questions about these terms, contact ${CONTACT_EMAIL}.`,
  },
];

export default function TermsPage() {
  return (
    <SubPageShell
      kicker="Legal"
      title="Terms of Service"
      intro="Last updated: July 5, 2026"
    >
      <div className="max-w-3xl space-y-10">
        {SECTIONS.map((section) => (
          <article key={section.heading}>
            <h2 className="font-serif-display text-xl text-[var(--paper)]">
              {section.heading}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--paper-muted)]">
              {section.body}
            </p>
          </article>
        ))}
      </div>
    </SubPageShell>
  );
}
