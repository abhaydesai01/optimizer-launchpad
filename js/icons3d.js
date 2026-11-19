// v22 · the two corner buttons as real 3D objects, not flat outlines.
//  · the lock (#key): the Optimizer360 mark in glossy 3D, ring and green keyhole, the lock the cursor key fits into
//  · the progress (#progress): the mark's six segments in 3D; each fills green as the reader moves through the page,
//    and the keyhole lights up at the end.
// One small WebGL renderer draws both and copies each frame into the buttons' own 2D canvases.
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { buildKey } from "./key.js";

const $ = (s, el = document) => el.querySelector(s);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;

// the mark's geometry (viewBox units, centre 50/50), as used by the logo and the chapters' ring
const RO = 42, RS = 37.5, RE = 27, N = 6;
const innerAt = (t) => RS - (RS - RE) * Math.pow(t, 1.25);
const P = (r, t) => { const a = ((-45 + 360 * t) * Math.PI) / 180; return [r * Math.cos(a), -r * Math.sin(a)]; };
function segShape(k, gap = 0.012) {
  const t0 = k / N + gap, t1 = (k + 1) / N - gap, n = 24, s = new THREE.Shape();
  for (let i = 0; i <= n; i++) { const [x, y] = P(RO, t0 + ((t1 - t0) * i) / n); i ? s.lineTo(x, y) : s.moveTo(x, y); }
  for (let i = n; i >= 0; i--) { const t = t0 + ((t1 - t0) * i) / n; const [x, y] = P(innerAt(t), t); s.lineTo(x, y); }
  return s;
}

export function initIcons3D({ reduced = false } = {}) {
  const lockBtn = $("#key"), progBtn = $("#progress");
  // touch screens carry the whole key in the corner already (key.js), and the progress button is hidden there
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches || !lockBtn) return;
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); if (!renderer.getContext()) return; } catch (e) { return; }
  const S = 58, dpr = Math.min(devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr); renderer.setSize(S, S, false);
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.outputColorSpace = THREE.SRGBColorSpace;
  const env = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;

  const mk = (btn, cls) => {
    const c = document.createElement("canvas"); c.width = c.height = Math.round(S * dpr); c.className = "ic3d " + cls; c.setAttribute("aria-hidden", "true");
    btn.append(c); btn.classList.add("has-ic3d");
    return c.getContext("2d");
  };
  const stage = (dist) => {
    const scene = new THREE.Scene(); scene.environment = env;
    const cam = new THREE.PerspectiveCamera(30, 1, 0.1, 100); cam.position.set(0, 0, dist);
    const l = new THREE.DirectionalLight(0xffffff, 1.6); l.position.set(2, 3, 5); scene.add(l, new THREE.AmbientLight(0xffffff, 0.4));
    return { scene, cam };
  };
  const night = () => document.documentElement.dataset.theme === "night";

  /* the lock: the mark, from the key's own head */
  const L = stage(7.2);
  const { key, glow } = buildKey(THREE);
  const head = key.children[0]; key.remove(head); head.position.set(0, 0, 0);
  const lock = new THREE.Group(); lock.add(head); L.scene.add(lock);
  const ctxL = mk(lockBtn, "ic3d--lock");

  /* the progress ring: six segments and a keyhole */
  let G = null, ctxP = null;
  if (progBtn) {
    G = stage(7.4);
    const ring = new THREE.Group(), sc = 1.3 / RO; ring.scale.set(sc, sc, sc); G.scene.add(ring);
    G.segs = Array.from({ length: N }, (_, k) => {
      const geo = new THREE.ExtrudeGeometry(segShape(k), { depth: 7, bevelEnabled: true, bevelThickness: 1.6, bevelSize: 1.2, bevelSegments: 3, curveSegments: 1 });
      geo.translate(0, 0, -3.5);
      const mat = new THREE.MeshPhysicalMaterial({ roughness: 0.28, metalness: 0.05, clearcoat: 1, clearcoatRoughness: 0.15 });
      const m = new THREE.Mesh(geo, mat); ring.add(m);
      return { mat, f: 0 };
    });
    const kh = new THREE.Shape(); kh.absarc(0, 5.1, 9, 0, Math.PI * 2, false);
    const khBody = new THREE.Shape(); khBody.moveTo(-3.6, 1.5); khBody.lineTo(3.6, 1.5); khBody.lineTo(7.2, -20.1); khBody.lineTo(-7.2, -20.1); khBody.closePath();
    const khMat = new THREE.MeshPhysicalMaterial({ color: 0x2fbf73, emissive: 0x2fbf73, emissiveIntensity: 0.5, roughness: 0.25, clearcoat: 1, transparent: true, opacity: 0 });
    const ext = (s) => new THREE.ExtrudeGeometry(s, { depth: 5, bevelEnabled: true, bevelThickness: 1, bevelSize: 0.8, bevelSegments: 2, curveSegments: 24 });
    G.kh = new THREE.Group(); G.kh.add(new THREE.Mesh(ext(kh), khMat), new THREE.Mesh(ext(khBody), khMat)); G.kh.position.z = -2.5; ring.add(G.kh);
    G.khMat = khMat; G.ring = ring;
    ctxP = mk(progBtn, "ic3d--prog");
  }

  const cGhost = new THREE.Color(), cFill = new THREE.Color(), tmp = new THREE.Color();
  let hoverL = 0, hoverP = 0, hL = 0, hP = 0, px = 0, py = 0, run = true;
  lockBtn.addEventListener("pointerenter", () => (hL = 1)); lockBtn.addEventListener("pointerleave", () => (hL = 0));
  if (progBtn) { progBtn.addEventListener("pointerenter", () => (hP = 1)); progBtn.addEventListener("pointerleave", () => (hP = 0)); }
  addEventListener("pointermove", (e) => { px = e.clientX / innerWidth * 2 - 1; py = e.clientY / innerHeight * 2 - 1; }, { passive: true });
  document.addEventListener("visibilitychange", () => { run = !document.hidden; if (run) requestAnimationFrame(tick); });
  const blit = (ctx, sc, cam) => { renderer.render(sc, cam); ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); ctx.drawImage(renderer.domElement, 0, 0); };

  function tick(now) {
    if (!run) return;
    const t = now / 1000, nt = night();
    hoverL += (hL - hoverL) * 0.12; hoverP += (hP - hoverP) * 0.12;
    // the lock rocks gently and faces the pointer; on hover it turns to greet the key
    lock.rotation.y = (reduced ? 0 : Math.sin(t * 0.9) * 0.32) + px * 0.25;
    lock.rotation.x = py * 0.18 + (reduced ? 0 : Math.cos(t * 0.7) * 0.06);
    lock.rotation.z = hoverL * -0.35;
    lock.scale.setScalar(1 + hoverL * 0.1);
    glow.emissiveIntensity = (nt ? 0.55 : 0.35) + hoverL * 0.8 + (reduced ? 0 : Math.max(0, Math.sin(t * 2)) * 0.12);
    blit(ctxL, L.scene, L.cam);

    if (G) {
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight), p = clamp(scrollY / max);
      cGhost.set(nt ? 0x4a4f50 : 0xdcd8cf); cFill.set(nt ? 0x6fd89b : 0x1e7f56);
      G.segs.forEach((s, k) => {
        const f = clamp(p * N - k); s.f += (f - s.f) * 0.15;
        s.mat.color.copy(tmp.copy(cGhost).lerp(cFill, s.f));
        s.mat.emissive.copy(cFill); s.mat.emissiveIntensity = s.f * (nt ? 0.35 : 0.12);
      });
      const k = clamp((p - 0.9) / 0.08); G.khMat.opacity = k; G.kh.visible = k > 0.01;
      G.khMat.color.copy(cFill); G.khMat.emissive.copy(cFill);
      G.ring.rotation.y = (reduced ? 0 : Math.sin(t * 0.8 + 1.4) * 0.3) + px * 0.25 + hoverP * 0.5;
      G.ring.rotation.x = py * 0.18 + (reduced ? 0 : Math.cos(t * 0.6) * 0.06) - hoverP * 0.2;
      const s = (1.3 / RO) * (1 + hoverP * 0.08); G.ring.scale.set(s, s, s);
      blit(ctxP, G.scene, G.cam);
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
