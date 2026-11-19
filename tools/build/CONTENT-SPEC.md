# Content spec for tools/build/content/*.json

Each file is a JSON array of page objects. tools/build/build.py turns them into static pages with the shared nav, footer, meta tags and JSON-LD. Write valid JSON (double quotes, escaped inner quotes, no trailing commas). HTML is allowed inside string fields marked (html): only `<p> <ul> <ol> <li> <strong> <em> <a href> <h3> <span class="g">` (green highlight). Internal links use root paths like `/solutions/geo/`.

## Page object
```json
{
  "path": "/solutions/geo/",
  "title": "GEO agency: get named in AI answers",
  "description": "140–160 characters. Includes the primary keyword naturally and a reason to click.",
  "keywords": ["primary keyword", "secondary", "long-tail question", "..."],
  "schema": "Service",
  "eyebrow": "Solutions · GEO",
  "h1": "Get named in <span class=\"g\">the answer.</span>",
  "lede": "One or two sentences under the H1.",
  "answer": "40–70 words. A direct, self-contained answer to the page's core question, written so an AI engine can quote it verbatim. Starts with the subject, e.g. 'Generative engine optimisation (GEO) is ...'",
  "sections": [ ...blocks ],
  "faqs": [ {"q": "Question as a buyer would type it to ChatGPT?", "a": "2–4 sentence answer, plain text."} ],
  "related": ["/path/", "/path/"],
  "article": {"published": "2026-11-10", "minutes": 7}
}
```
- `title`: ≤ 55 characters, WITHOUT the brand (the build adds " | Optimizer360"). Lead with the keyword.
- `schema`: one of `Service`, `Article`, `CollectionPage`, `AboutPage`, `ContactPage`, `WebPage`, `FAQPage`, `DefinedTermSet`. Blog posts and case studies use `Article` and include `article`.
- `h1`: short, Futura capitals on screen (3–7 words). Use `<span class="g">` for the green half.
- `faqs`: 3–6 per page (they become FAQPage schema, which AI engines read). Real buyer questions, not marketing.
- `related`: 2–4 internal paths (they render as "Keep reading" links). Only use paths from the site map below.

## Blocks (`sections` array)
```json
{"type": "prose", "h2": "Optional heading", "html": "<p>…</p><ul><li>…</li></ul>"}
{"type": "cols", "h2": "Heading", "intro": "optional one line", "items": [{"t": "Short title", "d": "One or two sentences."}]}
{"type": "steps", "h2": "Heading", "items": [{"t": "Scan", "d": "…"}]}
{"type": "stats", "items": [{"n": "47.9%", "d": "of ChatGPT's top-10 cited sources are Wikipedia.", "src": "Profound, 2025"}]}
{"type": "table", "h2": "Heading", "head": ["", "SEO", "GEO"], "rows": [["Goal", "Rank pages", "Get named in answers"]]}
{"type": "callout", "html": "<p><strong>What we won't promise:</strong> …</p>"}
{"type": "terms", "items": [{"id": "visibility-score", "t": "Visibility score", "d": "Definition, 1–3 sentences."}]}
```
- `cols`: 2–6 items. `steps`: 3–6 items. `stats`: 2–4 items, only figures from FACTS.md with their source.
- Aim for pages that answer one intent completely. Put the answer first, then the detail. Use question-style H2s where natural ("How does GEO work?") because AI engines match them to prompts.

## Site map (the only internal paths that exist)
/ · /solutions/ · /solutions/geo/ · /solutions/geo-investor-relations/ · /solutions/reputation/ · /solutions/feeder-network/ · /solutions/content-community/ · /solutions/ai-agents/ · /solutions/leads-pipeline/ · /platform/ · /industries/ · /industries/real-estate/ · /industries/financial-services/ · /industries/retail-consumer/ · /industries/food-fmcg/ · /industries/b2b-services/ · /industries/technology-saas/ · /industries/pharma-healthcare/ · /industries/manufacturing/ · /industries/industrial-engineering/ · /industries/cinema-entertainment/ · /results/ · /results/real-estate-ai-visibility/ · /results/investor-relations-narrative/ · /blog/ · /blog/generative-engine-optimization/ · /blog/geo-vs-seo-vs-aeo/ · /blog/how-ai-engines-choose-brands-to-cite/ · /blog/how-to-get-cited-by-ai-engines/ · /blog/what-an-ai-visibility-audit-includes/ · /blog/when-ai-gets-your-brand-wrong/ · /glossary/ · /faq/ · /about/ · /careers/ · /contact/ · /privacy/ · /terms/
