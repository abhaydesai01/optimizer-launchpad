import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionLabel from "@/components/SectionLabel";
import FadeIn from "@/components/FadeIn";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const verticals = [
  {
    id: "education", name: "Education & EdTech", color: "gradient-text",
    products: "ARE — Autonomous Revenue Engine",
    built: "Category-owning media brand lead engines for vocational and higher education brands with franchise networks. A full-stack organic lead generation infrastructure that compounds over time — YouTube + Instagram + SEO + WhatsApp — replacing expensive paid-only acquisition strategies.",
    outcome: "50,000+ student leads per month per brand by Year 5. ₹13 cost per lead by Month 60. ₹40–50 crore combined media brand asset across three brands. 97% organic lead share by Year 5.",
    client: "Aptech Limited — Arena Animation, MAAC, Lakmé Academy",
    cta: { label: "See What ARE Delivers →", link: "/contact" }
  },
  {
    id: "healthtech", name: "HealthTech", color: "text-o360-pink",
    products: "Patient Care System · Voice Agent Platform",
    built: "AI-powered chronic care management covering diabetic care, hair transplant, dentistry, and maternity specialties. Patient engagement automation with structured care programs, automated check-ins, and physician exception dashboards. AI voice agents handling inbound patient inquiries at scale.",
    outcome: "Automated patient follow-up across active care programs. Reduced care coordinator workload on routine engagement. Voice agent handling inbound patient inquiries 24/7."
  },
  {
    id: "fintech", name: "FinTech", color: "gradient-text-gold",
    products: "Accounting Intelligence Platform · Custom AI Builds",
    built: "A full suite of live fintech infrastructure products — deployed and running. We build payment and financial systems, not SaaS tools. These are production-grade platforms serving real transaction volumes.",
    outcome: "Prepaid/Debit Card Management System (Visa, Mastercard, RuPay). WhatsApp-Based Corporate Expense Management (SAP, Tally, Zoho). UPI Collection & Payout. Merchant/Client Management System. Payment Orchestration Layer. BaaS Platform. Cross-Border Remittance Platform. Buyer & Seller Settlement Management Platform. All live.",
  },
  {
    id: "enterprise", name: "Enterprise Operations", color: "text-o360-purple",
    products: "Facility Management System · Voice Agent Platform · Agentic Workflows",
    built: "Facility management and vendor operations automation for commercial and enterprise clients. Agentic workflow systems handling approvals, vendor communications, compliance documentation, and field team coordination.",
    outcome: "Spreadsheet-free facility operations with full audit trail. Automated vendor and field team communication via WhatsApp. Complete compliance documentation without manual input."
  },
  {
    id: "government", name: "Government & Public Sector", color: "text-blue-400",
    products: "Custom AI Builds",
    built: "Large-scale data platform systems for public sector and government clients. Audit-ready infrastructure for socioeconomic data collection, processing, and reporting.",
    outcome: "Scalable public data infrastructure built for government-grade compliance and audit requirements."
  },
  {
    id: "custom", name: "Custom AI Builds", color: "text-o360-orange",
    products: "Any vertical",
    built: "For any vertical requiring a purpose-built AI system — agentic workflows, LLM integrations, RAG pipelines, voice systems, or full AI-native platforms — we scope, build, and ship.",
    outcome: "Purpose-built, production-deployed AI systems.",
    cta: { label: "Discuss a Custom Build →", link: "/contact" }
  },
];

const Solutions = () => (
  <div className="min-h-screen">
    <section className="pt-32 pb-24 hero-gradient relative overflow-hidden">
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-o360-purple/5 rounded-full blur-[120px]" />
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center relative z-10">
        <SectionLabel>SOLUTIONS BY VERTICAL</SectionLabel>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 tracking-tight">We've Shipped Across <span className="gradient-text">Six Verticals.</span></h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Every solution we propose is backed by a product we have already built and shipped. We don't present concepts — we show you what we have deployed, who we deployed it for, and what it delivered.</p>
      </div>
    </section>

    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <Accordion type="single" collapsible className="space-y-4">
          {verticals.map((v, i) => (
            <FadeIn key={v.id} delay={i * 0.05}>
              <AccordionItem value={v.id} className="glass-card rounded-xl px-6 border-none">
                <AccordionTrigger className="hover:no-underline py-5">
                  <span className={`text-lg font-bold ${v.color}`}>{v.name}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pb-4">
                    <p className="text-sm text-muted-foreground"><strong className="text-foreground">Products:</strong> {v.products}</p>
                    <p className="text-sm text-muted-foreground"><strong className="text-foreground">What we built:</strong> {v.built}</p>
                    <p className="text-sm text-muted-foreground"><strong className="text-foreground">What it delivered:</strong> {v.outcome}</p>
                    {v.client && <p className="text-sm text-muted-foreground"><strong className="text-foreground">Client deployed:</strong> {v.client}</p>}
                    {v.cta && <Button asChild variant="outline" size="sm" className="rounded-full border-white/10 mt-2"><Link to={v.cta.link}>{v.cta.label}</Link></Button>}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </FadeIn>
          ))}
        </Accordion>
      </div>
    </section>
  </div>
);

export default Solutions;
