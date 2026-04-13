import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionLabel from "@/components/SectionLabel";
import FadeIn from "@/components/FadeIn";
import AREChart from "@/components/AREChart";
import { ArrowRight } from "lucide-react";

const comparisonRows = [
  { label: "Identity", feeder: "No distinct brand identity", are: "Distinct editorial identity (e.g. AnimationCareerIndia)", agency: "Campaign-based, disappears" },
  { label: "Content Strategy", feeder: "20 thin articles, ranks briefly", are: "Category-leading content library, compounding monthly", agency: "Campaign content only" },
  { label: "Social Presence", feeder: "No independent social", are: "YouTube + Instagram + LinkedIn + WhatsApp — owned audiences", agency: "Managed posts, not owned" },
  { label: "Lead Quality", feeder: "Cold form submit, low trust", are: "Lead has consumed 3–5 pieces before submitting", agency: "Cold leads from ads" },
  { label: "Competitive Moat", feeder: "None — replicable overnight", are: "50K YouTube subs + 200 ranking articles", agency: "None" },
  { label: "Long-Term Value", feeder: "Ads off = traffic zero", are: "Remove ads — organic still generates leads", agency: "Stop paying = stop leads" },
];

const stages = [
  { num: 1, title: "Website Build", desc: "Domain + course pages + salary calculators + city pages + AI chatbot in Hindi + English" },
  { num: 2, title: "SEO + Content", desc: "200–500 keyword clusters. 20–40 articles/month. City pages. Comparison content." },
  { num: 3, title: "Lead Gen Tools", desc: "Career quizzes, salary calculators, portfolio review tools, free demo class booking" },
  { num: 4, title: "Social Content Engine", desc: "YouTube Shorts + Instagram Reels + LinkedIn + WhatsApp. Daily. Automated." },
  { num: 5, title: "Engagement Automation", desc: "Every comment scanned every 2 hours. Buying signals trigger DM in 15 minutes." },
  { num: 6, title: "Lead Capture + Scoring", desc: "8 intake sources. Intent scored 1–10. Enriched. CRM push in 60 seconds." },
  { num: 7, title: "CRM + Nurture", desc: "5 course-specific email + WhatsApp sequences. Hot leads alerted to franchise center." },
  { num: 8, title: "Self-Optimisation", desc: "Weekly content scoring. Budget auto-reallocation. CMO report Monday 8am." },
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
  { label: "Monthly cost", are: "₹2.5L–6L", agency: "₹1–3L + ads", inhouse: "₹5–10L salaries" },
  { label: "Lead quality", are: "Content-warmed, high intent", agency: "Cold, ad-driven", inhouse: "Varies" },
  { label: "Organic compounding", are: "Yes — 97% by M60", agency: "No", inhouse: "Slow" },
  { label: "Human dependency", are: "Zero after launch", agency: "Fully dependent", inhouse: "Fully dependent" },
  { label: "Self-optimisation", are: "Weekly AI-driven", agency: "Manual", inhouse: "Manual" },
  { label: "You own the asset", are: "Yes — ₹40–50 Cr", agency: "No", inhouse: "Partially" },
];

const AREPage = () => (
  <div className="min-h-screen">
    {/* HERO */}
    <section className="pt-32 pb-24 hero-gradient relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] -translate-x-1/2" />
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center relative z-10">
        <SectionLabel>FLAGSHIP PRODUCT</SectionLabel>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-tight">
          The <span className="gradient-text">Autonomous Revenue Engine</span>
        </h1>
        <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          ARE builds category-owning media brands, compounds organic traffic across 6 platforms, and delivers qualified leads to your CRM — without a human operator. Ever.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="rounded-full px-8 shadow-lg shadow-primary/25 h-12">
            <Link to="/contact">Book a Demo <ArrowRight className="ml-2" size={18} /></Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-white/10 h-12">
            <Link to="/pricing">See Pricing</Link>
          </Button>
        </div>
      </div>
    </section>

    {/* MEDIA BRAND MODEL */}
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <SectionLabel>THE MODEL</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">We Don't Build Feeder Websites. We Build Media Brands.</h2>
          </div>
        </FadeIn>
        <FadeIn>
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left py-4 px-5 text-muted-foreground font-medium text-xs uppercase tracking-wider">Criteria</th>
                    <th className="py-4 px-5 text-muted-foreground font-medium text-xs uppercase tracking-wider">Feeder Website</th>
                    <th className="py-4 px-5 text-xs uppercase tracking-wider gradient-text font-bold">ARE Media Brand</th>
                    <th className="py-4 px-5 text-muted-foreground font-medium text-xs uppercase tracking-wider">Traditional Agency</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((r, i) => (
                    <tr key={r.label} className="border-b border-white/[0.03]">
                      <td className="py-4 px-5 font-medium text-foreground">{r.label}</td>
                      <td className="py-4 px-5 text-muted-foreground text-center text-xs">{r.feeder}</td>
                      <td className="py-4 px-5 text-foreground text-center bg-primary/5 border-x border-primary/10 font-medium text-xs">{r.are}</td>
                      <td className="py-4 px-5 text-muted-foreground text-center text-xs">{r.agency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>

    {/* 8 STAGES */}
    <section className="py-24 relative">
      <div className="absolute inset-0 section-gradient" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <SectionLabel>HOW ARE WORKS</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">8 Stages. Running Simultaneously. 24/7.</h2>
          </div>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {stages.map((s, i) => (
            <FadeIn key={s.num} delay={i * 0.05}>
              <div className="glass-card rounded-xl p-5 card-hover h-full">
                <div className="w-9 h-9 rounded-lg bg-primary/15 text-primary flex items-center justify-center text-sm font-bold mb-3">{s.num}</div>
                <h3 className="text-sm font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* SPEND MODEL */}
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <SectionLabel>THE COMPOUNDING MODEL</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3 tracking-tight">Start at ₹1.75L/Month. <span className="gradient-text">End at ₹35K.</span></h2>
            <p className="text-muted-foreground">Spend declines as organic builds. 97% of leads are free by Month 60.</p>
          </div>
        </FadeIn>
        <FadeIn><AREChart /></FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-10">
          {phases.map((p, i) => (
            <FadeIn key={p.phase} delay={i * 0.05}>
              <div className="glass-card rounded-xl p-4 text-center">
                <div className="text-[10px] font-bold gradient-text mb-1">{p.phase}</div>
                <div className="text-[10px] text-muted-foreground mb-1">{p.months}</div>
                <div className="text-sm font-bold text-foreground">{p.spend}</div>
                <div className="text-[10px] text-muted-foreground mt-1">{p.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { num: "₹5.4L", label: "Total 5-yr spend" },
            { num: "₹105L", label: "If flat spend" },
            { num: "₹5.1L", label: "Saved per brand" },
            { num: "₹13", label: "Per lead at M60" },
          ].map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.1}>
              <div className="glass-card rounded-xl p-5 text-center">
                <div className="text-2xl font-extrabold gradient-text stat-glow">{s.num}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* ARE vs ALTERNATIVES */}
    <section className="py-24 relative">
      <div className="absolute inset-0 section-gradient" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <SectionLabel>WHY ARE</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">ARE vs the Alternatives</h2>
          </div>
        </FadeIn>
        <FadeIn>
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left py-4 px-5 text-muted-foreground text-xs uppercase tracking-wider">Criteria</th>
                    <th className="py-4 px-5 gradient-text font-bold text-xs uppercase tracking-wider">ARE</th>
                    <th className="py-4 px-5 text-muted-foreground text-xs uppercase tracking-wider">Agency</th>
                    <th className="py-4 px-5 text-muted-foreground text-xs uppercase tracking-wider">In-House</th>
                  </tr>
                </thead>
                <tbody>
                  {vsRows.map((r, i) => (
                    <tr key={r.label} className="border-b border-white/[0.03]">
                      <td className="py-3 px-5 font-medium text-foreground">{r.label}</td>
                      <td className="py-3 px-5 text-foreground text-center bg-primary/5 border-x border-primary/10 font-medium">{r.are}</td>
                      <td className="py-3 px-5 text-muted-foreground text-center">{r.agency}</td>
                      <td className="py-3 px-5 text-muted-foreground text-center">{r.inhouse}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>

    {/* PLATFORM ARCHITECTURE */}
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <SectionLabel>PLATFORM ARCHITECTURE</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">Three Layers. Always Running.</h2>
          </div>
        </FadeIn>
        <div className="space-y-4">
          {[
            { title: "Content Layer", items: "SEO Articles · YouTube Shorts · Instagram Reels · LinkedIn Posts · WhatsApp Channel", color: "border-l-primary" },
            { title: "Capture Layer", items: "8 Lead Sources · Intent Scoring 1–10 · Enrichment · Cross-Domain Dedup · CRM Push 60s", color: "border-l-accent" },
            { title: "Distribution Layer", items: "Email Nurture · WhatsApp Sequences · Franchise Alerts · CMO Dashboard · Weekly AI Report", color: "border-l-o360-purple" },
          ].map((layer, i) => (
            <FadeIn key={layer.title} delay={i * 0.1}>
              <div className={`glass-card rounded-xl p-6 border-l-4 ${layer.color}`}>
                <h3 className="text-base font-bold text-foreground mb-2">{layer.title}</h3>
                <p className="text-sm text-muted-foreground">{layer.items}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* WHO IS ARE FOR + BOTTOM CTA */}
    <section className="py-24 hero-gradient relative overflow-hidden">
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -translate-x-1/2" />
      <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
        <FadeIn>
          <SectionLabel>WHO IS ARE FOR</SectionLabel>
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {["Vocational Education", "Higher Education", "Beauty & Wellness", "HealthTech", "Real Estate", "Franchise Networks"].map(v => (
              <span key={v} className="px-5 py-2.5 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">{v}</span>
            ))}
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 tracking-tight">Start the Pilot — ₹2,50,000/month.</h2>
          <p className="text-muted-foreground mb-8">First lead in Week 4.</p>
          <Button asChild size="lg" className="rounded-full px-10 shadow-lg shadow-primary/25 h-12">
            <Link to="/contact">Book a Call <ArrowRight className="ml-2" size={18} /></Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  </div>
);

export default AREPage;
