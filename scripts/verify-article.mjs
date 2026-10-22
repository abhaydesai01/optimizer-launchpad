// Check that a published article is complete.  Usage: node scripts/verify-article.mjs <slug> [baseUrl]
// Defaults to the live site. Pass http://localhost:3010 to check a local copy. Exits 1 if any check fails.
const slug = process.argv[2];
const base = (process.argv[3] || "https://optimizer360.ai").replace(/\/$/, "");
if (!slug) {
  console.error("Usage: node scripts/verify-article.mjs <slug> [baseUrl]");
  process.exit(2);
}

const results = [];
const check = (name, ok, detail = "") => results.push({ name, ok, detail });
const get = async (path, init = {}) => fetch(base + path, { redirect: "manual", ...init });
const strip = (html) =>
  html
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");

const path = `/blog/${slug}`;
const page = await get(path);
check("page returns 200 (not a redirect)", page.status === 200, `HTTP ${page.status}`);
const html = page.status === 200 ? await page.text() : "";

if (html) {
  const text = strip(html);
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "";
  check("title ends with a single site name", /\| Optimizer360\.ai$/.test(title) && (title.match(/Optimizer360\.ai/g) || []).length <= 2 && !/\| Optimizer360\.ai \| Optimizer360\.ai$/.test(title), title);
  check("exactly one h1", (html.match(/<h1[\s>]/g) || []).length === 1);
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "";
  check("meta description is 50 to 175 characters", desc.length >= 50 && desc.length <= 175, `${desc.length} characters`);
  const canonical = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1] || "";
  check("canonical is this page", canonical === `https://optimizer360.ai${path}`, canonical);

  const blocks = [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)].map((m) => {
    try { return JSON.parse(m[1]); } catch { return null; }
  });
  const article = blocks.find((b) => b && b["@type"] === "Article");
  check("Article data has headline, date, author, image and publisher",
    Boolean(article && article.headline && article.datePublished && article.author?.name && article.image && article.publisher),
    article ? `${article.datePublished?.slice(0, 10)} · ${article.author?.name}` : "no Article block");
  const faq = blocks.find((b) => b && b["@type"] === "FAQPage");
  const answers = faq ? faq.mainEntity.map((e) => `${e.name} ${e.acceptedAnswer?.text}`) : [];
  check("FAQ data has at least 3 entries", answers.length >= 3, `${answers.length} entries`);
  check("FAQ text has no markdown syntax", !answers.some((a) => /\]\(|\*\*/.test(a)));

  check("no leftover placeholder text", !/Secondary keywords|\[pending|\[date on release|\[NAME|TODO/i.test(text));
  check("no raw markdown link syntax on the page", !/\]\(\//.test(text));
  check("has a Sources section", /\bSources\b/.test(text));

  const hrefs = [...new Set([...html.matchAll(/<a [^>]*href="(\/[^"#?]*)"/g)].map((m) => m[1].replace(/\/$/, "") || "/"))];
  const broken = [];
  for (const href of hrefs) {
    const r = await get(href, { method: "HEAD" });
    if (r.status !== 200) broken.push(`${href} (${r.status})`);
  }
  check("every internal link on the page returns 200", broken.length === 0, broken.join(", ") || `${hrefs.length} links`);
}

const sitemap = await (await get("/sitemap.xml")).text();
check("listed in the sitemap", sitemap.includes(`${path}<`));
const blog = await (await get("/blog")).text();
check("listed on the blog page", blog.includes(`href="${path}"`));
const llms = await (await get("/llms.txt")).text();
check("listed in llms.txt", llms.includes(path));

let failed = 0;
for (const r of results) {
  if (!r.ok) failed++;
  console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name}${r.detail ? `  (${r.detail})` : ""}`);
}
console.log(failed ? `\n${failed} check(s) failed for ${path}` : `\nAll ${results.length} checks passed for ${path}`);
process.exit(failed ? 1 : 0);
