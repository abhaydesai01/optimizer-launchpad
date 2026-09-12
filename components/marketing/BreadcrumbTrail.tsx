import Link from "next/link";
import { buildBreadcrumbSchema } from "@/lib/schema-library";
import { SITE_URL } from "@/lib/site";
import { JsonLd } from "@/components/marketing/JsonLd";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function BreadcrumbTrail({ items }: { items: BreadcrumbItem[] }) {
  if (!items.length) return null;

  const schemaItems = items
    .filter((item) => item.href)
    .map((item) => ({
      name: item.label,
      url: item.href!.startsWith("http") ? item.href! : `${SITE_URL}${item.href}`,
    }));

  return (
    <>
      {schemaItems.length > 0 ? (
        <JsonLd id="breadcrumbs" data={buildBreadcrumbSchema(schemaItems)} />
      ) : null}
      <nav aria-label="Breadcrumb" className="mb-5 text-[13px] text-[var(--paper-muted)]">
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, index) => {
            const last = index === items.length - 1;
            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
                {index > 0 ? <span aria-hidden="true">/</span> : null}
                {item.href && !last ? (
                  <Link href={item.href} className="hover:text-[var(--paper)]">
                    {item.label}
                  </Link>
                ) : (
                  <span className={last ? "text-[var(--paper-soft)]" : undefined}>{item.label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
