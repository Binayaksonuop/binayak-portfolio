import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './SystemDesign.module.css';

gsap.registerPlugin(ScrollTrigger);

const tabs = [
  { id: 'components', label: 'Component Architecture' },
  { id: 'api', label: 'API Flow' },
  { id: 'state', label: 'State Management' },
  { id: 'performance', label: 'Performance Flow' },
  { id: 'responsive', label: 'Responsive Strategy' },
];

export const SystemDesign = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [activeTab, setActiveTab] = useState('components');

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        toggleActions: 'play reverse play reverse'
      }
    });

    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }
    );

    return () => {
      tl.kill();
    };
  }, []);

  const renderDiagram = () => {
    switch (activeTab) {
      case 'components':
        return (
          <div className={`${styles.diagramBox} ${styles.fadeAnim}`}>
            <div className={styles.flowRow}>
              <div className={styles.node}>App Root</div>
              <div className={styles.animatedLine}></div>
              <div className={styles.nodeCol}>
                <div className={styles.node}>Smart Container (Data Fetching)</div>
                <div className={styles.node}>Canvas Layer (WebGL)</div>
              </div>
              <div className={styles.animatedLine}></div>
              <div className={styles.nodeCol}>
                <div className={styles.node}>Dumb Component (UI)</div>
                <div className={styles.node}>Dumb Component (UI)</div>
              </div>
            </div>
            <p className={styles.diagramDesc}>Strict separation of concerns. Smart containers handle Zustand/API logic, passing pure props to memoized UI components to prevent WebGL re-renders.</p>
          </div>
        );
      case 'api':
        return (
          <div className={`${styles.diagramBox} ${styles.fadeAnim}`}>
             <div className={styles.flowRow}>
              <div className={styles.node}>Client Action</div>
              <div className={styles.animatedLine} style={{ '--pulse-color': '#F59E0B' } as React.CSSProperties}></div>
              <div className={styles.nodeCol}>
                <div className={styles.node}>Axios Interceptor</div>
                <div className={styles.node}>JWT Rotation</div>
              </div>
              <div className={styles.animatedLine} style={{ '--pulse-color': '#F59E0B' } as React.CSSProperties}></div>
              <div className={styles.node}>REST/GraphQL Gateway</div>
            </div>
            <p className={styles.diagramDesc}>Centralized HTTP interceptors catch 401s, silently refresh JWTs, and replay failed queues without interrupting the user experience.</p>
          </div>
        );
      case 'state':
        return (
          <div className={`${styles.diagramBox} ${styles.fadeAnim}`}>
             <div className={styles.flowRow}>
              <div className={styles.node}>User Interaction</div>
              <div className={styles.animatedLine} style={{ '--pulse-color': '#10B981' } as React.CSSProperties}></div>
              <div className={styles.node}>Zustand Store (Atomic)</div>
              <div className={styles.animatedLine} style={{ '--pulse-color': '#10B981' } as React.CSSProperties}></div>
              <div className={styles.nodeCol}>
                <div className={styles.node}>Selector (DOM update)</div>
                <div className={styles.node}>Selector (Canvas update)</div>
              </div>
            </div>
            <p className={styles.diagramDesc}>Using Zustand to bypass React Context limitations. Components only subscribe to the specific state slices they need, eliminating cascading renders.</p>
          </div>
        );
      case 'performance':
        return (
          <div className={`${styles.diagramBox} ${styles.fadeAnim}`}>
             <div className={styles.flowRow}>
              <div className={styles.node}>Initial Request</div>
              <div className={styles.animatedLine} style={{ '--pulse-color': '#8B5CF6' } as React.CSSProperties}></div>
              <div className={styles.nodeCol}>
                <div className={styles.node}>Lazy Loaded Routes</div>
                <div className={styles.node}>Draco Compressed GLTF</div>
              </div>
              <div className={styles.animatedLine} style={{ '--pulse-color': '#8B5CF6' } as React.CSSProperties}></div>
              <div className={styles.node}>60 FPS Interactive Map</div>
            </div>
            <p className={styles.diagramDesc}>Heavy WebGL assets are lazily instantiated using React Suspense, while geometry is compressed with Draco algorithms to minimize initial payload.</p>
          </div>
        );
      case 'responsive':
        return (
          <div className={`${styles.diagramBox} ${styles.fadeAnim}`}>
             <div className={styles.flowRow}>
              <div className={styles.node}>Window Resize Event</div>
              <div className={styles.animatedLine} style={{ '--pulse-color': '#EC4899' } as React.CSSProperties}></div>
              <div className={styles.nodeCol}>
                <div className={styles.node}>CSS Grid Auto-Fit</div>
                <div className={styles.node}>Canvas DPR Scaling</div>
              </div>
              <div className={styles.animatedLine} style={{ '--pulse-color': '#EC4899' } as React.CSSProperties}></div>
              <div className={styles.node}>Fluid Layout</div>
            </div>
            <p className={styles.diagramDesc}>Fluid typography (clamp), CSS Grid auto-fit/minmax, and dynamic Device Pixel Ratio (DPR) capping ensure the app looks perfect from 4K monitors to mobile screens.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.content}>
        <h2 className={styles.title} ref={titleRef}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '1rem', verticalAlign: 'middle' }}><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
          System Architecture
        </h2>
        
        <div className={styles.tabsContainer}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tabBtn} ${activeTab === tab.id ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.diagramInteractiveContainer}>
          {renderDiagram()}
        </div>
      </div>
    </section>
  );
};
