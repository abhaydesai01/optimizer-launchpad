import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionLabel from "@/components/SectionLabel";
import FadeIn from "@/components/FadeIn";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, Shield } from "lucide-react";

const optionA = [
  "1 full media brand — editorial identity, domain, content calendar",
  "2 domains managed (media brand + hub)",
  "20–40 SEO articles/month",
  "YouTube + Instagram + WhatsApp active",
  "2 lead nurture tracks (email + WhatsApp)",
  "CRM push within 60 seconds",
  "Intent scoring + lead enrichment",
  "Monthly CMO performance report",
  "90-day ROAS guarantee",
];

const optionB = [
  "3 media brands — full editorial identities per brand",
  "6 domains managed (2 per brand)",
  "60–120 SEO articles/month",
  "YouTube + Instagram + LinkedIn + WhatsApp",
  "5 course-specific nurture tracks",
  "Comparison content — own both sides",
  "24FPS Awards content engine for MAAC",
  "Cross-domain lead deduplication",
  "White-label CMO dashboard",
  "Dedicated Account Manager",
  "Board-level performance report",
  "90-day ROAS guarantee",
];

const faqs = [
  { q: "Is the marketing spend included?", a: "No. Marketing spend (Meta + Google Ads) is separate. We recommend ₹1,50,000/mo for Option A. ARE manages and progressively reduces spend." },
  { q: "Who owns the media brand domains?", a: "You do. All domains, content, social accounts, and audiences are yours from day one." },
  { q: "What happens if we stop?", a: "All content, rankings, channels, and lead systems remain yours. They continue generating organic leads indefinitely." },
  { q: "How does the 90-day guarantee work?", a: "If ARE does not deliver measurable digital lead growth within 90 days, we refund Month 3 in full." },
  { q: "Can we start with one brand?", a: "Yes. Most clients start with Option A and expand after seeing results." },
  { q: "What CRMs does ARE integrate with?", a: "Salesforce, HubSpot, Zoho, LeadSquared, and custom CRMs via API. Push within 60 seconds." },
  { q: "How long until first leads?", a: "Paid leads start Week 2. Organic leads begin Month 3–4 as SEO content ranks." },
  { q: "Is ARE only for education?", a: "No. ARE works for any vertical with multi-location or franchise lead generation needs." },
  { q: "Do you offer custom AI builds?", a: "Yes. Agentic workflows, RAG pipelines, voice agents, and full AI-native platforms. Contact us." },
];

const Pricing = () => (
  <div className="min-h-screen">
    <section className="pt-32 pb-24 hero-gradient relative overflow-hidden">
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center relative z-10">
        <SectionLabel>PRICING — ARE</SectionLabel>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 tracking-tight">Simple Pricing. <span className="gradient-text">Proven ROI.</span></h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Two options. One promise: measurable lead growth in 90 days or Month 3 refunded.</p>
      </div>
    </section>

    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <FadeIn>
            <div className="glass-card rounded-2xl p-8 h-full border-2 border-primary/30 glow-teal relative">
              <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-5 inline-block">Recommended starting point</span>
              <h3 className="text-2xl font-extrabold text-foreground mb-2">Single Media Brand Pilot</h3>
              <div className="text-4xl font-extrabold gradient-text mb-1">₹2,50,000</div>
              <p className="text-sm text-muted-foreground mb-8">per month</p>
              <ul className="space-y-3">
                {optionA.map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="text-primary mt-0.5 shrink-0" size={16} />{f}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="glass-card rounded-2xl p-8 h-full border-2 border-accent/30 glow-gold relative">
              <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 mb-5 inline-block">Board Recommendation</span>
              <h3 className="text-2xl font-extrabold text-foreground mb-2">Full 3-Brand Deployment</h3>
              <div className="text-4xl font-extrabold gradient-text-gold mb-1">₹6,00,000</div>
              <p className="text-sm text-muted-foreground mb-8">per month</p>
              <ul className="space-y-3">
                {optionB.map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="text-accent mt-0.5 shrink-0" size={16} />{f}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
        <FadeIn className="mt-10 text-center">
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">Marketing spend (Meta + Google Ads) is separate. Recommended ₹1,50,000/mo for Option A. Declines from ₹1.75L to ₹35K as organic takes over.</p>
        </FadeIn>
      </div>
    </section>

    <section className="py-16">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <FadeIn>
          <div className="glass-card border-l-4 border-o360-orange rounded-xl p-8 flex items-start gap-4">
            <Shield className="text-o360-orange shrink-0 mt-1" size={24} />
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">The Optimizer360 Performance Guarantee</h3>
              <p className="text-muted-foreground leading-relaxed">If ARE does not deliver measurable digital lead growth within 90 days, we refund Month 3 in full. Zero financial risk.</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>

    <section className="py-24 relative">
      <div className="absolute inset-0 section-gradient" />
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl relative z-10">
        <FadeIn><div className="text-center mb-12"><SectionLabel>FAQ</SectionLabel><h2 className="text-3xl font-extrabold text-foreground tracking-tight">Frequently Asked Questions</h2></div></FadeIn>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <FadeIn key={i} delay={i * 0.03}>
              <AccordionItem value={`faq-${i}`} className="glass-card rounded-xl px-6 border-none">
                <AccordionTrigger className="hover:no-underline text-left py-5 font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent><p className="text-muted-foreground pb-2 leading-relaxed">{f.a}</p></AccordionContent>
              </AccordionItem>
            </FadeIn>
          ))}
        </Accordion>
      </div>
    </section>
  </div>
);

export default Pricing;
