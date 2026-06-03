import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { ScrollManager } from './components/layout/ScrollManager';
import { CustomCursor } from './components/layout/CustomCursor';
import { NavigationHUD } from './components/layout/NavigationHUD';
import { ProjectOverlay } from './components/layout/ProjectOverlay';
import { ExperienceOverlay } from './components/layout/ExperienceOverlay';
import { Scene } from './components/canvas/Scene';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { EngineeringHighlights } from './components/sections/EngineeringHighlights';
import { Experience, Projects } from './components/sections/Experience';
import { ContactTerminal } from './components/sections/ContactTerminal';
import { CinematicIntro } from './components/layout/CinematicIntro';

import { EngineeringPhilosophy } from './components/sections/EngineeringPhilosophy';
import { SystemDesign } from './components/sections/SystemDesign';
import { PerformanceEngineering } from './components/sections/PerformanceEngineering';
import { GithubSection } from './components/sections/GithubSection';
import { ResumeSection } from './components/sections/ResumeSection';

function App() {
  return (
    <>
      <CinematicIntro />
      <CustomCursor />
      <ScrollManager />
      <NavigationHUD />
      <ProjectOverlay />
      <ExperienceOverlay />
      
      {/* 3D Background Layer */}
      <div className="canvas-container" aria-hidden="true" tabIndex={-1}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 2]} // Support high DPI displays
          gl={{ antialias: false, powerPreference: "high-performance" }} // Antialias false because we'll use PostProcessing
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* HTML Overlay Layer */}
      <div className="html-overlay">
        <Hero />
        <About />
        <EngineeringHighlights /> {/* Acts as Skills / Core Competencies */}
        <EngineeringPhilosophy />
        <Experience />
        <Projects />
        <SystemDesign />
        <PerformanceEngineering />
        <GithubSection />
        <ResumeSection />
        <ContactTerminal />
      </div>
    </>
  );
}

export default App;
