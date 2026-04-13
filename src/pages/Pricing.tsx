import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionLabel from "@/components/SectionLabel";
import FadeIn from "@/components/FadeIn";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, ArrowRight } from "lucide-react";

const optionA = [
  "1 full media brand — editorial identity, domain, content calendar",
  "2 domains managed (media brand + hub)",
  "20–40 SEO articles/month",
  "YouTube + Instagram + WhatsApp active",
  "2 lead nurture tracks (email + WhatsApp, Hindi + English)",
  "CRM push to nearest center within 60 seconds",
  "Intent scoring + lead enrichment",
  "Monthly CMO performance report",
  "90-day ROAS guarantee",
];

const optionB = [
  "3 media brands — full editorial identities per brand",
  "6 domains managed (2 per brand)",
  "60–120 SEO articles/month",
  "YouTube + Instagram + LinkedIn + WhatsApp all platforms",
  "5 course-specific nurture tracks",
  "'Arena vs MAAC' comparison content — own both sides",
  "24FPS Awards content engine for MAAC",
  "Cross-domain lead deduplication",
  "White-label CMO dashboard (real-time ROAS by course + city)",
  "Dedicated Account Manager",
  "Monthly board-level performance report",
  "90-day ROAS guarantee",
];

const faqs = [
  { q: "Is the marketing spend included in the service fee?", a: "No. Marketing spend (Meta + Google Ads) is separate. We recommend ₹1,50,000/mo for Option A. ARE manages the spend and progressively reduces it as organic traffic takes over." },
  { q: "Who owns the media brand domains?", a: "You do. All domains, content, social accounts, and audiences are registered under your ownership from day one." },
  { q: "What happens to the content if we stop the engagement?", a: "All content, SEO rankings, YouTube channels, Instagram accounts, and lead systems remain yours. They continue generating organic leads indefinitely." },
  { q: "How does the 90-day guarantee work exactly?", a: "If ARE does not deliver measurable digital lead growth within 90 days of Phase 1 go-live, we refund Month 3 of the engagement in full." },
  { q: "Can we start with one brand and expand to all three?", a: "Yes. Most clients start with Option A (single brand) and expand to full deployment after seeing initial results." },
  { q: "What CRM systems does ARE integrate with?", a: "ARE integrates with Salesforce, HubSpot, Zoho, LeadSquared, and custom CRMs via API. CRM push happens within 60 seconds of lead capture." },
  { q: "How long before we see first leads?", a: "Paid leads start in Week 2. Organic leads begin appearing from Month 3–4 as SEO content starts ranking." },
  { q: "Is ARE only for education brands?", a: "No. ARE works for any vertical with multi-location or franchise-based lead generation needs — education, healthcare, real estate, beauty & wellness." },
  { q: "Do you offer custom AI builds separately from ARE?", a: "Yes. We build custom AI systems — agentic workflows, RAG pipelines, voice agents, and full AI-native platforms — for any vertical. Contact us to discuss." },
];

const Pricing = () => (
  <div className="min-h-screen pt-16">
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
        <SectionLabel>PRICING — ARE</SectionLabel>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Simple Pricing. Proven ROI.</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Two options. One promise: measurable digital lead growth in 90 days or Month 3 refunded in full.</p>
      </div>
    </section>

    <section className="pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <FadeIn>
            <div className="bg-card border-2 border-primary rounded-lg p-8 h-full">
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-primary/20 text-primary mb-4 inline-block">Recommended starting point</span>
              <h3 className="text-2xl font-bold text-foreground mb-2">Single Media Brand Pilot</h3>
              <div className="text-3xl font-bold text-primary mb-6">₹2,50,000<span className="text-base font-normal text-muted-foreground"> / month</span></div>
              <ul className="space-y-3">
                {optionA.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="text-primary mt-0.5 shrink-0" size={16} />{f}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="bg-card border-2 border-o360-gold rounded-lg p-8 h-full relative">
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-o360-gold/20 text-o360-gold mb-4 inline-block">Board Recommendation</span>
              <h3 className="text-2xl font-bold text-foreground mb-2">Full 3-Brand Deployment</h3>
              <div className="text-3xl font-bold text-o360-gold mb-6">₹6,00,000<span className="text-base font-normal text-muted-foreground"> / month</span></div>
              <ul className="space-y-3">
                {optionB.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="text-o360-gold mt-0.5 shrink-0" size={16} />{f}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
        <FadeIn className="mt-8 text-center">
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Marketing spend (Meta + Google Ads) is separate. Recommended: ₹1,50,000/mo for Option A. ARE manages the spend — declining from ₹1.75L at Month 1 to ₹35K at Month 60 as organic takes over.
          </p>
        </FadeIn>
      </div>
    </section>

    {/* GUARANTEE */}
    <section className="py-16">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <FadeIn>
          <div className="bg-card border-l-[6px] border-o360-orange rounded-lg p-8">
            <h3 className="text-xl font-bold text-foreground mb-3">The Optimizer360 Performance Guarantee</h3>
            <p className="text-muted-foreground">If ARE does not deliver measurable digital lead growth within 90 days of Phase 1 go-live, Optimizer360 will refund Month 3 of the engagement in full. Zero financial risk to you.</p>
          </div>
        </FadeIn>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <FadeIn>
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="text-3xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
        </FadeIn>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <FadeIn key={i} delay={i * 0.03}>
              <AccordionItem value={`faq-${i}`} className="bg-card border border-border rounded-lg px-6">
                <AccordionTrigger className="hover:no-underline text-left">{f.q}</AccordionTrigger>
                <AccordionContent><p className="text-muted-foreground">{f.a}</p></AccordionContent>
              </AccordionItem>
            </FadeIn>
          ))}
        </Accordion>
      </div>
    </section>
  </div>
);

export default Pricing;
