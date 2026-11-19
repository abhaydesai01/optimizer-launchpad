#!/usr/bin/env python3
"""Optimizer360 static page builder.

Reads tools/build/content/*.json (see CONTENT-SPEC.md) and writes one folder per page
(e.g. /solutions/geo/index.html) with the shared nav, footer, meta tags, JSON-LD, the key and the contact card.
Also writes sitemap.xml, llms.txt, llms-full.txt, 404.html and patches the home page's nav and footer.

Run:  python3 tools/build/build.py
"""
import html
import json
import re
from pathlib import Path
import sys
sys.path.insert(0, str(Path(__file__).resolve().parent))
from visuals import DIRECTION, V  # noqa: E402

ROOT = Path(__file__).resolve().parents[2]
CONTENT = Path(__file__).resolve().parent / "content"
SITE = "https://optimizer360.ai"
BRAND = "Optimizer360"
TODAY = "2026-11-10"
EMAIL = "abhay@optimizer360.ai"
ORG = f"{SITE}/#org"
esc = lambda s: html.escape(s or "", quote=True)
strip = lambda s: re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", s or "")).strip()

# ---------------------------------------------------------------- navigation (one source for every page)
SOLUTIONS = [
    ("/solutions/geo/", "GEO · AI answers", "Get named and cited by ChatGPT, Gemini, Perplexity and AI Overviews."),
    ("/solutions/reputation/", "Reputation", "Real reviews and press that buyers, and AI, trust."),
    ("/solutions/feeder-network/", "Feeder network", "Owned channels and earned mentions that send buyers your way."),
    ("/solutions/content-community/", "Content & community", "A room your customers keep alive, and content that gets cited."),
    ("/solutions/ai-agents/", "AI agents", "24/7 agents on web, WhatsApp and Instagram that qualify and book."),
    ("/solutions/leads-pipeline/", "Leads & pipeline", "Every deal traced back to where demand began."),
]
AUDIENCES = [
    ("/solutions/geo/", "Brand & product", "B2B shortlists and consumer AI shopping answers."),
    ("/solutions/geo-investor-relations/", "Investor relations", "What AI tells investors, accurate and current."),
]
INDUSTRIES = [
    ("/industries/real-estate/", "Real estate & hospitality"),
    ("/industries/financial-services/", "Financial services & IR"),
    ("/industries/retail-consumer/", "Retail & consumer brands"),
    ("/industries/food-fmcg/", "Food & FMCG"),
    ("/industries/b2b-services/", "B2B & professional services"),
    ("/industries/technology-saas/", "Technology & SaaS"),
    ("/industries/pharma-healthcare/", "Pharma & healthcare"),
    ("/industries/manufacturing/", "Manufacturing"),
    ("/industries/industrial-engineering/", "Industrial & engineering"),
    ("/industries/cinema-entertainment/", "Cinema & entertainment"),
]
RESOURCES = [
    ("/blog/", "Blog", "AI search, explained for marketing heads and founders."),
    ("/blog/generative-engine-optimization/", "What is GEO?", "The complete guide to generative engine optimisation."),
    ("/glossary/", "GEO glossary", "Visibility score, citation rate, share of voice and more."),
    ("/faq/", "FAQ", "Straight answers about how we work."),
]
COMPANY = [
    ("/about/", "About", "Why we exist and who runs it."),
    ("/results/", "Results", "Measured from week one. Two case studies."),
    ("/careers/", "Careers", "Join the teams that close the gap."),
    ("/contact/", "Contact", "Get your AI audit."),
]

LABELS = {h: t for h, t, *_ in SOLUTIONS + AUDIENCES[1:] + INDUSTRIES + RESOURCES + COMPANY}
LABELS.update({"/solutions/": "Solutions", "/industries/": "Industries", "/platform/": "Platform", "/solutions/geo/": "GEO", "/privacy/": "Privacy", "/terms/": "Terms"})


def menu_links(items, cls="mnav__link"):
    out = []
    for it in items:
        href, t = it[0], it[1]
        d = it[2] if len(it) > 2 else ""
        out.append(f'<a class="{cls}" href="{href}"><b>{esc(t)}</b>' + (f"<span>{esc(d)}</span>" if d else "") + "</a>")
    return "".join(out)


def nav_html(home=False):
    cta = "#audit" if home else "/contact/"
    film = '<button class="nav__film" type="button" data-film="play"><span aria-hidden="true"></span>Watch the film</button>' if home else ""
    logo_href = "#top" if home else "/"
    pre = "" if not home else ""
    return f"""<header class="nav" id="nav">
    <a class="nav__logo" href="{logo_href}" aria-label="Optimizer360 home"><img class="only-night" src="/assets/logo/optimizer360-lockup-light.svg" alt="Optimizer360" width="170" height="31"><img class="only-paper" src="/assets/logo/optimizer360-lockup.svg" alt="Optimizer360" width="170" height="31"></a>
    <nav class="mnav" aria-label="Primary">
      <ul class="mnav__list">
        <li class="mnav__item"><button class="mnav__btn" type="button" aria-expanded="false" aria-controls="mn-sol">Solutions</button>
          <div class="mnav__panel mnav__panel--wide" id="mn-sol">
            <div class="mnav__col"><p class="mnav__h">Six things you should own</p><div class="mnav__grid">{menu_links(SOLUTIONS)}</div></div>
            <div class="mnav__col mnav__col--side"><p class="mnav__h">GEO by audience</p>{menu_links(AUDIENCES)}<a class="mnav__all" href="/solutions/">All solutions <span aria-hidden="true">→</span></a></div>
          </div></li>
        <li class="mnav__item"><button class="mnav__btn" type="button" aria-expanded="false" aria-controls="mn-ind">Industries</button>
          <div class="mnav__panel" id="mn-ind">
            <div class="mnav__col"><p class="mnav__h">GEO and organic growth for</p><div class="mnav__grid mnav__grid--3">{menu_links(INDUSTRIES, "mnav__link mnav__link--s")}</div><a class="mnav__all" href="/industries/">All industries <span aria-hidden="true">→</span></a></div>
          </div></li>
        <li class="mnav__item"><a class="mnav__a" href="/platform/">Platform</a></li>
        <li class="mnav__item"><a class="mnav__a" href="/results/">Results</a></li>
        <li class="mnav__item"><button class="mnav__btn" type="button" aria-expanded="false" aria-controls="mn-res">Resources</button>
          <div class="mnav__panel mnav__panel--sm" id="mn-res"><div class="mnav__col">{menu_links(RESOURCES)}</div></div></li>
        <li class="mnav__item"><button class="mnav__btn" type="button" aria-expanded="false" aria-controls="mn-co">Company</button>
          <div class="mnav__panel mnav__panel--sm" id="mn-co"><div class="mnav__col">{menu_links(COMPANY)}</div></div></li>
      </ul>
    </nav>
    <div class="tgl" role="group" aria-label="Colour mode"><button type="button" data-t="paper" aria-pressed="true">White</button><button type="button" data-t="night" aria-pressed="false">Dark</button></div>
    {film}
    <a class="btn btn--green nav__cta" href="{cta}">Get your AI audit</a>
    <button class="nav__burger" type="button" aria-expanded="false" aria-controls="mmenu" aria-label="Open menu"><i></i><i></i></button>
  </header>
  <div class="mmenu" id="mmenu" hidden>
    <div class="mmenu__in">
      <details open><summary>Solutions</summary>{menu_links(SOLUTIONS + AUDIENCES[1:], "mmenu__a")}<a class="mmenu__a" href="/solutions/"><b>All solutions</b></a></details>
      <details><summary>Industries</summary>{menu_links(INDUSTRIES, "mmenu__a")}</details>
      <a class="mmenu__top" href="/platform/">Platform</a>
      <a class="mmenu__top" href="/results/">Results</a>
      <details><summary>Resources</summary>{menu_links(RESOURCES, "mmenu__a")}</details>
      <details><summary>Company</summary>{menu_links(COMPANY, "mmenu__a")}</details>
      <a class="btn btn--green mmenu__cta" href="{cta}">Get your AI audit <span class="arr" aria-hidden="true">→</span></a>
    </div>
  </div>
  <div class="dock" id="dock" aria-label="Quick actions"><button class="dock__menu" type="button" aria-controls="mmenu" aria-expanded="false"><i></i><i></i><span>Menu</span></button><a class="dock__cta" href="{cta}">Get your AI audit <span aria-hidden="true">→</span></a></div>"""


def foot_html():
    col = lambda items: "".join(f'<li><a href="{h}">{esc(t)}</a></li>' for h, t, *_ in items)
    return f"""<footer class="foot">
    <div class="wrap">
      <div class="foot__grid foot__grid--v11">
        <div class="foot__brand"><img class="only-night" src="/assets/logo/optimizer360-lockup-light.svg" alt="Optimizer360" width="210" height="38"><img class="only-paper" src="/assets/logo/optimizer360-lockup.svg" alt="Optimizer360" width="210" height="38"><p>The AI-native organic marketing company. We make your brand found, trusted, followed, talked about and chosen.</p><p class="foot__mail"><a href="mailto:{EMAIL}">{EMAIL}</a><br>India · US · Mauritius</p></div>
        <nav aria-label="Solutions"><h3>Solutions</h3><ul>{col(SOLUTIONS)}<li><a href="/solutions/geo-investor-relations/">GEO for investor relations</a></li><li><a href="/platform/">Platform</a></li></ul></nav>
        <nav aria-label="Industries"><h3>Industries</h3><ul>{col(INDUSTRIES)}</ul></nav>
        <nav aria-label="Resources"><h3>Resources</h3><ul>{col(RESOURCES)}<li><a href="/results/">Case studies</a></li><li><a href="/llms.txt">llms.txt</a></li></ul></nav>
        <nav aria-label="Company"><h3>Company</h3><ul>{col(COMPANY[:1] + COMPANY[2:])}<li><a href="/privacy/">Privacy</a></li><li><a href="/terms/">Terms</a></li></ul></nav>
      </div>
      <p class="foot__legal"><span>© 2026 Optimizer360. All rights reserved.</span><span>We never name clients. Every figure on this site is measured or sourced.</span></p>
    </div>
  </footer>"""


KEY = f"""<button class="key" id="key" type="button" aria-haspopup="dialog" aria-controls="keysheet" aria-expanded="false" aria-label="Talk to us: your key to growth">
    <span class="key__lock" aria-hidden="true"><img class="only-paper" src="/assets/logo/optimizer360-mark.svg" alt="" width="34" height="34"><img class="only-night" src="/assets/logo/optimizer360-mark-light.svg" alt="" width="34" height="34"></span>
    <span class="key__3d" aria-hidden="true"><svg class="key__flat" viewBox="0 0 64 64"><circle cx="32" cy="18" r="13" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="32" cy="16" r="3.4" fill="var(--green)"/><path d="M30 19h4l1.5 7h-7z" fill="var(--green)"/><path d="M30 31h4v26h-4z M34 46h7v4h-7z M34 52h5v4h-5z" fill="currentColor"/></svg></span>
    <span class="key__tip">Your key to growth. <b>Talk to us</b></span>
  </button>
  <div class="keysheet" id="keysheet" role="dialog" aria-modal="true" aria-labelledby="keysheet-title" hidden>
    <div class="keysheet__card">
      <button class="keysheet__x" type="button" aria-label="Close">×</button>
      <p class="eyebrow">Your key</p>
      <h2 class="keysheet__h" id="keysheet-title">Let's open <span class="g">your door.</span></h2>
      <p class="keysheet__lede">Tell us your brand. We'll show you what AI says about it today, and which zone to open first.</p>
      <form class="keysheet__form" novalidate>
        <label><span>Your name</span><input name="name" type="text" autocomplete="name"></label>
        <label><span>Brand or website</span><input name="brand" type="text" autocomplete="organization" required></label>
        <label class="wide"><span>What do you want to own first?</span><select name="zone">
          <option>GEO: get named in AI answers</option><option>Reputation</option><option>Feeder network</option><option>Content &amp; community</option><option>AI chat agents</option><option>Leads &amp; sales</option><option>Not sure yet</option>
        </select></label>
        <label class="wide"><span>Anything else? (optional)</span><textarea name="note" rows="2"></textarea></label>
        <p class="keysheet__err wide" role="alert" hidden>Add your brand or website first.</p>
        <div class="wide keysheet__go"><button class="btn btn--green" type="submit">Write to us <span class="arr" aria-hidden="true">→</span></button><span>Opens your email app. Nothing is sent from this page.</span></div>
      </form>
      <p class="keysheet__alt"><a href="mailto:{EMAIL}">{EMAIL}</a><a href="/contact/">Or get your free AI audit first</a></p>
    </div>
  </div>"""

CONTACT_FORM = f"""<section class="pg-sec" id="audit"><div class="wrap pg-form-wrap">
    <div><h2 class="pg-h2">Get your <span class="g">AI audit.</span></h2><p class="pg-p">Tell us your brand and what you want to own first. The form opens your own email app with everything filled in; nothing is sent from this page.</p><p class="pg-p"><a class="link" href="mailto:{EMAIL}">{EMAIL}</a></p></div>
    <form class="pg-form" data-mailto="{EMAIL}" novalidate>
      <label><span>Your name</span><input name="Name" type="text" autocomplete="name"></label>
      <label><span>Work email</span><input name="Email" type="email" autocomplete="email"></label>
      <label class="wide"><span>Brand or website</span><input name="Brand" type="text" autocomplete="organization" required></label>
      <label class="wide"><span>What do you want to own first?</span><select name="Interest"><option>GEO: get named in AI answers</option><option>GEO for investor relations</option><option>Reputation</option><option>Feeder network</option><option>Content &amp; community</option><option>AI agents</option><option>Leads &amp; pipeline</option><option>Not sure yet</option></select></label>
      <label class="wide"><span>Anything else? (optional)</span><textarea name="Note" rows="3"></textarea></label>
      <p class="pg-form__err wide" role="alert" hidden>Add your brand or website first.</p>
      <div class="wide pg-form__go"><button class="btn btn--green" type="submit">Request my AI audit <span class="arr" aria-hidden="true">→</span></button><span>Opens your email app.</span></div>
    </form>
  </div></section>"""

CTA = """<section class="pg-cta"><div class="wrap"><div class="pg-cta__in">
    <p class="eyebrow">Own your growth</p>
    <h2 class="pg-h2">See what AI says <span class="g">about you.</span></h2>
    <p class="pg-p">One Week-1 measurement across eight AI engines: who they name, who they name instead of you, and the sources they trust.</p>
    <div class="pg-cta__go"><a class="btn btn--green" href="/contact/">Get your AI audit <span class="arr" aria-hidden="true">→</span></a><a class="link" href="/platform/">See the platform</a></div>
  </div></div></section>"""


# ---------------------------------------------------------------- blocks
def slug(t):
    return re.sub(r"[^a-z0-9]+", "-", strip(t).lower()).strip("-")[:60]


def block(b, center=""):
    t = b.get("type")
    h2 = f'<h2 class="pg-h2" id="{slug(b["h2"])}">{b["h2"]}</h2>' if b.get("h2") else ""
    intro = f'<p class="pg-p pg-intro">{b["intro"]}</p>' if b.get("intro") else ""
    if t == "prose":
        return f'<section class="pg-sec"><div class="wrap pg-split">{"<div>" + h2 + "</div>" if h2 else "<div></div>"}<div class="prose">{b.get("html", "")}</div></div></section>'
    if t == "cols":
        its = b.get("items", [])
        items = "".join(f'<li><h3>{it["t"]}</h3><p>{it["d"]}</p></li>' for it in its)
        return f'<section class="pg-sec"><div class="wrap">{h2}{intro}<ul class="pg-cols pg-cols--{min(len(its), 6)}"{f' data-x="hub" data-c="{esc(center)}"' if 4 <= len(its) <= 8 else ""}>{items}</ul></div></section>'
    if t == "steps":
        its = b.get("items", [])
        items = "".join(f'<li><span>{i + 1:02d}</span><h3>{it["t"]}</h3><p>{it["d"]}</p></li>' for i, it in enumerate(its))
        return f'<section class="pg-sec"><div class="wrap">{h2}{intro}<ol class="pg-steps pg-cols--{min(len(its), 6)}"{' data-x="flow"' if len(its) >= 3 else ""}>{items}</ol></div></section>'
    if t == "stats":
        items = "".join(f'<li><strong class="{"is-long" if len(it["n"]) > 5 else ""}">{esc(it["n"])}</strong><p>{it["d"]}</p>' + (f'<cite>{esc(it["src"])}</cite>' if it.get("src") else "") + "</li>" for it in b.get("items", []))
        return f'<section class="pg-sec pg-sec--stats"><div class="wrap">{h2}<ul class="pg-stats">{items}</ul></div></section>'
    if t == "table":
        head = "".join(f"<th scope=\"col\">{c}</th>" for c in b.get("head", []))
        rows = "".join("<tr>" + "".join((f'<th scope="row">{c}</th>' if i == 0 else f"<td>{c}</td>") for i, c in enumerate(r)) + "</tr>" for r in b.get("rows", []))
        return f'<section class="pg-sec"><div class="wrap">{h2}<div class="pg-table"><table><thead><tr>{head}</tr></thead><tbody>{rows}</tbody></table></div></div></section>'
    if t == "callout":
        return f'<section class="pg-sec pg-sec--tight"><div class="wrap"><div class="pg-callout">{b.get("html", "")}</div></div></section>'
    if t == "terms":
        items = "".join(f'<div class="pg-term" id="{esc(it["id"])}"><dt><a href="#{esc(it["id"])}">{esc(it["t"])}</a></dt><dd>{it["d"]}</dd></div>' for it in b.get("items", []))
        return f'<section class="pg-sec"><div class="wrap">{h2}<dl class="pg-terms">{items}</dl></div></section>'
    return ""


# ---------------------------------------------------------------- page
def is_post(p):
    return p.get("schema") == "Article" and p["path"].startswith("/blog/")


def h1_of(p):
    """Blog posts lead with their keyword title (search intent); other pages keep their brand-voice headline."""
    if not is_post(p):
        return p["h1"]
    t = esc(p["title"])
    if ":" in t:
        a, b = t.split(":", 1)
        return f'{a}: <span class="g">{b.strip()}</span>'
    w = t.split(" ")
    return " ".join(w[:-2]) + ' <span class="g">' + " ".join(w[-2:]) + "</span>"



def nice_date(d):
    return re.sub(r"(\d{4})-(\d{2})-(\d{2})", lambda m: f"{int(m.group(3))} {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][int(m.group(2)) - 1]} {m.group(1)}", d)


def post_card(k, featured=False):
    a = k.get("article", {})
    g, cat = a.get("glyph", "answer"), a.get("category", "Article")
    return (f'<li class="bc{" bc--feat" if featured else ""}"><a href="{k["path"]}">'
            f'<div class="bc__art bc__art--{g}" data-glyph="{g}"></div>'
            f'<div class="bc__body"><p class="bc__meta"><span class="bc__cat">{esc(cat)}</span><span>{a.get("minutes", 5)} min read</span></p>'
            f'<h3>{strip(h1_of(k))}</h3><p class="bc__ex">{esc(k["description"])}</p>'
            f'<p class="bc__foot"><time datetime="{a.get("published", TODAY)}">{nice_date(a.get("published", TODAY))}</time><span>Read the article <i aria-hidden="true">→</i></span></p></div></a></li>')


def crumbs_for(path, pages):
    parts = [p for p in path.strip("/").split("/") if p]
    trail = [("/", "Home")]
    acc = "/"
    for p in parts:
        acc += p + "/"
        pg = pages.get(acc)
        name = LABELS.get(acc) or ((pg.get("crumb") or strip(pg.get("title", "")).split(":")[0]) if pg else p.replace("-", " ").title())
        trail.append((acc, name))
    return trail


def children(path, pages):
    depth = path.count("/")
    return [p for k, p in pages.items() if k.startswith(path) and k != path and k.count("/") == depth + 1]


def schema(p, pages, trail):
    url = SITE + p["path"]
    typ = p.get("schema", "WebPage")
    page_type = typ if typ in ("CollectionPage", "AboutPage", "ContactPage", "FAQPage") else "WebPage"
    g = [
        {"@type": "Organization", "@id": ORG, "name": BRAND, "url": SITE + "/", "logo": SITE + "/assets/logo/optimizer360-mark.svg", "email": EMAIL, "slogan": "Own your growth.", "areaServed": ["IN", "US", "MU"]},
        {"@type": "WebSite", "@id": SITE + "/#site", "url": SITE + "/", "name": BRAND, "publisher": {"@id": ORG}},
        {"@type": "BreadcrumbList", "@id": url + "#crumbs", "itemListElement": [{"@type": "ListItem", "position": i + 1, "name": n, "item": SITE + h} for i, (h, n) in enumerate(trail)]},
    ]
    webpage = {"@type": page_type, "@id": url + "#page", "url": url, "name": p["title"], "description": p["description"], "isPartOf": {"@id": SITE + "/#site"}, "breadcrumb": {"@id": url + "#crumbs"}, "inLanguage": "en", "dateModified": TODAY}
    if p.get("answer"):
        webpage["abstract"] = strip(p["answer"])
    g.append(webpage)
    if typ == "Service":
        g.append({"@type": "Service", "@id": url + "#service", "name": strip(p["h1"]), "serviceType": p["title"], "description": p["description"], "provider": {"@id": ORG}, "areaServed": ["IN", "US", "MU"], "url": url})
        webpage["mainEntity"] = {"@id": url + "#service"}
    if typ == "Article":
        art = p.get("article", {})
        is_blog = p["path"].startswith("/blog/")
        g.append({"@type": "BlogPosting" if is_blog else "Article", "@id": url + "#article", "headline": p["title"], "description": p["description"], "datePublished": art.get("published", TODAY), "dateModified": TODAY, "author": {"@id": ORG}, "publisher": {"@id": ORG}, "mainEntityOfPage": {"@id": url + "#page"}, "image": SITE + "/assets/logo/social-avatar.png", "keywords": ", ".join(p.get("keywords", [])), "inLanguage": "en"})
    if typ == "DefinedTermSet":
        terms = [it for b in p.get("sections", []) if b.get("type") == "terms" for it in b.get("items", [])]
        g.append({"@type": "DefinedTermSet", "@id": url + "#terms", "name": "GEO glossary", "hasDefinedTerm": [{"@type": "DefinedTerm", "@id": url + "#" + it["id"], "name": it["t"], "description": strip(it["d"]), "url": url + "#" + it["id"]} for it in terms]})
    if p["path"] == "/about/":
        g += [
            {"@type": "Person", "name": "Salil Chaturvedi", "jobTitle": "Founder", "worksFor": {"@id": ORG}, "description": "Serial entrepreneur, investor and mentor. Founded Provogue and Prozone. YPO member and Founding President of EO Navi Mumbai."},
            {"@type": "Person", "name": "Abhay Desai", "jobTitle": "Founding team, technology and product", "worksFor": {"@id": ORG}},
        ]
    if p.get("faqs"):
        faq = {"@type": "Question", }
        node = {"@type": "FAQPage" if page_type != "FAQPage" else "FAQPage", "@id": url + "#faq", "mainEntity": [{"@type": "Question", "name": f["q"], "acceptedAnswer": {"@type": "Answer", "text": strip(f["a"])}} for f in p["faqs"]]}
        if page_type == "FAQPage":
            webpage.update({"mainEntity": node["mainEntity"]})
        else:
            g.append(node)
    return json.dumps({"@context": "https://schema.org", "@graph": g}, ensure_ascii=False, indent=1)


def head(title, desc, path, extra_ld="", og_type="website", noindex=False, extra_css=""):
    url = SITE + path
    full = f"{title} | {BRAND}" if BRAND not in title else title
    robots = "noindex, follow" if noindex else "index, follow, max-image-preview:large, max-snippet:-1"
    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{esc(full)}</title>
  <meta name="description" content="{esc(desc)}">
  <meta name="robots" content="{robots}">
  <link rel="canonical" href="{url}">
  <link rel="alternate" type="text/plain" title="llms.txt" href="/llms.txt">
  <meta name="theme-color" content="#FFFFFF">
  <meta property="og:type" content="{og_type}">
  <meta property="og:site_name" content="{BRAND}">
  <meta property="og:title" content="{esc(full)}">
  <meta property="og:description" content="{esc(desc)}">
  <meta property="og:url" content="{url}">
  <meta property="og:image" content="{SITE}/assets/logo/social-avatar.png">
  <meta property="og:locale" content="en_IN">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="{esc(full)}">
  <meta name="twitter:description" content="{esc(desc)}">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" href="/assets/logo/optimizer360-favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/assets/logo/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" href="/assets/fonts/FuturaBQ-DemiBold.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&display=swap">
  <script>(function(){{var t="paper";try{{var s=localStorage.getItem("o360-theme");if(s==="night"||s==="paper")t=s}}catch(e){{}}document.documentElement.dataset.theme=t}})();</script>
  <script type="importmap">{{"imports":{{"three":"https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js","three/addons/":"https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"}}}}</script>
  <link rel="stylesheet" href="/css/site.css">
  <link rel="stylesheet" href="/css/deck.css">
  <link rel="stylesheet" href="/css/zone.css">
  <link rel="stylesheet" href="/css/glass.css">
  <link rel="stylesheet" href="/css/page.css">
  <link rel="stylesheet" href="/css/viz.css">
  <link rel="stylesheet" href="/css/glyphs.css">
  <link rel="stylesheet" href="/css/explain.css">{extra_css}
  <link rel="stylesheet" href="/css/mobile.css">
  <link rel="stylesheet" href="/css/v22.css">
  {extra_ld}
</head>"""


def render(p, pages):
    trail = crumbs_for(p["path"], pages)
    ld = f'<script type="application/ld+json">\n{schema(p, pages, trail)}\n  </script>'
    is_art = p.get("schema") == "Article"
    film = DIRECTION.get(p["path"], {}).get("film")
    out = [head(p["title"], p["description"], p["path"], ld, "article" if is_art else "website", extra_css=f'\n  <link rel="stylesheet" href="/css/film-{film}.css">' if film else "")]
    out.append(f'<body class="is-page{" is-post" if is_post(p) else ""}">\n  <a class="skip" href="#main">Skip to content</a>\n  ' + nav_html() + "\n  <main id=\"main\" class=\"pg\">")
    cr = "".join((f'<li><a href="{h}">{esc(n)}</a></li>' if i < len(trail) - 1 else f'<li aria-current="page">{esc(n)}</li>') for i, (h, n) in enumerate(trail))
    meta = ""
    if is_art:
        a = p.get("article", {})
        d = a.get("published", TODAY)
        nice = re.sub(r"(\d{4})-(\d{2})-(\d{2})", lambda m: f"{int(m.group(3))} {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][int(m.group(2)) - 1]} {m.group(1)}", d)
        meta = f'<p class="pg-meta"><time datetime="{d}">{nice}</time><span>{a.get("minutes", 5)} min read</span><span>By the Optimizer360 team</span></p>'
    answer = f'<div class="pg-answer"><span>The short answer</span><p>{p["answer"]}</p></div>' if p.get("answer") else ""
    d = DIRECTION.get(p["path"], {})
    viz = ""
    if d.get("viz"):
        kind, params = d["viz"]
        viz = f'<div class="pg-viz pg-viz--{kind}" data-viz="{kind}" data-p="{esc(json.dumps(params, ensure_ascii=False))}" aria-hidden="true"></div>'
    acts = ""
    if not is_art and p["path"] not in ("/contact/", "/privacy/", "/terms/", "/glossary/", "/faq/"):
        acts = '<div class="pg-acts"><a class="btn btn--green" href="/contact/">Get your AI audit <span class="arr" aria-hidden="true">→</span></a><a class="link" href="#questions">Questions, answered</a></div>' if p.get("faqs") else '<div class="pg-acts"><a class="btn btn--green" href="/contact/">Get your AI audit <span class="arr" aria-hidden="true">→</span></a></div>'
    if d.get("film"):
        out.append((Path(__file__).resolve().parent / "films" / f'{d["film"]}.html').read_text())
        if p.get("answer"):
            out.append(f'  <section class="pg-sec pg-sec--tight"><div class="wrap"><div class="pg-answer"><span>The short answer</span><p>{p["answer"]}</p></div></div></section>')
    else:
      out.append(f"""  <header class="pg-hero{' pg-hero--viz' if viz else ''}"><div class="wrap pg-hero__grid">
    <div class="pg-hero__copy">
    <nav class="crumbs" aria-label="Breadcrumb"><ol>{cr}</ol></nav>
    <p class="eyebrow">{esc(p.get("eyebrow", ""))}</p>
    <h1 class="pg-h1">{h1_of(p)}</h1>
    <p class="lede pg-lede">{p.get("lede", "")}</p>
    {meta}
    {acts}
    </div>
    {viz}
  </div>
  <div class="wrap">{answer}</div></header>""")
    if d.get("video") and not d.get("film"):
        key, cap = d["video"]
        src, poster = V[key]
        out.append(f'''  <section class="pg-film" aria-label="{esc(cap)}"><div class="wrap"><figure class="pg-film__f"><video muted loop playsinline preload="none" poster="{poster}" data-src="{src}"></video><figcaption><span>{esc(cap)}</span></figcaption></figure></div></section>''')
    if d.get("product"):
        tabs = "".join(f'<button type="button" role="tab" aria-selected="{str(i == 0).lower()}" data-i="{i}">{esc(t)}</button>' for i, (k, t, c, w, hh) in enumerate(d["product"]))
        wins = "".join(f'<figure class="pp-win{" is-on" if i == 0 else ""}" data-i="{i}"><div class="pp-bar"><i></i><i></i><i></i><span>app.optimizer360.ai · {esc(t)}</span></div><img src="/assets/platform/{k}.webp" alt="Optimizer GEO {esc(t)} screen: {esc(c)}" width="{w}" height="{hh}" loading="{"eager" if i == 0 else "lazy"}" decoding="async"></figure>' for i, (k, t, c, w, hh) in enumerate(d["product"]))
        caps = "".join(f'<p class="pp-cap{" is-on" if i == 0 else ""}" data-i="{i}"><b>{esc(t)}</b>{esc(c)}</p>' for i, (k, t, c, w, hh) in enumerate(d["product"]))
        out.append(f'''  <section class="pg-sec pg-prod" aria-label="Product screens"><div class="wrap">
    <h2 class="pg-h2">The platform, <span class="g">for real.</span></h2>
    <div class="pp-tabs" role="tablist" aria-label="Product screens">{tabs}</div>
    <div class="pp-stage">{wins}</div>
    <div class="pp-caps">{caps}</div>
    <p class="vz-tag">Real product screens · demo workspace data, not a client</p>
  </div></section>''')
    if is_post(p):
        hs = [b["h2"] for b in p.get("sections", []) if b.get("h2")]
        if hs:
            chips = "".join(f'<a href="#{slug(x)}">{strip(x)}</a>' for x in hs)
            out.append(f'  <nav class="pg-toc" aria-label="In this article"><div class="wrap"><span>In this guide</span><div class="pg-toc__in">{chips}<a href="#questions">Questions</a></div></div></nav><div class="pg-prog" aria-hidden="true"><i></i></div>')
    if p["path"] == "/contact/":
        out.append(CONTACT_FORM)
    kids = children(p["path"], pages)
    if kids and p["path"] == "/blog/":
        posts = sorted(kids, key=lambda k: k["path"])
        posts.sort(key=lambda k: k.get("article", {}).get("published", ""), reverse=True)  # newest first
        posts.sort(key=lambda k: k["path"] != "/blog/generative-engine-optimization/")  # pillar guide leads
        cards = "".join(post_card(k, i == 0) for i, k in enumerate(posts))
        out.append(f'<section class="pg-sec"><div class="wrap"><h2 class="pg-h2 pg-h2--sm">Latest articles</h2><ul class="bgrid">{cards}</ul></div></section>')
    elif kids and p["path"] != "/":
        rows = "".join(f'<li><a href="{k["path"]}"><b>{strip(h1_of(k))}</b><span>{esc(k["description"])}</span>' + (f'<em>{k.get("article", {}).get("minutes", 5)} min read</em>' if k.get("schema") == "Article" and k["path"].startswith("/blog/") else "") + '<i aria-hidden="true">→</i></a></li>' for k in kids)
        label = {"/blog/": "Articles", "/results/": "Case studies", "/industries/": "Industries", "/solutions/": "Solutions"}.get(p["path"], "In this section")
        out.append(f'<section class="pg-sec"><div class="wrap"><h2 class="pg-h2 pg-h2--sm">{label}</h2><ul class="pg-index">{rows}</ul></div></section>')
    center = LABELS.get(p["path"]) or strip(p["title"]).split(":")[0]
    if not d.get("film"):
        out += [block(b, center) for b in p.get("sections", [])]
    if p.get("faqs"):
        items = "".join(f'<details><summary>{esc(f["q"])}</summary><p>{f["a"]}</p></details>' for f in p["faqs"])
        out.append(f'<section class="pg-sec" id="questions"><div class="wrap pg-split"><div><h2 class="pg-h2">Questions</h2></div><div class="pg-faq">{items}</div></div></section>')
    rel = [pages[r] for r in p.get("related", []) if r in pages and r != p["path"]]
    if rel and is_post(p):
        posts = [r for r in rel if is_post(r)]
        other = [r for r in rel if not is_post(r)]
        if posts:
            out.append(f'<section class="pg-sec"><div class="wrap"><h2 class="pg-h2 pg-h2--sm">Keep reading</h2><ul class="bgrid bgrid--3">{"".join(post_card(k) for k in posts[:3])}</ul></div></section>')
        rel = other
    if rel:
        rows = "".join(f'<li><a href="{r["path"]}"><b>{strip(h1_of(r))}</b><span>{esc(r["description"])}</span><i aria-hidden="true">→</i></a></li>' for r in rel)
        out.append(f'<section class="pg-sec"><div class="wrap"><h2 class="pg-h2 pg-h2--sm">Keep reading</h2><ul class="pg-index">{rows}</ul></div></section>')
    if p["path"] != "/contact/":
        out.append(CTA)
    out.append("  </main>\n  " + foot_html() + "\n  " + KEY + '\n  <script type="module" src="/js/page.js"></script>\n</body>\n</html>\n')
    return "\n".join(out)


def page_404():
    p = {"title": "Page not found", "description": "This page does not exist. Find GEO services, case studies and guides from Optimizer360, the AI-native organic marketing company.", "path": "/404.html"}
    return head(p["title"], p["description"], "/404.html", noindex=True) + f"""
<body class="is-page">
  {nav_html()}
  <main id="main" class="pg"><header class="pg-hero pg-hero--404"><div class="wrap">
    <p class="eyebrow">404</p><h1 class="pg-h1">This door <span class="g">is locked.</span></h1>
    <p class="lede pg-lede">The page you asked for does not exist. These ones do.</p>
    <ul class="pg-index">{"".join(f'<li><a href="{h}"><b>{esc(t)}</b><span>{esc(d)}</span><i aria-hidden="true">→</i></a></li>' for h, t, d in [("/", "Home", "Stop renting growth. Own it."), ("/solutions/geo/", "GEO", "Get named in AI answers."), ("/results/", "Results", "Measured from week one."), ("/blog/", "Blog", "AI search, explained."), ("/contact/", "Contact", "Get your AI audit.")])}</ul>
  </div></header></main>
  {foot_html()}
  {KEY}
  <script type="module" src="/js/page.js"></script>
</body>
</html>
"""


# ---------------------------------------------------------------- site files
def sitemap(pages):
    pri = lambda path: "1.0" if path == "/" else "0.9" if path in ("/solutions/geo/", "/solutions/", "/platform/", "/contact/") else "0.8" if path.count("/") == 3 and path.startswith("/solutions/") else "0.7"
    urls = [("/", "weekly")] + [(k, "monthly" if k not in ("/blog/",) else "weekly") for k in pages]
    rows = "\n".join(f"  <url><loc>{SITE}{u}</loc><lastmod>{TODAY}</lastmod><changefreq>{c}</changefreq><priority>{pri(u)}</priority></url>" for u, c in urls)
    return f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{rows}\n</urlset>\n'


def llms(pages, full=False):
    groups = [
        ("Solutions", [k for k in pages if k.startswith("/solutions/")] + ["/platform/"]),
        ("Industries", [k for k in pages if k.startswith("/industries/")]),
        ("Results", [k for k in pages if k.startswith("/results/")]),
        ("Guides", [k for k in pages if k.startswith("/blog/")] + ["/glossary/", "/faq/"]),
        ("Company", ["/about/", "/careers/", "/contact/", "/privacy/", "/terms/"]),
    ]
    out = [
        "# Optimizer360",
        "",
        "> Optimizer360 (optimizer360.ai) is the AI-native organic marketing company. Tagline: \"Own your growth.\" It makes brands found, trusted, followed, talked about and chosen across AI answers, search, media and communities, using its own platform (Optimizer GEO) plus six specialist teams. Home market India; also the United States and Mauritius. Contact: " + EMAIL,
        "",
        "Key facts: tracks 8 AI engines (ChatGPT, Gemini, Claude, Grok, Perplexity, Kimi, Microsoft Copilot, Google AI Overviews), up to 10,000 prompts per brand per day. Method: Scan, Diagnose, Fix, Prove, measured against each client's Week-1 baseline. In one real-estate programme the visibility score rose from 32% to 58% across eight engines in under 2.5 months. Optimizer360 never names clients and never promises rankings. Works in 10 industries.",
        "",
    ]
    for g, keys in groups:
        out.append(f"## {g}")
        out.append("")
        for k in keys:
            if k in pages:
                p = pages[k]
                out.append(f"- [{strip(p['h1'])}]({SITE}{k}): {strip(p['description'])}")
                if full and p.get("answer"):
                    out.append(f"  {strip(p['answer'])}")
        out.append("")
    if full:
        out.append("## Frequently asked")
        out.append("")
        if "/faq/" in pages:
            for f in pages["/faq/"].get("faqs", []):
                out.append(f"- Q: {strip(f['q'])}\n  A: {strip(f['a'])}")
        out.append("")
    out.append(f"Last updated: {TODAY}")
    return "\n".join(out) + "\n"


def patch_home():
    p = ROOT / "index.html"
    s = p.read_text()
    a, b = s.index('<header class="nav" id="nav">'), s.index("</header>", s.index('<header class="nav" id="nav">')) + len("</header>")
    # drop a previously injected mobile menu
    rest = s[b:]
    if rest.lstrip().startswith('<div class="mmenu"'):
        end = rest.index("</div>\n  </div>") + len("</div>\n  </div>")
        rest = rest[end:]
    if rest.lstrip().startswith('<div class="dock"'):
        rest = rest[rest.index("</div>", rest.index('<div class="dock"')) + len("</div>"):]
    s = s[:a] + nav_html(home=True).replace('href="/', 'href="/') + rest
    a = s.index('<footer class="foot">'); b = s.index("</footer>", a) + len("</footer>")
    s = s[:a] + foot_html() + s[b:]
    p.write_text(s)


def main():
    pages = {}
    for f in sorted(CONTENT.glob("*.json")):
        for pg in json.loads(f.read_text()):
            pages[pg["path"]] = pg
    for path, pg in pages.items():
        d = ROOT / path.strip("/")
        d.mkdir(parents=True, exist_ok=True)
        (d / "index.html").write_text(render(pg, pages))
    (ROOT / "404.html").write_text(page_404())
    (ROOT / "sitemap.xml").write_text(sitemap(pages))
    (ROOT / "llms.txt").write_text(llms(pages))
    (ROOT / "llms-full.txt").write_text(llms(pages, full=True))
    patch_home()
    # keyword map for the team
    rows = ["| Page | Title | Primary keyword | Secondary keywords |", "|---|---|---|---|"]
    for k, p in pages.items():
        kw = p.get("keywords", [])
        rows.append(f"| {k} | {p['title']} | {kw[0] if kw else ''} | {', '.join(kw[1:6])} |")
    (ROOT / "docs" / "keyword-map.md").write_text("# Keyword map (generated by tools/build/build.py)\n\n" + "\n".join(rows) + "\n")
    print(f"built {len(pages)} pages + 404, sitemap.xml, llms.txt, llms-full.txt, docs/keyword-map.md")


if __name__ == "__main__":
    main()
