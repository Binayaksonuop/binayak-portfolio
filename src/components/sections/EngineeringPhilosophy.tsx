import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './EngineeringHighlights.module.css'; // Reusing styles for consistency

gsap.registerPlugin(ScrollTrigger);

export const EngineeringPhilosophy = () => {
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
    <section className={styles.section} ref={containerRef} style={{ pointerEvents: 'auto', marginTop: '10vh' }}>
      <div className={styles.content}>
        <h2 className={styles.title} ref={titleRef} style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          How I Build: Engineering Philosophy
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', opacity: 0.8, marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto', textAlign: 'center' }}>
          A systematic, repeatable process for delivering production software.
        </p>
        
        <div className={styles.grid} ref={gridRef}>
          <div className={styles.card}>
            <h3>1. Research</h3>
            <p>Auditing requirements, constraints, and architecture patterns before writing code.</p>
          </div>
          <div className={styles.card}>
            <h3>2. Wireframe & Design</h3>
            <p>Rapid prototyping in Figma to validate UX and component boundaries.</p>
          </div>
          <div className={styles.card}>
            <h3>3. Architecture</h3>
            <p>Defining state models, API contracts, and routing structures.</p>
          </div>
          <div className={styles.card}>
            <h3>4. Development</h3>
            <p>Building polymorphic components with strict TypeScript types.</p>
          </div>
          <div className={styles.card}>
            <h3>5. Testing</h3>
            <p>Ensuring cross-browser compatibility and strict accessibility (a11y) standards.</p>
          </div>
          <div className={styles.card}>
            <h3>6. Optimization</h3>
            <p>Lazy loading, aggressive memoization, and bundle size reduction.</p>
          </div>
          <div className={styles.card}>
            <h3>7. Deployment</h3>
            <p>CI/CD pipelines with automated Lighthouse scoring and previews.</p>
          </div>
          <div className={styles.card}>
            <h3>8. Iteration</h3>
            <p>Monitoring real-world performance metrics to guide future refactors.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
