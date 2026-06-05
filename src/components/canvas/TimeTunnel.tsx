import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import styles from './TimeTunnel.module.css';

const tunnelVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const tunnelFragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vPosition;

  // Simple noise function
  float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
  }

  void main() {
    // Light streaks moving vertically
    float streak = sin(vUv.y * 50.0 + uTime * 2.0) * 0.5 + 0.5;
    
    // Add noise and break up streaks
    float noise = rand(vec2(floor(vUv.x * 20.0), floor(vUv.y * 20.0)));
    streak *= step(0.8, noise + streak * 0.5);

    vec3 color = mix(vec3(0.0, 0.898, 1.0), vec3(0.545, 0.361, 0.965), vUv.x);
    
    // Fade out towards the top and bottom of the cylinder
    float alpha = smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);

    gl_FragColor = vec4(color * streak * 2.0, alpha * streak * 0.5);
  }
`;

const particleCount = 800;
const particleGeometry = new THREE.BufferGeometry();
const particlePositions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount; i++) {
  // Cylinder distribution
  const radius = 3 + Math.random() * 2;
  const theta = Math.random() * Math.PI * 2;
  const y = (Math.random() - 0.5) * 50; // spread along Y

  particlePositions[i * 3] = Math.cos(theta) * radius;
  particlePositions[i * 3 + 1] = y;
  particlePositions[i * 3 + 2] = Math.sin(theta) * radius;
}
particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

import { useStore } from '../../store/useStore';

const experiences = [
  {
    id: "a4conserv",
    title: "Software Developer",
    company: "A4Conserv Pvt Ltd",
    date: "Aug 2025 – Present",
    position: [0, 10, 0] as [number, number, number],
    color: "#00E5FF",
    bullets: [
      "Engineered and maintained 3+ production web applications using React.js and Angular, serving real end-users in the education sector",
      "Developed complete NGO website (A4MAM) using Angular, THREE.js WebGL animations, and GSAP ScrollTrigger — cinematic 16-section UI with glassmorphism design system",
      "Designed UI/UX in Figma for multiple projects — wireframes, component libraries, and design systems — then implemented pixel-perfect in code",
      "Delivered school website using React.js, Tailwind CSS, and GSAP — smooth animations, responsive layouts, cross-browser compatibility",
      "Architected Angular-based LMS dashboard with course, chapter, and video management modules, improving admin workflow efficiency",
      "Built enterprise Office Tracker & Task Management System with RBAC, project-task-subtask hierarchy, and real-time analytics dashboard",
      "Implemented lazy loading and RxJS-based state management to optimize Angular app performance",
      "Created 20+ reusable Angular and React components, reducing code duplication and accelerating team development velocity",
      "Collaborated in cross-functional Agile teams through structured sprints and code reviews"
    ]
  },
  {
    id: "eduvate",
    title: "MERN Stack Developer Intern",
    company: "Eduvate Skills",
    date: "Apr 2025 – Aug 2025",
    position: [0, 0, 0] as [number, number, number],
    color: "#B388FF",
    bullets: [
      "Designed responsive UI components in Figma and implemented them using React.js, following component-based architecture and DRY principles",
      "Integrated frontend with Node.js/Express backend APIs; implemented full CRUD functionality for MERN stack capstone project",
      "Applied Git-based version control and participated in team code collaboration workflows",
      "Optimized component performance through efficient state management and code structuring"
    ]
  },
  {
    id: "unigold",
    title: "IT Administrator",
    company: "Unigold Finance Ltd.",
    date: "Apr 2023 – Oct 2024",
    position: [0, -10, 0] as [number, number, number],
    color: "#1DE9B6",
    bullets: [
      "Managed IT infrastructure, user systems, software tools, and digital documentation for internal operations",
      "Developed strong analytical and problem-solving skills directly applicable to software engineering"
    ]
  }
];

export const TimeTunnel = () => {
  const setActiveExperience = useStore(state => state.setActiveExperience);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 }
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (particlesRef.current) {
      // Rotate particles slightly and move them up to simulate falling down
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;

      // Dynamic distortion based on scroll speed (derivative of progress could be used, but we'll use simple oscillation)
      const distortion = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      particlesRef.current.scale.x = 1 + distortion;
      particlesRef.current.scale.z = 1 + distortion;
    }
  });

  return (
    <group position={[0, 0, 0]}> {/* Position controlled by Scene.tsx */}
      {/* The Tunnel Walls */}
      <mesh>
        <cylinderGeometry args={[5, 5, 40, 16, 1, true]} /> {/* Open-ended cylinder */}
        <shaderMaterial
          ref={materialRef}
          vertexShader={tunnelVertexShader}
          fragmentShader={tunnelFragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.BackSide} // Render on the inside
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Particle Streams inside the tunnel */}
      <points ref={particlesRef} geometry={particleGeometry}>
        <pointsMaterial
          color="#00E5FF"
          size={0.05}
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Holographic Experience Panels */}
      {experiences.map((exp, index) => (
        <group key={index} position={exp.position}>
          <Html center distanceFactor={typeof window !== 'undefined' && window.innerWidth <= 768 ? 6 : 15} zIndexRange={[100, 0]} transform>
            <div
              className={styles.expCard}
              style={{
                border: `1px solid ${exp.color}`,
                boxShadow: `0 0 20px ${exp.color}40, inset 0 0 20px ${exp.color}20`,
                width: typeof window !== 'undefined' && window.innerWidth <= 768 ? '280px' : '450px',
                whiteSpace: 'normal',
                wordWrap: 'break-word'
              }}
            >
              <h3
                className={styles.title}
                style={{
                  color: exp.color,
                  textShadow: `0 0 10px ${exp.color}`,
                  whiteSpace: 'normal',
                  wordWrap: 'break-word',
                  fontSize: typeof window !== 'undefined' && window.innerWidth <= 768 ? '1.2rem' : '1.8rem'
                }}
              >
                {exp.title}
              </h3>
              <p className={styles.company}>
                {exp.company}
              </p>
              <p className={styles.date}>
                {exp.date}
              </p>
              <button
                className={styles.button}
                onClick={(e) => { e.stopPropagation(); setActiveExperience(exp); }}
                aria-label={`View experience details for ${exp.title} at ${exp.company}`}
                style={{
                  border: `1px solid ${exp.color}`,
                  color: exp.color,
                  boxShadow: `0 0 10px ${exp.color}40`
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = exp.color;
                  e.currentTarget.style.color = '#000';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = exp.color;
                }}
              >
                Explore Details
              </button>
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
};
