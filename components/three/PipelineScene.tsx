"use client";

import { useEffect, useMemo, useRef } from "react";
import type { Material, Mesh } from "three";

const LABELS = [
  "Prospect",
  "Qualify",
  "Outreach",
  "Nurture",
  "Convert",
  "Retain",
  "Expand",
  "Optimise",
];

export default function PipelineScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);

  const nodePositions = useMemo(
    () => [
      [-3, -0.3, 0],
      [-2.1, 0.2, 0],
      [-1.2, 0.4, 0],
      [-0.3, 0.2, 0],
      [0.6, -0.1, 0],
      [1.5, 0.3, 0],
      [2.4, 0.1, 0],
      [3.3, -0.2, 0],
    ],
    [],
  );

  useEffect(() => {
    if (window.innerWidth < 768 || !mountRef.current) return;
    let cleanup: (() => void) | undefined;

    async function boot() {
      const THREE = await import("three");
      const container = mountRef.current;
      if (!container) return;

      const width = container.clientWidth;
      const height = container.clientHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
      camera.position.z = 4;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      container.appendChild(renderer.domElement);

      const ambient = new THREE.AmbientLight(0xffffff, 0.3);
      const mintLight = new THREE.PointLight(0x00d2a0, 1.5, 20);
      mintLight.position.set(-1, 1, 2);
      const purpleLight = new THREE.PointLight(0x8b7bff, 0.8, 20);
      purpleLight.position.set(2, 0.6, 2);
      scene.add(ambient, mintLight, purpleLight);

      const points = nodePositions.map(
        ([x, y, z]) => new THREE.Vector3(x, y, z),
      );
      const curve = new THREE.CatmullRomCurve3(points);

      const baseTube = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 180, 0.008, 6, false),
        new THREE.MeshBasicMaterial({ color: 0xe2e7f0, transparent: true, opacity: 0.5 }),
      );
      const glowTube = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 180, 0.011, 6, false),
        new THREE.MeshBasicMaterial({ color: 0x00d2a0, transparent: true, opacity: 0.25 }),
      );
      scene.add(baseTube, glowTube);

      const nodes: Mesh[] = [];
      const rings: Mesh[] = [];
      const idle = new THREE.MeshPhongMaterial({ color: 0xe2e7f0 });
      const active = new THREE.MeshPhongMaterial({
        color: 0x00d2a0,
        emissive: 0x0e8c6f,
      });

      points.forEach((pos) => {
        const node = new THREE.Mesh(
          new THREE.SphereGeometry(0.08, 16, 16),
          idle.clone(),
        );
        node.position.copy(pos);
        node.userData.scaleVelocity = 0;
        nodes.push(node);
        scene.add(node);

        const ring = new THREE.Mesh(
          new THREE.RingGeometry(0.1, 0.13, 32),
          new THREE.MeshBasicMaterial({
            color: 0x00d2a0,
            transparent: true,
            opacity: 0.15,
            side: THREE.DoubleSide,
          }),
        );
        ring.position.copy(pos);
        rings.push(ring);
        scene.add(ring);
      });

      const particleCount = 16;
      const particles: Mesh[] = [];
      for (let i = 0; i < particleCount; i += 1) {
        const particle = new THREE.Mesh(
          new THREE.SphereGeometry(0.025, 8, 8),
          new THREE.MeshBasicMaterial({ color: 0x00d2a0 }),
        );
        particle.userData.t = i / particleCount;
        scene.add(particle);
        particles.push(particle);
      }

      let raf = 0;
      let last = performance.now();

      const animate = () => {
        const now = performance.now();
        const delta = Math.min((now - last) / 16.67, 2);
        last = now;
        const time = now * 0.001;

        camera.position.y = Math.sin(time * 0.4) * 0.08;
        camera.lookAt(0, 0, 0);

        particles.forEach((particle) => {
          particle.userData.t += 0.0018 * delta;
          if (particle.userData.t > 1) particle.userData.t = 0;
          const p = curve.getPointAt(particle.userData.t);
          particle.position.copy(p);

          nodes.forEach((node, idx) => {
            const d = node.position.distanceTo(p);
            if (d < 0.09) {
              node.userData.scaleVelocity = 1;
              node.material = active;
              setTimeout(() => {
                node.material = idle;
              }, 280);

              const labelEl = labelsRef.current?.children[idx] as HTMLDivElement | undefined;
              if (labelEl) {
                labelEl.style.color = "#00D2A0";
                labelEl.style.transform = "translateY(-2px)";
                setTimeout(() => {
                  labelEl.style.color = "#646D82";
                  labelEl.style.transform = "translateY(0)";
                }, 320);
              }
            }
          });
        });

        nodes.forEach((node, idx) => {
          const v = node.userData.scaleVelocity ?? 0;
          const next = Math.max(0, v - 0.08 * delta);
          node.userData.scaleVelocity = next;
          const s = 1 + next * 0.4;
          node.scale.setScalar(s);
          rings[idx].rotation.z += 0.01 * delta;
        });

        renderer.render(scene, camera);
        raf = requestAnimationFrame(animate);
      };
      animate();

      const onResize = () => {
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
        particles.forEach((p) => {
          p.geometry.dispose();
          (p.material as Material).dispose();
        });
        nodes.forEach((n) => n.geometry.dispose());
        rings.forEach((r) => {
          r.geometry.dispose();
          (r.material as Material).dispose();
        });
        baseTube.geometry.dispose();
        glowTube.geometry.dispose();
        (baseTube.material as Material).dispose();
        (glowTube.material as Material).dispose();
        idle.dispose();
        active.dispose();
        scene.clear();
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    }

    void boot();
    return () => cleanup?.();
  }, [nodePositions]);

  return (
    <div className="relative">
      <div
        ref={mountRef}
        className="h-[440px] w-full rounded-2xl border border-[#E2E7F0] bg-[linear-gradient(180deg,#ffffff,#f8fbff)] shadow-[0_6px_24px_rgba(34,39,53,0.08)]"
      />
      <div
        ref={labelsRef}
        className="pointer-events-none absolute inset-x-5 bottom-4 grid grid-cols-4 gap-x-3 gap-y-1 text-[10px] font-medium text-[var(--text-muted)]"
      >
        {LABELS.map((label) => (
          <span key={label} className="transition-all duration-200">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
