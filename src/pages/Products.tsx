import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionLabel from "@/components/SectionLabel";
import FadeIn from "@/components/FadeIn";
import { ArrowRight, Zap, Calculator, Building2, Phone, Heart } from "lucide-react";

const products = [
  { name: "ARE — Autonomous Revenue Engine", status: "Flagship · Live", badgeColor: "bg-primary/10 text-primary border border-primary/20", borderColor: "border-l-primary", vertical: "Education · Franchise · Enterprise", desc: "ARE builds category-owning media brands from the ground up — independent editorial identities that own keyword categories on Google, grow subscribed audiences on YouTube and Instagram, and route every qualified lead to your CRM automatically. An 8-stage autonomous platform. No human operators required after launch.", who: "Vocational and higher education brands, franchise networks, any B2B company needing category-level lead generation with compounding organic returns.", stat: "₹40–50 crore media brand asset built per brand over 5 years. Cost per lead declines to ₹13 by Month 60.", link: "/products/are", icon: Zap },
  { name: "Accounting Intelligence Platform", status: "Live", badgeColor: "bg-accent/10 text-accent border border-accent/20", borderColor: "border-l-accent", vertical: "FinTech · SMB · Enterprise", desc: "Autonomous bookkeeping, GST filing intelligence, invoice reconciliation, and real-time financial reporting — all powered by LLMs. The system connects to your existing accounting stack or runs standalone. It categorises transactions, flags anomalies, generates P&L statements, and forecasts cash flow — without a human operator touching data entry.", who: "SMBs spending hours on manual accounting, CA firms managing multiple client books, CFOs who want financial intelligence in real time instead of at month-end.", stat: "Zero manual data entry. Books that close themselves. Continuous financial intelligence.", icon: Calculator },
  { name: "Facility Management System", status: "Live", badgeColor: "bg-o360-purple/10 text-o360-purple border border-o360-purple/20", borderColor: "border-l-o360-purple", vertical: "Real Estate · Enterprise · Government", desc: "End-to-end facility operations — maintenance scheduling, vendor management, AMC tracking, compliance documentation, asset lifecycle management — automated and agentic. Field teams operate through WhatsApp. Managers get a full audit trail without asking for it.", who: "Commercial real estate developers, enterprise campuses, government facility operators, co-working and hospitality groups managing multi-site operations.", stat: "Zero spreadsheet operations. Full audit trail. Automated vendor communications. Complete compliance documentation.", icon: Building2 },
  { name: "Voice Agent Platform", status: "Live", badgeColor: "bg-o360-orange/10 text-o360-orange border border-o360-orange/20", borderColor: "border-l-o360-orange", vertical: "HealthTech · Education · FinTech · Enterprise", desc: "Human-quality AI voice agents that handle inbound inquiries, qualify leads against defined criteria, schedule appointments, follow up on pending actions, and escalate to a human agent only when the situation genuinely warrants it. Operates in Hindi and English across phone and WhatsApp channels.", who: "Clinics and hospitals managing high patient inquiry volume, education centres with inbound admissions queries, BFSI companies with customer service call loads, any business spending money on a call centre that could be automated.", stat: "1,000+ calls handled per day. Zero human operators. Consistent, fast, accurate responses every time.", icon: Phone },
  { name: "Patient Care System", status: "Live · HealthTech", badgeColor: "bg-o360-pink/10 text-o360-pink border border-o360-pink/20", borderColor: "border-l-o360-pink", vertical: "Chronic Care · Specialty Clinics · Telemedicine", desc: "AI-powered chronic care management, patient engagement automation, care program delivery, and physician-patient communication layer. Patients receive structured care programs with automated check-ins, educational content, and escalation triggers. Physicians get exception-based dashboards — they focus on patients who need them, not paperwork.", who: "Multi-specialty clinics running active patient programs, chronic disease management providers, telemedicine platforms, hospital systems with high patient populations in diabetes, hair restoration, dentistry, and maternity.", stat: "Live across multiple specialties. Patient engagement automated. Care coordinators freed from manual follow-up.", icon: Heart },
];

const capabilities = [
  { title: "Agentic Workflows", desc: "Multi-agent pipelines that run operations, approvals, and communications without human intervention" },
  { title: "LLM + RAG Integration", desc: "Custom knowledge bases, document intelligence, and retrieval-augmented generation for enterprise use cases" },
  { title: "AI-Native Platform Builds", desc: "End-to-end product development, from PRD to production, for AI-first SaaS products" },
];

const Products = () => (
  <div className="min-h-screen">
    <section className="pt-32 pb-24 hero-gradient relative overflow-hidden">
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center relative z-10">
        <SectionLabel>OPTIMIZER360 PRODUCT SUITE</SectionLabel>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 tracking-tight">Five AI Products. <span className="gradient-text">All Live. All Shipping.</span></h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">We don't concept. We ship. Every product in this portfolio is deployed and running for real clients today.</p>
      </div>
    </section>

    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8 space-y-6">
        {products.map((p, i) => (
          <FadeIn key={p.name} delay={i * 0.08}>
            <div className={`glass-card border-l-4 ${p.borderColor} rounded-xl p-6 md:p-8 card-hover`}>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <p.icon size={20} className="text-primary" />
                </div>
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${p.badgeColor}`}>{p.status}</span>
                <span className="text-xs text-muted-foreground">{p.vertical}</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">{p.name}</h3>
              <p className="text-muted-foreground mb-3 leading-relaxed">{p.desc}</p>
              <p className="text-sm text-muted-foreground mb-3"><strong className="text-foreground">Who it's for:</strong> {p.who}</p>
              <p className="text-sm font-semibold gradient-text mb-4">{p.stat}</p>
              {p.link && <Button asChild variant="outline" size="sm" className="rounded-full border-white/10"><Link to={p.link}>Explore ARE <ArrowRight className="ml-1" size={14} /></Link></Button>}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>

    <section className="py-24 relative">
      <div className="absolute inset-0 section-gradient" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 tracking-tight">Don't See What You Need? <span className="gradient-text">We Build It.</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">If your problem needs a purpose-built AI solution — agentic workflows, RAG pipelines, LLM integrations, voice systems, or a fully AI-native platform — we scope, build, and ship it.</p>
          </div>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {capabilities.map((c, i) => (
            <FadeIn key={c.title} delay={i * 0.1}>
              <div className="glass-card rounded-xl p-6 card-hover">
                <h3 className="text-lg font-bold text-foreground mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn className="text-center">
          <Button asChild className="rounded-full px-8 shadow-lg shadow-primary/25">
            <Link to="/contact">Discuss a Custom Build <ArrowRight className="ml-2" size={16} /></Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  </div>
);

export default Products;
