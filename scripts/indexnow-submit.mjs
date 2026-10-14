// Tell Bing (via IndexNow) about every page in the live sitemap, or about the URLs passed as arguments.
// Run after a deploy that adds or changes pages:  node scripts/indexnow-submit.mjs [url ...]
import { readdirSync, readFileSync } from "node:fs";

const HOST = "optimizer360.ai";
const keyFile = readdirSync(new URL("../public/", import.meta.url)).find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
if (!keyFile) throw new Error("IndexNow key file not found in public/");
const key = keyFile.replace(".txt", "");

let urls = process.argv.slice(2);
if (urls.length === 0) {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key, keyLocation: `https://${HOST}/${keyFile}`, urlList: urls }),
});
console.log(`IndexNow: submitted ${urls.length} URLs, HTTP ${response.status}`);
if (response.status !== 200 && response.status !== 202) process.exit(1);
