import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './EngineeringHighlights.module.css';

gsap.registerPlugin(ScrollTrigger);

export const EngineeringHighlights = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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
    )
    .fromTo(gridRef.current?.children ? Array.from(gridRef.current.children) : [],
      { y: 30, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
      "-=0.4"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.content}>
        <h2 className={styles.title} ref={titleRef}>
          Engineering Capabilities
        </h2>
        
        <div className={styles.grid} ref={gridRef}>
          <div className={styles.card}>
            <h3>State Management</h3>
            <p>Predictable data flow via RxJS & Zustand</p>
          </div>
          
          <div className={styles.card}>
            <h3>Component Architecture</h3>
            <p>Polymorphic & lazy-loaded modules</p>
          </div>
          
          <div className={styles.card}>
            <h3>WebGL Pipelines</h3>
            <p>60fps optimized custom rendering</p>
          </div>
          
          <div className={styles.card}>
            <h3>Type Safety</h3>
            <p>Strict TypeScript enterprise patterns</p>
          </div>

          <div className={styles.card}>
            <h3>Security & Auth</h3>
            <p>RBAC & secure JWT integrations</p>
          </div>
          
          <div className={styles.card}>
            <h3>Performance Tuning</h3>
            <p>Draco compression & lazy hydration</p>
          </div>

          <div className={styles.card}>
            <h3>System Design</h3>
            <p>Scalable frontend micro-architectures</p>
          </div>

          <div className={styles.card}>
            <h3>CI/CD & Git</h3>
            <p>Automated deployments & code review</p>
          </div>
        </div>
      </div>
    </section>
  );
};
