import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionLabel from "@/components/SectionLabel";
import FadeIn from "@/components/FadeIn";
import AnimatedCounter from "@/components/AnimatedCounter";
import { ArrowRight } from "lucide-react";

const principles = [
  { title: "We Build. You Own.", desc: "Every engagement ends with the client owning media brands, content libraries, social audiences, and software systems — assets that compound after we're done." },
  { title: "Autonomous by Design.", desc: "Every product we build is designed to improve without human input. Weekly self-optimisation, automated reporting, agentic workflows — our systems get better while your team sleeps." },
  { title: "Results Before Relationships.", desc: "90-day guarantee on ARE. First lead in Week 4. We don't ask for trust — we earn it in the first quarter. If we miss, Month 3 is refunded." },
];

const achievements = [
  { title: "India's largest vocational education lead engine", desc: "3 media brands for Aptech Limited" },
  { title: "Live chronic care platform", desc: "Patient Care System across multiple specialties" },
  { title: "AI-native payment infrastructure", desc: "StackIntel fintech platform" },
  { title: "Facility automation", desc: "Enterprise facility management deployed at scale" },
  { title: "Voice agent deployment", desc: "1,000+ calls/day, zero human operators" },
  { title: "Accounting intelligence", desc: "Zero manual bookkeeping for SMB and enterprise" },
];

const About = () => (
  <div className="min-h-screen pt-16">
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
        <SectionLabel>ABOUT OPTIMIZER360</SectionLabel>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">We Build AI Systems That Run Without You.</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Optimizer360 is an AI-native product company based in Bengaluru, India. We build autonomous systems — for revenue generation, patient care, facility operations, and financial intelligence — that run 24/7 without human operators.
        </p>
      </div>
    </section>

    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatedCounter target="30+" label="AI products and systems shipped" />
          <AnimatedCounter target="₹100Cr+" label="Monthly transaction volume" />
          <AnimatedCounter target="15+" label="AI consultants on the team" />
          <AnimatedCounter target="5" label="Verticals covered" />
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn>
          <SectionLabel>HOW WE WORK</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10">Infrastructure, Not Service.</h2>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-6">
          {principles.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.1}>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn>
          <SectionLabel>OUR TRACK RECORD</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10">What We've Built.</h2>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((a, i) => (
            <FadeIn key={a.title} delay={i * 0.1}>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-base font-semibold text-foreground mb-2">{a.title}</h3>
                <p className="text-sm text-muted-foreground">{a.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn>
          <div className="bg-card border border-border rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Ready to build with us?</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="outline" size="lg"><Link to="/products">Explore Products <ArrowRight className="ml-1" size={16} /></Link></Button>
              <Button asChild size="lg"><Link to="/contact">Book a Call <ArrowRight className="ml-1" size={16} /></Link></Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  </div>
);

export default About;
