import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionLabel from "@/components/SectionLabel";
import AnimatedCounter from "@/components/AnimatedCounter";
import FadeIn from "@/components/FadeIn";
import AREChart from "@/components/AREChart";
import { ArrowRight } from "lucide-react";

const products = [
  { name: "ARE", full: "Autonomous Revenue Engine", badge: "Flagship Product", color: "border-primary", badgeColor: "bg-primary/20 text-primary", desc: "Builds category-owning media brands, compounds organic leads across 6 platforms, and routes qualified inquiries to your centers — 24/7, no human operators.", stat: "₹40–50 Cr asset built per brand in 5 years", link: "/products/are" },
  { name: "Accounting Intelligence Platform", badge: "Live Product", color: "border-o360-gold", badgeColor: "bg-o360-gold/20 text-o360-gold", desc: "Autonomous bookkeeping, GST compliance, invoice reconciliation, and financial intelligence — powered by LLMs.", stat: "Zero manual data entry. Real-time financial intelligence." },
  { name: "Facility Management System", badge: "Live Product", color: "border-o360-purple", badgeColor: "bg-o360-purple/20 text-o360-purple", desc: "End-to-end facility operations — maintenance, vendor management, AMC tracking, compliance — fully automated and agentic.", stat: "Zero spreadsheet ops. Full audit trail." },
  { name: "Voice Agent Platform", badge: "Live Product", color: "border-o360-orange", badgeColor: "bg-o360-orange/20 text-o360-orange", desc: "Human-quality AI voice agents for inbound/outbound calls, lead qualification, appointment scheduling. Hindi + English.", stat: "Handles 1,000+ calls/day. No human operators." },
  { name: "Patient Care System", badge: "Live · HealthTech", color: "border-o360-pink", badgeColor: "bg-o360-pink/20 text-o360-pink", desc: "AI-powered chronic care management, patient engagement automation, and care program delivery for clinics and hospitals.", stat: "Live for chronic care programs across specialties." },
];

const verticals = [
  { name: "Education & EdTech", desc: "ARE for vocational, higher ed, and franchise networks" },
  { name: "HealthTech", desc: "Patient care systems, voice agents, chronic care management" },
  { name: "FinTech", desc: "Expense management, cross-border, payment intelligence" },
  { name: "Enterprise Operations", desc: "Facility management, agentic workflows, automation" },
  { name: "Government & Public", desc: "Large-scale data platforms and public systems" },
  { name: "Custom AI Builds", desc: "Purpose-built AI systems for any vertical" },
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
    <section className="min-h-screen flex items-center pt-16">
      <div className="container mx-auto px-4 lg:px-8 grid lg:grid-cols-[58%_42%] gap-12 items-center">
        <div>
          <SectionLabel>AI-NATIVE PRODUCTS + SOLUTIONS</SectionLabel>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6">
            We Build AI Systems<br />That Run Your Business.
          </h1>
          <p className="text-primary text-lg md:text-xl font-bold mb-4">
            Revenue engines. Patient care platforms. Voice agents.<br className="hidden md:block" />
            Accounting intelligence. Built once. Running forever.
          </p>
          <p className="text-muted-foreground text-base mb-8 max-w-xl">
            Optimizer360 is an AI-native product company led by serial entrepreneur Salil Chaturvedi. Our flagship product — ARE, the Autonomous Revenue Engine — builds media brands, compounds organic traffic, and delivers qualified leads to your sales team 24/7.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg"><Link to="/products/are">Explore ARE <ArrowRight className="ml-1" size={16} /></Link></Button>
            <Button asChild variant="outline" size="lg"><Link to="/products">See All Products</Link></Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <AnimatedCounter target="30+" label="AI products shipped" />
          <AnimatedCounter target="₹100Cr+" label="Monthly transactions on our platforms" />
          <AnimatedCounter target="15+" label="AI consultants on the team" />
          <AnimatedCounter target="5" label="Live AI products across verticals" />
        </div>
      </div>
    </section>

    {/* PRODUCT SUITE */}
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn>
          <SectionLabel>THE PRODUCT SUITE</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Five AI Products. All Live. All Shipping.</h2>
          <p className="text-muted-foreground mb-10 max-w-xl">We don't concept. We ship. Every product in our portfolio is deployed and running.</p>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.1} className={i >= 3 ? "lg:col-span-1" : ""}>
              <div className={`bg-card border-l-[6px] ${p.color} rounded-lg p-6 h-full hover:scale-[1.02] transition-transform`}>
                <span className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full mb-3 ${p.badgeColor}`}>{p.badge}</span>
                <h3 className="text-xl font-semibold text-foreground mb-2">{p.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
                <p className="text-xs text-primary font-medium">{p.stat}</p>
                {p.link && <Link to={p.link} className="text-sm text-primary font-medium mt-3 inline-flex items-center gap-1 hover:underline">Explore ARE <ArrowRight size={14} /></Link>}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* ARE TEASER */}
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn>
          <SectionLabel>FLAGSHIP PRODUCT — ARE</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">ARE Doesn't Run Campaigns. It Builds Revenue Infrastructure.</h2>
        </FadeIn>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <p className="text-muted-foreground mb-6">
              Most companies spend ₹1.5L/month on ads and get thin, cold leads. ARE builds category-owning media brands — like Shiksha for admissions, Collegedekho for colleges — that rank on Google, build YouTube audiences, generate Instagram followers, and route every inquiry to your sales team.
            </p>
            <Button asChild><Link to="/products/are">See How ARE Works <ArrowRight className="ml-1" size={16} /></Link></Button>
          </FadeIn>
          <FadeIn delay={0.2}>
            <AREChart />
          </FadeIn>
        </div>
      </div>
    </section>

    {/* SOLUTIONS BY VERTICAL */}
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn>
          <SectionLabel>SOLUTIONS</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10">Built Across Six Verticals.</h2>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {verticals.map((v, i) => (
            <FadeIn key={v.name} delay={i * 0.1}>
              <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 hover:scale-[1.02] transition-all">
                <h3 className="text-lg font-semibold text-foreground mb-2">{v.name}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn className="mt-8">
          <Button asChild variant="outline"><Link to="/solutions">See All Solutions <ArrowRight className="ml-1" size={16} /></Link></Button>
        </FadeIn>
      </div>
    </section>

    {/* CLIENT PROOF */}
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn>
          <SectionLabel>CLIENT — APTECH LIMITED</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">3 Media Brands. 3.1 Lakh Leads/Year. ₹40–50 Crore Asset Built.</h2>
          <p className="text-muted-foreground mb-10 max-w-2xl">ARE deployed for Arena Animation, MAAC, and Lakmé Academy — India's largest vocational education network.</p>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { num: "50,180/mo", label: "Arena Animation monthly leads by Year 5" },
            { num: "₹5.1L", label: "Marketing spend saved per brand over 5 years" },
            { num: "₹40–50 Cr", label: "Combined media brand asset value" },
          ].map((s, i) => (
            <FadeIn key={s.num} delay={i * 0.1}>
              <div className="bg-card rounded-lg p-6 text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-2">{s.num}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn>
          <Button asChild><Link to="/case-studies/aptech">Read the Full Case Study <ArrowRight className="ml-1" size={16} /></Link></Button>
        </FadeIn>
      </div>
    </section>

    {/* FOUNDER STRIP */}
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn>
          <SectionLabel>LED BY</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10">Three Decades of Building. Now Building in AI.</h2>
        </FadeIn>
        <FadeIn>
          <div className="bg-card border border-border rounded-lg p-8 grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-1">Salil Chaturvedi</h3>
              <p className="text-sm text-muted-foreground mb-4">Founder & CEO, Optimizer360</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["Co-founder, Provogue (1997)", "Co-founder, Prozone Realty (2007)", "Founder, StackIntel (2024)"].map(c => (
                  <span key={c} className="text-[11px] font-medium px-3 py-1 rounded-full bg-secondary text-foreground">{c}</span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4">Serial entrepreneur across fashion, real estate, fintech, and now AI. Three decades. Four companies. One consistent instinct: move before the market.</p>
              <Button asChild variant="outline" size="sm"><Link to="/founder">Meet Salil <ArrowRight className="ml-1" size={14} /></Link></Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[{ num: "15+", label: "AI consultants" }, { num: "6", label: "Verticals served" }, { num: "30+", label: "AI systems shipped" }].map(s => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-bold text-primary">{s.num}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>

    {/* TEAM */}
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn>
          <SectionLabel>THE TEAM</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">15+ AI Consultants. Deep Domain Expertise.</h2>
          <p className="text-muted-foreground mb-10 max-w-2xl">Optimizer360 runs on a core team spanning AI product, engineering, growth, and domain specialists.</p>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamCards.map((t, i) => (
            <FadeIn key={t.title} delay={i * 0.1}>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">{t.title}</h3>
                <p className="text-sm text-muted-foreground">{t.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* BOTTOM CTA */}
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn>
          <div className="bg-card border-l-[6px] border-primary rounded-lg p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Ready to Build Something That Runs Itself?</h2>
            <p className="text-muted-foreground mb-6">ARE starts at ₹2,50,000/month. Custom AI builds from discovery. First call is free.</p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg"><Link to="/products/are">Explore ARE <ArrowRight className="ml-1" size={16} /></Link></Button>
              <Button asChild variant="outline" size="lg"><Link to="/contact">Book a Strategy Call <ArrowRight className="ml-1" size={16} /></Link></Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  </div>
);

export default Index;
