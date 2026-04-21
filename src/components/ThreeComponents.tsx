import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Hero Isometric Grid Component
export function IsometricGrid({ theme }: { theme: 'ink' | 'blueprint' | 'trace' }) {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const lineColor = theme === 'blueprint' ? '#E63946' : '#FFFFFF';
  const opacity = theme === 'trace' ? 0.3 : 1;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Smooth continuous orbit: 360 degrees (2*PI) every 20 seconds
      groupRef.current.rotation.y = (time * Math.PI * 2) / 20;
      // Subtle architectural tilt variation
      groupRef.current.rotation.x = Math.PI / 6 + Math.sin(time * 0.1) * 0.02;
    }

    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        // Uniform downward flow speed
        positions[i + 1] -= 0.012; 
        
        // Funnel convergence logic: as y descends from 2 to -2, pull x and z towards center
        // At y=2, multiplier is ~1.0. At y=-2, multiplier is ~0.1
        const yPos = positions[i + 1];
        const funnelFactor = Math.max(0.1, (yPos + 2) / 4);
        
        // Apply convergence: we use a slight damping to move towards the center
        // to simulate particles "matching" the funnel geometry
        positions[i] *= 0.99;
        positions[i + 2] *= 0.99;

        if (positions[i + 1] < -2) {
          // Reset to top with high spread (top of funnel)
          positions[i + 1] = 2; 
          positions[i] = (Math.random() - 0.5) * 4;
          positions[i + 2] = (Math.random() - 0.5) * 4;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const lines = useMemo(() => {
    const size = 5;
    const step = 1;
    const gridLines = [];
    for (let i = -size; i <= size; i += step) {
      gridLines.push(new THREE.Vector3(-size, 0, i), new THREE.Vector3(size, 0, i));
      gridLines.push(new THREE.Vector3(i, 0, -size), new THREE.Vector3(i, 0, size));
    }
    return new THREE.Float32BufferAttribute(gridLines.flatMap(v => [v.x, v.y, v.z]), 3);
  }, []);

  const particles = useMemo(() => {
    const count = 800; // Increased density for 'curated inquiries'
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return new THREE.BufferAttribute(pos, 3);
  }, []);

  return (
    <group ref={groupRef} rotation={[Math.PI / 6, Math.PI / 4, 0]}>
      {/* The Section Cut: Wireframe + Solid */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[4, 1, 4]} />
        <meshBasicMaterial color={lineColor} wireframe transparent opacity={0.2} />
      </mesh>
      <mesh position={[0, -0.75, 0]}>
        <boxGeometry args={[3.8, 0.5, 3.8]} />
        <meshBasicMaterial color={lineColor} transparent opacity={0.05} />
      </mesh>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" {...lines} />
        </bufferGeometry>
        <lineBasicMaterial color={lineColor} transparent opacity={opacity * 0.3} />
      </lineSegments>

      {/* Parametric Particles (Pipeline Funnel) */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" {...particles} />
        </bufferGeometry>
        <pointsMaterial color={lineColor} size={0.03} transparent opacity={0.6} />
      </points>
    </group>
  );
}

// 3D Extruded Number for Stats
export function ExtrudedStat({ value, theme }: { value: string, theme: string }) {
  const textColor = '#FFFFFF';
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      // Magnetic tilt based on mouse position
      const mouseX = state.pointer.x * 0.2;
      const mouseY = state.pointer.y * 0.2;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouseY, 0.1);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX, 0.1);
      
      // Technical pulse
      const pulse = 1 + Math.sin(time * 2) * 0.01;
      groupRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <div className="h-40 w-full">
      <Canvas gl={{ alpha: true }} dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <group ref={groupRef}>
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <Text
              font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGkyMZhrib2Bg-4.ttf"
              fontSize={1.2}
              color={textColor}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.02}
              outlineColor={textColor}
            >
              {value}
            </Text>
          </Float>
        </group>
      </Canvas>
    </div>
  );
}

// Hero Scene Wrapper
export function Hero3D({ theme }: { theme: 'ink' | 'blueprint' | 'trace' }) {
  return (
    <div className="absolute inset-0 z-0 opacity-40 md:opacity-100 pointer-events-none">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[5, 5, 5]} fov={50} />
        <IsometricGrid theme={theme} />
      </Canvas>
    </div>
  );
}
