// Explainable diagrams: lists of sentences become one picture with short labels.
// The original list stays in the DOM (visually hidden) for search engines and screen readers;
// on screen the reader sees the diagram and one detail at a time.
import { glyph, pickGlyph } from "./glyphs.js";

const h = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const text = (el, sel) => { for (const s of sel.split(",")) { const n = el.querySelector(s.trim()); if (n && n.textContent.trim() && !/^\d+$|^[A-Z]$/.test(n.textContent.trim())) return n.textContent.trim(); } return ""; };

/* cycle the active item while visible; a reader's hover or tap takes over for a while */
function cycler(root, n, set, ms = 3800) {
  let i = 0, t = 0, vis = false, hold = 0;
  const tick = () => { clearTimeout(t); if (!vis || reduced) return; t = setTimeout(() => { if (Date.now() > hold) { i = (i + 1) % n; set(i); } tick(); }, ms); };
  new IntersectionObserver((e) => { vis = e[0].isIntersecting; if (vis) { root.classList.add("on"); tick(); } else clearTimeout(t); }, { threshold: 0.3 }).observe(root);
  return { pick: (k) => { i = k; hold = Date.now() + 9000; set(k); } };
}
const hide = (el) => el.classList.add("x-sr");

/* ---------------------------------------------------------------- flow: a process the eye follows */
export function flow(list, items, { kicker = "Step", letters = false } = {}) {
  const n = items.length;
  const root = h(`<div class="xf" style="--n:${n}">
    <div class="xf__rail" aria-hidden="true"><span class="xf__fill"></span><span class="xf__pulse"></span></div>
    <ol class="xf__track" aria-hidden="true">${items.map((it, i) => `<li><button type="button" tabindex="-1"><i>${letters ? String.fromCharCode(65 + i) : String(i + 1).padStart(2, "0")}</i><b>${esc(it.t)}</b></button></li>`).join("")}</ol>
    <div class="xf__detail" aria-hidden="true"><div class="xf__art"></div><div class="xf__copy"><p class="xf__k"></p><h4></h4><p class="xf__d"></p></div></div>
  </div>`);
  list.after(root); hide(list);
  const lis = [...root.querySelectorAll(".xf__track li")], art = root.querySelector(".xf__art"), k = root.querySelector(".xf__k"), h4 = root.querySelector("h4"), d = root.querySelector(".xf__d"), det = root.querySelector(".xf__detail");
  const arts = items.map((it) => { const g = glyph(it.g || pickGlyph(it.t, it.d)); g.classList.add("on"); return g; });
  const set = (i) => {
    lis.forEach((l, j) => { l.classList.toggle("is-on", j === i); l.classList.toggle("is-past", j < i); });
    root.style.setProperty("--at", n > 1 ? i / (n - 1) : 1);
    det.classList.remove("swap"); void det.offsetWidth; det.classList.add("swap");
    art.replaceChildren(arts[i]); k.textContent = `${letters ? "Option" : kicker} ${letters ? String.fromCharCode(65 + i) : i + 1} of ${n}`; h4.textContent = items[i].t; d.textContent = items[i].d;
  };
  const c = cycler(root, n, set);
  lis.forEach((l, i) => { l.addEventListener("pointerenter", () => c.pick(i)); l.querySelector("button").addEventListener("click", () => c.pick(i)); });
  set(0);
}

/* ---------------------------------------------------------------- hub: ideas around one core, one explained at a time */
export function hub(list, items, { center = "" } = {}) {
  const n = items.length;
  const pos = items.map((_, i) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / n; return [50 + Math.cos(a) * 38, 50 + Math.sin(a) * 38]; });
  const root = h(`<div class="xh">
    <div class="xh__stage" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">${pos.map(([x, y]) => `<line x1="50" y1="50" x2="${x}" y2="${y}"/>`).join("")}</svg>
      <div class="xh__core"><span>${esc(center)}</span></div>
      ${items.map((it, i) => `<button type="button" tabindex="-1" class="xh__n" style="--x:${pos[i][0]}%;--y:${pos[i][1]}%"><b>${esc(it.t)}</b></button>`).join("")}
    </div>
    <div class="xh__detail" aria-hidden="true"><div class="xh__art"></div><p class="xh__k"></p><h4></h4><p class="xh__d"></p><div class="xh__dots">${items.map(() => "<i></i>").join("")}</div></div>
  </div>`);
  list.after(root); hide(list);
  const nodes = [...root.querySelectorAll(".xh__n")], lines = [...root.querySelectorAll("line")], dots = [...root.querySelectorAll(".xh__dots i")];
  const art = root.querySelector(".xh__art"), k = root.querySelector(".xh__k"), h4 = root.querySelector("h4"), d = root.querySelector(".xh__d"), det = root.querySelector(".xh__detail");
  const arts = items.map((it) => { const g = glyph(it.g || pickGlyph(it.t, it.d)); g.classList.add("on"); return g; });
  const set = (i) => {
    nodes.forEach((x, j) => x.classList.toggle("is-on", j === i)); lines.forEach((x, j) => x.classList.toggle("is-on", j === i)); dots.forEach((x, j) => x.classList.toggle("is-on", j === i));
    det.classList.remove("swap"); void det.offsetWidth; det.classList.add("swap");
    art.replaceChildren(arts[i]); k.textContent = `${i + 1} / ${n}`; h4.textContent = items[i].t; d.textContent = items[i].d;
    // on phones the ideas are a swipe row: keep the active one in view without moving the page
    const st = root.querySelector(".xh__stage");
    if (st.scrollWidth > st.clientWidth + 4) st.scrollTo({ left: nodes[i].offsetLeft - 16, behavior: "smooth" });
  };
  const c = cycler(root, n, set, 4200);
  nodes.forEach((x, i) => { x.addEventListener("pointerenter", () => c.pick(i)); x.addEventListener("click", () => c.pick(i)); });
  set(0);
}

/* ---------------------------------------------------------------- map: where the work landed, as territories around the answer */
export function map(box, groups, { center = "AI answer" } = {}) {
  const n = groups.length, total = groups.reduce((a, g) => a + g.tags.length, 0);
  const pos = groups.map((_, i) => { const a = -Math.PI * 3 / 4 + (i * 2 * Math.PI) / n; return [50 + Math.cos(a) * 33, 50 + Math.sin(a) * 33]; });
  let k = 0;
  const root = h(`<div class="xm" style="--n:${n}">
    <div class="xm__stage" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">${pos.map(([x, y]) => `<line x1="50" y1="50" x2="${x}" y2="${y}"/>`).join("")}</svg>
      <div class="xm__core"><strong>${total}</strong><span>pieces of work</span><em>${esc(center)}</em></div>
      ${groups.map((g, i) => `<div class="xm__g" style="--x:${pos[i][0]}%;--y:${pos[i][1]}%;--gi:${i}"><b>${esc(g.t)}</b><div class="xm__tags">${g.tags.map((t) => `<span tabindex="-1" style="--k:${k++}" data-full="${esc(t.full)}">${esc(t.s)}</span>`).join("")}</div></div>`).join("")}
    </div>
    <p class="xm__hint" aria-hidden="true"><span>Hover a piece of work to see it in full.</span></p>
  </div>`);
  box.after(root); hide(box);
  const hint = root.querySelector(".xm__hint span"), def = hint.textContent;
  root.querySelectorAll(".xm__tags span").forEach((s) => { s.addEventListener("pointerenter", () => { hint.textContent = s.dataset.full; root.classList.add("is-hint"); }); s.addEventListener("pointerleave", () => { hint.textContent = def; root.classList.remove("is-hint"); }); });
  new IntersectionObserver((e, o) => { if (e[0].isIntersecting) { root.classList.add("on"); o.disconnect(); } }, { threshold: 0.25 }).observe(root);
}

/* ---------------------------------------------------------------- stats: the number drawn to scale */
export function statCharts(scope = document) {
  scope.querySelectorAll(".pg-stats li").forEach((li) => {
    const s = li.querySelector("strong"); if (!s || li.querySelector(".xc")) return;
    const v = s.textContent.trim(); let c = "";
    let m;
    if ((m = v.match(/(\d+(?:\.\d+)?)%\s*vs\s*(\d+(?:\.\d+)?)%/i))) { const mx = Math.max(+m[1], +m[2]); c = `<div class="xc xc--bars"><i style="--v:${(m[1] / mx) * 3.6}"><em>${m[1]}%</em></i><i class="b" style="--v:${(m[2] / mx) * 3.6}"><em>${m[2]}%</em></i></div>`; }
    else if ((m = v.match(/(\d+(?:\.\d+)?)%/))) c = `<div class="xc xc--ring" style="--v:${m[1]}"><svg viewBox="0 0 36 36"><circle r="15.9" cx="18" cy="18"/><circle class="v" r="15.9" cx="18" cy="18" pathLength="100"/></svg></div>`;
    else if ((m = v.match(/^(\d+(?:\.\d+)?)\s*[×x]$/))) c = `<div class="xc xc--x"><i style="--v:${Math.min(+m[1], 8)}"></i><i class="b" style="--v:1"></i></div>`;
    else if (/^#1$/.test(v)) c = `<div class="xc xc--pod"><i style="--v:.6"></i><i class="b" style="--v:1"></i><i style="--v:.4"></i></div>`;
    if (c) li.prepend(h(c));
  });
  const io = new IntersectionObserver((en) => en.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); } }), { threshold: 0.4 });
  scope.querySelectorAll(".xc").forEach((x) => io.observe(x));
}

/* ---------------------------------------------------------------- wire everything marked data-x */
export function initExplain(scope = document) {
  const short = (li) => li.dataset.short || li.textContent.split(/[:,]/)[0].trim().split(" ").slice(0, 4).join(" ");
  scope.querySelectorAll("[data-x]").forEach((el) => {
    if (el.dataset.xDone) return; el.dataset.xDone = "1";
    const kind = el.dataset.x;
    if (kind === "map") {
      const groups = [...el.querySelectorAll(el.dataset.group || ".cs__col")].map((g) => ({ t: text(g, "h4, h3, b"), tags: [...g.querySelectorAll("li")].map((li) => ({ s: short(li), full: li.textContent.trim() })) }));
      return map(el, groups, { center: el.dataset.c || "AI answer" });
    }
    const items = [...el.children].filter((c) => c.tagName === "LI").map((li) => ({ t: text(li, "h3, h4, b, strong, dt"), d: text(li, "p, em, dd") }));
    if (!items.length) return;
    if (kind === "flow") flow(el, items, { letters: el.dataset.letters === "1", kicker: el.dataset.k || "Step" });
    if (kind === "hub") hub(el, items, { center: el.dataset.c || "" });
  });
  statCharts(scope);
}
