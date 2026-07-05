#!/usr/bin/env node
/**
 * Smoke-test marketing routes: HTTP 200, dark theme, no legacy shell.
 * Usage: node scripts/verify-marketing-routes.mjs [baseUrl]
 */
const ROUTES = [
  "/",
  "/about",
  "/request-audit",
  "/ai-seo",
  "/engines",
  "/compare",
  "/agency",
  "/contact",
  "/careers",
  "/privacy",
  "/terms",
  "/thank-you",
];

const base = process.argv[2] || "http://localhost:3000";
let failed = 0;

for (const route of ROUTES) {
  const url = `${base}${route}`;
  try {
    const res = await fetch(url);
    const html = await res.text();
    const hasDark = html.includes("theme-ink");
    const hasOld = html.includes('bg-[#f5f6fa]') || html.includes("PublicPageShell");
    const ok = res.status === 200 && hasDark && !hasOld;
    if (!ok) {
      console.log(`FAIL ${route}: status=${res.status} dark=${hasDark} legacy=${hasOld}`);
      failed++;
    } else {
      console.log(`OK   ${route}`);
    }
  } catch (err) {
    console.log(`FAIL ${route}: ${err.message}`);
    failed++;
  }
}

const pricingRes = await fetch(`${base}/pricing`, { redirect: "manual" });
if (pricingRes.status === 307 || pricingRes.status === 308) {
  console.log("OK   /pricing (redirects)");
} else {
  console.log(`FAIL /pricing: expected redirect, got ${pricingRes.status}`);
  failed++;
}

process.exit(failed > 0 ? 1 : 0);
