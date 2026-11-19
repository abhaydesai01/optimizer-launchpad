"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";
import { ENGINES, loadGlyph, sampleGlyph, sampleMark } from "@/components/marketing/scroll/engineMarks";

/*
 * Particle core that forms the marks of the tracked engines. Unlike the sign-in scene it runs on
 * scroll, not a timer: `shape` (0→1) takes the sphere into the first mark, and `position`
 * (0 → engines-1, fractional while morphing) moves from one mark to the next.
 */

const SIMPLEX = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const vertex = /* glsl */ `
uniform float uTime; uniform float uShape; uniform float uSwap; uniform float uPixel;
attribute float aRand; attribute vec3 aFrom; attribute vec3 aTarget;
varying float vGlow; varying float vRand;
${SIMPLEX}
void main(){
  vec3 n = normalize(position);
  float t = uTime * 0.18;
  float noise = snoise(n * 1.6 + vec3(t, t * 0.7, -t * 0.5));
  vec3 p = n * (1.55 + noise * 0.16);
  float k = clamp(uShape * 1.5 - aRand * 0.5, 0.0, 1.0);
  k = k * k * (3.0 - 2.0 * k);
  float ks = clamp(uSwap * 1.45 - aRand * 0.45, 0.0, 1.0);
  ks = ks * ks * (3.0 - 2.0 * ks);
  vec3 q = mix(aFrom, aTarget, ks);
  q += vec3(snoise(q * 2.0 + t), snoise(q * 2.0 - t), 0.0) * 0.006;
  p = mix(p, q, k);
  // particles swoop toward the viewer mid-flight
  float flight = sin(k * 3.14159265) + sin(ks * 3.14159265) * 0.8;
  p.z += flight * (0.35 + aRand * 0.9);
  p.xy += vec2(snoise(n * 3.0 + 7.0), snoise(n * 3.0 - 7.0)) * flight * 0.35;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = (1.1 + aRand * 0.9) * uPixel * (5.5 / -mv.z);
  vGlow = mix(noise * 0.5 + 0.5, 0.75 + aRand * 0.35, k) + flight * 0.45;
  vRand = aRand;
}`;

const fragment = /* glsl */ `
uniform vec3 uDeep; uniform vec3 uBrand; uniform vec3 uHot;
varying float vGlow; varying float vRand;
void main(){
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float alpha = 1.0 - smoothstep(0.32, 0.5, d);
  vec3 col = mix(uDeep, uBrand, smoothstep(0.2, 0.7, vGlow));
  col = mix(col, uHot, smoothstep(0.75, 1.15, vGlow) * 0.85);
  gl_FragColor = vec4(col, alpha * (0.55 + vRand * 0.45));
}`;

const glowVertex = /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
const glowFragment = /* glsl */ `
uniform float uIntensity; uniform vec3 uColor; varying vec2 vUv;
void main(){ float d = distance(vUv, vec2(0.5)); float a = smoothstep(0.5, 0.0, d); gl_FragColor = vec4(uColor, a * a * uIntensity); }`;

function fibonacciSphere(count: number) {
  const pos = new Float32Array(count * 3);
  const rand = new Float32Array(count);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pos[i * 3] = Math.cos(theta) * r;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = Math.sin(theta) * r;
    rand[i] = Math.random();
  }
  return { pos, rand };
}

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function EngineParticles({
  shape,
  position,
  className = "",
}: {
  shape: MotionValue<number>;
  position: MotionValue<number>;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !webglAvailable()) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 7.4);

    const count = host.clientWidth < 500 ? 9000 : 18000;
    const { pos, rand } = fibonacciSphere(count);
    const marks = ENGINES.map((engine) => sampleMark(engine.id, count));
    const from = new Float32Array(marks[0]);
    const target = new Float32Array(marks[Math.min(1, marks.length - 1)]);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geometry.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
    const fromAttr = new THREE.BufferAttribute(from, 3);
    const targetAttr = new THREE.BufferAttribute(target, 3);
    geometry.setAttribute("aFrom", fromAttr);
    geometry.setAttribute("aTarget", targetAttr);

    const material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uShape: { value: 0 },
        uSwap: { value: 0 },
        uPixel: { value: Math.min(window.devicePixelRatio, 2) },
        uDeep: { value: new THREE.Color("#0f5e4c") },
        uBrand: { value: new THREE.Color("#3ce8b4") },
        uHot: { value: new THREE.Color("#d8fff2") },
      },
    });
    const group = new THREE.Group();
    group.add(new THREE.Points(geometry, material));
    scene.add(group);

    const glow = new THREE.Mesh(
      new THREE.PlaneGeometry(7.5, 7.5),
      new THREE.ShaderMaterial({
        vertexShader: glowVertex,
        fragmentShader: glowFragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uIntensity: { value: 0.4 }, uColor: { value: new THREE.Color("#1f8f72") } },
      }),
    );
    glow.position.z = -0.6;
    scene.add(glow);

    let loadedFrom = 0;
    let alive = true;
    // swap the drawn placeholders for the traced logos as they decode
    ENGINES.forEach((engine, i) => {
      loadGlyph(engine).then((glyph) => {
        if (!alive) return;
        marks[i] = sampleGlyph(glyph, count);
        loadedFrom = -1;
      });
    });
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = host;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = `${w}px`;
      renderer.domElement.style.height = `${h}px`;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const pointer = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      const clamp = (v: number) => Math.max(-1, Math.min(1, v));
      pointer.x = clamp(((e.clientX - r.left) / r.width) * 2 - 1);
      pointer.y = clamp(-(((e.clientY - r.top) / r.height) * 2 - 1));
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(host);

    const clock = new THREE.Clock();
    let frame = 0;
    const loop = () => {
      frame = requestAnimationFrame(loop);
      if (!visible) return;
      const dt = Math.min(clock.getDelta(), 1 / 30);

      const p = Math.max(0, Math.min(ENGINES.length - 1, position.get()));
      const base = Math.min(Math.floor(p), ENGINES.length - 2);
      if (base !== loadedFrom) {
        from.set(marks[base]);
        target.set(marks[base + 1]);
        fromAttr.needsUpdate = true;
        targetAttr.needsUpdate = true;
        loadedFrom = base;
      }
      material.uniforms.uSwap.value = p - base;
      material.uniforms.uShape.value = shape.get();
      if (!reduced) material.uniforms.uTime.value += dt;

      const k = 1 - Math.exp(-3 * dt);
      group.rotation.x += (-pointer.y * 0.12 - group.rotation.x) * k;
      group.rotation.y += (pointer.x * 0.2 - group.rotation.y) * k;
      renderer.render(scene, camera);
    };
    // initial attributes: mark 0 → mark 1
    from.set(marks[0]);
    target.set(marks[1]);
    loop();

    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      geometry.dispose();
      material.dispose();
      glow.geometry.dispose();
      (glow.material as THREE.Material).dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [shape, position]);

  return <div ref={hostRef} className={className || "relative h-full w-full"} aria-hidden="true" />;
}
