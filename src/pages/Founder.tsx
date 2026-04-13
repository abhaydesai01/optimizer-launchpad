import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionLabel from "@/components/SectionLabel";
import FadeIn from "@/components/FadeIn";
import { ArrowRight } from "lucide-react";

const timeline = [
  { year: "1997", company: "Co-founded Provogue", desc: "India's first premium homegrown fashion brand, built at a time when no one believed Indians would pay a meaningful premium for a label they had never heard of. Salil led brand creation, investor relations, and new business development — bringing Provogue from a startup to one of the country's most-recognised lifestyle names. Listed on BSE." },
  { year: "2007", company: "Co-founded Prozone Realty", desc: "A specialist mixed-use real estate development company focused on world-class regional shopping centres. Prozone's malls in Aurangabad and Coimbatore set benchmarks for design and customer experience in India. The company grew to 15.54 million square feet of land bank in prime locations. Listed on BSE and NSE. Investors include Radhakishan Damani and Rakesh Jhunjhunwala. Salil led all business development, land acquisition, new asset class initiatives, and investor relations." },
  { year: "2024", company: "Founded StackIntel", desc: "Next-generation fintech payment infrastructure — card processing, banking-as-a-service, and payment intelligence. StackIntel is Salil's move into the digital financial infrastructure layer that powers India's next phase of economic growth." },
  { year: "2025", company: "Founded Optimizer360", desc: "India's first AI-native product studio — autonomous revenue engines, patient care systems, voice agents, and accounting intelligence platforms. Salil brings three decades of market pattern recognition and company-building experience to the AI era. Every product Optimizer360 ships reflects the same founder principle: build for the next wave before the market knows it's coming." },
];

const philosophy = [
  { title: "Build for the Customer Nobody Has Served Yet", desc: "Every company Salil has built started from the same question: what does the next generation of Indian consumers or businesses need — that nobody is building for them yet? Provogue answered it for aspirational fashion. Prozone answered it for organised retail real estate. StackIntel answered it for modern payment infrastructure. Optimizer360 answers it for AI-native business infrastructure." },
  { title: "Ships Are Built to Sail, Not Sit in Harbour", desc: "Optimizer360's operating culture comes directly from Salil's founder DNA: build it, ship it, prove it in the market. We don't run demos on vaporware. Every product in our portfolio is live, deployed, and generating measurable results for real clients. A product that's not shipping is just an idea with a deck." },
  { title: "The Best Technology Is the Kind You Don't Notice", desc: "The goal of every Optimizer360 product is to run invisibly — generating leads, managing facilities, caring for patients, closing books — without requiring constant human attention. The mark of a well-built autonomous system is that you stop thinking about it. It just works. Autonomous by design. Compounding by nature." },
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
          Salil Chaturvedi has spent three decades identifying what India needs before the market does — then building it. He co-founded Provogue in 1997, when nobody believed Indians would pay a premium for a homegrown fashion label. He built it anyway. He co-founded Prozone Realty in 2007 — developing world-class regional shopping centres and mixed-use real estate across India, now listed on BSE and NSE. He founded StackIntel in 2024, applying the same instinct to fintech payment infrastructure. Now, with Optimizer360, Salil is applying three decades of market pattern recognition to AI-native products and autonomous business systems. Same instinct. New medium. Bigger leverage.
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
        <FadeIn><div className="text-center mb-16"><SectionLabel>THE PHILOSOPHY</SectionLabel><h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">Three Decades. One Consistent Instinct: Move Before the Market.</h2></div></FadeIn>
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
        <FadeIn><div className="text-center mb-16"><SectionLabel>THE TEAM SALIL HAS BUILT</SectionLabel><h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">15+ AI Consultants. Deep Domain Expertise.</h2><p className="text-muted-foreground mt-3 max-w-2xl mx-auto">Salil has assembled a team of AI product builders, engineers, growth strategists, and domain experts spanning fintech, healthtech, edtech, and enterprise automation. The team operates from Bengaluru and works across India's most complex AI deployment environments.</p></div></FadeIn>
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
