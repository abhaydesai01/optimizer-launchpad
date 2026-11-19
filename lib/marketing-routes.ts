/** Single source of truth for marketing site navigation — keep nav and footer in sync. */

export const MARKETING_NAV = [
  { label: "Platform", href: "/#platform" },
  { label: "Engines", href: "/engines" },
  { label: "Blog", href: "/blog" },
  { label: "Use cases", href: "/usecases" },
  { label: "Compare", href: "/compare" },
  { label: "About", href: "/about" },
] as const;

/** Extra links shown in mobile nav only (keeps desktop nav focused). */
export const MARKETING_NAV_MOBILE_EXTRAS = [
  { label: "What is AI GEO?", href: "/ai-seo" },
  { label: "For agencies", href: "/agency" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const MARKETING_FOOTER = {
  product: [
    { label: "Platform", href: "/#platform" },
    { label: "Engine coverage", href: "/engines" },
    { label: "Blog", href: "/blog" },
    { label: "Use cases", href: "/usecases" },
    { label: "FAQ", href: "/faq" },
    { label: "How we compare", href: "/compare" },
    { label: "What is AI GEO?", href: "/ai-seo" },
    { label: "For agencies", href: "/agency" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
    { label: "Request an Audit", href: "/request-audit" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;

/** Public marketing routes that must return 200 in smoke tests. */
export const MARKETING_ROUTES = [
  "/",
  "/about",
  "/request-audit",
  "/ai-seo",
  "/engines",
  "/compare",
  "/agency",
  "/contact",
  "/careers",
  "/privacy",
  "/terms",
  "/thank-you",
  "/blog",
  "/usecases",
  "/faq",
] as const;
