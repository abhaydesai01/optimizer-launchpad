import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type EntryCardProps = {
  href: string;
  title: string;
  /** a short category or segment above the title, in sentence case */
  label?: string;
  children?: ReactNode;
  /** a quiet line at the foot: author and date, roles, read time */
  meta?: ReactNode;
  className?: string;
};

/**
 * One entry in an index (an article, a playbook): the whole card is the link, so a list never
 * becomes a column of competing buttons. On hover the border darkens, the card lifts 2px and the
 * arrow steps toward the corner; with reduced motion only the colours change (globals.css).
 */
export function EntryCard({ href, title, label, children, meta, className }: EntryCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "mk-entry group flex h-full flex-col rounded-xl border border-[var(--ink-line)] bg-[var(--ink-850)] p-6 sm:p-7",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        {label ? <p className="text-[13px] font-medium text-[var(--mint)]">{label}</p> : <span />}
        <ArrowUpRight
          className="mk-entry__arrow h-5 w-5 shrink-0 text-[var(--paper-muted)] group-hover:text-[var(--paper)]"
          aria-hidden="true"
        />
      </div>
      <h2 className="font-serif-display mt-3 text-[1.6rem] leading-[1.15] text-[var(--paper)]">{title}</h2>
      {children ? <div className="mt-3 text-[15px] leading-relaxed text-[var(--paper-soft)]">{children}</div> : null}
      {meta ? <div className="mt-auto pt-6 text-[13px] text-[var(--paper-muted)]">{meta}</div> : null}
    </Link>
  );
}
