"use client";

import {
  BarChart2,
  CheckCircle,
  Filter,
  Repeat,
  Search,
  Send,
  Shield,
  TrendingUp,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";

const STAGES = [
  {
    num: "01",
    name: "Prospect",
    Icon: Search,
    accent: "#00D2A0",
    body: "ARE identifies high-fit prospects from your ICP using web data, LinkedIn signals, and intent triggers. No manual list building.",
  },
  {
    num: "02",
    name: "Qualify",
    Icon: Filter,
    accent: "#1AD4A8",
    body: "AI scores every prospect against your qualification criteria. Only high-probability leads enter the active pipeline.",
  },
  {
    num: "03",
    name: "Outreach",
    Icon: Send,
    accent: "#35D6B0",
    body: "Personalised first-touch messages sent across email and LinkedIn. Written by AI, indistinguishable from a human rep.",
  },
  {
    num: "04",
    name: "Nurture",
    Icon: Repeat,
    accent: "#5B8BFF",
    body: "Multi-touch follow-up sequences that adapt based on prospect behaviour. ARE adjusts tone, timing, and message automatically.",
  },
  {
    num: "05",
    name: "Convert",
    Icon: CheckCircle,
    accent: "#7B7BFF",
    body: "When a prospect is ready, ARE schedules the call, sends the proposal, and follows up until a decision is made.",
  },
  {
    num: "06",
    name: "Retain",
    Icon: Shield,
    accent: "#8B7BFF",
    body: "Post-close, ARE monitors client health signals and triggers re-engagement before churn becomes a risk.",
  },
  {
    num: "07",
    name: "Expand",
    Icon: TrendingUp,
    accent: "#9B6BFF",
    body: "ARE identifies upsell and cross-sell opportunities from client usage data and initiates expansion conversations automatically.",
  },
  {
    num: "08",
    name: "Optimise",
    Icon: BarChart2,
    accent: "#8B5CF6",
    body: "Every stage generates data. ARE analyses performance and self-optimises messaging, timing, and targeting continuously.",
  },
];

export function PipelineFlow() {
  return (
    <section className="are-section bg-white py-20 md:py-24">
      <Reveal className="section-wrap">
        <h2 className="are-h2">
          How ARE runs your entire distribution — stage by stage
        </h2>

        <div className="mt-10 flex gap-3 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {STAGES.map((stage, idx) => (
            <div key={stage.name} className="flex items-center gap-2">
              <article
                className="are-card w-[280px] shrink-0 p-6"
                style={{ borderColor: `${stage.accent}55` }}
              >
                <p className="mono text-sm text-[var(--text-faint)]">{stage.num}</p>
                <div className="mt-3 inline-flex rounded-full p-2" style={{ background: `${stage.accent}22` }}>
                  <stage.Icon size={18} color={stage.accent} />
                </div>
                <h3 className="mt-3 text-lg font-semibold text-[var(--text-primary)]">
                  {stage.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  {stage.body}
                </p>
              </article>
              {idx < STAGES.length - 1 ? (
                <div className="h-[2px] w-6 origin-left bg-[linear-gradient(90deg,#00D2A0,#8B7BFF)]" />
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-transparent bg-[linear-gradient(white,white),linear-gradient(135deg,#00D2A0,#8B7BFF)] bg-origin-border bg-clip-padding p-6">
          <p className="text-lg text-[var(--text-primary)]">
            Distribution doesn't pause when your team is asleep, on holiday, or
            distracted. ARE runs your distribution infrastructure 24 hours a
            day, 7 days a week — without missing a single follow-up or dropping
            a qualified lead.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
