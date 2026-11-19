import type { ReactNode } from "react";
import { BreadcrumbTrail, type BreadcrumbItem } from "@/components/marketing/BreadcrumbTrail";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: ReactNode;
  intro?: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  /** buttons or links under the intro */
  actions?: ReactNode;
  /** anything else that belongs in the header block, under the actions */
  children?: ReactNode;
  /** "page" for index and landing pages; "article" for reading pages, with a narrower title */
  size?: "page" | "article";
  className?: string;
};

/**
 * The title block of every inner page, in the home hero's language: an editorial serif title that
 * rises out of its mask once on load, then the intro and actions settle. No label above the title:
 * the breadcrumb says where the visitor is. The entrance is CSS (globals.css, .mk-rise / .mk-settle), so it
 * plays on first paint without waiting for script; under reduced motion it stands as written.
 */
export function PageHeader({ title, intro, breadcrumbs, actions, children, size = "page", className }: PageHeaderProps) {
  return (
    <header className={cn("pb-12 pt-40 sm:pt-44 lg:pb-16 lg:pt-48", className)}>
      <div className="mk-wrap">
        {breadcrumbs?.length ? (
          <div className="mk-settle">
            <BreadcrumbTrail items={breadcrumbs} />
          </div>
        ) : null}
        <h1
          className={cn(
            "font-serif-display text-[var(--paper)]",
            size === "page"
              ? "max-w-[22ch] text-[clamp(2.5rem,5.4vw,5.25rem)] leading-[1]"
              : "max-w-[28ch] text-[clamp(2.1rem,4vw,3.6rem)] leading-[1.06]",
          )}
        >
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="mk-rise block">{title}</span>
          </span>
        </h1>
        {intro ? (
          <div
            className="mk-settle mt-6 max-w-2xl text-[17px] leading-relaxed text-[var(--paper-soft)] sm:text-[18px]"
            style={{ animationDelay: "250ms" }}
          >
            {intro}
          </div>
        ) : null}
        {actions ? (
          <div className="mk-settle mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "330ms" }}>
            {actions}
          </div>
        ) : null}
        {children ? (
          <div className="mk-settle" style={{ animationDelay: "400ms" }}>
            {children}
          </div>
        ) : null}
      </div>
    </header>
  );
}
