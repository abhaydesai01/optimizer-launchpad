# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary audience below. Agencies were named as a co-primary audience at init, but Optimizer360.ai does not offer a white-label agency platform (confirmed by the user, 11 Nov 2026), so no page may promise one.

- **Enterprise decision-makers at trust-led brands:** CMOs, heads of brand or digital, and founders in healthcare, finance, real estate, education, jewellery and hospitality. They are skeptical of agency hype, allergic to fabricated numbers, and buy on credibility. Their job is to find out how AI engines describe their brand and to get named accurately when buyers ask who to trust.
- **Agencies:** still a possible audience, but what Optimizer360.ai offers them is undecided. There is no white-label platform.

Internal users: the Optimizer360 team runs the content pipeline in `/admin` (targets, brief, draft, review, schema, publish).

## Product Purpose

Optimizer360.ai is a specialist Generative Engine Optimisation firm based in Mumbai. Buyers increasingly ask AI engines who to trust, and each answer names only a few brands. Not being named means never entering the consideration set, and it never shows in analytics. Optimizer360.ai tracks how engines describe a brand, finds the questions where it is missing or misrepresented, and closes those gaps with content and technical work.

Success for the marketing site is audit requests and booked calls. The two are co-primary conversions.

## Positioning

Radical honesty is the differentiator: no fabricated data, no guaranteed citations (the engines decide; Optimizer360.ai does the work that earns them), and every finding independently verifiable by the prospect in the engines themselves. The baseline audit is both the first step of an engagement and the proof of the claim.

Category language, as shipped: "AI GEO" leads, with "Generative Engine Optimisation" as the formal term and "Answer Engine Optimisation (AEO)" for search coverage. `docs/MARKETING_PRD.md` still says "AI SEO" leads; the live site superseded it.

## Operating Context

- Engines covered: ChatGPT, Perplexity, Google AI Overviews, Gemini and Claude, with weekly tracking across all five.
- Engagement flow: baseline audit, diagnosis, gap-targeted content and entity structuring, then weekly citation tracking. Clients approve all content before it is published. Most engagements are scoped in quarters.
- Assigned team per engagement: a GEO strategist, a content writer and a technical developer. It works alongside a client's existing SEO team rather than replacing it.
- Surfaces in this repo: the public marketing site and blog at `optimizer360.ai`, plus the `/admin` content pipeline. The client dashboard is a separate app at `geo.optimizer360.ai`.
- The site is itself a GEO artifact: copy is server-rendered, JSON-LD is extensive, AI crawlers are explicitly allowed, and `/llms.txt`, `/llms-full.txt` and `/ai.txt` are published.

## Capabilities and Constraints

- Stack: Next.js 14 App Router, React 18, TypeScript, MongoDB/Mongoose, NextAuth for admin, Anthropic for pipeline generation, Resend for email. Public forms use reCAPTCHA and rate limiting. The Vite `index.html` and `src/` tree is a dead leftover.
- No white-label agency platform exists. `/agency` still describes one and needs the user's decision before it stays live.
- Platform screens exist in `public/platform/` (Prompt Intelligence, Command Center, AI Visibility, Citation Intelligence, Competitor Arena, Recommendations). They show demo workspaces named after real companies and must carry the "Demo data" label wherever they appear.
- No published pricing anywhere. Every engagement is scoped and quoted individually, and the audit comes before the quote. `/pricing` exists only to explain this.
- The founding-client offer is no longer open and must not be used in new work.
- Crawlability is a product requirement: content that matters must exist in server-rendered HTML, not only inside client-side animation.

## Brand Commitments

- Name is always "Optimizer360.ai"; the `.ai` is part of the wordmark. It is not affiliated with Optimize 360 or We360.ai.
- Brand mark: "the answer line", three horizontal lines with the middle one emphasised, representing the single cited line inside an AI answer. The older concentric-rings device is retired.
- Voice: strategy-consultancy calm. No exclamation marks, no "revolutionary".
- Team phrasing is always "an assigned GEO strategist, content writer and technical developer", never "dedicated".
- Never promise or imply guaranteed citations.
- British spelling for the discipline: "Optimisation".

## Evidence on Hand

- Real: the baseline audit method, reproducible by a prospect in any engine; published articles in `lib/pillar-articles.ts` and `lib/featured-articles.ts`; the FAQ in `lib/marketing-faq.ts`; founder name and registered address in `lib/site.ts`.
- Absent, and must not be fabricated: named clients, client logos, case studies, testimonials, awards, benchmark statistics, results timelines and prices. Public case studies will only appear with named client permission.
- Any demo figure or brand name must be labelled as illustrative where it appears, as the hero demo is ("Illustration · brand names are fictional").

## Product Principles

1. If it cannot be verified, it does not get said. This binds design as much as copy: a chart implies data.
2. The audit is the proof. Requesting an audit and booking a call are the two primary next steps.
3. Serve the skeptical buyer. Credibility is earned by specificity and restraint, not by volume of claims.
4. Write for the enterprise buyer first; never promise agencies a product that does not exist.
5. Practise the discipline on ourselves: every public page should be readable, trustworthy and citable by the engines it describes.

## Accessibility & Inclusion

WCAG AA contrast, semantic landmarks, labelled forms, visible focus states, aria-labels on meaningful graphics, and all motion gated by `prefers-reduced-motion`.
