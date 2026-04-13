import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionLabel from "@/components/SectionLabel";
import FadeIn from "@/components/FadeIn";
import AREChart from "@/components/AREChart";
import { ArrowRight, Check, X, Minus } from "lucide-react";

const comparisonRows = [
  { label: "Identity", feeder: "No distinct brand identity", are: "Distinct editorial identity (e.g. AnimationCareerIndia)", agency: "Campaign-based, disappears" },
  { label: "Content Strategy", feeder: "20 thin articles, ranks briefly", are: "Category-leading content library, compounding monthly", agency: "Campaign content only" },
  { label: "Social Presence", feeder: "No independent social", are: "YouTube + Instagram + LinkedIn + WhatsApp — owned audiences", agency: "Managed posts, not owned" },
  { label: "Lead Quality", feeder: "Cold form submit, low trust", are: "Lead has consumed 3–5 pieces of content before submitting", agency: "Cold leads from ads" },
  { label: "Competitive Moat", feeder: "None — replicable overnight", are: "50K YouTube subs + 200 ranking articles — years to replicate", agency: "None" },
  { label: "Long-Term Value", feeder: "Ads off = traffic zero", are: "Remove ads — organic still generates leads every day", agency: "Stop paying = stop leads" },
];

const stages = [
  { num: 1, title: "Website Build", desc: "Domain + course pages + salary calculators + city pages + AI chatbot in Hindi + English" },
  { num: 2, title: "SEO + Content", desc: "200–500 keyword clusters. 20–40 articles/month. City pages. Comparison content. Compounding monthly." },
  { num: 3, title: "Lead Gen Tools", desc: "Career quizzes, salary calculators, portfolio review tools, free demo class booking" },
  { num: 4, title: "Social Content Engine", desc: "YouTube Shorts + Instagram Reels + LinkedIn + WhatsApp Channel. Daily. Automated. A/B tested." },
  { num: 5, title: "Engagement Automation", desc: "Every comment scanned every 2 hours. Buying signals trigger DM in 15 minutes. Hindi + English." },
  { num: 6, title: "Lead Capture + Scoring", desc: "8 intake sources. Intent scored 1–10. Enriched. Cross-domain deduplicated. CRM push in 60 seconds." },
  { num: 7, title: "CRM + Nurture", desc: "5 course-specific email + WhatsApp sequences. Track-specific. Hot leads alerted to franchise center." },
  { num: 8, title: "Self-Optimisation", desc: "Weekly content scoring. Budget auto-reallocation. A/B winner propagation. CMO report Monday 8am." },
];

const phases = [
  { phase: "Phase 1", months: "M1–M9", spend: "₹1,75,000/mo", desc: "Paid only, zero organic" },
  { phase: "Phase 2", months: "M10–M18", spend: "₹1,30,000/mo", desc: "SEO ranking, 38% organic" },
  { phase: "Phase 3", months: "M19–M28", spend: "₹1,00,000/mo", desc: "Content compounding, 66% organic" },
  { phase: "Phase 4", months: "M29–M36", spend: "₹75,000/mo", desc: "Organic dominant, 82% organic" },
  { phase: "Phase 5", months: "M37–M48", spend: "₹50,000/mo", desc: "Brand protection, 88% organic" },
  { phase: "Phase 6", months: "M49–M60", spend: "₹35,000/mo", desc: "Floor spend, 97% organic" },
];

const vsRows = [
  { label: "Setup time", are: "4 weeks", agency: "2–4 weeks", inhouse: "3–6 months" },
  { label: "Monthly cost", are: "₹2.5L–6L", agency: "₹1–3L + ad spend", inhouse: "₹5–10L salaries" },
  { label: "Lead quality", are: "Content-warmed, high intent", agency: "Cold, ad-driven", inhouse: "Varies" },
  { label: "Organic compounding", are: "Yes — 97% organic by M60", agency: "No", inhouse: "Slow" },
  { label: "Human dependency", are: "Zero after launch", agency: "Fully dependent", inhouse: "Fully dependent" },
  { label: "Self-optimisation", are: "Weekly AI-driven", agency: "Manual", inhouse: "Manual" },
  { label: "You own the asset", are: "Yes — ₹40–50 Cr", agency: "No", inhouse: "Partially" },
];

const AREPage = () => (
  <div className="min-h-screen pt-16">
    {/* HERO */}
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
        <SectionLabel>FLAGSHIP PRODUCT</SectionLabel>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">The Autonomous Revenue Engine</h1>
        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
          ARE builds category-owning media brands, compounds organic traffic across 6 platforms, and delivers qualified leads to your CRM — without a human operator. Ever.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg"><Link to="/contact">Book a Demo <ArrowRight className="ml-1" size={16} /></Link></Button>
          <Button asChild variant="outline" size="lg"><Link to="/pricing">See Pricing</Link></Button>
        </div>
      </div>
    </section>

    {/* MEDIA BRAND MODEL */}
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn>
          <SectionLabel>THE MODEL</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10">We Don't Build Feeder Websites. We Build Media Brands.</h2>
        </FadeIn>
        <FadeIn>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Criteria</th>
                  <th className="py-3 px-4 text-muted-foreground font-medium">Feeder Website</th>
                  <th className="py-3 px-4 text-primary font-bold border-x border-primary/30">ARE Media Brand</th>
                  <th className="py-3 px-4 text-muted-foreground font-medium">Traditional Agency</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((r, i) => (
                  <tr key={r.label} className={i % 2 === 0 ? "bg-card/50" : ""}>
                    <td className="py-3 px-4 font-medium text-foreground">{r.label}</td>
                    <td className="py-3 px-4 text-muted-foreground text-center">{r.feeder}</td>
                    <td className="py-3 px-4 text-foreground text-center border-x border-primary/30 bg-primary/5">{r.are}</td>
                    <td className="py-3 px-4 text-muted-foreground text-center">{r.agency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </div>
    </section>

    {/* 8 STAGES */}
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn>
          <SectionLabel>HOW ARE WORKS</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10">8 Stages. Running Simultaneously. 24 Hours a Day.</h2>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map((s, i) => (
            <FadeIn key={s.num} delay={i * 0.05}>
              <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold mb-3">{s.num}</div>
                <h3 className="text-base font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* SPEND MODEL */}
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn>
          <SectionLabel>THE COMPOUNDING MODEL</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Start at ₹1.75L/Month. End at ₹35K.</h2>
          <p className="text-muted-foreground mb-10">Spend declines as organic builds. 97% of leads are free by Month 60.</p>
        </FadeIn>
        <FadeIn><AREChart /></FadeIn>
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mt-10">
          {phases.map((p, i) => (
            <FadeIn key={p.phase} delay={i * 0.05}>
              <div className="bg-card rounded-lg p-4 text-center border border-border">
                <div className="text-xs font-bold text-primary mb-1">{p.phase}</div>
                <div className="text-xs text-muted-foreground mb-1">{p.months}</div>
                <div className="text-sm font-semibold text-foreground">{p.spend}</div>
                <div className="text-xs text-muted-foreground mt-1">{p.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
        <div className="grid md:grid-cols-4 gap-4 mt-8">
          {[
            { num: "₹5.4L", label: "Total 5-yr spend" },
            { num: "₹105L", label: "If flat spend" },
            { num: "₹5.1L", label: "Saved per brand" },
            { num: "₹13", label: "Per lead at M60" },
          ].map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.1}>
              <div className="bg-card rounded-lg p-4 text-center">
                <div className="text-xl font-bold text-primary">{s.num}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* ARE vs ALTERNATIVES */}
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn>
          <SectionLabel>WHY ARE</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10">ARE vs the Alternatives</h2>
        </FadeIn>
        <FadeIn>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground">Criteria</th>
                  <th className="py-3 px-4 text-primary font-bold border-x border-primary/30">ARE</th>
                  <th className="py-3 px-4 text-muted-foreground">Traditional Agency</th>
                  <th className="py-3 px-4 text-muted-foreground">In-House Team</th>
                </tr>
              </thead>
              <tbody>
                {vsRows.map((r, i) => (
                  <tr key={r.label} className={i % 2 === 0 ? "bg-card/50" : ""}>
                    <td className="py-3 px-4 font-medium text-foreground">{r.label}</td>
                    <td className="py-3 px-4 text-foreground text-center border-x border-primary/30 bg-primary/5">{r.are}</td>
                    <td className="py-3 px-4 text-muted-foreground text-center">{r.agency}</td>
                    <td className="py-3 px-4 text-muted-foreground text-center">{r.inhouse}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </div>
    </section>

    {/* PLATFORM ARCHITECTURE */}
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn>
          <SectionLabel>PLATFORM ARCHITECTURE</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10">Three Layers. Always Running.</h2>
        </FadeIn>
        {[
          { title: "Content Layer", items: "SEO Articles · YouTube Shorts · Instagram Reels · LinkedIn Posts · WhatsApp Channel" },
          { title: "Capture Layer", items: "8 Lead Sources · Intent Scoring 1–10 · Enrichment · Cross-Domain Dedup · CRM Push 60s" },
          { title: "Distribution Layer", items: "Email Nurture · WhatsApp Sequences · Franchise Alerts · CMO Dashboard · Weekly AI Report" },
        ].map((layer, i) => (
          <FadeIn key={layer.title} delay={i * 0.1}>
            <div className="bg-card border border-border rounded-lg p-6 mb-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">{layer.title}</h3>
              <p className="text-sm text-muted-foreground">{layer.items}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>

    {/* WHO IS ARE FOR */}
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn>
          <SectionLabel>WHO IS ARE FOR</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Built for Scale.</h2>
        </FadeIn>
        <FadeIn>
          <div className="flex flex-wrap gap-3">
            {["Vocational Education", "Higher Education", "Beauty & Wellness", "HealthTech", "Real Estate", "Franchise Networks"].map(v => (
              <span key={v} className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">{v}</span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>

    {/* BOTTOM CTA */}
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Start the Pilot — ₹2,50,000/month.</h2>
          <p className="text-muted-foreground mb-8">First lead in Week 4.</p>
          <Button asChild size="lg"><Link to="/contact">Book a Call <ArrowRight className="ml-1" size={16} /></Link></Button>
        </FadeIn>
      </div>
    </section>
  </div>
);

export default AREPage;
