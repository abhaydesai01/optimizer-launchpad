# Optimizer360 landing page (v2, cinematic)

Static, SEO/GEO-first landing page. All copy is real HTML; the 3D logo and film add to it but never hold the content back.

## Run locally

```bash
python3 -m http.server 4360 --directory /Users/apple/Downloads/optimizer360-site
```

Then open http://localhost:4360. Opening `index.html` directly from disk won't work, because the 3D module needs a server.

## Structure

| Path | What it is |
|---|---|
| `index.html` | All 11 chapters, schema (Organization, WebSite, Service), meta and OG tags |
| `css/site.css` | Dark cinematic system: near-black, porcelain text, Growth green glow. Type: Clash Display (headlines) + Satoshi (text), both from Fontshare (free for commercial use). |
| `js/ring3d.js` | Three.js logo: the compounding ring in six segments plus the keyhole. Modes: hero, problem (cracks apart), turn (re-forms and unlocks), engine (thickens per outcome), CTA. |
| `js/main.js` | Ring mode from scroll, GSAP layer (split-headline reveals, manifesto word scrub, clip-path image reveals + parallax, loop line draw, counters, magnetic buttons, card spotlight, cursor glow), engine steps, GEO tabs, audit form, corner progress ring |
| `js/film.js` | Canvas film, scrubbed by scroll: 8 chapters. Each plays its Kling clip frames if `assets/film/frames/manifest.json` lists it, otherwise the still with a scripted camera move. Era grades, light effects, dip-to-black between eras. |
| `tools/clip_to_frames.py` | `python3 tools/clip_to_frames.py <clip.mp4> <chapter-name>`: 12 fps WebP frames + manifest update |
| `assets/film/` | Higgsfield keyframe stills (WebP); originals in `raw/` |
| `assets/logo/` | Logo files from `optimizer360-brand/logo` |
| `robots.txt`, `sitemap.xml`, `llms.txt` | Search and AI-crawler files (AI crawlers are explicitly allowed) |

## Deploy (Netlify)

- Live: https://optimizer360-website.netlify.app (custom domain optimizer360.ai not connected yet).
- `netlify.toml` tells Netlify to run `python3 tools/build/package.py --out dist` and publish `dist/`, so the site can be deployed straight from this GitHub repo. Only public files are copied; README, CASE-STUDY, DIRECTOR-NOTES, docs/, tools/ and preview/ never ship.
- Manual deploy from this computer: `python3 tools/build/build.py && python3 tools/build/audit.py && python3 tools/build/package.py`, then `netlify deploy --dir ../optimizer360-deploy --prod`.
- Netlify files: `_redirects` (short and common addresses → real pages), `_headers` (written by package.py: security headers, caching, file types), `404.html`, `site.webmanifest` + `assets/logo/icon-*.png` (home-screen icons), `.well-known/security.txt`, `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`.
- When optimizer360.ai is connected: uncomment the last line of `_redirects` so the netlify.app address forwards to the real domain.

## Not connected yet

1. **AI audit form:** front-end only; nothing is sent. Hook up the `TODO` in `js/main.js` to a real intake (CRM, email or API).
2. **Strategy call:** links to `mailto:abhay@optimizer360.ai`. Swap in a calendar link when one exists.
3. **Client logos and testimonial:** the slot is marked in the Results section; add them only with written client approval.
4. **Film:** chapters without a clip fall back to the still with camera motion. To add or replace a clip: download it to `assets/film/clips/<chapter>.mp4` and run `tools/clip_to_frames.py`. Chapter names are in `js/film.js`.
5. **Product pages:** the nav and footer link to sections on this page until `/geo`, `/geo/b2b` and the other pages exist; update the sitemap at the same time.

## Sources for numbers on the page

All checked against the investor deck (Nov 2026):
- 5T+ Google searches a year (Google, Mar 2025)
- 2.5B+ AI Overviews monthly users (Google I/O, May 2026)
- 900M+ weekly ChatGPT users (OpenAI, Feb 2026)
- 1B+ Gemini app monthly users (Google, Aug 2026)
- $1.3T global ad revenue 2026 (WPP Media, Jun 2026)
- Client results: 12 live (9 India, 3 international), 7 with measured results, 80–90 prompts in 2–2.5 months for one real-estate client
