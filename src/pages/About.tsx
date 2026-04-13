import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionLabel from "@/components/SectionLabel";
import FadeIn from "@/components/FadeIn";
import AnimatedCounter from "@/components/AnimatedCounter";
import { ArrowRight } from "lucide-react";

const principles = [
  { title: "We Build. You Own.", desc: "Every engagement ends with the client owning something permanent — media brands with audiences, content libraries with search equity, software systems with real users. We are a build partner. When we're done, the asset is yours, compounding on its own." },
  { title: "Autonomous by Design.", desc: "Every product we build is designed to improve without human input. Weekly self-optimisation, automated reporting, agentic workflows, continuous A/B testing — our systems get better while your team sleeps." },
  { title: "Results Before Relationships.", desc: "90-day performance guarantee on ARE. First leads in Week 4. If we miss the 90-day benchmark, Month 3 is refunded in full. Zero financial risk to you in the pilot period." },
];

const achievements = [
  { title: "India's largest vocational education lead engine", desc: "3 media brands — Arena Animation, MAAC, Lakmé Academy" },
  { title: "Live chronic care platform", desc: "Patient Care System across diabetic care, hair transplant, dentistry, and maternity specialties" },
  { title: "AI-native payment infrastructure", desc: "StackIntel fintech platform" },
  { title: "Enterprise facility automation", desc: "Facility Management System deployed at scale" },
  { title: "AI voice agent deployment", desc: "1,000+ calls per day, zero human operators" },
  { title: "Autonomous accounting intelligence", desc: "Zero manual bookkeeping for SMB and enterprise clients" },
];

const timeline = [
  { year: "1997", company: "Co-founded Provogue", desc: "India's first premium homegrown fashion brand. Built from a startup to one of the country's most-recognised lifestyle names. Listed on BSE." },
  { year: "2007", company: "Co-founded Prozone Realty", desc: "Mixed-use real estate — world-class regional shopping centres. Grew to 15.54 million sq ft land bank. Listed on BSE and NSE." },
  { year: "2024", company: "Founded StackIntel", desc: "Next-generation fintech payment infrastructure — card processing, banking-as-a-service, and payment intelligence." },
  { year: "2025", company: "Founded Optimizer360", desc: "India's first AI-native product studio — autonomous revenue engines, patient care systems, voice agents, and accounting intelligence platforms." },
];

const About = () => (
  <div className="min-h-screen">
    <section className="pt-36 pb-28 hero-gradient relative overflow-hidden">
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center relative z-10">
        <SectionLabel>ABOUT OPTIMIZER360</SectionLabel>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-8 tracking-tight leading-tight">
          We Build AI Systems<br />
          <span className="gradient-text">That Run Without You.</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mb-6">
          AI-native product company based in Mumbai, India. Autonomous systems for revenue, patient care, facility operations, and financial intelligence — running 24/7 without a human in the loop.
        </p>
        <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
          15+ person team of AI consultants, engineers, and domain specialists.
        </p>
      </div>
    </section>

    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn><div className="text-center mb-12"><SectionLabel>THE NUMBERS</SectionLabel><h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">What We've Shipped.</h2></div></FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { target: "30+", label: "AI products and systems shipped" },
            { target: "₹100Cr+", label: "Monthly transaction volume on our platforms" },
            { target: "15+", label: "AI consultants on the team" },
            { target: "5", label: "Live AI products across Education, Health, FinTech, Enterprise, and Government" },
          ].map(s => (
            <div key={s.label} className="glass-card rounded-xl"><AnimatedCounter target={s.target} label={s.label} /></div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-24 relative">
      <div className="absolute inset-0 section-gradient" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <FadeIn><div className="text-center mb-16"><SectionLabel>HOW WE WORK</SectionLabel><h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">Infrastructure, Not Service.</h2></div></FadeIn>
        <div className="grid md:grid-cols-3 gap-6">
          {principles.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.1}><div className="glass-card rounded-xl p-7 card-hover h-full"><h3 className="text-lg font-bold text-foreground mb-3">{p.title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p></div></FadeIn>
          ))}
        </div>
      </div>
    </section>

    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn><div className="text-center mb-16"><SectionLabel>WHAT WE'VE BUILT</SectionLabel><h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">Track Record.</h2></div></FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((a, i) => (
            <FadeIn key={a.title} delay={i * 0.08}><div className="glass-card rounded-xl p-6 card-hover"><h3 className="text-base font-bold text-foreground mb-2">{a.title}</h3><p className="text-sm text-muted-foreground">{a.desc}</p></div></FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* FOUNDER */}
    <section className="py-24 relative">
      <div className="absolute inset-0 section-gradient" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <SectionLabel>FOUNDER & CEO</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">Three Decades of Building. Now Building in AI.</h2>
          </div>
        </FadeIn>
        <FadeIn>
          <div className="glass-card rounded-2xl p-8 md:p-12 mb-12">
            <div className="grid lg:grid-cols-[1fr_auto] gap-10">
              <div>
                <h3 className="text-3xl font-extrabold text-foreground mb-1">Salil Chaturvedi</h3>
                <p className="text-sm text-muted-foreground mb-5">Founder & CEO, Optimizer360</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Co-founder, Provogue (1997)", "Co-founder, Prozone Realty (2007)", "Founder, StackIntel (2024)"].map(c => (
                    <span key={c} className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-foreground/80">{c}</span>
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Serial entrepreneur across fashion, real estate, fintech, and now AI. Three decades. Four companies built from zero. One consistent instinct: move before the market does.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-6 lg:gap-8 items-center">
                {[{ num: "15+", label: "AI consultants" }, { num: "6", label: "Verticals served" }, { num: "30+", label: "AI systems shipped" }].map(s => (
                  <div key={s.label} className="text-center">
                    <div className="text-3xl font-extrabold gradient-text stat-glow">{s.num}</div>
                    <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto relative">
          <div className="absolute left-5 md:left-7 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />
          <div className="space-y-10">
            {timeline.map((t, i) => (
              <FadeIn key={t.year} delay={i * 0.12}>
                <div className="relative pl-14 md:pl-18">
                  <div className="absolute left-3 md:left-5 top-1.5 w-5 h-5 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/30" />
                  <div className="text-sm gradient-text font-bold mb-1">{t.year}</div>
                  <h3 className="text-xl font-extrabold text-foreground mb-2">{t.company}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 hero-gradient">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn>
          <div className="glass-card rounded-2xl p-10 md:p-16 text-center glow-teal">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-8 tracking-tight">Ready to Build with Us?</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-white/10 h-12"><Link to="/products">Explore Products <ArrowRight className="ml-2" size={16} /></Link></Button>
              <Button asChild size="lg" className="rounded-full px-8 shadow-lg shadow-primary/25 h-12"><Link to="/contact">Book a Call <ArrowRight className="ml-2" size={18} /></Link></Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  </div>
);

export default About;
