import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './SystemDesign.module.css';

gsap.registerPlugin(ScrollTrigger);

export const PerformanceEngineering = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

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

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.content}>
        <h2 className={styles.title} ref={titleRef}>
          Performance Engineering
        </h2>
        <div className={styles.statsContainer}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', color: '#00E5FF', fontFamily: 'monospace', textShadow: '0 0 10px rgba(0,229,255,0.5)' }}>100</div>
            <div style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Lighthouse Performance</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', color: '#00E5FF', fontFamily: 'monospace', textShadow: '0 0 10px rgba(0,229,255,0.5)' }}>60</div>
            <div style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Target FPS (WebGL)</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', color: '#00E5FF', fontFamily: 'monospace', textShadow: '0 0 10px rgba(0,229,255,0.5)' }}>&lt;1s</div>
            <div style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Time to Interactive</div>
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.detailCard}>
            <h3>Code Splitting & Lazy Loading</h3>
            <p>Route-based code splitting using React.lazy and Angular feature modules. Deferred loading of heavy 3D assets until critical HTML/CSS paints are complete.</p>
          </div>
          <div className={styles.detailCard}>
            <h3>Bundle Optimization</h3>
            <p>Aggressive tree-shaking and vendor chunking via Vite/Webpack. Compression of 3D models using Draco to reduce GLTF file sizes by up to 80%.</p>
          </div>
          <div className={styles.detailCard}>
            <h3>WebGL Optimization</h3>
            <p>Utilizing InstancedMesh for rendering thousands of identical geometries with a single draw call. Shader pre-compilation to prevent mid-scroll stuttering.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
