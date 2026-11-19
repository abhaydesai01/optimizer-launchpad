// The platform film: eight scenes about why AI marketing runs on data, scrubbed by scroll.
// Each scene is drawn in code (product views recreated with a fictional brand), and its build is tied to scroll progress t (0..1).
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t) => t * t * (3 - 2 * t);
const seg = (t, a, b) => ease(clamp((t - a) / (b - a)));
const h = (html) => { const tp = document.createElement("template"); tp.innerHTML = html.trim(); return tp.content.firstElementChild; };
const h_ = h;
const ENG = ["ChatGPT", "Gemini", "Claude", "Perplexity", "AI Overviews", "Copilot", "Grok", "Kimi"];

/* a real product screen in a window; the camera glides and zooms between panels as t moves (0..1) */
function shot(title, img, w, h, keys) {
  const el = h_(`<div class="pv pv--shot" data-tag="Real product screens · brand names blurred">
    <div class="ps"><div class="ps__bar"><i></i><i></i><i></i><span>app.optimizer360.ai · <b>${title}</b></span></div>
      <div class="ps__vp"><div class="ps__cv"><img alt="" decoding="async" loading="lazy" src="/assets/platform/real/${img}.webp" width="${w}" height="${h}"></div>
        <div class="ps__spot"></div><p class="ps__lab"></p></div></div></div>`);
  const vp = el.querySelector(".ps__vp"), cv = el.querySelector(".ps__cv"), im = el.querySelector("img"), spot = el.querySelector(".ps__spot"), lab = el.querySelector(".ps__lab"), tb = el.querySelector(".ps__bar b");
  let curImg = img;
  const lerp = (a, b, k) => a + (b - a) * k;
  return { el, up(t) {
    let i = 0; while (i < keys.length - 1 && t > keys[i + 1].t) i++;
    // hold on each panel for a moment, then glide to the next
    const A = keys[i], B = keys[Math.min(i + 1, keys.length - 1)], span = B.t - A.t, hold = Math.min(0.09, span * 0.32);
    const k = B === A ? 0 : ease(clamp((t - A.t - hold) / Math.max(0.01, span - 2 * hold)));
    const src = (k > .5 ? B : A).img || img;
    if (src !== curImg) { curImg = src; const K = k > .5 ? B : A; im.src = `/assets/platform/real/${src}.webp`; im.width = K.w || w; im.height = K.h || h; tb.textContent = K.title || title; }
    const ratio = (im.height || h) / (im.width || w), VW = vp.clientWidth, VH = vp.clientHeight;
    const S = lerp(A.s, B.s, k), cx = lerp(A.cx, B.cx, k), cy = lerp(A.cy, B.cy, k), IW = VW * S, IH = VW * ratio * S;
    let tx = VW / 2 - cx * IW, ty = VH / 2 - cy * IH;
    tx = IW > VW ? clamp(tx, VW - IW, 0) : (VW - IW) / 2; ty = IH > VH ? clamp(ty, VH - IH, 0) : (VH - IH) / 2;
    cv.style.transform = `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) scale(${S.toFixed(4)})`; cv.style.width = `${VW}px`;
    const K = k > .55 ? B : A, near = k > .55 ? k : 1 - k;
    if (K.r && near > .55) {
      const [rx, ry, rw, rh] = K.r;
      spot.style.cssText = `left:${(tx + rx * IW).toFixed(1)}px;top:${(ty + ry * IH).toFixed(1)}px;width:${(rw * IW).toFixed(1)}px;height:${(rh * IH).toFixed(1)}px`;
      el.classList.add("is-spot"); lab.textContent = K.l || "";
    } else el.classList.remove("is-spot");
  } };
}

/* ---------------------------------------------------------------- scenes: build() returns update(t) */
const SCENES = [
  // 0 · hero: the field carries it
  () => ({ el: h(`<div class="pv pv--hero"><div class="pv-orb"><span>?</span></div><p class="pv-hero__q">"Which builder in Pune can I trust?"</p></div>`), up() {} }),

  // 1 · the black box
  () => {
    const el = h(`<div class="pv pv--box">
      <div class="pv-qs">${["Best builders in Pune?", "Is Aurelia Homes reliable?", "3BHK with possession by 2027?", "Aurelia vs Skyline?", "Who delivers on time?"].map((q, i) => `<span style="--i:${i}">${q}</span>`).join("")}</div>
      <div class="pv-cube"><div class="pv-cube__in"><i class="f1"></i><i class="f2"></i><i class="f3"></i><i class="f4"></i><i class="f5"></i><i class="f6"></i></div><b>?</b></div>
      <div class="pv-out"><em>AI answer</em><p>Buyers often shortlist <b>Skyline Homes</b>, <b>Harbour Realty</b> and <b>Vertex</b>.</p></div>
      <ul class="pv-missing"><li>Ranking</li><li>Search volume</li><li>Dashboard</li></ul></div>`);
    const miss = [...el.querySelectorAll(".pv-missing li")];
    return { el, up(t) { miss.forEach((m, i) => m.classList.toggle("on", t > 0.25 + i * 0.18)); el.style.setProperty("--t", t); } };
  },

  // 2 · ask at scale: the prompt × engine matrix fills
  () => {
    const COLS = 40;
    const el = h(`<div class="pv pv--grid"><div class="pv-count"><strong>0</strong><span>questions asked today</span></div>
      <div class="pv-mx">${ENG.map((e) => `<div class="pv-row"><span>${e}</span><div>${"<i></i>".repeat(COLS)}</div></div>`).join("")}</div>
      <p class="pv-cap">8 engines × up to 10,000 prompts, per brand, every day</p></div>`);
    const dots = [...el.querySelectorAll(".pv-mx i")], num = el.querySelector(".pv-count strong");
    const order = dots.map((_, i) => i).sort((a, b) => ((a * 7919) % 97) - ((b * 7919) % 97));
    return { el, up(t) { const n = Math.round(seg(t, 0.05, 0.85) * dots.length); order.forEach((d, k) => dots[d].classList.toggle("on", k < n)); num.textContent = Math.round(seg(t, 0.05, 0.85) * 10000).toLocaleString("en-IN"); } };
  },

  // 3 · every answer, on record: the real Overview screen
  () => shot("Overview", "overview", 1628, 961, [
    { t: 0, cx: .5, cy: .5, s: 1 },
    { t: .3, cx: .29, cy: .46, s: 1.75, r: [.01, .23, .55, .45], l: "One score, built from every stored answer" },
    { t: .62, cx: .78, cy: .46, s: 1.85, r: [.565, .23, .43, .45], l: "Where you're named, engine by engine" },
    { t: .92, cx: .5, cy: .85, s: 1.5, r: [0, .74, 1, .21], l: "Citation rate, share of voice, sentiment, mentions" },
  ]),

  // 4 · where engines look: the real fan-out screen
  () => shot("Prompt Intelligence · Fan-out", "fanout", 1628, 965, [
    { t: 0, cx: .5, cy: .5, s: 1 },
    { t: .32, cx: .5, cy: .29, s: 1.45, r: [0, .2, 1, .18], l: "250 tracked prompts, 2,264 fan-out searches" },
    { t: .66, cx: .5, cy: .56, s: 1.55, r: [.01, .42, .98, .28], l: "Used your site, saw it and skipped it, never found it" },
    { t: .95, cx: .8, cy: .82, s: 1.7, r: [.6, .68, .4, .32], l: "Whose pages the engines quote instead" },
  ]),

  // 5 · the competition: the real position heatmap
  () => shot("Competitor arena · Position heatmap", "arena", 1628, 1002, [
    { t: 0, cx: .5, cy: .5, s: 1 },
    { t: .35, cx: .3, cy: .5, s: 1.5, r: [0, .08, .48, .9], l: "Every prompt, every engine" },
    { t: .7, cx: .42, cy: .5, s: 1.9, r: [.35, .12, .13, .87], l: "You: mentioned, cited, ranked" },
    { t: .95, cx: .72, cy: .5, s: 1.5, r: [.48, .12, .52, .87], l: "Every rival, on the same questions" },
  ]),

  // 6 · foundations: the real crawler and Brand Brain screens
  () => shot("Crawlers & site readiness", "crawlers", 1628, 960, [
    { t: 0, cx: .5, cy: .5, s: 1 },
    { t: .28, cx: .5, cy: .66, s: 1.6, r: [0, .58, 1, .16], l: "Which AI bots really fetch your pages" },
    { t: .55, cx: .22, cy: .86, s: 2, r: [0, .75, .43, .25], l: "Verified, or spoofed" },
    { t: .78, img: "brain", w: 1628, h: 1003, title: "Brand Brain", cx: .5, cy: .2, s: 1.35, r: [0, .13, 1, .13], l: "The facts every draft must keep" },
    { t: 1, img: "brain", w: 1628, h: 1003, title: "Brand Brain", cx: .5, cy: .45, s: 1, r: null },
  ]),

  // 7 · from data to action: ranked, then shipped
  () => {
    const A = [["Publish RERA numbers on every project page", 92, "Wk 2"], ["Answer-first buyer guide: possession dates", 84, "Wk 3"], ["Fix Google Business Profiles, all sites", 71, "Wk 4"], ["Earn three trade-press citations", 63, "Wk 7"], ["Reply in public to 40 reviews", 55, "Wk 8"]];
    const el = h(`<div class="pv pv--act"><div class="pv-acts">${A.map(([a, s, w]) => `<div class="pv-a"><p>${a}</p><span class="pv-imp"><i style="--v:${s}"></i></span><b class="pv-st">Shipped · ${w}</b></div>`).join("")}</div>
      <div class="pv-tl">${Array.from({ length: 10 }, (_, i) => `<span>Wk ${i + 1}</span>`).join("")}<i class="pv-tl__fill"></i></div></div>`);
    const rows = [...el.querySelectorAll(".pv-a")], fill = el.querySelector(".pv-tl__fill");
    return { el, up(t) { rows.forEach((r, i) => { r.classList.toggle("on", t > 0.05 + i * 0.07); r.classList.toggle("done", t > 0.45 + i * 0.1); }); fill.style.width = `${seg(t, 0.4, 0.95) * 100}%`; } };
  },

  // 8 · the outcome: the score climbs (the real case: 32% → 58%)
  () => {
    const el = h(`<div class="pv pv--out"><div class="pv-g"><svg viewBox="0 0 240 140"><path class="trk" d="M20 124 A100 100 0 0 1 220 124"/><path class="val" d="M20 124 A100 100 0 0 1 220 124" pathLength="100"/></svg><div class="pv-g__n"><strong>32%</strong><span>Week 1</span></div></div>
      <div class="pv-eb">${ENG.map((e, i) => `<p><span>${e}</span><i style="--a:${[22, 30, 18, 26, 34, 14, 20, 12][i]};--b:${[48, 61, 40, 55, 66, 38, 47, 33][i]}"></i></p>`).join("")}</div>
      <p class="pv-cap">Every number comes from stored answers. Nothing is estimated.</p></div>`);
    const val = el.querySelector(".val"), n = el.querySelector(".pv-g__n strong"), lab = el.querySelector(".pv-g__n span"), bars = [...el.querySelectorAll(".pv-eb i")];
    return { el, up(t) { const v = seg(t, 0.1, 0.8), s = 32 + 26 * v; val.style.strokeDasharray = `${s} 100`; n.textContent = `${Math.round(s)}%`; lab.textContent = v > 0.98 ? "Month 2.5" : v < 0.02 ? "Week 1" : "Measured weekly"; bars.forEach((b) => b.style.setProperty("--v", v)); } };
  },
];

/* ---------------------------------------------------------------- the data field behind everything */
function field(cv, getP) {
  const ctx = cv.getContext("2d"); let W, H, pts = [], mx = -1e3, my = -1e3, raf = 0, on = false;
  const size = () => { const d = Math.min(devicePixelRatio || 1, 2); W = cv.clientWidth; H = cv.clientHeight; cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0); const n = Math.round((W * H) / 9000); pts = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25 })); };
  cv.parentElement.addEventListener("pointermove", (e) => { const r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; });
  const draw = () => {
    const p = getP(); ctx.clearRect(0, 0, W, H);
    const link = 90 + p * 40, night = document.documentElement.dataset.theme === "night", rgb = night ? "111,216,155" : "30,127,86", alpha = (night ? 0.18 : 0.14) + p * (night ? 0.25 : 0.16);
    for (const a of pts) { a.x += a.vx; a.y += a.vy; if (a.x < 0 || a.x > W) a.vx *= -1; if (a.y < 0 || a.y > H) a.vy *= -1; const dx = a.x - mx, dy = a.y - my, d = Math.hypot(dx, dy); if (d < 120) { a.x += dx / d; a.y += dy / d; } }
    ctx.lineWidth = 0.6;
    for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) { const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y); if (d < link) { ctx.strokeStyle = `rgba(${rgb},${(1 - d / link) * alpha})`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); } }
    ctx.fillStyle = `rgba(${rgb},${night ? .7 : .5})`; for (const a of pts) { ctx.beginPath(); ctx.arc(a.x, a.y, 1.3, 0, 7); ctx.fill(); }
    if (on) raf = requestAnimationFrame(draw);
  };
  size(); addEventListener("resize", size);
  new IntersectionObserver((e) => { on = e[0].isIntersecting; if (on) raf = requestAnimationFrame(draw); else cancelAnimationFrame(raf); }).observe(cv);
}

export function initPlatformFilm() {
  const root = document.querySelector(".pf"); if (!root) return;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const chs = [...root.querySelectorAll(".pf-ch")], vis = root.querySelector(".pf__vis"), rail = [...root.querySelectorAll(".pf__rail a")];
  const scenes = SCENES.map((f) => f()); scenes.forEach((s) => vis.append(s.el));
  scenes[0].el.dataset.tag = ""; scenes[8].el.dataset.tag = "Real result from one programme · per-engine split illustrative";
  const N = chs.length, tag = root.querySelector(".pf__tag"), defTag = tag.textContent;
  let P = 0, cur = -1;
  if (reduced) { root.classList.add("is-static"); scenes.forEach((s) => s.up(1)); chs.forEach((c) => c.classList.add("on")); return; }
  const frame = () => {
    const r = root.getBoundingClientRect(), total = Math.max(1, root.offsetHeight - innerHeight);
    P = clamp(-r.top / total) * (N - 0.001);
    const i = Math.floor(P), t = P - i;
    if (i !== cur) { cur = i; chs.forEach((c, k) => c.classList.toggle("on", k === i)); scenes.forEach((s, k) => s.el.classList.toggle("on", k === i)); { const tg = scenes[i].el.dataset.tag; tag.textContent = tg === undefined ? defTag : tg; } rail.forEach((a, k) => { a.classList.toggle("on", k === i); a.classList.toggle("past", k < i); }); }
    scenes[i].up(clamp(t * 1.15));
    root.style.setProperty("--pp", (P / (N - 1)).toFixed(3));
  };
  let q = false; addEventListener("scroll", () => { if (!q) { q = true; requestAnimationFrame(() => { q = false; frame(); }); } }, { passive: true });
  addEventListener("resize", frame); frame();
  rail.forEach((a, k) => a.addEventListener("click", (e) => { e.preventDefault(); const total = root.offsetHeight - innerHeight; scrollTo({ top: root.getBoundingClientRect().top + scrollY + (k + 0.45) / N * total, behavior: "smooth" }); }));
  field(root.querySelector(".pf__field"), () => P / (N - 1));
}
