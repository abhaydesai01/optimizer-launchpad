import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionLabel from "@/components/SectionLabel";
import FadeIn from "@/components/FadeIn";
import { ArrowRight } from "lucide-react";

const timeline = [
  { year: "1997", company: "Provogue", desc: "Co-founded India's first premium homegrown fashion brand. Built it into one of the country's most recognised lifestyle brands." },
  { year: "2007", company: "Prozone Realty", desc: "Co-founded Prozone Realty, developing world-class regional shopping centres. Listed on BSE and NSE." },
  { year: "2024", company: "StackIntel", desc: "Founded StackIntel to build next-generation payment infrastructure and banking-as-a-service solutions." },
  { year: "2025", company: "Optimizer360", desc: "Founded Optimizer360 — India's first AI-native product studio. Autonomous revenue engines, patient care systems, voice agents." },
];

const philosophy = [
  { title: "Build for the Customer Nobody Has Served Yet", desc: "Every company Salil has built started from: what does the next wave need, that nobody is building? Provogue answered it for fashion. Optimizer360 answers it for AI-native infrastructure." },
  { title: "Ships Are Built to Sail, Not Sit in Harbour", desc: "Build it, ship it, prove it. All five products are live, running, and generating results. We don't demo. We deploy." },
  { title: "The Best Technology Is the Kind You Don't Notice", desc: "Every product runs invisibly — generating leads, managing facilities, caring for patients — without constant human attention." },
];

const Founder = () => (
  <div className="min-h-screen">
    <section className="pt-32 pb-24 hero-gradient relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-o360-purple/5 rounded-full blur-[100px]" />
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl relative z-10">
        <SectionLabel>FOUNDER & CEO</SectionLabel>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground mb-4 tracking-tight">Salil Chaturvedi</h1>
        <p className="text-xl gradient-text font-bold mb-8">Serial entrepreneur. Three decades. Four companies. Now building in AI.</p>
        <p className="text-muted-foreground leading-relaxed text-lg max-w-3xl">
          Salil Chaturvedi has spent three decades identifying what India needs before the market does. He co-founded Provogue in 1997, Prozone Realty in 2007, StackIntel in 2024. Now, with Optimizer360, he applies that same instinct — move before the market — to AI-native products.
        </p>
      </div>
    </section>

    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <FadeIn><div className="text-center mb-16"><SectionLabel>THE JOURNEY</SectionLabel></div></FadeIn>
        <div className="relative">
          <div className="absolute left-5 md:left-7 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />
          <div className="space-y-12">
            {timeline.map((t, i) => (
              <FadeIn key={t.year} delay={i * 0.15}>
                <div className="relative pl-14 md:pl-18">
                  <div className="absolute left-3 md:left-5 top-1.5 w-5 h-5 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/30" />
                  <div className="text-sm gradient-text font-bold mb-1">{t.year}</div>
                  <h3 className="text-2xl font-extrabold text-foreground mb-3">{t.company}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 relative">
      <div className="absolute inset-0 section-gradient" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <FadeIn><div className="text-center mb-16"><SectionLabel>THE PHILOSOPHY</SectionLabel><h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">Move Before the Market.</h2></div></FadeIn>
        <div className="grid md:grid-cols-3 gap-6">
          {philosophy.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.1}>
              <div className="glass-card rounded-xl p-7 card-hover h-full">
                <h3 className="text-lg font-bold text-foreground mb-3">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn><div className="text-center mb-16"><SectionLabel>THE TEAM SALIL HAS BUILT</SectionLabel><h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">15+ AI Consultants.</h2><p className="text-muted-foreground mt-3">Operating out of Bengaluru across India's most ambitious AI challenges.</p></div></FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "AI Product", desc: "Autonomous systems architecture, PRDs, agentic workflow design" },
            { title: "AI Engineering", desc: "LLM integration, RAG pipelines, voice agents, n8n automation" },
            { title: "Growth & SEO", desc: "Content engines, media brand strategy, organic lead systems" },
            { title: "Domain Experts", desc: "HealthTech, FinTech, EdTech, Government vertical specialists" },
          ].map((t, i) => (
            <FadeIn key={t.title} delay={i * 0.08}>
              <div className="glass-card rounded-xl p-6 card-hover"><h3 className="text-lg font-bold text-foreground mb-2">{t.title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p></div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    <section className="py-24 hero-gradient">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-8 tracking-tight">Work with Optimizer360.</h2>
          <Button asChild size="lg" className="rounded-full px-10 shadow-lg shadow-primary/25 h-12"><Link to="/contact">Get in Touch <ArrowRight className="ml-2" size={18} /></Link></Button>
        </FadeIn>
      </div>
    </section>
  </div>
);

export default Founder;
