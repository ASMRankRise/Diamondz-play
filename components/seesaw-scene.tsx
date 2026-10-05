"use client";

import { useEffect, useRef, useState } from "react";
import type { BufferGeometry, NormalBufferAttributes } from "three";

export function SeesawScene() {
  const host = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "fallback">("loading");

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let disposed = false;
    let cleanup = () => {};

    async function createScene() {
      const THREE = await import("three");
      if (disposed || !element) return;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.setClearColor(0x000000, 0);
      element.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-7, 7, 3, -3, 0.1, 100);
      camera.position.set(0, 5, 16);
      camera.lookAt(0, 1, 0);
      scene.add(new THREE.HemisphereLight(0xffffff, 0x9a8d7c, 2.6));
      const light = new THREE.DirectionalLight(0xffffff, 3.5);
      light.position.set(-3, 7, 5);
      light.castShadow = true;
      light.shadow.mapSize.set(1024, 1024);
      light.shadow.camera.left = -9;
      light.shadow.camera.right = 9;
      light.shadow.camera.top = 7;
      light.shadow.camera.bottom = -7;
      light.shadow.normalBias = 0.04;
      scene.add(light);

      const playground = new THREE.Group();
      scene.add(playground);
      const model = new THREE.Group();
      playground.add(model);
      const dark = new THREE.MeshStandardMaterial({ color: 0x25292b, roughness: 0.42, metalness: 0.45 });
      const steel = new THREE.MeshStandardMaterial({ color: 0xa8b1bc, roughness: 0.3, metalness: 0.8 });
      const blue = new THREE.MeshStandardMaterial({ color: 0x0065d5, roughness: 0.35, metalness: 0.12 });
      const orange = new THREE.MeshStandardMaterial({ color: 0xff6a2b, roughness: 0.35, metalness: 0.12 });
      const wood = new THREE.MeshStandardMaterial({ color: 0xcfa976, roughness: 0.65 });
      const pink = new THREE.MeshStandardMaterial({ color: 0xb61d69, roughness: 0.4, metalness: 0.15 });
      const makeMesh = (geometry: BufferGeometry<NormalBufferAttributes>, material: InstanceType<typeof THREE.Material>, parent: InstanceType<typeof THREE.Object3D>, x: number, y: number, z: number) => {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        parent.add(mesh);
        return mesh;
      };
      for (const z of [-0.28, 0.28]) {
        for (const side of [-1, 1]) {
          const leg = makeMesh(new THREE.CylinderGeometry(0.065, 0.065, 0.85, 16), dark, model, side * 0.21, 0.39, z);
          leg.rotation.z = side * 0.5;
        }
        const base = makeMesh(new THREE.CylinderGeometry(0.055, 0.055, 0.92, 16), dark, model, 0, 0.04, z);
        base.rotation.z = Math.PI / 2;
      }
      const axle = makeMesh(new THREE.CylinderGeometry(0.15, 0.15, 0.82, 24), steel, model, 0, 0.83, 0);
      axle.rotation.x = Math.PI / 2;
      const balance = new THREE.Group();
      balance.position.y = 0.9;
      model.add(balance);
      makeMesh(new THREE.BoxGeometry(4.9, 0.13, 0.28), dark, balance, 0, 0, 0);
      makeMesh(new THREE.BoxGeometry(4.8, 0.04, 0.26), wood, balance, 0, 0.085, 0);
      for (const side of [-1, 1]) {
        const color = side < 0 ? blue : orange;
        const seat = makeMesh(new THREE.BoxGeometry(0.48, 0.09, 0.52), color, balance, side * 2.03, 0.11, 0);
        seat.geometry.computeVertexNormals();
        makeMesh(new THREE.CylinderGeometry(0.035, 0.035, 0.43, 16), steel, balance, side * 1.7, 0.28, 0);
        makeMesh(new THREE.TorusGeometry(0.14, 0.045, 12, 30), color, balance, side * 1.7, 0.52, 0);
        makeMesh(new THREE.CylinderGeometry(0.09, 0.09, 0.17, 16), dark, balance, side * 2.08, -0.14, 0);
      }

      // Cylinders aligned between endpoints keep the playground frame geometry reusable.
      const beam = (parent: InstanceType<typeof THREE.Object3D>, start: number[], end: number[], radius: number, material: InstanceType<typeof THREE.Material>) => {
        const a = new THREE.Vector3(...start);
        const b = new THREE.Vector3(...end);
        const direction = b.clone().sub(a);
        const center = a.clone().add(b).multiplyScalar(0.5);
        const mesh = makeMesh(new THREE.CylinderGeometry(radius, radius, direction.length(), 16), material, parent, center.x, center.y, center.z);
        mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
        return mesh;
      };

      // A-frame swing: the ropes and seat move together around the upper suspension.
      const swing = new THREE.Group();
      playground.add(swing);
      for (const x of [-1.05, 1.05]) {
        for (const z of [-0.68, 0.68]) {
          beam(swing, [x, 0.08, z], [x, 2.75, 0], 0.065, steel);
          makeMesh(new THREE.CylinderGeometry(0.11, 0.12, 0.13, 16), blue, swing, x, 0.06, z);
        }
        beam(swing, [x, 1, -0.43], [x, 1, 0.43], 0.035, blue);
      }
      beam(swing, [-1.22, 2.75, 0], [1.22, 2.75, 0], 0.095, blue);
      const suspension = new THREE.Group();
      suspension.position.y = 2.7;
      swing.add(suspension);
      for (const x of [-0.39, 0.39]) {
        beam(suspension, [x, 0, 0], [x, -1.92, -0.19], 0.018, dark);
        beam(suspension, [x, 0, 0], [x, -1.92, 0.19], 0.018, dark);
      }
      makeMesh(new THREE.BoxGeometry(0.98, 0.12, 0.54), pink, suspension, 0, -1.95, 0);

      // A curved chute with raised side rails and a stepped access ladder.
      const slide = new THREE.Group();
      slide.rotation.y = -0.22;
      playground.add(slide);
      makeMesh(new THREE.BoxGeometry(0.7, 0.12, 0.86), blue, slide, -0.62, 2.05, 0);
      for (const z of [-0.35, 0.35]) {
        beam(slide, [-0.75, 0, z], [-0.75, 2.05, z], 0.055, steel);
        beam(slide, [-1.46, 0.05, z], [-0.84, 2.05, z], 0.055, steel);
        beam(slide, [-0.89, 2.03, z], [-0.89, 2.66, z], 0.035, blue);
        beam(slide, [-0.89, 2.66, z], [-0.27, 2.66, z], 0.035, blue);
        beam(slide, [-0.27, 2.66, z], [-0.27, 2.04, z], 0.035, blue);
      }
      for (let step = 0; step < 6; step++) {
        const t = (step + 0.5) / 6;
        makeMesh(new THREE.BoxGeometry(0.23, 0.075, 0.76), wood, slide, -1.46 + t * 0.62, t * 1.95, 0);
      }
      const chute = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.34, 2.09, 0),
        new THREE.Vector3(0.02, 1.96, 0),
        new THREE.Vector3(0.48, 1.15, 0),
        new THREE.Vector3(0.95, 0.43, 0),
        new THREE.Vector3(1.53, 0.26, 0),
      ]);
      const vertices: number[] = [];
      const indices: number[] = [];
      for (let step = 0; step <= 48; step++) {
        const point = chute.getPoint(step / 48);
        vertices.push(point.x, point.y, -0.36, point.x, point.y, 0.36);
        if (step < 48) {
          const i = step * 2;
          indices.push(i, i + 1, i + 2, i + 1, i + 3, i + 2);
        }
      }
      const chuteGeometry = new THREE.BufferGeometry();
      chuteGeometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
      chuteGeometry.setIndex(indices);
      chuteGeometry.computeVertexNormals();
      const chuteMaterial = pink.clone();
      chuteMaterial.side = THREE.DoubleSide;
      makeMesh(chuteGeometry, chuteMaterial, slide, 0, 0, 0);
      for (const z of [-0.39, 0.39]) {
        const rail = new THREE.CatmullRomCurve3(chute.getPoints(32).map(point => new THREE.Vector3(point.x, point.y + 0.07, z)));
        makeMesh(new THREE.TubeGeometry(rail, 48, 0.07, 12, false), pink, slide, 0, 0, 0);
      }
      const ground = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.ShadowMaterial({ opacity: 0.13 }));
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -0.04;
      ground.receiveShadow = true;
      scene.add(ground);
      const resize = () => {
        const { width, height } = element.getBoundingClientRect();
        renderer.setSize(width, height);
        const aspect = width / Math.max(height, 1);
        const compact = width < 600;
        model.scale.setScalar(compact ? 0.78 : 0.9);
        model.position.set(0, 0, compact ? 1.8 : 0.65);
        swing.position.set(compact ? -1.9 : -4.1, 0, compact ? -1.05 : 0);
        slide.position.set(compact ? 1.8 : 4.05, 0, compact ? -1.05 : 0);
        swing.scale.setScalar(compact ? 0.85 : 1);
        slide.scale.setScalar(compact ? 0.85 : 1);
        const viewWidth = compact ? 7.4 : Math.max(13.1, 4.6 * aspect);
        const viewHeight = viewWidth / aspect;
        camera.left = -viewWidth / 2;
        camera.right = viewWidth / 2;
        camera.top = viewHeight / 2;
        camera.bottom = -viewHeight / 2;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
      };
      const observer = new ResizeObserver(resize);
      observer.observe(element);
      const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
      let visible = true;
      const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
      intersection.observe(element);
      let dragging = false;
      let lastX = 0;
      let targetRotation = -0.08;
      const down = (event: PointerEvent) => { dragging = true; lastX = event.clientX; renderer.domElement.setPointerCapture(event.pointerId); };
      const move = (event: PointerEvent) => {
        if (!dragging) return;
        targetRotation = Math.max(-0.22, Math.min(0.22, targetRotation + (event.clientX - lastX) * 0.003));
        lastX = event.clientX;
      };
      const up = () => { dragging = false; };
      renderer.domElement.addEventListener("pointerdown", down);
      renderer.domElement.addEventListener("pointermove", move);
      renderer.domElement.addEventListener("pointerup", up);
      renderer.domElement.addEventListener("pointercancel", up);
      let frame = 0;
      const start = performance.now();
      const animate = (time: number) => {
        if (visible && !document.hidden) {
          balance.rotation.z = motion.matches ? -0.08 : Math.sin((time - start) * 0.0011) * 0.16;
          suspension.rotation.x = motion.matches ? 0 : Math.sin((time - start) * 0.0014) * 0.22;
          playground.rotation.y += (targetRotation - playground.rotation.y) * 0.08;
          renderer.render(scene, camera);
        }
        frame = requestAnimationFrame(animate);
      };
      resize();
      frame = requestAnimationFrame(animate);
      cleanup = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        intersection.disconnect();
        renderer.domElement.removeEventListener("pointerdown", down);
        renderer.domElement.removeEventListener("pointermove", move);
        renderer.domElement.removeEventListener("pointerup", up);
        renderer.domElement.removeEventListener("pointercancel", up);
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            const materials = Array.isArray(object.material) ? object.material : [object.material];
            materials.forEach((material) => material.dispose());
          }
        });
        renderer.dispose();
        renderer.domElement.remove();
      };
      setState("ready");
    }
    createScene().catch(() => { if (!disposed) setState("fallback"); });
    return () => { disposed = true; cleanup(); };
  }, []);

  return <div className="scene-shell" role="img" aria-label="Miniature three-dimensional playground with a moving swing on the left, balancing seesaw in the centre, and pink slide on the right">
    <div ref={host} className="absolute inset-0" aria-hidden="true" />
    {state === "loading" && <div className="scene-loading">A little play is loading…</div>}
    {state === "fallback" && <svg viewBox="0 0 500 240" className="h-full w-full" aria-hidden="true"><path d="M215 200L250 160L285 200Z" fill="none" stroke="#25292b" strokeWidth="5"/><g transform="rotate(7 250 140)"><path d="M65 140H435" stroke="#25292b" strokeWidth="12" strokeLinecap="round"/><circle cx="90" cy="118" r="12" fill="#0065d5"/><circle cx="410" cy="118" r="12" fill="#ff6a2b"/></g></svg>}
    {state === "ready" && <span className="scene-hint">Drag to explore · Made for a little play</span>}
  </div>;
}
