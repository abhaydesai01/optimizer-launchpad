// Scroll-scrubbed film on a canvas. Each chapter is either a frame sequence
// extracted from a Higgsfield/Kling clip (assets/film/frames/<name>/f_###.webp,
// listed in assets/film/frames/manifest.json) or, until its clip exists, the
// keyframe still with a scripted camera move. Era grades + light effects are
// drawn on top, so stills and clips cut together.

const CHAPTERS = [
  { name: "then-tv",         era: "then",  cam: [[1.16, -0.03, 0.02], [1.02, 0.02, 0]] },
  { name: "then-links",      era: "then",  cam: [[1.04, 0.03, 0], [1.18, -0.05, 0.02]] },
  { name: "then-billboards", era: "then",  cam: [[1.1, 0, 0.03], [1.0, 0, 0]], fx: "lightsOut" },
  { name: "now-cafe",        era: "now",   cam: [[1.02, -0.04, 0], [1.16, 0.05, 0.01]], fx: { glowAt: [0.69, 0.5] } },
  { name: "now-friends",     era: "now",   cam: [[1.14, 0.02, 0.02], [1.02, -0.02, 0]] },
  { name: "now-metro",       era: "now",   cam: [[1.0, -0.05, 0], [1.14, 0.06, 0]], fx: { glowAt: [0.68, 0.43] } },
  { name: "night-founder",   era: "night", cam: [[1.18, 0.04, 0.02], [1.04, -0.02, 0]] },
  { name: "night-phone",     era: "night", cam: [[1.05, 0.08, 0.06], [1.3, 0.2, 0.14]], fx: { pulseAt: [0.81, 0.73] } },
];
const GRADE = {
  then: "sepia(0.3) saturate(0.85) contrast(0.95) brightness(0.92)",
  now: "saturate(0.95) contrast(1.04)",
  night: "brightness(0.85) contrast(1.08) saturate(0.85)",
};
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t) => t * t * (3 - 2 * t);
const lerp = (a, b, t) => a + (b - a) * t;

function loadImg(src) {
  return new Promise((res) => {
    const im = new Image();
    im.decoding = "async";
    im.onload = () => res(im);
    im.onerror = () => res(null);
    im.src = src;
  });
}

export const HERO_CHAPTERS = [
  { name: "m1-approach", era: "gate", cam: [[1.26, 0.12, 0.02], [1.04, 0, 0]], clipCam: [[1.26, 0.12, 0.02], [1.02, 0, 0]] },
  { name: "m2-door", era: "gate", cam: [[1.02, 0, 0], [1.3, 0, -0.03]], clipCam: [[1.02, 0, 0], [1.22, 0, -0.02]] },
];

export const GATE_CHAPTERS = [
  { name: "a1-agent", era: "gate", cam: [[1.16, 0.06, 0.02], [1.02, 0, 0]] },
  { name: "a2-through", era: "gate", cam: [[1.0, 0, 0], [1.42, 0, -0.03]] },
];

export async function initFilm({ canvas, section, captions, bars = [], onProgress, reduced, chapters = CHAPTERS, dir = "assets/film" }) {
  const CHAPTERS_ = chapters;
  const ctx = canvas.getContext("2d");
  let manifest = {};
  try { manifest = await (await fetch("assets/film/frames/manifest.json", { cache: "no-cache" })).json(); } catch (e) { manifest = {}; }

  // stills first (fast), frames stream in after
  const stills = await Promise.all(CHAPTERS_.map((c) => loadImg(`${dir}/${c.name}.webp`)));
  CHAPTERS_.forEach((c, i) => { c.still = stills[i]; c.frames = null; });
  CHAPTERS_.forEach((c) => {
    const n = manifest[c.name];
    if (!n) return;
    const arr = new Array(n).fill(null);
    c.frames = arr;
    for (let k = 0; k < n; k++) loadImg(`assets/film/frames/${c.name}/f_${String(k + 1).padStart(3, "0")}.webp`).then((im) => { arr[k] = im; });
  });

  let W = 0, H = 0;
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    W = canvas.width = Math.round(canvas.clientWidth * dpr);
    H = canvas.height = Math.round(canvas.clientHeight * dpr);
  }
  window.addEventListener("resize", resize); resize();

  function frameFor(c, t) {
    if (c.frames) {
      const n = c.frames.length, i = Math.min(n - 1, Math.floor(t * n));
      for (let d = 0; d < n; d++) { const f = c.frames[i - d] || c.frames[i + d]; if (f) return { img: f, clip: true }; }
    }
    return { img: c.still, clip: false };
  }

  function drawChapter(c, t, alpha, time) {
    const { img, clip } = frameFor(c, t);
    if (!img || alpha <= 0) return;
    const [a, b] = c.cam;
    const k = ease(t);
    // clips already move; give them a gentler camera so motion doesn't double up
    const cc = clip && c.clipCam;
    const s = cc ? lerp(cc[0][0], cc[1][0], k) : clip ? lerp(1.06, 1.0, k) : lerp(a[0], b[0], k);
    const ox = cc ? lerp(cc[0][1], cc[1][1], k) : clip ? 0 : lerp(a[1], b[1], k);
    const oy = cc ? lerp(cc[0][2], cc[1][2], k) : clip ? 0 : lerp(a[2], b[2], k);
    const ir = img.width / img.height, cr = W / H;
    let dw, dh;
    if (ir > cr) { dh = H; dw = H * ir; } else { dw = W; dh = W / ir; }
    dw *= s; dh *= s;
    const dx = (W - dw) / 2 + ox * W, dy = (H - dh) / 2 + oy * H;
    ctx.save();
    ctx.globalAlpha = alpha;
    if ("filter" in ctx) ctx.filter = GRADE[c.era] || "none";
    ctx.drawImage(img, dx, dy, dw, dh);
    ctx.filter = "none";
    // effects
    const fx = c.fx;
    if (fx === "lightsOut" && !clip) {
      const g = ctx.createLinearGradient(0, 0, 0, H * 0.62);
      g.addColorStop(0, `rgba(0,0,0,${0.75 * k})`); g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H * 0.62);
    }
    if (fx && fx.glowAt && !clip) {
      const [gx, gy] = fx.glowAt, r = Math.min(W, H) * (0.16 + 0.05 * Math.sin(time * 2));
      const px = dx + gx * dw, py = dy + gy * dh;
      const g = ctx.createRadialGradient(px, py, 0, px, py, r);
      g.addColorStop(0, `rgba(140,220,190,${0.35 * k})`); g.addColorStop(1, "rgba(140,220,190,0)");
      ctx.globalCompositeOperation = "screen"; ctx.fillStyle = g; ctx.fillRect(px - r, py - r, r * 2, r * 2);
    }
    if (fx && fx.pulseAt && !clip) {
      const [gx, gy] = fx.pulseAt, pulse = 0.5 + 0.5 * Math.sin(time * 3.2);
      const px = dx + gx * dw, py = dy + gy * dh, r = Math.min(W, H) * (0.12 + 0.06 * pulse);
      const g = ctx.createRadialGradient(px, py, 0, px, py, r);
      g.addColorStop(0, `rgba(180,215,255,${0.45 * pulse})`); g.addColorStop(1, "rgba(180,215,255,0)");
      ctx.globalCompositeOperation = "screen"; ctx.fillStyle = g; ctx.fillRect(px - r, py - r, r * 2, r * 2);
    }
    ctx.restore();
  }

  const N = CHAPTERS_.length;
  let target = 0, cur = 0, last = performance.now(), visible = false;
  function progress() {
    const r = section.getBoundingClientRect();
    const total = section.offsetHeight - window.innerHeight;
    return clamp(-r.top / total);
  }
  const io = new IntersectionObserver((e) => { visible = e[0].isIntersecting; }, { rootMargin: "100px" });
  io.observe(section);

  function render(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    target = progress();
    cur += (target - cur) * (reduced ? 1 : 1 - Math.exp(-dt * 10));
    if (visible) {
      ctx.fillStyle = "#000"; ctx.fillRect(0, 0, W, H);
      const f = cur * N - 0.0001, i = Math.max(0, Math.floor(f)), t = f - i;
      const XF = 0.22; // crossfade share of a chapter
      const time = now / 1000;
      const c = CHAPTERS_[i], n = CHAPTERS_[i + 1];
      if (n && t > 1 - XF) {
        const x = (t - (1 - XF)) / XF;
        const eraCut = n.era !== c.era; // dip through black between eras
        if (eraCut) {
          drawChapter(c, t, clamp(1 - x * 2), time);
          drawChapter(n, 0, clamp(x * 2 - 1), time);
        } else {
          drawChapter(c, t, 1, time);
          drawChapter(n, x * XF, ease(x), time);
        }
      } else {
        drawChapter(c, t, 1, time);
      }
      // captions + era bars
      captions.forEach((el) => {
        const a = +el.dataset.from / N, b = +el.dataset.to / N, span = b - a;
        const inA = a + span * 0.12, outB = b - span * 0.08;
        const o = clamp((cur - a) / (inA - a)) * clamp((b - cur) / (b - outB));
        el.style.opacity = o.toFixed(3);
        el.style.transform = `translateY(${((1 - o) * 40).toFixed(1)}px)`;
      });
      const eras = [[0, 3], [3, 6], [6, 8]];
      if (bars.length) bars.forEach((bar, k) => { const [a, b] = eras[k]; bar.style.setProperty("--p", clamp((cur * N - a) / (b - a)).toFixed(3)); });
      onProgress && onProgress(cur);
    }
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
  return { chapters: CHAPTERS_ };
}
