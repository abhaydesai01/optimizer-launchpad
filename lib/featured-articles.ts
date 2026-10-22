export type FeaturedArticle = { href: string; title: string; blurb: string };

/** The explainers every learning surface (home, /ai-seo, /faq) should point to. Add new ones here. */
export const EXPLAINER_ARTICLES: FeaturedArticle[] = [
  {
    href: "/blog/generative-engine-optimization",
    title: "What is GEO (generative engine optimisation)?",
    blurb: "The plain-language guide: what it is, what helps and what it cannot do.",
  },
  {
    href: "/blog/geo-vs-seo-vs-aeo",
    title: "AEO vs GEO vs SEO: what is the difference?",
    blurb: "How the three terms differ, where they overlap and which to do first.",
  },
  {
    href: "/blog/is-seo-dead-now-with-ai",
    title: "Is SEO dead now with AI?",
    blurb: "What Pew, Ahrefs, Seer Interactive and Google’s own guidance show.",
  },
  {
    href: "/blog/when-ai-gets-your-brand-wrong",
    title: "When AI gets your brand wrong",
    blurb: "Where inaccurate answers come from and how to correct them at the source.",
  },
];

/** Further reading for the FAQ page: comparison, India services and product data. */
export const MORE_ARTICLES: FeaturedArticle[] = [
  {
    href: "/blog/optimizer360-vs-profound",
    title: "Optimizer360.ai vs Profound vs Peec AI",
    blurb: "Managed service or software: how they differ and when each fits.",
  },
  {
    href: "/blog/geo-tool-india",
    title: "AI SEO and GEO services in India",
    blurb: "GEO services from our Mumbai office and how an engagement runs.",
  },
  {
    href: "/blog/product-data-ai-shopping",
    title: "Your product data is the new shop window",
    blurb: "What AI shopping engines read about your products, with a checklist.",
  },
];
