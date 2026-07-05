import type { Metadata } from "next";
import { UseCasesPageClient } from "@/components/usecases/UseCasesPageClient";
import { useCaseRoles, useCaseSegments } from "@/lib/usecases";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { CardGlow } from "@/components/marketing/CardGlow";

export const metadata: Metadata = {
  title: "GEO Use Cases by Segment and Role",
  description:
    "Explore detailed GEO use cases by industry segment and role. See how CMO, founder, growth, and agency teams use Optimizer360 to turn AI visibility into qualified pipeline.",
  alternates: {
    canonical: "https://optimizer360.ai/usecases",
  },
};

export default function UseCasesPage({
  searchParams,
}: {
  searchParams?: { role?: string; segment?: string };
}) {
  const initialRole =
    searchParams?.role && useCaseRoles.includes(searchParams.role as (typeof useCaseRoles)[number])
      ? (searchParams.role as "All Roles" | (typeof useCaseRoles)[number])
      : "All Roles";

  const initialSegment =
    searchParams?.segment &&
    useCaseSegments.includes(searchParams.segment as (typeof useCaseSegments)[number])
      ? (searchParams.segment as "All Segments" | (typeof useCaseSegments)[number])
      : "All Segments";

  return (
    <div className="theme-ink min-h-screen">
      <MarketingNav />
      <CardGlow />
      <UseCasesPageClient initialRole={initialRole} initialSegment={initialSegment} />
      <MarketingFooter />
    </div>
  );
}
