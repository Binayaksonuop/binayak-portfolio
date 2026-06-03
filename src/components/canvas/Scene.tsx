import { EffectComposer, Bloom, Noise, Vignette, DepthOfField } from '@react-three/postprocessing';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Preload } from '@react-three/drei';
import { QuantumCore } from './QuantumCore';
import { TimeTunnel } from './TimeTunnel';
import { ProjectUniverse } from './ProjectUniverse';
import { TechWall } from './TechWall';
import { SkillsGalaxy } from './SkillsGalaxy';
import { useStore } from '../../store/useStore';

const CameraRig = () => {
  const { camera } = useThree();
  const scrollProgress = useStore((state) => state.scrollProgress);

  useFrame(() => {
    // 0 = Top (Quantum Core)
    // 0.2 = About section
    // 0.4 = Skills Galaxy
    // 0.6 = Time Tunnel
    // 0.8 = Project Universe
    // 0.9 = Tech Wall
    // 1.0 = Contact Terminal
    
    // Total vertical distance increased to 250 to accommodate new sections
    const targetY = -scrollProgress * 250; 
    
    camera.position.lerp(new THREE.Vector3(0, targetY, 5), 0.05);

    // Final ending sequence: camera slowly tilts up to reveal the distant cyclic universe
    if (scrollProgress > 0.9) {
      const tilt = (scrollProgress - 0.9) * 10 * 0.5; // Up to 0.5 rad tilt
      camera.rotation.set(THREE.MathUtils.lerp(camera.rotation.x, tilt, 0.05), camera.rotation.y, camera.rotation.z);
    } else {
      camera.rotation.set(THREE.MathUtils.lerp(camera.rotation.x, 0, 0.05), camera.rotation.y, camera.rotation.z);
    }
  });

  return null;
};

export const Scene = () => {
  const isMobile = useStore((state) => state.isMobile);

  return (
    <>
      <color attach="background" args={['#020617']} />
      <fog attach="fog" args={['#020617', 20, 250]} />
      
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      
      <CameraRig />
      
      <QuantumCore />
      {/* Positioned around Engineering Highlights / Skills (~25% down) */}
      <group position={[0, -60, -5]}>
        <SkillsGalaxy />
      </group>
      {/* TimeTunnel positioned at Experience (~45% down) */}
      <group position={[0, -110, 0]}>
        <TimeTunnel />
      </group>
      {/* ProjectUniverse positioned at Projects (~55% down) */}
      <group position={[0, -140, -10]}>
        <ProjectUniverse />
      </group>
      {/* TechWall positioned near Performance/Github (~85% down) */}
      <group position={[0, -210, 0]}>
        <TechWall />
      </group>

      {/* Cyclic Ending Sequence: Contact Section (100% down -> Y = -250) */}
      <group position={[0, -250, -40]} scale={[3, 3, 3]}>
        <QuantumCore />
      </group>

      <EffectComposer multisampling={4}>
        <>{!isMobile && <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />}</>
        <Bloom 
          luminanceThreshold={0.5} 
          luminanceSmoothing={0.9} 
          intensity={1.0} 
          mipmapBlur 
        />
        <>{!isMobile && <Noise opacity={0.03} />}</>
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>

      <Preload all />
    </>
  );
};
