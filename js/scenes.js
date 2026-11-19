// Visual story scenes: scroll-driven product UIs.
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const NS = "http://www.w3.org/2000/svg";
const el = (tag, attrs = {}, parent) => {
  const n = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  if (parent) parent.appendChild(n);
  return n;
};

export function initScenes({ reduced }) {
  const hasST = !!(window.gsap && window.ScrollTrigger);

  /* ---- Scene 1: a buyer asks, AI answers, your brand is missing ---- */
  const decide = $("#decide");
  if (decide) {
    const typed = $("[data-type]", decide), text = typed.dataset.type;
    const think = $("[data-think]", decide), answers = $$("[data-a]", decide), flag = $("[data-flag]", decide);
    const steps = $$("[data-step]", decide), caret = $(".caret", decide);
    const render = (p) => {
      typed.textContent = text.slice(0, Math.round(text.length * clamp(p / 0.26)));
      caret.style.display = p < 0.3 ? "" : "none";
      think.style.opacity = p > 0.27 && p < 0.38 ? 1 : 0;
      answers.forEach((a, i) => a.classList.toggle("on", p > 0.38 + i * 0.075));
      flag.classList.toggle("on", p > 0.84);
      const s = p < 0.3 ? 0 : p < 0.82 ? 1 : 2;
      steps.forEach((li, i) => { li.classList.toggle("on", i === s); li.classList.toggle("past", i < s); });
    };
    // v22: the scene plays by itself once it is on screen (no scrolling needed), holds the answer, then replays
    const DUR = 8.5, HOLD = 5;
    let raf = 0, t0 = 0, on = false;
    const play = (now) => {
      const t = (now - t0) / 1000;
      render(clamp(t / DUR));
      if (t > DUR + HOLD) t0 = now + 600; // short blank beat, then again
      if (on) raf = requestAnimationFrame(play);
    };
    if (!reduced) new IntersectionObserver((en) => en.forEach((e) => {
      if (e.isIntersecting && !on) { on = true; t0 = performance.now(); raf = requestAnimationFrame(play); }
      else if (!e.isIntersecting && on) { on = false; cancelAnimationFrame(raf); render(0); }
    }), { threshold: 0.45 }).observe($(".ai", decide));
    render(reduced ? 1 : 0);
  }

  /* ---- Scene 3: investor answer rows reveal ---- */
  const fin = $(".ai--fin");
  if (fin) new IntersectionObserver((en, o) => en.forEach((e) => { if (e.isIntersecting) { fin.classList.add("is-in"); o.disconnect(); } }), { threshold: 0.3 }).observe(fin);

  /* ---- Scene 4: sources web ---- */
  const web = $("#web");
  if (web) {
    const C = 320, R = 236;
    const src = [
      ["Reviews", "Google, marketplaces", 7], ["News & press", "trade + national", 6], ["Forums", "Reddit, Quora", 6],
      ["Comparison sites", "99acres, G2…", 6], ["YouTube", "reviews, walkthroughs", 5], ["Wikipedia", "Wikidata", 4],
      ["Marketplaces", "listings, Q&A", 5], ["Your website", "one voice", 1.4],
    ];
    const lines = el("g", {}, web), nodes = el("g", {}, web);
    src.forEach(([name, sub, w], i) => {
      const a = (-90 + i * (360 / src.length)) * Math.PI / 180;
      const x = C + R * Math.cos(a), y = C + R * Math.sin(a);
      const weak = name === "Your website";
      el("path", { d: `M${x} ${y} Q${C + (x - C) * 0.35 + 20} ${C + (y - C) * 0.35 - 20} ${C} ${C}`, class: "ln" + (weak ? " weak" : ""), "stroke-width": w, style: `animation-delay:${-i * 0.2}s` }, lines);
      const g = el("g", { class: "node" + (weak ? " weak" : "") }, nodes);
      el("circle", { cx: x, cy: y, r: 46 }, g);
      el("text", { x, y: y - 2 }, g).textContent = name;
      el("text", { x, y: y + 16, class: "w" }, g).textContent = sub;
    });
    const core = el("g", { class: "core" }, web);
    el("circle", { cx: C, cy: C, r: 74, class: "halo" }, core);
    el("circle", { cx: C, cy: C, r: 74 }, core);
    el("text", { x: C, y: C + 7 }, core).textContent = "AI answer";
  }

  /* ---- Feeder network (engine stop 3) ---- */
  const fd = $("#feeder");
  if (fd) {
    const hub = { x: 300, y: 180, w: 170, h: 56, label: "yourbrand.com" };
    const ai = { x: 500, y: 180, w: 130, h: 56, label: "AI answers" };
    const feeds = [
      { x: 86, y: 48, label: "Niche blog", k: "feeder site" }, { x: 86, y: 136, label: "Comparison site", k: "feeder site" },
      { x: 86, y: 224, label: "City guide", k: "feeder site" }, { x: 86, y: 312, label: "Newsletter", k: "owned list" },
      { x: 300, y: 48, label: "WhatsApp channel", k: "owned channel" }, { x: 300, y: 312, label: "YouTube series", k: "owned channel" },
    ];
    const lg = el("g", {}, fd), ng = el("g", {}, fd);
    feeds.forEach((f, i) => {
      el("path", { d: `M${f.x + 60} ${f.y} C${(f.x + hub.x) / 2 + 20} ${f.y} ${(f.x + hub.x) / 2 - 20} ${hub.y} ${hub.x - hub.w / 2} ${hub.y}`, class: "ln", style: `animation-delay:${-i * 0.25}s` }, lg);
      el("path", { d: `M${f.x + 60} ${f.y} C${f.x + 240} ${f.y} ${ai.x - 120} ${ai.y} ${ai.x - ai.w / 2} ${ai.y}`, class: "ln", style: `opacity:.25;animation-delay:${-i * 0.3}s` }, lg);
      const g = el("g", { class: "fnode", style: `transition-delay:${0.3 + i * 0.12}s` }, ng);
      el("rect", { x: f.x - 78, y: f.y - 27, width: 156, height: 54, rx: 12 }, g);
      el("text", { x: f.x, y: f.y - 5, class: "k" }, g).textContent = f.k;
      el("text", { x: f.x, y: f.y + 15 }, g).textContent = f.label;
    });
    el("path", { d: `M${hub.x + hub.w / 2} ${hub.y} L${ai.x - ai.w / 2} ${ai.y}`, class: "ln ai" }, lg);
    [[hub, "fnode hub"], [ai, "fnode aio"]].forEach(([n, cls], i) => {
      const g = el("g", { class: cls, style: `transition-delay:${0.1 + i}s` }, ng);
      el("rect", { x: n.x - n.w / 2, y: n.y - n.h / 2, width: n.w, height: n.h, rx: 14 }, g);
      el("text", { x: n.x, y: n.y + 5, "text-anchor": "middle" }, g).textContent = n.label;
    });
  }

  /* ---- Problem chart: draws with scroll ---- */
  const chart = $("#chart");
  if (chart) {
    const paid = $(".chart__paid", chart), org = $(".chart__org", chart);
    const draw = (p) => {
      chart.style.setProperty("--d", (1200 * (1 - clamp(p / 0.55))).toFixed(1));
      chart.style.setProperty("--d2", (900 * (1 - clamp((p - 0.15) / 0.8))).toFixed(1));
      chart.style.setProperty("--s", clamp((p - 0.42) / 0.1).toFixed(2));
      chart.style.setProperty("--l", clamp((p - 0.6) / 0.15).toFixed(2));
    };
    if (hasST && !reduced) ScrollTrigger.create({ trigger: chart, start: "top 85%", end: "bottom 35%", scrub: true, onUpdate: (st) => draw(st.progress) });
    else draw(1);
  }

  /* ---- Funnel counters when its stop is seen ---- */
  const nums = $$(".funnel b[data-count]");
  if (nums.length) new IntersectionObserver((en, o) => en.forEach((e) => {
    if (!e.isIntersecting) return; o.disconnect();
    nums.forEach((b, i) => {
      const to = +b.dataset.count, t0 = performance.now() + 400 + i * 220;
      const tick = (now) => { const k = clamp((now - t0) / 1400), v = Math.round(to * (1 - Math.pow(1 - k, 3))); b.textContent = v.toLocaleString("en-IN"); if (k < 1) requestAnimationFrame(tick); };
      if (reduced) b.textContent = to.toLocaleString("en-IN"); else requestAnimationFrame(tick);
    });
  }), { threshold: 0.4 }).observe($(".funnel"));
}
