// 3D Optimizer360 mark: the compounding ring (six segments) + the keyhole.
// Geometry follows the logo exactly: outer radius 42, inner edge tapering 37.5 → 27
// around 360°, starting at the top-right step. "fill" morphs a segment from a thin
// hairline ring (0) to the full compounding thickness (1).
import * as THREE from "three";

const INK = new THREE.Color("#ECE9E3");   // porcelain ring on the dark site
const GHOST = new THREE.Color("#2B2F30");
const GREEN = new THREE.Color("#5FAE8D");
const N_SEG = 6, SAMPLES = 36, DEPTH = 8, RO = 42, RS = 37.5, RE = 27, THIN = 39.6;

const innerFull = (t) => RS - (RS - RE) * Math.pow(t, 1.25);
const ang = (t) => ((-45 + 360 * t) * Math.PI) / 180;           // SVG angle (clockwise on screen)
const P = (r, a, z) => new THREE.Vector3(r * Math.cos(a), -r * Math.sin(a), z);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };

class Segment {
  constructor(k) {
    this.t0 = k / N_SEG; this.t1 = (k + 1) / N_SEG; this.fill = -1;
    this.geo = new THREE.BufferGeometry();
    this.mat = new THREE.MeshPhysicalMaterial({ color: INK.clone(), roughness: 0.38, clearcoat: 0.9, clearcoatRoughness: 0.25 });
    this.mesh = new THREE.Mesh(this.geo, this.mat);
    this.mesh.castShadow = true;
    const am = ang((this.t0 + this.t1) / 2);
    this.dir = new THREE.Vector3(Math.cos(am), -Math.sin(am), 0);
    this.spin = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
    this.zKick = (Math.random() - 0.5) * 60;
    this.update(1);
  }

  update(fill) {
    if (Math.abs(fill - this.fill) < 0.002) return;
    this.fill = fill;
    const pos = [], nor = [], h = DEPTH / 2;
    const tri = (A, B, C, nA, nB, nC, want) => {
      const n = new THREE.Vector3().subVectors(B, A).cross(new THREE.Vector3().subVectors(C, A));
      if (n.dot(want) < 0) { [B, C] = [C, B]; [nB, nC] = [nC, nB]; }
      for (const v of [A, B, C]) pos.push(v.x, v.y, v.z);
      for (const v of [nA, nB, nC]) nor.push(v.x, v.y, v.z);
    };
    const quad = (A, B, C, D, nA, nB, nC, nD, want) => { tri(A, B, C, nA, nB, nC, want); tri(A, C, D, nA, nC, nD, want); };
    const ts = [], as = [], ri = [];
    for (let i = 0; i <= SAMPLES; i++) {
      const t = this.t0 + ((this.t1 - this.t0) * i) / SAMPLES;
      ts.push(t); as.push(ang(t)); ri.push(THIN + (innerFull(t) - THIN) * fill);
    }
    const zF = new THREE.Vector3(0, 0, 1), zB = new THREE.Vector3(0, 0, -1);
    for (let i = 0; i < SAMPLES; i++) {
      const a0 = as[i], a1 = as[i + 1];
      const o0f = P(RO, a0, h), o1f = P(RO, a1, h), i0f = P(ri[i], a0, h), i1f = P(ri[i + 1], a1, h);
      const o0b = P(RO, a0, -h), o1b = P(RO, a1, -h), i0b = P(ri[i], a0, -h), i1b = P(ri[i + 1], a1, -h);
      quad(o0f, o1f, i1f, i0f, zF, zF, zF, zF, zF);
      quad(o0b, o1b, i1b, i0b, zB, zB, zB, zB, zB);
      const r0 = P(1, a0, 0), r1 = P(1, a1, 0), rm = P(1, (a0 + a1) / 2, 0);
      quad(o0f, o1f, o1b, o0b, r0, r1, r1, r0, rm);
      const n0 = r0.clone().negate(), n1 = r1.clone().negate();
      quad(i0f, i1f, i1b, i0b, n0, n1, n1, n0, rm.clone().negate());
    }
    const cap = (idx, sign) => {
      const a = as[idx];
      const T = new THREE.Vector3(-Math.sin(a), -Math.cos(a), 0).multiplyScalar(sign);
      quad(P(RO, a, h), P(ri[idx], a, h), P(ri[idx], a, -h), P(RO, a, -h), T, T, T, T, T);
    };
    cap(0, -1); cap(SAMPLES, 1);
    this.geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    this.geo.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
    this.geo.attributes.position.needsUpdate = true;
    this.geo.computeBoundingSphere();
  }
}

function keyholeMesh() {
  // logo keyhole: centre (50,53) scale 0.9 in 100-unit space → centred coords
  const s = 0.9, cx = 0, cy = -3, hy = cy + 9 * s, r = 10 * s;
  const top = hy - 4 * s, bot = cy - 19 * s, tw = 4 * s, bw = 8 * s;
  const head = new THREE.Shape(); head.absarc(cx, hy, r, 0, Math.PI * 2, false);
  const stem = new THREE.Shape();
  stem.moveTo(cx - tw, top); stem.lineTo(cx + tw, top); stem.lineTo(cx + bw, bot); stem.lineTo(cx - bw, bot); stem.closePath();
  const geo = new THREE.ExtrudeGeometry([head, stem], { depth: DEPTH + 1, bevelEnabled: true, bevelThickness: 0.6, bevelSize: 0.5, bevelSegments: 3, curveSegments: 48 });
  geo.translate(0, 0, -(DEPTH + 1) / 2);
  const mat = new THREE.MeshStandardMaterial({ color: GREEN, emissive: GREEN, emissiveIntensity: 0.3, roughness: 0.35 });
  const m = new THREE.Mesh(geo, mat); m.castShadow = true;
  return m;
}

function glowSprite() {
  const c = document.createElement("canvas"); c.width = c.height = 128;
  const g = c.getContext("2d"), grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, "rgba(111,183,154,0.75)"); grd.addColorStop(1, "rgba(111,183,154,0)");
  g.fillStyle = grd; g.fillRect(0, 0, 128, 128);
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), depthWrite: false, transparent: true }));
  sp.scale.set(130, 130, 1); sp.position.z = -6;
  return sp;
}

export function initRing(canvas, { reducedMotion = false } = {}) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch (e) {
    document.documentElement.classList.add("no-webgl");
    return { setMode() {}, setEngineStep() {}, setPointer() {} };
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 1, 2000);
  camera.position.set(0, 0, 420);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x1d2a26, 0.9));
  const key = new THREE.DirectionalLight(0xffffff, 2.1);
  key.position.set(-70, 110, 170); key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, { left: -90, right: 90, top: 90, bottom: -90, near: 10, far: 500 });
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x8fe0c0, 1.6); rim.position.set(120, -40, -60); scene.add(rim);

  const root = new THREE.Group(); scene.add(root);
  key.target = root;
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(420, 420), new THREE.ShadowMaterial({ opacity: 0 }));
  shadow.position.z = -16; shadow.receiveShadow = true; root.add(shadow);
  const tilt = new THREE.Group(); root.add(tilt);
  const ring = new THREE.Group(); tilt.add(ring);
  const segs = Array.from({ length: N_SEG }, (_, k) => new Segment(k));
  segs.forEach((s) => ring.add(s.mesh));
  const keyGroup = new THREE.Group(); tilt.add(keyGroup);
  const keyhole = keyholeMesh(); keyGroup.add(keyhole);
  const glow = glowSprite(); keyGroup.add(glow);

  const mk = () => ({ x: 0, y: 0, scale: 1, spread: 0, keyIn: 1, glow: 1, click: 0, opacity: 0, fills: Array(N_SEG).fill(1), inks: Array(N_SEG).fill(1) });
  const S = mk(), T = mk();
  let mode = "hero", modeP = 0, step = -1, intro = reducedMotion ? 1 : 0;
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  let vw = 1, vh = 1, mobile = false;

  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    vh = 2 * camera.position.z * Math.tan((camera.fov * Math.PI) / 360);
    vw = vh * camera.aspect;
    mobile = w < 820;
  }
  window.addEventListener("resize", resize); resize();

  function target() {
    const p = modeP;
    Object.assign(T, { spread: 0, keyIn: 1, glow: 1, click: 0, opacity: 1 });
    T.fills = Array(N_SEG).fill(1); T.inks = Array(N_SEG).fill(1);
    if (mode === "hidden") { T.opacity = 0; return; }
    if (mode === "hero") {
      T.x = mobile ? 0 : vw * 0.29; T.y = (mobile ? vh * 0.16 : -vh * 0.02) + p * vh * 0.25;
      T.scale = mobile ? 0.82 : 1.15; T.opacity = (mobile ? 0.3 : 1) * (1 - smooth(0.55, 1, p));
      T.fills = T.fills.map((_, k) => smooth(0, 1, intro * N_SEG - k));
      T.glow = 0.4 + intro * 0.9;
    } else if (mode === "problem") {
      T.x = mobile ? 0 : -vw * 0.28; T.y = mobile ? 0 : -vh * 0.34; T.scale = mobile ? 0.8 : 0.46;
      T.spread = smooth(0.08, 0.6, p); T.keyIn = 1 - smooth(0.05, 0.4, p); T.glow = 0.2;
      T.opacity = mobile ? 0.22 : 1;
    } else if (mode === "turn") {
      T.x = 0; T.y = mobile ? vh * 0.12 : vh * 0.2; T.scale = mobile ? 0.85 : 0.98;
      T.spread = 1 - smooth(0.0, 0.42, p); T.keyIn = smooth(0.45, 0.68, p);
      T.click = (1 - smooth(0.36, 0.5, p)) * 0.35; T.glow = 0.2 + smooth(0.62, 0.9, p) * 1.5;
    } else if (mode === "engine") {
      T.x = mobile ? 0 : -vw * 0.28; T.y = mobile ? vh * 0.05 : -vh * 0.27; T.scale = mobile ? 0.7 : 0.6;
      T.fills = T.fills.map((_, k) => (k <= step ? 1 : 0.12));
      T.inks = T.inks.map((_, k) => (k <= step ? 1 : 0));
      T.glow = step >= 5 ? 1.7 : 0.25 + Math.max(step, 0) * 0.12;
      T.opacity = mobile ? 0.2 : 1;
    } else if (mode === "cta") {
      T.x = 0; T.y = mobile ? vh * 0.24 : vh * 0.27; T.scale = mobile ? 0.62 : 0.85; T.glow = 1.8;
      T.opacity = smooth(0, 0.35, p);
    }
  }

  const clock = new THREE.Clock();
  function frame() {
    const dt = Math.min(clock.getDelta(), 0.05), t = clock.elapsedTime;
    if (intro < 1) intro = Math.min(1, intro + dt / 1.8);
    target();
    const k = reducedMotion ? 1 : 1 - Math.exp(-dt * 4.2);
    for (const key of ["x", "y", "scale", "spread", "keyIn", "glow", "click", "opacity"]) S[key] += (T[key] - S[key]) * k;
    for (let i = 0; i < N_SEG; i++) { S.fills[i] += (T.fills[i] - S.fills[i]) * k; S.inks[i] += (T.inks[i] - S.inks[i]) * k; }
    canvas.style.opacity = S.opacity.toFixed(3);
    if (S.opacity > 0.01) {
      root.position.set(S.x, S.y, 0); root.scale.setScalar(S.scale);
      pointer.x += (pointer.tx - pointer.x) * 0.06; pointer.y += (pointer.ty - pointer.y) * 0.06;
      const idle = reducedMotion ? 0 : 1;
      tilt.rotation.y = idle * Math.sin(t * 0.35) * 0.2 + pointer.x * 0.28;
      tilt.rotation.x = idle * Math.cos(t * 0.3) * 0.07 - pointer.y * 0.16;
      ring.rotation.z = S.click;
      segs.forEach((s, i) => {
        s.update(S.fills[i]);
        s.mat.color.copy(GHOST).lerp(INK, S.inks[i]);
        const sp = S.spread;
        s.mesh.position.copy(s.dir).multiplyScalar(sp * 44); s.mesh.position.z = s.zKick * sp;
        s.mesh.setRotationFromAxisAngle(s.spin, sp * 0.9);
      });
      keyGroup.position.set(0, (1 - S.keyIn) * 70, (1 - S.keyIn) * 90);
      keyhole.material.opacity = S.keyIn; keyhole.material.transparent = S.keyIn < 0.99;
      keyhole.material.emissiveIntensity = 0.08 + S.glow * 0.16;
      glow.material.opacity = clamp(S.glow / 1.8) * S.keyIn;
      renderer.render(scene, camera);
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  return {
    setMode(m, p = 0) { mode = m; modeP = p; },
    setEngineStep(i) { step = i; },
    setPointer(x, y) { pointer.tx = x; pointer.ty = y; },
  };
}
