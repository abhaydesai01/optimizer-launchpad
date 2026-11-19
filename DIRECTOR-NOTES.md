# Optimizer360 · director's notes and persona audit (v8, 10 Nov 2026)

## The film, as it now runs

| Act | Section | What the viewer sees | Why it's there |
|---|---|---|---|
| I · Rented growth | `#top` | The ad budget switches off; traffic falls | The pain, in one picture |
| II · Six things to own | `#own` | Each chapter: real public pages first, then the coded scene | Real world first, then our world |
| III · Rented stops, owned compounds | `#problem` | Paid reach drops to zero; organic keeps climbing | The turn |
| IV · Through the door | `#gate` | Approach the gate → meet the AI agent → step through → hall of six doors, each labelled → door one opens into zone 1 | The whole vision, and why GEO comes first |
| (film ends) | | "Zone 1 continues below" | |
| Zone 1, read at your own pace | `#decide` → `#tool` → `#how` | A buyer's decision, every engine's answer, investors, sources, scale, what GEO is, the three audiences on real pages, **inside the tool**, ways to start | Proof and detail for whoever wants it |

**The one object carried through everything: the key.** With a mouse, the key *is* the cursor: a small 3D key whose head is the Optimizer360 mark (the ring and the green keyhole), tip first like an arrow. On first move it says "This is your key to growth". It turns a quarter, like a key in a lock, on anything clickable, and says "Turn the key" on the main buttons. The corner button is the keyhole: move the key onto it and the key slides in and turns ("Fits here. Talk to us"), and a click opens the contact card. On phones and tablets there is no cursor, so a small turning key sits in the corner instead.

The door is a real-time 3D film rendered in code (three.js): the camera flies from a misty plain to a giant Optimizer360 ring, the agent (a light) appears, the key flies in, slides into the keyhole and turns, the keyhole opens, and the camera passes into a hall of six arched doors and then through door one into a room of floating dashboards. The door world has its own look in each mode: the white marble gate by day in white mode, and the dark stone ring at dusk in dark mode (the logo, standing in a field). Both lead into the same hall of six doors.

## Persona audit

| Persona | What they need to believe | Covered now | Still missing |
|---|---|---|---|
| **Real-estate developer, marketing head** (core market) | AI sends buyers to rivals; you can fix it inside RERA rules; it shows up in enquiries and site visits | Buyer-decision scene, RERA/ASCI bands in the tool, "80–90 prompts in 2–2.5 months" | An anonymised case study (week 1 → week 9, with dates); site-visit numbers, not only prompts |
| **B2B SaaS founder / CMO** | Shortlists are built in AI; you can win the comparisons | B2B tab (real Zoho page + notes), engines scene, tool views | Whether the data can flow into their CRM or BI tool (say so only if it can) |
| **Consumer brand head** | AI shopping is the new shelf; prices and specs get quoted wrong | Consumer tab (real Minimalist page + notes) | Marketplaces (Amazon, Flipkart, Nykaa, quick commerce) named explicitly |
| **Listed company: IR head / CFO** | Answers about results are stale or wrong; the fix stays inside SEBI rules | IR tab (real TCS page), investors scene, SEBI line, drift alerts | One worked example of a drift alert after results; who signs off before publishing |
| **Sceptical marketer comparing with an SEO agency or a tracking tool** | This isn't SEO rebranded, and a tool alone isn't enough | GEO vs SEO, "tool + team", two scoreboards, **no guaranteed rankings** line | A short "why not just a tracking tool" comparison (no competitor names) |
| **Founder / CEO, the decision maker** | It's worth the money and they'll know fast | Film, the door, three ways to start, month-3 decision | Price or engagement range; what the first 30 days look like |

### Gaps that cut across everyone

1. **Pricing or engagement model.** Nothing on the site. Even "pilots from ₹X / quarter" or "priced per brand and engines tracked" would help. Needs your input.
2. **Proof.** Decision: no client names, logos or counts, ever. Two case studies are on the site (`#case`): brand (visibility 32% → 58% in under 2.5 months) and investor relations (the narrative). Results now shows 8 engines and 9 industries. Drafts and lines to confirm: CASE-STUDY.md.
3. **A sample audit.** The real audit reports are the strongest sales asset you have. An anonymised sample ("see what you'll get") would convert better than any copy.
4. **Zones 2–6 contradict each other.** The door and the route say "coming soon", but the FAQ says "We run GEO, reputation, feeder networks, content and community, AI agents and lead generation as one engine." Decide which is true today and make both say the same.
5. **Forms don't send anything yet.** The audit form has a TODO for its endpoint; the key's contact card opens the visitor's email app. Wire both to a CRM before launch.
6. **The site should practise GEO itself.** Industry pages (real estate, fintech, consumer, B2B, listed companies) give AI something to cite about Optimizer360.

## What the tool section now explains (grounded in the real audit reports)

- **Readiness scorecard**: 8 dimensions scored /10 at the Week-1 baseline.
- **Prompt universe**: no invented "prompt volume". Built from SEO data, first-party enquiries, the category map and an engine baseline; ranked on demand × winnability; banded Own / Build / Monitor for compliance.
- **Live answers**: 8 engines, up to 10,000 prompts a day, every answer captured with its date.
- **Sources**: every citation recorded, so PR and content go where engines actually read.
- **Fixes & proof**: every fix dated and re-measured on two scoreboards (AI answers, plus SEO and owned enquiries).
- **What the data gives you**: real demand, who wins instead of you, the sources that decide, early alerts on wrong facts, board-ready proof, compliance (RERA, ASCI, SEBI, DPDP).

All numbers in the tool use the fictional Aurelia Homes and are labelled as illustration. No client names from the audit reports appear on the site.

## Next director moves (need Higgsfield credits)

1. **The key meets the door.** One short clip where the hand turns the key in the keyhole and the gate opens. Then the key the visitor has carried all along is the key that opens the film's door.
2. **New voice-over for Act IV and the tool.** The door currently reuses the old vision and zone-1 lines (vo-15, vo-17, vo-18).
3. **A face for the agent.** The agent in the door frames could greet the visitor by name in the audit flow later.

## Launch caveats

- Real third-party pages (Notion, Wikipedia, Forbes, Figma, Zoho, Minimalist, TCS and others) appear as labelled examples, not clients. They carry trademark and implied-endorsement risk; swap or clear them before launch (`assets/real/`).
- The Futura file is the Iconiq preview copy; license Futura PT before launch.
- three.js r128 loads from cdnjs for the key; if WebGL is unavailable, a flat key icon shows instead.
