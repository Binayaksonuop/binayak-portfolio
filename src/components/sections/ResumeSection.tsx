import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './SystemDesign.module.css';

gsap.registerPlugin(ScrollTrigger);

export const ResumeSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        toggleActions: 'play reverse play reverse'
      }
    });

    tl.fromTo(containerRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className={styles.section} ref={containerRef} style={{ marginTop: '5vh' }}>
      <div className={styles.content} style={{ border: '1px solid rgba(0, 229, 255, 0.3)', background: 'rgba(2, 6, 23, 0.8)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: '#fff', fontSize: '2.5rem', marginBottom: '1rem' }}>
              Resume & Capabilities
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontFamily: 'monospace', fontSize: '1rem', marginBottom: '2rem', maxWidth: '500px' }}>
              1+ Years Professional Experience<br/>
              React.js | Angular | TypeScript | Figma
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a 
                href="/Binayak_Maharana_Resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="View Resume PDF in new tab"
                style={{
                  padding: '0.8rem 1.5rem',
                  background: 'var(--accent-cyan)',
                  color: '#000',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path></svg>
                View Resume
              </a>
              <a 
                href="/Binayak_Maharana_Resume.pdf" 
                download
                aria-label="Download Resume PDF"
                style={{
                  padding: '0.8rem 1.5rem',
                  border: '1px solid var(--accent-cyan)',
                  color: 'var(--accent-cyan)',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 229, 255, 0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Download PDF
              </a>
            </div>
          </div>

          <div style={{ flex: '1', minWidth: '300px', padding: '1rem', background: '#0D1117', borderRadius: '8px', border: '1px solid #30363D' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', border: '1px dashed #30363D', borderRadius: '4px', color: '#8B949E', fontFamily: 'monospace' }}>
               [ Resume PDF Preview Rendering ]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
