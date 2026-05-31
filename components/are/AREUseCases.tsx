import { Reveal } from "@/components/Reveal";

const USE_CASES = [
  {
    title: "Franchise & Retail",
    before: "Sales team manually reaching out to 20 franchisee leads/week",
    after:
      "ARE prospects 500+ qualified franchisee leads/week, books discovery calls automatically, follows up until a decision",
  },
  {
    title: "EdTech & Universities",
    before: "Admissions team manually following up with each enquiry",
    after:
      "ARE nurtures every enquiry with personalised sequences, scores intent, and escalates hot leads to human counsellors",
  },
  {
    title: "Financial Services",
    before: "Relationship managers spending 60% of time on cold outreach",
    after:
      "ARE handles all cold and warm outreach — RMs only talk to qualified, meeting-ready prospects",
  },
  {
    title: "SaaS & Technology",
    before: "SDR team building lists, writing emails, chasing follow-ups",
    after:
      "ARE replaces the entire SDR function — from list building to booked demo — at a fraction of the cost",
  },
];

export function AREUseCases() {
  return (
    <section className="are-section bg-white py-20 md:py-24">
      <Reveal className="section-wrap">
        <h2 className="are-h2">
          ARE distribution in action — by industry
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {USE_CASES.map((useCase) => (
            <article
              key={useCase.title}
              className="are-card flex h-full flex-col p-6"
            >
              <h3 className="border-l-4 border-[#00D2A0] pl-3 text-xl font-semibold text-[var(--text-primary)]">
                {useCase.title}
              </h3>
              <p className="mt-4 text-sm text-[var(--text-faint)]">
                <span className="font-medium text-[var(--text-muted)]">Before:</span>{" "}
                {useCase.before}
              </p>
              <p className="mt-3 text-sm text-[var(--text-primary)]">
                <span className="font-medium text-[#00D2A0]">After:</span>{" "}
                {useCase.after}
              </p>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
