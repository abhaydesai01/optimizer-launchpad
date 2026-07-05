# Optimizer360.ai — Marketing Website PRD

Owner: CMO · Consumers: Content, Design, Engineering · Status: v2 (approved for build)

---

## 1. Brand

- **Name (always):** Optimizer360.ai — the `.ai` is part of the wordmark, set in mint.
- **Parent:** a Stack Intel company.
- **Category label:** AI SEO — the plain-language name we lead with. Generative Engine Optimisation (GEO) is the formal term, used immediately after first mention for authority. Answer Engine Optimisation (AEO) appears in metadata/FAQ for search coverage.
- **One-liner:** Optimizer360.ai is the AI SEO firm that makes your brand the answer AI gives.
- **Brand mark:** "the answer line" — three horizontal lines, the middle one mint. It represents the single cited line inside an AI answer. The old concentric-rings/orbit device is retired everywhere.

## 2. Audience

Enterprise decision-makers: CMOs, heads of brand/digital, founders of large trust-led brands — hospitals, banks, real-estate groups, education groups, jewellery houses, hospitality. They are skeptical of agency hype, allergic to fabricated numbers, and buy on credibility.

## 3. Positioning & message hierarchy

1. **Hook:** Be the brand AI recommends.
2. **Problem:** Buyers now ask ChatGPT, Perplexity, Google AI Overviews, Gemini and Claude who to trust. The AI answers with a few names. Not being named = never entering the consideration set — and it never shows in analytics.
3. **Solution:** AI SEO (GEO): structure credibility, content and evidence so the engines can read, trust and cite you — across all five engines.
4. **Differentiator:** Radical honesty. No fabricated data, no guaranteed citations (the engines decide; we do the work that earns them), everything independently verifiable, built on our own platform.
5. **Proof mechanism (until real case studies exist):** the baseline audit — verifiable by the prospect in any engine.

### Language rules
- Team phrasing is always "an assigned GEO strategist, content writer and technical developer" — never "dedicated".
- Never promise or imply guaranteed citations.
- No invented statistics, clients, testimonials or awards. Placeholders are marked `[...]`.
- No pricing anywhere. CTA is always the audit → quote per engagement.
- Tone: strategy-consultancy calm. No exclamation marks, no "revolutionary".

## 4. Site architecture

Single marketing page + two routed pages, all server-rendered.

| Route | Job |
| --- | --- |
| `/` | Sell the problem, the discipline, the process, the honesty. One CTA: audit. |
| `/about` | The Stack Intel story, radical honesty expanded, team model, organic-discipline note. |
| `/request-audit` | Convert. Form (name, work email, company, role, website, category, message) wired to the live audit API. |
| `/pricing` | 307 → `/request-audit` (no pricing, always a quote). |

### Homepage section order & copy intent
1. **Hero** — headline "Be the brand AI recommends." + AI SEO kicker + live answer demo (before/after, clearly labelled illustration) + five engine pills.
2. **Prompt marquee** — real buyer-style questions scrolling; visceral, zero claims.
3. **The shift** — Yesterday (ten blue links) vs Today (one synthesised answer).
4. **The invisible cost** — "option #7 is invisible" + three scenario cards + "none of this shows in your analytics".
5. **What AI SEO is** — definition; aside: "A familiar name. A different discipline." (cite trust/structure/evidence, not keywords/backlinks).
6. **How it works** — 01 Baseline · 02 Diagnose · 03 Build · 04 Prove.
7. **What you get** — 6 deliverables incl. assigned team, live dashboard, real baseline.
8. **Radical honesty** — 4 principles, visually distinct.
9. **Who it's for** — six trust-led categories + three self-recognition profiles.
10. **FAQ** — crawlable `<details>`, mirrors FAQPage JSON-LD.
11. **Final CTA** — "Let's see how AI answers about you today." + reassurance strip.

## 5. Design system (UI/UX)

- **Palette:** ink navy base (`#060a14 / #0a1020 / #0d1526`), electric mint accent (`#3ce8b4`), warm amber secondary (`#e3b269`), paper text tones. High contrast, generous negative space.
- **Type:** Fraunces (serif) for display, Inter for body/UI. Self-hosted via `next/font`.
- **Motif:** the answer line (three bars, middle mint). Backgrounds use a faint grid + radial mint glows + thin gradient beams — no rings, no blobs, no purple SaaS gradient.
- **Motion:** IntersectionObserver reveals, hero demo state machine, marquee, cursor-tracked card glow, CTA pulse. All gated by `prefers-reduced-motion`.
- **Accessibility:** semantic landmarks, labelled forms, focus-visible states, aria-labels on meaningful graphics, WCAG-AA contrast.

## 6. Conversion

- Single conversion goal: audit request. Header button, hero primary, final CTA band, footer link.
- Form promise: "confidential, no-obligation, every finding yours to verify."
- Submissions hit the production audit API (rate-limited, reCAPTCHA, email + CRM log). Confirmation state inline.

## 7. SEO / AEO / GEO plan

- **Metadata:** title pattern "Optimizer360.ai — AI SEO & GEO for Enterprise Brands"; descriptions carry AI SEO, GEO, AEO and all five engine names. Canonicals + OG/Twitter cards on every route.
- **JSON-LD:** Organization (parent: Stack Intel), WebSite, Service (AI SEO/GEO), FAQPage sitewide; AboutPage and ContactPage on routed pages.
- **robots.txt:** explicitly allow GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, Bingbot, Applebot-Extended, CCBot, cohere-ai, meta-externalagent; block `/admin`, `/api`.
- **Crawlability:** all copy server-rendered; FAQ in native `<details>`; sr-only text mirrors the marquee; sitemap includes `/request-audit`.
- **Content roadmap (post-launch):** blog answers to category questions, use-case pages per vertical, founder note on About.

## 8. Measurement

- Primary KPI: audit requests / week. Secondary: scroll depth to Radical Honesty, FAQ engagement, audit-form completion rate.
- Brand KPI (manual until dashboard is public): presence of optimizer360.ai in engine answers for "AI SEO firm" and vertical queries.

## 9. Launch checklist

- [ ] Replace `[Add founder note here]` on About with a real note.
- [ ] New OG image matching the dark editorial look.
- [ ] Point hello@optimizer360.ai at a monitored inbox.
- [ ] Verify reCAPTCHA + Resend env vars in production.
