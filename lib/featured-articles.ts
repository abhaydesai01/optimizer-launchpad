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
    href: "/blog/trust-led-categories-evidence-ai-can-check",
    title: "Trust is the product",
    blurb: "Why hospitals, banks and schools need evidence AI can check.",
  },
  {
    href: "/blog/how-to-do-seo-for-chatgpt",
    title: "How to do SEO for ChatGPT",
    blurb: "What actually helps you get found in ChatGPT search, and what does not.",
  },
  {
    href: "/blog/what-is-llm-seo",
    title: "What is LLM SEO?",
    blurb: "A plain guide to optimising a brand for large language models.",
  },
  {
    href: "/blog/peec-ai-alternatives",
    title: "Peec AI alternatives",
    blurb: "Options compared on published prices, with the cost per 1,000 AI answers.",
  },
  {
    href: "/blog/profound-alternatives",
    title: "Profound alternatives",
    blurb: "Options with public pricing, and when a managed service fits better.",
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
