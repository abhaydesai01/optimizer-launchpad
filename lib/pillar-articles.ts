import type { ArticleCategory } from "@/lib/article-categories";

export type PillarArticle = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: ArticleCategory;
  prompt: string;
  keyword: string;
  secondaryKeywords: string[];
  content: string;
  sources: Array<{ stat: string; context: string; url?: string }>;
  faq: Array<{ question: string; answer: string }>;
};

export const PILLAR_ARTICLES: PillarArticle[] = [
  {
    slug: "what-is-ai-geo",
    title: "What is AI GEO?",
    metaTitle: "What is AI GEO? Generative Engine Optimisation explained",
    metaDescription:
      "AI GEO is Generative Engine Optimisation: structuring credibility, content and evidence so ChatGPT, Perplexity, Gemini, Claude and AI Overviews can cite a brand.",
    excerpt:
      "AI GEO — Generative Engine Optimisation — is the discipline of structuring a brand’s credibility, content and evidence so generative engines can read, trust and cite that brand in their answers instead of a list of links.",
    category: "geo-explainer",
    prompt: "What is AI GEO / Generative Engine Optimisation?",
    keyword: "AI GEO",
    secondaryKeywords: ["Generative Engine Optimisation", "GEO", "AEO"],
    content: `AI GEO — formally Generative Engine Optimisation, and sometimes called Answer Engine Optimisation (AEO) — is the work of making a brand readable, trustworthy and citable inside AI answers.

Traditional SEO still matters. It earns a place on a results page. AI GEO earns a place in the answer itself. When someone asks ChatGPT, Perplexity, Google AI Overviews, Gemini or Claude who to trust, the engine names a few brands. Those names become the consideration set.

## Why the discipline exists

Buyers now ask engines who to choose. The engine synthesises one answer from pages, entities and sources it already trusts. If your brand is missing, poorly structured, or contradicted by stronger sources, you are not “ranking lower” — you are absent from the shortlist.

That absence does not show up in Google Analytics as a lost click. The buyer never visited you.

## What AI GEO actually changes

GEO work is not a new keyword list. It usually includes:

- Mapping the buyer questions engines already answer in your category
- Publishing definition-first pages that answer those questions in the first paragraph
- Adding machine-readable structure (FAQPage, Article, Organization, Person)
- Making the site crawlable to AI bots (robots.txt, sitemap, llms.txt)
- Tracking, week by week, whether you are named, cited, or replaced

## What it does not do

No honest firm can guarantee a citation. Engines decide. Paid placements do not exist inside ChatGPT or Claude answers. Invented statistics, fake case studies and “guaranteed visibility” offers are the opposite of GEO — they train engines and buyers to distrust you.

## How to start

Start with a baseline: run your real buyer prompts across the five engines and record what they say. Then close the gaps — content, entities, schema, sources — and measure again. Optimizer360.ai’s engagements begin with that audit; every finding is meant to be reproducible in the engine itself.

See also the [executive briefing on AI GEO](/ai-seo) and [how Optimizer360.ai compares to trackers](/compare).
`,
    sources: [
      {
        stat: "llms.txt is a proposed standard for a site-level Markdown summary for language models.",
        context: "Useful as a discovery file, not a ranking guarantee.",
        url: "https://llmstxt.org/",
      },
    ],
    faq: [
      {
        question: "Is AI GEO the same as SEO?",
        answer:
          "No. SEO optimises for ranked links. AI GEO optimises for a synthesised answer. The two reinforce each other; they are not substitutes.",
      },
      {
        question: "Does GEO guarantee ChatGPT citations?",
        answer:
          "No. Engines choose what they cite. GEO does the work that earns citations and tracks whether they appear.",
      },
    ],
  },
  {
    slug: "ai-geo-vs-seo-vs-aeo",
    title: "AI GEO vs SEO vs AEO",
    metaTitle: "AI GEO vs SEO vs AEO — what actually differs",
    metaDescription:
      "SEO ranks links. AEO emphasises direct answers. AI GEO (Generative Engine Optimisation) is the work of becoming the brand a generative engine names and cites.",
    excerpt:
      "SEO is for ranked links. AEO emphasises engines that answer instead of listing. AI GEO is the execution discipline for generative engines: structure, evidence and weekly proof across ChatGPT, Perplexity, Gemini, Claude and AI Overviews.",
    category: "comparison",
    prompt: "AI GEO vs SEO vs AEO",
    keyword: "AI GEO vs SEO",
    secondaryKeywords: ["AEO", "Generative Engine Optimisation"],
    content: `People use three labels for adjacent work. They are not interchangeable.

**SEO** (search engine optimisation) is the practice of earning visibility in a ranked list of links — still essential for Google Search and for the pages AI engines later retrieve.

**AEO** (answer engine optimisation) is the older term for optimising content so engines that return a direct answer — featured snippets, voice, now AI chat — can extract it.

**AI GEO** (Generative Engine Optimisation) is the name we use for the full discipline on generative engines: not only extractable copy, but entity clarity, schema, crawl access, source quality, and measurement across ChatGPT, Perplexity, Google AI Overviews, Gemini and Claude.

## A practical comparison

| Signal | Classic SEO | AEO | AI GEO |
| --- | --- | --- | --- |
| Primary output | Ranked links | A snippet or spoken answer | A named brand inside a synthesised answer |
| Core units | Keywords, backlinks, pages | Question/answer blocks | Prompts, entities, citations, sources |
| Success metric | Rank and clicks | Snippet ownership | Mention, citation, correct framing |
| Can you buy it? | Ads exist beside results | Rarely | No ads inside the answer |

## What to keep from SEO

Technical health, canonicals, sitemaps, original reporting, and internal links still matter. Generative engines retrieve pages. A site that is uncrawlable or contradictory will not become the cited source.

## What SEO agencies often miss

Rankings do not automatically transfer into AI answers. A page can rank and still be ignored if it buries the answer, lacks an entity, or is weaker than a competitor’s glossary or FAQ. Trackers that only measure AI mentions also miss the work: diagnosis, content, schema and an assigned team.

Optimizer360.ai is built for the GEO layer. Keep your SEO stack; add GEO for the answer. Read the [capability comparison](/compare).
`,
    sources: [
      {
        stat: "Google documents how structured data helps search understand page content.",
        context: "Schema is a shared prerequisite for search snippets and many AI retrieval systems.",
        url: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data",
      },
    ],
    faq: [
      {
        question: "Should we stop SEO if we invest in GEO?",
        answer:
          "No. GEO depends on crawlable, trustworthy pages. SEO and GEO should run in parallel.",
      },
      {
        question: "Is AEO just another name for GEO?",
        answer:
          "AEO is the closest older term. We use AI GEO because the work now spans five generative engines, not only answer boxes.",
      },
    ],
  },
  {
    slug: "how-ai-engines-choose-brands-to-cite",
    title: "How ChatGPT, Perplexity, Gemini, Claude and AI Overviews pick brands to cite",
    metaTitle: "How AI engines choose which brands to cite",
    metaDescription:
      "Generative engines cite brands they can retrieve, understand and trust. There is no paid slot. Here is the honest picture of how that choice is made.",
    excerpt:
      "AI engines cite brands they can retrieve, parse and corroborate. They do not sell a placement inside the answer. The work is to become the clearest, most evidenced source on the prompts buyers already ask.",
    category: "engine-guide",
    prompt: "How ChatGPT, Perplexity, Gemini, Claude, and AI Overviews pick brands to cite",
    keyword: "how AI engines cite brands",
    secondaryKeywords: ["ChatGPT citations", "Perplexity sources", "AI Overviews"],
    content: `There is no public auction for “being named” in ChatGPT or Claude. Each engine retrieves sources, compresses them, and prefers pages it can parse and corroborate.

The details differ:

- **ChatGPT** (and browsing / search modes) pulls from the live web and licensed data. Clear entities, original explanations and consistent brand facts help it name you without inventing a competitor.
- **Perplexity** shows sources more explicitly. Domain-level citation patterns matter; a thin marketing page loses to a specific, dated explainer.
- **Google AI Overviews** sit on Search. Entity understanding, structured data and classic crawl health still weigh heavily.
- **Gemini** overlaps Google’s index and Workspace context. Inconsistent NAP, schema or product names confuse it.
- **Claude** is often used for due diligence. It leans on sources that read like evidence, not slogans.

## What we can say without inventing numbers

We will not publish a fake “citation rate by engine.” Refresh cycles, retrieval sets and safety filters change. What we can say: engines prefer pages that answer the question immediately, mark up Q&A, declare an author or organization, and match facts found elsewhere.

## What brands get wrong

They write 2,000 words that never answer the H1. They block GPTBot or PerplexityBot in robots.txt. They ship Organization schema with no logo, no sameAs, and three different legal names. They invent statistics the engine can contradict.

## How we measure it

Optimizer360.ai runs the same buyer prompts across all five engines and records mentions, citations and framing. You can reproduce every finding by asking the engine yourself. That is the only honest scoreboard.
`,
    sources: [
      {
        stat: "OpenAI documents the GPTBot user agent used to crawl sites.",
        context: "Blocking GPTBot is a common accidental reason a brand never appears in ChatGPT retrieval.",
        url: "https://platform.openai.com/docs/bots",
      },
      {
        stat: "Google lists crawlers used for Search and AI-related features.",
        context: "AI Overviews still depend on crawl access and understandable pages.",
        url: "https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers",
      },
    ],
    faq: [
      {
        question: "Can we pay an engine to name us?",
        answer:
          "Not inside the organic answer. Ads may appear beside some products; they are not the same as a citation.",
      },
      {
        question: "Why does Perplexity cite a competitor we outrank on Google?",
        answer:
          "Retrieval is not identical to classic rank. A competitor page may be clearer, better structured, or more frequently corroborated.",
      },
    ],
  },
  {
    slug: "how-to-get-cited-by-ai-engines",
    title: "How to get cited by AI engines",
    metaTitle: "How to get cited by AI engines (without guarantees)",
    metaDescription:
      "A practical GEO process for earning AI citations: baseline prompts, answer-first pages, schema, crawl access, sources, and weekly verification. No guarantees.",
    excerpt:
      "You get cited by becoming the page an engine can retrieve, understand and trust on a real buyer question. The process is baseline, diagnose, build, prove — not a purchased placement.",
    category: "geo-explainer",
    prompt: "How to get cited by AI engines",
    keyword: "get cited by AI",
    secondaryKeywords: ["AI citations", "GEO process"],
    content: `There is a process. There is not a switch.

## 1. Baseline the prompts that matter

List the questions a serious buyer asks before they shortlist you. Run them on ChatGPT, Perplexity, Google AI Overviews, Gemini and Claude. Write down who is named, who is cited, and how you are framed. If you are absent, that is the gap — not a vanity keyword.

## 2. Publish an answer, then the essay

The first 40–60 words should answer the H1. Then explain. Add an FAQ that matches visible questions. Link to related definitions, not only your homepage.

## 3. Make the page machine-readable

Use Article schema with a real date, author (Person) and publisher logo. Use FAQPage only for questions that appear on the page. Add Organization and sameAs so the brand is one entity, not three spellings.

## 4. Let the engines in

Allow GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended and related agents in robots.txt. Keep a current sitemap. Add [llms.txt](/blog/llms-txt-and-robots-txt-for-ai-crawlers) as a short, factual map of the site.

## 5. Earn corroboration

Engines cross-check. A claim that exists only on your homepage and nowhere else is weak. Publish sources. Get mentioned on pages the engines already trust — not as spam, as genuine references.

## 6. Measure weekly

Citations move on the engine’s schedule, not yours. We will not invent a week-count. We will show a baseline on day one and whether the same prompts changed.

Optimizer360.ai assigns a GEO strategist, writer and developer to run this loop. Request an [audit](/request-audit) if you want the baseline first.
`,
    sources: [
      {
        stat: "The llms.txt proposal describes a /llms.txt file as a curated overview for language models.",
        context: "One discovery file among crawl, schema and content — not a silver bullet.",
        url: "https://llmstxt.org/",
      },
    ],
    faq: [
      {
        question: "How long until we are cited?",
        answer:
          "We will not invent a timeline. Engines refresh independently. What we commit to is a baseline and weekly tracking of the same prompts.",
      },
      {
        question: "Do we need a blog?",
        answer:
          "You need answerable URLs. A blog is a common way to publish them. Glossary, FAQ and comparison pages work too.",
      },
    ],
  },
  {
    slug: "what-an-ai-visibility-audit-includes",
    title: "What an AI visibility audit includes",
    metaTitle: "What an AI visibility audit includes",
    metaDescription:
      "An Optimizer360.ai audit runs your buyer prompts across five AI engines and records mentions, citations, gaps and what it would take to earn the answer. Confidential, verifiable, no fabricated data.",
    excerpt:
      "An AI visibility audit is a recorded baseline: the same buyer prompts, five engines, who is named, who is cited, and which gaps in content, entities or crawl access explain the result.",
    category: "geo-explainer",
    prompt: "What an AI visibility audit includes",
    keyword: "AI visibility audit",
    secondaryKeywords: ["GEO audit", "AI citation audit"],
    content: `An AI visibility audit is not a 40-page strategy deck of invented TAM slides. It is a picture of what the engines already say about you.

## What we run

We take a set of buyer prompts — category, comparison, “best”, trust and local or vertical variants — and run them across ChatGPT, Perplexity, Google AI Overviews, Gemini and Claude. For each prompt we record:

- Whether your brand is named
- Whether a URL is cited
- How you are framed (leader, also-ran, missing, incorrect)
- Which competitors occupy the answer

## What we inspect on the site

- robots.txt rules for AI crawlers
- sitemap coverage of the pages that should answer those prompts
- Homepage and key-page title, H1, canonical, Open Graph
- JSON-LD types present vs the types the prompts imply (Organization, Article, FAQPage, Person)
- Whether a definition-first page exists for the questions you are losing

## What you receive

A confidential baseline you can verify by opening the same engines. We do not invent a “visibility score” that cannot be reproduced. If a number appears, you can recreate the method.

Engagements are scoped after the audit, not before. There is no public price list because the gap is not the same for a hospital group and a jewellery house.

[Request the audit](/request-audit). Every finding is yours to verify.
`,
    sources: [],
    faq: [
      {
        question: "Is the audit free?",
        answer:
          "Ask for current terms on the request form. The constant is that findings are confidential and verifiable — we do not sell a fake score.",
      },
      {
        question: "Will you guarantee citations after the audit?",
        answer:
          "No. The audit shows the gap. The engagement does the work. Engines still decide.",
      },
    ],
  },
  {
    slug: "llms-txt-and-robots-txt-for-ai-crawlers",
    title: "llms.txt and robots.txt for AI crawlers",
    metaTitle: "llms.txt and robots.txt for AI crawlers",
    metaDescription:
      "How to allow GPTBot, ClaudeBot, PerplexityBot and Google-Extended in robots.txt, and what an honest llms.txt should contain. No ranking promises.",
    excerpt:
      "robots.txt decides whether AI crawlers may fetch your pages. llms.txt is an optional Markdown map of the site. Neither file buys a citation; both remove avoidable reasons you are invisible.",
    category: "glossary",
    prompt: "llms.txt and robots.txt for AI crawlers",
    keyword: "llms.txt",
    secondaryKeywords: ["robots.txt AI crawlers", "GPTBot", "ClaudeBot"],
    content: `Two small text files do a lot of GEO damage when they are wrong.

## robots.txt

Search and AI crawlers honour robots.txt. If you \`Disallow: /\` for GPTBot, ClaudeBot, PerplexityBot or Google-Extended, those systems are being told not to fetch you. That is a choice — sometimes correct for staging — and a common production accident.

A GEO-friendly policy typically:

- Allows \`/\` for \`*\` except \`/admin\` and \`/api\`
- Explicitly allows the major AI user agents
- Points at your sitemap

Optimizer360.ai’s public robots policy is generated from a template that names GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, Bingbot, Applebot-Extended and others.

Confirm current official agent names in each vendor’s documentation before you copy a list from a blog.

## llms.txt

[llms.txt](https://llmstxt.org/) is a proposed convention: a Markdown file at \`/llms.txt\` that tells language models what the site is, which pages matter, and where the longer extract lives (\`/llms-full.txt\`). It is not an official Google ranking factor. It is a courtesy map.

A useful llms.txt is short, factual, and updated when you publish. It should not invent metrics. Ours lists who we are, the engines we cover, key URLs, and published articles.

## ai.txt

Some sites add \`/ai.txt\` as a human-readable crawl policy that points at llms.txt, the sitemap and a contact address. It complements robots.txt; it does not replace it.

## What not to do

Do not stuff llms.txt with keyword lists. Do not claim citation rates. Do not allow bots on staging and then forget to allow them in production — or the reverse.
`,
    sources: [
      {
        stat: "llmstxt.org defines the proposed /llms.txt format.",
        context: "Treat it as a discovery convention, not a guaranteed citation lever.",
        url: "https://llmstxt.org/",
      },
      {
        stat: "OpenAI publishes the GPTBot / OAI-SearchBot documentation.",
        context: "Use the official user-agent names in robots.txt.",
        url: "https://platform.openai.com/docs/bots",
      },
    ],
    faq: [
      {
        question: "Is llms.txt required for GEO?",
        answer:
          "No. Crawl access, clear pages and trustworthy sources matter more. llms.txt is a useful extra.",
      },
      {
        question: "Should we block AI trainers but allow search bots?",
        answer:
          "That is a policy choice. Be explicit. Blocking all AI agents will also limit answer-engine retrieval.",
      },
    ],
  },
];
