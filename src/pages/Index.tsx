import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionLabel from "@/components/SectionLabel";
import AnimatedCounter from "@/components/AnimatedCounter";
import FadeIn from "@/components/FadeIn";
import AREChart from "@/components/AREChart";
import { ArrowRight, Zap, Building2, Phone, Heart, Calculator, Sparkles } from "lucide-react";

const products = [
  { name: "ARE", full: "Autonomous Revenue Engine", badge: "Flagship Product", borderColor: "border-l-primary", badgeColor: "bg-primary/10 text-primary border border-primary/20", desc: "Builds category-owning media brands that own keyword categories on Google, build YouTube audiences, generate Instagram followers, and route every qualified inquiry to your sales team — 24 hours a day, without a human operator.", stat: "₹40–50 Cr media brand asset built per brand over 5 years", link: "/products/are", icon: Zap, glow: "glow-teal" },
  { name: "Accounting Intelligence Platform", badge: "Live Product", borderColor: "border-l-accent", badgeColor: "bg-accent/10 text-accent border border-accent/20", desc: "Autonomous bookkeeping, GST compliance, invoice reconciliation, and real-time financial intelligence — powered by large language models. Connect it to your existing stack or run it standalone. Your books close themselves.", stat: "Zero manual data entry. Continuous financial intelligence.", icon: Calculator },
  { name: "Facility Management System", badge: "Live Product", borderColor: "border-l-o360-purple", badgeColor: "bg-o360-purple/10 text-o360-purple border border-o360-purple/20", desc: "End-to-end facility operations — maintenance scheduling, vendor management, AMC tracking, compliance documentation — fully automated and agentic. WhatsApp-first field operations. Full audit trail. No spreadsheets.", stat: "Zero spreadsheet ops. Full accountability. Always on.", icon: Building2 },
  { name: "Voice Agent Platform", badge: "Live Product", borderColor: "border-l-o360-orange", badgeColor: "bg-o360-orange/10 text-o360-orange border border-o360-orange/20", desc: "Human-quality AI voice agents that handle inbound calls, qualify leads, schedule appointments, follow up on pending actions, and escalate to a human only when genuinely needed. Hindi and English. Phone and WhatsApp.", stat: "Handles 1,000+ calls a day. Zero human operators on the line.", icon: Phone },
  { name: "Patient Care System", badge: "Live · HealthTech", borderColor: "border-l-o360-pink", badgeColor: "bg-o360-pink/10 text-o360-pink border border-o360-pink/20", desc: "AI-powered chronic care management, patient engagement automation, and care program delivery. Built for multi-specialty clinics and chronic disease programs. Covers diabetic care, hair transplant, dentistry, and maternity.", stat: "Live across multiple specialties. Patients engaged. Physicians free to focus on care.", icon: Heart },
];

const verticals = [
  { name: "Education & EdTech", desc: "ARE for vocational education, higher ed, and franchise networks", icon: "🎓" },
  { name: "HealthTech", desc: "Patient care systems, voice agents, chronic care management", icon: "🏥" },
  { name: "FinTech", desc: "Accounting intelligence, expense management, payment infrastructure", icon: "💳" },
  { name: "Enterprise Operations", desc: "Facility management, agentic workflows, automation at scale", icon: "🏢" },
  { name: "Government & Public Sector", desc: "Large-scale data platforms and public infrastructure systems", icon: "🏛️" },
  { name: "Custom AI Builds", desc: "Purpose-built autonomous systems for any vertical", icon: "⚡" },
];

const teamCards = [
  { title: "AI Product", desc: "Autonomous systems architecture, PRDs, agentic workflow design" },
  { title: "AI Engineering", desc: "LLM integration, RAG pipelines, voice agents, n8n automation" },
  { title: "Growth & SEO", desc: "Content engines, media brand strategy, organic lead systems" },
  { title: "Domain Experts", desc: "HealthTech, FinTech, EdTech, Government vertical specialists" },
];

const Index = () => (
  <div className="min-h-screen">
    {/* HERO */}
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 hero-gradient relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-o360-purple/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center relative z-10">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-foreground leading-[1.08] mb-8 tracking-tight">
            We Build AI Systems<br />
            <span className="gradient-text">That Run Your Business.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Five live products. Zero human operators. Revenue that compounds while you sleep.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-10 font-semibold shadow-lg shadow-primary/25 text-base h-14">
              <Link to="/products/are">Explore ARE <ArrowRight className="ml-2" size={18} /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-10 font-semibold border-white/10 hover:bg-white/5 text-base h-14">
              <Link to="/products">See All Products</Link>
            </Button>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {[
            { target: "30+", label: "AI products shipped" },
            { target: "₹100Cr+", label: "Monthly transactions" },
            { target: "15+", label: "AI consultants" },
            { target: "5", label: "Live products" },
          ].map((s) => (
            <div key={s.label} className="glass-card rounded-xl p-2">
              <AnimatedCounter target={s.target} label={s.label} />
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* PRODUCT SUITE */}
    <section className="py-24 relative">
      <div className="absolute inset-0 section-gradient" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <SectionLabel>THE PRODUCT SUITE</SectionLabel>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 tracking-tight">Five AI Products. All Live. All Shipping.</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">We don't concept. We ship. Every product in this suite is deployed, running, and generating real results for real clients today.</p>
          </div>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.08} className={i >= 3 ? "lg:col-span-1" : ""}>
              <div className={`glass-card border-l-[4px] ${p.borderColor} p-6 h-full card-hover ${p.glow || ""}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <p.icon size={20} className="text-primary" />
                  </div>
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${p.badgeColor}`}>{p.badge}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{p.name}</h3>
                {p.full && <p className="text-xs text-muted-foreground mb-3">{p.full}</p>}
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{p.desc}</p>
                <p className="text-xs font-semibold gradient-text">{p.stat}</p>
                {p.link && (
                  <Link to={p.link} className="text-sm text-primary font-semibold mt-4 inline-flex items-center gap-1.5 hover:gap-2.5 transition-all">
                    Explore ARE <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* ARE TEASER */}
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] -translate-x-1/2" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <SectionLabel>FLAGSHIP PRODUCT — ARE</SectionLabel>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
              ARE Doesn't Run Campaigns.<br />
              <span className="gradient-text">It Builds Revenue Infrastructure.</span>
            </h2>
          </div>
        </FadeIn>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn direction="left">
            <p className="text-muted-foreground mb-4 leading-relaxed text-lg">
              Most brands spend ₹1.5–2 lakh a month on digital ads and get thin, cold leads — one bad month and the pipeline is empty. ARE is built on a different logic entirely.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Instead of running campaigns, ARE builds category-owning media brands — the way Shiksha.com owns the school admissions search, the way Collegedekho owns the college admissions search. A brand with its own editorial identity, its own YouTube channel, its own Google rankings, its own WhatsApp audience. A lead engine that wakes up before you do and doesn't stop when you turn off the budget.
            </p>
            <Button asChild className="rounded-full px-8 shadow-lg shadow-primary/25">
              <Link to="/products/are">See How ARE Works <ArrowRight className="ml-2" size={16} /></Link>
            </Button>
          </FadeIn>
          <FadeIn direction="right" delay={0.2}>
            <AREChart />
          </FadeIn>
        </div>
      </div>
    </section>

    {/* SOLUTIONS BY VERTICAL */}
    <section className="py-24 relative">
      <div className="absolute inset-0 section-gradient" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <SectionLabel>SOLUTIONS</SectionLabel>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 tracking-tight">Built Across Six Verticals.</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Every solution we propose comes backed by a product we have already built and shipped.</p>
          </div>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {verticals.map((v, i) => (
            <FadeIn key={v.name} delay={i * 0.08}>
              <div className="glass-card rounded-xl p-6 card-hover group">
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{v.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn className="mt-10 text-center">
          <Button asChild variant="outline" className="rounded-full px-8 border-white/10 hover:bg-white/5">
            <Link to="/solutions">See All Solutions <ArrowRight className="ml-2" size={16} /></Link>
          </Button>
        </FadeIn>
      </div>
    </section>

    {/* CLIENT PROOF */}
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <SectionLabel>PROVEN RESULTS</SectionLabel>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
              Media Brands That Compound.<br />
              <span className="gradient-text-gold">Real Revenue. Real Assets.</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">ARE-powered brands generate leads autonomously — growing every month while cost per lead drops to near zero.</p>
          </div>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {[
            { num: "50,000+", label: "Leads per month at scale" },
            { num: "₹13", label: "Cost per lead by Month 60" },
            { num: "₹40–50 Cr", label: "Media brand asset value built" },
          ].map((s, i) => (
            <FadeIn key={s.num} delay={i * 0.1}>
              <div className="glass-card rounded-xl p-8 text-center card-hover">
                <div className="text-3xl md:text-4xl font-extrabold gradient-text stat-glow mb-3">{s.num}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn className="text-center">
          <Button asChild className="rounded-full px-8 shadow-lg shadow-primary/25">
            <Link to="/contact">See What ARE Can Build for You <ArrowRight className="ml-2" size={16} /></Link>
          </Button>
        </FadeIn>
      </div>
    </section>


    {/* TEAM */}
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <SectionLabel>THE TEAM</SectionLabel>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 tracking-tight">15+ AI Consultants. Deep Domain Expertise.</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Optimizer360 runs on a core team spanning AI product, engineering, growth, and domain specialists — covering fintech, healthtech, edtech, and enterprise automation. Every person on this team has shipped AI systems in production.</p>
          </div>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamCards.map((t, i) => (
            <FadeIn key={t.title} delay={i * 0.08}>
              <div className="glass-card rounded-xl p-6 card-hover">
                <h3 className="text-lg font-bold text-foreground mb-2">{t.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* BOTTOM CTA */}
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 hero-gradient" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <FadeIn>
          <div className="glass-card border-l-[4px] border-primary rounded-2xl p-10 md:p-16 text-center glow-teal">
            <Sparkles className="text-primary mx-auto mb-6" size={32} />
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 tracking-tight">Ready to Build Something That Runs Itself?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Book a strategy call and we'll map the right AI system for your business. First call is free.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="rounded-full px-8 font-semibold shadow-lg shadow-primary/25 h-12">
                <Link to="/products/are">Explore ARE <ArrowRight className="ml-2" size={18} /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 font-semibold border-white/10 hover:bg-white/5 h-12">
                <Link to="/contact">Book a Strategy Call <ArrowRight className="ml-2" size={18} /></Link>
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  </div>
);

export default Index;
