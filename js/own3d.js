// v9: the six chapters in 3D. The Optimizer360 ring, split into its six segments, is the world:
// it frames each chapter's scene, turns so the current chapter's segment comes forward and glows,
// keeps finished segments green, and closes into the full ring at the end. Scene panels tilt in 3D.
import * as THREE from "three";

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
const lerp = (a, b, t) => a + (b - a) * t;

const RO = 42, RS = 37.5, RE = 27, N = 6, PRE = 0.5, TOTAL = 7.4;
const innerAt = (t) => RS - (RS - RE) * Math.pow(t, 1.25);
const P = (r, t) => { const a = ((-45 + 360 * t) * Math.PI) / 180; return [r * Math.cos(a), -r * Math.sin(a)]; };
function segShape(k, gap = 0.006) {
  const t0 = k / N + gap, t1 = (k + 1) / N - gap, n = 40, s = new THREE.Shape();
  for (let i = 0; i <= n; i++) { const [x, y] = P(RO, t0 + ((t1 - t0) * i) / n); i ? s.lineTo(x, y) : s.moveTo(x, y); }
  for (let i = n; i >= 0; i--) { const t = t0 + ((t1 - t0) * i) / n; const [x, y] = P(innerAt(t), t); s.lineTo(x, y); }
  return s;
}
const PAL = {
  // v11: behind the glass scene the ring is a soft mint frame, not a dark green slab (finished segments pale, current one brand green but see-through)
  paper: { base: 0xf6f4ef, ghost: 0xd9d4ca, owned: 0xa9dcc0, active: 0x46b783, glow: 0x7fd3a6, hemi: 1.6, key: 2.4, ghostO: 0.3, ownedO: 0.55, activeO: 0.72, activeEm: 0.22, introO: 0.32, outroO: 0.42 },
  night: { base: 0x3a3e3f, ghost: 0x3a3e3f, owned: 0x2f6f52, active: 0x5cc58c, glow: 0x6fd89b, hemi: 0.7, key: 2.0, ghostO: 0.28, ownedO: 0.5, activeO: 0.7, activeEm: 0.35, introO: 0.4, outroO: 0.45 },
};

export function initOwn3D(sec, { reduced = false } = {}) {
  if (!sec) return false;
  const stage = $(".ownx__stage", sec), chapters = $$(".ox", sec);
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" }); } catch (e) { return false; }
  if (!renderer.getContext()) return false;
  const small = innerWidth < 760 || matchMedia("(pointer: coarse)").matches;
  let dpr = Math.min(devicePixelRatio || 1, 2); // phones keep a crisp 2x; only the adaptive step lowers it
  renderer.setPixelRatio(dpr); renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.setClearColor(0x000000, 0);
  const cv = renderer.domElement; cv.className = "own3d"; cv.setAttribute("aria-hidden", "true");
  stage.prepend(cv);
  sec.classList.add("is-3d");

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 16 / 9, 1, 400); camera.position.set(0, 0, 60);
  const hemi = new THREE.HemisphereLight(0xffffff, 0x999999, 1.4); scene.add(hemi);
  const key = new THREE.DirectionalLight(0xffffff, 2.4); key.position.set(-20, 30, 40); scene.add(key);
  const rim = new THREE.DirectionalLight(0xffffff, 0.8); rim.position.set(30, -10, -20); scene.add(rim);

  const ring = new THREE.Group(); scene.add(ring);
  const tilt = new THREE.Group(); ring.add(tilt);
  const segs = Array.from({ length: N }, (_, k) => {
    const geo = new THREE.ExtrudeGeometry(segShape(k), { depth: 7, bevelEnabled: true, bevelThickness: 0.9, bevelSize: 0.6, bevelSegments: 3, curveSegments: 1 });
    geo.translate(0, 0, -3.5);
    const mat = new THREE.MeshPhysicalMaterial({ roughness: 0.32, clearcoat: 0.7, clearcoatRoughness: 0.25, transparent: true });
    const mesh = new THREE.Mesh(geo, mat); tilt.add(mesh);
    const tm = (k + 0.5) / N; const [cx, cy] = P((RO + innerAt(tm)) / 2, tm);
    return { mesh, mat, tm, c: new THREE.Vector3(cx, cy, 0), z: 0, col: new THREE.Color(), em: 0, op: 1 };
  });
  // the glow behind the active segment
  const gTex = (() => { const c = document.createElement("canvas"); c.width = c.height = 128; const g = c.getContext("2d"); const r = g.createRadialGradient(64, 64, 0, 64, 64, 64); r.addColorStop(0, "rgba(255,255,255,1)"); r.addColorStop(1, "rgba(255,255,255,0)"); g.fillStyle = r; g.fillRect(0, 0, 128, 128); const t = new THREE.CanvasTexture(c); return t; })();
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: gTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.6 })); halo.scale.set(40, 40, 1); tilt.add(halo);
  const segLight = new THREE.PointLight(0x2fbf73, 0, 80, 2); tilt.add(segLight);
  // motes
  const mg = new THREE.BufferGeometry(), mp = new Float32Array((small ? 120 : 260) * 3);
  for (let i = 0; i < mp.length; i += 3) { mp[i] = (Math.random() - 0.5) * 70; mp[i + 1] = (Math.random() - 0.5) * 40; mp[i + 2] = -10 - Math.random() * 30; }
  mg.setAttribute("position", new THREE.BufferAttribute(mp, 3));
  const motes = new THREE.Points(mg, new THREE.PointsMaterial({ size: 0.22, map: gTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, color: 0x8fe8b6, opacity: 0.6 })); scene.add(motes);

  let Pal = PAL.paper, theme = "";
  const cBase = new THREE.Color(), cGhost = new THREE.Color(), cOwned = new THREE.Color(), cActive = new THREE.Color();
  function applyTheme() {
    theme = document.documentElement.dataset.theme === "night" ? "night" : "paper"; Pal = PAL[theme];
    cBase.set(Pal.base); cGhost.set(Pal.ghost); cOwned.set(Pal.owned); cActive.set(Pal.active);
    hemi.intensity = Pal.hemi; key.intensity = Pal.key; halo.material.color.set(Pal.glow); segLight.color.set(Pal.glow);
    motes.material.opacity = theme === "night" ? 0.6 : 0.35; motes.material.color.set(theme === "night" ? 0x8fe8b6 : 0x2fbf73);
  }

  let W = 1, H = 1;
  function size() {
    W = stage.clientWidth; H = stage.clientHeight;
    renderer.setSize(W, H, false); camera.aspect = W / H; camera.updateProjectionMatrix();
  }
  const worldPerPx = () => (2 * camera.position.z * Math.tan((camera.fov * Math.PI) / 360)) / H;

  let px = 0, py = 0, visible = false, rotZ = 0, slow = 0, lastNow = 0;
  const t0 = performance.now();
  addEventListener("pointermove", (e) => { px = e.clientX / innerWidth * 2 - 1; py = e.clientY / innerHeight * 2 - 1; }, { passive: true });
  function frame(now) {
    requestAnimationFrame(frame);
    if (!visible) { lastNow = 0; return; }
    const dt = lastNow ? now - lastNow : 16; lastNow = now;
    slow = dt > 26 ? slow + 1 : Math.max(0, slow - 1);
    if (slow > 40 && dpr > (small ? 1.5 : 1)) { dpr = Math.max(small ? 1.5 : 1, dpr - 0.25); renderer.setPixelRatio(dpr); size(); slow = 0; }
    const t = (now - t0) / 1000;
    const r = sec.getBoundingClientRect();
    const u = clamp(-r.top / Math.max(1, r.height - innerHeight)) * TOTAL;
    const cur = clamp(Math.floor(u - PRE), 0, N - 1), inCh = u > PRE && u < PRE + N;
    const intro = 1 - smooth(PRE - 0.15, PRE + 0.12, u), outro = smooth(PRE + N - 0.1, PRE + N + 0.35, u);

    // where the ring sits: centred for the intro and outro, framing the scene panel for each chapter
    const k = worldPerPx();
    const panel = $(".sc", chapters[cur]).getBoundingClientRect(), sr = stage.getBoundingClientRect();
    const pcx = panel.left + panel.width / 2 - sr.left, pcy = panel.top + panel.height / 2 - sr.top;
    // the ring always encloses the headline: never thinner than the title is wide
    const title = $(outro > intro ? ".ownx__outro .ownx__title" : ".ownx__intro .ownx__title", sec);
    const tw = title ? title.getBoundingClientRect().width : 0;
    const centreR = Math.max(Math.min(W, H) * (small ? 0.44 : 0.47), small ? 0 : tw * 0.66), panelR = small ? panel.width * 0.56 : Math.min(panel.width * 0.5, H * 0.46);
    const m = Math.max(intro, outro);
    window.__o360ring = { r: centreR }; // the hero ends on a ring exactly this size
    const cx = lerp(pcx, W / 2, m), cy = lerp(pcy, H / 2, m), R = lerp(panelR, centreR, m);
    ring.position.set((cx - W / 2) * k, -(cy - H / 2) * k, 0);
    ring.scale.setScalar((R * k) / RO);

    // turn the current segment to the upper left; untwist for intro and outro
    const want = inCh ? (135 - (45 - 360 * segs[cur].tm)) * Math.PI / 180 : 0;
    let target = lerp(want, 0, m);
    let d = target - rotZ; d = Math.atan2(Math.sin(d), Math.cos(d)); rotZ += d * (reduced ? 1 : 0.06);
    ring.rotation.z = rotZ;
    const tk = lerp(1, smooth(0.04, 0.35, u), intro); // flat at the hand-off, so it matches the hero's last frame
    tilt.rotation.x = ((reduced ? 0 : Math.sin(t * 0.5) * 0.05) + py * 0.12 - 0.08) * tk;
    tilt.rotation.y = ((reduced ? 0 : Math.cos(t * 0.4) * 0.06) + px * 0.16 + (inCh ? -0.18 : 0) * (1 - m)) * tk;

    // segment states: owned (done), active (glowing, forward), future (ghost); the whole mark for intro, all owned for outro
    segs.forEach((s, i) => {
      let col, em = 0, z = 0, op = 1;
      // behind the intro and outro headlines the ring is a soft ghost, so the words stay crisp
      if (m > 0.5) { col = outro > intro ? cOwned : cBase; em = outro > intro ? 0.12 : 0.05; op = outro > intro ? Pal.outroO : Pal.introO; }
      // v22: inside a chapter only its own segment is drawn; the rest of the ring steps out of the way
      else if (i === cur) { col = cActive; em = Pal.activeEm + Math.sin(t * 2.2) * 0.08; z = 4; op = Pal.activeO; }
      else { col = i < cur ? cOwned : cGhost; op = 0; }
      s.col.lerp(col, 0.12); s.mat.color.copy(s.col); s.mat.emissive.copy(s.col); s.em += (em - s.em) * 0.12; s.mat.emissiveIntensity = s.em;
      s.op += (op - s.op) * 0.12; s.mat.opacity = s.op; s.mat.depthWrite = s.op > 0.9; s.mesh.visible = s.op > 0.01;
      s.z += (z - s.z) * 0.1; s.mesh.position.z = s.z;
    });
    const a = segs[cur];
    halo.position.set(a.c.x, a.c.y, a.z - 6); halo.material.opacity = inCh ? 0.3 * (1 - m) : outro * 0.35;
    if (!inCh && outro > 0.5) halo.position.set(0, 0, -8), halo.scale.set(110, 110, 1); else halo.scale.set(40, 40, 1);
    segLight.position.set(a.c.x, a.c.y, 30); segLight.intensity = inCh ? 1800 * (1 - m) : 0;
    if (!reduced) { motes.rotation.z = t * 0.01; motes.position.y = Math.sin(t * 0.3) * 0.6; }

    // the scene panels lean with the pointer
    stage.style.setProperty("--ry", `${(-7 + px * 6).toFixed(2)}deg`);
    stage.style.setProperty("--rx", `${(3 - py * 4).toFixed(2)}deg`);
    renderer.render(scene, camera);
  }

  applyTheme(); size();
  new MutationObserver(applyTheme).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  addEventListener("resize", size);
  new IntersectionObserver((en) => en.forEach((e) => (visible = e.isIntersecting)), { rootMargin: "100px" }).observe(sec);
  requestAnimationFrame(frame);
  return true;
}
