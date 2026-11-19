#!/usr/bin/env python3
"""SEO/GEO audit of the built site: broken internal links, titles, descriptions, H1s, JSON-LD, canonicals, sitemap coverage."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
files = [ROOT / "index.html", ROOT / "404.html"] + sorted(p for p in ROOT.glob("**/index.html") if p.parent != ROOT and not any(x in p.parts for x in ("tools", "docs", "preview", "node_modules")))
sitemap = (ROOT / "sitemap.xml").read_text()
problems, titles, descs = [], {}, {}


def exists(href):
    href = href.split("#")[0].split("?")[0]
    if not href or href.startswith(("http", "mailto:", "tel:", "data:")):
        return True
    p = ROOT / href.lstrip("/")
    return p.exists() and (p.is_file() or (p / "index.html").exists())


for f in files:
    s = f.read_text()
    rel = "/" + str(f.relative_to(ROOT)).replace("index.html", "")
    t = re.search(r"<title>(.*?)</title>", s, re.S)
    d = re.search(r'<meta name="description" content="(.*?)"', s)
    t = t.group(1) if t else ""
    d = d.group(1) if d else ""
    if not (20 <= len(t) <= 70):
        problems.append(f"{rel}: title length {len(t)}")
    if f.name != "404.html" and not (110 <= len(d) <= 170):
        problems.append(f"{rel}: description length {len(d)}")
    titles.setdefault(t, []).append(rel)
    descs.setdefault(d, []).append(rel)
    h1 = len(re.findall(r"<h1[\s>]", s))
    if h1 != 1:
        problems.append(f"{rel}: {h1} h1")
    if f.name != "404.html" and 'rel="canonical"' not in s:
        problems.append(f"{rel}: no canonical")
    for m in re.finditer(r'<script type="application/ld\+json">(.*?)</script>', s, re.S):
        try:
            json.loads(m.group(1))
        except Exception as e:
            problems.append(f"{rel}: bad JSON-LD {e}")
    for href in sorted(set(re.findall(r'href="([^"]+)"', s))):
        if href.startswith(("assets/", "css/")):
            continue
        if href.startswith("/") and not exists(href):
            problems.append(f"{rel}: broken link {href}")
    if f.name != "404.html" and f"https://optimizer360.ai{rel}" not in sitemap:
        problems.append(f"{rel}: not in sitemap")
    if "—" in s.split("</head>")[1] and f.name != "index.html":
        problems.append(f"{rel}: em dash in body")

for t, ps in titles.items():
    if len(ps) > 1:
        problems.append(f"duplicate title {t!r}: {ps}")
for d, ps in descs.items():
    if len(ps) > 1 and d:
        problems.append(f"duplicate description: {ps}")
print(f"{len(files)} pages checked")
print("\n".join(problems) if problems else "no problems")
