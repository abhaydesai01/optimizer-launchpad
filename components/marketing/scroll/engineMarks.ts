// Marks for the answer engines. Logo images in /public/engines are lifted off their background
// into a white glyph (used by the orbit tiles and traced by the particle core); engines without a
// logo file use a mark drawn on a canvas. Adapted from the dashboard's sign-in scene.

export type EngineId = "chatgpt" | "perplexity" | "google-ai-overviews" | "gemini" | "claude" | "grok";

export type EngineInfo = {
  id: EngineId;
  name: string;
  maker: string;
  how: string;
  tags: string[];
  tracks: string[];
  /** Logo file in /public; omitted when the mark is drawn. */
  logo?: string;
};

export const ENGINES: EngineInfo[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    maker: "OpenAI",
    how: "Blends what the model learned in training with live web search, and cites the pages it reads when it searches.",
    tags: ["Training data", "Web search"],
    logo: "/engines/chatgpt.png",
    tracks: ["Brand mentions in answers", "Citation URLs", "Competitor shortlists", "Prompt-level trends"],
  },
  {
    id: "perplexity",
    name: "Perplexity",
    maker: "Perplexity AI",
    how: "Searches the live web for every question and shows numbered citations next to each claim.",
    tags: ["Live web", "Citations"],
    logo: "/engines/perplexity.png",
    tracks: ["Source domains cited", "Position in answers", "Per-prompt mention rate", "Citation authority"],
  },
  {
    id: "google-ai-overviews",
    name: "AI Overviews",
    maker: "Google Search",
    how: "Summarises search results at the top of Google, drawing on pages that already rank and read clearly.",
    tags: ["Google Search", "Summaries"],
    tracks: ["Overview inclusion", "Entity recognition", "Schema readability", "Share of voice"],
  },
  {
    id: "gemini",
    name: "Gemini",
    maker: "Google",
    how: "Grounds its answers in Google Search, so pages that already rank well tend to be the ones it surfaces.",
    tags: ["Grounded", "Search signals"],
    logo: "/engines/gemini.png",
    tracks: ["Visibility by prompt cluster", "Sentiment framing", "Source overlap with Search", "Weekly deltas"],
  },
  {
    id: "claude",
    name: "Claude",
    maker: "Anthropic",
    how: "Answers from its training data and, when web search is on, quotes and links the sources it pulls in.",
    tags: ["Training data", "Web search"],
    logo: "/engines/claude.png",
    tracks: ["Trust framing", "Third-party sources", "Recommendation lists", "Gap vs competitors"],
  },
  {
    id: "grok",
    name: "Grok",
    maker: "xAI",
    how: "Pulls in real-time posts from X alongside web results, so recent conversation shapes its answers.",
    tags: ["X posts", "Real-time"],
    logo: "/engines/grok.png",
    tracks: ["Real-time mentions", "Source mix (X vs web)", "Recommendation lists", "Weekly deltas"],
  },
];

const S = 512;
const C = S / 2;
const R = S * 0.4;

function draw(ctx: CanvasRenderingContext2D, id: EngineId) {
  ctx.clearRect(0, 0, S, S);
  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#fff";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.save();
  ctx.translate(C, C);

  switch (id) {
    case "chatgpt": {
      // six rounded links woven around a hexagonal centre
      ctx.lineWidth = S * 0.036;
      const off = R * 0.36;
      const len = R * 1.1;
      const wid = R * 0.44;
      for (let k = 0; k < 6; k++) {
        ctx.save();
        ctx.rotate((Math.PI / 3) * k - (14 * Math.PI) / 180);
        ctx.translate(off, 0);
        ctx.beginPath();
        ctx.roundRect(-wid / 2, -len * 0.62, wid, len, wid / 2);
        ctx.stroke();
        ctx.restore();
      }
      break;
    }
    case "claude": {
      // radial spark with uneven rays
      const rays = 12;
      for (let k = 0; k < rays; k++) {
        const a = (Math.PI * 2 * k) / rays + (k % 2 ? 0.08 : -0.05);
        const len = R * (k % 3 === 0 ? 1 : k % 3 === 1 ? 0.82 : 0.9);
        const w = S * 0.032;
        ctx.save();
        ctx.rotate(a);
        ctx.beginPath();
        ctx.moveTo(-w, -R * 0.08);
        ctx.lineTo(w, -R * 0.08);
        ctx.lineTo(w * 0.55, -len);
        ctx.lineTo(-w * 0.55, -len);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
      ctx.beginPath();
      ctx.arc(0, 0, R * 0.14, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "gemini": {
      // four-point sparkle with concave sides
      ctx.beginPath();
      for (let i = 0; i <= 240; i++) {
        const t = (i / 240) * Math.PI * 2;
        const x = R * Math.sign(Math.cos(t)) * Math.abs(Math.cos(t)) ** 2.6;
        const y = R * Math.sign(Math.sin(t)) * Math.abs(Math.sin(t)) ** 2.6;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      break;
    }
    case "perplexity": {
      // line-art: central stem, folded wings and an open box
      ctx.lineWidth = S * 0.04;
      const w = R * 0.72;
      const top = -R;
      const mid = -R * 0.32;
      const low = R * 0.42;
      const bot = R;
      ctx.beginPath();
      ctx.moveTo(0, top);
      ctx.lineTo(0, bot);
      ctx.moveTo(-w, mid);
      ctx.lineTo(w, mid);
      ctx.moveTo(0, mid);
      ctx.lineTo(-w, top + R * 0.08);
      ctx.lineTo(-w, mid);
      ctx.moveTo(0, mid);
      ctx.lineTo(w, top + R * 0.08);
      ctx.lineTo(w, mid);
      ctx.moveTo(-w, mid);
      ctx.lineTo(-w, low);
      ctx.lineTo(0, R * 0.05);
      ctx.moveTo(w, mid);
      ctx.lineTo(w, low);
      ctx.lineTo(0, R * 0.05);
      ctx.moveTo(-w * 0.55, low + R * 0.1);
      ctx.lineTo(0, R * 0.05);
      ctx.lineTo(w * 0.55, low + R * 0.1);
      ctx.stroke();
      break;
    }
    case "grok": {
      // broken ring cut by a diagonal slash
      ctx.lineWidth = S * 0.06;
      ctx.beginPath();
      ctx.arc(0, 0, R * 0.74, Math.PI * 0.05, Math.PI * 0.82);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, R * 0.74, Math.PI * 1.05, Math.PI * 1.82);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-R * 0.95, R * 0.95);
      ctx.lineTo(R * 0.95, -R * 0.95);
      ctx.stroke();
      break;
    }
    case "google-ai-overviews": {
      // search lens with a small sparkle inside: "AI on top of search"
      ctx.lineWidth = S * 0.05;
      const lr = R * 0.58;
      const cx = -R * 0.16;
      const cy = -R * 0.16;
      ctx.beginPath();
      ctx.arc(cx, cy, lr, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx + lr * 0.72, cy + lr * 0.72);
      ctx.lineTo(R * 0.92, R * 0.92);
      ctx.stroke();
      ctx.beginPath();
      const sr = lr * 0.55;
      for (let i = 0; i <= 160; i++) {
        const t = (i / 160) * Math.PI * 2;
        const x = cx + sr * Math.sign(Math.cos(t)) * Math.abs(Math.cos(t)) ** 2.6;
        const y = cy + sr * Math.sign(Math.sin(t)) * Math.abs(Math.sin(t)) ** 2.6;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      break;
    }
  }
  ctx.restore();
}

/** White glyph on a transparent S×S canvas: the drawn mark, centred and filling ~80% of the box. */
function drawnGlyph(id: EngineId): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = S;
  draw(canvas.getContext("2d")!, id);
  return canvas;
}

/**
 * Lifts a logo off its background: the background colour is taken from the image corners and
 * every pixel far enough from it becomes white ink (soft edge kept as alpha). The result is
 * re-centred on its bounding box so every logo ends up the same visual size.
 */
function glyphFromImage(img: HTMLImageElement): HTMLCanvasElement {
  const src = document.createElement("canvas");
  src.width = src.height = S;
  const sctx = src.getContext("2d", { willReadFrequently: true })!;
  sctx.drawImage(img, 0, 0, S, S);
  const data = sctx.getImageData(0, 0, S, S);
  const d = data.data;
  const corners = [0, S - 1, (S - 1) * S, S * S - 1].map((k) => k * 4);
  const bg = [0, 1, 2].map((c) => corners.reduce((sum, o) => sum + d[o + c], 0) / corners.length);
  let x0 = S, x1 = 0, y0 = S, y1 = 0;
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      const o = (y * S + x) * 4;
      const dist = Math.hypot(d[o] - bg[0], d[o + 1] - bg[1], d[o + 2] - bg[2]);
      const a = d[o + 3] < 20 ? 0 : Math.min(1, Math.max(0, (dist - 60) / 90));
      d[o] = d[o + 1] = d[o + 2] = 255;
      d[o + 3] = Math.round(a * 255);
      if (a > 0.5) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
    }
  }
  sctx.putImageData(data, 0, 0);
  const out = document.createElement("canvas");
  out.width = out.height = S;
  if (x1 <= x0 || y1 <= y0) return out;
  const size = Math.max(x1 - x0, y1 - y0);
  const target = S * 0.8;
  const scale = target / size;
  const w = (x1 - x0) * scale;
  const h = (y1 - y0) * scale;
  out.getContext("2d")!.drawImage(src, x0, y0, x1 - x0, y1 - y0, (S - w) / 2, (S - h) / 2, w, h);
  return out;
}

const glyphCache = new Map<EngineId, Promise<HTMLCanvasElement>>();

/** The engine's white glyph canvas (logo if it has one, drawn mark otherwise). Cached. */
export function loadGlyph(engine: EngineInfo): Promise<HTMLCanvasElement> {
  let pending = glyphCache.get(engine.id);
  if (!pending) {
    pending = engine.logo
      ? new Promise<HTMLCanvasElement>((resolve) => {
          const img = new Image();
          img.onload = () => resolve(glyphFromImage(img));
          img.onerror = () => resolve(drawnGlyph(engine.id));
          img.src = engine.logo!;
        })
      : Promise.resolve(drawnGlyph(engine.id));
    glyphCache.set(engine.id, pending);
  }
  return pending;
}

/** `count` xyz points (radius ≈ 1.55 world units) sampled from a glyph canvas. */
export function sampleGlyph(canvas: HTMLCanvasElement, count: number): Float32Array {
  const data = canvas.getContext("2d", { willReadFrequently: true })!.getImageData(0, 0, S, S).data;
  const filled: number[] = [];
  for (let y = 0; y < S; y += 2) {
    for (let x = 0; x < S; x += 2) {
      if (data[(y * S + x) * 4 + 3] > 128) filled.push(x, y);
    }
  }
  const out = new Float32Array(count * 3);
  const pixels = filled.length / 2;
  if (!pixels) return out;
  const unit = 1.55 / R;
  for (let i = 0; i < count; i++) {
    const j = Math.floor(Math.random() * pixels) * 2;
    out[i * 3] = (filled[j] + Math.random() * 2 - C) * unit;
    out[i * 3 + 1] = -(filled[j + 1] + Math.random() * 2 - C) * unit;
    out[i * 3 + 2] = (Math.random() - 0.5) * 0.18;
  }
  return out;
}

/** Drawn-mark points, available synchronously before the logo images load. */
export function sampleMark(id: EngineId, count: number): Float32Array {
  return sampleGlyph(drawnGlyph(id), count);
}
