import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionLabel from "@/components/SectionLabel";
import FadeIn from "@/components/FadeIn";
import { ArrowRight } from "lucide-react";

const timeline = [
  { year: "1997", company: "Provogue", desc: "Co-founded India's first premium homegrown fashion brand at a time when nobody believed Indians would pay for a label they'd never heard of. Built it into one of the country's most recognised lifestyle brands." },
  { year: "2007", company: "Prozone Realty", desc: "Co-founded Prozone Realty, developing world-class regional shopping centres and mixed-use developments across India. Listed on BSE and NSE. Landmark properties in Aurangabad, Coimbatore, Nagpur, and Mumbai." },
  { year: "2024", company: "StackIntel", desc: "Founded StackIntel to build next-generation payment infrastructure, card processing, and banking-as-a-service solutions for the fintech sector." },
  { year: "2025", company: "Optimizer360", desc: "Founded Optimizer360 to build India's first AI-native product studio — autonomous revenue engines, patient care systems, voice agents, and accounting intelligence platforms." },
];

const philosophy = [
  { title: "Build for the Customer Nobody Has Served Yet", desc: "Every company Salil has built started from the same question: what does the next wave of Indian consumers or businesses need, that nobody is building for them yet? Provogue answered it for fashion. Prozone answered it for organised retail real estate. Optimizer360 answers it for AI-native business infrastructure." },
  { title: "Ships Are Built to Sail, Not Sit in Harbour", desc: "Optimizer360's culture comes directly from Salil's founder DNA — build it, ship it, prove it in the market. All five products in our portfolio are live, running, and generating results for real clients." },
  { title: "The Best Technology Is the Kind You Don't Notice", desc: "The goal of every Optimizer360 product is to run invisibly — generating leads, managing facilities, caring for patients — without requiring constant human attention. Autonomous by design. Compounding by nature." },
];

const teamCards = [
  { title: "AI Product", desc: "Autonomous systems architecture, PRDs, agentic workflow design" },
  { title: "AI Engineering", desc: "LLM integration, RAG pipelines, voice agents, n8n automation" },
  { title: "Growth & SEO", desc: "Content engines, media brand strategy, organic lead systems" },
  { title: "Domain Experts", desc: "HealthTech, FinTech, EdTech, Government vertical specialists" },
];

const Founder = () => (
  <div className="min-h-screen pt-16">
    {/* HERO */}
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <SectionLabel>FOUNDER & CEO</SectionLabel>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">Salil Chaturvedi</h1>
        <p className="text-xl text-primary font-bold mb-6">Serial entrepreneur. Three decades. Four companies. Now building in AI.</p>
        <p className="text-muted-foreground leading-relaxed max-w-3xl">
          Salil Chaturvedi has spent three decades identifying what India needs before the market does. He co-founded Provogue in 1997 when nobody believed Indians would pay a premium for a homegrown fashion label — and built it into one of India's most recognised lifestyle brands. He co-founded Prozone Realty in 2007, developing world-class regional shopping centres. He founded StackIntel in 2024, pioneering fintech payment infrastructure. Now, with Optimizer360, he is applying that same instinct — move before the market — to AI-native products and autonomous systems.
        </p>
      </div>
    </section>

    {/* TIMELINE */}
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <FadeIn><SectionLabel>THE JOURNEY</SectionLabel></FadeIn>
        <div className="relative">
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-10">
            {timeline.map((t, i) => (
              <FadeIn key={t.year} delay={i * 0.1}>
                <div className="relative pl-12 md:pl-16">
                  <div className="absolute left-2 md:left-4 top-1 w-5 h-5 rounded-full bg-primary border-4 border-background" />
                  <div className="text-sm text-primary font-bold mb-1">{t.year}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{t.company}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* PHILOSOPHY */}
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn>
          <SectionLabel>THE PHILOSOPHY</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10">Three Decades. One Consistent Instinct: Move Before the Market.</h2>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-6">
          {philosophy.map((p, i) => (
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

    {/* TEAM */}
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn>
          <SectionLabel>THE TEAM SALIL HAS BUILT</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">15+ AI Consultants. Deep Domain Expertise.</h2>
          <p className="text-muted-foreground mb-10 max-w-2xl">The team operates out of Bengaluru and works across India's most ambitious AI deployment challenges.</p>
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

    {/* CTA */}
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Work with Optimizer360.</h2>
          <Button asChild size="lg"><Link to="/contact">Get in Touch <ArrowRight className="ml-1" size={16} /></Link></Button>
        </FadeIn>
      </div>
    </section>
  </div>
);

export default Founder;
