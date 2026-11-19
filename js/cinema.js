// The cinematic layer: title card (watch the film / explore), the "own it" chapter film,
// the compounding-ring progress mark, the keyhole wipe out of the hero, and film mode
// (the page plays itself like a movie, with score and voice-over).

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => t * t * (3 - 2 * t);
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

/* ---------- the logo ring, as six segments (geometry from the mark) ---------- */
const RO = 42, RS = 37.5, RE = 27;
const innerAt = (t) => RS - (RS - RE) * Math.pow(t, 1.25);
const angAt = (t) => ((-45 + 360 * t) * Math.PI) / 180;
const pt = (r, a) => `${(50 + r * Math.cos(a)).toFixed(2)} ${(50 + r * Math.sin(a)).toFixed(2)}`;
function segPath(t0, t1, gap = 0.006) {
  const a = t0 + gap, b = t1 - gap, n = 24, out = [], inn = [];
  for (let i = 0; i <= n; i++) { const t = a + ((b - a) * i) / n; out.push(pt(RO, angAt(t))); inn.push(pt(innerAt(t), angAt(t))); }
  return `M${out.join(" L")} L${inn.reverse().join(" L")} Z`;
}
export function ringSVG(cls = "") {
  const segs = Array.from({ length: 6 }, (_, k) => segPath(k / 6, (k + 1) / 6));
  return `<svg class="${cls}" viewBox="0 0 100 100" aria-hidden="true">
    ${segs.map((d) => `<path class="rg__ghost" d="${d}"/>`).join("")}
    ${segs.map((d, k) => `<path class="rg__fill" data-seg="${k}" d="${d}"/>`).join("")}
    <circle class="rg__key" cx="50" cy="44.9" r="9"/><path class="rg__key" d="M46.4 48.5 L53.6 48.5 L57.2 68.3 Q57.47 70.1 55.4 70.1 L44.6 70.1 Q42.53 70.1 42.8 68.3 Z"/>
  </svg>`;
}

/* ---------- film mode: the page plays itself ---------- */
const SCRIPT = [
  { sel: "#top", sec: 16, label: "Act I · Rented growth", cues: [[0.4, "vo-01"], [9.6, "vo-02"]] },
  { sel: "#own", sec: 111, label: "Act II · What owning it means", cues: [[0.6, "vo-03"], [8.3, "vo-04"], [23.3, "vo-05"], [38.3, "vo-07"], [53.3, "vo-06"], [68.3, "vo-08"], [83.3, "vo-09"], [98.6, "vo-10"]] },
  { sel: "#problem", sec: 7, label: "Act III · Rented stops. Owned compounds.", read: true, cues: [[0.3, "vo-14"]] },
  { sel: "#gate", sec: 38, label: "Act IV · Through the door", cues: [[0.8, "vo-15"], [16.5, "vo-17"], [28.8, "vo-18"]] },
];

export function initFilmMode({ reduced }) {
  const player = $("#player"), bar = $("#player-bar"), chLabel = $("#player-ch");
  const btnToggle = $('[data-player="toggle"]'), btnMute = $('[data-player="mute"]');
  const music = new Audio("assets/audio/score.mp3"); music.preload = "none"; music.volume = 0.42;
  const vo = {}; const voAudio = (id) => (vo[id] ||= Object.assign(new Audio(`assets/audio/${id}.mp3`), { preload: "auto" }));
  let keys = [], T = 0, t = 0, playing = false, muted = false, last = 0, fired = new Set(), selfScroll = false, ended = false;

  function build() {
    keys = []; let time = 0, prevEnd = null;
    SCRIPT.forEach((s, idx) => {
      const el = $(s.sel); if (!el) return;
      const top = el.getBoundingClientRect().top + scrollY;
      const h = el.offsetHeight;
      const y0 = s.read ? Math.max(0, top - innerHeight * 0.05) : top;
      const y1 = s.hold ? y0 : s.read ? top + Math.max(0, h - innerHeight * 0.85) : top + h - innerHeight;
      if (prevEnd !== null && Math.abs(y0 - prevEnd) > 4) { // glide between acts
        const d = clamp(Math.abs(y0 - prevEnd) / innerHeight * 0.55, 0.8, 2.4);
        keys.push({ t0: time, t1: time + d, y0: prevEnd, y1: y0, glide: true, idx });
        time += d;
      }
      keys.push({ t0: time, t1: time + s.sec, y0, y1, idx, s });
      time += s.sec; prevEnd = y1;
    });
    T = time;
  }
  const yAt = (tt) => {
    const k = keys.find((k) => tt >= k.t0 && tt <= k.t1) || keys[keys.length - 1];
    const f = clamp((tt - k.t0) / (k.t1 - k.t0));
    return { y: lerp(k.y0, k.y1, k.glide ? ease(f) : f), k, f };
  };
  const tFromScroll = () => {
    const y = scrollY;
    for (const k of keys) { const lo = Math.min(k.y0, k.y1), hi = Math.max(k.y0, k.y1); if (y >= lo - 2 && y <= hi + 2) return lerp(k.t0, k.t1, hi === lo ? 0 : (y - k.y0) / (k.y1 - k.y0)); }
    return y < keys[0].y0 ? 0 : T;
  };

  function duck() {
    const speaking = Object.values(vo).some((a) => !a.paused && !a.ended);
    const target = muted ? 0 : speaking ? 0.16 : 0.42;
    music.volume = lerp(music.volume, target, 0.08);
  }
  function fireCues(k, local) {
    if (!k.s || !k.s.cues) return;
    k.s.cues.forEach(([at, id]) => {
      const key = id;
      if (local >= at && local < at + 1.2 && !fired.has(key)) {
        fired.add(key);
        Object.values(vo).forEach((a) => { if (!a.paused) a.pause(); });
        const a = voAudio(id); a.currentTime = 0; a.muted = muted; a.play().catch(() => {});
      }
    });
  }
  function tick(now) {
    if (!playing) return;
    const dt = Math.min(0.5, (now - last) / 1000); last = now; // follow the clock, so the picture stays with the voice even on slow devices
    t = Math.min(T, t + dt);
    const { y, k } = yAt(t);
    selfScroll = true; window.scrollTo(0, y); requestAnimationFrame(() => { selfScroll = false; });
    fireCues(k, t - k.t0);
    if (k.s) chLabel.textContent = k.s.label;
    bar.style.transform = `scaleX(${(t / T).toFixed(4)})`;
    duck();
    if (t >= T) { finish(); return; }
    requestAnimationFrame(tick);
  }
  function play(fromStart) {
    build();
    if (fromStart) { t = 0; fired.clear(); window.scrollTo(0, 0); } else { t = tFromScroll(); }
    // forget cues ahead of the playhead so they replay after a seek back
    keys.forEach((k) => k.s && k.s.cues && k.s.cues.forEach(([at, id]) => { if (k.t0 + at >= t - 0.2) fired.delete(id); }));
    playing = true; ended = false; document.documentElement.classList.add("is-filmmode");
    player.hidden = false; player.classList.remove("is-paused", "is-ended");
    btnToggle.setAttribute("aria-label", "Pause film"); btnToggle.dataset.state = "playing";
    if (!reduced) { music.muted = muted; music.play().catch(() => {}); }
    Object.values(vo).forEach((a) => { if (a.currentTime > 0 && !a.ended) a.play().catch(() => {}); });
    last = performance.now(); requestAnimationFrame(tick);
  }
  function pause() {
    if (!playing) return;
    playing = false; player.classList.add("is-paused");
    btnToggle.setAttribute("aria-label", "Play film"); btnToggle.dataset.state = "paused";
    music.pause(); Object.values(vo).forEach((a) => a.pause());
  }
  function finish() {
    playing = false; ended = true; player.classList.add("is-ended");
    chLabel.textContent = "The film ends here. Zone 1 continues below ↓";
    btnToggle.dataset.state = "replay"; btnToggle.setAttribute("aria-label", "Replay film");
    const fade = setInterval(() => { music.volume = Math.max(0, music.volume - 0.02); if (music.volume <= 0.01) { music.pause(); clearInterval(fade); } }, 80);
    document.documentElement.classList.remove("is-filmmode");
  }
  function exit() { pause(); player.hidden = true; document.documentElement.classList.remove("is-filmmode"); }

  // any human scroll intent pauses the film
  const human = () => { if (playing && !selfScroll) pause(); };
  addEventListener("wheel", human, { passive: true });
  // on touch, only a real drag pauses: a tap (play button, menu, key) must never cut the voice
  let ty = null;
  addEventListener("touchstart", (e) => { ty = e.touches[0].clientY; }, { passive: true });
  addEventListener("touchmove", (e) => { if (ty !== null && Math.abs(e.touches[0].clientY - ty) > 24) { ty = null; human(); } }, { passive: true });
  addEventListener("touchend", () => { ty = null; }, { passive: true });
  addEventListener("keydown", (e) => { if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", " ", "Home", "End"].includes(e.key) && !e.target.closest("input,textarea,button")) human(); if (e.key === "Escape" && !player.hidden) exit(); });
  addEventListener("resize", () => { if (keys.length) { const tt = t; build(); t = Math.min(tt, T); } });

  btnToggle.addEventListener("click", () => { if (btnToggle.dataset.state === "replay") play(true); else if (playing) pause(); else play(false); });
  btnMute.addEventListener("click", () => {
    muted = !muted; music.muted = muted; Object.values(vo).forEach((a) => (a.muted = muted));
    btnMute.dataset.state = muted ? "off" : "on"; btnMute.setAttribute("aria-label", muted ? "Sound on" : "Sound off");
  });
  $('[data-player="exit"]').addEventListener("click", exit);
  $$('[data-film="play"]').forEach((b) => b.addEventListener("click", () => { closeIntro(); play(true); }));
  return { play, pause };
}

/* ---------- title card ---------- */
let introResolve;
export const introClosed = new Promise((r) => (introResolve = r));
export function showIntro() {
  const el = $("#intro");
  let seen = false;
  try { seen = sessionStorage.getItem("o360-intro") === "1"; } catch (e) {}
  if (!el || seen || location.hash.length > 1) { introResolve(); return false; }
  el.hidden = false; document.documentElement.classList.add("is-intro");
  requestAnimationFrame(() => el.classList.add("is-in"));
  $$('[data-film="explore"]', el).forEach((b) => b.addEventListener("click", closeIntro));
  // nobody should have to find a button to get in: any scroll, swipe or arrow key opens the page
  const enter = () => { if (!el.hidden && !el.classList.contains("is-out")) closeIntro(); };
  let sy = null;
  el.addEventListener("wheel", (e) => { if (e.deltaY > 6) enter(); }, { passive: true });
  el.addEventListener("touchstart", (e) => { sy = e.touches[0].clientY; }, { passive: true });
  el.addEventListener("touchmove", (e) => { if (sy !== null && sy - e.touches[0].clientY > 30) { sy = null; enter(); } }, { passive: true });
  addEventListener("keydown", (e) => { if (["ArrowDown", "PageDown", " "].includes(e.key) && !e.target.closest("button,input,textarea")) enter(); });
  const cue = $(".intro__scroll", el); if (cue) cue.addEventListener("click", enter);
  setTimeout(() => { const b = $('[data-film="play"]', el); b && b.focus({ preventScroll: true }); }, 900);
  return true;
}
export function closeIntro() {
  const el = $("#intro");
  try { sessionStorage.setItem("o360-intro", "1"); } catch (e) {}
  document.documentElement.classList.remove("is-intro");
  if (el && !el.hidden) { el.classList.remove("is-in"); el.classList.add("is-out"); setTimeout(() => (el.hidden = true), 900); }
  introResolve();
}
