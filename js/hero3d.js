// v9: the hero in real-time 3D. A field of growth, driven by the same scroll as the "rented growth" card:
// budget on → grey columns (rented traffic) rise in a wave; budget off → they flash and collapse;
// "Own it" → the Optimizer360 ring rises from the floor and green columns grow outward from it, compounding.
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { ringGeometry, keyholeShape, portalMaterial, LOGO_SCALE } from "./gate3d.js";

const $ = (s, el = document) => el.querySelector(s);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
const lerp = (a, b, t) => a + (b - a) * t;

const PAL = {
  paper: { bg: 0xffffff, floor: 0xf3f1ec, rented: 0xd6d1c8, bad: 0xc0533a, owned: 0x166b47, cap: [0.22, 1.15, 0.6], ring: 0xf2efe8, ghost: 0xf6f4ef, ghostO: 0.32, hemi: 0.75, key: 1.7, grid: 0x111111, gridO: 0.07, bloom: 0.3, exposure: 1 },
  night: { bg: 0x070808, floor: 0x0d0e0e, rented: 0x3b3e3f, bad: 0xf08a6e, owned: 0x247a52, cap: [0.28, 1.05, 0.6], ring: 0x26292a, ghost: 0x3a3e3f, ghostO: 0.4, hemi: 0.3, key: 1.4, grid: 0xf2f2f0, gridO: 0.06, bloom: 0.42, exposure: 1 },
};

export function initHero3D(sec, { reduced = false } = {}) {
  if (!sec) return false;
  const stage = $(".herox__stage", sec);
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "high-performance" }); } catch (e) { return false; }
  if (!renderer.getContext()) return false;
  const small = innerWidth < 760 || matchMedia("(pointer: coarse)").matches;
  let dpr = Math.min(devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr);
  renderer.toneMapping = THREE.NoToneMapping; // exact colours, so the scene's background is the page's own white or black
  renderer.shadowMap.enabled = !small; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const cv = renderer.domElement; cv.className = "hero3d"; cv.setAttribute("aria-hidden", "true");
  const shade = document.createElement("div"); shade.className = "hero3d__shade"; shade.setAttribute("aria-hidden", "true");
  const edge = document.createElement("div"); edge.className = "hero3d__edge"; edge.setAttribute("aria-hidden", "true");
  stage.prepend(cv, shade, edge);
  sec.classList.add("is-3d");

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 16 / 9, 0.1, 400);
  const composer = new EffectComposer(renderer, new THREE.WebGLRenderTarget(4, 4, { type: THREE.HalfFloatType, samples: small ? 0 : 4 }));
  composer.setPixelRatio(dpr);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), 0.5, 0.5, 1.0); composer.addPass(bloom);
  composer.addPass(new OutputPass());
  const fog = new THREE.Fog(0xffffff, 40, 90); scene.fog = fog;
  const bg = new THREE.Color(); scene.background = bg;

  // floor and a faint data grid
  const floorMat = new THREE.MeshStandardMaterial({ roughness: 0.6, transparent: true });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(300, 300), floorMat); floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
  const grid = new THREE.GridHelper(80, 64); grid.material.transparent = true; grid.position.y = 0.01; scene.add(grid);

  // lights
  const hemi = new THREE.HemisphereLight(0xffffff, 0xbbbbbb, 1); scene.add(hemi);
  const key = new THREE.DirectionalLight(0xffffff, 2.5); key.position.set(-16, 28, 20); key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048); Object.assign(key.shadow.camera, { left: -26, right: 26, top: 22, bottom: -22, near: 1, far: 90 }); key.shadow.bias = -0.0005; key.shadow.normalBias = 0.02;
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xffffff, 0.5); fill.position.set(20, 12, 30); scene.add(fill);

  // the field
  const COLS = small ? 18 : 28, ROWS = small ? 11 : 16, SP = 1.2, CLEAR = 4.4;
  const cells = [];
  for (let i = 0; i < COLS; i++) for (let j = 0; j < ROWS; j++) {
    const x = (i - (COLS - 1) / 2) * SP, z = (j - (ROWS - 1) / 2) * SP - 2;
    const r = Math.hypot(x, z + 2);
    if (r < CLEAR) continue;
    cells.push({ x, z, d: i / (COLS - 1), r, rnd: Math.random(), ph: Math.random() * 6.28 });
  }
  const rMax = Math.max(...cells.map((c) => c.r));
  const box = new THREE.BoxGeometry(0.86, 1, 0.86); box.translate(0, 0.5, 0);
  const colMat = new THREE.MeshStandardMaterial({ roughness: 0.35, metalness: 0.05 });
  const cols = new THREE.InstancedMesh(box, colMat, cells.length); cols.castShadow = cols.receiveShadow = true; scene.add(cols);
  const capMat = new THREE.MeshBasicMaterial({ toneMapped: false });
  const caps = new THREE.InstancedMesh(new THREE.BoxGeometry(0.9, 0.06, 0.9), capMat, cells.length); scene.add(caps);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), pos = new THREE.Vector3(), scl = new THREE.Vector3(), col = new THREE.Color();
  const cRent = new THREE.Color(), cBad = new THREE.Color(), cOwn = new THREE.Color();
  for (let k = 0; k < cells.length; k++) cols.setColorAt(k, cRent);

  // the ring, rising from the floor
  const RS = 0.72;
  const ringMat = new THREE.MeshPhysicalMaterial({ clearcoat: 0.8, clearcoatRoughness: 0.2, roughness: 0.3, transparent: true });
  const ringGroup = new THREE.Group(); ringGroup.position.set(0, -12, -2); scene.add(ringGroup);
  const ring = new THREE.Mesh(ringGeometry(), ringMat); ring.scale.setScalar(RS); ring.castShadow = true; ringGroup.add(ring);
  const pm = portalMaterial();
  const kh = new THREE.Mesh(new THREE.ShapeGeometry(keyholeShape(0), 48), pm); kh.scale.setScalar(RS); kh.position.y = 5.1 * LOGO_SCALE * RS; ringGroup.add(kh);
  const ringLight = new THREE.PointLight(0x2fbf73, 0, 18, 2); ringLight.position.set(0, 0, 3); ringGroup.add(ringLight);
  const RING_TOP = 0.1 + 9.5 * RS;

  let P = PAL.paper, theme = "";
  const cRing = new THREE.Color(), cGhost = new THREE.Color();
  function applyTheme() {
    theme = document.documentElement.dataset.theme === "night" ? "night" : "paper"; P = PAL[theme];
    bg.set(P.bg); fog.color.set(P.bg); floorMat.color.set(P.floor);
    grid.material.color.set(P.grid); grid.material.opacity = P.gridO;
    cRent.set(P.rented); cBad.set(P.bad); cOwn.set(P.owned); capMat.color.setRGB(...P.cap);
    ringMat.color.set(P.ring); cRing.set(P.ring); cGhost.set(P.ghost); pm.uniforms.uColor.value.set(theme === "night" ? 0x6fd89b : 0x2fbf73); ringLight.color.copy(pm.uniforms.uColor.value);
    hemi.intensity = P.hemi; key.intensity = P.key; renderer.toneMappingExposure = P.exposure; bloom.strength = P.bloom;
  }

  let W = 1, H = 1;
  function size() {
    W = stage.clientWidth; H = stage.clientHeight;
    renderer.setSize(W, H, false); composer.setSize(W, H); bloom.resolution.set(W / 2, H / 2);
    camera.aspect = W / H; camera.fov = W / H < 1 ? 58 : 36; camera.updateProjectionMatrix();
  }

  let px = 0, py = 0, visible = false, slow = 0, lastNow = 0;
  const t0 = performance.now();
  addEventListener("pointermove", (e) => { px = e.clientX / innerWidth * 2 - 1; py = e.clientY / innerHeight * 2 - 1; }, { passive: true });
  function frame(now) {
    requestAnimationFrame(frame);
    if (!visible) { lastNow = 0; return; }
    const dt = lastNow ? now - lastNow : 16; lastNow = now;
    slow = dt > 26 ? slow + 1 : Math.max(0, slow - 1);
    if (slow > 40 && dpr > (small ? 1.5 : 1)) { dpr = Math.max(small ? 1.5 : 1, dpr - 0.25); renderer.setPixelRatio(dpr); composer.setPixelRatio(dpr); size(); slow = 0; }
    const t = (now - t0) / 1000;
    const r = sec.getBoundingClientRect();
    const s = clamp(-r.top / Math.max(1, r.height - innerHeight));

    // story beats, matched to the card: rise until .4, budget off at .42, the turn from .6
    const rise = 0.22 + 0.78 * smooth(0.0, 0.4, s), turn = smooth(0.56, 0.74, s), end = smooth(0.86, 0.985, s);
    for (let k = 0; k < cells.length; k++) {
      const c = cells[k];
      const ri = clamp(rise * 1.5 - c.d * 0.5);
      const rentH = (0.22 + 0.4 * c.rnd) * (1 + 7.5 * ri * ri * (0.55 + 0.45 * c.d));
      const fall = smooth(0.42 + c.rnd * 0.05, 0.5 + c.rnd * 0.06, s);
      let h = lerp(rentH, 0.05, fall);
      const rr = c.r / rMax, own = smooth(0.6 + rr * 0.14, 0.74 + rr * 0.14, s);
      const front = clamp((c.z + 2) / 9), ownH = (0.4 + 4.2 * Math.pow(1 - rr, 2.2) + c.rnd * 0.7) * (1 - 0.6 * front) * own;
      const isOwn = ownH > h;
      h = Math.max(h, ownH);
      if (!reduced) h *= 1 + 0.035 * Math.sin(t * 1.3 + c.ph);
      h *= 1 - end; // the growth sinks away as the camera turns to the ring
      const gone = end > 0.97 ? 0.0001 : 1;
      pos.set(c.x, 0, c.z); scl.set(gone, Math.max(0.0001, h), gone); m4.compose(pos, q, scl); cols.setMatrixAt(k, m4);
      if (isOwn) col.copy(cRent).lerp(cOwn, own);
      else col.copy(cRent).lerp(cBad, Math.sin(fall * Math.PI) * 0.9);
      cols.setColorAt(k, col);
      pos.set(c.x, h + 0.03, c.z); scl.setScalar(isOwn && own > 0.05 && end < 0.6 ? 1 : 0.0001); m4.compose(pos, q, scl); caps.setMatrixAt(k, m4);
    }
    cols.instanceMatrix.needsUpdate = true; cols.instanceColor.needsUpdate = true; caps.instanceMatrix.needsUpdate = true;

    // the ring rises behind "Own it"
    const up = smooth(0.58, 0.76, s);
    const RW = 9.5 * RS, ringY = lerp(lerp(-RING_TOP - 1, 0.1, up), RW + 0.6, end);
    ringGroup.position.y = ringY;
    ringGroup.rotation.y = reduced ? 0 : Math.sin(t * 0.35) * 0.12 * (1 - end);
    pm.uniforms.uTime.value = reduced ? 3 : t; pm.uniforms.uPower.value = (0.9 + up * 0.6) * (1 - end); kh.visible = end < 0.97;
    // the ring becomes the light ghost ring the chapters open with
    ringMat.opacity = lerp(1, P.ghostO, end); ringMat.color.copy(cRing).lerp(cGhost, end); ringMat.depthWrite = end < 0.5;
    grid.material.opacity = P.gridO * (1 - end);
    floorMat.opacity = 1 - end; floor.visible = end < 0.99; floorMat.depthWrite = end < 0.5; // the floor melts away, leaving only the ring on the page
    ringLight.intensity = 40 * up * (1 - end);

    // camera: a slow drift, a lean toward the pointer; the field sits right of the copy, then centres for the turn
    const a = (reduced ? 0 : Math.sin(t * 0.12) * 0.12) + px * 0.07 + lerp(-0.25, 0, rise) * 0.4;
    // on a tall phone screen, stand back until the whole field of columns (and the ring) fits the width: nothing gets cut
    const fit = Math.max(1, 25 / (2 * 31 * Math.tan((camera.fov * Math.PI) / 360) * (W / H)));
    const dist = lerp(31, 33, turn) * fit, hgt = lerp(lerp(15, 11, rise), 14.5, turn) * fit;
    camera.position.set(Math.sin(a) * dist, hgt - py * 0.6, -2 + Math.cos(a) * dist);
    const look = new THREE.Vector3(0, lerp(1.8, 10.5, turn), -2); // at the turn the ring and growth sit below the words
    // the end of the shot: face the ring head-on, centred, at exactly the size the chapters' ring starts at
    if (end > 0) {
      const Rpx = (window.__o360ring && window.__o360ring.r) || Math.min(W, H) * 0.47;
      const dd = (RW * (H / 2)) / (Rpx * Math.tan((camera.fov * Math.PI) / 360));
      camera.position.lerp(new THREE.Vector3(0, ringY, -2 + dd), end);
      look.lerp(new THREE.Vector3(0, ringY, -2), end);
    }
    camera.lookAt(look);
    const off = (W / H > 1.15 && !small ? lerp(-0.26, 0, turn) * W : 0) * (1 - end); // v22: the field plays right of the card
    // phones: the column wave lives in the top half, the rented-growth card below it, so neither covers the other
    const lift = W / H < 0.8 ? lerp(lerp(-H * 0.3, H * 0.2, smooth(0.06, 0.2, s)), -H * 0.05, turn) : small ? -H * 0.06 : 0;
    camera.setViewOffset(W, H, off, lift * (1 - end), W, H);
    edge.style.opacity = (1 - end).toFixed(3);
    shade.style.opacity = (1 - turn).toFixed(3);
    composer.render();
  }

  applyTheme(); size();
  new MutationObserver(applyTheme).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  addEventListener("resize", size);
  new IntersectionObserver((en) => en.forEach((e) => (visible = e.isIntersecting)), { rootMargin: "100px" }).observe(sec);
  requestAnimationFrame(frame);
  return true;
}
