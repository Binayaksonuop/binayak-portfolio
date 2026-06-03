import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

const technologies = [
  "React", "Angular", "TypeScript", "JavaScript", 
  "Three.js", "GSAP", "Node.js", "Git", "Figma"
];

// Shared resources to minimize draw calls and memory overhead
const planeGeo = new THREE.PlaneGeometry(3, 1.5);
const cornerGeo = new THREE.BoxGeometry(0.2, 0.2, 0.05);
const cornerMat = new THREE.MeshBasicMaterial({ color: "#8B5CF6" });
const lineMat = new THREE.LineBasicMaterial({ color: "#00E5FF", transparent: true, opacity: 0.2 });

const gridData: {name: string, position: [number, number, number], delay: number}[] = [];
let i = 0;
for (let row = -1; row <= 1; row++) {
  for (let col = -1; col <= 1; col++) {
    if (i < technologies.length) {
      gridData.push({
        name: technologies[i],
        position: [col * 4, row * -2.5, (Math.random() - 0.5) * 2],
        delay: Math.random() * Math.PI * 2
      });
      i++;
    }
  }
}

const HolographicPanel = ({ name, position, delay }: { name: string, position: [number, number, number], delay: number }) => {
  const ref = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (ref.current && materialRef.current) {
      // Floating animation
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.2;
      
      const mx = (state.pointer.x * Math.PI) * 0.1;
      const my = (state.pointer.y * Math.PI) * 0.1;
      
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -my, 0.1);
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, mx, 0.1);

      if (hovered) {
        materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(materialRef.current.emissiveIntensity, 3, 0.1);
        ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, position[2] + 1, 0.1);
      } else {
        materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(materialRef.current.emissiveIntensity, 0.8 + Math.sin(state.clock.elapsedTime * 3 + delay) * 0.4, 0.1);
        ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, position[2], 0.1);
      }
    }
  });

  return (
    <group 
      ref={ref} 
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
    >
      <mesh geometry={planeGeo}>
        <meshStandardMaterial 
          ref={materialRef}
          color="#00E5FF" 
          emissive="#00E5FF" 
          transparent 
          opacity={0.1} 
          side={THREE.DoubleSide} 
          wireframe
        />
      </mesh>
      
      <mesh geometry={cornerGeo} material={cornerMat} position={[-1.5, 0.75, 0]} />
      <mesh geometry={cornerGeo} material={cornerMat} position={[1.5, 0.75, 0]} />
      <mesh geometry={cornerGeo} material={cornerMat} position={[-1.5, -0.75, 0]} />
      <mesh geometry={cornerGeo} material={cornerMat} position={[1.5, -0.75, 0]} />

      <Html transform distanceFactor={10} position={[0, 0, 0.1]} style={{ pointerEvents: 'none' }}>
        <div style={{
          color: hovered ? '#FFFFFF' : '#00E5FF',
          fontFamily: 'var(--font-heading)',
          fontSize: '2rem',
          letterSpacing: '0.1em',
          textShadow: hovered ? '0 0 20px #FFFFFF' : '0 0 10px #00E5FF',
          transition: 'all 0.3s'
        }}>
          {name}
        </div>
      </Html>
    </group>
  );
};

export const TechWall = () => {
  const lineGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (lineGroupRef.current) {
      // Pulse the connection lines
      lineGroupRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Line) {
          (child.material as THREE.LineBasicMaterial).opacity = 0.1 + Math.sin(state.clock.elapsedTime * 5 + i) * 0.1;
        }
      });
    }
  });

  return (
    <group position={[0, 0, 0]}> {/* Position controlled by Scene.tsx */}
      {/* Background data particles */}
      <points>
        <boxGeometry args={[20, 15, 5, 10, 10, 5]} />
        <pointsMaterial color="#8B5CF6" size={0.05} transparent opacity={0.3} />
      </points>

      {/* Holographic Panels */}
      {gridData.map((item, index) => (
        <HolographicPanel key={index} name={item.name} position={item.position} delay={item.delay} />
      ))}

      {/* Energy Pulses/Connections */}
      <group ref={lineGroupRef}>
        {gridData.map((item, idx) => {
          if (idx === gridData.length - 1) return null;
          const next = gridData[idx + 1];
          const points = [
            new THREE.Vector3(...item.position),
            new THREE.Vector3(...next.position)
          ];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          return (
            <primitive key={`line-${idx}`} object={new THREE.Line(geometry, lineMat)} />
          );
        })}
      </group>
    </group>
  );
};
