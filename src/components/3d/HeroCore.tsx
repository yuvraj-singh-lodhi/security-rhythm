"use client";
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

export default function HeroCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.1;
      ringRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      {/* Central AI Core */}
      <mesh ref={coreRef} scale={1.5}>
        <icosahedronGeometry args={[1, 2]} />
        <MeshDistortMaterial 
          color="#00FFA3" 
          emissive="#00E5FF" 
          emissiveIntensity={0.5}
          distort={0.4} 
          speed={2}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Outer Wireframe Globe */}
      <mesh scale={2.2}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#00E5FF" wireframe transparent opacity={0.3} />
      </mesh>

      {/* Data Rings */}
      <group ref={ringRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3, 0.02, 16, 100]} />
          <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={2} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[3.5, 0.02, 16, 100]} />
          <meshStandardMaterial color="#FF3B6B" emissive="#FF3B6B" emissiveIntensity={2} />
        </mesh>
      </group>

      <Sparkles count={100} scale={8} size={2} speed={0.4} color="#00E5FF" />
    </Float>
  );
}
