import { MarketingNav } from "@/components/marketing/MarketingNav";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { CardGlow } from "@/components/marketing/CardGlow";
import { PromptMarquee } from "@/components/marketing/PromptMarquee";
import { PlatformShowcase } from "@/components/marketing/PlatformShowcase";
import { Hero } from "@/components/marketing/sections/Hero";
import { TheShift } from "@/components/marketing/sections/TheShift";
import { InvisibleCost } from "@/components/marketing/sections/InvisibleCost";
import { WhatIsGeo } from "@/components/marketing/sections/WhatIsGeo";
import { Process } from "@/components/marketing/sections/Process";
import { Deliverables } from "@/components/marketing/sections/Deliverables";
import { RadicalHonesty } from "@/components/marketing/sections/RadicalHonesty";
import { WhoItsFor } from "@/components/marketing/sections/WhoItsFor";
import { Faq } from "@/components/marketing/sections/Faq";
import { MetricsStrip } from "@/components/marketing/sections/MetricsStrip";
import { FeatureWorkflow } from "@/components/marketing/sections/FeatureWorkflow";
import { EngineCoverage } from "@/components/marketing/sections/EngineCoverage";
import { Integrations } from "@/components/marketing/sections/Integrations";
import { EarlyMover } from "@/components/marketing/sections/EarlyMover";
import { FinalCta } from "@/components/marketing/sections/FinalCta";

export default function Page() {
  return (
    <div className="theme-ink min-h-screen">
      <MarketingNav />
      <CardGlow />
      <main>
        <Hero />
        <PromptMarquee />
        <MetricsStrip />
        <TheShift />
        <InvisibleCost />
        <WhatIsGeo />
        <FeatureWorkflow />
        <Process />
        <Deliverables />
        <PlatformShowcase />
        <EngineCoverage />
        <Integrations />
        <RadicalHonesty />
        <WhoItsFor />
        <EarlyMover />
        <Faq />
        <FinalCta />
      </main>
      <MarketingFooter />
    </div>
  );
}
