import type { ReactNode } from "react";
import { MarketingPage } from "@/components/marketing/MarketingPage";
import { PageHeader } from "@/components/marketing/PageHeader";
import type { BreadcrumbItem } from "@/components/marketing/BreadcrumbTrail";

type SubPageShellProps = {
  /** @deprecated no longer shown: the breadcrumb says where the visitor is. Kept so call sites still compile. */
  kicker?: string;
  title: string;
  intro?: string;
  breadcrumbs?: BreadcrumbItem[];
  children: ReactNode;
};

/** A simple inner page: the shared frame, the editorial title block, then the page's content. */
export function SubPageShell({ title, intro, breadcrumbs, children }: SubPageShellProps) {
  return (
    <MarketingPage>
      <main>
        <PageHeader title={title} intro={intro} breadcrumbs={breadcrumbs} />
        <section className="border-t border-[var(--ink-line)] pb-24 pt-14 sm:pt-16">
          <div className="mk-wrap">{children}</div>
        </section>
      </main>
    </MarketingPage>
  );
}
