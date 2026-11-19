#!/usr/bin/env python3
"""Copy only the public website into ../optimizer360-deploy for hosting (Netlify).

Never ships internal notes (README, CASE-STUDY, DIRECTOR-NOTES, docs/, tools/, preview/) or unused source media.
Run after build.py:  python3 tools/build/package.py            (writes ../optimizer360-deploy)
On Netlify (netlify.toml):  python3 tools/build/package.py --out dist
"""
import argparse
import shutil
from pathlib import Path

SRC = Path(__file__).resolve().parents[2]
OUT = SRC.parent / "optimizer360-deploy"
FILES = ["index.html", "404.html", "favicon.ico", "robots.txt", "sitemap.xml", "llms.txt", "llms-full.txt", "_redirects", "site.webmanifest"]
DIRS = ["css", "js", "assets", "solutions", "industries", "platform", "results", "blog", "glossary", "faq", "about", "careers", "contact", "privacy", "terms", ".well-known"]
SKIP = {
    "assets/film/clips", "assets/film/raw",          # source footage, not used by any page
    "assets/platform/command-center.webp", "assets/platform/ai-visibility.webp", "assets/platform/prompt-intelligence.webp",
    "assets/platform/citation-intelligence.webp", "assets/platform/recommendations.webp",  # old demo screens, removed from the site
}

HEADERS = """/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: SAMEORIGIN
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/css/*
  Cache-Control: public, max-age=0, must-revalidate

/js/*
  Cache-Control: public, max-age=0, must-revalidate

/llms.txt
  Content-Type: text/plain; charset=utf-8

/llms-full.txt
  Content-Type: text/plain; charset=utf-8

/site.webmanifest
  Content-Type: application/manifest+json; charset=utf-8

/.well-known/security.txt
  Content-Type: text/plain; charset=utf-8
"""


def skip(rel):
    return any(rel == s or rel.startswith(s + "/") for s in SKIP) or Path(rel).name.startswith(".") or rel.startswith("dist/")


def main():
    global OUT
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", help="output folder (relative to the site root); default ../optimizer360-deploy")
    a = ap.parse_args()
    if a.out:
        OUT = (SRC / a.out).resolve()
    if OUT.exists():
        # refresh in place: copytree with dirs_exist_ok overwrites files; stale files are listed for the operator
        pass
    OUT.mkdir(exist_ok=True)
    for f in FILES:
        shutil.copy2(SRC / f, OUT / f)
    for d in DIRS:
        for p in (SRC / d).rglob("*"):
            rel = str(p.relative_to(SRC))
            if p.is_dir() or skip(rel):
                continue
            dst = OUT / rel
            dst.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(p, dst)
    (OUT / "_headers").write_text(HEADERS)
    size = sum(p.stat().st_size for p in OUT.rglob("*") if p.is_file())
    print(f"packaged {sum(1 for p in OUT.rglob('*') if p.is_file())} files, {size / 1e6:.1f} MB -> {OUT}")


if __name__ == "__main__":
    main()
