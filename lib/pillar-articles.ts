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
  /** ISO date; defaults to the shared pillar date in static-pillars.ts */
  publishedAt?: string;
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
  {
    slug: "when-ai-gets-your-brand-wrong",
    title: "When AI gets your brand wrong: how to find and fix inaccurate answers",
    metaTitle: "When AI gets your brand wrong: how to find and fix inaccurate answers",
    metaDescription:
      "An AI answer can be confident and wrong. Here is where inaccurate brand descriptions come from, how to find them, and how to correct them at the source.",
    excerpt:
      "An inaccurate AI answer is rarely random. It is usually an engine faithfully repeating a stale, confused or missing source. You correct it by fixing what the engine reads, not by arguing with the engine.",
    category: "geo-explainer",
    prompt: "How do I fix wrong information about my brand in AI answers?",
    keyword: "AI inaccurate brand answers",
    secondaryKeywords: ["wrong AI answers about my brand", "AI brand accuracy", "GEO"],
    publishedAt: "2026-10-15T00:00:00.000Z",
    content: `Most brands worry about not being named in AI answers. Far fewer check what happens when they are. An engine can mention you prominently and still give the wrong founding year, a discontinued product, last year’s results or a namesake company’s reviews. Visibility without accuracy can cost more than absence, because the buyer believes what they read.

## Where wrong answers come from

- **Stale pages.** An old press release or a third-party profile is easier to retrieve than your current page, so the engine quotes a figure that was true two years ago.
- **Entity confusion.** Two companies share a name, or a group runs several businesses, and the engine merges them into one description.
- **Missing records.** When no retrievable page states a fact clearly, an engine may fill the gap with something that merely sounds right.
- **Low-quality or hostile sources.** A single forum thread or complaint page becomes the most quotable thing written about you.

## How to find them

Run the questions a buyer, investor or journalist would actually ask, across every major engine, and save each answer with its date and its cited sources. Then grade each answer line by line against a fact sheet your own team has signed off. Note the source behind every error. That source, not the engine, is what you fix.

## How to correct them

1. **Publish the correct fact where it can be retrieved.** A clear, dated page that answers the question in its opening lines.
2. **Make your entity unambiguous.** [Google’s documentation](https://developers.google.com/search/docs/appearance/structured-data/organization) says Organization structured data can help it understand an organisation’s details and distinguish it from others. Consistent names, logo, address and sameAs links to your official profiles all support this.
3. **Deal with the stale source.** Update or retire it where you control it. Where you don’t, request a correction with evidence, not a complaint.
4. **Strengthen corroboration.** The correct version should appear in more than one credible place, not only on your own site.
5. **Re-measure.** Run the same prompts again and record whether the answer changed, and which source the engine now cites.

## What not to do

Don’t try to bury legitimate coverage or flood the web with thin pages. Engines look for corroboration, and manufactured volume tends to read as noise. Suppression attempts can also become the story themselves. And don’t expect an overnight fix: each engine refreshes its sources on its own schedule.

## How we approach it

Optimizer360.ai grades AI answers against a client-approved fact sheet, traces each error to the source behind it, and corrects at that source. Every before and after can be checked by asking the engine yourself.

[Request an audit](/request-audit) to see how AI engines describe your brand today.

## Related

- [What an AI visibility audit includes](/blog/what-an-ai-visibility-audit-includes)
- [How ChatGPT, Perplexity, Gemini, Claude and AI Overviews pick brands to cite](/blog/how-ai-engines-choose-brands-to-cite)
- [Request an audit](/request-audit)
`,
    sources: [
      {
        stat: "Google says Organization structured data can help it understand an organisation’s administrative details and tell it apart from others.",
        context: "Google Search Central, Organization structured data (last updated 8 September 2026).",
        url: "https://developers.google.com/search/docs/appearance/structured-data/organization",
      },
    ],
    faq: [
      {
        question: "Can we ask the engine to correct itself?",
        answer:
          "In-product feedback is not a reliable correction route. The lasting fix is changing what the engine retrieves and how consistently the correct version is corroborated.",
      },
      {
        question: "How long does a correction take?",
        answer:
          "We won’t invent a number. It depends on the engine, the source and how widely the error has spread. What we commit to is recording the same prompt before and after, so you can see when it moves.",
      },
      {
        question: "Is this the same as online reputation management?",
        answer:
          "It overlaps, but the goal differs. The aim is an accurate answer built on evidence, not pushing coverage out of sight.",
      },
    ],
  },
  {
    slug: "generative-engine-optimization",
    title: "What is GEO (generative engine optimisation)?",
    metaTitle: "What is GEO (generative engine optimisation)? A plain guide",
    metaDescription:
      "GEO, or generative engine optimisation, is how a business gets named in AI answers from ChatGPT, Gemini and Google AI Overviews. What it is, what works, what it cannot do.",
    excerpt:
      "GEO, short for generative engine optimisation, is the work of making a business easy for AI tools such as ChatGPT, Gemini and Google AI Overviews to find, understand and name in their answers. It builds on SEO (search engine optimisation); it does not replace it.",
    category: "geo-explainer",
    prompt: "What is GEO (generative engine optimisation)?",
    keyword: "generative engine optimisation",
    secondaryKeywords: ["GEO", "what is GEO", "AI search optimisation"],
    publishedAt: "2026-10-19T00:00:00.000Z",
    content: `## GEO in plain words

When you search Google the classic way, you get a list of links and you choose. When you ask an AI tool the same question, it writes one answer and often names a few businesses inside it. GEO is the work of being one of the businesses it names, and of being described correctly when it does.

Most of that work is ordinary and checkable: clear pages, accurate facts, proof behind your claims, and trustworthy sites that say the same thing about you.

## Why it matters now

The AI answer can end the search. A buyer who asks "who is the best provider of X?" may act on the shortlist in the answer without ever opening a results page. If your business is not in that shortlist, you will not see a lost click in your analytics, because the visit never started.

## Is GEO better than SEO?

No, and it is not a replacement. SEO helps your pages rank and get found. GEO helps the AI tools that read those pages name you and describe you accurately. AI tools mostly work from pages they can already reach, so a site with weak SEO foundations is a weak starting point for GEO. Do SEO first and add GEO on top. The [comparison of AEO, GEO and SEO](/blog/geo-vs-seo-vs-aeo) shows where the three differ.

## "GEO" does not always mean this

The same three letters mean other things, and AI tools do not always pick the one you intended. We tested this. On 7 October 2026 we asked ChatGPT, Gemini and Google AI Overviews 30 questions each, once, and read every answer. Seven of the questions depended on the tool understanding "GEO", "AEO" or "SEO for ChatGPT" as this discipline.

- **ChatGPT** answered about something else on six of the seven. It treated GEO as local or geographic SEO, or as mapping and space agencies, and answered "What is AEO?" with "Authorized Economic Operator", a customs programme.
- **Gemini** gave both meanings on three of them, asked which meaning was intended once, and once explained GEO as geostationary orbit.
- **Google AI Overviews** read all seven as this discipline.
- On a related question that spelled out "generative engine optimization" in full, ChatGPT read the term correctly.

This is one test on one day. Answers vary from run to run. The lesson is practical all the same: **spell the term out** in titles, headings and the first sentence of any page that you want an AI tool to read this way.

## What actually helps

1. **Let the tools in.** Google says a page needs to be indexed and eligible to show a snippet in normal Search, with "no additional requirements" for AI Overviews and AI Mode. For ChatGPT, OpenAI says to allow its search crawler, OAI-SearchBot, in your robots.txt file. It lists this separately from GPTBot, which relates to training.
2. **Answer the question first.** Put the plain answer in the first two sentences, then explain.
3. **Spell out acronyms** the first time you use them, so the tool can tell which meaning you intend.
4. **Show your evidence.** Use real numbers with a date and a source, a named author with credentials, and links to primary sources.
5. **Be described the same way elsewhere.** AI tools check what other sources say about you. Matching profiles, directory listings, reviews and press coverage reinforce the facts on your own site.
6. **Keep pages current.** Show when each page was published and last updated.

You do not need a special file or special markup for Google's AI features. Google states that no special schema.org structured data is needed for them. Structured data is still good practice for search in general.

## What GEO cannot do

It cannot guarantee that an AI tool will mention you. The tools decide what to name, and they change how they decide without notice. Google itself says indexing and serving "isn't guaranteed" even when every requirement is met. Be wary of anyone who sells guaranteed AI citations. The honest promise is the work and the measurement.

## How to measure it

Pick the 20 to 30 questions your buyers really ask. Ask each one on the same AI tools on a regular schedule. Record three things: whether your business is named, whether your website or profile is cited as a source, and whether the description is correct. Repeat monthly and compare against your first run. That first run is your baseline.

## Where to start

1. Write down the questions your buyers ask.
2. Run them on ChatGPT, Gemini and Google AI Overviews, and save the answers.
3. Fix what you find first: missing or wrong facts, crawlers blocked, and pages that bury the answer.

Optimizer360.ai begins every engagement with this baseline. You can [read what an AI visibility audit includes](/blog/what-an-ai-visibility-audit-includes) or [request one](/request-audit).
`,
    sources: [
      {
        stat: "Google says there are no additional requirements to appear in AI Overviews or AI Mode, and that no special schema.org structured data is needed.",
        context: "Google Search Central, AI features and your website (last updated 10 December 2025).",
        url: "https://developers.google.com/search/docs/appearance/ai-features",
      },
      {
        stat: "OpenAI says to allow its search crawler, OAI-SearchBot, in robots.txt to appear in ChatGPT search. This is separate from GPTBot, which relates to training.",
        context: "OpenAI, Overview of OpenAI crawlers.",
        url: "https://developers.openai.com/api/docs/bots",
      },
      {
        stat: "Optimizer360.ai AI Visibility Baseline, 7 October 2026.",
        context: "Method: 30 questions asked once each on ChatGPT, Gemini and Google AI Overviews. ChatGPT and Gemini were queried through their APIs with web search on; Google AI Overviews were read from Google in India.",
      },
    ],
    faq: [
      {
        question: "What does GEO stand for?",
        answer:
          "Generative engine optimisation. It is sometimes called AI search optimisation, and \"GEO\" is also used for geographic or local SEO and for other unrelated terms, so spell it out when it matters.",
      },
      {
        question: "Is GEO the same as AEO?",
        answer:
          "They overlap heavily, and many writers use them as synonyms. AEO (answer engine optimisation) is the older term, focused on being the direct answer. GEO is usually used for being named inside AI-written answers. See [AEO vs GEO vs SEO](/blog/geo-vs-seo-vs-aeo).",
      },
      {
        question: "Do I need to stop doing SEO to do GEO?",
        answer:
          "No. GEO builds on SEO. Keep your SEO and add GEO on top.",
      },
      {
        question: "Do I need special files or markup to appear in Google's AI Overviews?",
        answer:
          "No. Google says no extra technical requirements and no special schema are needed. The page must be indexed and eligible to show a snippet.",
      },
      {
        question: "Can anyone guarantee ChatGPT will mention my business?",
        answer:
          "No. The tools decide. What you control is the quality of your pages, the accuracy of what is said about you, and how well you measure the result.",
      },
    ],
  },
  {
    slug: "geo-vs-seo-vs-aeo",
    title: "AEO vs GEO vs SEO: what is the difference?",
    metaTitle: "AEO vs GEO vs SEO: what is the difference?",
    metaDescription:
      "SEO ranks pages, AEO makes you the direct answer, GEO gets you named in AI answers. What AEO means, how the three differ, and what to do first.",
    excerpt:
      "SEO (search engine optimisation) aims to rank your pages in a list of search results. AEO (answer engine optimisation) aims to make your page the direct answer to a question, and GEO (generative engine optimisation) aims to get your business named inside answers that AI tools write. In practice the three overlap, and you build AEO and GEO on top of SEO.",
    category: "comparison",
    prompt: "AEO vs GEO vs SEO: what is the difference?",
    keyword: "AEO vs GEO vs SEO",
    secondaryKeywords: ["answer engine optimisation", "generative engine optimisation", "SEO"],
    publishedAt: "2026-10-19T00:00:00.000Z",
    content: `## What is AEO (answer engine optimisation)?

AEO is the practice of writing and structuring content so that a tool that gives a direct answer can use yours: a featured snippet on Google, a voice assistant, or an AI chatbot. The work is concrete. State the question, answer it in the first two sentences, and back it up underneath.

**AEO also means something else.** In customs and trade, AEO stands for Authorized Economic Operator, a status for trusted traders. When we asked ChatGPT "What is AEO?" on 7 October 2026, it answered with that meaning. If you write about answer engine optimisation, spell the term out so tools and readers know which AEO you mean.

## The three terms side by side

| | SEO | AEO | GEO |
|---|---|---|---|
| Stands for | Search engine optimisation | Answer engine optimisation | Generative engine optimisation |
| What you are aiming for | A high place in a list of results | To be the direct answer | To be named and described correctly inside an AI-written answer |
| Where it shows | Google and Bing results pages | Featured snippets, voice answers, AI answers | ChatGPT, Gemini, Google AI Overviews and similar |
| How you see progress | Rankings and clicks | Owning the snippet or answer | Being named, cited and described correctly when you ask the questions |
| Main work | Keywords, links, technical health | Clear question-and-answer content | Clear facts, evidence, matching profiles, and regular measurement |

These are working definitions. The terms are new, there is no official standard, and many writers use AEO and GEO as synonyms. When you read a source, check which meaning it intends.

## How they overlap

All three depend on the same base: pages a tool can reach, that load fast and say clearly what they are about. Google states that AI Overviews and AI Mode need no extra technical requirements beyond what normal Search already asks, and that no special structured data is required. So the basics you already do for SEO carry over directly.

The difference is the finish. SEO stops at "the page is findable and ranks". AEO adds "the answer is extractable". GEO adds "the facts about the business are consistent across the sources the AI tools read, and we check what they actually say".

## Which one should you do first?

SEO. A site that search engines cannot index or understand is a poor base for either of the others. Then write your key pages as direct answers (AEO). Then check what AI tools say about you, fix what is wrong or missing, and keep measuring (GEO).

## Common mistakes

- **Treating GEO as a replacement for SEO.** It is an addition.
- **Burying the answer.** If the first paragraph is a warm-up, a tool has nothing to quote.
- **Using the acronym without spelling it out.** In our 7 October 2026 test of 30 questions on ChatGPT, Gemini and Google AI Overviews, ChatGPT answered about something other than this discipline on six of seven questions that used "GEO" or "AEO". It treated GEO as local SEO or as mapping and space agencies, and AEO as the customs programme. Spelling the term out is the simplest fix we know.
- **Blocking the crawlers.** OpenAI says to allow OAI-SearchBot in your robots.txt file if you want to appear in ChatGPT search.
- **Inventing numbers.** Unsourced statistics erode trust and are easy to check.
- **Expecting a guarantee.** No one controls what an AI tool names.

## How to check where you stand

Write down the questions your buyers ask. Ask each on ChatGPT, Gemini and Google AI Overviews. Save the answers and note three things: were you named, were you cited as a source, was the description correct? Repeat on a schedule and compare. [What an AI visibility audit includes](/blog/what-an-ai-visibility-audit-includes) explains the full method, and you can [request one](/request-audit).
`,
    sources: [
      {
        stat: "Google says there are no additional requirements to appear in AI Overviews or AI Mode, and that no special schema.org structured data is needed.",
        context: "Google Search Central, AI features and your website (last updated 10 December 2025).",
        url: "https://developers.google.com/search/docs/appearance/ai-features",
      },
      {
        stat: "OpenAI says to allow its search crawler, OAI-SearchBot, in robots.txt to appear in ChatGPT search. This is separate from GPTBot, which relates to training.",
        context: "OpenAI, Overview of OpenAI crawlers.",
        url: "https://developers.openai.com/api/docs/bots",
      },
      {
        stat: "Optimizer360.ai AI Visibility Baseline, 7 October 2026.",
        context: "Method: 30 questions asked once each on ChatGPT, Gemini and Google AI Overviews. ChatGPT and Gemini were queried through their APIs with web search on; Google AI Overviews were read from Google in India.",
      },
    ],
    faq: [
      {
        question: "What is AEO?",
        answer:
          "Answer engine optimisation: making your content usable as the direct answer to a question, in a snippet, a voice answer or an AI chatbot. Not to be confused with the Authorized Economic Operator customs status.",
      },
      {
        question: "Is GEO the same as AEO?",
        answer:
          "They overlap, and many writers treat them as one. A useful way to tell them apart: AEO is about being the answer, and GEO is about being named correctly inside an AI-written answer.",
      },
      {
        question: "Is SEO dead because of AI?",
        answer:
          "No. AI tools mostly work from pages they can reach, so the foundations of SEO still apply. What has changed is that a buyer can now get an answer without visiting a results page.",
      },
      {
        question: "Which one gives the quickest result?",
        answer:
          "There is no honest quick answer. Indexing and AI answers update on the tools' own schedules, and Google notes that appearing is never guaranteed. Start with the basics and measure.",
      },
      {
        question: "Do I need special markup for AEO or GEO?",
        answer:
          "Not for Google's AI features, according to Google. Structured data is still good practice for search generally.",
      },
    ],
  },
];
