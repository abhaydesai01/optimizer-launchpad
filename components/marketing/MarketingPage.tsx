import type { ReactNode } from "react";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { cn } from "@/lib/utils";

/**
 * The frame every marketing page shares with the home page: the editorial theme (`.theme-paper`,
 * light or dark from the nav's toggle), the nav and the footer. Pages bring their own `<main>`.
 *
 *   <MarketingPage>
 *     <main>…</main>
 *   </MarketingPage>
 */
export function MarketingPage({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("theme-paper min-h-screen", className)}>
      <MarketingNav themeToggle />
      {children}
      <MarketingFooter />
    </div>
  );
}
