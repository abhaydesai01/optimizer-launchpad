# Publishing a new article

Articles are static entries in `lib/pillar-articles.ts` (the database copies are only a fallback). One checklist, in order.

## 1. Before writing: the page standard
- The question is the title. The plain answer is in the first two sentences.
- Spell out every acronym on first use (GEO, AEO, SEO, CTR).
- Every figure has a date and a source. Read the source yourself. Never quote a statistic you only saw second-hand.
- Author: the GEO team (`DEFAULT_AUTHOR`), unless told otherwise. Put a publish date on the entry.
- No guarantees, no invented numbers, no client names.
- Competitor details: read the vendor's own pages in a rendered browser, and date the check.

## 2. Add the entry to `lib/pillar-articles.ts`
- `slug`, `title`, `metaTitle`, `metaDescription` (50 to 175 characters), `excerpt`, `category`, `prompt`, `keyword`, `secondaryKeywords`, `publishedAt` (ISO date).
- **`metaTitle` must not end in "| Optimizer360.ai".** The site adds it. A suffix doubles the site name.
- **`excerpt` is shown as the summary under the title.** Do not repeat it as the first paragraph of `content`.
- **`content` is markdown without the H1, the FAQ or the sources.** FAQ goes in `faq`, sources in `sources` (each with a dated `context` and a `url`).
- Link to other pages with relative links (`/blog/...`, `/request-audit`). Markdown links in FAQ answers are stripped to plain text.
- Replacing an old database article at the same address: add the slug to `OVERRIDDEN_ARTICLE_SLUGS` in `lib/retired-articles.mjs`.
- Retiring an article: add it to `RETIRED_ARTICLE_REDIRECTS` with a destination.
- If it belongs on the home page, `/ai-seo` or `/faq`, add it to `lib/featured-articles.ts`.

## 3. Check locally
`npx tsc --noEmit -p tsconfig.json && npx vitest run`, then run the site (`npx next dev -p 3010`) and
`node scripts/verify-article.mjs <slug> http://localhost:3010`.

## 4. Commit and push
- `git add` the files, then `git diff --cached --stat` and make sure every intended file is listed before committing. (A failed `git add` once left a commit without its config file and broke `/pricing` for a few minutes.)
- Push to `main`. Netlify deploys in two to three minutes.

## 5. Verify on the live site
`node scripts/verify-article.mjs <slug>` must print "All checks passed".

## 6. Tell Bing
`node scripts/indexnow-submit.mjs https://optimizer360.ai/blog/<slug> https://optimizer360.ai/blog https://optimizer360.ai/sitemap.xml` (HTTP 200 or 202 is success).

## 7. Record it
Add a line to `logs.md`. For Google, submit the URL in Search Console (a manual step).
