// Isometric micro-visuals drawn in code. Every list item on the site that a picture can explain gets one:
// the visual is chosen from the item's own words (Scan → radar, Share of voice → pie, Compliance → shield ...).
// Pure SVG + CSS, themed by the site's tokens, animated once on view and then breathing gently.

const CX = 80, CY = 74;
const P = (x, y, z = 0) => [CX + (x - y) * 0.866, CY + (x + y) * 0.5 - z];
const pts = (...a) => a.map((p) => p.map((n) => n.toFixed(1)).join(",")).join(" ");
const poly = (cls, ...a) => `<polygon class="${cls}" points="${pts(...a)}"/>`;

/* ---------- primitives ---------- */
const plat = (r = 34, t = 5) =>
  `<g class="g-plat">${poly("g-pt", P(-r, -r), P(r, -r), P(r, r), P(-r, r))}${poly("g-pl", P(-r, r), P(r, r), P(r, r, -t), P(-r, r, -t))}${poly("g-pr", P(r, -r), P(r, r), P(r, r, -t), P(r, -r, -t))}</g>`;
const box = (x, y, w, d, h, c = "g") =>
  poly(`g-t ${c}`, P(x, y, h), P(x + w, y, h), P(x + w, y + d, h), P(x, y + d, h)) +
  poly(`g-l ${c}`, P(x, y + d), P(x + w, y + d), P(x + w, y + d, h), P(x, y + d, h)) +
  poly(`g-r ${c}`, P(x + w, y), P(x + w, y + d), P(x + w, y + d, h), P(x + w, y, h));
const rise = (inner, d = 0) => `<g class="g-rise" style="--d:${d}s">${inner}</g>`;
const pop = (inner, d = 0) => `<g class="g-pop" style="--d:${d}s">${inner}</g>`;
const flt = (inner, d = 0) => `<g class="g-float" style="--d:${d}s">${inner}</g>`;
const ball = (x, y, z, r, c = "g") => { const [a, b] = P(x, y, z); return `<circle class="g-ball ${c}" cx="${a}" cy="${b}" r="${r}"/>`; };
const flat = (inner) => `<g transform="translate(${CX} ${CY}) scale(1 .577) rotate(45)">${inner}</g>`; // draw on the floor plane
const line = (a, b, cls = "g-ln") => `<line class="${cls}" x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}"/>`;
const check = (x, y, r = 11) => `<g class="g-badge"><circle cx="${x}" cy="${y}" r="${r}"/><path d="M${x - r * .45} ${y} l${r * .3} ${r * .32} l${r * .55} -${r * .62}"/></g>`;
const bubble = (x, y, w, h, c = "") => `<g class="g-bub ${c}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2.6}"/><path d="M${x + 10} ${y + h} l-4 7 l11 -7z"/><line x1="${x + 9}" y1="${y + h * .42}" x2="${x + w - 12}" y2="${y + h * .42}"/><line x1="${x + 9}" y1="${y + h * .7}" x2="${x + w * .55}" y2="${y + h * .7}"/></g>`;
const star = (x, y, r) => { let d = ""; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * .45 : r; d += `${i ? "L" : "M"}${(x + Math.cos(a) * rr).toFixed(1)} ${(y + Math.sin(a) * rr).toFixed(1)}`; } return `<path class="g-star" d="${d}Z"/>`; };

/* ---------- the visuals ---------- */
const G = {
  scan: () => plat() + flat(`<g class="g-spin"><path class="g-wedge" d="M0 0 L30 -6 A30.6 30.6 0 0 1 30 6 Z" transform="scale(1.4)"/></g><circle class="g-ring" r="30"/><circle class="g-ring g-ring--pulse" r="30"/>`) +
    Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2; return `<g class="g-blink" style="--d:${i * .18}s">${ball(Math.cos(a) * 25, Math.sin(a) * 25, 4, 3.6)}</g>`; }).join("") + rise(box(-6, -6, 12, 12, 16, "n")),
  diagnose: () => plat() + rise(box(-24, 6, 10, 10, 26), 0) + rise(box(-10, 6, 10, 10, 18), .1) + rise(box(4, 6, 10, 10, 30), .2) + rise(box(18, 6, 10, 10, 9, "b"), .3) +
    `<g class="g-scanx"><circle class="g-lens" cx="74" cy="30" r="12"/><line class="g-handle" x1="82.5" y1="38.5" x2="92" y2="48"/></g>`,
  fix: () => plat() + rise(box(-22, -16, 44, 32, 3, "n")) + [10, 2, -6].map((y, i) => `<g class="g-draw" style="--d:${.3 + i * .15}s">${line(P(-14, y + 2, 4), P(i === 2 ? 2 : 12, y + 2, 4), "g-ln g-ln--g")}</g>`).join("") + pop(flt(check(112, 34)), .8),
  prove: () => plat() + [10, 18, 27, 38].map((h, i) => rise(box(-26 + i * 14, 4, 10, 10, h), i * .12)).join("") + pop(check(114, 22), .7),
  baseline: () => plat() + `<g class="g-draw">${line(P(-30, 14, 1), P(30, 14, 1), "g-ln g-ln--dash")}</g>` + rise(`${line(P(-4, -4, 0), P(-4, -4, 46), "g-pole")}<path class="g-flag" d="M${P(-4, -4, 46).join(" ")} l22 4 l-22 9z"/>`),
  band: () => plat() + `<g class="g-sep">${rise(box(-20, -20, 40, 40, 6, "n"), 0)}</g><g class="g-sep g-sep--2">${rise(`<g transform="translate(0 -12)">${box(-20, -20, 40, 40, 6, "l")}</g>`, .12)}</g><g class="g-sep g-sep--3">${rise(`<g transform="translate(0 -24)">${box(-20, -20, 40, 40, 6)}</g>`, .24)}</g>`,
  publish: () => plat() + flt(`<g class="g-up">${box(-18, -14, 36, 28, 3, "n")}${line(P(-10, 4, 4), P(8, 4, 4), "g-ln g-ln--g")}${line(P(-10, -3, 4), P(2, -3, 4), "g-ln g-ln--g")}</g>`) + `<g class="g-trail"><line x1="66" y1="96" x2="66" y2="106"/><line x1="80" y1="99" x2="80" y2="112"/><line x1="94" y1="96" x2="94" y2="106"/></g>`,
  measure: () => plat() + `<g transform="translate(80 58)"><path class="g-arc" d="M-30 0 A30 30 0 0 1 30 0"/><path class="g-arc g-arc--fill" d="M-30 0 A30 30 0 0 1 30 0" pathLength="100"/><g class="g-needle"><line x1="0" y1="0" x2="0" y2="-24"/><circle r="4"/></g></g>`,
  target: () => plat() + flat(`<circle class="g-t3" r="28"/><circle class="g-t2" r="18"/><circle class="g-t1" r="8"/>`) + `<g class="g-drop"><path class="g-arrow" d="M80 22 v22 m-7 -8 l7 8 l7 -8"/></g>`,
  engines: () => plat() + Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2; return `<g class="g-blink" style="--d:${i * .2}s">${ball(Math.cos(a) * 24, Math.sin(a) * 24, 6, 5)}</g>`; }).join("") + rise(box(-7, -7, 14, 14, 20)),
  sources: () => plat() + rise(box(-24, -4, 22, 16, 6, "n"), 0) + rise(`<g transform="translate(0 -6)">${box(-24, -4, 22, 16, 6, "l")}</g>`, .1) + rise(`<g transform="translate(0 -12)">${box(-24, -4, 22, 16, 6)}</g>`, .2) +
    `<g class="g-draw" style="--d:.4s">${line(P(-2, 4, 14), P(18, -12, 26), "g-ln g-ln--g")}</g>` + pop(flt(ball(18, -12, 30, 8)), .6),
  community: () => plat() + pop(flt(bubble(34, 22, 52, 26), 0), .1) + pop(flt(bubble(74, 50, 50, 24, "g"), .6), .4) + pop(`<path class="g-upv" d="M128 40 l7 -9 l7 9 z"/>`, .8),
  reviews: () => plat() + rise(box(-30, -8, 60, 16, 4, "n")) + [0, 1, 2, 3, 4].map((i) => pop(star(44 + i * 18, 52 - i * 5, 7), .2 + i * .12)).join(""),
  press: () => plat() + rise(box(-22, -16, 44, 32, 3, "n")) + rise(`<g transform="translate(0 -4)">${box(-20, -14, 40, 28, 3, "l")}</g>`, .1) + `<g class="g-draw" style="--d:.4s">${line(P(-12, 6, 8), P(10, 6, 8), "g-ln g-ln--g")}${line(P(-12, 0, 8), P(10, 0, 8), "g-ln")}${line(P(-12, -6, 8), P(4, -6, 8), "g-ln")}</g>` + `<g class="g-flash"><line x1="118" y1="26" x2="128" y2="18"/><line x1="122" y1="36" x2="134" y2="34"/><line x1="112" y1="18" x2="114" y2="8"/></g>`,
  video: () => plat() + rise(box(-4, -24, 6, 48, 34, "n")) + pop(`<path class="g-play" d="M80 44 l14 8 l-14 8z"/>`, .4),
  schema: () => plat() + `<g class="g-draw" style="--d:.3s">${line(P(0, 0, 30), P(-18, -10, 14))}${line(P(0, 0, 30), P(16, -14, 14))}${line(P(0, 0, 30), P(10, 16, 14))}</g>` +
    pop(ball(0, 0, 30, 7), 0) + pop(ball(-18, -10, 14, 5, "n"), .3) + pop(ball(16, -14, 14, 5, "n"), .4) + pop(ball(10, 16, 14, 5), .5) + `<text class="g-code" x="112" y="30">{ }</text>`,
  site: () => plat() + rise(box(-24, -18, 48, 36, 3, "n")) + `${poly("g-tb", P(-24, -18, 3.2), P(24, -18, 3.2), P(24, -10, 3.2), P(-24, -10, 3.2))}` + [0, 1, 2].map((i) => `<g class="g-draw" style="--d:${.3 + i * .12}s">${line(P(-16, -2 + i * 7, 4), P(i === 0 ? 16 : 8, -2 + i * 7, 4), i === 0 ? "g-ln g-ln--g" : "g-ln")}</g>`).join(""),
  cite: () => plat() + flt(`<g class="g-chain"><rect x="52" y="34" width="34" height="18" rx="9"/><rect x="74" y="44" width="34" height="18" rx="9"/></g>`) + pop(`<path class="g-spark" d="M120 22 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3z"/>`, .5),
  pie: () => plat() + `<g transform="translate(80 66) scale(1 .577)"><circle class="g-pie-bg" r="26"/><circle class="g-pie" r="13" pathLength="100"/></g>` + `<g transform="translate(0 -6)"><g transform="translate(80 66) scale(1 .577)"><circle class="g-pie-top" r="26"/><circle class="g-pie" r="13" pathLength="100"/></g></g>`,
  sentiment: () => plat() + `<g transform="translate(80 60)"><path class="g-arc g-arc--bad" d="M-30 0 A30 30 0 0 1 -9 -28.6"/><path class="g-arc g-arc--mid" d="M-9 -28.6 A30 30 0 0 1 9 -28.6"/><path class="g-arc g-arc--good" d="M9 -28.6 A30 30 0 0 1 30 0"/><g class="g-needle g-needle--s"><line x1="0" y1="0" x2="0" y2="-24"/><circle r="4"/></g></g>`,
  dots: () => plat(38) + Array.from({ length: 49 }, (_, i) => { const x = (i % 7) * 9 - 27, y = Math.floor(i / 7) * 9 - 27, on = i < 42; return `<g class="${on ? "g-blink g-blink--once" : ""}" style="--d:${(i * .025).toFixed(2)}s">${ball(x, y, 2, 2.6, on ? "g" : "n")}</g>`; }).join(""),
  spark: () => plat() + rise(box(-2, -26, 4, 52, 40, "n")) + `<g class="g-draw" style="--d:.4s"><polyline class="g-spk" points="${pts(P(1, -20, 8), P(1, -8, 14), P(1, 2, 12), P(1, 12, 24), P(1, 22, 34))}"/></g>` + pop(`<circle class="g-dot" cx="${P(1, 22, 34)[0]}" cy="${P(1, 22, 34)[1]}" r="4"/>`, 1),
  shield: () => plat() + flt(`<path class="g-shield" d="M80 18 l26 9 v18 c0 18 -12 28 -26 34 c-14 -6 -26 -16 -26 -34 v-18z"/>`) + pop(`<path class="g-tick" d="M69 46 l8 8 l15 -16"/>`, .5),
  team: () => plat() + [[-16, 8, "n", 0], [0, -8, "g", .15], [16, 6, "l", .3]].map(([x, y, c, d]) => rise(`${box(x - 5, y - 5, 10, 10, 16, c)}${ball(x, y, 24, 6, c === "n" ? "n" : "g")}`, d)).join(""),
  calendar: () => plat() + rise(box(-24, -20, 48, 40, 3, "n")) + Array.from({ length: 12 }, (_, i) => { const x = -18 + (i % 4) * 11, y = -14 + Math.floor(i / 4) * 11; return `<g class="g-blink g-blink--once" style="--d:${(i * .08).toFixed(2)}s">${poly(i > 8 ? "g-cell on" : "g-cell", P(x, y, 3.3), P(x + 8, y, 3.3), P(x + 8, y + 8, 3.3), P(x, y + 8, 3.3))}</g>`; }).join(""),
  agent: () => plat() + rise(box(-8, -2, 16, 6, 46, "n")) + pop(flt(bubble(92, 20, 44, 20, "g")), .3) + pop(flt(bubble(28, 40, 40, 20), .5), .6),
  funnel: () => plat() + flat(`<circle class="g-ring" r="30"/>`) + `<g transform="translate(0 -18)">${flat(`<circle class="g-ring g-ring--g" r="20"/>`)}</g><g transform="translate(0 -32)">${flat(`<circle class="g-ring g-ring--g" r="10"/>`)}</g>` + [0, 1, 2].map((i) => `<circle class="g-fall" style="--d:${i * .5}s" cx="${72 + i * 8}" cy="20" r="3.5"/>`).join(""),
  alert: () => plat() + flt(`<path class="g-warn" d="M80 18 l26 44 h-52z"/><line class="g-warn-i" x1="80" y1="34" x2="80" y2="48"/><circle class="g-warn-d" cx="80" cy="55" r="2.4"/>`),
  data: () => plat() + [0, 1, 2].map((i) => rise(`<g transform="translate(0 ${-i * 13})">${flat(`<circle class="g-db" r="18"/>`)}<rect class="g-db-s" x="62" y="62" width="36" height="12"/>${`<g transform="translate(0 -12)">${flat(`<circle class="g-db-t" r="18"/>`)}</g>`}</g>`, i * .12)).join(""),
  podium: () => plat() + rise(box(-26, 2, 14, 14, 16, "n"), .1) + rise(box(-6, -8, 14, 14, 28), 0) + rise(box(14, -18, 14, 14, 10, "n"), .2) + pop(flt(star(...P(1, -1, 42), 8)), .5),
  key: () => plat() + flt(`<g class="g-key"><circle cx="66" cy="44" r="13"/><circle class="g-key-h" cx="66" cy="42" r="3.4"/><path d="M78 47 h36 v7 m-8 -7 v6"/></g>`),
  cross: () => plat() + rise(box(-14, -14, 28, 28, 14, "n")) + `<text class="g-num" x="80" y="56">#1</text>` + pop(`<line class="g-strike" x1="58" y1="64" x2="104" y2="36"/>`, .5),
  answer: () => plat() + flt(`<g class="g-ans"><rect x="40" y="22" width="80" height="42" rx="12"/><line x1="52" y1="36" x2="98" y2="36"/><rect class="g-hl" x="50" y="44" width="34" height="9" rx="4"/><line x1="88" y1="48.5" x2="108" y2="48.5"/></g>`) + pop(`<path class="g-spark" d="M118 14 l2.6 7 l7 2.6 l-7 2.6 l-2.6 7 l-2.6 -7 l-7 -2.6 l7 -2.6z"/>`, .5),
  cube: () => plat() + flt(rise(box(-12, -12, 24, 24, 24))),
};

/* ---------- choosing a visual from the words ---------- */
const RULES = [
  [/\bscan|track(ed)? (every|8)|8 engines|eight engines|live answers\b/i, "scan"], [/diagnos|competitor share|where .* missing/i, "diagnose"],
  [/fix and publish|publish(ed)?\b/i, "publish"], [/\bfix(es)?\b|ship(ped)?|correct(ed)?/i, "fix"], [/\bprove|proof|show the board/i, "prove"],
  [/re-?measure|measure|gauge|readiness|scorecard|score\b/i, "measure"], [/baseline|week-?1|week one/i, "baseline"], [/band|own, build|map and/i, "band"],
  [/outcome|goal|winning|target|define/i, "target"], [/engine/i, "engines"], [/share of (voice|answer)|share\b/i, "pie"], [/sentiment|tone|trust(ed)? (and|by)/i, "sentiment"],
  [/prompts? ranked|questions?|prompt universe|universe|cluster/i, "dots"], [/citation rate|accuracy|up\b|rise|grow|compound/i, "spark"],
  [/cit(e|ed|ation)|link/i, "cite"], [/wiki|reference|source|entity|knowledge/i, "sources"], [/reddit|quora|forum|communit|thread|member|room/i, "community"],
  [/review|rating|star|reputation/i, "reviews"], [/press|\bpr\b|media|news|journalist|best of|list/i, "press"], [/video|youtube|walkthrough|creator/i, "video"],
  [/schema|structured|technical|crawl|code|markup|llms\.txt/i, "schema"], [/compli|sebi|rera|asci|dpdp|legal|sign-?off|inside the lines|accurate|ethic|rules|regulat|fssai/i, "shield"],
  [/team|people|expert|specialist|founder|hire|career/i, "team"], [/pilot|quarter|month|weekly|calendar|report|date/i, "calendar"],
  [/agent|whatsapp|chat|conversation|24\/7|reply|book(ed|ing)? (a )?(visit|call)|instagram/i, "agent"], [/pipeline|lead|deal|attribution|first touch|funnel|enquir|book/i, "funnel"],
  [/drift|wrong|alert|stale|old |controvers|missing|outdated/i, "alert"], [/demand|data|database|volume|seo data/i, "data"],
  [/rival|compet|wins|compar|shortlist|podium/i, "podium"], [/own(ed)?\b|rent|key|door|start/i, "key"], [/isn't|not |never|no guarantee|guarantee/i, "cross"],
  [/answer|named|visib|\bai\b|chatgpt|gemini|perplexity/i, "answer"], [/site|page|blog|guide|faq|content|newsletter|channel/i, "site"],
];
export const pickGlyph = (title = "", body = "") => {
  for (const [re, k] of RULES) if (re.test(title)) return k;
  for (const [re, k] of RULES) if (re.test(body)) return k;
  return "cube";
};

export function glyph(key) {
  const f = G[key] || G.cube;
  const el = document.createElement("div");
  el.className = `gl gl--${key}`;
  el.setAttribute("aria-hidden", "true");
  el.innerHTML = `<svg viewBox="0 0 160 120">${f()}</svg>`;
  return el;
}

let io;
const watch = (el) => {
  if (!io) io = new IntersectionObserver((en) => en.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); } }), { threshold: 0.35 });
  io.observe(el);
};

/* attach a visual to each item: where = "prepend" or a node to replace; key may be forced */
export function decorate(items, { titleSel = "h3, b, dt, span", bodySel = "p, em, dd", place = "prepend", force } = {}) {
  items.forEach((li) => {
    if (li.querySelector(":scope > .gl") || li.closest("[data-x]")) return; // diagrams carry these
    // the heading wins over a step number: try the selectors in the order given
    const first = (sel) => { for (const s of sel.split(",")) { const n = li.querySelector(s.trim()); if (n && n.textContent.trim() && !/^\d+$|^[A-Z]$/.test(n.textContent.trim())) return n.textContent; } return ""; };
    const t = first(titleSel), b = first(bodySel);
    const k = typeof force === "function" ? force(t, b, li) : force || pickGlyph(t, b);
    const g = glyph(k);
    if (place === "prepend") li.prepend(g); else if (place === "append") li.append(g); else place(li, g);
    watch(g);
  });
}

export function initGlyphs(scope = document) {
  const $$ = (s) => [...scope.querySelectorAll(s)];
  // inner pages
  decorate($$(".pg-cols > li"));
  decorate($$(".pg-steps > li"), { place: (li, g) => { const n = li.querySelector(":scope > span"); if (n) n.classList.add("gl-n"); li.prepend(g); } });
  // home page
  decorate($$(".loop > li"), { place: (li, g) => { li.querySelector(":scope > span")?.classList.add("gl-n"); li.prepend(g); } });
  decorate($$(".start__list > li"), { titleSel: "b, strong, h4", place: (li, g) => { const s = li.querySelector(":scope > span"); if (s) { const d = li.querySelector(":scope > div"); s.classList.add("gl-n"); if (d) d.prepend(s); } li.prepend(g); }, force: (t) => (/baseline|map/i.test(t) ? "band" : /strongest|own/i.test(t) ? "target" : /pilot|quarter/i.test(t) ? "calendar" : pickGlyph(t)) });
  decorate($$(".gains > li"));
  decorate($$(".cs__col"), { titleSel: "h4", bodySel: "ul", force: (t) => (/site/i.test(t) ? "site" : /communit/i.test(t) ? "community" : /reference/i.test(t) ? "sources" : /press|video/i.test(t) ? "press" : /investor site/i.test(t) ? "site" : /media/i.test(t) ? "press" : /forum|monitor/i.test(t) ? "community" : /compli/i.test(t) ? "shield" : pickGlyph(t)) });
  decorate($$(".cs__steps > li"), { titleSel: "b", place: (li, g) => { li.querySelector(":scope > span")?.classList.add("gl-n"); li.prepend(g); } });
  decorate($$(".cs__kpis > li"), { titleSel: "span", force: (t) => (/citation|accuracy/i.test(t) ? "spark" : /share/i.test(t) ? "pie" : /sentiment/i.test(t) ? "sentiment" : /prompt/i.test(t) ? "dots" : /current sources/i.test(t) ? "sources" : /controvers/i.test(t) ? "alert" : pickGlyph(t)), place: "append" });
  decorate($$(".case__read dl > div"), { titleSel: "dt", bodySel: "dd", force: (t) => (/visib/i.test(t) ? "engines" : /citation/i.test(t) ? "cite" : /share/i.test(t) ? "pie" : /sentiment/i.test(t) ? "sentiment" : /isn/i.test(t) ? "cross" : pickGlyph(t)) });
  decorate($$(".solve > li"), { titleSel: "b", bodySel: "s" });
}
