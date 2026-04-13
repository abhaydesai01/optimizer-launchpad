import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionLabel from "@/components/SectionLabel";
import FadeIn from "@/components/FadeIn";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";

const verticals = [
  { id: "education", name: "Education & EdTech", color: "text-primary", products: "ARE", built: "Category-owning media brand lead engines for vocational education brands and franchise networks. YouTube + Instagram + SEO + WhatsApp lead systems that compound over time.", outcome: "50,000+ student leads/month by Year 5. ₹13 cost per lead. ₹40–50 Cr media brand asset.", client: "Aptech Limited (Arena Animation, MAAC, Lakmé Academy)", cta: { label: "See Aptech Case Study →", link: "/case-studies/aptech" } },
  { id: "healthtech", name: "HealthTech", color: "text-o360-pink", products: "Patient Care System, Voice Agent Platform", built: "AI-powered chronic care management covering diabetic care, hair transplant, dentistry, and maternity specialties. Patient engagement automation and physician-patient communication layers.", outcome: "Reduced care coordinator workload. Automated patient follow-ups. Live for active patient programs." },
  { id: "fintech", name: "FinTech", color: "text-o360-gold", products: "Accounting Intelligence Platform, custom builds", built: "Autonomous bookkeeping and GST intelligence for SMBs. Expense management and payment infrastructure systems.", outcome: "Zero manual accounting. Real-time financial intelligence." },
  { id: "enterprise", name: "Enterprise Operations", color: "text-o360-purple", products: "Facility Management System, Voice Agent, Agentic Workflows", built: "Facility management and vendor operations automation. Agentic workflow systems for approvals, communications, and compliance.", outcome: "Zero spreadsheet operations. Full audit trail. Automated vendor and field team communications." },
  { id: "government", name: "Government & Public Sector", color: "text-blue-400", products: "Custom AI builds", built: "Large-scale data platform systems for public sector and government clients.", outcome: "Scalable, audit-ready public data infrastructure." },
  { id: "custom", name: "Custom AI Builds", color: "text-o360-orange", products: "Any vertical", built: "For any vertical needing a purpose-built AI system — agentic workflows, LLM integrations, RAG pipelines, or full AI-native platforms.", outcome: "Purpose-built, production-deployed AI systems.", cta: { label: "Discuss a Custom Build →", link: "/contact" } },
];

const Solutions = () => (
  <div className="min-h-screen pt-16">
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
        <SectionLabel>SOLUTIONS BY VERTICAL</SectionLabel>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">We've Shipped Across Six Verticals.</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Every solution we propose is backed by a product we've already built and shipped.</p>
      </div>
    </section>

    <section className="pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <Accordion type="single" collapsible className="space-y-4">
          {verticals.map((v, i) => (
            <FadeIn key={v.id} delay={i * 0.05}>
              <AccordionItem value={v.id} className="bg-card border border-border rounded-lg px-6 overflow-hidden">
                <AccordionTrigger className="hover:no-underline">
                  <span className={`text-lg font-semibold ${v.color}`}>{v.name}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pb-2">
                    <p className="text-sm text-muted-foreground"><strong className="text-foreground">Products:</strong> {v.products}</p>
                    <p className="text-sm text-muted-foreground"><strong className="text-foreground">What we've built:</strong> {v.built}</p>
                    <p className="text-sm text-muted-foreground"><strong className="text-foreground">Key outcome:</strong> {v.outcome}</p>
                    {v.client && <p className="text-sm text-muted-foreground"><strong className="text-foreground">Client:</strong> {v.client}</p>}
                    {v.cta && <Button asChild variant="outline" size="sm"><Link to={v.cta.link}>{v.cta.label}</Link></Button>}
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
