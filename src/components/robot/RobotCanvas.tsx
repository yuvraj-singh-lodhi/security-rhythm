"use client";
import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import RobotModel from "./RobotModel";

// ── Suppress THREE.Clock deprecation from r3f internals ──────────────────────
if (typeof window !== "undefined") {
  const _warn = console.warn.bind(console);
  console.warn = (...args: unknown[]) => {
    const msg = String(args[0] ?? "");
    if (msg.includes("THREE.Clock") && msg.includes("deprecated")) return;
    _warn(...args);
  };
}

/**
 * Animated lights — two point lights that slowly orbit the mech,
 * making the metallic surfaces shimmer as they move.
 */
function DynamicLights() {
  const cyanRef  = useRef<THREE.PointLight>(null);
  const fillRef  = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Cyan rim — orbits the mech + pulses in intensity
    if (cyanRef.current) {
      cyanRef.current.position.x = 2.2 + Math.sin(t * 0.35) * 3.5;
      cyanRef.current.position.z = -1.5 + Math.cos(t * 0.35) * 2;
      cyanRef.current.intensity  = 3.0 + Math.sin(t * 1.1) * 0.9;
    }

    // Warm fill — counter-orbits, creates contrast
    if (fillRef.current) {
      fillRef.current.position.x = 2.2 + Math.cos(t * 0.28) * 3;
      fillRef.current.position.y = -2 + Math.sin(t * 0.5) * 1;
    }
  });

  return (
    <>
      <pointLight ref={cyanRef}  color="#00E5FF" intensity={3.0} position={[-2, 3, -1.5]} />
      <pointLight ref={fillRef}  color="#ff7744" intensity={0.7} position={[4, -2, 3]} />
    </>
  );
}

interface Props {
  onLoaded?: () => void;
}

export default function RobotCanvas({ onLoaded }: Props) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 40,
      }}
    >
      <Canvas
        camera={{ position: [0, 0.5, 6], fov: 45 }}
        gl={{ antialias: true }}
        onCreated={({ gl }) => {
          // Suppress Windows HLSL X4122 floating-point precision warnings
          gl.debug.checkShaderErrors = false;
        }}
      >
        {/* Static base lights */}
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 8, 5]} intensity={2.2} />

        {/* Animated dynamic lights */}
        <DynamicLights />

        <Suspense fallback={null}>
          <RobotModel onLoaded={onLoaded} />
        </Suspense>
      </Canvas>
    </div>
  );
}
