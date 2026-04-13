import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionLabel from "@/components/SectionLabel";
import FadeIn from "@/components/FadeIn";
import AnimatedCounter from "@/components/AnimatedCounter";
import { ArrowRight } from "lucide-react";

const principles = [
  { title: "We Build. You Own.", desc: "Every engagement ends with the client owning media brands, content libraries, social audiences, and software systems that compound after we're done." },
  { title: "Autonomous by Design.", desc: "Every product improves without human input. Weekly self-optimisation, automated reporting, agentic workflows — systems get better while your team sleeps." },
  { title: "Results Before Relationships.", desc: "90-day guarantee on ARE. First lead in Week 4. We don't ask for trust — we earn it. Month 3 refunded if we miss." },
];

const achievements = [
  { title: "India's largest vocational education lead engine", desc: "3 media brands for Aptech Limited" },
  { title: "Live chronic care platform", desc: "Patient Care System across specialties" },
  { title: "AI-native payment infrastructure", desc: "StackIntel fintech platform" },
  { title: "Facility automation at scale", desc: "Enterprise facility management deployed" },
  { title: "Voice agent deployment", desc: "1,000+ calls/day, zero human operators" },
  { title: "Accounting intelligence", desc: "Zero manual bookkeeping for SMB & enterprise" },
];

const About = () => (
  <div className="min-h-screen">
    <section className="pt-32 pb-24 hero-gradient relative overflow-hidden">
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center relative z-10">
        <SectionLabel>ABOUT OPTIMIZER360</SectionLabel>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 tracking-tight">We Build AI Systems <span className="gradient-text">That Run Without You.</span></h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          An AI-native product company based in Bengaluru. We build autonomous systems for revenue generation, patient care, facility operations, and financial intelligence.
        </p>
      </div>
    </section>

    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { target: "30+", label: "AI products shipped" },
            { target: "₹100Cr+", label: "Monthly transaction volume" },
            { target: "15+", label: "AI consultants" },
            { target: "5", label: "Verticals covered" },
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
        <FadeIn><div className="text-center mb-16"><SectionLabel>OUR TRACK RECORD</SectionLabel><h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">What We've Built.</h2></div></FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((a, i) => (
            <FadeIn key={a.title} delay={i * 0.08}><div className="glass-card rounded-xl p-6 card-hover"><h3 className="text-base font-bold text-foreground mb-2">{a.title}</h3><p className="text-sm text-muted-foreground">{a.desc}</p></div></FadeIn>
          ))}
        </div>
      </div>
    </section>

    <section className="py-24 hero-gradient">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn>
          <div className="glass-card rounded-2xl p-10 md:p-16 text-center glow-teal">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-8 tracking-tight">Ready to build with us?</h2>
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
