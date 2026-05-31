import { Building2, Rocket, TrendingUp, Users } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const AUDIENCE = [
  {
    title: "Startup Founders",
    icon: Rocket,
    body: "You don't have a marketing team. You need your brand to show up when investors and clients ask AI about your category.",
  },
  {
    title: "Marketing Heads",
    icon: TrendingUp,
    body: "You're spending on ads but losing buyers at the AI research stage. GEO fixes the top of your funnel where no ad can reach.",
  },
  {
    title: "Enterprise CMOs",
    icon: Building2,
    body: "Your brand has authority. GEO makes sure AI engines know that - and cite you first when enterprise buyers research solutions.",
  },
  {
    title: "Agency Owners",
    icon: Users,
    body: "White-label our GEO platform and team. Offer GEO to your clients as a managed service without building the capability in-house.",
  },
];

export function WhoItsFor() {
  return (
    <section className="section-pad border-y border-[var(--border-color)] bg-[var(--bg-surface)]">
      <Reveal className="section-wrap">
        <h2 className="display text-4xl font-bold md:text-5xl">
          Built for every team that sells to buyers who use AI
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {AUDIENCE.map((item) => (
            <article
              key={item.title}
              className="surface-card p-6 transition-colors hover:border-[#00E5A040]"
            >
              <item.icon className="text-[var(--accent-green)]" />
              <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-[var(--text-muted)]">{item.body}</p>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
