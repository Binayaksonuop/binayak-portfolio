import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useStore } from '../../store/useStore';
import styles from './Hero.module.css';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);
  const techStackRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const introComplete = useStore((state) => state.introComplete);

  useEffect(() => {
    if (!introComplete) return;

    const tl = gsap.timeline();

    // Main Hero Reveal
    tl.fromTo(
      nameRef.current,
      { y: 100, opacity: 0, rotationX: 45 },
      { y: 0, opacity: 1, rotationX: 0, duration: 1.5, ease: 'power4.out' }
    )
    .fromTo(
      [rolesRef.current, techStackRef.current],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' },
      "-=1"
    )
    .fromTo(
      [descRef.current, ctaRef.current],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' },
      "-=0.5"
    );

    return () => {
      tl.kill();
    };
  }, [introComplete]);

  return (
    <div className={styles.heroContainer} ref={containerRef}>
      <div className={styles.content}>
        <h1 className={styles.name} ref={nameRef}>
          Binayak Maharana
        </h1>
        
        <div className={styles.roles} ref={rolesRef}>
          <span>Frontend Developer</span>
        </div>

        <div className={styles.techStack} ref={techStackRef}>
          <span>React.js</span>
          <span>Angular</span>
          <span>System Design</span>
          <span>Performance</span>
        </div>

        <p className={styles.description} ref={descRef}>
          Building scalable web applications using React, Angular and modern frontend technologies.
        </p>

        <div className={styles.ctaGroup} ref={ctaRef}>
          <button className={`${styles.cta} interactive`} aria-label="View Projects" onClick={() => {
            // Scroll to the Project Universe (section 4 roughly)
            window.scrollTo(0, document.body.scrollHeight * 0.8);
          }}>
            View Projects
          </button>
          <a href="/projects/Binayak_Maharana_Resume.pdf" download className={`${styles.ctaSecondary} interactive`} aria-label="Download Resume">
            Download Resume
          </a>
        </div>
      </div>
    </div>
  );
};
