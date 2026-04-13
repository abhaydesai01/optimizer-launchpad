import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionLabel from "@/components/SectionLabel";
import FadeIn from "@/components/FadeIn";
import { ArrowRight } from "lucide-react";

const products = [
  { name: "ARE — Autonomous Revenue Engine", status: "Flagship · Live", badgeColor: "bg-primary/20 text-primary", borderColor: "border-primary", vertical: "Education · Franchise · Enterprise", desc: "Builds category-owning media brands, compounds organic traffic across SEO + YouTube + Instagram + LinkedIn + WhatsApp, and routes qualified leads to CRM. 8-stage autonomous platform. No human operators after launch.", who: "Vocational education brands, franchise networks, B2B companies needing category-level lead generation", stat: "₹40–50 Cr asset built per brand in 5 years", link: "/products/are" },
  { name: "Accounting Intelligence Platform", status: "Live", badgeColor: "bg-o360-gold/20 text-o360-gold", borderColor: "border-o360-gold", vertical: "FinTech · SMB · Enterprise", desc: "Autonomous bookkeeping, GST filing intelligence, invoice reconciliation, real-time P&L reporting, and cash flow forecasting — powered by LLMs.", who: "SMBs, CA firms, CFOs who want accounting that runs itself", stat: "Zero manual data entry. Continuous financial intelligence." },
  { name: "Facility Management System", status: "Live", badgeColor: "bg-o360-purple/20 text-o360-purple", borderColor: "border-o360-purple", vertical: "Real Estate · Enterprise · Government", desc: "End-to-end facility operations management — maintenance scheduling, vendor management, AMC tracking, compliance documentation, asset lifecycle management.", who: "Commercial real estate, enterprise campuses, government facilities", stat: "Zero spreadsheet operations. Full audit trail." },
  { name: "Voice Agent Platform", status: "Live", badgeColor: "bg-o360-orange/20 text-o360-orange", borderColor: "border-o360-orange", vertical: "HealthTech · Education · FinTech · Enterprise", desc: "Human-quality AI voice agents that handle inbound inquiries, qualify leads, schedule appointments, follow up on pending actions. Hindi + English.", who: "Clinics, hospitals, education centers, BFSI", stat: "Handles 1,000+ calls/day. Zero human operators." },
  { name: "Patient Care System", status: "Live · HealthTech", badgeColor: "bg-o360-pink/20 text-o360-pink", borderColor: "border-o360-pink", vertical: "HealthTech · Chronic Care · Specialty Clinics", desc: "AI-powered chronic care management, patient engagement automation, care program delivery, and physician-patient communication layer.", who: "Multi-specialty clinics, chronic care providers, telemedicine platforms", stat: "Live for chronic care programs across specialties." },
];

const capabilities = [
  { title: "Agentic Workflows", desc: "Multi-agent pipelines that run operations, approvals, and communications autonomously" },
  { title: "LLM + RAG Integration", desc: "Custom knowledge bases, document intelligence, and retrieval-augmented generation for enterprise" },
  { title: "AI-Native Platform Builds", desc: "End-to-end product development — from PRD to production — for AI-first SaaS products" },
];

const Products = () => (
  <div className="min-h-screen pt-16">
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
        <SectionLabel>OPTIMIZER360 PRODUCT SUITE</SectionLabel>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Five AI Products. All Live. All Shipping.</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">We don't concept. We ship. Every product in our portfolio is deployed and running for real clients.</p>
      </div>
    </section>

    <section className="pb-20">
      <div className="container mx-auto px-4 lg:px-8 space-y-6">
        {products.map((p, i) => (
          <FadeIn key={p.name} delay={i * 0.1}>
            <div className={`bg-card border-l-[6px] ${p.borderColor} rounded-lg p-6 md:p-8`}>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${p.badgeColor}`}>{p.status}</span>
                <span className="text-xs text-muted-foreground">{p.vertical}</span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">{p.name}</h3>
              <p className="text-muted-foreground mb-3">{p.desc}</p>
              <p className="text-sm text-muted-foreground mb-3"><strong className="text-foreground">Who it's for:</strong> {p.who}</p>
              <p className="text-sm text-primary font-medium mb-4">{p.stat}</p>
              {p.link && <Button asChild variant="outline" size="sm"><Link to={p.link}>Explore ARE <ArrowRight className="ml-1" size={14} /></Link></Button>}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>

    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Don't see what you need? We build it.</h2>
          <p className="text-muted-foreground mb-10 max-w-2xl">If your problem needs a purpose-built AI solution — agentic workflows, RAG pipelines, LLM integrations, voice systems, or AI-native platforms — we scope, build, and ship.</p>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {capabilities.map((c, i) => (
            <FadeIn key={c.title} delay={i * 0.1}>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn><Button asChild><Link to="/contact">Discuss a Custom Build <ArrowRight className="ml-1" size={16} /></Link></Button></FadeIn>
      </div>
    </section>
  </div>
);

export default Products;
