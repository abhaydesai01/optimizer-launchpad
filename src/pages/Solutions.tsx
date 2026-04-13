import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionLabel from "@/components/SectionLabel";
import FadeIn from "@/components/FadeIn";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const verticals = [
  { id: "education", name: "Education & EdTech", color: "gradient-text", products: "ARE", built: "Category-owning media brand lead engines for vocational education brands and franchise networks. YouTube + Instagram + SEO + WhatsApp lead systems.", outcome: "50,000+ student leads/month by Year 5. ₹13 cost per lead. ₹40–50 Cr media brand asset.", client: "Aptech Limited (Arena Animation, MAAC, Lakmé Academy)", cta: { label: "See Aptech Case Study →", link: "/case-studies/aptech" } },
  { id: "healthtech", name: "HealthTech", color: "text-o360-pink", products: "Patient Care System, Voice Agent Platform", built: "AI-powered chronic care management covering diabetic care, hair transplant, dentistry, and maternity. Patient engagement automation.", outcome: "Reduced care coordinator workload. Automated patient follow-ups." },
  { id: "fintech", name: "FinTech", color: "gradient-text-gold", products: "Accounting Intelligence Platform, custom builds", built: "Autonomous bookkeeping and GST intelligence for SMBs. Expense management and payment infrastructure.", outcome: "Zero manual accounting. Real-time financial intelligence." },
  { id: "enterprise", name: "Enterprise Operations", color: "text-o360-purple", products: "Facility Management System, Voice Agent, Agentic Workflows", built: "Facility management and vendor operations automation. Agentic workflow systems.", outcome: "Zero spreadsheet operations. Full audit trail." },
  { id: "government", name: "Government & Public Sector", color: "text-blue-400", products: "Custom AI builds", built: "Large-scale data platform systems for public sector and government clients.", outcome: "Scalable, audit-ready public data infrastructure." },
  { id: "custom", name: "Custom AI Builds", color: "text-o360-orange", products: "Any vertical", built: "Purpose-built AI systems — agentic workflows, LLM integrations, RAG pipelines, or full AI-native platforms.", outcome: "Purpose-built, production-deployed AI systems.", cta: { label: "Discuss a Custom Build →", link: "/contact" } },
];

const Solutions = () => (
  <div className="min-h-screen">
    <section className="pt-32 pb-24 hero-gradient relative overflow-hidden">
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-o360-purple/5 rounded-full blur-[120px]" />
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center relative z-10">
        <SectionLabel>SOLUTIONS BY VERTICAL</SectionLabel>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 tracking-tight">We've Shipped Across <span className="gradient-text">Six Verticals.</span></h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Every solution we propose is backed by a product we've already built and shipped.</p>
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
                    <p className="text-sm text-muted-foreground"><strong className="text-foreground">What we've built:</strong> {v.built}</p>
                    <p className="text-sm text-muted-foreground"><strong className="text-foreground">Key outcome:</strong> {v.outcome}</p>
                    {v.client && <p className="text-sm text-muted-foreground"><strong className="text-foreground">Client:</strong> {v.client}</p>}
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
