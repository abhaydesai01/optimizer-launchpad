import { initFilmMode, showIntro, introClosed, ringSVG } from "./cinema.js";
import { initOwn, initHero } from "./own.js";
import { initScenes } from "./scenes.js";
import { initOrbit } from "./orbit.js";
import { initNav } from "./nav.js";
import { initGlyphs } from "./glyphs.js";
import { initExplain } from "./explain.js";
import { initGate, initTool, initCases } from "./zone.js";
import { initKey } from "./key.js";

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = window.matchMedia("(pointer: fine)").matches;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const hasGSAP = !!(window.gsap && window.ScrollTrigger);
if (hasGSAP) gsap.registerPlugin(ScrollTrigger);

/* ---------- split headlines into masked words ---------- */
$$("[data-split]").forEach((el) => {
  const walk = (node) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((w) => {
          if (!w) return;
          if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(" ")); return; }
          const o = document.createElement("span"); o.className = "sw";
          const i = document.createElement("span"); i.textContent = w; o.appendChild(i); frag.appendChild(o);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) walk(n);
    });
  };
  walk(el);
});

/* ---------- manifesto: words light up with scroll ---------- */
$$("[data-words]").forEach((el) => {
  const walk = (node, green) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((w) => {
          if (!w) return;
          if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(" ")); return; }
          const s = document.createElement("span"); s.className = "mw" + (green ? " g" : ""); s.textContent = w; frag.appendChild(s);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) { const g = n.classList.contains("g"); walk(n, g); if (g) n.classList.remove("g"); }
    });
  };
  walk(el, false);
});

/* ---------- the logo ring (vector; the old three.js ring is retired) ---------- */
const engMark = $(".engine__mark");
if (engMark) engMark.insertAdjacentHTML("afterbegin", ringSVG("rg rg--engine"));
const engFills = engMark ? $$(".rg__fill", engMark) : [];
const ring = {
  setMode() {}, setPointer() {},
  setEngineStep(i) { engFills.forEach((f, k) => (f.style.opacity = k <= i ? 1 : 0)); },
};

const RANGES = {
  hero: ["top top", "bottom 25%"], problem: ["top 75%", "bottom 55%"], turn: ["top top", "bottom bottom"],
  engine: ["top 70%", "bottom 45%"], cta: ["top 85%", "bottom 90%"], hidden: ["top 55%", "bottom 55%"],
};
const ringSections = $$("[data-ring]");
const ringTriggers = new Map();
if (hasGSAP) ringSections.forEach((sec) => {
  const [start, end] = RANGES[sec.dataset.ring] || RANGES.hidden;
  ringTriggers.set(sec, ScrollTrigger.create({ trigger: sec, start, end }));
});
function syncRing() {
  const mid = window.innerHeight * 0.5;
  const sec = ringSections.find((s) => { const r = s.getBoundingClientRect(); return r.top <= mid && r.bottom > mid; })
    || (window.scrollY < 10 ? ringSections[0] : ringSections[ringSections.length - 1]);
  const st = ringTriggers.get(sec);
  ring.setMode(sec.dataset.ring, st ? st.progress : 0);
}

/* ---------- film ---------- */
const filmSec = $("#own");
const heroReady = Promise.resolve();
initHero($("#top"));
initOwn($("#own"), { reduced });
// the door: a real-time 3D film; the frame flipbook is the fallback when WebGL or the CDN is unavailable
import("./gate3d.js").then((m) => { if (!m.initGate3D($("#gate"), { reduced })) initGate($("#gate"), { reduced }); })
  .catch((e) => { console.warn("3D door unavailable, using frames", e); initGate($("#gate"), { reduced }); });
// the hero's growth field in 3D (the card and the copy stay on top; without WebGL the hero is unchanged)
import("./hero3d.js").then((m) => m.initHero3D($("#top"), { reduced })).catch((e) => console.warn("3D hero unavailable", e));
// the six chapters: the ring as a 3D world, scene panels in perspective
if (!document.documentElement.classList.contains("own-stack")) import("./own3d.js").then((m) => m.initOwn3D($("#own"), { reduced })).catch((e) => console.warn("3D chapters unavailable", e));
initTool($("#tool"), { reduced });
initCases($("#case"));
initKey({ reduced });
import("./icons3d.js").then((m) => m.initIcons3D({ reduced })).catch((e) => console.warn("3D icons unavailable", e));
initFilmMode({ reduced });

initScenes({ reduced });
initOrbit(document.getElementById("orbit"), { reduced });
initNav();
initExplain();
initGlyphs();

/* ---------- loader → intro ---------- */
const loader = $("#loader"), lbar = $("#loader-bar");
let lp = 0;
const lt = setInterval(() => { lp = Math.min(90, lp + 7); lbar.style.width = lp + "%"; }, 90);
function intro() {
  if (!hasGSAP || reduced) { $$(".sw > span").forEach((s) => (s.style.transform = "none")); return; }
  const hero = $("#hero-copy");
  gsap.from($$(".sw > span", hero), { yPercent: 115, rotate: 4, duration: 1.3, ease: "expo.out", stagger: 0.06, delay: 0.1 });
  gsap.from($$("[data-fade]", hero), { y: 30, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.1, delay: 0.5 });
  gsap.from(".nav > *", { y: -30, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.08, delay: 0.3, clearProps: "transform" });
}
Promise.race([Promise.all([heroReady, document.fonts ? document.fonts.ready : 0]), new Promise((r) => setTimeout(r, 2600))]).then(() => {
  clearInterval(lt); lbar.style.width = "100%";
  setTimeout(() => { loader.classList.add("done"); showIntro(); introClosed.then(intro); introClosed.then(() => setTimeout(() => document.querySelector(".intro__vid")?.pause(), 1000)); if (hasGSAP) ScrollTrigger.refresh(); }, 250);
});

/* ---------- scroll animations ---------- */
if (hasGSAP && !reduced) {
  // headline reveals (outside hero)
  $$("[data-split]").filter((el) => !el.closest("#hero-copy")).forEach((el) => {
    gsap.from($$(".sw > span", el), {
      yPercent: 115, rotate: 3, duration: 1.2, ease: "expo.out", stagger: 0.05,
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
  });
  // fades
  ScrollTrigger.batch($$("[data-fade]").filter((el) => !el.closest("#hero-copy")), {
    start: "top 88%",
    onEnter: (els) => gsap.fromTo(els, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "expo.out", stagger: 0.09, overwrite: true }),
  });
  $$("[data-fade]").filter((el) => !el.closest("#hero-copy")).forEach((el) => gsap.set(el, { opacity: 0 }));

  // manifesto word scrub
  $$("[data-words]").forEach((el) => {
    const words = $$(".mw", el);
    ScrollTrigger.create({
      trigger: el, start: "top 80%", end: "bottom 45%", scrub: true,
      onUpdate: (s) => { const n = s.progress * words.length; words.forEach((w, i) => (w.style.opacity = (0.14 + 0.86 * clamp(n - i)).toFixed(2))); },
    });
  });

  // loop line draw
  const line = $(".loop__line i");
  if (line) ScrollTrigger.create({ trigger: "#loop", start: "top 80%", end: "bottom 50%", scrub: true, onUpdate: (s) => line.parentElement.style.setProperty("--p", s.progress.toFixed(3)) });
  if (line) line.style.transform = "scaleX(var(--p,0))";

  // giant outline text drift
  $$("[data-drift]").forEach((el) => gsap.fromTo(el, { xPercent: 0 }, { xPercent: -35, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } }));


  // turn glow
  const ts = $("#turn-stage");
  if (ts) ScrollTrigger.create({ trigger: "#turn", start: "top top", end: "bottom bottom", onUpdate: (s) => {
    const g = clamp((s.progress - 0.55) / 0.35);
    ts.style.setProperty("--glow", (0.4 + g * 0.9).toFixed(3)); ts.style.setProperty("--glowO", g.toFixed(3));
  } });

  // engine images: clip reveal + parallax
  $$(".stop").forEach((s) => {
    ScrollTrigger.create({ trigger: s, start: "top 75%", onEnter: () => s.classList.add("is-seen") });
    const img = $(".stop__media img, .stop__media video", s);
    if (img) gsap.fromTo(img, { yPercent: -8 }, { yPercent: 4, ease: "none", scrollTrigger: { trigger: s, start: "top bottom", end: "bottom top", scrub: true } });
  });
  // audience cards
  $$("[data-media]").forEach((m, i) => ScrollTrigger.create({ trigger: m, start: "top 85%", onEnter: () => setTimeout(() => m.classList.add("is-in"), i * 120) }));
} else {
  $$(".stop").forEach((s) => s.classList.add("is-seen"));
  $$("[data-media]").forEach((m) => m.classList.add("is-in"));
  $$(".mw").forEach((w) => (w.style.opacity = 1));
}

/* ---------- looping clips play only while visible ---------- */
const vio = new IntersectionObserver((en) => en.forEach((e) => {
  const v = e.target;
  if (v.hasAttribute("data-once") && v.ended) return;
  if (e.isIntersecting && !reduced) { const p = v.play(); if (p) p.catch(() => {}); } else v.pause();
}), { threshold: 0.15 });
$$("video[data-autoplay]").forEach((v) => vio.observe(v));

/* ---------- engine steps ---------- */
const stops = $$(".stop"), idx = $$(".engine__index li");
function setStep(i) {
  ring.setEngineStep(i);
  idx.forEach((l, k) => { l.classList.toggle("is-on", k === i); l.classList.toggle("is-done", k < i); });
  const on = idx[i];
  if (on && window.innerWidth < 820) on.scrollIntoView({ block: "nearest", inline: "center", behavior: reduced ? "auto" : "smooth" });
}
if (hasGSAP) stops.forEach((s, i) => ScrollTrigger.create({
  trigger: s, start: "top 55%", end: "bottom 55%",
  onToggle: (self) => { if (self.isActive) setStep(i); else if (i === 0 && self.direction < 0) setStep(-1); },
}));
idx.forEach((l, i) => l.addEventListener("click", () => window.scrollTo({ top: stops[i].getBoundingClientRect().top + scrollY - window.innerHeight * 0.3, behavior: reduced ? "auto" : "smooth" })));

/* ---------- counters ---------- */
function countUp(el) {
  const to = parseFloat(el.dataset.count), suf = el.dataset.suffix || "";
  const dec = (el.dataset.count.split(".")[1] || "").length;
  if (reduced) { el.textContent = to.toFixed(dec) + suf; return; }
  const t0 = performance.now(), dur = 1800;
  const tick = (now) => { const k = clamp((now - t0) / dur), e = 1 - Math.pow(1 - k, 4); el.textContent = (to * e).toFixed(dec) + suf; if (k < 1) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
}
const cio = new IntersectionObserver((en) => en.forEach((e) => { if (e.isIntersecting) { countUp(e.target); cio.unobserve(e.target); } }), { threshold: 0.6 });
$$(".stat[data-count]").forEach((el) => cio.observe(el));
const dash = $(".dash");
if (dash) new IntersectionObserver((en, o) => en.forEach((e) => { if (e.isIntersecting) { dash.classList.add("is-in"); o.disconnect(); } }), { threshold: 0.35 }).observe(dash);

/* ---------- nav + progress ring ---------- */
const nav = $("#nav");
let lastY = window.scrollY;
const pr = $("#progress-ring"), pk = $("#progress-key");
const svgAng = (t) => ((-45 + 360 * t) * Math.PI) / 180;
function ringPath(fill) {
  const o = [], inn = [];
  for (let k = 0; k <= 90; k++) {
    const t = k / 90, a = svgAng(t), full = 37.5 - 10.5 * Math.pow(t, 1.25);
    const ri = 40 + (full - 40) * clamp(fill * 1.15 - t * 0.15);
    o.push(`${(50 + 42 * Math.cos(a)).toFixed(2)} ${(50 + 42 * Math.sin(a)).toFixed(2)}`);
    inn.push(`${(50 + ri * Math.cos(a)).toFixed(2)} ${(50 + ri * Math.sin(a)).toFixed(2)}`);
  }
  return `M${o.join(" L")} L${inn.reverse().join(" L")} Z`;
}
pk.innerHTML = '<circle cx="50" cy="44.9" r="9" fill="#6FD89B"/><path fill="#6FD89B" d="M46.4 48.5 L53.6 48.5 L57.2 70.1 L42.8 70.1 Z"/>';
let lastFill = -1;
function onScroll() {
  const y = window.scrollY;
  const fr = filmSec.getBoundingClientRect();
  const inFilm = fr.top < 1 && fr.bottom > window.innerHeight * 0.5;
  nav.classList.toggle("is-solid", y > 40);
  nav.classList.toggle("is-hidden", inFilm || (y > lastY && y > 300 && !nav.contains(document.activeElement)));
  lastY = y;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const p = max > 0 ? clamp(y / max) : 0;
  if (Math.abs(p - lastFill) > 0.004) { pr.setAttribute("d", ringPath(p)); lastFill = p; }
  pk.setAttribute("opacity", clamp((p - 0.9) / 0.08).toFixed(2));
  syncRing();
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const pbtn = $("#progress"), menu = $("#chapters");
const setMenu = (open) => { menu.hidden = !open; pbtn.setAttribute("aria-expanded", String(open)); };
pbtn.addEventListener("click", (e) => { e.stopPropagation(); setMenu(menu.hidden); });
menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("click", (e) => { if (!menu.hidden && !menu.contains(e.target)) setMenu(false); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

/* ---------- pointer: ring tilt, cursor glow, magnetic buttons, card spotlight ---------- */
const cursor = $("#cursor");
if (fine && !reduced) {
  window.addEventListener("pointermove", (e) => {
    ring.setPointer(e.clientX / window.innerWidth * 2 - 1, e.clientY / window.innerHeight * 2 - 1);
    cursor.style.setProperty("--cx", e.clientX + "px"); cursor.style.setProperty("--cy", e.clientY + "px");
  }, { passive: true });
  $$(".btn").forEach((b) => {
    b.addEventListener("pointermove", (e) => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`; });
    b.addEventListener("pointerleave", () => (b.style.transform = ""));
  });
  $$(".card").forEach((c) => c.addEventListener("pointermove", (e) => {
    const r = c.getBoundingClientRect(); c.style.setProperty("--mx", e.clientX - r.left + "px"); c.style.setProperty("--my", e.clientY - r.top + "px");
  }));
} else if (cursor) cursor.remove();

/* ---------- GEO tabs ---------- */
const tabs = $$("[role=tab]");
function selectTab(tab) {
  // each tab list switches only its own panels
  $$("[role=tab]", tab.closest("[role=tablist]")).forEach((t) => { const on = t === tab; t.setAttribute("aria-selected", String(on)); t.tabIndex = on ? 0 : -1; $("#" + t.getAttribute("aria-controls")).hidden = !on; });
  if (hasGSAP && !reduced) gsap.fromTo("#" + tab.getAttribute("aria-controls"), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "expo.out" });
}
tabs.forEach((t, i) => {
  t.addEventListener("click", () => selectTab(t));
  t.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const own = $$("[role=tab]", t.closest("[role=tablist]")), k = own.indexOf(t);
    const n = own[(k + (e.key === "ArrowRight" ? 1 : own.length - 1)) % own.length]; selectTab(n); n.focus();
  });
});
$$(".seg__btn").forEach((b) => b.addEventListener("click", () => {
  $$(".seg__btn").forEach((x) => { const on = x === b; x.classList.toggle("is-on", on); x.setAttribute("aria-pressed", String(on)); });
  $$("[data-aud-panel]").forEach((p) => (p.hidden = p.dataset.audPanel !== b.dataset.aud));
}));

/* ---------- AI audit request ----------
   Front-end only for now: nothing is sent anywhere.
   TODO: POST {brand, email} to the audit intake endpoint once it exists. */
const ENGINES = ["ChatGPT", "Gemini", "Perplexity", "Claude", "Google AI Overviews", "Copilot", "Grok", "Kimi"];
const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
$$("[data-audit]").forEach((form, fi) => {
  const input = $("input[name=brand]", form), err = $(".audit__error", form), run = $(".audit__run", form);
  input.addEventListener("input", () => (err.hidden = true));
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const brand = input.value.trim();
    if (brand.length < 2) { err.hidden = false; input.focus(); return; }
    run.hidden = false;
    run.innerHTML = `<p><strong>Setting up your audit for ${esc(brand)}</strong></p><ol>${ENGINES.map((n) => `<li>${n}</li>`).join("")}</ol>`;
    const items = $$("li", run);
    items.forEach((li, i) => setTimeout(() => { li.classList.add("done"); li.textContent = `${ENGINES[i]} · queued`; }, reduced ? 0 : 240 * (i + 1)));
    setTimeout(() => {
      const box = document.createElement("div");
      box.innerHTML = `<label class="sr-only" for="audit-email-${fi}">Work email</label>
        <div class="audit__field"><input id="audit-email-${fi}" type="email" autocomplete="email" placeholder="Work email for your full report" required>
        <button class="btn btn--green" type="button">Send my report</button></div>
        <p class="audit__error" role="alert" hidden>Enter a valid work email.</p>
        <p class="audit__note">Our team runs the scans and sends your AI visibility report within 24 hours.</p>`;
      run.appendChild(box);
      const em = $("input", box), b = $("button", box), e2 = $(".audit__error", box);
      em.focus({ preventScroll: true });
      em.addEventListener("input", () => (e2.hidden = true));
      const send = () => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em.value.trim())) { e2.hidden = false; em.focus(); return; }
        run.innerHTML = `<p><strong>Thank you.</strong> Your AI visibility report for ${esc(brand)} will reach ${esc(em.value.trim())} within 24 hours.</p>`;
      };
      b.addEventListener("click", send);
      em.addEventListener("keydown", (ev) => { if (ev.key === "Enter") { ev.preventDefault(); send(); } });
    }, reduced ? 0 : 240 * (ENGINES.length + 1));
  });
});

window.addEventListener("load", () => { if (hasGSAP) ScrollTrigger.refresh(); syncRing(); });
// lazy images and 3D scenes change the page height after load; re-measure every scroll trigger when it does
if (hasGSAP && "ResizeObserver" in window) {
  let lastH = 0, rt = 0;
  new ResizeObserver(() => {
    const h = document.documentElement.scrollHeight;
    if (Math.abs(h - lastH) < 2) return; lastH = h;
    clearTimeout(rt); rt = setTimeout(() => ScrollTrigger.refresh(), 250);
  }).observe(document.body);
}
window.addEventListener("resize", syncRing);

/* ---------- colour mode: white or dark, one at a time ---------- */
(() => {
  const html = document.documentElement, btns = [...document.querySelectorAll("[data-t]")];
  const paint = () => btns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.t === html.dataset.theme)));
  btns.forEach((b) => b.addEventListener("click", () => {
    html.dataset.theme = b.dataset.t;
    try { localStorage.setItem("o360-theme", b.dataset.t); } catch (e) {}
    const meta = document.querySelector('meta[name="theme-color"]'); if (meta) meta.content = b.dataset.t === "paper" ? "#FFFFFF" : "#070808";
    paint();
  }));
  paint();
})();
