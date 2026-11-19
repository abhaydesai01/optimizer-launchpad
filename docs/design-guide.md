# Optimizer360 website design guide

How to design or change the Optimizer360 site using three skills together:

| Skill | Job | Where it lives |
|---|---|---|
| **Taste Skill** (`design-taste-frontend`) | Builds the page: kind of site, layout, copy rules, photo and icon rules, the finish gate | `~\.agents\skills\design-taste-frontend` |
| **Impeccable** (`impeccable`) | Reviews and refines: critique, audit, polish, distill, animate, and a design hook that runs after edits | `~\.claude\skills\impeccable` |
| **Emil Kowalski's design engineering** (`emil-design-eng`) | Motion and micro-detail rules: when to animate, easing, durations, press states | `~\.agents\skills\emil-design-eng` |

Use the three in order: **Taste** decides what the page is, **Impeccable** checks it looks and behaves right, **Emil** governs how it moves.

---

## 1. Brand locks (never change without a decision)

These come from the existing site and from the company. Every skill must keep them.

- **Colours:** mint `#3ce8b4` (brand accent). Dark theme ink `#0b0d12`, `#10131a`, `#141821`, cream text `#ece8df`. Light theme paper `#f4f1ea`, ink text `#11141a`. Mint is an accent and a highlighter, not a background wash.
- **Type:** Newsreader (headlines), Schibsted Grotesk (body), IBM Plex Mono (small labels). Do not add a fourth face.
- **Name and claims:** Optimizer360.ai, GEO firm, Mumbai. Every number on the site must be real or labelled as an illustration. No invented reviews, client names or statistics.
- **Engines:** ChatGPT, Perplexity, Google AI Overviews, Gemini, Claude and Grok. Keep the count consistent across the page (the FAQ still says five; decide six or five first).
- **Primary action:** Book a demo (Cal.com). Secondary: Request an audit.
- **Logos:** the engine logos in `public/engines/` are used as provided. Do not redraw them.

## 2. Classify the site first (Taste Skill, section 1)

Taste Skill sorts every brief into a *kind*, and the kind decides what is allowed.

| Our site | Taste "kind" | What that allows |
|---|---|---|
| The marketing site (a GEO agency that sells a service) | **service** | Photographs of people, the team and the office lead. Flat colour and type. **No shader effects, no scenes, no looping decoration.** One dealt motion moment per page |
| The engine and tech sections (AI visibility) | could be **software/tech** for those sections only | A shader or lit ground is allowed only in one section, and only if the brand needs it |

**Decision needed before building:** the site is a service, so the glowing beam hero and the orbit's glow are against Taste's rules for this kind. Either accept that the site is a software-style page (and say so in the plan), or remove the decorative effects. Recommended: remove them, keep the orbit and the chat demo, because those show the product.

## 3. Building from scratch (new page or new site)

1. **Brief first.** Write four lines: the kind, what is sold, who buys it, and the one main action (Book a demo). Include the real material: team photos, client logos, screenshots, prices, office address.
2. **Taste plan.** Run Taste's `start.mjs` and `layout` deals as its guide describes, then write the copy before any layout. Copy rules: the h1 names the category and the buyer. One hard fact on the first screen. Buttons are a verb and an object.
3. **Build in sections.** One idea per section, each one or two screens tall. Equal left and right edges. No section heading peeking into the next screen.
4. **Motion layer.** Follow Emil's rules (section 6 below) for every hover, press and entrance.
5. **Gate and look.** Run Taste's finish gate (`gate.mjs`) and fix what it lists. Then Impeccable's `/impeccable audit` and `/impeccable critique`.
6. **Report.** List every stand-in photo and every assumed fact so the client can replace them.

## 4. Modifying the existing site (refinement)

Impeccable's rule for this case: **refinement preserves; redesign replaces.** Keep the current identity, copy, behaviour and everything you were not asked to change.

1. **Say which one you are doing.** Refinement (fix spacing, tighten a section, make it look more professional) or redesign (new look). Write it on the first line of the plan.
2. **Scope it.** List the files and sections in scope. Anything outside is untouched.
3. **Run the critique first.** `/impeccable critique` on the section or page. It scores against heuristics and names what to fix.
4. **Apply one fix type at a time.** Use the matching Impeccable command:
   - Typography and rhythm: `typeset`, `layout`
   - Too busy: `quieter` or `distill`
   - Too flat: `bolder` or `colorize`
   - Motion: `animate` (governed by Emil's rules)
   - Final pass: `polish`
5. **Check before and after.** Look at the page at 1920, 1440 and 390 wide. Compare with the previous version.
6. **Ask before changing copy.** Factual copy and claims are not changed without asking.

## 5. Known conflicts to resolve

These are real conflicts between the current site and the skills. Decide each one; do not let the skills decide silently.

| Current site | Rule that conflicts | Options |
|---|---|---|
| Scroll-pinned sections (How it works, Engines, Metrics) | Taste: nothing moves because the page scrolled, except one dealt moment. No scroll-jacking | Keep as a deliberate exception and say so, or convert to click-driven tabs (Taste allows tabs only without timers) |
| Beams background, orbit glow, shimmer | Taste: effects only on tech pages | Remove, or keep only in one section |
| Chat demo loops automatically | Taste allows one dealt moment per page, two on a long page | Fine if it is the page's one moment; avoid adding more |
| Stock-style stand-ins for the team and office | Taste: never show stock as the client's people or place | Replace with real photos before launch |
| Engine count five vs six | Copy must be consistent | Decide, then update the FAQ, metrics and footer together |

## 6. Motion rules (Emil Kowalski)

Apply to every animation, from either skill.

- **Animate only if it adds meaning.** Frequent actions (menu open, tab switch used often) do not animate. Rare or first-time moments can.
- **Entering and exiting elements use `ease-out`.** Moving or morphing on screen uses `ease-in-out`. Hover and colour changes use `ease`. Never `ease-in` for UI.
- **Use strong curves:** `cubic-bezier(0.23, 1, 0.32, 1)` for ease-out, `cubic-bezier(0.77, 0, 0.175, 1)` for ease-in-out.
- **Durations:** button press 100–160ms; hover and tooltips 125–200ms; menus and dropdowns 150–250ms; modals 200–500ms. Keep UI under 300ms.
- **Press feedback:** buttons scale to 0.97 on `:active`.
- **Specific properties:** animate `transform` and `opacity`, never `transition: all`.
- **Springs for decoration and drag:** use `{ type: "spring", duration: 0.5, bounce: 0.2 }`, bounce between 0.1 and 0.3.
- **Reduced motion:** everything rests and no content stays hidden. Both skills and our code already do this; keep it.

## 7. Checks before anything ships

Run these in order. Fix what each one lists before running the next.

1. **Copy:** `node <taste>/scripts/copy-lint.mjs <page>` (no browser; under a second).
2. **Gate:** `node <taste>/scripts/gate.mjs <page>` until the last line says `GATE: PASS`.
3. **Impeccable:** `/impeccable audit`, then `/impeccable critique` on each changed section.
4. **Motion:** check every hover, press and entrance against section 6.
5. **Widths:** look at 1920, 1440, 1024 and 390. Pinned sections must fit on one screen at 1920×1000, 1440×800, 1366×700 and 1280×650.
6. **Live link:** deploy a preview and open it on a phone.

## 8. Never

- Stock photos or invented people, clients or numbers presented as real.
- A drawn copy of a real logo.
- Violet or lavender in the site's own design.
- Parallax on text, cards that fade in on scroll, or random blinking.
- Copying another site's code, copy or signature effect.
- Editing the skills' own files to make a check pass. Report the check instead.
- Committing the `.codex/`, `.gemini/` or `.taste-skill/` folders without checking them first.

## 9. Who runs what

- **Opus** for design judgment, critique, animation and the conflicts in section 5.
- **Sonnet** for routine edits, copy changes and deploys.
- **Haiku** for quick lookups only.

## 10. Quick reference

| I want to | Use |
|---|---|
| Build a new page | Taste Skill (section 3 above) |
| Find problems in a page | `/impeccable critique`, then `/impeccable audit` |
| Make it look more professional | `/impeccable polish`, plus `typeset` and `layout` |
| Remove clutter | `/impeccable distill` or `quieter` |
| Fix or design motion | `/impeccable animate`, checked against Emil's rules |
| Check copy | `copy-lint.mjs` |
| Ship | Section 7, then `npx --yes vercel@latest deploy --prod --yes` |
