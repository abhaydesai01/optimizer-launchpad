#!/usr/bin/env python3
"""Turn a Kling clip into scroll-scrub frames for js/film.js.

  python3 tools/clip_to_frames.py <clip.mp4> <chapter-name> [fps=12] [width=1600]

Writes assets/film/frames/<chapter-name>/f_###.webp and updates
assets/film/frames/manifest.json with the frame count. Local ffmpeg has no
WebP encoder, so frames go through PNG and Pillow.
"""
import json, os, shutil, subprocess, sys, tempfile
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
clip, name = sys.argv[1], sys.argv[2]
fps = int(sys.argv[3]) if len(sys.argv) > 3 else 12
width = int(sys.argv[4]) if len(sys.argv) > 4 else 1600

out = os.path.join(ROOT, "assets", "film", "frames", name)
os.makedirs(out, exist_ok=True)
for f in os.listdir(out):
    if f.startswith("f_") and f.endswith(".webp"):
        os.remove(os.path.join(out, f))

tmp = tempfile.mkdtemp()
subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", clip, "-vf", f"fps={fps},scale={width}:-2",
                os.path.join(tmp, "f_%03d.png")], check=True)
frames = sorted(f for f in os.listdir(tmp) if f.endswith(".png"))
for f in frames:
    Image.open(os.path.join(tmp, f)).convert("RGB").save(os.path.join(out, f[:-4] + ".webp"), "WEBP", quality=74, method=5)
shutil.rmtree(tmp)

mpath = os.path.join(ROOT, "assets", "film", "frames", "manifest.json")
manifest = json.load(open(mpath)) if os.path.exists(mpath) else {}
manifest[name] = len(frames)
json.dump(manifest, open(mpath, "w"), indent=2)
size = sum(os.path.getsize(os.path.join(out, f)) for f in os.listdir(out)) // 1024
print(f"{name}: {len(frames)} frames, {size} KB")
