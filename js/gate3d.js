// v9: the door as a real-time 3D film (three.js), scrubbed by scroll.
// Act: a giant Optimizer360 ring on a misty plain → the agent (a light) greets you → the key flies in,
// turns, the keyhole opens → through into a hall of six doors → door one opens onto the data room.
// White mode: porcelain ring at dawn. Dark mode: stone ring at dusk. Same story, same camera.
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { Reflector } from "three/addons/objects/Reflector.js";
import { buildKey } from "./key.js";
export { ringGeometry, keyholeShape, portalMaterial, glowTex, KH, S as LOGO_SCALE, RING_R };

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
const lerp = (a, b, t) => a + (b - a) * t;

/* ---------- palettes ---------- */
const PAL = {
  paper: {
    skyTop: 0x5d8fc4, skyMid: 0xbcd1e3, horizon: 0xf2c993, sun: 0xffcf8a, fog: 0xe9e1d4,
    ground: 0xd8cebd, hill: 0xb9c3c6, gate: 0xf2efe8, gateRough: 0.3, plinth: 0xe4ddd0, mist: 0xfffaf2,
    hallWall: 0xe3ded5, hallArch: 0xfbfaf7, hallFloor: 0xf2efe9, strip: 0xffe2b4, room: 0xe9efeb, panel: "light",
    green: 0x2fbf73, hemi: 0.8, sunI: 2.6, fill: 0.45, exposure: 0.92, bloom: 0.5,
  },
  night: {
    skyTop: 0x0a1322, skyMid: 0x37344d, horizon: 0xe58a4c, sun: 0xffa45e, fog: 0x2b2731,
    ground: 0x141618, hill: 0x2a2833, gate: 0x26292a, gateRough: 0.5, plinth: 0x1d1f20, mist: 0x8d8486,
    hallWall: 0x151718, hallArch: 0x2a2d2e, hallFloor: 0x0c0d0e, strip: 0xffc48a, room: 0x060807, panel: "dark",
    green: 0x6fd89b, hemi: 0.45, sunI: 2.2, fill: 0.25, exposure: 1.0, bloom: 0.85,
  },
};

/* ---------- geometry from the logo ---------- */
const LOGO_R = 42, RING_R = 9.5, S = RING_R / LOGO_R;
function ringShape() {
  const shape = new THREE.Shape(), N = 180;
  const P = (r, t) => { const a = ((-45 + 360 * t) * Math.PI) / 180; return [r * Math.cos(a), -r * Math.sin(a)]; };
  for (let k = 0; k <= N; k++) { const [x, y] = P(LOGO_R, k / N); k ? shape.lineTo(x, y) : shape.moveTo(x, y); }
  for (let k = N; k >= 0; k--) { const t = k / N; const [x, y] = P(37.5 - 10.5 * Math.pow(t, 1.25), t); shape.lineTo(x, y); }
  return shape;
}
function ringGeometry(depth = 10.6) {
  const g = new THREE.ExtrudeGeometry(ringShape(), { depth, bevelEnabled: true, bevelThickness: 1.1, bevelSize: 0.7, bevelSegments: 4, steps: 1 });
  g.translate(0, 0, -depth / 2); g.scale(S, S, S); g.computeVertexNormals();
  return g;
}
// keyhole (relative to the keyhole circle centre), in world units
const KH = { r: 9 * S, ty: -3.6 * S, th: 3.6 * S, by: -25.2 * S, bh: 7.2 * S };
function sidePoint() {
  const A = new THREE.Vector2(KH.th, KH.ty), B = new THREE.Vector2(KH.bh, KH.by), d = B.clone().sub(A);
  const a = d.dot(d), b = 2 * A.dot(d), c = A.dot(A) - KH.r * KH.r, t = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
  return A.add(d.multiplyScalar(t));
}
function keyholeShape(side = 0) {
  const P = sidePoint(), aP = Math.atan2(P.y, P.x), s = new THREE.Shape();
  if (side === 0) {
    s.moveTo(KH.bh, KH.by); s.lineTo(P.x, P.y); s.absarc(0, 0, KH.r, aP, Math.PI - aP, false); s.lineTo(-KH.bh, KH.by); s.closePath();
  } else if (side > 0) {
    s.moveTo(0, KH.by); s.lineTo(KH.bh, KH.by); s.lineTo(P.x, P.y); s.absarc(0, 0, KH.r, aP, Math.PI / 2, false); s.lineTo(0, KH.by);
  } else {
    s.moveTo(0, KH.by); s.lineTo(0, KH.r); s.absarc(0, 0, KH.r, Math.PI / 2, Math.PI - aP, false); s.lineTo(-KH.bh, KH.by); s.lineTo(0, KH.by);
  }
  return s;
}
function archShape(w, h, r, inner = false) {
  // an arched door: straight sides to h, semicircle on top; inner = just the opening
  const s = new THREE.Shape();
  s.moveTo(-w, 0); s.lineTo(-w, h); s.absarc(0, h, w, Math.PI, 0, true); s.lineTo(w, 0); s.lineTo(-w, 0);
  return s;
}
function archFrame(W, IW, H) {
  const s = new THREE.Shape();
  s.moveTo(-W, 0); s.lineTo(-W, H); s.absarc(0, H, W, Math.PI, 0, true); s.lineTo(W, 0); s.lineTo(IW, 0); s.lineTo(IW, H);
  s.absarc(0, H, IW, 0, Math.PI, false); s.lineTo(-IW, 0); s.lineTo(-W, 0);
  return s;
}

/* ---------- materials ---------- */
const NOISE = `
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float noise(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.-2.*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), u.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y); }
float fbm(vec2 p){ float v = 0., a = .5; for (int i = 0; i < 5; i++){ v += a*noise(p); p = p*2.03 + vec2(1.7, 9.2); a *= .5; } return v; }`;
function portalMaterial(core = new THREE.Vector2(0, -1.4)) {
  return new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uPower: { value: 1 }, uColor: { value: new THREE.Color(0x2fbf73) }, uCore: { value: core } },
    vertexShader: `varying vec2 vP; void main(){ vP = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }`,
    fragmentShader: `uniform float uTime, uPower; uniform vec3 uColor; uniform vec2 uCore; varying vec2 vP; ${NOISE}
      void main(){
        vec2 p = vP * .9; float t = uTime * .22;
        vec2 q = vec2(fbm(p + vec2(0., t)), fbm(p + vec2(5.2, -t)));
        float n = fbm(p * 1.3 + 2.6 * q + vec2(t * .6, -t));
        vec2 d = vP - uCore; float core = exp(-dot(d, d) * .2);
        vec3 col = uColor * (.22 + 1.05 * n) + vec3(.9, 1., .95) * pow(n, 4.) * .9 + mix(uColor, vec3(1.), .35) * core * .45;
        gl_FragColor = vec4(col * uPower, 1.);
      }`,
    side: THREE.DoubleSide,
  });
}
function skyMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: { top: { value: new THREE.Color() }, mid: { value: new THREE.Color() }, hor: { value: new THREE.Color() }, sunC: { value: new THREE.Color() }, sunDir: { value: new THREE.Vector3(-.5, .12, -.85).normalize() }, ground: { value: new THREE.Color() } },
    vertexShader: `varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }`,
    fragmentShader: `uniform vec3 top, mid, hor, sunC, sunDir, ground; varying vec3 vD;
      void main(){
        float h = vD.y;
        vec3 c = mix(hor, mid, smoothstep(0., .22, h)); c = mix(c, top, smoothstep(.22, .85, h));
        float s = max(dot(normalize(vD), sunDir), 0.);
        c += sunC * (pow(s, 900.) * 6. + pow(s, 24.) * .45 + pow(s, 4.) * .12);
        c = mix(c, mix(hor, ground, .6), smoothstep(0., -.08, h));
        gl_FragColor = vec4(c, 1.);
      }`,
    side: THREE.BackSide, depthWrite: false, fog: false,
  });
}
function canvasTex(w, h, draw) {
  const c = document.createElement("canvas"); c.width = w; c.height = h; draw(c.getContext("2d"), w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
}
const glowTex = () => canvasTex(128, 128, (g, w) => { const r = g.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w / 2); r.addColorStop(0, "rgba(255,255,255,1)"); r.addColorStop(.25, "rgba(255,255,255,.55)"); r.addColorStop(1, "rgba(255,255,255,0)"); g.fillStyle = r; g.fillRect(0, 0, w, w); });
const mistTex = () => canvasTex(256, 256, (g, w) => { for (let i = 0; i < 14; i++) { const x = w * (.25 + Math.random() * .5), y = w * (.3 + Math.random() * .4), r = w * (.12 + Math.random() * .2); const gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, "rgba(255,255,255,.22)"); gr.addColorStop(1, "rgba(255,255,255,0)"); g.fillStyle = gr; g.fillRect(0, 0, w, w); } });

/* dashboard panels for the data room */
function panelTex(kind, dark) {
  return canvasTex(640, 400, (g, w, h) => {
    const bg = dark ? "rgba(16,20,19,.92)" : "rgba(255,255,255,.94)", ink = dark ? "#EEF2EF" : "#111111", dim = dark ? "rgba(238,242,239,.55)" : "rgba(17,17,17,.5)", gr = dark ? "#6FD89B" : "#1E7F56", line = dark ? "rgba(111,216,155,.35)" : "rgba(30,127,86,.25)";
    const rr = (x, y, ww, hh, r) => { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + ww, y, x + ww, y + hh, r); g.arcTo(x + ww, y + hh, x, y + hh, r); g.arcTo(x, y + hh, x, y, r); g.arcTo(x, y, x + ww, y, r); g.closePath(); };
    rr(6, 6, w - 12, h - 12, 28); g.fillStyle = bg; g.fill(); g.lineWidth = 3; g.strokeStyle = line; g.stroke();
    g.font = "600 22px Jost, sans-serif"; g.fillStyle = dim; g.fillText(kind.title.toUpperCase(), 40, 58);
    if (kind.type === "num") { g.font = "600 150px 'Futura O360', Jost, sans-serif"; g.fillStyle = gr; g.fillText(kind.v, 36, 230); g.font = "500 26px Jost, sans-serif"; g.fillStyle = ink; g.fillText(kind.sub, 42, 300); }
    if (kind.type === "bars") { kind.v.forEach((v, i) => { g.fillStyle = dark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.06)"; rr(40, 96 + i * 46, 560, 18, 9); g.fill(); g.fillStyle = gr; rr(40, 96 + i * 46, 560 * v, 18, 9); g.fill(); }); }
    if (kind.type === "line") { g.strokeStyle = gr; g.lineWidth = 6; g.beginPath(); kind.v.forEach((v, i) => { const x = 40 + i * (560 / (kind.v.length - 1)), y = 340 - v * 240; i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.stroke(); g.fillStyle = gr; const lv = kind.v[kind.v.length - 1]; g.beginPath(); g.arc(600, 340 - lv * 240, 10, 0, 7); g.fill(); }
    if (kind.type === "list") { kind.v.forEach((t, i) => { g.font = "500 26px Jost, sans-serif"; g.fillStyle = ink; g.fillText(t[0], 40, 120 + i * 62); g.fillStyle = t[1].startsWith("#") ? gr : dim; g.textAlign = "right"; g.fillText(t[1], 600, 120 + i * 62); g.textAlign = "left"; }); }
  });
}
const PANELS = [
  { type: "num", title: "Visibility score", v: "58%", sub: "up from 32% at week 1" },
  { type: "bars", title: "Answer share by engine", v: [.72, .61, .54, .48, .35, .29] },
  { type: "line", title: "Share of voice", v: [.12, .15, .2, .22, .31, .38, .44, .52, .6] },
  { type: "list", title: "Live answers", v: [["ChatGPT", "#2"], ["Gemini", "#1"], ["Perplexity", "#3"], ["Claude", "#2"]] },
  { type: "num", title: "Engines tracked", v: "8", sub: "1,000 prompts a day" },
  { type: "list", title: "Sources AI cites", v: [["Your site", "#rising"], ["Wikipedia", "cited"], ["Reddit", "cited"], ["Press", "cited"]] },
  { type: "bars", title: "Readiness", v: [.6, .5, .5, .5, .4, .4] },
  { type: "line", title: "Citation rate", v: [.2, .22, .21, .3, .34, .41, .47, .55, .63] },
];

/* ---------- the camera: keyframes [u, position, look-at, zone] ---------- */
const KEYS = [
  [0.00, [0, 3.2, 66], [0, 8.8, 0], 0],
  [0.08, [-5, 3.6, 50], [0, 9.2, 0], 0],
  [0.16, [5, 4.4, 36], [0, 9.6, 0], 0],
  [0.23, [15, 6, 31], [2.5, 9.6, 2], 0],
  [0.30, [5, 9, 20], [0.6, 10.8, 0], 0],
  [0.36, [-6.2, 12.4, 10.5], [0, 11.5, 0], 0],
  [0.40, [-2.6, 11.9, 7.2], [0, 11.6, 0], 0],
  [0.428, [0, 11.6, -2.5], [0, 11.4, -20], 0],
  [0.44, [0, 2.7, -178], [0, 4.2, -200], 1],
  [0.52, [0, 2.9, -186], [0, 4.6, -224], 1],
  [0.60, [2, 2.9, -191], [7, 4.2, -224], 1],
  [0.68, [1, 2.9, -194], [-7, 4.2, -224], 1],
  [0.76, [-4, 3.1, -197], [-21, 4.2, -211], 1],
  [0.83, [-14.1, 3.6, -207.5], [-22.1, 3.9, -211.7], 1],
  [0.856, [-22.8, 3.6, -212.2], [-27.4, 3.6, -214.5], 1],
  [0.866, [0, 3.1, -558], [0, 3.3, -600], 2],
  [0.95, [0, 3.3, -584], [0, 3.5, -625], 2],
  [1.00, [0, 3.5, -592], [0, 3.7, -625], 2],
];
const BEATS = { approach: [0, .16], agent: [.16, .30], through: [.30, .42], hall: [.445, .60], doors: [.60, .835], door: [.87, 1.001] };
const HALL = new THREE.Vector3(0, 0, -200), ROOM_Z = -600, HR = 25.6;
const DOOR_ANG = [-62, -37, -12, 12, 37, 62].map((d) => (d * Math.PI) / 180);

function cr(p0, p1, p2, p3, t) {
  const t2 = t * t, t3 = t2 * t;
  return 0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
}
function camAt(u, outP, outL) {
  let i = KEYS.length - 2;
  for (let k = 0; k < KEYS.length - 1; k++) if (u < KEYS[k + 1][0]) { i = k; break; }
  const A = KEYS[i], B = KEYS[i + 1], t = clamp((u - A[0]) / (B[0] - A[0]));
  if (A[3] !== B[3]) { const K = t < 0.5 ? A : B; outP.set(...K[1]); outL.set(...K[2]); return K[3]; }
  const P = KEYS[i - 1] && KEYS[i - 1][3] === A[3] ? KEYS[i - 1] : A, N = KEYS[i + 2] && KEYS[i + 2][3] === B[3] ? KEYS[i + 2] : B;
  for (let a = 0; a < 3; a++) { outP.setComponent(a, cr(P[1][a], A[1][a], B[1][a], N[1][a], t)); outL.setComponent(a, cr(P[2][a], A[2][a], B[2][a], N[2][a], t)); }
  return A[3];
}

/* ---------- build ---------- */
export function initGate3D(sec, { reduced = false } = {}) {
  if (!sec) return false;
  const stage = $(".gate__stage", sec);
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "high-performance" }); } catch (e) { return false; }
  if (!renderer.getContext()) return false;
  const small = Math.min(innerWidth, innerHeight) < 700 || matchMedia("(pointer: coarse)").matches;
  const DPR = Math.min(devicePixelRatio || 1, 2);
  renderer.setPixelRatio(DPR);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.shadowMap.enabled = !small; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const cv = renderer.domElement; cv.className = "gate__3d"; cv.setAttribute("aria-hidden", "true");
  $(".gate__film", sec).replaceWith(cv);
  sec.classList.add("is-3d");

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 16 / 9, 0.1, 1200);
  const rt = new THREE.WebGLRenderTarget(4, 4, { type: THREE.HalfFloatType, samples: small ? 0 : 4 });
  const composer = new EffectComposer(renderer, rt); composer.setPixelRatio(DPR);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), 0.7, 0.5, 1.05);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  const GLOW = glowTex(), MIST = mistTex();
  const portals = [];

  /* zone A: the plain and the gate */
  const A = new THREE.Group(); scene.add(A);
  const skyMat = skyMaterial();
  const sky = new THREE.Mesh(new THREE.SphereGeometry(900, 48, 24), skyMat); A.add(sky);
  const groundMat = new THREE.MeshStandardMaterial({ roughness: 0.95 });
  const ground = new THREE.Mesh(new THREE.CircleGeometry(700, 64), groundMat); ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; A.add(ground);
  const plinthMat = new THREE.MeshStandardMaterial({ roughness: 0.7 });
  const plinth = new THREE.Mesh(new THREE.BoxGeometry(26, 1, 12), plinthMat); plinth.position.set(0, 0.5, -1); plinth.receiveShadow = plinth.castShadow = true; A.add(plinth);
  for (let k = 0; k < 4; k++) { const h = 1 - 0.25 * k; const st = new THREE.Mesh(new THREE.BoxGeometry(11 - k * 0.0, h, 1), plinthMat); st.position.set(0, h / 2, 5.5 + k); st.receiveShadow = st.castShadow = true; A.add(st); }
  const gateMat = new THREE.MeshPhysicalMaterial({ clearcoat: 0.7, clearcoatRoughness: 0.25 });
  const RING_Y = 1 + RING_R + 0.15, KY = RING_Y + 5.1 * S;
  const ring = new THREE.Mesh(ringGeometry(), gateMat); ring.position.set(0, RING_Y, 0); ring.castShadow = ring.receiveShadow = true; A.add(ring);
  // keyhole: two leaves that swing open, a light behind them
  const kh = new THREE.Group(); kh.position.set(0, KY, 0); A.add(kh);
  const lightMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.7, 0.92, 0.8), toneMapped: false });
  const behind = new THREE.Mesh(new THREE.ShapeGeometry(keyholeShape(0), 48), lightMat); behind.position.z = -0.25; kh.add(behind);
  const leaves = [-1, 1].map((side) => {
    const pm = portalMaterial(); portals.push(pm);
    const geo = new THREE.ShapeGeometry(keyholeShape(side), 48);
    const hingeX = side * KH.bh; geo.translate(-hingeX, 0, 0);
    const mesh = new THREE.Mesh(geo, pm);
    const hinge = new THREE.Group(); hinge.position.x = hingeX; hinge.add(mesh); kh.add(hinge);
    return { hinge, side };
  });
  const khGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: GLOW, color: 0x2fbf73, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false })); khGlow.scale.set(8, 10, 1); khGlow.position.set(0, -1.6, -0.8); kh.add(khGlow);
  const portalLight = new THREE.PointLight(0x2fbf73, 60, 34, 2); portalLight.position.set(0, KY - 2, 3); A.add(portalLight);
  // sun, sky light, fill
  const hemi = new THREE.HemisphereLight(0xffffff, 0xcccccc, 1); A.add(hemi);
  const sun = new THREE.DirectionalLight(0xffffff, 3); sun.position.set(-45, 30, -70); sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048); Object.assign(sun.shadow.camera, { left: -30, right: 30, top: 30, bottom: -10, near: 1, far: 220 }); sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.03;
  A.add(sun);
  const fill = new THREE.DirectionalLight(0xffffff, 1); fill.position.set(30, 40, 70); A.add(fill);
  const sunDisc = new THREE.Sprite(new THREE.SpriteMaterial({ map: GLOW, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }));
  sunDisc.position.copy(new THREE.Vector3(-.5, .12, -.85).normalize().multiplyScalar(700)); sunDisc.scale.set(260, 260, 1); A.add(sunDisc);
  // distant hills: layers the fog turns to haze, so the plain has depth
  const hillMat = new THREE.MeshStandardMaterial({ roughness: 1 });
  [[-150, -260, 90, 22], [-40, -320, 120, 30], [110, -280, 100, 20], [220, -200, 80, 16], [-260, -160, 90, 18], [30, -420, 160, 40], [260, -380, 140, 34], [-300, -380, 150, 36]].forEach(([x, z, r, h]) => {
    const hill = new THREE.Mesh(new THREE.SphereGeometry(1, 40, 20), hillMat); hill.scale.set(r, h, r * 0.6); hill.position.set(x, -2, z); A.add(hill);
  });
  // mist
  const mistMat = new THREE.SpriteMaterial({ map: MIST, transparent: true, depthWrite: false, opacity: 0.5 });
  const mists = [];
  for (let i = 0; i < (small ? 26 : 46); i++) {
    const m = new THREE.Sprite(mistMat); const s = 26 + Math.random() * 46;
    m.scale.set(s, s * 0.3, 1); const side = Math.random() < 0.5 ? -1 : 1; m.position.set(side * (14 + Math.random() * 100), 0.6 + Math.random() * 2.6, -110 + Math.random() * 120);
    m.userData.v = (Math.random() - 0.5) * 0.6; mists.push(m); A.add(m);
  }

  /* motes: rising light, all zones */
  function motes(n, spread, center, color) {
    const g = new THREE.BufferGeometry(), p = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { p[i * 3] = center.x + (Math.random() - 0.5) * spread.x; p[i * 3 + 1] = center.y + Math.random() * spread.y; p[i * 3 + 2] = center.z + (Math.random() - 0.5) * spread.z; }
    g.setAttribute("position", new THREE.BufferAttribute(p, 3));
    const pts = new THREE.Points(g, new THREE.PointsMaterial({ size: 0.12, map: GLOW, color, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true }));
    pts.userData = { base: center.y, h: spread.y }; return pts;
  }
  const motesA = motes(small ? 240 : 520, new THREE.Vector3(40, 18, 40), new THREE.Vector3(0, 0.5, 4), 0x9cf0c0); A.add(motesA);

  /* the agent: a light with a ring */
  const agent = new THREE.Group(); scene.add(agent);
  const agentCore = new THREE.Mesh(new THREE.SphereGeometry(0.42, 32, 16), new THREE.MeshBasicMaterial({ color: new THREE.Color(1.3, 1.5, 1.4), toneMapped: false }));
  const agentRing = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.045, 12, 64), new THREE.MeshBasicMaterial({ color: new THREE.Color(0.6, 2.0, 1.1), toneMapped: false }));
  const agentRing2 = agentRing.clone(); agentRing2.scale.setScalar(1.35); agentRing2.material = agentRing.material.clone(); agentRing2.material.transparent = true; agentRing2.material.opacity = 0.5;
  const agentHalo = new THREE.Sprite(new THREE.SpriteMaterial({ map: GLOW, color: 0x7ff0b0, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false })); agentHalo.scale.set(3.4, 3.4, 1);
  agent.add(agentCore, agentRing, agentRing2, agentHalo);
  const agentLight = new THREE.PointLight(0x7ff0b0, 18, 12, 2); agent.add(agentLight);

  /* the key, big, for the film */
  const bigKey = buildKey(THREE);
  const keyRig = new THREE.Group(); keyRig.add(bigKey.key); bigKey.key.scale.setScalar(0.62); scene.add(keyRig);

  /* zone B: the hall of six doors */
  const B = new THREE.Group(); B.position.copy(HALL); scene.add(B);
  const wallMat = new THREE.MeshStandardMaterial({ roughness: 0.55, side: THREE.BackSide });
  const wall = new THREE.Mesh(new THREE.CylinderGeometry(HR, HR, 20, 96, 1, true), wallMat); wall.position.y = 10; B.add(wall);
  const ceilMat = new THREE.MeshStandardMaterial({ roughness: 0.6, side: THREE.DoubleSide });
  const ceil = new THREE.Mesh(new THREE.RingGeometry(7.5, HR, 96, 1), ceilMat); ceil.rotation.x = Math.PI / 2; ceil.position.y = 20; B.add(ceil);
  const oculus = new THREE.Mesh(new THREE.CircleGeometry(7.5, 64), new THREE.MeshBasicMaterial({ color: new THREE.Color(1.6, 1.6, 1.55), toneMapped: false, side: THREE.DoubleSide })); oculus.rotation.x = Math.PI / 2; oculus.position.y = 20.02; B.add(oculus);
  const ocuRing = new THREE.Mesh(new THREE.TorusGeometry(7.5, 0.12, 12, 128), new THREE.MeshBasicMaterial({ color: new THREE.Color(2, 1.8, 1.4), toneMapped: false })); ocuRing.rotation.x = Math.PI / 2; ocuRing.position.y = 19.9; B.add(ocuRing);
  let mirror = null;
  if (!small) {
    mirror = new Reflector(new THREE.CircleGeometry(HR, 96), { textureWidth: 1024, textureHeight: 1024, color: 0x9a9a9a, clipBias: 0.003 });
    mirror.rotation.x = -Math.PI / 2; mirror.position.y = 0; B.add(mirror);
  }
  const floorMat = new THREE.MeshStandardMaterial({ roughness: 0.22, transparent: true, opacity: small ? 1 : 0.8 });
  const floor = new THREE.Mesh(new THREE.CircleGeometry(HR, 96), floorMat); floor.rotation.x = -Math.PI / 2; floor.position.y = 0.02; B.add(floor);
  // floor inlay: a thin green ring
  const inlay = new THREE.Mesh(new THREE.RingGeometry(12, 12.08, 128), new THREE.MeshBasicMaterial({ color: new THREE.Color(0.5, 1.6, 0.9), toneMapped: false })); inlay.rotation.x = -Math.PI / 2; inlay.position.y = 0.04; B.add(inlay);
  const hallHemi = new THREE.HemisphereLight(0xffffff, 0x888888, 1); B.add(hallHemi);
  const archMat = new THREE.MeshStandardMaterial({ roughness: 0.4 });
  const panelMat = new THREE.MeshStandardMaterial({ roughness: 0.5 });
  const stripMat = new THREE.MeshBasicMaterial({ toneMapped: false });
  const doors = [];
  DOOR_ANG.forEach((th, i) => {
    const g = new THREE.Group();
    g.position.set(Math.sin(th) * (HR - 0.4), 0, -Math.cos(th) * (HR - 0.4)); g.lookAt(0, 0, 0); B.add(g);
    const W = 2.55, IW = 1.95, H = 6;
    const frame = new THREE.Mesh(new THREE.ExtrudeGeometry(archFrame(W, IW, H), { depth: 0.7, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.05, bevelSegments: 2, curveSegments: 40 }), archMat); g.add(frame);
    // glowing edge inside the arch
    const pts = []; pts.push(new THREE.Vector3(-IW + 0.06, 0.05, 0.75)); for (let k = 0; k <= 40; k++) { const a = Math.PI - (Math.PI * k) / 40; pts.push(new THREE.Vector3(Math.cos(a) * (IW - 0.06), H + Math.sin(a) * (IW - 0.06), 0.75)); } pts.push(new THREE.Vector3(IW - 0.06, 0.05, 0.75));
    const strip = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 120, 0.035, 8, false), i === 0 ? new THREE.MeshBasicMaterial({ color: new THREE.Color(0.6, 2.4, 1.3), toneMapped: false }) : stripMat); g.add(strip);
    const opening = archShape(IW, H, IW);
    if (i === 0) {
      const pm = portalMaterial(new THREE.Vector2(0, 3)); portals.push(pm);
      const p = new THREE.Mesh(new THREE.ShapeGeometry(opening, 40), pm); p.position.z = 0.1; g.add(p);
      const leafGeo = new THREE.ShapeGeometry(opening, 40); leafGeo.translate(IW, 0, 0);
      const leaf = new THREE.Mesh(leafGeo, panelMat); const hinge = new THREE.Group(); hinge.position.set(-IW, 0, 0.12); hinge.add(leaf); hinge.rotation.y = -1.25; g.add(hinge);
      const dl = new THREE.PointLight(0x5fe39b, 40, 16, 2); dl.position.set(0, 3, 2.5); g.add(dl);
      doors.push({ g, hinge, top: new THREE.Vector3(0, H + IW + 0.9, 0.7) });
    } else {
      const p = new THREE.Mesh(new THREE.ShapeGeometry(opening, 40), panelMat); p.position.z = 0.1; g.add(p);
      const seam = new THREE.Mesh(new THREE.BoxGeometry(0.03, H + IW - 0.4, 0.02), archMat); seam.position.set(0, (H + IW) / 2 - 0.2, 0.13); g.add(seam);
      const wl = new THREE.PointLight(0xffd7a0, 14, 9, 2); wl.position.set(0, 0.6, 2); g.add(wl);
      doors.push({ g, top: new THREE.Vector3(0, H + IW + 0.9, 0.7) });
    }
  });
  for (let k = 0; k < 24; k++) {
    const a = (k / 24) * Math.PI * 2; if (DOOR_ANG.some((d) => Math.abs(Math.atan2(Math.sin(a - d), Math.cos(a - d))) < 0.2)) continue;
    const pil = new THREE.Mesh(new THREE.BoxGeometry(0.9, 20, 0.5), archMat); pil.position.set(Math.sin(a) * (HR - 0.25), 10, -Math.cos(a) * (HR - 0.25)); pil.lookAt(0, 10, 0); B.add(pil);
  }
  const base = new THREE.Mesh(new THREE.CylinderGeometry(HR - 0.3, HR - 0.3, 0.5, 96, 1, true), new THREE.MeshBasicMaterial({ color: new THREE.Color(0.9, 1.6, 1.1), toneMapped: false, side: THREE.BackSide })); base.position.y = 0.25; base.scale.y = 0.12; B.add(base);
  const motesB = motes(small ? 160 : 320, new THREE.Vector3(40, 16, 40), new THREE.Vector3(0, 0.3, 0), 0xffe9c8); B.add(motesB);

  /* zone C: the data room */
  const C = new THREE.Group(); C.position.z = ROOM_Z; scene.add(C);
  const panels = [];
  const panelGroup = new THREE.Group(); C.add(panelGroup);
  for (let i = 0; i < (small ? 22 : 34); i++) {
    const z = 38 - i * 2.1 + (Math.random() - 0.5), a = i * 2.4 + Math.random(), r = 4.6 + Math.random() * 3.6;
    const m = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 2), new THREE.MeshBasicMaterial({ transparent: true, side: THREE.DoubleSide, depthWrite: false }));
    m.position.set(Math.cos(a) * r * 1.25, 3.4 + Math.sin(a) * r * 0.75, z); m.lookAt(0, 3.4, z + 6);
    m.userData = { k: i % PANELS.length, a, r, z, s: 0.3 + Math.random() * 0.4 }; panels.push(m); panelGroup.add(m);
  }
  const emblem = new THREE.Group(); emblem.position.set(0, 3.5, -25); C.add(emblem);
  const emRing = new THREE.Mesh(ringGeometry(8), new THREE.MeshPhysicalMaterial({ clearcoat: 1, roughness: 0.3 })); emRing.scale.setScalar(0.42); emblem.add(emRing);
  const emPortalMat = portalMaterial(); portals.push(emPortalMat);
  const emKey = new THREE.Mesh(new THREE.ShapeGeometry(keyholeShape(0), 48), emPortalMat); emKey.scale.setScalar(0.42); emKey.position.y = 5.1 * S * 0.42; emblem.add(emKey);
  const emGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: GLOW, color: 0x2fbf73, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false })); emGlow.scale.set(14, 14, 1); emblem.add(emGlow);
  const roomLight = new THREE.HemisphereLight(0xffffff, 0x666666, 1.4); C.add(roomLight);
  const motesC = motes(small ? 200 : 420, new THREE.Vector3(30, 12, 70), new THREE.Vector3(0, -2, 10), 0x9cf0c0); C.add(motesC);

  /* theme */
  let theme = "", P = PAL.paper;
  const FOGS = [new THREE.Fog(0xffffff, 60, 420), new THREE.Fog(0xffffff, 30, 70), new THREE.FogExp2(0xffffff, 0.028)];
  const bgHall = new THREE.Color(), bgRoom = new THREE.Color();
  function applyTheme() {
    theme = document.documentElement.dataset.theme === "night" ? "night" : "paper"; P = PAL[theme];
    const u = skyMat.uniforms; u.top.value.set(P.skyTop); u.mid.value.set(P.skyMid); u.hor.value.set(P.horizon); u.sunC.value.set(P.sun); u.ground.value.set(P.ground);
    groundMat.color.set(P.ground); hillMat.color.set(P.hill); plinthMat.color.set(P.plinth); gateMat.color.set(P.gate); gateMat.roughness = P.gateRough;
    emRing.material.color.set(P.gate);
    mistMat.color.set(P.mist); mistMat.opacity = theme === "night" ? 0.28 : 0.34;
    hemi.color.set(P.skyMid); hemi.groundColor.set(P.ground); hemi.intensity = P.hemi;
    sun.color.set(P.sun); sun.intensity = P.sunI; fill.intensity = P.fill;
    if (theme === "night") sun.position.set(-45, 30, -70); else sun.position.set(-34, 42, 46);
    sunDisc.material.color.set(P.sun);
    wallMat.color.set(P.hallWall); ceilMat.color.set(P.hallWall); archMat.color.set(P.hallArch); panelMat.color.set(theme === "night" ? 0x222526 : 0xfbfaf7);
    floorMat.color.set(P.hallFloor); stripMat.color.setRGB(...(theme === "night" ? [2.2, 1.5, 0.9] : [2.0, 1.6, 1.1]));
    hallHemi.intensity = theme === "night" ? 0.25 : 1.15;
    roomLight.intensity = theme === "night" ? 0.4 : 1.4;
    const g = new THREE.Color(P.green);
    portals.forEach((pm) => pm.uniforms.uColor.value.copy(g)); portalLight.color.copy(g); khGlow.material.color.copy(g); emGlow.material.color.copy(g);
    panels.forEach((m) => { if (m.material.map) m.material.map.dispose(); m.material.map = panelTex(PANELS[m.userData.k], theme === "night"); m.material.needsUpdate = true; });
    FOGS[0].color.set(P.fog); FOGS[1].color.set(P.hallWall); FOGS[2].color.set(P.room); FOGS[2].density = theme === "night" ? 0.024 : 0.012; bgHall.set(P.hallWall); bgRoom.set(P.room);
    renderer.toneMappingExposure = P.exposure; bloom.strength = P.bloom;
    dirty = true;
  }

  /* sizing */
  function size() {
    const w = stage.clientWidth, h = stage.clientHeight;
    renderer.setSize(w, h, false); composer.setSize(w, h);
    bloom.resolution.set(w / 2, h / 2);
    camera.aspect = w / h; camera.fov = w / h < 1 ? 62 : 42; camera.updateProjectionMatrix();
    dirty = true;
  }

  /* overlays */
  const beats = $$("[data-beat]", sec), labels = $$(".gate__doors li", sec), doorList = $(".gate__doors", sec);
  doorList.style.cssText = "inset:0;left:0;top:0;width:100%;height:100%";
  const flash = document.createElement("div"); flash.className = "gate__flash"; flash.setAttribute("aria-hidden", "true"); stage.appendChild(flash);

  /* frame */
  const cp = new THREE.Vector3(), cl = new THREE.Vector3(), v = new THREE.Vector3();
  let u = 0, lastU = -1, dirty = true, visible = false, t0 = performance.now();
  // keep it smooth: if frames run slow, render at a lower resolution
  let dpr = DPR, slow = 0, lastNow = 0;
  function adapt(now) {
    const dt = lastNow ? now - lastNow : 16; lastNow = now;
    slow = dt > 26 ? slow + 1 : Math.max(0, slow - 1);
    if (slow > 40 && dpr > (innerWidth < 760 ? 1.5 : 1)) { dpr = Math.max(innerWidth < 760 ? 1.5 : 1, dpr - 0.25); renderer.setPixelRatio(dpr); composer.setPixelRatio(dpr); size(); slow = 0; }
  }
  function frame(now) {
    requestAnimationFrame(frame);
    if (!visible) { lastNow = 0; return; }
    adapt(now);
    const t = (now - t0) / 1000;
    const r = sec.getBoundingClientRect();
    u = clamp(-r.top / Math.max(1, r.height - innerHeight)) * 0.9999;
    const zone = camAt(u, cp, cl);
    camera.position.copy(cp); camera.lookAt(cl);
    A.visible = zone === 0; B.visible = zone === 1; C.visible = zone === 2;
    scene.background = zone === 0 ? null : zone === 1 ? bgHall : bgRoom;
    scene.fog = FOGS[zone];

    // portals breathe
    portals.forEach((pm) => (pm.uniforms.uTime.value = reduced ? 3 : t));
    // the key: flies in, slides into the keyhole, turns; the keyhole opens
    const kIn = smooth(0.29, 0.355, u), kSlide = smooth(0.355, 0.372, u), kTurn = smooth(0.372, 0.39, u), open = smooth(0.388, 0.415, u);
    keyRig.visible = zone === 0 && u > 0.285 && u < 0.41;
    if (keyRig.visible) {
      const from = new THREE.Vector3(5, 5, 16), pre = new THREE.Vector3(0, KY, 4.6), ins = new THREE.Vector3(0, KY, 1.55);
      keyRig.position.lerpVectors(from, pre, kIn).lerp(ins, kSlide);
      bigKey.key.rotation.set(lerp(-0.2, Math.PI / 2, kIn), kTurn * Math.PI / 2 + (1 - kIn) * 2.2, (1 - kIn) * 0.8);
      bigKey.glow.emissiveIntensity = 0.4 + kTurn * 2.5;
    }
    leaves.forEach(({ hinge, side }) => (hinge.rotation.y = side * open * 1.75));
    const power = 1.15 + kTurn * 0.5 + open * 0.2;
    portals.slice(0, 2).forEach((pm) => (pm.uniforms.uPower.value = power));
    portalLight.intensity = 45 * power; khGlow.material.opacity = 0.22 + open * 0.6;
    // the agent
    let ap;
    if (zone === 0) {
      const appear = smooth(0.15, 0.22, u);
      ap = new THREE.Vector3(lerp(14, 7.2, appear), 10.2 + Math.sin(t * 1.3) * 0.25, lerp(16, 8.5, appear));
      agent.scale.setScalar(Math.max(0.001, appear * (1 - smooth(0.3, 0.335, u))));
    } else if (zone === 1) {
      const fwd = cl.clone().sub(cp).normalize(), right = new THREE.Vector3().crossVectors(fwd, new THREE.Vector3(0, 1, 0)).normalize();
      ap = cp.clone().add(fwd.multiplyScalar(9)).add(right.multiplyScalar(3.6)).add(new THREE.Vector3(0, 1.8 + Math.sin(t * 1.3) * 0.15, 0));
      agent.scale.setScalar(Math.max(0.001, 0.55 * (1 - smooth(0.78, 0.83, u))));
    } else { agent.scale.setScalar(0.001); ap = cp.clone(); }
    agent.position.lerp(ap, lastU < 0 || Math.abs(u - lastU) > 0.05 ? 1 : 0.2);
    agentRing.rotation.set(t * 0.9, t * 1.3, 0); agentRing2.rotation.set(-t * 0.6, t * 0.4, t * 0.3);
    // door one swings wider as you approach
    if (doors[0].hinge) doors[0].hinge.rotation.y = -lerp(1.25, 1.9, smooth(0.76, 0.84, u));
    // drift
    if (!reduced) {
      mists.forEach((m) => { m.position.x += m.userData.v * 0.02; if (m.position.x > 110) m.position.x = -110; if (m.position.x < -110) m.position.x = 110; });
      [motesA, motesB, motesC].forEach((pts) => { pts.rotation.y = t * 0.02; pts.position.y = Math.sin(t * 0.3) * 0.4; });
      panels.forEach((m) => { const d = m.userData; m.position.y = 3.4 + Math.sin(d.a) * d.r * 0.75 + Math.sin(t * d.s + d.a) * 0.25; });
      emblem.rotation.y = Math.sin(t * 0.4) * 0.12;
    }
    bloom.strength = P.bloom * (1 - 0.7 * open) * (zone === 1 ? 0.8 : 1);
    composer.render();
    lastU = u;

    // captions
    beats.forEach((b) => {
      const [a, z] = BEATS[b.dataset.beat] || [-1, -1], span = z - a;
      const fin = a === 0 ? 1 : clamp((u - a) / (span * 0.2)), fout = z > 1 ? 1 : clamp((z - u) / (span * 0.18));
      const o = u >= a && u < z ? Math.min(fin, fout) : 0;
      b.style.opacity = o.toFixed(3); b.style.transform = `translateY(${((1 - fin) * 26).toFixed(1)}px)`; b.style.visibility = o > 0.01 ? "visible" : "hidden";
    });
    // door labels, pinned to the real doors
    const showDoors = u >= BEATS.doors[0] && u < BEATS.doors[1];
    doorList.classList.toggle("on", showDoors);
    if (zone === 1) labels.forEach((li, i) => {
      v.copy(doors[i].top); doors[i].g.localToWorld(v); v.project(camera);
      const vis = v.z < 1 && Math.abs(v.x) < 1.05 && Math.abs(v.y) < 1.05;
      li.style.setProperty("--x", clamp((v.x * 0.5 + 0.5) * 100, 6, 94).toFixed(2)); li.style.setProperty("--y", clamp((-v.y * 0.5 + 0.5) * 100, 16, 90).toFixed(2));
      li.style.visibility = vis ? "visible" : "hidden";
    });
    // white-green flash at the two crossings
    const f = Math.max(1 - Math.abs(u - 0.434) / 0.014, 1 - Math.abs(u - 0.861) / 0.012, 0);
    flash.style.opacity = clamp(f).toFixed(3);
  }

  applyTheme(); size();
  new MutationObserver(applyTheme).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  addEventListener("resize", size);
  new IntersectionObserver((en) => en.forEach((e) => (visible = e.isIntersecting)), { rootMargin: "100px" }).observe(sec);
  requestAnimationFrame(frame);
  return true;
}
