import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textsRef = useRef<(HTMLDivElement | null)[]>([]);

  const milestones = [
    { title: "Foundation in Engineering", subtitle: "B.Tech Mechanical Eng. | Systems Thinking & Analytical Problem Solving" },
    { title: "Infrastructure & Systems Operations", subtitle: "Unigold Finance Ltd. | Managed IT infrastructure & digital systems" },
    { title: "Frontend Architecture Specialization", subtitle: "MERN Stack Certification | Deep dive into component-driven UI" },
    { title: "Production Software Development", subtitle: "Eduvate Skills & A4Conserv | Architecting scalable React & Angular apps" },
    { title: "Engineering Excellence", subtitle: "Delivering performant, accessible, and enterprise-grade web solutions" }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      textsRef.current.forEach((text) => {
        if (!text) return;
        
        ScrollTrigger.create({
          trigger: text,
          start: "top 85%",
          end: "bottom 15%",
          toggleClass: styles.active,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="about" className={styles.aboutContainer} ref={containerRef}>
      <div className={styles.timelineLine}></div>
      {milestones.map((milestone, index) => (
        <div 
          key={index} 
          className={styles.journeyText}
          ref={(el) => { if (el) textsRef.current[index] = el; }}
        >
          <div>{milestone.title}</div>
          <div style={{ 
            fontSize: 'clamp(1rem, 1.5vw, 1.5rem)', 
            fontFamily: 'var(--font-body)',
            marginTop: '1rem',
            opacity: 0.8
          }}>
            {milestone.subtitle}
          </div>
        </div>
      ))}
    </div>
  );
};
