import {
  BarChart3,
  Database,
  GitBranch,
  MessageSquare,
  TrendingUp,
  UserSearch,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";

const FEATURES = [
  {
    title: "Zero Manual Prospecting",
    icon: UserSearch,
    body: "ARE builds your prospect list automatically using ICP filters, intent signals, and real-time web data. Updated daily.",
  },
  {
    title: "AI-Written Outreach",
    icon: MessageSquare,
    body: "Every first-touch message is personalised to the prospect — their role, company, recent activity, and pain points.",
  },
  {
    title: "Adaptive Follow-Up Sequences",
    icon: GitBranch,
    body: "ARE adjusts follow-up timing and tone based on how prospects engage. Opens, clicks, and replies all trigger dynamic responses.",
  },
  {
    title: "Pipeline Intelligence",
    icon: BarChart3,
    body: "Real-time visibility into every stage. Know exactly which leads are hot, which need nurturing, and which are stuck — and why.",
  },
  {
    title: "CRM Auto-Update",
    icon: Database,
    body: "Every interaction logged automatically. No manual data entry. Your CRM stays current without anyone touching it.",
  },
  {
    title: "Revenue Forecasting",
    icon: TrendingUp,
    body: "ARE analyses pipeline velocity and conversion rates to give you accurate revenue forecasts — updated in real time.",
  },
];

export function AREFeatures() {
  return (
    <section className="are-section border-y border-[var(--border-color)] bg-[#F8FAFD] py-20 md:py-24">
      <Reveal className="section-wrap">
        <h2 className="are-h2">
          Everything ARE does to run your distribution
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <article
              key={feature.title}
              className="are-card flex h-full flex-col p-7"
            >
              <feature.icon className="text-[#00D2A0]" />
              <h3 className="mt-4 text-lg font-semibold text-[var(--text-primary)]">
                {feature.title}
              </h3>
              <p className="mt-3 text-[var(--text-muted)]">{feature.body}</p>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
