import { MarketingNav } from "@/components/marketing/MarketingNav";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { PromptMarquee } from "@/components/marketing/PromptMarquee";
import { HeroScroll } from "@/components/marketing/scroll/HeroScroll";
import { MetricsScroll } from "@/components/marketing/scroll/MetricsScroll";
import { StagesScroll } from "@/components/marketing/scroll/StagesScroll";
import { EnginesOrbit } from "@/components/marketing/scroll/EnginesOrbit";
import { ScrollProgress } from "@/components/marketing/scroll/ScrollProgress";
import { Statement } from "@/components/marketing/scroll/Statement";
import { StartAtTop } from "@/components/marketing/scroll/StartAtTop";
import { Faq } from "@/components/marketing/sections/Faq";
import { FinalCta } from "@/components/marketing/sections/FinalCta";
import { JsonLd } from "@/components/marketing/JsonLd";
import { buildFAQSchema } from "@/lib/schema-library";
import { MARKETING_FAQ } from "@/lib/marketing-faq";

const faqSchema = buildFAQSchema([...MARKETING_FAQ]);

export default function Page() {
  return (
    <div className="theme-paper min-h-screen">
      <StartAtTop />
      <ScrollProgress />
      <MarketingNav themeToggle />
      <main>
        <HeroScroll />
        <PromptMarquee />
        <Statement />
        <StagesScroll />
        <EnginesOrbit />
        <MetricsScroll />
        <Faq />
        <FinalCta />
        <JsonLd id="homepage-faq" data={faqSchema} />
      </main>
      <MarketingFooter />
    </div>
  );
}
