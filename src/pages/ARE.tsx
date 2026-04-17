import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionLabel from "@/components/SectionLabel";
import FadeIn from "@/components/FadeIn";
import AREChart from "@/components/AREChart";
import { ArrowRight } from "lucide-react";

const comparisonRows = [
  { label: "Identity", feeder: "No distinct identity. Just another domain.", are: "A real editorial brand people recognise: AnimationCareerIndia, VFXCourseIndia, BeautyCareerIndia.", agency: "Campaign-based. Disappears when the retainer ends." },
  { label: "Content", feeder: "20 thin articles, ranks briefly, fades.", are: "Category-leading content library. Compounding monthly.", agency: "Campaign content only. Written to convert, not to rank or build audience." },
  { label: "Social Presence", feeder: "None.", are: "YouTube + Instagram + LinkedIn + WhatsApp. Owned audiences, not rented.", agency: "Managed posts. Not owned audiences." },
  { label: "Lead Quality", feeder: "Cold form submit. Low trust.", are: "Lead has consumed 3–5 pieces of content before submitting. Already convinced.", agency: "Cold leads from ads." },
  { label: "Competitive Moat", feeder: "None. Replicable overnight.", are: "50K YouTube subscribers + 200 ranking articles. Takes years to replicate.", agency: "None." },
  { label: "What Happens When Spend Stops", feeder: "Traffic drops to zero.", are: "Organic keeps generating leads every day.", agency: "Leads stop immediately." },
];

const stages = [
  { num: 1, title: "Website Build", desc: "A full media brand website. Course pages, city pages, salary calculators, career path tools, and an AI chatbot that responds to queries in Hindi and English. Built for search intent, not just branding." },
  { num: 2, title: "SEO + Content Engine", desc: "200 to 500 keyword clusters researched and mapped. 20 to 40 original articles published per month — course guides, salary reports, career paths, comparison pieces, city-specific pages." },
  { num: 3, title: "Lead Generation Tools", desc: "Interactive tools embedded across the brand — career quizzes, salary calculators, portfolio review submissions, free demo class booking. Capture intent at the exact moment it is highest." },
  { num: 4, title: "Social Content Engine", desc: "YouTube Shorts, Instagram Reels, LinkedIn posts, and WhatsApp channel content — published daily. Automated production pipeline. A/B tested for retention and engagement." },
  { num: 5, title: "Engagement Automation", desc: "Every comment across YouTube and Instagram scanned every two hours. Buying signals trigger a direct message response within 15 minutes. Hindi and English." },
  { num: 6, title: "Lead Capture + Intent Scoring", desc: "Eight lead intake sources, all consolidated. Each lead scored 1 to 10 based on content consumed, source, engagement signals, and location. CRM push within 60 seconds." },
  { num: 7, title: "CRM + Nurture Sequences", desc: "Five course-specific nurture tracks — email and WhatsApp. Hot leads (score 8–10) trigger instant alerts to the nearest franchise or admissions center." },
  { num: 8, title: "Self-Optimisation", desc: "Weekly content scoring identifies what is performing. Ad budget auto-reallocated toward highest-converting channels. CMO performance report every Monday at 8am." },
];

const vsRows = [
  { label: "Setup time", are: "1 week", agency: "2–4 weeks", inhouse: "3–6 months" },
  { label: "Monthly cost", are: "Scoped to brand", agency: "₹1–3L + ads", inhouse: "₹5–10L salaries" },
  { label: "Lead quality", are: "Content-warmed, high intent", agency: "Cold, ad-driven", inhouse: "Varies" },
  { label: "Organic compounding", are: "Yes — 97% by M60", agency: "No", inhouse: "Slow" },
  { label: "Human dependency", are: "Zero after launch", agency: "Fully dependent", inhouse: "Fully dependent" },
  { label: "ROAS timeline", are: "Week 4 first leads", agency: "Immediate but thin", inhouse: "6+ months" },
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
          ARE builds category-owning media brands, compounds organic traffic across six platforms, and delivers qualified leads to your CRM — without a human operator. Ever.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="rounded-full px-8 shadow-lg shadow-primary/25 h-12">
            <Link to="/contact">Book a Demo <ArrowRight className="ml-2" size={18} /></Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-white/10 h-12">
            <Link to="/contact">Talk to Us <ArrowRight className="ml-2" size={18} /></Link>
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
          <div className="glass-card rounded-xl p-6 md:p-8 mb-10">
            <p className="text-muted-foreground leading-relaxed mb-4">
              A feeder website is a thin digital property — 20 articles, a contact form, and a prayer that someone stumbles onto it. When you turn off the ads, it dies. It has no brand equity, no social presence, no audience, and no compounding value.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              A media brand is a different thing entirely. It has a name people search for directly. It has a YouTube channel with subscribers who come back. It has Instagram followers who engage because they trust the content. It has 200+ Google-ranking articles that answer every question a prospective student, patient, or customer is already asking. When you turn off the ads, it keeps working.
            </p>
            <p className="text-primary font-semibold mt-4">ARE builds media brands. Your competitors build feeder websites. That gap compounds every month.</p>
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
                  {comparisonRows.map((r) => (
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
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">8 Stages. Running Simultaneously. 24 Hours a Day.</h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">ARE is not a campaign. It is an autonomous revenue infrastructure platform. Once deployed, all eight stages run in parallel — continuously learning, optimising, and compounding.</p>
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

    {/* ARE vs ALTERNATIVES */}
    <section className="py-24 relative">
      <div className="absolute inset-0 section-gradient" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <SectionLabel>WHY ARE</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">How ARE Compares</h2>
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
                  {vsRows.map((r) => (
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
        <FadeIn className="mt-8 text-center">
          <Button asChild className="rounded-full px-8 shadow-lg shadow-primary/25">
            <Link to="/contact">Book a Call <ArrowRight className="ml-2" size={16} /></Link>
          </Button>
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
            { title: "Content Layer", items: "SEO Articles · YouTube Shorts · Instagram Reels · LinkedIn Posts · WhatsApp Channel — producing, publishing, and testing 24/7.", color: "border-l-primary" },
            { title: "Capture Layer", items: "8 lead intake sources · Intent scoring 1–10 · Lead enrichment · Cross-domain deduplication · CRM push within 60 seconds.", color: "border-l-accent" },
            { title: "Distribution Layer", items: "Course-specific email nurture · WhatsApp sequences · Franchise center alerts · CMO dashboard · Weekly AI performance report.", color: "border-l-o360-purple" },
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
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center mb-10">
            <SectionLabel>WHO IS ARE FOR</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4 tracking-tight">Built For Anyone Who Needs Leads.</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">If your business depends on generating qualified leads — ARE is built for you. From single-location operators to multi-city enterprises, across every category and vertical.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["Education", "Healthcare", "Beauty & Wellness", "Real Estate", "FinTech", "SaaS", "D2C", "Professional Services", "Enterprise B2B", "Local Businesses"].map(v => (
              <span key={v} className="px-5 py-2.5 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">{v}</span>
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center max-w-2xl mx-auto mb-10">ARE is live and delivering qualified leads across multiple verticals — wherever there are customers searching, ARE captures them.</p>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 tracking-tight">Ready to Build Your Revenue Engine?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Book a demo call and we'll model the media brand architecture for your vertical, show you what category ownership looks like in your space, and walk you through what ARE delivers.</p>
            <Button asChild size="lg" className="rounded-full px-10 shadow-lg shadow-primary/25 h-12">
              <Link to="/contact">Book a Call <ArrowRight className="ml-2" size={18} /></Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  </div>
);

export default AREPage;
