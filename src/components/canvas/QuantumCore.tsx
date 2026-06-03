import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

const vertexShader = `
  uniform float uTime;
  attribute float aScale;
  attribute vec3 aRandomness;

  varying vec3 vColor;

  void main() {
    // Basic particle movement using sine waves
    vec3 pos = position;
    
    float time = uTime * 0.2;
    
    // Add procedural noise/movement
    pos.x += sin(time * aRandomness.x) * 0.5;
    pos.y += cos(time * aRandomness.y) * 0.5;
    pos.z += sin(time * aRandomness.z) * 0.5;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    // Size attenuation
    gl_PointSize = (aScale * 15.0) * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;

    // Pass color to fragment shader based on position
    vColor = vec3(0.0, 0.898, 1.0); // #00E5FF
    // Mix with purple based on Y position
    vColor = mix(vColor, vec3(0.545, 0.361, 0.965), (pos.y + 1.0) * 0.5); // #8B5CF6
  }
`;

const fragmentShader = `
  varying vec3 vColor;

  void main() {
    // Create a soft circle particle
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.05 / distanceToCenter - 0.1;
    
    gl_FragColor = vec4(vColor, strength);
  }
`;

export const QuantumCore = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const scrollProgress = useStore((state) => state.scrollProgress);
  const isMobile = useStore((state) => state.isMobile);
  
  const particleCount = isMobile ? 3000 : 10000;
  
  // Procedural generation of particle geometry
  const [positions, scales, randomness] = useMemo(() => {
    /* eslint-disable react-hooks/purity */
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const randomness = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Spherical distribution
      const radius = Math.random() * 2 + 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      scales[i] = Math.random();
      
      randomness[i3] = Math.random() * 2 - 1;
      randomness[i3 + 1] = Math.random() * 2 - 1;
      randomness[i3 + 2] = Math.random() * 2 - 1;
    }
    /* eslint-enable react-hooks/purity */
    
    return [positions, scales, randomness];
  }, [particleCount]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
  }), []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      
      // Update shader uniform
      const material = pointsRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Interact with scroll progress
      // As user scrolls, the core expands
      const targetScale = 1 + scrollProgress * 2;
      pointsRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          args={[positions, 3]} 
        />
        <bufferAttribute 
          attach="attributes-aScale" 
          args={[scales, 1]} 
        />
        <bufferAttribute 
          attach="attributes-aRandomness" 
          args={[randomness, 3]} 
        />
      </bufferGeometry>
      <shaderMaterial 
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
