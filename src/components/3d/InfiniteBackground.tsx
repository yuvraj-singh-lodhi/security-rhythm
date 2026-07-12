"use client";
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Grid } from '@react-three/drei';
import * as THREE from 'three';

const particleCount = 3000;
const initialPositions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount; i++) {
  initialPositions[i * 3] = (Math.random() - 0.5) * 20;
  initialPositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
  initialPositions[i * 3 + 2] = (Math.random() - 0.5) * 20;
}

function ParticleSwarm() {
  const ref = useRef<THREE.Points>(null);
  
  const positions = initialPositions;

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y -= delta * 0.05;
      ref.current.rotation.x -= delta * 0.03;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00E5FF"
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

export default function InfiniteBackground({ isDark = true }: { isDark?: boolean }) {
  const fogColor = isDark ? '#02040A' : '#F8FAFC';
  
  return (
    <>
      <fog attach="fog" args={[fogColor, 5, 25]} />
      
      <Grid
        position={[0, -3, 0]}
        args={[40, 40]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#00E5FF"
        sectionSize={2.5}
        sectionThickness={1}
        sectionColor="#00FFA3"
        fadeDistance={25}
        fadeStrength={1}
      />

      <ParticleSwarm />
      
      <ambientLight intensity={isDark ? 0.3 : 0.8} />
      <directionalLight position={[10, 10, 5]} intensity={isDark ? 1.5 : 2} color="#00E5FF" />
    </>
  );
}
