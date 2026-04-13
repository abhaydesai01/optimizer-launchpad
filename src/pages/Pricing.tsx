import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/FadeIn";
import { ArrowRight } from "lucide-react";

const Pricing = () => (
  <div className="min-h-screen">
    <section className="pt-32 pb-24 hero-gradient relative overflow-hidden flex items-center min-h-[70vh]">
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center relative z-10">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 tracking-tight">
            Pricing is built around <span className="gradient-text">your brand.</span> Let's talk.
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Every ARE engagement is scoped to your vertical, your number of brands, and your lead targets. Book a 30-minute strategy call and we'll model exactly what it costs, what it delivers, and what it's worth by Year 5.
          </p>
          <Button asChild size="lg" className="rounded-full px-10 shadow-lg shadow-primary/25 h-12 w-full max-w-md">
            <Link to="/contact">Book a Strategy Call <ArrowRight className="ml-2" size={18} /></Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  </div>
);

export default Pricing;
