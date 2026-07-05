import type { ReactNode } from "react";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { CardGlow } from "@/components/marketing/CardGlow";

type SubPageShellProps = {
  kicker: string;
  title: string;
  intro?: string;
  children: ReactNode;
};

export function SubPageShell({ kicker, title, intro, children }: SubPageShellProps) {
  return (
    <div className="theme-ink min-h-screen">
      <MarketingNav />
      <CardGlow />
      <main>
        {/* pt accounts for announcement bar + sticky header */}
        <section className="pb-14 pt-52 md:pt-60">
          <div className="mk-wrap">
            <p className="mk-kicker">{kicker}</p>
            <h1 className="mk-h2 mt-5 max-w-3xl text-[var(--paper)]">{title}</h1>
            {intro ? <p className="mk-body mt-6 max-w-2xl">{intro}</p> : null}
          </div>
        </section>
        <section className="mk-hairline pb-24 pt-14">
          <div className="mk-wrap">{children}</div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
