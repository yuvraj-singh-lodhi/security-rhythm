"use client";
import { Canvas } from '@react-three/fiber';
import InteractiveScene from './InteractiveScene';

export default function GlobalCanvas() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <InteractiveScene />
      </Canvas>
    </div>
  );
}
