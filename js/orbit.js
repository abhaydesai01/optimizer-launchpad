// Zone 1 · "Where answers come from": an orbit, not a wheel.
// The AI answer is the core. Sources circle it on two tilted orbits: the heavier a source,
// the closer it orbits and the more it streams into the answer. Your own website is one thin voice.
const NS = "http://www.w3.org/2000/svg";
const el = (tag, attrs = {}, parent) => {
  const n = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  if (parent) parent.appendChild(n);
  return n;
};

const W = 880, H = 560, C = { x: 440, y: 280 };
const ORBITS = [
  { rx: 232, ry: 120, period: 150 }, // inner: the sources that weigh most
  { rx: 350, ry: 192, period: 150 }, // outer (same period: the system turns as one, so pills never collide)
];
// [name, sub, weight, orbit, start angle (deg)]
const SOURCES = [
  ["Reviews", "Google, marketplaces", 7, 0, 90],
  ["Forums", "Reddit, Quora", 6, 0, 180],
  ["News & press", "trade + national", 6, 0, 270],
  ["Comparison sites", "99acres, G2…", 6, 0, 0],
  ["YouTube", "reviews, walkthroughs", 5, 1, 45],
  ["Marketplaces", "listings, Q&A", 5, 1, 135],
  ["Wikipedia", "Wikidata", 4, 1, 225],
  ["Your website", "one voice", 1, 1, 315],
];

export function initOrbit(svg, { reduced = false } = {}) {
  if (!svg) return;
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

  const defs = el("defs", {}, svg);
  const rg = (id, stops) => {
    const g = el("radialGradient", { id, cx: "50%", cy: "50%", r: "50%" }, defs);
    stops.forEach(([o, cls]) => el("stop", { offset: o, class: cls }, g));
  };
  rg("ob-glow", [["0%", "ob-s-glow0"], ["55%", "ob-s-glow1"], ["100%", "ob-s-glow2"]]);
  const core3d = el("radialGradient", { id: "ob-core", cx: "38%", cy: "32%", r: "75%" }, defs);
  [["0%", "ob-s-core0"], ["60%", "ob-s-core1"], ["100%", "ob-s-core2"]].forEach(([o, c]) => el("stop", { offset: o, class: c }, core3d));

  // orbit rails (two layers each: the back half sits behind the core, the front half in front)
  const back = el("g", { class: "ob-back" }, svg);
  ORBITS.forEach((o) => el("ellipse", { cx: C.x, cy: C.y, rx: o.rx, ry: o.ry, class: "ob-rail" }, back));
  const streams = el("g", { class: "ob-streams" }, svg);
  const backNodes = el("g", {}, svg);

  const core = el("g", { class: "ob-core" }, svg);
  el("circle", { cx: C.x, cy: C.y, r: 160, fill: "url(#ob-glow)", class: "ob-glow" }, core);
  el("circle", { cx: C.x, cy: C.y, r: 78, class: "ob-pulse" }, core);
  el("circle", { cx: C.x, cy: C.y, r: 78, class: "ob-pulse ob-pulse--2" }, core);
  el("circle", { cx: C.x, cy: C.y, r: 70, fill: "url(#ob-core)", class: "ob-orb" }, core);
  el("ellipse", { cx: C.x - 18, cy: C.y - 34, rx: 30, ry: 13, class: "ob-shine" }, core);
  el("text", { x: C.x, y: C.y + 2, class: "ob-core__t" }, core).textContent = "AI answer";
  el("text", { x: C.x, y: C.y + 22, class: "ob-core__s" }, core).textContent = "built from these";

  const front = el("g", { class: "ob-front" }, svg);
  ORBITS.forEach((o) => el("path", { d: `M${C.x - o.rx} ${C.y} A${o.rx} ${o.ry} 0 0 0 ${C.x + o.rx} ${C.y}`, class: "ob-rail ob-rail--front" }, front));
  const frontNodes = el("g", {}, svg);

  const nodes = SOURCES.map(([name, sub, w, oi, a0]) => {
    const weak = name === "Your website";
    const path = el("path", { class: "ob-line" + (weak ? " weak" : ""), "stroke-width": weak ? 1 : 0.6 + w * 0.32 }, streams);
    const k = weak ? 1 : Math.round(w * 0.9);
    const dots = Array.from({ length: k }, (_, i) => ({ el: el("circle", { r: weak ? 2.4 : 1.8 + w * 0.22, class: "ob-dot" + (weak ? " weak" : "") }, streams), off: i / k }));
    const g = el("g", { class: "ob-node" + (weak ? " weak" : "") + (oi === 0 ? " heavy" : "") }, frontNodes);
    const pill = el("rect", { class: "ob-pill", rx: 22, ry: 22 }, g);
    const t1 = el("text", { class: "ob-name", y: -2 }, g); t1.textContent = name;
    const t2 = el("text", { class: "ob-sub", y: 16 }, g); t2.textContent = sub;
    return { name, w, weak, o: ORBITS[oi], a0: (a0 * Math.PI) / 180, path, dots, g, pill, t1, t2, side: 1 };
  });

  // size each pill to its text
  const size = () => {
    const compact = svg.getBoundingClientRect().width < 560; // phones: bigger names, no sub-line
    svg.classList.toggle("is-compact", compact);
    nodes.forEach((n) => n.t1.setAttribute("y", compact ? 10 : -2));
    sizePills();
  };
  const sizePills = () => nodes.forEach((n) => {
    let tw = 120;
    try { tw = Math.max(n.t1.getComputedTextLength(), n.t2.getComputedTextLength()); } catch (e) {}
    const pw = tw + 44, ph = 54;
    n.pill.setAttribute("x", -pw / 2); n.pill.setAttribute("y", -ph / 2 - 2);
    n.pill.setAttribute("width", pw); n.pill.setAttribute("height", ph);
  });
  size();
  addEventListener("resize", size);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(size);

  const qb = (p0, p1, p2, t) => {
    const u = 1 - t;
    return { x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x, y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y };
  };

  let speed = 1, target = 1, clock = 0, last = 0, raf = 0, running = false;
  function draw(time) {
    const dt = last ? Math.min(0.05, (time - last) / 1000) : 0;
    last = time;
    speed += (target - speed) * Math.min(1, dt * 4);
    clock += dt * speed;
    nodes.forEach((n) => {
      const a = n.a0 + (clock / n.o.period) * Math.PI * 2;
      const x = C.x + n.o.rx * Math.cos(a), y = C.y + n.o.ry * Math.sin(a);
      const depth = Math.sin(a); // +1 = nearest the viewer
      const s = 0.84 + 0.16 * (depth + 1) / 2;
      n.g.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s.toFixed(3)})`);
      n.g.style.opacity = (0.62 + 0.38 * (depth + 1) / 2).toFixed(3);
      const side = depth < -0.15 ? -1 : 1;
      if (side !== n.side) { n.side = side; (side < 0 ? backNodes : frontNodes).appendChild(n.g); }
      // stream: a soft curve from the source into the core
      const p0 = { x, y }, p2 = { x: C.x, y: C.y };
      const mx = (x + C.x) / 2, my = (y + C.y) / 2, dx = C.x - x, dy = C.y - y;
      const p1 = { x: mx - dy * 0.22, y: my + dx * 0.22 };
      n.path.setAttribute("d", `M${x.toFixed(1)} ${y.toFixed(1)} Q${p1.x.toFixed(1)} ${p1.y.toFixed(1)} ${C.x} ${C.y}`);
      const rate = n.weak ? 0.12 : 0.16 + n.w * 0.025;
      n.dots.forEach((d) => {
        const t = (clock * rate + d.off) % 1;
        const p = qb(p0, p1, p2, t);
        d.el.setAttribute("cx", p.x.toFixed(1)); d.el.setAttribute("cy", p.y.toFixed(1));
        d.el.style.opacity = (Math.sin(Math.PI * t) * (n.weak ? 0.7 : 1)).toFixed(3);
      });
    });
    if (running) raf = requestAnimationFrame(draw);
  }

  if (reduced) { draw(0); return; }
  draw(0);
  const fig = svg.closest("figure") || svg;
  fig.addEventListener("pointerenter", () => (target = 0.18));
  fig.addEventListener("pointerleave", () => (target = 1));
  new IntersectionObserver((en) => en.forEach((e) => {
    if (e.isIntersecting && !running) { running = true; last = 0; raf = requestAnimationFrame(draw); }
    else if (!e.isIntersecting && running) { running = false; cancelAnimationFrame(raf); }
  }), { rootMargin: "120px" }).observe(svg);
}
