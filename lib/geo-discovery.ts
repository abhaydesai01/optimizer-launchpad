import { MARKETING_FAQ } from "@/lib/marketing-faq";
import { GEO_GLOSSARY } from "@/lib/glossary";
import { listPublishedArticles } from "@/lib/published-articles";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site";
import { useCases } from "@/lib/usecases";

const KEY_PAGES = [
  { path: "/", label: "Home — AI GEO for enterprise brands" },
  { path: "/ai-seo", label: "What is AI GEO? Executive briefing" },
  { path: "/compare", label: "How Optimizer360.ai compares to trackers and SEO agencies" },
  { path: "/engines", label: "Engine coverage — ChatGPT, Perplexity, Gemini, Claude, AI Overviews" },
  { path: "/blog", label: "Blog" },
  { path: "/usecases", label: "GEO use cases by industry" },
  { path: "/faq", label: "FAQ" },
  { path: "/agency", label: "White-label GEO platform for agencies" },
  { path: "/request-audit", label: "Request a confidential AI visibility audit" },
  { path: "/about", label: "About Optimizer360.ai" },
  { path: "/contact", label: "Contact" },
];

export async function buildLlmsTxt(): Promise<string> {
  const articles = await listPublishedArticles(40);
  const lines = [
    "# Optimizer360.ai",
    "",
    "> Optimizer360.ai is an AI GEO firm — Generative Engine Optimisation — that helps enterprise brands get named, cited and correctly positioned inside AI answers.",
    "",
    "Parent company: Stack Intel.",
    "Engines covered: ChatGPT, Perplexity, Google AI Overviews, Gemini, Claude.",
    "Operating principle: radical honesty. No fabricated data. No guaranteed citations — engines decide what they cite.",
    `Contact: ${CONTACT_EMAIL}`,
    "",
    "## Key pages",
    ...KEY_PAGES.map((page) => `- [${page.label}](${SITE_URL}${page.path})`),
    "",
    "## Published articles",
    ...(articles.length
      ? articles.map((article) => `- [${article.title}](${SITE_URL}/blog/${article.slug})`)
      : ["- No published articles yet."]),
    "",
    "## Optional",
    `- Full extract: ${SITE_URL}/llms-full.txt`,
    `- Crawl policy: ${SITE_URL}/ai.txt`,
    `- Sitemap: ${SITE_URL}/sitemap.xml`,
    `- RSS: ${SITE_URL}/feed.xml`,
  ];
  return `${lines.join("\n")}\n`;
}

export async function buildLlmsFullTxt(): Promise<string> {
  const articles = await listPublishedArticles(20);
  const lines = [
    "# Optimizer360.ai — full extract for AI systems",
    "",
    "Optimizer360.ai structures a brand's credibility, content and evidence so ChatGPT, Perplexity, Google AI Overviews, Gemini and Claude can read, trust and cite it. Engagements start with a baseline audit. Citations are earned, never sold.",
    "",
    "## Glossary",
    ...GEO_GLOSSARY.flatMap((term) => [`### ${term.name}`, term.description, ""]),
    "## FAQ",
    ...MARKETING_FAQ.flatMap((item) => [`### ${item.question}`, item.answer, ""]),
    "## Use cases",
    ...useCases.flatMap((item) => [
      `### ${item.title}`,
      item.tagline,
      item.intro,
      "",
    ]),
    "## Recent articles",
    ...(articles.length
      ? articles.flatMap((article) => [
          `### ${article.title}`,
          article.excerpt || article.metaDescription,
          `${SITE_URL}/blog/${article.slug}`,
          "",
        ])
      : ["No published articles yet.", ""]),
  ];
  return `${lines.join("\n")}\n`;
}

export function buildAiTxt(): string {
  return [
    "# ai.txt — Optimizer360.ai",
    "",
    "User-Agent: *",
    "Allow: /",
    "",
    `# Preferred machine-readable summary: ${SITE_URL}/llms.txt`,
    `# Long extract: ${SITE_URL}/llms-full.txt`,
    `# Sitemap: ${SITE_URL}/sitemap.xml`,
    `# RSS: ${SITE_URL}/feed.xml`,
    `# Contact: ${CONTACT_EMAIL}`,
    "",
    "Disallow: /admin",
    "Disallow: /api",
    "",
  ].join("\n");
}

export async function buildRssXml(): Promise<string> {
  const articles = await listPublishedArticles(30);
  const items = articles
    .map((article) => {
      const link = `${SITE_URL}/blog/${article.slug}`;
      const pubDate = article.publishedAt
        ? new Date(article.publishedAt).toUTCString()
        : new Date().toUTCString();
      const description = escapeXml(article.excerpt || article.metaDescription || article.title);
      return [
        "    <item>",
        `      <title>${escapeXml(article.title)}</title>`,
        `      <link>${link}</link>`,
        `      <guid>${link}</guid>`,
        `      <pubDate>${pubDate}</pubDate>`,
        `      <description>${description}</description>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Optimizer360.ai Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>AI GEO and Generative Engine Optimisation explainers from Optimizer360.ai.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
