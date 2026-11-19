// The key: one 3D object carried through the whole site.
// Its head is the Optimizer360 mark (the ring and the green keyhole); the blade is the way in.
// With a mouse, the key IS the cursor: small, tip first, it turns a quarter like a key in a lock
// on anything clickable, and fits into the keyhole in the corner, which opens the contact card.
// On touch screens the key sits in the corner instead.
const $ = (s, el = document) => el.querySelector(s);
const $$a = (s, el) => [...el.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const WELCOME = "This is your key to growth";

export function buildKey(T) {
  const body = new T.MeshPhysicalMaterial({ color: 0x111111, roughness: 0.3, metalness: 0.2, clearcoat: 1, clearcoatRoughness: 0.2 });
  const glow = new T.MeshPhysicalMaterial({ color: 0x1e7f56, emissive: 0x1e7f56, emissiveIntensity: 0.35, roughness: 0.25, clearcoat: 1 });
  const ext = (shape, depth) => new T.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.05, bevelSegments: 3, curveSegments: 40 });
  const key = new T.Group();
  // head: the ring of the mark, with the green keyhole inside
  const hole = new T.Path(); hole.absarc(0, 0, 0.94, 0, Math.PI * 2, true);
  const rg = new T.Shape(); rg.absarc(0, 0, 1.25, 0, Math.PI * 2, false); rg.holes.push(hole);
  const bowMesh = new T.Mesh(ext(rg, 0.34), body); bowMesh.position.z = -0.17;
  const kh = new T.Shape();
  kh.absarc(0, 0.16, 0.27, -Math.PI * 0.28, Math.PI * 1.28, false);
  kh.lineTo(-0.2, -0.58); kh.lineTo(0.2, -0.58); kh.closePath();
  const khMesh = new T.Mesh(ext(kh, 0.24), glow); khMesh.position.z = -0.12;
  const bow = new T.Group(); bow.add(bowMesh, khMesh); bow.position.y = 1.55;
  const collar = new T.Mesh(new T.CylinderGeometry(0.2, 0.2, 0.22, 28), body); collar.position.y = 0.2;
  const blade = new T.Mesh(new T.CylinderGeometry(0.13, 0.13, 2.6, 28), body); blade.position.y = -1.1;
  const tip = new T.Mesh(new T.SphereGeometry(0.13, 20, 14), body); tip.position.y = -2.4;
  const teeth = new T.Group();
  [[-1.55, 0.46], [-1.9, 0.3], [-2.2, 0.4]].forEach(([y, w]) => { const m = new T.Mesh(new T.BoxGeometry(w, 0.2, 0.16), glow); m.position.set(w / 2 + 0.08, y, 0); teeth.add(m); });
  key.add(bow, collar, blade, tip, teeth);
  const paint = () => {
    const night = document.documentElement.dataset.theme === "night";
    body.color.set(night ? 0xeeece6 : 0x111111);
    glow.color.set(night ? 0x6fd89b : 0x1e7f56); glow.emissive.set(night ? 0x6fd89b : 0x1e7f56);
  };
  paint();
  new MutationObserver(paint).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return { key, glow, tipY: -2.5 };
}

function scene3d(T, size, dist) {
  const renderer = new T.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.setSize(size, size);
  const scene = new T.Scene();
  const cam = new T.PerspectiveCamera(30, 1, 0.1, 100); cam.position.set(0, 0, dist || (size < 74 ? 8.2 : 9.4));
  scene.add(new T.AmbientLight(0xffffff, 1.7));
  const l1 = new T.DirectionalLight(0xffffff, 3.0); l1.position.set(3, 4, 6); scene.add(l1);
  const l2 = new T.DirectionalLight(0xffffff, 1.3); l2.position.set(-5, -2, 3); scene.add(l2);
  const rim = new T.PointLight(0x6fd89b, 22, 20, 2); rim.position.set(0, 1.5, -3); scene.add(rim);
  return { renderer, scene, cam };
}

export async function initKey({ reduced = false } = {}) {
  const dock = $("#key"), sheet = $("#keysheet");
  if (!dock || !sheet) return;
  setupSheet(dock, sheet);
  let T = null;
  try { T = await import("three"); } catch (e) { T = null; }
  let gl = !!T;
  if (gl) { try { const c = document.createElement("canvas"); gl = !!(c.getContext("webgl2") || c.getContext("webgl")); } catch (e) { gl = false; } }
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!gl) { dock.classList.add("key--flat"); return; }
  if (fine) cursorKey(T, dock, reduced); else dockKey(T, dock, reduced);
}

/* ---------- mouse: the key is the cursor ---------- */
function cursorKey(T, dock, reduced) {
  const html = document.documentElement;
  // the canvas is roomier than the key, so the ring of its head is never clipped when it turns or grows on hover
  const S = 64; // css px
  const { renderer, scene, cam } = scene3d(T, S, 12.5);
  const el = document.createElement("div"); el.className = "kc"; el.setAttribute("aria-hidden", "true");
  const tag = document.createElement("span"); tag.className = "kc__tag";
  el.appendChild(renderer.domElement); document.body.append(el, tag);
  const { key, glow, tipY } = buildKey(T);
  const tilt = new T.Group(); tilt.add(key); tilt.rotation.z = -2.356; // tip points up-left, like an arrow
  scene.add(tilt);
  html.classList.add("has-keycursor");

  const v = new T.Vector3();
  let mx = -200, my = -200, x = -200, y = -200, seen = false, hover = 0, hoverT = 0, turn = 0, turnT = 0, spin = 0, over = null, inLock = false, hidden = false;
  let hello = false;
  try { hello = sessionStorage.getItem("o360-key") === "1"; } catch (e) {}
  const say = (t, ms) => { tag.textContent = t; tag.classList.add("on"); clearTimeout(say.t); if (ms) say.t = setTimeout(() => tag.classList.remove("on"), ms); };
  const quiet = () => { clearTimeout(say.t); tag.classList.remove("on"); };

  addEventListener("pointermove", (e) => {
    if (e.pointerType && e.pointerType !== "mouse") return;
    mx = e.clientX; my = e.clientY;
    if (!seen) { seen = true; x = mx; y = my; el.classList.add("on"); }
    if (!hello && !html.classList.contains("is-intro")) { hello = true; try { sessionStorage.setItem("o360-key", "1"); } catch (er) {} say(WELCOME, 4200); }
  }, { passive: true });
  document.addEventListener("pointerover", (e) => {
    const t = e.target;
    hidden = !!t.closest("input, textarea, select, [contenteditable=true], iframe");
    el.classList.toggle("off", hidden);
    const lock = t.closest("#key");
    const hit = !hidden && t.closest("a, button, [role=tab], summary, label, .gate__doors li");
    inLock = !!lock;
    if (hit !== over) {
      over = hit; hoverT = hit ? 1 : 0; turnT = hit ? 1 : 0;
      if (lock) say("Fits here. Talk to us");
      else if (hit && hit.matches(".btn--green, .nav__cta, [data-key-open], [data-film=play]")) say("Turn the key");
      else if (tag.textContent !== WELCOME) quiet();
    }
  });
  document.addEventListener("pointerdown", () => { turnT = 2; });
  document.addEventListener("pointerup", () => { turnT = over ? 1 : 0; });
  document.addEventListener("mouseleave", () => el.classList.remove("on"));
  document.addEventListener("mouseenter", () => { if (seen) el.classList.add("on"); });

  function tick() {
    // in the keyhole: the key slides into the corner lock and turns a full circle
    let tx = mx, ty = my;
    if (inLock) { const r = dock.getBoundingClientRect(); tx = r.left + r.width / 2; ty = r.top + r.height / 2; }
    const k = reduced ? 1 : inLock ? 0.18 : 0.42;
    x += (tx - x) * k; y += (ty - y) * k;
    hover += (hoverT - hover) * 0.15;
    turn += ((inLock ? 4 : turnT) - turn) * 0.14;
    // idle: a gentle rock, so the head (the mark) stays facing you; on anything clickable it turns a quarter
    spin += reduced ? 0 : 0.03;
    key.rotation.y = Math.sin(spin) * 0.45 * (1 - hover) + turn * Math.PI / 2;
    const s = 1 + hover * 0.14; tilt.scale.set(s, s, s);
    glow.emissiveIntensity = (html.dataset.theme === "night" ? 0.5 : 0.3) + hover * 0.9;
    renderer.render(scene, cam);
    // place the canvas so the key's tip sits exactly on the pointer
    v.set(0, tipY, 0); key.localToWorld(v); v.project(cam);
    const px = (v.x * 0.5 + 0.5) * S, py = (-v.y * 0.5 + 0.5) * S;
    el.style.transform = `translate3d(${(x - px).toFixed(1)}px, ${(y - py).toFixed(1)}px, 0)`;
    tag.style.transform = `translate3d(${(x + 18).toFixed(1)}px, ${(y + 16).toFixed(1)}px, 0)`;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ---------- touch: the key lives in the corner ---------- */
function dockKey(T, dock, reduced) {
  // the canvas is exactly the button, and the camera stands back far enough that the whole key fits the circle
  const S = 56;
  const { renderer, scene, cam } = scene3d(T, S, 12.5);
  $(".key__3d", dock).appendChild(renderer.domElement);
  const { key, glow } = buildKey(T);
  const tilt = new T.Group(); tilt.add(key); tilt.rotation.z = -0.62; tilt.position.y = 0.15; scene.add(tilt);
  dock.classList.add("key--touch");
  let spin = 0, run = true;
  document.addEventListener("visibilitychange", () => { run = !document.hidden; if (run) requestAnimationFrame(tick); });
  function tick(now) {
    if (!run) return;
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    spin += reduced ? 0 : 0.008;
    key.rotation.y = spin + clamp(scrollY / max) * Math.PI * 6;
    glow.emissiveIntensity = (document.documentElement.dataset.theme === "night" ? 0.5 : 0.3) + Math.max(0, Math.sin(now / 500)) * 0.15;
    renderer.render(scene, cam);
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
  setTimeout(() => { dock.classList.add("is-hint"); setTimeout(() => dock.classList.remove("is-hint"), 4800); }, 2600);
}

/* ---------- the contact card ---------- */
function setupSheet(btn, sheet) {
  const card = $(".keysheet__card", sheet), form = $("form", sheet), first = $("input", sheet);
  let last = null;
  const open = () => { last = document.activeElement; sheet.hidden = false; document.documentElement.classList.add("is-sheet"); requestAnimationFrame(() => sheet.classList.add("is-open")); setTimeout(() => first && first.focus(), 250); btn.setAttribute("aria-expanded", "true"); };
  const close = () => { sheet.classList.remove("is-open"); document.documentElement.classList.remove("is-sheet"); btn.setAttribute("aria-expanded", "false"); setTimeout(() => (sheet.hidden = true), 400); if (last) last.focus(); };
  btn.addEventListener("click", open);
  document.querySelectorAll("[data-key-open]").forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); open(); }));
  $(".keysheet__x", sheet).addEventListener("click", close);
  sheet.addEventListener("click", (e) => { if (!card.contains(e.target)) close(); });
  $$a("a[href^='#']", sheet).forEach((a) => a.addEventListener("click", close));
  document.addEventListener("keydown", (e) => {
    if (sheet.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "Tab") { const f = $$a("input,select,textarea,button,a[href]", card); const a = f[0], z = f[f.length - 1]; if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); } }
  });
  // nothing is sent from the page: the note opens in the visitor's own email app
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(form), brand = (d.get("brand") || "").trim(), err = $(".keysheet__err", form);
    if (!brand) { err.hidden = false; $("input[name=brand]", form).focus(); return; }
    err.hidden = true;
    const body = `Hi Optimizer360,\n\nName: ${d.get("name") || ""}\nBrand or website: ${brand}\nWhat we want to own first: ${d.get("zone")}\n\n${d.get("note") || ""}`;
    location.href = `mailto:abhay@optimizer360.ai?subject=${encodeURIComponent("Let's open our door: " + brand)}&body=${encodeURIComponent(body)}`;
  });
}
