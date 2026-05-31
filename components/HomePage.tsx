"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { CitationFeed } from "@/components/CitationFeed";
import { ProblemStats } from "@/components/sections/ProblemStats";
import { WhatIsGEO } from "@/components/sections/WhatIsGEO";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { Industries } from "@/components/sections/Industries";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/Footer";

const HowItWorksModal = dynamic(
  () => import("@/components/HowItWorksModal").then((mod) => mod.HowItWorksModal),
  { ssr: false },
);
const AuditModal = dynamic(
  () => import("@/components/AuditModal").then((mod) => mod.AuditModal),
  { ssr: false },
);

export function HomePage() {
  const [howOpen, setHowOpen] = useState(false);
  const [auditOpen, setAuditOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("audit") === "true") {
      setAuditOpen(true);
    }
  }, []);

  return (
    <>
      <Navbar onHowItWorks={() => setHowOpen(true)} onAudit={() => setAuditOpen(true)} />
      <Hero onAudit={() => setAuditOpen(true)} onHowItWorks={() => setHowOpen(true)} />
      <CitationFeed />
      <ProblemStats />
      <WhatIsGEO />
      <HowItWorks />
      <Features />
      <ComparisonTable />
      <WhoItsFor />
      <Industries />
      <Pricing onAudit={() => setAuditOpen(true)} />
      <FAQ />
      <section className="section-pad bg-white">
        <div className="section-wrap text-center">
          <p className="text-sm text-[var(--text-muted)]">
            Also by Optimizer360:{" "}
            <Link href="/are" className="font-medium text-[#00D2A0]">
              ARE — Autonomous Revenue Engine →
            </Link>
          </p>
        </div>
      </section>
      <FinalCTA onAudit={() => setAuditOpen(true)} />
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
