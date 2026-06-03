import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { useStore } from '../../store/useStore';
import type { ProjectData } from '../../store/useStore';

const projectsData: Record<string, ProjectData> = {
  a4mam: {
    id: 'a4mam',
    name: 'A4MAM NGO Web Application',
    problem: 'An NGO needed a digital awareness platform that could visually captivate users while effectively delivering educational content about their ecosystem initiatives.',
    research: 'Analyzed competitor NGO platforms, discovering a lack of immersive storytelling. Prototyped various WebGL data visualization techniques.',
    design: 'Designed a 16-section cinematic UI system in Figma, integrating glassmorphism to blend HTML content seamlessly over a 3D background.',
    development: 'Built the core application in Angular. Integrated Three.js and GSAP ScrollTrigger to orchestrate complex animations tied to user scrolling.',
    challenges: 'Rendering heavy 3D particle systems and animations caused severe frame drops on mobile devices, threatening user retention.',
    result: 'Delivered a responsive, 60fps experience across devices that increased average session duration by 200%.',
    techStack: ['Angular', 'TypeScript', 'Three.js', 'GSAP'],
    frameworkChoice: 'Angular chosen for strict typing and DI pattern suited for enterprise scaling. Three.js chosen over vanilla WebGL for rapid 3D scene construction.',
    architectureSelected: 'Modular Angular architecture with decoupled Three.js rendering contexts to prevent main-thread blocking.',
    performanceTradeoffs: 'Sacrificed initial load time (bundle size) to deliver rich, pre-loaded 3D assets for a seamless post-load experience.',
    challengesFaced: 'Rendering heavy 3D particle systems and animations caused severe frame drops on mobile devices, threatening user retention.',
    solutionsImplemented: 'Implemented InstancedMesh for particles, compressed geometries using Draco, and lazily instantiated heavy WebGL components.',
    architecture: 'Modular Angular architecture with decoupled Three.js rendering contexts to prevent main-thread blocking.',
    performanceOptimizations: 'Implemented InstancedMesh for particles, compressed geometries using Draco, and lazily instantiated heavy WebGL components.',
    reusableComponents: 'Created a library of polymorphic UI cards, standardizing the glassmorphic aesthetic across the app.',
    apiIntegrations: 'Integrated with headless CMS APIs using RxJS for reactive data streams.',
    lessonsLearned: 'Deepened my understanding of browser rendering pipelines and the critical importance of memory management in WebGL apps.',
    demoUrl: 'https://a4mam-ngo.vercel.app',
    githubUrl: 'https://github.com/Binayaksonuop/a4mam-ngo',
    heroImage: '/projects/a4mam_dashboard_1780161658336.png',
    featureImages: ['/projects/a4mam_dashboard_1780161658336.png', '/projects/a4mam_dashboard_1780161658336.png'],
    mobileImages: ['/projects/a4mam_dashboard_1780161658336.png']
  },
  lms: {
    id: 'lms',
    name: 'Enterprise LMS Dashboard',
    problem: 'The existing learning management system was slow, difficult to navigate, and required full page reloads for every action.',
    research: 'Conducted user interviews with administrators, identifying that deeply nested course creation was the primary bottleneck.',
    design: 'Wireframed a single-page application (SPA) dashboard focusing on spatial data visualization and quick-action menus.',
    development: 'Architected the frontend using Angular and SCSS, implementing a robust state management layer with RxJS BehaviorSubjects.',
    challenges: 'Handling complex nested data structures (courses > modules > lessons) and ensuring real-time state synchronization across multiple views.',
    result: 'Reduced admin workflow time by 40% and eliminated duplicate API calls, resulting in a significantly snappier UI.',
    techStack: ['Angular', 'RxJS', 'SCSS', 'REST APIs'],
    frameworkChoice: 'Angular chosen for its robust built-in router and RxJS integration, essential for complex dashboard state management.',
    architectureSelected: 'Micro-frontend inspired architecture using lazy-loaded Angular feature modules to split bundle size.',
    performanceTradeoffs: 'Increased code complexity (RxJS boilerplate) in exchange for zero-flicker, optimistic UI updates.',
    challengesFaced: 'Handling complex nested data structures (courses > modules > lessons) and ensuring real-time state synchronization across multiple views.',
    solutionsImplemented: 'Built a centralized state layer using RxJS BehaviorSubjects to broadcast changes without prop-drilling or event buses.',
    architecture: 'Micro-frontend inspired architecture using lazy-loaded Angular feature modules.',
    performanceOptimizations: 'Aggressive use of OnPush change detection and pure pipes to minimize Angular digest cycles.',
    reusableComponents: 'Developed a custom, accessible data-grid component capable of virtual scrolling.',
    apiIntegrations: 'Implemented HTTP interceptors for global error handling and JWT token refresh flows.',
    lessonsLearned: 'Mastered reactive programming paradigms with RxJS to handle complex, asynchronous state mutations gracefully.',
    demoUrl: 'https://enterprise-lms-platform.vercel.app',
    githubUrl: 'https://github.com/Binayaksonuop/enterprise-lms',
    heroImage: '/projects/lms_dashboard_1780161672696.png',
    featureImages: ['/projects/lms_dashboard_1780161672696.png'],
    mobileImages: []
  },
  office: {
    id: 'office',
    name: 'Office Task Management System',
    problem: 'Global offices were relying on fragmented spreadsheets for task tracking, leading to resource allocation conflicts.',
    research: 'Audited existing workflows and determined the need for a real-time, unified dashboard with granular role-based access.',
    design: 'Created high-fidelity prototypes in Figma, prioritizing data density and clear visual hierarchies for tasks.',
    development: 'Built a React-based SPA. Utilized Tailwind CSS for rapid styling and Zustand for lightweight, scalable state management.',
    challenges: 'Designing a state management solution that could handle deeply nested project-task-subtask hierarchies without causing cascading re-renders.',
    result: 'Replaced legacy spreadsheet workflows, increasing team productivity and task visibility by 80%.',
    techStack: ['React', 'Zustand', 'TypeScript', 'Tailwind CSS'],
    frameworkChoice: 'React chosen for its massive ecosystem of unopinionated libraries. Tailwind used to accelerate UI iterations.',
    architectureSelected: 'Atomic state management approach using Zustand, bypassing React Context limitations for frequent updates.',
    performanceTradeoffs: 'Opted out of Server-Side Rendering (SSR) to keep deployment architecture simple (S3/CloudFront) since SEO was not required for an internal tool.',
    challengesFaced: 'Designing a state management solution that could handle deeply nested project-task-subtask hierarchies without causing cascading re-renders.',
    solutionsImplemented: 'Normalized state shape (flat maps instead of nested objects) and selected slices of state using Zustand selectors.',
    architecture: 'Atomic state management approach using Zustand, bypassing React Context limitations for frequent updates.',
    performanceOptimizations: 'Memoized expensive list components using React.memo and useMemo hooks.',
    reusableComponents: 'Built a drag-and-drop Kanban board component entirely from scratch.',
    apiIntegrations: 'Integrated REST APIs for CRUD operations and WebSocket connections for real-time task status updates.',
    lessonsLearned: 'Gained practical experience in optimizing React render cycles and the benefits of atomic state over global contexts for specific use cases.',
    demoUrl: 'https://office-tracker-dashboard.vercel.app',
    githubUrl: 'https://github.com/Binayaksonuop/office-tracker',
    heroImage: '/projects/office_tracker_1780161688788.png',
    featureImages: ['/projects/office_tracker_1780161688788.png'],
    mobileImages: []
  },
  hrms: {
    id: 'hrms',
    name: 'HR Management Platform',
    problem: 'HR teams needed a secure, centralized interface for managing employee lifecycles, payroll data, and compliance documents.',
    research: 'Analyzed enterprise security requirements and defined strict accessibility standards (WCAG 2.1 AA) for the platform.',
    design: 'Designed a clean, professional interface using Material Design principles, ensuring high contrast and keyboard navigability.',
    development: 'Developed the frontend using React and TypeScript, leveraging Material UI for accessible foundational components.',
    challenges: 'Ensuring strict data security while rendering massive, data-heavy tables that remain performant with thousands of rows.',
    result: 'Standardized internal HR processes and achieved a 100% Lighthouse accessibility score.',
    techStack: ['React', 'TypeScript', 'Figma', 'Material UI'],
    frameworkChoice: 'React + Material UI chosen to leverage pre-built, WCAG-compliant components to accelerate the timeline.',
    architectureSelected: 'Component-based architecture with strict separation of presentation (dumb) and container (smart) components.',
    performanceTradeoffs: 'Material UI increased the base bundle size, but provided immense value in guaranteed accessibility compliance.',
    challengesFaced: 'Ensuring strict data security while rendering massive, data-heavy tables that remain performant with thousands of rows.',
    solutionsImplemented: 'Integrated react-window for DOM virtualization, rendering only the visible rows and maintaining 60fps scrolling.',
    architecture: 'Component-based architecture with strict separation of presentation and container components.',
    performanceOptimizations: 'Implemented virtualization (react-window) for large datasets and lazy loading for non-critical routes.',
    reusableComponents: 'Created a suite of highly configurable, accessible form controls with built-in validation.',
    apiIntegrations: 'Integrated with secure backend services via OAuth2 and handled complex multipart form uploads for documents.',
    lessonsLearned: 'Solidified best practices in web accessibility (a11y) and building secure frontend architectures.',
    demoUrl: 'https://secure-hrms-portal.vercel.app',
    githubUrl: 'https://github.com/Binayaksonuop/hrms-platform',
    heroImage: '/projects/hrms_network_1780161702805.png',
    featureImages: ['/projects/hrms_network_1780161702805.png'],
    mobileImages: []
  },
  school: {
    id: 'school',
    name: 'School Campus Portal',
    problem: 'An educational institution needed both an administrative portal and a visually appealing public-facing site for prospective students.',
    research: 'Evaluated various SSG and SPA frameworks, choosing Vite for rapid development and optimized production builds.',
    design: 'Established a comprehensive design system that catered to both complex admin forms and modern, animated public pages.',
    development: 'Built the portal using React, Tailwind CSS, and GSAP for micro-animations that enhanced the user experience without being distracting.',
    challenges: 'Creating a unified design system that felt cohesive across two distinctly different user journeys (admin vs. public).',
    result: 'Successfully delivered on aggressive timelines, providing a seamless experience for students and staff.',
    techStack: ['React', 'Tailwind CSS', 'GSAP', 'Vite'],
    frameworkChoice: 'React + Vite chosen for near-instant hot module replacement (HMR) and highly optimized production Rollup builds.',
    architectureSelected: 'Monorepo-style structure separating public and admin modules, sharing a core UI component library.',
    performanceTradeoffs: 'Client-side routing causes a slight delay on initial load compared to SSG, but enables seamless page transitions via GSAP.',
    challengesFaced: 'Creating a unified design system that felt cohesive across two distinctly different user journeys (admin vs. public).',
    solutionsImplemented: 'Abstracted design tokens into a shared CSS variable system and configured Tailwind to consume them globally.',
    architecture: 'Monorepo-style structure separating public and admin modules, sharing a core UI component library.',
    performanceOptimizations: 'Optimized build output with Vite (Rollup), ensuring minimal bundle sizes and aggressive caching strategies.',
    reusableComponents: 'Developed a robust, themable UI library used across all internal projects.',
    apiIntegrations: 'Integrated headless CMS for public content and REST APIs for secure student data.',
    lessonsLearned: 'Learned the importance of strict design tokens and utility-first CSS for maintaining consistency across large applications.',
    demoUrl: 'https://modern-school-campus.vercel.app',
    githubUrl: 'https://github.com/Binayaksonuop/school-campus-portal',
    heroImage: '/projects/school_campus_1780161717072.png',
    featureImages: ['/projects/school_campus_1780161717072.png'],
    mobileImages: []
  }
};

const ProjectAura = () => {
  const groupRef = useRef<THREE.Group>(null);
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      ringsRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Outer Sphere Core Glow */}
      <mesh>
        <sphereGeometry args={[4.5, 16, 16]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.02} wireframe />
      </mesh>
      
      {/* Rotating Tech Rings */}
      <group ref={ringsRef}>
        <mesh rotation-x={Math.PI / 2}>
          <torusGeometry args={[5, 0.02, 16, 50]} />
          <meshBasicMaterial color="#00E5FF" transparent opacity={0.4} />
        </mesh>
        <mesh rotation-y={Math.PI / 2}>
          <torusGeometry args={[4.8, 0.02, 16, 50]} />
          <meshBasicMaterial color="#8B5CF6" transparent opacity={0.4} />
        </mesh>
        <mesh rotation-z={Math.PI / 4}>
          <torusGeometry args={[5.2, 0.01, 16, 50]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
        </mesh>
      </group>

      {/* Futuristic Grid Floor */}
      <gridHelper args={[12, 12, '#00E5FF', '#020617']} position={[0, -3, 0]} />
    </group>
  );
};

// Generic Wrapper for Interactive Project Worlds
const ProjectWorld = ({ 
  projectData, 
  position 
}: { 
  projectData: ProjectData, 
  position: [number, number, number]
}) => {
  const { camera } = useThree();
  const [hovered, setHovered] = useState(false);
  const setActiveProject = useStore(state => state.setActiveProject);

  const handleClick = (e: any) => {
    e.stopPropagation();
    // Cinematic camera fly-through into the project
    // Move camera to just slightly in front of the object
    const worldX = position[0] + 0;
    const worldY = position[1] - 140;
    const worldZ = position[2] - 10;

    gsap.to(camera.position, {
      x: worldX,
      y: worldY,
      z: worldZ + 4,
      duration: 2.5,
      ease: 'expo.inOut'
    });
    // Rotate camera to look exactly at the center
    gsap.to(camera.rotation, {
      x: 0,
      y: 0,
      z: 0,
      duration: 2.5,
      ease: 'expo.inOut',
      onComplete: () => {
        setActiveProject(projectData);
      }
    });
  };

  return (
    <group
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
      onClick={handleClick}
    >
      {/* Central Project Core (Replaced Image to prevent missing texture crashes) */}
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial color="#00E5FF" wireframe opacity={0.3} transparent />
      </mesh>
      
      {/* Inner glowing core */}
      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[0.8, 0]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Premium Tech Aura */}
      <ProjectAura />
      
      {/* Title that appears on hover + Screen Reader Access */}
      <Html position={[0, 4, 0]} center style={{ transition: 'opacity 0.5s', opacity: hovered ? 1 : 0 }}>
        <div style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '2rem',
          color: 'white',
          textShadow: '0 0 20px rgba(255,255,255,0.5)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          pointerEvents: 'none'
        }}>
          {projectData.name}
        </div>
        <button 
          className="sr-only" 
          onClick={handleClick}
          aria-label={`View Case Study for ${projectData.name}`}
          style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, opacity: 0, cursor: 'pointer' }}
        >
          {projectData.name}
        </button>
      </Html>

      {/* Hitbox for easier clicking */}
      <mesh position={[0, 0, 0]} visible={false}>
        <sphereGeometry args={[4, 16, 16]} />
        <meshBasicMaterial />
      </mesh>
    </group>
  );
};

export const ProjectUniverse = () => {
  return (
    <group position={[0, 0, 0]}> {/* Position controlled by Scene.tsx */}
      <ProjectWorld projectData={projectsData.a4mam} position={[0, 0, 0]} />
      
      {/* Spread out other projects so they are visible within the camera's 45deg FOV */}
      <ProjectWorld projectData={projectsData.lms} position={[-6, 4, -4]} />
      
      <ProjectWorld projectData={projectsData.office} position={[7, 3, -6]} />
      
      <ProjectWorld projectData={projectsData.hrms} position={[-5, -4, -2]} />
      
      <ProjectWorld projectData={projectsData.school} position={[6, -4, -3]} />
    </group>
  );
};
