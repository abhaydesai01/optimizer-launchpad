// v8: the door (Higgsfield frames scrubbed by scroll) and the Optimizer GEO tool walkthrough.
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/* ---------- the door: six things to own, one way in ----------
   Each mode has its own world: white marble gate by day, the dark ring (the logo mark) at dusk.
   Both end in the same hall of six doors, then door one opens into zone 1. */
const F = "assets/film/frames/";
const TIMELINE = {
  paper: [
    { clip: "g1-gate", len: 1, beat: "approach" },
    { clip: "g2-agent", len: 1, beat: "agent" },
    { clip: "g3-through", len: 0.9, beat: "through" },
    { clip: "g-vision-hall", len: 1, beat: "hall" },
    { clip: "g-vision-hall", len: 1.3, hold: true, beat: "doors" },
    { clip: "g-zone1-door", len: 1, beat: "door" },
    { clip: "g-zone1-door", len: 0.7, hold: true, beat: "door" },
  ],
  night: [
    { clip: "m1-approach", len: 1, beat: "approach" },
    { still: "assets/gate/a1-agent.webp", len: 1, beat: "agent" },
    { clip: "m2-door", len: 0.9, beat: "through" },
    { clip: "g-vision-hall", len: 1, beat: "hall" },
    { clip: "g-vision-hall", len: 1.3, hold: true, beat: "doors" },
    { clip: "g-zone1-door", len: 1, beat: "door" },
    { clip: "g-zone1-door", len: 0.7, hold: true, beat: "door" },
  ],
};
const N = 61;

export function initGate(sec, { reduced = false } = {}) {
  if (!sec) return;
  const stage = $(".gate__stage", sec), canvas = $(".gate__film", sec), ctx = canvas.getContext("2d");
  const doors = $(".gate__doors", sec), beats = $$("[data-beat]", sec);
  const cache = new Map(); // src -> Image (loaded)
  let theme = "", plan = [], total = 1, queued = false, loading = false, lastSrc = "";

  const src = (seg, k) => seg.still || `${F}${seg.clip}/f_${String(k + 1).padStart(3, "0")}.webp`;
  function load(s) {
    if (cache.has(s)) return;
    const im = new Image(); im.decoding = "async"; cache.set(s, null);
    im.onload = () => { cache.set(s, im); ask(); };
    im.src = s;
  }
  function preload() {
    if (loading) return; loading = true;
    // first and last frame of every segment first, so any scroll position has a picture, then everything
    const segs = plan.filter((p) => !p.hold);
    segs.forEach((p) => { load(src(p, 0)); load(src(p, N - 1)); });
    let i = 0; const all = [];
    segs.forEach((p) => { if (p.still) return; for (let k = 1; k < N - 1; k++) all.push(src(p, k)); });
    const pump = () => { for (let n = 0; n < 6 && i < all.length; n++) load(all[i++]); if (i < all.length) setTimeout(pump, 40); };
    pump();
  }
  function setup() {
    theme = document.documentElement.dataset.theme === "night" ? "night" : "paper";
    let t = 0; plan = TIMELINE[theme].map((p) => { const o = { ...p, t0: t }; t += p.len; o.t1 = t; return o; });
    total = t; loading = false; lastSrc = "";
    sec.style.setProperty("--gate-units", total);
    // beat ranges: merge neighbours with the same beat
    beats.forEach((b) => { const r = plan.filter((p) => p.beat === b.dataset.beat); b._r = r.length ? [r[0].t0, r[r.length - 1].t1] : [-1, -1]; });
    const r = sec.getBoundingClientRect();
    if (r.top < innerHeight * 2.5 && r.bottom > -innerHeight) preload();
  }
  function size() {
    const dpr = Math.min(devicePixelRatio || 1, 1.6), w = stage.clientWidth, h = stage.clientHeight;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    // the cover box of a 16:9 frame, so door labels sit on the doors
    const ar = 1600 / 894, bw = Math.max(w, h * ar), bh = bw / ar;
    doors.style.cssText = `left:${(w - bw) / 2}px;top:${(h - bh) / 2}px;width:${bw}px;height:${bh}px`;
    lastSrc = ""; ask();
  }
  function pick(u) {
    const seg = plan.find((p) => u >= p.t0 && u < p.t1) || plan[plan.length - 1];
    const f = clamp((u - seg.t0) / seg.len);
    if (seg.still) return { s: seg.still, zoom: 1.02 + f * 0.06 };
    const k = seg.hold ? N - 1 : Math.min(N - 1, Math.floor(f * N));
    // nearest loaded frame
    for (let d = 0; d < N; d++) {
      for (const kk of [k - d, k + d]) { if (kk < 0 || kk >= N) continue; const s = src(seg, kk); if (cache.get(s)) return { s, zoom: 1 }; }
    }
    return null;
  }
  function draw(pk) {
    if (!pk) return;
    const key = pk.s + pk.zoom.toFixed(3); if (key === lastSrc) return; lastSrc = key;
    const im = cache.get(pk.s), cw = canvas.width, ch = canvas.height;
    const sc = Math.max(cw / im.naturalWidth, ch / im.naturalHeight) * pk.zoom;
    const w = im.naturalWidth * sc, h = im.naturalHeight * sc;
    ctx.drawImage(im, (cw - w) / 2, (ch - h) / 2, w, h);
  }
  function frame() {
    queued = false;
    const r = sec.getBoundingClientRect();
    if (r.top < innerHeight * 2.5 && r.bottom > -innerHeight) preload();
    if (r.bottom < 0 || r.top > innerHeight) return;
    const p = clamp(-r.top / Math.max(1, r.height - innerHeight));
    const u = p * total * 0.9999;
    draw(pick(u));
    beats.forEach((b) => {
      const [a, z] = b._r, span = z - a, fin = a === 0 ? 1 : clamp((u - a) / (span * 0.18)), fout = z >= total ? 1 : clamp((z - u) / (span * 0.16));
      const o = u >= a && u < z ? Math.min(fin, fout) : 0;
      b.style.opacity = o.toFixed(3);
      b.style.transform = `translateY(${((1 - fin) * 26).toFixed(1)}px)`;
      b.style.visibility = o > 0.01 ? "visible" : "hidden";
    });
    const dr = plan.find((x) => x.beat === "doors");
    doors.classList.toggle("on", !!dr && u >= dr.t0 + 0.05 && u < dr.t1);
  }
  const ask = () => { if (!queued) { queued = true; requestAnimationFrame(frame); } };

  setup(); size();
  addEventListener("scroll", ask, { passive: true });
  addEventListener("resize", size);
  new MutationObserver(() => { setup(); ask(); }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
}

/* ---------- inside the tool: five views, explained beside the screen ---------- */
export function initTool(sec, { reduced = false } = {}) {
  if (!sec) return;
  const btns = $$(".app__nav button", sec), views = $$(".app__view", sec), notes = $$(".tool__note", sec);
  let cur = -1, timer = 0, auto = !reduced, seen = false;
  // v22: the notes are a numbered list of the five views beside the screen; the open one explains the view on screen
  const list = $(".tool__notes", sec);
  notes.forEach((n, k) => {
    n.hidden = false; n.dataset.n = String(k + 1).padStart(2, "0");
    n.setAttribute("role", "button"); n.tabIndex = 0;
    const pick = () => { auto = false; clearInterval(timer); sec.classList.remove("is-auto"); show(k); };
    n.addEventListener("click", pick);
    n.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(); } });
  });
  if (list) list.classList.add("is-steps");
  if (auto) sec.classList.add("is-auto");
  function show(i) {
    if (i === cur) return; cur = i;
    btns.forEach((b, k) => b.setAttribute("aria-pressed", String(k === i)));
    views.forEach((v, k) => { v.hidden = k !== i; v.classList.remove("is-in"); });
    notes.forEach((n, k) => { n.classList.toggle("is-on", k === i); n.classList.toggle("is-past", k < i); n.setAttribute("aria-expanded", String(k === i)); });
    requestAnimationFrame(() => requestAnimationFrame(() => views[i].classList.add("is-in")));
  }
  const next = () => { show((cur + 1) % views.length); };
  const loop = () => { clearInterval(timer); if (auto && seen) timer = setInterval(next, 7000); };
  btns.forEach((b, k) => b.addEventListener("click", () => { auto = false; clearInterval(timer); sec.classList.remove("is-auto"); show(k); }));
  new IntersectionObserver((en) => en.forEach((e) => { seen = e.isIntersecting; sec.classList.toggle("is-seen", seen); if (seen && cur < 0) show(0); if (seen && cur >= 0) views[cur].classList.add("is-in"); loop(); }), { threshold: 0.3 }).observe($(".app", sec));
  show(0);
}

/* ---------- case studies: the score bar grows when it comes into view ---------- */
export function initCases(sec) {
  if (!sec) return;
  const io = new IntersectionObserver((en) => en.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }), { threshold: 0.4 });
  $$(".cs__hero", sec).forEach((h) => io.observe(h));
}
