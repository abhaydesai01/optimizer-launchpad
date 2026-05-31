"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AREHero } from "@/components/are/AREHero";
import { AREProblem } from "@/components/are/AREProblem";
import { WhatIsARE } from "@/components/are/WhatIsARE";
import { PipelineFlow } from "@/components/are/PipelineFlow";
import { AREFeatures } from "@/components/are/AREFeatures";
import { AREUseCases } from "@/components/are/AREUseCases";
import { AREWhoItsFor } from "@/components/are/AREWhoItsFor";
import { AREPricing } from "@/components/are/AREPricing";
import { AREFounder } from "@/components/are/AREFounder";
import { AREFAQ } from "@/components/are/AREFAQ";
import { AREFinalCTA } from "@/components/are/AREFinalCTA";

const HowItWorksModal = dynamic(
  () => import("@/components/HowItWorksModal").then((mod) => mod.HowItWorksModal),
  { ssr: false },
);
const AuditModal = dynamic(
  () => import("@/components/AuditModal").then((mod) => mod.AuditModal),
  { ssr: false },
);

export function AREPageClient() {
  const [auditOpen, setAuditOpen] = useState(false);
  const [howOpen, setHowOpen] = useState(false);

  return (
    <>
      <Navbar onHowItWorks={() => setHowOpen(true)} onAudit={() => setAuditOpen(true)} />
      <AREHero onAudit={() => setAuditOpen(true)} />
      <AREProblem />
      <WhatIsARE />
      <PipelineFlow />
      <AREFeatures />
      <AREUseCases />
      <AREWhoItsFor />
      <AREPricing onAudit={() => setAuditOpen(true)} />
      <AREFounder />
      <AREFAQ />
      <AREFinalCTA onAudit={() => setAuditOpen(true)} />
      <Footer onHowItWorks={() => setHowOpen(true)} />

      {howOpen ? (
        <HowItWorksModal isOpen={howOpen} onClose={() => setHowOpen(false)} />
      ) : null}
      {auditOpen ? (
        <AuditModal isOpen={auditOpen} onClose={() => setAuditOpen(false)} />
      ) : null}
    </>
  );
}
