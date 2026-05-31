"use client";

import { useEffect, useRef } from "react";
import type { Line, LineBasicMaterial, Material, Mesh, Vector3 } from "three";

export default function GlobeScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;
    let cleanup: (() => void) | undefined;

    async function boot() {
      if (!mountRef.current) return;

      const THREE = await import("three");
      const container = mountRef.current;
      const width = container.clientWidth;
      const height = container.clientHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.z = 2.5;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setAnimationLoop(null);
      renderer.setSize(width, height);
      container.appendChild(renderer.domElement);

      const ambient = new THREE.AmbientLight(0x1a1a2e, 0.4);
      const point = new THREE.PointLight(0x00e5a0, 1.2, 10);
      point.position.set(2, 1.5, 3);
      scene.add(ambient, point);

      const globe = new THREE.Mesh(
        new THREE.SphereGeometry(1, 64, 64),
        new THREE.MeshPhongMaterial({
          color: 0x0d0d1a,
          emissive: 0x050510,
          wireframe: false,
        }),
      );
      scene.add(globe);

      const gridSphere = new THREE.Mesh(
        new THREE.SphereGeometry(1.02, 64, 64),
        new THREE.MeshBasicMaterial({
          color: 0x1e1e2e,
          wireframe: true,
          transparent: true,
          opacity: 0.15,
        }),
      );
      scene.add(gridSphere);

      const nodes: Mesh[] = [];
      const nodePositions: Vector3[] = [];

      const latLonToXYZ = (lat: number, lon: number, radius: number) => {
        const phi = (lat * Math.PI) / 180;
        const theta = (lon * Math.PI) / 180;
        return new THREE.Vector3(
          radius * Math.cos(phi) * Math.cos(theta),
          radius * Math.sin(phi),
          radius * Math.cos(phi) * Math.sin(theta),
        );
      };

      for (let i = 0; i < 20; i += 1) {
        const lat = Math.random() * 180 - 90;
        const lon = Math.random() * 360 - 180;
        const pos = latLonToXYZ(lat, lon, 1.02);
        const node = new THREE.Mesh(
          new THREE.SphereGeometry(0.012, 8, 8),
          new THREE.MeshBasicMaterial({ color: 0x00e5a0 }),
        );
        node.position.copy(pos);
        node.userData.phase = i * 0.4;
        nodes.push(node);
        nodePositions.push(pos);
        scene.add(node);
      }

      const lines: Line[] = [];
      for (let i = 0; i < 6; i += 1) {
        const a = nodePositions[Math.floor(Math.random() * nodePositions.length)];
        const b = nodePositions[Math.floor(Math.random() * nodePositions.length)];
        const geometry = new THREE.BufferGeometry().setFromPoints([a, b]);
        const material = new THREE.LineBasicMaterial({
          color: 0x00e5a0,
          transparent: true,
          opacity: 0.3,
        });
        const line = new THREE.Line(geometry, material);
        line.userData.phase = Math.random() * Math.PI * 2;
        lines.push(line);
        scene.add(line);
      }

      let raf = 0;
      let last = performance.now();
      const animate = () => {
        const now = performance.now();
        const delta = Math.min((now - last) / 16.67, 2);
        last = now;
        const time = now * 0.001;

        globe.rotation.y += 0.0008 * delta;
        globe.rotation.x = Math.sin(time * 0.3) * 0.05;
        gridSphere.rotation.y = globe.rotation.y;
        gridSphere.rotation.x = globe.rotation.x;

        nodes.forEach((node, idx) => {
          const phase = time * 2 + idx * 0.4 + node.userData.phase;
          const scale = 1 + (Math.sin(phase) + 1) * 0.3;
          node.scale.setScalar(scale);
        });

        lines.forEach((line) => {
          const material = line.material as LineBasicMaterial;
          material.opacity = 0.15 + (Math.sin(time * 1.2 + line.userData.phase) + 1) * 0.12;
        });

        renderer.render(scene, camera);
        raf = requestAnimationFrame(animate);
      };
      animate();

      const onResize = () => {
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
        nodes.forEach((node) => {
          node.geometry.dispose();
          (node.material as Material).dispose();
        });
        lines.forEach((line) => {
          line.geometry.dispose();
          (line.material as Material).dispose();
        });
        globe.geometry.dispose();
        (globe.material as Material).dispose();
        gridSphere.geometry.dispose();
        (gridSphere.material as Material).dispose();
        scene.clear();
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    }

    void boot();
    return () => cleanup?.();
  }, []);

  return (
    <div
      className="h-[420px] w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)]"
      ref={mountRef}
    />
  );
}
