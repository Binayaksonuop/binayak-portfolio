import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ProjectShowcase.module.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'A4MAM — Mission Against Malnutrition (NGO Website)',
    techStack: ['Angular', 'TypeScript', 'THREE.js', 'GSAP', 'Bootstrap 5', 'Figma'],
    points: [
      'Designed complete UI in Figma — dark emerald design system, component library, and all section wireframes',
      'Built 16-section Angular SPA with THREE.js WebGL molecular spiral in hero and GSAP ScrollTrigger animations throughout',
      'Developed glassmorphism design system, interactive SVG 1000-Days chart, and clinical Before/After recovery case study',
      'Fully responsive from 320px to 4K — THREE.js disabled on mobile for performance, CSS clamp() for fluid typography'
    ]
  },
  {
    title: 'Office Tracker & Task Management System',
    techStack: ['Angular', 'TypeScript', 'Angular Material', 'RxJS', 'Figma'],
    points: [
      'Designed complete dashboard UI/UX in Figma — wireframes, user flows, and component specs before development',
      'Built enterprise-grade system with RBAC, multi-level project hierarchy, real-time productivity metrics, and lazy loading'
    ]
  },
  {
    title: 'LMS Dashboard – Learning Management System',
    techStack: ['Angular', 'TypeScript', 'HTML', 'CSS', 'Figma'],
    points: [
      'Designed admin interface in Figma with full user journey mapping, then built dynamic course, chapter, and video management modules',
      'Leveraged Angular data binding, reusable modules, and component-driven architecture for maintainability'
    ]
  },
  {
    title: 'HRMS Web Application',
    techStack: ['React.js', 'JavaScript', 'Tailwind CSS', 'Figma'],
    points: [
      'Self-initiated project — designed end-to-end in Figma, then developed with employee, leave, attendance modules and analytics dashboard'
    ]
  },
  {
    title: 'School Website',
    techStack: ['React.js', 'Tailwind CSS', 'GSAP', 'Figma'],
    points: [
      'Designed all pages and mobile breakpoints in Figma, then built complete institutional website with GSAP animations and full responsiveness'
    ]
  }
];

export const ProjectShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card) => {
        if (card) {
          gsap.fromTo(card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section className={styles.container} ref={containerRef} id="project-showcase">
      <div className={styles.header}>
        <h2 className={styles.title}>Professional Work</h2>
        <p className={styles.subtitle}>A detailed breakdown of my key projects and technical implementations.</p>
      </div>

      <div className={styles.timeline}>
        {projects.map((project, index) => (
          <div 
            key={index} 
            className={styles.card}
            ref={el => { cardsRef.current[index] = el; }}
            onMouseMove={handleMouseMove}
          >
            <div className={styles.cardGlow} />
            <div className={styles.cardContent}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
          
              <div className={styles.techStack}>
                {project.techStack.map((tech, i) => (
                  <span key={i} className={styles.techBadge}>{tech}</span>
                ))}
              </div>

              <ul className={styles.bulletList}>
                {project.points.map((point, i) => (
                  <li key={i} className={styles.bulletPoint}>
                    <span className={styles.bulletIcon}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(0, 229, 255, 0.2)" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 22 12 12 22 2 12"></polygon>
                      </svg>
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
