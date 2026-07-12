"use client";
import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useScroll } from 'framer-motion';

const particleCount = 2000;
const initialPositions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount; i++) {
  initialPositions[i * 3] = (Math.random() - 0.5) * 30; // X
  initialPositions[i * 3 + 1] = (Math.random() - 0.5) * 30; // Y
  initialPositions[i * 3 + 2] = (Math.random() - 0.5) * 30; // Z
}

export default function InteractiveScene() {
  const pointsRef = useRef<THREE.Points>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const { viewport, mouse } = useThree();
  const { scrollYProgress } = useScroll();
  
  const positions = initialPositions;

  useFrame((state, delta) => {
    const scrollVal = scrollYProgress.get();

    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.01; // Slower base rotation
      const targetX = (mouse.x * viewport.width) / 10;
      const targetY = (mouse.y * viewport.height) / 10;
      pointsRef.current.rotation.x += (targetY - pointsRef.current.rotation.x) * delta * 0.2; // Slower mouse react
      pointsRef.current.rotation.y += (targetX - pointsRef.current.rotation.y) * delta * 0.2;
      
      pointsRef.current.position.y = scrollVal * 3; // Slower scroll translation
    }

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.05; // Slower core rotation
      coreRef.current.rotation.x += delta * 0.02;
      // Move the core horizontally and vertically based on scroll (much slower)
      coreRef.current.position.y = -scrollVal * 5; 
      coreRef.current.position.x = Math.sin(scrollVal * Math.PI) * 2; 
    }
  });

  return (
    <>
      <fog attach="fog" args={['#0A0D17', 5, 25]} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#00E5FF" />
      
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00E5FF"
          size={0.08}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>

      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={coreRef} position={[3, 0, 0]} scale={1.5}>
          <icosahedronGeometry args={[1, 2]} />
          <MeshDistortMaterial 
            color="#00E5FF" 
            emissive="#0077B6" 
            emissiveIntensity={0.8}
            distort={0.4} 
            speed={2}
            transparent
            opacity={0.9}
          />
        </mesh>
      </Float>
    </>
  );
}
