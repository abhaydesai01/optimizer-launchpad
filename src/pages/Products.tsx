import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionLabel from "@/components/SectionLabel";
import FadeIn from "@/components/FadeIn";
import { ArrowRight, Zap, Calculator, Building2, Phone, Heart } from "lucide-react";

const products = [
  { name: "ARE — Autonomous Revenue Engine", status: "Flagship · Live", badgeColor: "bg-primary/10 text-primary border border-primary/20", borderColor: "border-l-primary", vertical: "Education · Franchise · Enterprise", desc: "Builds category-owning media brands, compounds organic traffic across SEO + YouTube + Instagram + LinkedIn + WhatsApp, and routes qualified leads to CRM. 8-stage autonomous platform. No human operators after launch.", who: "Vocational education brands, franchise networks, B2B companies", stat: "₹40–50 Cr asset built per brand in 5 years", link: "/products/are", icon: Zap },
  { name: "Accounting Intelligence Platform", status: "Live", badgeColor: "bg-accent/10 text-accent border border-accent/20", borderColor: "border-l-accent", vertical: "FinTech · SMB · Enterprise", desc: "Autonomous bookkeeping, GST filing intelligence, invoice reconciliation, real-time P&L reporting, and cash flow forecasting — powered by LLMs.", who: "SMBs, CA firms, CFOs who want accounting that runs itself", stat: "Zero manual data entry. Continuous financial intelligence.", icon: Calculator },
  { name: "Facility Management System", status: "Live", badgeColor: "bg-o360-purple/10 text-o360-purple border border-o360-purple/20", borderColor: "border-l-o360-purple", vertical: "Real Estate · Enterprise · Government", desc: "End-to-end facility operations management — maintenance scheduling, vendor management, AMC tracking, compliance documentation.", who: "Commercial real estate, enterprise campuses, government facilities", stat: "Zero spreadsheet operations. Full audit trail.", icon: Building2 },
  { name: "Voice Agent Platform", status: "Live", badgeColor: "bg-o360-orange/10 text-o360-orange border border-o360-orange/20", borderColor: "border-l-o360-orange", vertical: "HealthTech · Education · FinTech", desc: "Human-quality AI voice agents that handle inbound inquiries, qualify leads, schedule appointments, follow up. Hindi + English.", who: "Clinics, hospitals, education centers, BFSI", stat: "Handles 1,000+ calls/day. Zero human operators.", icon: Phone },
  { name: "Patient Care System", status: "Live · HealthTech", badgeColor: "bg-o360-pink/10 text-o360-pink border border-o360-pink/20", borderColor: "border-l-o360-pink", vertical: "HealthTech · Chronic Care", desc: "AI-powered chronic care management, patient engagement automation, care program delivery, and physician-patient communication layer.", who: "Multi-specialty clinics, chronic care providers, telemedicine platforms", stat: "Live for chronic care programs across specialties.", icon: Heart },
];

const capabilities = [
  { title: "Agentic Workflows", desc: "Multi-agent pipelines that run operations, approvals, and communications autonomously" },
  { title: "LLM + RAG Integration", desc: "Custom knowledge bases, document intelligence, and retrieval-augmented generation for enterprise" },
  { title: "AI-Native Platform Builds", desc: "End-to-end product development — from PRD to production — for AI-first SaaS products" },
];

const Products = () => (
  <div className="min-h-screen">
    <section className="pt-32 pb-24 hero-gradient relative overflow-hidden">
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center relative z-10">
        <SectionLabel>OPTIMIZER360 PRODUCT SUITE</SectionLabel>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 tracking-tight">Five AI Products. <span className="gradient-text">All Live. All Shipping.</span></h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">We don't concept. We ship. Every product in our portfolio is deployed and running for real clients.</p>
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
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 tracking-tight">Don't see what you need? <span className="gradient-text">We build it.</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">If your problem needs a purpose-built AI solution — we scope, build, and ship.</p>
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
