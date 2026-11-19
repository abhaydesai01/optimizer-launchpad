# Optimizer360 · website architecture (v11, 10 Nov 2026)

## 1. Navigation: six tabs, one button

The home page tells the story; the inner pages answer one question each. The nav is organised by what a visitor is trying to do, not by our org chart.

| Tab | Opens | Why it is a tab |
|---|---|---|
| **Solutions** ▾ | The six things you should own (GEO, Reputation, Feeder network, Content & community, AI agents, Leads & pipeline) + GEO by audience (Brand & product, Investor relations) | Buyers come to solve one problem. Each solution gets its own page and its own keywords. |
| **Industries** ▾ | 9 industry pages | "GEO for real estate" is how people search, and AI engines answer per category. |
| **Platform** | /platform/ | Proof we are AI-native: the tool, the five views, the 8-factor scorecard. |
| **Results** | /results/ + 2 case studies | Proof without client names. |
| **Resources** ▾ | Blog, What is GEO (pillar guide), Glossary, FAQ | Where the search and AI-answer traffic lands. |
| **Company** ▾ | About, Careers, Contact | Trust and hiring. |
| Button: **Get your AI audit** | /contact/ (home: #audit) | One conversion, everywhere. |

White/Dark toggle stays in the nav on wide screens. On phones a full-screen menu with the same groups replaces the tabs. The key (bottom right) opens the contact card on every page.

## 2. Site map

```
/                                   Home: the film and the story (existing)
/solutions/                         Hub: six things you should own
  /solutions/geo/                   PILLAR money page: GEO agency (brand & product)
  /solutions/geo-investor-relations/
  /solutions/reputation/
  /solutions/feeder-network/
  /solutions/content-community/
  /solutions/ai-agents/
  /solutions/leads-pipeline/
/platform/                          Optimizer GEO platform
/industries/                        Hub
  /industries/real-estate/ … /industries/cinema-entertainment/   (9)
/results/                           Hub: how we measure + case studies
  /results/real-estate-ai-visibility/        32% → 58% in under 2.5 months
  /results/investor-relations-narrative/
/blog/                              Hub
  /blog/what-is-generative-engine-optimisation/   PILLAR guide
  /blog/geo-vs-seo/
  /blog/how-ai-engines-choose-sources/
  /blog/reddit-wikipedia-ai-visibility/
  /blog/measure-ai-visibility/
  /blog/ai-answers-investor-relations/
/glossary/                          28 GEO terms (DefinedTermSet)
/faq/                               FAQPage
/about/  /careers/  /contact/
/privacy/  /terms/
/404.html
/sitemap.xml  /robots.txt  /llms.txt  /llms-full.txt
```

Topic clusters (internal links run both ways):
- **GEO cluster**: /solutions/geo/ ⇄ pillar guide ⇄ GEO vs SEO ⇄ how AI chooses sources ⇄ measure AI visibility ⇄ glossary ⇄ platform ⇄ real-estate case.
- **IR cluster**: /solutions/geo-investor-relations/ ⇄ /industries/financial-services/ ⇄ IR blog post ⇄ IR case.
- **Reputation/community cluster**: reputation ⇄ content & community ⇄ Reddit & Wikipedia post ⇄ feeder network.

## 3. SEO and GEO, built in on every page (by tools/build/build.py)

| What | How |
|---|---|
| Title + meta description | Per page, keyword first, ≤ 55 + " \| Optimizer360"; descriptions 140–160 chars |
| Canonical, robots, Open Graph, Twitter | Every page |
| Breadcrumbs | Visible + BreadcrumbList schema |
| JSON-LD | Organization + WebSite on all pages; Service (solutions, industries); BlogPosting/Article (blog, cases, with dates); FAQPage (every page with questions); DefinedTermSet (glossary); Person (founders on About); CollectionPage/AboutPage/ContactPage |
| "The short answer" | A 40–70 word answer under every H1, written to be quoted verbatim by AI engines (also stored as the page's `abstract`) |
| Question-style H2s + FAQs | Match how people prompt ChatGPT and Gemini |
| Sourced statistics | Every third-party number carries its source and year (FACTS.md) |
| Internal linking | Auto: hub pages list their children; every page ends with "Keep reading"; nav + footer link every money page |
| sitemap.xml | Generated, all pages with lastmod |
| robots.txt | Allows every AI crawler (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Applebot-Extended, CCBot) |
| llms.txt / llms-full.txt | Generated map of the site for AI agents; full version includes every short answer and the FAQ |
| Speed | Static HTML, no tracking scripts, fonts preloaded, inner pages load no 3D except the small key |
| Keyword map | docs/keyword-map.md (generated) |

## 4. How to add or change a page

1. Edit or add an object in `tools/build/content/*.json` (schema in `tools/build/CONTENT-SPEC.md`; facts only from `tools/build/FACTS.md`).
2. Run `python3 tools/build/build.py`.
3. New nav items go in the lists at the top of build.py (they update every page, the home page and the footer).

## 5. Still to do before launch (needs you)

- **Careers**: no roles are listed on purpose. Add real roles (title, location, type) and we will add JobPosting schema per role.
- **Legal**: privacy and terms are plain drafts written for the site as built (no cookies, no analytics, forms open the visitor's email app). Have a lawyer review; update the privacy page first if analytics or a form backend is added.
- **Forms**: contact and audit forms open the visitor's email app. For lead capture, connect a form backend or CRM.
- **Analytics**: none installed. If added (GA4, Plausible), update the privacy notice and add consent if needed.
- **Search Console + Bing Webmaster Tools**: verify optimizer360.ai and submit sitemap.xml (Bing feeds ChatGPT search and Copilot).
- **Entity footprint for Optimizer360 itself** (this is what makes AI name us): Wikidata item for the company and founders, LinkedIn company page, Crunchbase, Google Business Profile, consistent name/description everywhere, founders' bylines on the blog, sameAs links added to the Organization schema once these exist.
- **Social image**: a 1200×630 og:image (currently the square avatar).
- **Blog cadence**: 2 articles a month in the clusters above; refresh statistics every quarter (citation shares move fast).
- **Deploy only the public files**: index.html, the page folders, 404.html, css/, js/, assets/, favicon.ico, robots.txt, sitemap.xml, llms.txt, llms-full.txt. Do NOT upload README.md, CASE-STUDY.md, DIRECTOR-NOTES.md, docs/, tools/ or preview/ (internal notes; robots.txt blocking is not protection).
- **Carry-over**: Futura licence, third-party screenshot trademark check, ⚠️ playbook lines in CASE-STUDY.md.

## 6. Creative direction (v12): every page is directed, not dumped

Each inner page follows one flow: **live scene → short answer → film moment → content in motion → questions → next step.**

- **Hero scene** (js/viz.js, chosen per page in tools/build/visuals.py): the page's idea shown working, labelled as an illustration with fictional brands.
  - AI-answer simulator: GEO, industries, What-is-GEO, blog hub, FAQ.
  - Review stream: Reputation.
  - Feeder network with live traffic: Feeder network.
  - Community thread that gets cited: Content & community.
  - WhatsApp agent booking a visit at 11:47 pm: AI agents.
  - Deal traced back to the AI answer: Leads & pipeline.
  - Before/after investor answer: IR solution, Financial services, IR case, IR article.
  - Visibility gauge with a week scrubber: Results, real-estate case, Measure-AI-visibility.
  - Readiness radar: Platform.
  - Six-part ring: Solutions, About, Careers.
  - Ten links vs one answer: GEO vs SEO.
  - Source orbit: How AI chooses sources.
  - Reddit + Wikipedia talk page: Reddit & Wikipedia article.
  - Drifting term cloud: Glossary.
  - 3D key: Contact.
  - Data flow: Privacy and Terms.
- **Film band**: a muted cinematic clip from the existing library, with a one-line caption written for that page; plays only while on screen.
- **Motion**: headlines rise word by word; lists enter in sequence; numbers count up; the step line draws; a soft light follows the pointer across grids; articles get a reading-progress bar and a sticky "In this guide" bar; Glossary and FAQ get live search.
- To change a page's scene or clip, edit `DIRECTION` in tools/build/visuals.py and rebuild.

## 7. Hosting (Netlify)

- Live: https://optimizer360-website.netlify.app (Netlify project `optimizer360-website`, team abhaydesai01). Separate from the existing `optimizer360-crm` project.
- Deploy only the packaged folder (`../optimizer360-deploy`, made by `tools/build/package.py`): it holds the public site only and adds `_headers` (security headers, long cache for /assets).
- Redeploy after any change:
  1. `python3 tools/build/build.py`
  2. `python3 tools/build/package.py`
  3. from `../optimizer360-deploy`: `netlify deploy --dir . --prod --site eeeca298-ea28-4252-b5b5-c2c550c95c61`
- To go live on optimizer360.ai: add the domain in Netlify → Domain management, then point DNS. Canonical tags, sitemap and llms.txt already use https://optimizer360.ai.
