const BASE = process.env.VERIFY_BASE_URL || "http://localhost:3000";

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
  "/blog",
  "/usecases",
  "/faq",
  "/authors/geo-team",
  "/llms.txt",
  "/llms-full.txt",
  "/ai.txt",
  "/feed.xml",
  "/sitemap.xml",
  "/og-image.png",
];

const failures = [];

for (const route of ROUTES) {
  const url = `${BASE}${route}`;
  try {
    const response = await fetch(url, { redirect: "follow" });
    if (response.status !== 200) {
      failures.push(`${route} → ${response.status}`);
      continue;
    }
    if (route === "/llms.txt") {
      const text = await response.text();
      if (!text.includes("Optimizer360.ai") || !text.includes("/blog")) {
        failures.push(`${route} → missing expected llms.txt content`);
      }
    }
    if (route === "/ai.txt" && !(await response.clone().text()).includes("llms.txt")) {
      failures.push(`${route} → missing llms.txt pointer`);
    }
  } catch (error) {
    failures.push(`${route} → ${error instanceof Error ? error.message : "fetch failed"}`);
  }
}

if (failures.length) {
  console.error("Marketing route verification failed:");
  for (const failure of failures) console.error(`  ${failure}`);
  process.exit(1);
}

console.log(`Verified ${ROUTES.length} routes at ${BASE}`);
