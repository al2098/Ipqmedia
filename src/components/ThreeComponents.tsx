import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Hero Isometric Grid Component
export function IsometricGrid({ theme }: { theme: 'ink' | 'blueprint' | 'trace' }) {
  const groupRef = useRef<THREE.Group>(null);
  const lineColor = theme === 'blueprint' ? '#E63946' : '#FFFFFF';
  const opacity = theme === 'trace' ? 0.3 : 1;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Complex multi-axis rotation
      groupRef.current.rotation.y += 0.0005;
      groupRef.current.rotation.x = Math.PI / 6 + Math.sin(time * 0.2) * 0.05;
      
      // Subtle "breathing" scale
      const pulse = 1 + Math.sin(time * 0.5) * 0.02;
      groupRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  const lines = useMemo(() => {
    const size = 10;
    const step = 0.5;
    const gridLines = [];
    
    // Create grid lines manually for finer control
    for (let i = -size; i <= size; i += step) {
      gridLines.push(
        new THREE.Vector3(-size, 0, i),
        new THREE.Vector3(size, 0, i),
        new THREE.Vector3(i, 0, -size),
        new THREE.Vector3(i, 0, size)
      );
    }
    return new THREE.Float32BufferAttribute(
      gridLines.flatMap(v => [v.x, v.y, v.z]),
      3
    );
  }, []);

  // Use a separate component for pillars to animate them individually
  function Pillar({ pos, color, op }: { pos: [number, number, number], color: string, op: number }) {
    const pillarRef = useRef<THREE.Group>(null);
    useFrame((state) => {
      if (pillarRef.current) {
        const time = state.clock.getElapsedTime();
        const offset = pos[0] + pos[2];
        pillarRef.current.scale.y = 1 + Math.sin(time + offset) * 0.5;
      }
    });

    return (
      <group ref={pillarRef} position={pos}>
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute 
              attach="attributes-position" 
              {...new THREE.Float32BufferAttribute([0, 0, 0, 0, 1.5, 0], 3)} 
            />
          </bufferGeometry>
          <lineBasicMaterial color={color} transparent opacity={op} />
        </lineSegments>
      </group>
    );
  }

  return (
    <group ref={groupRef} rotation={[Math.PI / 6, Math.PI / 4, 0]}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" {...lines} />
        </bufferGeometry>
        <lineBasicMaterial color={lineColor} transparent opacity={opacity} linewidth={0.5} />
      </lineSegments>
      
      {/* vertical pillars with individual growth animations */}
      {[...Array(12)].map((_, i) => (
        <Pillar 
          key={i} 
          pos={[
            (Math.random() - 0.5) * 10, 
            0, 
            (Math.random() - 0.5) * 10
          ]} 
          color={lineColor} 
          op={opacity * 0.4} 
        />
      ))}
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
          <Float speed={3} rotationIntensity={1} floatIntensity={1}>
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
