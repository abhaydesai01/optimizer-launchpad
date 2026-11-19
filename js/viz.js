// Live hero scenes for the inner pages. Each scene shows the page's idea working, as an illustration
// with fictional brands (labelled on screen). Scenes run only while visible and respect reduced motion.
import { initOrbit } from "./orbit.js";

const ENGINES = ["ChatGPT", "Gemini", "Claude", "Perplexity", "AI Overviews", "Copilot", "Grok", "Kimi"];
const NS = "http://www.w3.org/2000/svg";
const h = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
const sv = (tag, a = {}, p) => { const n = document.createElementNS(NS, tag); for (const k in a) n.setAttribute(k, a[k]); if (p) p.appendChild(n); return n; };
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t) => 1 - Math.pow(1 - t, 3);

/* a loop that runs while the scene is on screen; each cycle is an async function that can wait */
function runner(root, cycle, { reduced, final } = {}) {
  if (reduced) { final && final(); return; }
  let vis = false, running = false, gen = 0;
  const ctx = {
    wait: (ms) => new Promise((r) => setTimeout(r, ms)),
    alive: (g) => g === gen && vis,
  };
  const go = async () => {
    if (running) return; running = true;
    while (vis) { const g = gen; try { await cycle(ctx, g); } catch (e) { console.warn(e); break; } }
    running = false;
  };
  new IntersectionObserver((en) => en.forEach((e) => { vis = e.isIntersecting; if (vis) go(); else gen++; }), { threshold: 0.2 }).observe(root);
}
const frame = (label, body, cls = "") => h(`<div class="vz-win ${cls}"><div class="vz-bar"><i></i><i></i><i></i><span>${label}</span></div><div class="vz-body">${body}</div></div>`);
const tag = (t = "Illustration · fictional brand") => `<p class="vz-tag">${t}</p>`;

/* ---------------------------------------------------------------- 1 · an AI answer, typed, streamed and sourced */
function answer(root, p, o) {
  const items = p.items || [];
  root.append(frame("AI answer · live illustration", `
    <div class="vz-eng">${ENGINES.map((e) => `<span>${e}</span>`).join("")}</div>
    <div class="vz-q"><b class="vz-q__t"></b><i class="vz-caret"></i></div>
    <div class="vz-a"><span class="vz-dots"><i></i><i></i><i></i></span><p class="vz-a__t"></p></div>
    <div class="vz-src"></div>
    <div class="vz-score"><strong>0</strong><span>of 8 engines name the brand</span></div>`), h(tag()));
  const q = root.querySelector(".vz-q__t"), at = root.querySelector(".vz-a__t"), dots = root.querySelector(".vz-dots"), src = root.querySelector(".vz-src"), score = root.querySelector(".vz-score"), sc = score.querySelector("strong"), pills = [...root.querySelectorAll(".vz-eng span")];
  const words = (html) => html.match(/<mark>.*?<\/mark>[^\s]*|\S+/g) || [];
  const show = (it) => {
    q.textContent = it.q; at.innerHTML = it.a; src.innerHTML = it.src.map((s) => `<span class="on">${s}</span>`).join("");
    pills.forEach((pl, i) => pl.className = it.ranks ? (it.ranks[i] ? "hit" : "miss") : "");
    score.hidden = !it.ranks; if (it.ranks) sc.textContent = it.ranks.filter(Boolean).length;
  };
  let k = 0;
  runner(root, async ({ wait, alive }, g) => {
    const it = items[k++ % items.length];
    q.textContent = ""; at.innerHTML = ""; src.innerHTML = ""; pills.forEach((pl) => (pl.className = "")); score.hidden = !it.ranks; sc.textContent = "0";
    root.classList.add("is-typing");
    for (const ch of it.q) { if (!alive(g)) return; q.textContent += ch; await wait(28); }
    root.classList.remove("is-typing"); dots.classList.add("on"); await wait(700); dots.classList.remove("on");
    const w = words(it.a);
    for (let i = 0; i < w.length; i++) { if (!alive(g)) return; at.innerHTML = w.slice(0, i + 1).join(" "); await wait(42); }
    for (const s of it.src) { if (!alive(g)) return; const c = h(`<span>${s}</span>`); src.append(c); requestAnimationFrame(() => c.classList.add("on")); await wait(160); }
    if (it.ranks) {
      let n = 0;
      for (let i = 0; i < pills.length; i++) { if (!alive(g)) return; pills[i].className = it.ranks[i] ? "hit" : "miss"; if (it.ranks[i]) sc.textContent = ++n; await wait(170); }
    }
    await wait(3600);
  }, { ...o, final: () => items[0] && show(items[0]) });
}

/* ---------------------------------------------------------------- 2 · reviews arrive, get answered, the score climbs */
function reviews(root, p, o) {
  const R = [
    ["Google", 1, "Possession delayed 8 months.", "We're sorry. New date is confirmed for March; we'll call you today."],
    ["Property portal", 2, "Site visit didn't match the brochure.", "Fair point. The updated floor plans are now on the project page."],
    ["Google", 5, "Keys a week early. Smooth paperwork."],
    ["Forum", 5, "They fixed my issue fast and told me the truth."],
    ["Google", 5, "Clear pricing, no surprises at registration."],
  ];
  root.append(frame("Reviews · live illustration", `<div class="vz-rev"></div><div class="vz-revfoot"><div class="vz-big"><strong>1.8</strong><span>★ average<br><b>5</b> reviews</span></div><p class="vz-mini"><em>AI answer</em><span>Buyers rate Aurelia Homes 4.6 and say complaints get answered.</span></p></div>`), h(tag()));
  const list = root.querySelector(".vz-rev"), num = root.querySelector(".vz-big strong"), cnt = root.querySelector(".vz-big b"), mini = root.querySelector(".vz-mini");
  const card = ([s, st, t, rep]) => h(`<div class="vz-r ${st < 3 ? "bad" : "good"}"><p><b>${s}</b><i>${"★".repeat(st)}${"☆".repeat(5 - st)}</i></p><p>${t}</p>${rep ? `<p class="vz-r__rep">↳ ${rep}</p>` : ""}</div>`);
  const count = async (wait, a, b, c0, c1, ms) => { const t0 = performance.now(); while (true) { const f = clamp((performance.now() - t0) / ms); num.textContent = (a + (b - a) * ease(f)).toFixed(1); cnt.textContent = Math.round(c0 + (c1 - c0) * ease(f)).toLocaleString("en-IN"); if (f >= 1) break; await wait(30); } };
  runner(root, async ({ wait, alive }, g) => {
    list.innerHTML = ""; num.textContent = "1.8"; cnt.textContent = "5"; mini.classList.remove("on"); root.classList.remove("is-good");
    for (const r of R) {
      if (!alive(g)) return;
      const c = card(r); list.prepend(c); requestAnimationFrame(() => c.classList.add("on"));
      if (list.children.length > 4) list.lastElementChild.remove();
      await wait(r[3] ? 900 : 650);
      if (r[3]) { c.classList.add("answered"); await wait(900); }
      if (r[1] >= 5 && !root.classList.contains("is-good")) { root.classList.add("is-good"); count(wait, 1.8, 4.6, 5, 1240, 2600); }
    }
    await wait(1800); mini.classList.add("on"); await wait(3600);
  }, { ...o, final: () => { R.slice(2).forEach((r) => list.append(card(r))); [...list.children].forEach((c) => c.classList.add("on")); num.textContent = "4.6"; cnt.textContent = "1,240"; mini.classList.add("on"); } });
}

/* ---------------------------------------------------------------- 3 · a feeder network with traffic flowing in */
function network(root, p, o) {
  const W = 520, H = 400, hub = { x: 300, y: 200 }, ai = { x: 468, y: 200 };
  // the channels stack down the left, staggered, all feeding the brand; the brand feeds the AI answer
  const nodes = (p.nodes || []).map((t, i, a) => ({ t, x: 70 + (i % 2) * 34, y: hub.y + (i - (a.length - 1) / 2) * 62 }));
  root.append(frame("Feeder network · live illustration", `<svg class="vz-net" viewBox="0 0 ${W} ${H}"></svg>`), h(tag("Illustration")));
  const svg = root.querySelector("svg");
  const lines = sv("g", {}, svg), dots = sv("g", {}, svg), ng = sv("g", {}, svg);
  const paths = nodes.map((n) => {
    const a = Math.atan2(n.y - hub.y, hub.x - n.x) * 0.8, ex = hub.x - 58 * Math.cos(a), ey = hub.y + 58 * Math.sin(a);
    const d = `M${n.x + 62} ${n.y} C${n.x + 130} ${n.y} ${ex - 60 * Math.cos(a)} ${ey + 60 * Math.sin(a)} ${ex} ${ey}`;
    return sv("path", { d, class: "vz-ln" }, lines);
  });
  const out = sv("path", { d: `M${hub.x + 58} ${hub.y} L${ai.x - 46} ${ai.y}`, class: "vz-ln vz-ln--out" }, lines);
  const ngs = nodes.map((n) => { const g = sv("g", { class: "vz-n", transform: `translate(${n.x} ${n.y})` }, ng); sv("rect", { x: -62, y: -19, width: 124, height: 38, rx: 19 }, g); const t = sv("text", { y: 5 }, g); t.textContent = n.t; return g; });
  const hg = sv("g", { class: "vz-hub", transform: `translate(${hub.x} ${hub.y})` }, ng); sv("circle", { r: 58 }, hg); const ht = sv("text", { y: 6 }, hg); ht.textContent = p.hub || "Your brand";
  const ag = sv("g", { class: "vz-hub vz-hub--ai", transform: `translate(${ai.x} ${ai.y})` }, ng); sv("circle", { r: 44 }, ag); const at = sv("text", { y: 5 }, ag); at.textContent = "AI answer";
  const parts = paths.map((pa, i) => Array.from({ length: 3 }, (_, k) => ({ pa, off: k / 3, el: sv("circle", { r: 3.2, class: "vz-p" }, dots), sp: 0.22 + (i % 3) * 0.04 })));
  const outP = Array.from({ length: 5 }, (_, k) => ({ pa: out, off: k / 5, el: sv("circle", { r: 3.6, class: "vz-p vz-p--out" }, dots), sp: 0.5 }));
  const all = parts.flat().concat(outP);
  let lit = 0, t0 = performance.now(), raf = 0, on = false;
  ngs.forEach((g, i) => g.addEventListener("pointerenter", () => { root.querySelectorAll(".vz-n").forEach((x) => x.classList.remove("hot")); g.classList.add("hot"); paths.forEach((pa, j) => pa.classList.toggle("hot", j === i)); }));
  const tick = (now) => {
    const t = (now - t0) / 1000;
    lit = Math.min(nodes.length, Math.floor(t / 0.55));
    ngs.forEach((g, i) => g.classList.toggle("on", i < lit)); paths.forEach((pa, i) => pa.classList.toggle("on", i < lit));
    out.classList.toggle("on", lit >= 2); ag.classList.toggle("on", lit >= 3); hg.classList.add("on");
    all.forEach((d) => {
      const idx = paths.indexOf(d.pa); const live = d.pa === out ? lit >= 2 : idx < lit;
      if (!live) { d.el.style.opacity = 0; return; }
      const L = d.pa.getTotalLength(), f = (t * d.sp + d.off) % 1, pt = d.pa.getPointAtLength(f * L);
      d.el.setAttribute("cx", pt.x); d.el.setAttribute("cy", pt.y); d.el.style.opacity = Math.sin(Math.PI * f).toFixed(2);
    });
    if (on) raf = requestAnimationFrame(tick);
  };
  if (o.reduced) { t0 = performance.now() - 10000; on = false; tick(performance.now()); return; }
  new IntersectionObserver((en) => en.forEach((e) => { if (e.isIntersecting && !on) { on = true; t0 = performance.now(); raf = requestAnimationFrame(tick); } else if (!e.isIntersecting) { on = false; cancelAnimationFrame(raf); } })).observe(root);
}

/* ---------------------------------------------------------------- 4 · a community thread that ends up cited */
function thread(root, p, o) {
  const M = [
    ["AK", "Asha, founder", "How do I check what ChatGPT says about my brand?", 3],
    ["KM", "Karan, member", "Run these five prompts every Monday. Here's my sheet.", 41, "Cited in an AI answer"],
    ["RS", "Riya, member", "Did this last month. We showed up in AI Overviews in three weeks.", 18],
    ["O", "Brand team", "Live teardown on Thursday. Bring your brand, we'll audit it together.", 27, "", "team"],
  ];
  root.append(frame("Community · live illustration", `<div class="vz-th"><div class="vz-th__side"><b>Aurelia Community</b><span class="on"># ask-anything</span><span># wins</span><span># weekly-teardown</span><em><i></i>214 members online</em></div><div class="vz-th__main"></div></div>`), h(tag()));
  const main = root.querySelector(".vz-th__main");
  const msg = ([av, n, t, up, badge, cls]) => h(`<div class="vz-m ${cls || ""}"><i>${av}</i><div><b>${n}</b><p>${t}</p><span class="vz-up">▲ <u>0</u></span>${badge ? `<em class="vz-badge">${badge}</em>` : ""}</div></div>`);
  runner(root, async ({ wait, alive }, g) => {
    main.innerHTML = "";
    for (const m of M) {
      if (!alive(g)) return;
      const ty = h(`<div class="vz-typing"><i></i><i></i><i></i></div>`); main.append(ty); await wait(650); ty.remove();
      const el = msg(m); main.append(el); requestAnimationFrame(() => el.classList.add("on"));
      const u = el.querySelector("u"); for (let v = 0; v <= m[3]; v += Math.max(1, Math.round(m[3] / 12))) { u.textContent = v; await wait(40); } u.textContent = m[3];
      if (m[4]) { await wait(500); el.classList.add("cited"); }
      await wait(500);
    }
    await wait(3800);
  }, { ...o, final: () => M.forEach((m) => { const el = msg(m); el.classList.add("on", "cited"); el.querySelector("u").textContent = m[3]; main.append(el); }) });
}

/* ---------------------------------------------------------------- 5 · an AI agent on WhatsApp, at 11:47 pm */
function chat(root, p, o) {
  root.append(h(`<div class="vz-phone"><div class="vz-phone__top"><i>A</i><div><b>Aurelia Homes</b><span>AI agent · online</span></div><em>11:47 pm</em></div><div class="vz-phone__body"></div></div>`), h(tag()));
  const body = root.querySelector(".vz-phone__body");
  const S = [
    ["in", "Is the 3BHK at Baner ready by March?"],
    ["out", "Yes. Tower B possession is confirmed for March, RERA-registered. 3BHKs start at 1,240 sq ft."],
    ["in", "Can I visit this Saturday?"],
    ["out", "Of course. Pick a time:", ["Sat 11:00", "Sat 16:00"]],
    ["book", "Visit booked · Sat 11:00 · Baner site office"],
    ["note", "Lead qualified · first heard of us in an AI answer"],
  ];
  const add = (s) => {
    const [k, t, chips] = s;
    const el = k === "book" ? h(`<div class="vz-book">✓ ${t}</div>`) : k === "note" ? h(`<p class="vz-note">${t}</p>`) : h(`<div class="vz-b vz-b--${k}"><p>${t}</p>${chips ? `<div class="vz-chips">${chips.map((c) => `<span>${c}</span>`).join("")}</div>` : ""}</div>`);
    body.append(el); requestAnimationFrame(() => el.classList.add("on")); return el;
  };
  runner(root, async ({ wait, alive }, g) => {
    body.innerHTML = "";
    for (const s of S) {
      if (!alive(g)) return;
      if (s[0] === "out") { const ty = h(`<div class="vz-b vz-b--out vz-typing on"><i></i><i></i><i></i></div>`); body.append(ty); await wait(900); ty.remove(); }
      const el = add(s);
      if (s[2]) { await wait(900); el.querySelector(".vz-chips span").classList.add("pick"); }
      await wait(s[0] === "in" ? 1100 : 800);
    }
    await wait(3800);
  }, { ...o, final: () => S.forEach(add) });
}

/* ---------------------------------------------------------------- 6 · a deal traced back to where it began */
function trace(root, p, o) {
  const N = [["AI answer", "“Best builders in Pune?” · 2 Oct"], ["Reviews", "Read six of them · 5 Oct"], ["Creator video", "Site walkthrough · 9 Oct"], ["Chat", "11:47 pm · 12 Oct"], ["Booking", "2 BHK, Tower B · 2 Nov"]];
  root.append(frame("Attribution · live illustration", `<ol class="vz-tr">${N.map(([t, d], i) => `<li style="--i:${i}"><i>${i + 1}</i><div><b>${t}</b><span>${d}</span></div></li>`).join("")}</ol>
    <div class="vz-tr__foot"><p class="vz-tr__dash"><em>Ad dashboard says</em><b>Source: Direct</b></p><p class="vz-tr__real"><em>What really happened</em><b>First touch: an AI answer</b></p></div>`), h(tag()));
  const li = [...root.querySelectorAll(".vz-tr li")];
  runner(root, async ({ wait, alive }, g) => {
    root.classList.remove("is-traced", "is-dash"); li.forEach((l) => l.classList.remove("on", "back", "origin"));
    for (const l of li) { if (!alive(g)) return; l.classList.add("on"); await wait(520); }
    await wait(500); root.classList.add("is-dash"); await wait(1300);
    for (const l of [...li].reverse()) { if (!alive(g)) return; l.classList.add("back"); await wait(300); }
    li[0].classList.add("origin"); root.classList.add("is-traced"); await wait(4200);
  }, { ...o, final: () => { li.forEach((l) => l.classList.add("on", "back")); li[0].classList.add("origin"); root.classList.add("is-dash", "is-traced"); } });
}

/* ---------------------------------------------------------------- 7 · the answer investors get: before / after */
function flip(root, p, o) {
  const rows = (arr, cls) => arr.map(([k, v, n]) => `<li class="${cls}"><span>${k}</span><b>${v}</b><em>${n}</em></li>`).join("");
  root.append(frame("Investor question · illustration", `
    <div class="vz-tg" role="group" aria-label="Before or after"><button type="button" aria-pressed="true" data-s="before">Before</button><button type="button" aria-pressed="false" data-s="after">After</button></div>
    <p class="vz-fq">${p.q}</p>
    <div class="vz-fl"><ul class="vz-fl__b">${rows(p.before, "bad")}</ul><ul class="vz-fl__a">${rows(p.after, "good")}</ul></div>`), h(tag("Illustration · fictional company, Meridian Industries")));
  const btns = [...root.querySelectorAll(".vz-tg button")];
  let user = false;
  const set = (s) => { root.dataset.state = s; btns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.s === s))); };
  btns.forEach((b) => b.addEventListener("click", () => { user = true; set(b.dataset.s); }));
  set("before");
  runner(root, async ({ wait }) => { await wait(3600); if (!user) set("after"); await wait(4200); if (!user) set("before"); }, { ...o, final: () => set("after") });
}

/* ---------------------------------------------------------------- 8 · the visibility score climbing, with a week scrubber */
function gauge(root, p, o) {
  const A = p.from || 32, B = p.to || 58, WEEKS = 10;
  const fixes = { 2: "Project facts fixed on site, Maps and portals", 4: "Trust page: RERA numbers and delivery record", 7: "Three press citations" };
  root.append(frame("Visibility score · 8 AI engines", `
    <div class="vz-g"><svg viewBox="0 0 240 140"><path class="vz-g__trk" d="M20 124 A100 100 0 0 1 220 124"/><path class="vz-g__val" d="M20 124 A100 100 0 0 1 220 124" pathLength="100"/></svg><div class="vz-g__n"><strong>${A}%</strong><span>Week 1</span></div></div>
    <div class="vz-bars">${Array.from({ length: WEEKS }, (_, i) => `<i style="--i:${i}"></i>`).join("")}</div>
    <input class="vz-range" type="range" min="1" max="${WEEKS}" value="1" step="1" aria-label="Week">
    <p class="vz-fix"></p>`), h(tag("Week 1 and month 2.5 are measured; the path between is illustrative")));
  const val = root.querySelector(".vz-g__val"), num = root.querySelector(".vz-g__n strong"), lab = root.querySelector(".vz-g__n span"), bars = [...root.querySelectorAll(".vz-bars i")], rng = root.querySelector(".vz-range"), fix = root.querySelector(".vz-fix");
  const at = (w) => A + (B - A) * ease((w - 1) / (WEEKS - 1));
  const set = (w) => {
    const v = at(w); val.style.strokeDasharray = `${v} 100`; num.textContent = `${Math.round(v)}%`; lab.textContent = w === WEEKS ? "Month 2.5" : `Week ${w}`;
    bars.forEach((b, i) => { b.style.height = `${((at(i + 1) - 22) / 38) * 100}%`; b.classList.toggle("on", i < w); });
    const fw = Object.keys(fixes).map(Number).filter((k) => k <= w).pop(); fix.innerHTML = fw ? `<b>Wk ${fw}</b> ${fixes[fw]}` : "<b>Wk 1</b> Baseline across 8 engines";
    rng.value = w;
  };
  let user = false;
  rng.addEventListener("input", () => { user = true; set(+rng.value); });
  set(1);
  runner(root, async ({ wait, alive }, g) => { if (user) return wait(1000); for (let w = 1; w <= WEEKS; w++) { if (!alive(g) || user) return; set(w); await wait(520); } await wait(3800); }, { ...o, final: () => set(WEEKS) });
}

/* ---------------------------------------------------------------- 9 · the readiness scorecard as a radar */
function radar(root, p, o) {
  const F = ["Brand recognition", "Trust & credibility", "Entity accuracy", "Technical readiness", "Share of answer", "Location authority", "Discovery", "Comparisons"];
  const wk1 = [6, 5, 5, 5, 4, 4, 4, 4], tgt = [8, 8, 9, 9, 7, 7, 7, 7];
  const C = 150, R = 104;
  root.append(frame("Optimizer GEO · readiness scorecard", `<div class="vz-rd"><svg viewBox="0 0 300 300"></svg><div class="vz-rd__side"><div class="vz-tg"><button type="button" aria-pressed="true" data-s="0">Week 1</button><button type="button" aria-pressed="false" data-s="1">Plan</button></div><div class="vz-rd__n"><strong>37</strong><span>/ 80</span></div><ul class="vz-rd__l"></ul></div></div>`), h(tag()));
  const svg = root.querySelector("svg"), num = root.querySelector(".vz-rd__n strong"), list = root.querySelector(".vz-rd__l"), btns = [...root.querySelectorAll(".vz-tg button")];
  const pt = (i, v) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / F.length; return [C + Math.cos(a) * R * v / 10, C + Math.sin(a) * R * v / 10]; };
  for (let r = 2; r <= 10; r += 2) sv("polygon", { class: "vz-rd__grid", points: F.map((_, i) => pt(i, r).join(",")).join(" ") }, svg);
  F.forEach((f, i) => { const [x, y] = pt(i, 10); sv("line", { class: "vz-rd__ax", x1: C, y1: C, x2: x, y2: y }, svg); const [lx, ly] = pt(i, 12.6); const t = sv("text", { x: lx, y: ly + 4, class: "vz-rd__lb" }, svg); t.textContent = f.split(" ")[0]; });
  const poly = sv("polygon", { class: "vz-rd__poly" }, svg);
  const dotsG = sv("g", {}, svg); const dots = F.map(() => sv("circle", { r: 3.5, class: "vz-rd__dot" }, dotsG));
  list.innerHTML = F.map((f, i) => `<li><span>${f}</span><b>${wk1[i]}</b></li>`).join("");
  let cur = wk1.slice(), anim = 0, user = false;
  const draw = (v) => { poly.setAttribute("points", v.map((x, i) => pt(i, x).join(",")).join(" ")); v.forEach((x, i) => { const [a, b] = pt(i, x); dots[i].setAttribute("cx", a); dots[i].setAttribute("cy", b); }); num.textContent = Math.round(v.reduce((a, b) => a + b, 0)); [...list.children].forEach((li, i) => (li.querySelector("b").textContent = Math.round(v[i]))); };
  const to = (target, s) => { btns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.s === s))); const from = cur.slice(), t0 = performance.now(); cancelAnimationFrame(anim); const step = (now) => { const f = ease(clamp((now - t0) / 1100)); cur = from.map((a, i) => a + (target[i] - a) * f); draw(cur); if (f < 1) anim = requestAnimationFrame(step); }; anim = requestAnimationFrame(step); };
  btns.forEach((b) => b.addEventListener("click", () => { user = true; to(b.dataset.s === "1" ? tgt : wk1, b.dataset.s); }));
  draw(wk1);
  runner(root, async ({ wait }) => { await wait(2600); if (!user) to(tgt, "1"); await wait(3600); if (!user) to(wk1, "0"); await wait(1600); }, { ...o, final: () => draw(wk1) });
}

/* ---------------------------------------------------------------- 10 · the ring: the mark, split into its parts */
function ring(root, p, o) {
  const items = p.items || [], n = items.length, C = 160, R1 = 128, R0 = 84, gap = 4;
  root.append(h(`<div class="vz-ring"><svg viewBox="-80 -14 480 348"></svg><div class="vz-ring__c"><span>${p.center || ""}</span><b></b><em></em></div></div>`));
  const svg = root.querySelector("svg"), cb = root.querySelector(".vz-ring__c b"), ce = root.querySelector(".vz-ring__c em");
  const arc = (a0, a1) => { const P = (r, a) => [C + r * Math.cos(a), C + r * Math.sin(a)]; const [x0, y0] = P(R1, a0), [x1, y1] = P(R1, a1), [x2, y2] = P(R0, a1), [x3, y3] = P(R0, a0); const lg = a1 - a0 > Math.PI ? 1 : 0; return `M${x0} ${y0} A${R1} ${R1} 0 ${lg} 1 ${x1} ${y1} L${x2} ${y2} A${R0} ${R0} 0 ${lg} 0 ${x3} ${y3} Z`; };
  const segs = items.map((it, i) => {
    const a0 = -Math.PI / 2 + (i * 2 * Math.PI) / n + gap / R1, a1 = -Math.PI / 2 + ((i + 1) * 2 * Math.PI) / n - gap / R1;
    const a = sv("a", { href: it.href || "#", class: "vz-seg", style: `--i:${i}` }, svg);
    sv("path", { d: arc(a0, a1) }, a);
    const mid = (a0 + a1) / 2, lx = C + (R1 + 22) * Math.cos(mid), ly = C + (R1 + 22) * Math.sin(mid);
    const t = sv("text", { x: lx, y: ly + 4, "text-anchor": Math.abs(Math.cos(mid)) < 0.25 ? "middle" : Math.cos(mid) > 0 ? "start" : "end" }, a); t.textContent = it.t;
    a.addEventListener("pointerenter", () => sel(i, true));
    a.addEventListener("focus", () => sel(i, true));
    return a;
  });
  let cur = -1, user = false;
  const sel = (i, u) => { if (u) user = true; cur = i; segs.forEach((s, j) => s.classList.toggle("on", j === i)); cb.textContent = items[i].t; ce.textContent = items[i].d; };
  root.querySelector("svg").addEventListener("pointerleave", () => (user = false));
  sel(0);
  runner(root, async ({ wait }) => { await wait(2200); if (!user) sel((cur + 1) % n); }, { ...o, final: () => sel(0) });
}

/* ---------------------------------------------------------------- 11 · ten blue links vs one answer */
function serp(root, p, o) {
  const links = ["Top 10 builders in Pune (2026 list)", "Skyline Homes | Official site", "Harbour Realty projects in Baner", "Aurelia Homes reviews | Google", "Pune real estate news", "Vertex Developers 2BHK prices", "Best areas to buy in Pune", "RERA Maharashtra project search", "Reddit: which builder delivers on time?", "Property portal: new launches Pune"];
  root.append(frame("best builders in pune", `
    <div class="vz-tg"><button type="button" aria-pressed="true" data-s="serp">Search results</button><button type="button" aria-pressed="false" data-s="ai">AI answer</button></div>
    <div class="vz-sp"><ol class="vz-sp__l">${links.map((l, i) => `<li style="--i:${i}"><span>${l}</span><i></i></li>`).join("")}</ol>
    <div class="vz-sp__a"><p>For on-time delivery in Pune, buyers often shortlist <mark>Aurelia Homes</mark>, Skyline Homes and Harbour Realty.</p><div class="vz-src"><span class="on">RERA</span><span class="on">Google reviews</span><span class="on">Reddit</span><span class="on">Times of India</span></div><p class="vz-sp__note">Three names. No page two.</p></div></div>`), h(tag()));
  const btns = [...root.querySelectorAll(".vz-tg button")];
  let user = false;
  const set = (s) => { root.dataset.state = s; btns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.s === s))); };
  btns.forEach((b) => b.addEventListener("click", () => { user = true; set(b.dataset.s); }));
  set("serp");
  runner(root, async ({ wait }) => { await wait(3400); if (!user) set("ai"); await wait(4600); if (!user) set("serp"); }, { ...o, final: () => set("ai") });
}

/* ---------------------------------------------------------------- 12 · Reddit and Wikipedia, done openly */
function wiki(root, p, o) {
  root.append(h(`<div class="vz-wk">
    <div class="vz-win vz-wk__r"><div class="vz-bar"><i></i><i></i><i></i><span>r/pune · thread</span></div><div class="vz-body"><p class="vz-wk__q">Which builder actually delivers on time?</p>
      <div class="vz-wk__c"><b>u/aurelia_homes <em>Official account</em></b><p>We're the developer, so take this with that in mind: our last 5 projects' possession dates and RERA numbers are here. Ask us anything.</p><span class="vz-up">▲ <u>0</u></span></div></div></div>
    <div class="vz-win vz-wk__w"><div class="vz-bar"><i></i><i></i><i></i><span>Talk: Aurelia Homes</span></div><div class="vz-body"><p class="vz-wk__h">Edit request: update homes delivered</p><p class="vz-wk__s">COI disclosed · source: annual report, p. 12</p><p class="vz-wk__st"><span>Pending</span><span>Done ✓ by an editor</span></p></div></div>
  </div>`), h(tag()));
  const u = root.querySelector(".vz-wk u");
  runner(root, async ({ wait, alive }, g) => {
    root.classList.remove("s1", "s2", "s3"); u.textContent = "0";
    await wait(600); root.classList.add("s1");
    for (let v = 0; v <= 86; v += 3) { if (!alive(g)) return; u.textContent = v; await wait(45); }
    await wait(700); root.classList.add("s2"); await wait(1600); root.classList.add("s3"); await wait(4200);
  }, { ...o, final: () => { root.classList.add("s1", "s2", "s3"); u.textContent = "86"; } });
}

/* ---------------------------------------------------------------- 13 · glossary terms drifting, click to jump */
function chips(root, p, o) {
  const terms = [...document.querySelectorAll(".pg-term")].map((t) => [t.id, t.querySelector("dt").textContent]);
  root.append(h(`<div class="vz-ch">${terms.map(([id, t], i) => `<a href="#${id}" style="--d:${(i % 7) * -1.3}s;--f:${[13, 15, 17, 14, 16][i % 5]}px">${t.replace(/\s*\(.*\)/, "")}</a>`).join("")}</div>`), h(tag("Tap a term to jump to it")));
}

/* ---------------------------------------------------------------- 14 · the key, in 3D, turning in its lock */
async function key3d(root, p, o) {
  root.append(h(`<div class="vz-key"><canvas></canvas><p class="vz-key__t">Your key to growth</p></div>`));
  let T; try { T = await import("three"); } catch (e) { return; }
  const { buildKey } = await import("./key.js");
  const cv = root.querySelector("canvas");
  const r = new T.WebGLRenderer({ canvas: cv, antialias: true, alpha: true }); r.setPixelRatio(Math.min(devicePixelRatio, 2));
  const sc = new T.Scene(), cam = new T.PerspectiveCamera(30, 1, 0.1, 100); cam.position.set(0, 0, 9);
  sc.add(new T.HemisphereLight(0xffffff, 0x8a8a8a, 2.2)); const d = new T.DirectionalLight(0xffffff, 3); d.position.set(3, 5, 6); sc.add(d);
  const rim = new T.PointLight(0x6fd89b, 30, 20, 2); rim.position.set(-3, -1, 3); sc.add(rim);
  const { key } = buildKey(T); key.rotation.z = Math.PI / 2;
  // fit the key to the frame whatever its modelled size
  const box = new T.Box3().setFromObject(key), dim = box.getSize(new T.Vector3()), c0 = box.getCenter(new T.Vector3());
  key.scale.setScalar(3.4 / Math.max(dim.x, dim.y, dim.z)); key.position.sub(c0.multiplyScalar(key.scale.x));
  const g = new T.Group(); g.add(key); sc.add(g);
  const size = () => { const w = cv.clientWidth, hh = cv.clientHeight; r.setSize(w, hh, false); cam.aspect = w / hh; cam.updateProjectionMatrix(); };
  size(); addEventListener("resize", size);
  let px = 0, py = 0; root.addEventListener("pointermove", (e) => { const b = root.getBoundingClientRect(); px = (e.clientX - b.left) / b.width - 0.5; py = (e.clientY - b.top) / b.height - 0.5; });
  let on = false; const t0 = performance.now();
  const loop = (now) => { if (!on) return; const t = (now - t0) / 1000; g.rotation.y = (o.reduced ? 0.5 : Math.sin(t * 0.6) * 0.9) + px * 0.8; g.rotation.x = py * 0.5; key.rotation.y = o.reduced ? 0 : (Math.sin(t * 0.8) > 0.6 ? Math.PI / 2 * ease(clamp((Math.sin(t * 0.8) - 0.6) / 0.4)) : 0); r.render(sc, cam); requestAnimationFrame(loop); };
  new IntersectionObserver((en) => en.forEach((e) => { on = e.isIntersecting; if (on) requestAnimationFrame(loop); })).observe(root);
}

/* ---------------------------------------------------------------- 15 · where your data goes (and does not) */
function flow(root, p, o) {
  const N = p.terms ? [["Our pages", "General information"], ["Your judgement", "Not advice"], ["Your decision", "No guaranteed results"]] : [["Your browser", "No cookies · no trackers"], ["Your email app", "You see it before it is sent"], ["Our inbox", "Used to reply, never sold"]];
  root.append(h(`<div class="vz-flow">${N.map(([t, d], i) => `<div class="vz-flow__n" style="--i:${i}"><b>${t}</b><span>${d}</span></div>${i < N.length - 1 ? '<div class="vz-flow__l"><i></i></div>' : ""}`).join("")}</div>`));
}

const KINDS = { answer, reviews, network, thread, chat, trace, flip, gauge, radar, ring, serp, wiki, chips, key: key3d, flow };

export function initViz() {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll("[data-viz]").forEach((root) => {
    const kind = root.dataset.viz;
    let p = {}; try { p = JSON.parse(root.dataset.p || "{}"); } catch (e) {}
    if (kind === "orbit") {
      root.append(h(`<figure class="orbit"><svg class="orbit__svg" id="orbit-${Math.random().toString(36).slice(2, 7)}" role="img" aria-label="Diagram: sources orbiting an AI answer"></svg></figure>`));
      initOrbit(root.querySelector("svg"), { reduced });
      return;
    }
    const fn = KINDS[kind];
    if (fn) fn(root, p, { reduced });
  });
}
