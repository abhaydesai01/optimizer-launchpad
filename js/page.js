// Inner pages: navigation, colour mode, gentle reveals, mailto forms and the key.
import { initNav } from "./nav.js";
import { initKey } from "./key.js";
import { initViz } from "./viz.js";
import { initGlyphs, glyph } from "./glyphs.js";
import { initExplain } from "./explain.js";

const html = document.documentElement;
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

initNav();

// colour mode: white or dark, one at a time
const tbtns = [...document.querySelectorAll("[data-t]")];
const paint = () => tbtns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.t === html.dataset.theme)));
tbtns.forEach((b) => b.addEventListener("click", () => {
  html.dataset.theme = b.dataset.t;
  try { localStorage.setItem("o360-theme", b.dataset.t); } catch (e) {}
  const meta = document.querySelector('meta[name="theme-color"]'); if (meta) meta.content = b.dataset.t === "paper" ? "#FFFFFF" : "#070808";
  paint();
}));
paint();

// nav turns solid once the page moves
const nav = document.getElementById("nav");
const onScroll = () => nav && nav.classList.toggle("is-solid", scrollY > 30);
addEventListener("scroll", onScroll, { passive: true }); onScroll();

// sections rise in once as they enter
if (!reduced && "IntersectionObserver" in window) {
  const els = [...document.querySelectorAll(".pg-sec, .pg-cta")];
  els.forEach((el) => el.classList.add("rv"));
  const io = new IntersectionObserver((en) => en.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
  els.forEach((el) => io.observe(el));
}

// ---------------------------------------------------------------- the directed layer
initViz();
if (document.querySelector(".pf")) import("./film-platform.js").then((m) => m.initPlatformFilm());
initExplain();
initGlyphs();
document.querySelectorAll("[data-glyph]").forEach((el) => { const g = glyph(el.dataset.glyph); g.classList.add("on"); el.append(g); });

// headlines rise word by word (text stays in the DOM for search and screen readers)
const split = (el) => {
  let i = 0;
  const walk = (node) => [...node.childNodes].forEach((n) => {
    if (n.nodeType === 3) {
      const frag = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach((w) => {
        if (!w) return;
        if (/^\s+$/.test(w)) { frag.append(w); return; }
        const o = document.createElement("span"); o.className = "wd";
        const s = document.createElement("span"); s.style.setProperty("--w", i++); s.textContent = w;
        o.append(s); frag.append(o);
      });
      n.replaceWith(frag);
    } else if (n.nodeType === 1) walk(n);
  });
  walk(el); el.classList.add("is-split");
};
if (!reduced) {
  const h1 = document.querySelector(".pg-h1");
  if (h1) { split(h1); requestAnimationFrame(() => requestAnimationFrame(() => h1.querySelectorAll(".wd > span").forEach((s) => s.classList.add("go")))); }
  const hio = new IntersectionObserver((en) => en.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); hio.unobserve(e.target); } }), { rootMargin: "0px 0px -10% 0px" });
  document.querySelectorAll(".pg-sec .pg-h2, .pg-cta .pg-h2").forEach((h) => { split(h); hio.observe(h); });
}

// list items enter in sequence
document.querySelectorAll(".pg-cols, .pg-steps, .pg-stats, .pg-index, .pg-faq, .pg-table tbody, .pg-terms").forEach((l) => [...l.children].forEach((c, k) => c.style.setProperty("--k", Math.min(k, 12))));

// a soft light follows the pointer across grids
document.querySelectorAll(".pg-cols, .pg-steps").forEach((g) => g.addEventListener("pointermove", (e) => {
  [...g.children].forEach((li) => { const r = li.getBoundingClientRect(); li.style.setProperty("--mx", `${e.clientX - r.left + 16}px`); li.style.setProperty("--my", `${e.clientY - r.top + 14}px`); });
}));

// numbers count up when they arrive
const cio = new IntersectionObserver((en) => en.forEach((e) => {
  if (!e.isIntersecting) return; cio.unobserve(e.target);
  const el = e.target, m = el.textContent.trim().match(/^([~≈]?)(\d[\d,]*\.?\d*)(.*)$/);
  if (!m || /\d/.test(m[3])) return;
  const [, pre, num, post] = m, end = parseFloat(num.replace(/,/g, "")), dec = (num.split(".")[1] || "").length, comma = num.includes(",");
  const t0 = performance.now(), dur = 1400;
  const step = (now) => { const f = Math.min(1, (now - t0) / dur), v = end * (1 - Math.pow(1 - f, 3)); el.textContent = pre + (comma ? Math.round(v).toLocaleString("en-IN") : v.toFixed(dec)) + post; if (f < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}), { threshold: 0.6 });
if (!reduced) document.querySelectorAll(".pg-stats strong, .vz-score strong").forEach((el) => cio.observe(el));

// film bands: load when near, play only while seen, ease into full size as they scroll in
const films = [...document.querySelectorAll(".pg-film__f")];
films.forEach((f) => {
  const v = f.querySelector("video");
  new IntersectionObserver((en) => en.forEach((e) => {
    if (e.isIntersecting) { if (!v.src) { v.src = v.dataset.src; v.playbackRate = 0.8; } if (!reduced) v.play().catch(() => {}); }
    else v.pause();
  }), { rootMargin: "200px 0px" }).observe(f);
});
const scrollFx = () => {
  films.forEach((f) => { const r = f.getBoundingClientRect(), p = Math.min(1, Math.max(0, 1 - (r.top - innerHeight * 0.15) / (innerHeight * 0.75))); f.style.setProperty("--fs", (0.94 + 0.06 * p).toFixed(4)); });
  const prog = document.querySelector(".pg-prog");
  if (prog) { const max = document.documentElement.scrollHeight - innerHeight; prog.style.setProperty("--p", (max > 0 ? scrollY / max : 0).toFixed(4)); }
};
if (!reduced) { addEventListener("scroll", scrollFx, { passive: true }); scrollFx(); }

// article contents bar: the current section lights up
const toc = document.querySelector(".pg-toc");
if (toc) {
  const links = [...toc.querySelectorAll("a")], map = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
  const tio = new IntersectionObserver((en) => en.forEach((e) => {
    if (!e.isIntersecting) return;
    links.forEach((a) => a.classList.remove("on")); const a = map.get(e.target.id);
    if (a) { a.classList.add("on"); a.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" }); }
  }), { rootMargin: "-30% 0px -60% 0px" });
  map.forEach((_, id) => { const t = document.getElementById(id); if (t) tio.observe(t); });
}

// platform: real product screens, one at a time, leaning toward the pointer
document.querySelectorAll(".pg-prod").forEach((sec) => {
  const tabs = [...sec.querySelectorAll(".pp-tabs button")], wins = [...sec.querySelectorAll(".pp-win")], caps = [...sec.querySelectorAll(".pp-cap")], stage = sec.querySelector(".pp-stage");
  let i = 0, hold = 0, vis = false;
  const set = (k) => { i = k; tabs.forEach((t, j) => t.setAttribute("aria-selected", String(j === k))); wins.forEach((w, j) => w.classList.toggle("is-on", j === k)); caps.forEach((c, j) => c.classList.toggle("is-on", j === k)); };
  tabs.forEach((t, k) => t.addEventListener("click", () => { hold = Date.now() + 15000; set(k); }));
  new IntersectionObserver((e) => (vis = e[0].isIntersecting), { threshold: 0.3 }).observe(sec);
  if (!reduced) setInterval(() => { if (vis && Date.now() > hold) set((i + 1) % wins.length); }, 5200);
  if (!reduced && matchMedia("(hover: hover)").matches) {
    stage.addEventListener("pointermove", (e) => { const r = stage.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; stage.style.setProperty("--ry", `${(x * 8).toFixed(2)}deg`); stage.style.setProperty("--rx", `${(4 - y * 6).toFixed(2)}deg`); });
    stage.addEventListener("pointerleave", () => { stage.style.setProperty("--ry", "0deg"); stage.style.setProperty("--rx", "6deg"); });
  }
});

// glossary and FAQ: type to filter
const filter = (box, items, label) => {
  if (!box || !items.length) return;
  const f = document.createElement("label"); f.className = "pg-search";
  f.innerHTML = `<input type="search" placeholder="${label}" aria-label="${label}"><span></span>`;
  box.before(f);
  const inp = f.querySelector("input"), cnt = f.querySelector("span");
  const run = () => { const q = inp.value.trim().toLowerCase(); let n = 0; items.forEach((it) => { const hit = !q || it.textContent.toLowerCase().includes(q); it.hidden = !hit; if (hit) n++; }); cnt.textContent = q ? `${n} of ${items.length}` : `${items.length} ${box.classList.contains("pg-terms") ? "terms" : "questions"}`; };
  inp.addEventListener("input", run); run();
};
if (location.pathname.startsWith("/glossary")) filter(document.querySelector(".pg-terms"), [...document.querySelectorAll(".pg-term")], "Search the glossary");
if (location.pathname.startsWith("/faq")) filter(document.querySelector(".pg-faq"), [...document.querySelectorAll(".pg-faq details")], "Search the questions");

// forms open the visitor's own email app; nothing is sent from the page
document.querySelectorAll("form[data-mailto]").forEach((f) => {
  f.addEventListener("submit", (e) => {
    e.preventDefault();
    const req = f.querySelector("[required]"), err = f.querySelector(".pg-form__err");
    if (req && !req.value.trim()) { if (err) err.hidden = false; req.focus(); return; }
    if (err) err.hidden = true;
    const data = new FormData(f), lines = [];
    data.forEach((v, k) => { if (String(v).trim()) lines.push(`${k}: ${v}`); });
    const brand = (data.get("Brand") || "").toString().trim();
    location.href = `mailto:${f.dataset.mailto}?subject=${encodeURIComponent(`AI audit request: ${brand}`)}&body=${encodeURIComponent(lines.join("\n"))}`;
  });
});

initKey({ reduced });
import("./icons3d.js").then((m) => m.initIcons3D({ reduced })).catch((e) => console.warn("3D icons unavailable", e));
