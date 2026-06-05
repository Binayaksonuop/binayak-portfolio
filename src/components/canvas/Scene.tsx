import React, { Suspense } from 'react';
import { EffectComposer, Bloom, Noise, Vignette, DepthOfField } from '@react-three/postprocessing';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Preload } from '@react-three/drei';
import { useStore } from '../../store/useStore';

// Lazy load all heavy WebGL scenes
const QuantumCore = React.lazy(() => import('./QuantumCore').then(module => ({ default: module.QuantumCore })));
const TimeTunnel = React.lazy(() => import('./TimeTunnel').then(module => ({ default: module.TimeTunnel })));
const ProjectUniverse = React.lazy(() => import('./ProjectUniverse').then(module => ({ default: module.ProjectUniverse })));
const TechWall = React.lazy(() => import('./TechWall').then(module => ({ default: module.TechWall })));
const SkillsGalaxy = React.lazy(() => import('./SkillsGalaxy').then(module => ({ default: module.SkillsGalaxy })));

const CameraRig = () => {
  const { camera } = useThree();
  const scrollProgress = useStore((state) => state.scrollProgress);

  useFrame(() => {
    const targetY = -scrollProgress * 250;

    camera.position.lerp(new THREE.Vector3(0, targetY, 5), 0.05);

    if (scrollProgress > 0.9) {
      const tilt = (scrollProgress - 0.9) * 10 * 0.5;
      camera.rotation.set(THREE.MathUtils.lerp(camera.rotation.x, tilt, 0.05), camera.rotation.y, camera.rotation.z);
    } else {
      camera.rotation.set(THREE.MathUtils.lerp(camera.rotation.x, 0, 0.05), camera.rotation.y, camera.rotation.z);
    }
  });

  return null;
};

export const Scene = () => {
  const isMobile = useStore((state) => state.isMobile);
  const scrollProgress = useStore((state) => state.scrollProgress);

  // Strict rendering thresholds mapped to real DOM heights (1650vh total with new Showcase) to prevent overlap
  const renderQuantumTop = scrollProgress < 0.15;
  const renderSkillsGalaxy = scrollProgress > 0.05 && scrollProgress < 0.30;
  const renderTimeTunnel = scrollProgress > 0.25 && scrollProgress < 0.45;
  const renderProjectUniverse = scrollProgress > 0.35 && scrollProgress < 0.60;
  const renderTechWall = scrollProgress > 0.65 && scrollProgress < 0.90;
  const renderQuantumBottom = scrollProgress > 0.85;

  return (
    <>
      <color attach="background" args={['#020617']} />
      <fog attach="fog" args={['#020617', 20, 250]} />

      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />

      <CameraRig />

      <Suspense fallback={null}>
        {renderQuantumTop && <QuantumCore />}

        {renderSkillsGalaxy && (
          <group position={[6, -40, -10]} rotation={[0.4, 0, -0.2]}>
            <SkillsGalaxy />
          </group>
        )}

        {renderTimeTunnel && (
          <group position={[0, -85, 0]}>
            <TimeTunnel />
          </group>
        )}

        {renderProjectUniverse && (
          <group position={[0, -125, -10]}>
            <ProjectUniverse />
          </group>
        )}

        {renderTechWall && (
          <group position={[0, -195, 0]}>
            <TechWall />
          </group>
        )}

        {renderQuantumBottom && (
          <group position={[0, -240, -40]} scale={[3, 3, 3]}>
            <QuantumCore />
          </group>
        )}
      </Suspense>

      {/* Disable expensive post-processing on mobile completely to guarantee 60fps */}
      {!isMobile && (
        <EffectComposer multisampling={4}>
          <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
          <Bloom
            luminanceThreshold={0.5}
            luminanceSmoothing={0.9}
            intensity={1.0}
            mipmapBlur
          />
          <Noise opacity={0.03} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      )}

      <Preload all />
    </>
  );
};
