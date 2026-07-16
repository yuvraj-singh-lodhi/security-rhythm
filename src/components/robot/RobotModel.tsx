"use client";
import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  onLoaded?: () => void;
}

/**
 * Scroll keyframes — model choreography matched to page text layout:
 *
 *  S1 Hero       text LEFT   → model RIGHT  x=+2.4  rotY= 0    (dead front, arrival)
 *  S2 About      text RIGHT  → model LEFT   x=-2.4  rotY=+0.28 (faces right/text)
 *  S3 Modules    text LEFT   → model RIGHT  x=+2.4  rotY=-0.18 (faces left/text)
 *  S4 Frameworks text RIGHT  → model LEFT   x=-2.4  rotY=+0.28 (faces right/text)
 *  S5 Pricing    text LEFT   → model RIGHT  x=+3.0  rotY=-0.10 (far right, near front)
 *  S6 Contact    text LEFT   → model RIGHT  x=+2.4  rotY=-0.18 (faces left/text)
 */
const KEYFRAMES = [
  { rotY:  0.00, posX: 2.4 }, // S1
  { rotY: -0.60, posX: 2.4 }, // S2 — looks left towards text
  { rotY: -0.40, posX: 2.6 }, // S3 — looks left towards text
  { rotY: -0.60, posX: 2.4 }, // S4 — looks left towards text
  { rotY: -0.20, posX: 3.2 }, // S5 — slightly left
  { rotY: -0.60, posX: 2.4 }, // S6 — looks left towards text
];

const TARGET_HEIGHT = 3.8; // world units

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

export default function RobotModel({ onLoaded }: Props) {
  const groupRef  = useRef<THREE.Group>(null);
  const scaled    = useRef(false);
  const mouseX    = useRef(0);   // −1 … +1  (normalised screen X)
  const mouseY    = useRef(0);   // −1 … +1  (normalised screen Y)
  const scrollRot = useRef(0);   // target body rotation from scroll
  const scrollPosX = useRef(KEYFRAMES[0].posX); // target X from scroll

  const { scene } = useGLTF("/models/valkyrie.glb");

  // ── Auto-scale (bounding-box) — no texture touching ──────────
  if (!scaled.current) {
    scaled.current = true;
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const s = TARGET_HEIGHT / maxDim;
      scene.scale.setScalar(s);
      const scaledBox = new THREE.Box3().setFromObject(scene);
      const center = scaledBox.getCenter(new THREE.Vector3());
      scene.position.y -= center.y; // vertically center the scene mesh
    }
  }

  // ── Mouse tracking ────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.current = (e.clientX / window.innerWidth)  * 2 - 1;
      mouseY.current = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // ── Scroll-driven keyframe interpolation ──────────────────────
  // ── Scroll-driven keyframe interpolation ──────────────────────
  useEffect(() => {
    const onScroll = () => {
      const scrollY   = window.scrollY;
      const docH      = document.body.scrollHeight - window.innerHeight;
      const n         = KEYFRAMES.length;
      if (!n || docH <= 0) return;

      const progress  = Math.min(scrollY / docH, 1) * (n - 1);
      const fromIdx   = Math.floor(progress);
      const toIdx     = Math.min(fromIdx + 1, n - 1);
      const t         = progress - fromIdx;

      // Plateau interpolation: stay completely locked until 35% of the scroll to the next section.
      // This means the next section is already 35% visible before the model even starts moving.
      // It finishes moving at 80%, locking into the new section early.
      let mappedT = Math.max(0, Math.min(1, (t - 0.35) / 0.45));
      // Apply smoothstep curve to make the start and end of the motion soft
      mappedT = mappedT * mappedT * (3 - 2 * mappedT);

      const from = KEYFRAMES[fromIdx] ?? KEYFRAMES[0];
      const to   = KEYFRAMES[toIdx]   ?? KEYFRAMES[KEYFRAMES.length - 1];

      scrollRot.current  = lerp(from.rotY, to.rotY, mappedT);
      scrollPosX.current = lerp(from.posX, to.posX, mappedT);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Trigger once on mount
    onScroll();
    
    // Also trigger on resize to handle layout height shifts
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // ── Signal parent ─────────────────────────────────────────────
  useEffect(() => { onLoaded?.(); }, [onLoaded]);

  // ── Per-frame animation ───────────────────────────────────────
  useFrame(({ clock }) => {
    const g = groupRef.current;
    if (!g) return;
    const t = clock.getElapsedTime();

    /* 1. Idle float — slow vertical bob */
    const floatY = Math.sin(t * 0.7) * 0.11;

    /* 2. Idle sway — very subtle left-right rotation */
    const sway = Math.sin(t * 0.35) * 0.04;

    /* 3. Mouse parallax — mech subtly faces the cursor */
    const mouseRotY  = mouseX.current * 0.18;
    const mouseShift = mouseX.current * 0.12; // slight X drift

    /* 4. Tiny tilt toward cursor (X-axis) */
    const tiltX = mouseY.current * 0.06;

    // Compose targets
    const targetRotY = scrollRot.current + sway + mouseRotY;
    const targetPosX = scrollPosX.current + mouseShift;

    // Smooth lerp — moderate factor for slightly slower, floaty arrival
    g.rotation.y  = THREE.MathUtils.lerp(g.rotation.y,  targetRotY, 0.08);
    g.rotation.x  = THREE.MathUtils.lerp(g.rotation.x,  tiltX,      0.06);
    g.position.x  = THREE.MathUtils.lerp(g.position.x,  targetPosX, 0.08);
    g.position.y  = THREE.MathUtils.lerp(g.position.y,  floatY,     0.06);
  });

  return (
    <group ref={groupRef} position={[2.2, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/valkyrie.glb");
