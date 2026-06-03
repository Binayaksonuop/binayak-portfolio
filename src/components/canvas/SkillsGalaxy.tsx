import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

const skills = [
  { name: 'React', color: '#61DAFB', distance: 3, speed: 0.5, size: 0.5 },
  { name: 'Angular', color: '#DD0031', distance: 4.5, speed: 0.45, size: 0.5 },
  { name: 'Three.js', color: '#FFFFFF', distance: 6, speed: 0.4, size: 0.45 }, // Changed color from black to white for visibility
  { name: 'TypeScript', color: '#3178C6', distance: 7.5, speed: 0.35, size: 0.4 },
  { name: 'JavaScript', color: '#F7DF1E', distance: 9, speed: 0.3, size: 0.4 },
  { name: 'Node.js', color: '#339933', distance: 10.5, speed: 0.25, size: 0.45 },
  { name: 'Tailwind', color: '#06B6D4', distance: 12, speed: 0.2, size: 0.35 },
  { name: 'GSAP', color: '#88CE02', distance: 13.5, speed: 0.18, size: 0.35 },
  { name: 'Figma', color: '#F24E1E', distance: 15, speed: 0.15, size: 0.4 },
  { name: 'Express', color: '#FFFFFF', distance: 16.5, speed: 0.12, size: 0.3 },
  { name: 'Java', color: '#5382A1', distance: 18, speed: 0.1, size: 0.35 },
  { name: 'HTML/CSS', color: '#E34F26', distance: 19.5, speed: 0.08, size: 0.3 },
];

const SkillPlanet = ({ name, position, color, radius, speed, offset, size }: { 
  name: string, position: [number, number, number], color: string, radius: number, speed: number, offset: number, size: number 
}) => {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (ref.current) {
      // Orbital mechanics
      ref.current.position.x = Math.cos(state.clock.elapsedTime * speed + offset) * radius;
      ref.current.position.z = Math.sin(state.clock.elapsedTime * speed + offset) * radius;
      // Rotation on axis
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <group>
      <mesh 
        ref={ref} 
        position={position}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={hovered ? 2 : 0.5} 
          wireframe={!hovered}
        />
        
        {/* Holographic Text Label */}
        <Html distanceFactor={15} center style={{ pointerEvents: 'none' }}>
          <div style={{
            fontFamily: 'var(--font-heading)',
            color: hovered ? '#FFFFFF' : color,
            textShadow: hovered ? `0 0 20px ${color}` : 'none',
            opacity: hovered ? 1 : 0.5,
            transition: 'all 0.3s',
            fontSize: hovered ? '1.5rem' : '1rem',
            whiteSpace: 'nowrap'
          }}>
            {name}
          </div>
        </Html>
      </mesh>
    </group>
  );
};

export const SkillsGalaxy = () => {
  const galaxyRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (galaxyRef.current) {
      // Slowly rotate the entire galaxy
      galaxyRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  // eslint-disable-next-line react-hooks/purity
  const planetYOffsets = useMemo(() => skills.map(() => (Math.random() - 0.5) * 2), []);

  return (
    <group ref={galaxyRef}>
      {/* Central Star */}
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={2} wireframe />
      </mesh>
      
      {/* Orbital Rings */}
      {skills.map((skill, i) => (
        <mesh key={i} rotation-x={Math.PI / 2}>
          <ringGeometry args={[skill.distance - 0.05, skill.distance + 0.05, 64]} />
          <meshBasicMaterial color="#00E5FF" transparent opacity={0.1} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Technology Planets */}
      {skills.map((skill, index) => (
        <SkillPlanet 
          key={index}
          name={skill.name}
          position={[
            Math.cos((index / skills.length) * Math.PI * 2) * skill.distance,
            planetYOffsets[index],
            Math.sin((index / skills.length) * Math.PI * 2) * skill.distance
          ]}
          color={skill.color}
          radius={skill.distance}
          speed={skill.speed}
          offset={(index / skills.length) * Math.PI * 2}
          size={skill.size}
        />
      ))}
    </group>
  );
};
