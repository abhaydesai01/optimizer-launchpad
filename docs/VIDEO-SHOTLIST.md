# Film bands · shot list for the pages without video (v12 plan, 10 Nov 2026)

## Rules for every clip
- **Match the library**: photoreal, warm natural light, Indian professionals and families, shallow depth of field, slow camera, 16:9, about 5 s, no sound (the site plays them muted).
- **No legible screens**: phones and laptops glow but show no readable text or logos (AI video garbles UI text, and it keeps us clear of trademarks).
- **Nobody looks at camera**, no brand names, no real buildings that identify a client.
- **Pipeline per clip**: 2 anchor stills (GPT Image 2.6, ~0.25 credits each) → pick one → Kling image-to-video, sound off (~16.25 credits) → QC contact sheet → caption → wired into `tools/build/visuals.py`.

## Shot list

| # | Page(s) | Caption on the band | Scene (anchor still → motion) |
|---|---|---|---|
| 1 | /blog/ | Search is changing shape. Here is what holds. | A marketing head in her 40s at a wooden desk at dusk, Mumbai window light, laptop glow on her face, notebook and chai beside her. **Motion:** slow push-in as she leans back and thinks. |
| 2 | /blog/geo-vs-seo-vs-aeo/ | Ten links became one answer. | A young founder in a co-working space scrolling a long list on his phone, then stopping, the screen glow brightening to soft green. **Motion:** shallow rack focus from phone to his face. |
| 3 | /blog/how-ai-engines-choose-brands-to-cite/ | AI listens to what others say about you. | Friends at a roadside chai stall in the evening, one showing another a phone, others leaning in, warm string lights. **Motion:** slow dolly left past the group. |
| 4 | /blog/what-an-ai-visibility-audit-includes/ | Measure the answer, not the hope. | A small team in a glass meeting room, a wall screen with an abstract rising green line (no numbers), a woman pointing, a man nodding. **Motion:** slow push-in through the glass. |
| 5 | /results/investor-relations-narrative/ + /blog/when-ai-gets-your-brand-wrong/ | Investors ask AI before they read your filing. | An analyst at a desk at night, city skyline lights behind, reading on a phone and a printed annual report, calm and focused. **Motion:** slow arc around the desk. |
| 6 | /contact/ | Your key. Your door. | **Reuse** the existing door clip (assets/video/zone1-door.mp4). No credits. |

**Deliberately no video:** Glossary, FAQ, Privacy, Terms. These are utility pages, and a film band would slow people down. Their live scenes (term cloud, answer card, data flow) are enough.

## Cost

| Item | Count | Credits |
|---|---|---|
| Anchor stills (2 per clip) | 10 | ~2.5 |
| Kling clips (5 s, sound off) | 5 | ~81 |
| Retry buffer (2 regenerations) | 2 | ~33 |
| **Total, worst case** | | **~117 of 337 available** |

Every clip can be regenerated on its own if one fails QC.

## Result (10 Nov 2026)
Generated and live: `assets/video/v12-desk.mp4` (/blog/), `v12-founder.mp4` (/blog/geo-vs-seo-vs-aeo/), `v12-chai.mp4` (/blog/how-ai-engines-choose-brands-to-cite/), `v12-team.mp4` (/blog/what-an-ai-visibility-audit-includes/), `v12-analyst.mp4` (IR case + IR article), plus the existing door clip on /contact/. Each has a `.webp` poster.
Kling 4.0 was rate-limited at the provider, so the clips were made with Kling 3.0 pro (sound off). Actual spend: 127 credits (337 → 210), above the ~117 estimate because Kling 3.0 pro costs about 25 credits per 5 s clip. No retries were needed.
