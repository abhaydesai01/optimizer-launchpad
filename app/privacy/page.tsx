import type { Metadata } from "next";
import { SubPageShell } from "@/components/marketing/SubPageShell";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Optimizer360.ai collects, uses and protects the information you share with us.",
  alternates: { canonical: "https://optimizer360.ai/privacy" },
};

const SECTIONS = [
  {
    heading: "Information we collect",
    body: "We collect information you submit through forms, including name, email, company, role, website, category details, and audit request context.",
  },
  {
    heading: "How we use information",
    body: "We use submitted information to respond to inquiries, prepare and deliver AI visibility audits, schedule calls, and improve our services. We do not use your competitive information for any purpose other than your engagement.",
  },
  {
    heading: "Data sharing",
    body: "We do not sell personal data. We may share data with trusted service providers required to operate the service, such as email or hosting providers, under appropriate safeguards.",
  },
  {
    heading: "Confidentiality of audit material",
    body: "Audit requests and findings are treated as confidential. We are happy to execute a mutual NDA before an engagement — write to us and we will arrange it.",
  },
  {
    heading: "Retention and security",
    body: "We retain data only as long as needed for business and legal purposes and apply reasonable technical safeguards to protect it.",
  },
  {
    heading: "Your rights",
    body: `You can request access, correction, or deletion of personal data by contacting us at ${CONTACT_EMAIL}.`,
  },
];

export default function PrivacyPage() {
  return (
    <SubPageShell
      kicker="Legal"
      title="Privacy Policy"
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
