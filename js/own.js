// v6: the hero ("rented growth") and the six "own it" chapters, drawn in code.
// Every chapter has a small timed scene (reviews popping, sources feeding, a chat, a traced deal)
// that plays while the chapter is on screen. No footage.
import { ringSVG } from "./cinema.js";

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => t * t * (3 - 2 * t);
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const fmt = (v, d = 0) => v.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

/* ---------- a scene in two phases, driven by scroll ----------
   phase 1 · "in the real world": the real public pages (.rw, [data-rw]) pop in and STAY while the reader is there
   phase 2 · the coded illustration plays on its own clock (data-on / data-off / data-on2 seconds, data-cls="name@t", data-num) and loops
   phase 0 · off */
export function makeScene(root, { reduced = false } = {}) {
  const all = [root, ...$$("*", root)];
  const isRw = (el) => el !== root && (el.hasAttribute("data-rw") || !!el.closest(".rw"));
  const rwSteps = [], scSteps = [];
  all.forEach((el) => {
    const d = el.dataset, rw = isRw(el), list = rw ? rwSteps : scSteps;
    if (d.on !== undefined) list.push({ t: +d.on, el, cls: "on", add: true });
    if (d.on2 !== undefined) list.push({ t: +d.on2, el, cls: "on2", add: true });
    if (d.off !== undefined && !rw) list.push({ t: +d.off, el, cls: "on", add: false });
  });
  (root.dataset.cls || "").split(/\s+/).filter(Boolean).forEach((c) => {
    const [cls, t] = c.split("@"); scSteps.push({ t: +t, el: root, cls, add: true });
  });
  rwSteps.sort((a, b) => a.t - b.t); scSteps.sort((a, b) => a.t - b.t);
  const nums = $$("[data-num]", root).map((el) => {
    const [from, to, start, dur, dec] = el.dataset.num.split(",").map(Number);
    return { el, from, to, start, dur, dec: dec || 0 };
  });
  const len = +(root.dataset.len || 9);
  const hasRw = rwSteps.length > 0;
  const classes = [...new Set([...rwSteps, ...scSteps].map((s) => s.cls))];
  let timers = [], raf = 0, phase = 0, t0 = 0;

  const reset = () => {
    all.forEach((el) => classes.forEach((c) => el.classList.remove(c)));
    nums.forEach((n) => (n.el.textContent = fmt(n.from, n.dec)));
  };
  const tick = () => {
    const t = (performance.now() - t0) / 1000;
    let busy = false;
    nums.forEach((n) => {
      const f = clamp((t - (n.cs ?? n.start)) / (n.cd ?? n.dur));
      if (f < 1) busy = true;
      n.el.textContent = fmt(lerp(n.from, n.to, easeOut(f)), n.dec);
    });
    if (busy && phase === 2) raf = requestAnimationFrame(tick);
  };
  // the film tells each scene step by step; a reader scrolling gets the whole picture at once, in a quick cascade
  const filmMode = () => document.documentElement.classList.contains("is-filmmode");
  const playRw = () => {
    if (filmMode()) return rwSteps.forEach((s) => timers.push(setTimeout(() => s.el.classList.toggle(s.cls, s.add), s.t * 1000)));
    rwSteps.filter((s) => s.add).forEach((s, i) => timers.push(setTimeout(() => s.el.classList.add(s.cls), i * 160)));
  };
  // the scene's end state, revealed element by element (only what is still on screen at the end of the story)
  const finalCls = new Map();
  scSteps.forEach((s) => { const c = finalCls.get(s.el) || new Set(); s.add ? c.add(s.cls) : c.delete(s.cls); finalCls.set(s.el, c); });
  // the plan, in story order: each element pops on one quick beat; a scene-wide change (reviews turning good,
  // merging into the answer) waits a short hold so the reader sees what it changes
  const plan = [], seen = new Set();
  scSteps.forEach((s) => {
    if (!s.add || !finalCls.get(s.el).has(s.cls)) return;
    if (s.el === root) plan.push({ root: s.cls });
    else if (!seen.has(s.el)) { seen.add(s.el); plan.push({ el: s.el }); }
  });
  const playFast = () => {
    const gap = Math.min(130, 2000 / Math.max(1, seen.size));
    let t = 0;
    plan.forEach((p) => {
      t += p.root ? 900 : gap;
      timers.push(setTimeout(() => (p.root ? root.classList.add(p.root) : finalCls.get(p.el).forEach((c) => p.el.classList.add(c))), t));
    });
    t0 = performance.now();
    nums.forEach((n) => { n.cs = 0; n.cd = Math.min(n.dur, 1.2); });
    if (nums.length) raf = requestAnimationFrame(tick);
  };
  const playScene = () => {
    t0 = performance.now();
    nums.forEach((n) => { n.cs = n.start; n.cd = n.dur; });
    scSteps.forEach((s) => timers.push(setTimeout(() => s.el.classList.toggle(s.cls, s.add), s.t * 1000)));
    if (nums.length) raf = requestAnimationFrame(tick);
    // hold the final frame, then replay
    timers.push(setTimeout(() => { reset(); timers.push(setTimeout(playScene, 700)); }, (len + 4.5) * 1000));
  };
  const stop = () => { timers.forEach(clearTimeout); timers = []; cancelAnimationFrame(raf); };

  if (reduced) { scSteps.forEach((s) => s.el.classList.toggle(s.cls, s.add)); nums.forEach((n) => (n.el.textContent = fmt(n.to, n.dec))); }
  return {
    setPhase(ph) {
      if (reduced) return;
      if (ph === 1 && !hasRw) ph = 2;
      if (ph === phase) return;
      phase = ph; stop(); reset();
      if (ph === 1) timers.push(setTimeout(playRw, 40));
      if (ph === 2) timers.push(setTimeout(filmMode() ? playScene : playFast, 120));
    },
    setActive(on) { this.setPhase(on ? 2 : 0); },
  };
}

/* ---------- hero: the ad budget is on, traffic climbs, the budget stops, traffic falls ---------- */
export function initHero(sec) {
  if (!sec) return;
  const copy = $("#hero-copy"), rent = $("#rent"), turn = $(".herox__turn", sec), n = $("#rent-n"), em = $(".rent__switch em", sec);
  let off = null, queued = false;
  liquidGlass(rent);
  // liquid glass: the specular highlight on the card's rim follows the light (the pointer)
  if (matchMedia("(pointer: fine)").matches) addEventListener("pointermove", (e) => {
    const b = rent.getBoundingClientRect(); if (!b.width) return;
    rent.style.setProperty("--lx", `${clamp((e.clientX - b.left) / b.width, -0.2, 1.2) * 100}%`);
    rent.style.setProperty("--ly", `${clamp((e.clientY - b.top) / b.height, -0.2, 1.2) * 100}%`);
  }, { passive: true });
  function frame() {
    queued = false;
    const r = sec.getBoundingClientRect();
    const s = clamp(-r.top / Math.max(1, r.height - innerHeight));
    const wide = innerWidth > 1080;

    const co = 1 - clamp((s - 0.07) / 0.13);
    copy.style.opacity = co.toFixed(3);
    copy.style.transform = `translateY(${((1 - co) * -40).toFixed(1)}px)`;
    copy.style.pointerEvents = co < 0.4 ? "none" : "";

    const m = ease(clamp((s - 0.08) / 0.2));
    const out = clamp((s - 0.585) / 0.055);
    // v22: on wide screens the card glides to the left column and stays there; the 3D field plays on the right
    const big = Math.min(1.22, (innerHeight - 150) / 470);
    const sc = (wide ? lerp(0.82, big, m) : lerp(0.9, 1, m)) * (1 - out * 0.06);
    const edge = Math.max(32, Math.min(innerWidth * 0.06, 120));
    const leftX = edge + (rent.offsetWidth * big) / 2 - innerWidth / 2; // px: the card's left edge on the page margin
    const tx = wide ? lerp(innerWidth * 0.27, leftX, m) : 0;
    rent.style.transform = `translate(-50%, -50%) translateX(${tx.toFixed(1)}px) scale(${sc.toFixed(3)})`;
    rent.style.opacity = ((wide ? 1 : m) * (1 - out)).toFixed(3);

    const isOff = s >= 0.42;
    if (isOff !== off) { off = isOff; rent.classList.toggle("is-off", isOff); em.textContent = isOff ? "Off" : "On"; }
    const f = clamp((s - 0.42) / 0.12);
    rent.style.setProperty("--fall", (1 - f).toFixed(3));
    n.textContent = fmt(Math.round(lerp(12480, 212, easeOut(f))));

    const tn = clamp((s - 0.63) / 0.08) * (1 - clamp((s - 0.86) / 0.08)); // "Own it" fades as the camera turns to the ring
    turn.style.opacity = tn.toFixed(3);
    // phones: the chapters' title lands inside the ring the hero ends on
    const oi = sec.querySelector(".oxm-intro");
    if (oi) { const v = clamp((s - 0.965) / 0.03); const st = oi.style; st.setProperty("opacity", v.toFixed(3), "important"); st.setProperty("visibility", v > 0.01 ? "visible" : "hidden", "important"); st.setProperty("transform", `translateY(${((1 - v) * 16).toFixed(1)}px)`, "important"); }
    turn.style.transform = `translateY(${((1 - tn) * 30).toFixed(1)}px)`;
  }
  const ask = () => { if (!queued) { queued = true; requestAnimationFrame(frame); } };
  addEventListener("scroll", ask, { passive: true });
  addEventListener("resize", ask);
  frame();
}

/* ---------- the six chapters ---------- */
export function initOwn(sec, { reduced = false } = {}) {
  if (!sec) return;
  if (matchMedia("(max-width: 760px)").matches) return initOwnStack(sec, { reduced });
  const intro = $(".ownx__intro", sec), outro = $(".ownx__outro", sec), mark = $(".ownx__mark", sec), label = $(".ownx__marklabel", sec);
  const chapters = $$(".ox", sec);
  const scenes = chapters.map((c) => makeScene($(".sc", c), { reduced }));
  mark.insertAdjacentHTML("afterbegin", ringSVG("rg"));
  $(".ownx__ring", sec).insertAdjacentHTML("afterbegin", ringSVG("rg rg--full"));
  const segs = $$(".rg__fill", mark);
  const PRE = 0.5, N = chapters.length, POST = 0.9, TOTAL = PRE + N + POST;
  const SPLIT = 0.42;
  let queued = false, lastLabel = -1;

  const stage = $(".ownx__stage", sec);
  function frame() {
    queued = false;
    const r = sec.getBoundingClientRect();
    // the chapters overlap the end of the hero; they appear only once they take over the screen
    stage.style.visibility = r.top > 0.5 ? "hidden" : "";
    const onScreen = r.top < innerHeight && r.bottom > 0;
    const u = clamp(-r.top / Math.max(1, r.height - innerHeight)) * TOTAL;

    const io = clamp((u - 0.02) / 0.14) * (1 - clamp((u - 0.3) / 0.15)); // the title arrives inside the ring after the hand-off
    intro.style.opacity = io.toFixed(3);
    intro.style.transform = `translateY(${((1 - io) * -30).toFixed(1)}px)`;
    intro.style.visibility = io > 0.01 ? "visible" : "hidden";

    let cur = 0;
    chapters.forEach((c, i) => {
      const p = u - PRE - i;
      const o = clamp(p / 0.07) * (1 - clamp((p - 0.93) / 0.07));
      c.style.opacity = o.toFixed(3);
      c.style.visibility = o > 0.01 ? "visible" : "hidden";
      c.style.transform = `translateY(${(p < 0.5 ? (1 - clamp(p / 0.07)) * 24 : clamp((p - 0.93) / 0.07) * -24).toFixed(1)}px)`;
      // first part of the chapter: the real pages hold still; the rest: the drawn scene
      scenes[i].setPhase(!onScreen || p <= 0.02 || p >= 0.98 ? 0 : p < SPLIT ? 1 : 2);
      if (p >= 0) cur = i;
      segs[i].style.opacity = clamp(p / 0.9).toFixed(3);
    });
    if (cur !== lastLabel) { lastLabel = cur; label.textContent = `0${cur + 1} / 0${N} · ${chapters[cur].dataset.term}`; }

    const q = u - PRE - N;
    const qo = clamp(q / 0.25);
    outro.style.opacity = qo.toFixed(3);
    outro.style.transform = `translateY(${((1 - qo) * 24).toFixed(1)}px)`;
    sec.style.setProperty("--own-q", clamp(q / 0.5).toFixed(3));
    mark.style.opacity = (clamp((u - PRE + 0.05) / 0.1) * (1 - clamp(q / 0.15))).toFixed(3);
  }
  const ask = () => { if (!queued) { queued = true; requestAnimationFrame(frame); } };
  addEventListener("scroll", ask, { passive: true });
  addEventListener("resize", ask);
  frame();
}

/* ---------- phones: the six chapters as six calm sections, read top to bottom ----------
   Nothing is pinned and nothing overwrites anything. Each chapter: its name and meaning, the real pages in a swipe row
   with one line under them, then the drawn scene in its own card, which plays once when it comes into view and then stays. */
function initOwnStack(sec, { reduced = false } = {}) {
  document.documentElement.classList.add("own-stack");
  const intro = $(".ownx__intro", sec), heroStage = document.querySelector("#top .herox__stage");
  if (intro && heroStage) { intro.classList.add("oxm-intro"); heroStage.append(intro); }
  $(".ownx__ring", sec)?.insertAdjacentHTML("afterbegin", ringSVG("rg rg--full"));
  const el = (tag, cls, html = "") => { const e = document.createElement(tag); e.className = cls; e.innerHTML = html; return e; };
  const head = (k, note) => el("p", "oxm-k", `<span>${k}</span>${note ? `<em>${note}</em>` : ""}`);
  const drop = (n) => n && n.parentNode && n.parentNode.removeChild(n);
  const scenes = [];
  $$(".ox", sec).forEach((c) => {
    const sc = $(".sc", c), body = $(".sc__body", sc), beatBox = $(".sc__beat", sc);
    const beats = beatBox ? $$("span", beatBox) : [];
    const rwBeat = beats.find((b) => b.hasAttribute("data-rw")), last = beats.filter((b) => b !== rwBeat).pop();
    const labels = $$(".sc__label", sc), rwLabel = labels.find((l) => l.hasAttribute("data-rw")), scLabel = labels.find((l) => !l.hasAttribute("data-rw"));
    const rw = $(".rw", sc);
    if (rw) {
      const part = el("div", "oxm-rw");
      part.append(head("In the real world", rwLabel ? rwLabel.textContent.trim() : ""));
      rw.className = "oxm-shots"; ["data-on", "data-off"].forEach((a) => rw.removeAttribute(a));
      $$(".shot", rw).forEach((s) => { s.classList.remove("pop"); s.removeAttribute("data-on"); s.removeAttribute("style"); });
      part.append(rw);
      if (rwBeat) part.append(el("p", "oxm-cap", rwBeat.innerHTML.replace(/<b>[^<]*real world[^<]*<\/b>\s*/i, "")));
      sc.prepend(part);
    }
    const card = el("div", "oxm-card");
    body.before(head(rw ? "How it works for you" : "How it works", scLabel ? scLabel.textContent.trim() : ""));
    body.before(card); card.append(body);
    if (last) card.after(el("p", "oxm-cap", last.innerHTML));
    drop(beatBox); labels.forEach(drop);
    scenes.push([sc, makeScene(sc, { reduced })]);
  });
  const io = new IntersectionObserver((en) => en.forEach((e) => {
    if (!e.isIntersecting) return;
    const s = scenes.find(([sc]) => sc === e.target); if (s) { s[1].setPhase(2); io.unobserve(e.target); }
  }), { threshold: 0.35 });
  scenes.forEach(([sc]) => io.observe(sc));
}

/* ---------- liquid glass: the card bends what is behind it at its rim, like a lens ----------
   A displacement map is drawn for the card's exact shape (rounded rect, bezel 24px) and fed to an SVG filter
   used as a backdrop filter. Chromium only (others keep the frosted glass); never on touch screens. */
function liquidGlass(card) {
  if (!card || !navigator.userAgentData || !matchMedia("(pointer: fine)").matches) return;
  const NS = "http://www.w3.org/2000/svg", R = 30, B = 24;
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("aria-hidden", "true"); svg.setAttribute("width", "0"); svg.setAttribute("height", "0");
  svg.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
  svg.innerHTML = `<filter id="lg-rent" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feImage result="map" preserveAspectRatio="none"/><feDisplacementMap in="SourceGraphic" in2="map" scale="42" xChannelSelector="R" yChannelSelector="G"/></filter>`;
  document.body.append(svg);
  const img = svg.querySelector("feImage");
  function draw() {
    const W = card.offsetWidth, H = card.offsetHeight; if (!W || !H) return;
    const c = document.createElement("canvas"); c.width = W; c.height = H;
    const g = c.getContext("2d"), d = g.createImageData(W, H), px = d.data;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const cx = Math.min(Math.max(x, R), W - R), cy = Math.min(Math.max(y, R), H - R);
      const vx = x - cx, vy = y - cy, l = Math.hypot(vx, vy);
      let dx = 0, dy = 0;
      if (l > 0) { const e = R - l; if (e < B) { const m = Math.pow(1 - Math.max(0, e) / B, 2); dx = (-vx / l) * m; dy = (-vy / l) * m; } }
      const i = (y * W + x) * 4; px[i] = 128 + dx * 127; px[i + 1] = 128 + dy * 127; px[i + 2] = 128; px[i + 3] = 255;
    }
    g.putImageData(d, 0, 0);
    img.setAttribute("href", c.toDataURL()); img.setAttribute("width", W); img.setAttribute("height", H);
  }
  draw(); addEventListener("resize", draw);
  card.classList.add("lg-on");
}
