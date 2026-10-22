import Link from "next/link";
import type { FeaturedArticle } from "@/lib/featured-articles";

type ArticleLinksProps = {
  items: FeaturedArticle[];
  /** Show a link to the full blog list under the cards. */
  showAll?: boolean;
};

export function ArticleLinks({ items, showAll = true }: ArticleLinksProps) {
  return (
    <>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="mk-card group block h-full p-6 transition-colors hover:border-[var(--ink-line-strong)]"
            >
              <h3 className="font-serif-display text-lg leading-snug text-[var(--paper)] transition-colors group-hover:text-[var(--mint)]">
                {item.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--paper-muted)]">
                {item.blurb}
              </p>
            </Link>
          </li>
        ))}
      </ul>
      {showAll ? (
        <p className="mt-8">
          <Link
            href="/blog"
            className="text-sm font-medium text-[var(--mint)] underline decoration-[var(--ink-line-strong)] underline-offset-8 transition-colors hover:decoration-[var(--mint)]"
          >
            All articles →
          </Link>
        </p>
      ) : null}
    </>
  );
}
