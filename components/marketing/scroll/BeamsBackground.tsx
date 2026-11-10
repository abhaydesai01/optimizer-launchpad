"use client";

import { useEffect, useRef } from "react";

type Beam = {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
};

const BEAMS = 22;

function createBeam(width: number, height: number): Beam {
  return {
    x: Math.random() * width * 1.5 - width * 0.25,
    y: Math.random() * height * 1.5 - height * 0.25,
    width: 30 + Math.random() * 60,
    length: height * 2.5,
    angle: -35 + Math.random() * 10,
    speed: 0.4 + Math.random() * 0.8,
    opacity: 0.1 + Math.random() * 0.14,
    // mint → teal band around the brand colour (#3ce8b4 ≈ hue 162)
    hue: 158 + Math.random() * 18,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.015 + Math.random() * 0.02,
  };
}

/**
 * Slow diagonal light beams drawn on a blurred 2D canvas, in the brand mint. Static (one frame)
 * when the visitor prefers reduced motion.
 */
export function BeamsBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let beams: Beam[] = [];
    let frame = 0;
    let visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      beams = Array.from({ length: BEAMS }, () => createBeam(width, height));
    };

    const reset = (beam: Beam, index: number, width: number, height: number) => {
      const column = index % 3;
      const spacing = width / 3;
      beam.y = height + 100;
      beam.x = column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5;
      beam.width = 80 + Math.random() * 80;
      beam.speed = 0.4 + Math.random() * 0.5;
      beam.hue = 158 + (index * 18) / BEAMS;
      beam.opacity = 0.14 + Math.random() * 0.1;
    };

    const drawBeam = (beam: Beam) => {
      ctx.save();
      ctx.translate(beam.x, beam.y);
      ctx.rotate((beam.angle * Math.PI) / 180);
      const alpha = beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2);
      const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);
      gradient.addColorStop(0, `hsla(${beam.hue}, 80%, 58%, 0)`);
      gradient.addColorStop(0.1, `hsla(${beam.hue}, 80%, 58%, ${alpha * 0.5})`);
      gradient.addColorStop(0.4, `hsla(${beam.hue}, 80%, 58%, ${alpha})`);
      gradient.addColorStop(0.6, `hsla(${beam.hue}, 80%, 58%, ${alpha})`);
      gradient.addColorStop(0.9, `hsla(${beam.hue}, 80%, 58%, ${alpha * 0.5})`);
      gradient.addColorStop(1, `hsla(${beam.hue}, 80%, 58%, 0)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
      ctx.restore();
    };

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      ctx.filter = "blur(35px)";
      beams.forEach((beam, index) => {
        if (!reduced) {
          beam.y -= beam.speed;
          beam.pulse += beam.pulseSpeed;
          if (beam.y + beam.length < -100) reset(beam, index, width, height);
        }
        drawBeam(beam);
      });
      ctx.filter = "none";
    };

    const loop = () => {
      if (visible) draw();
      frame = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    if (reduced) draw();
    else frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ filter: "blur(15px)" }}
    />
  );
}
