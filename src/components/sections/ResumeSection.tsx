import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ResumeSection.module.css';

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
    <section className={styles.section} ref={containerRef}>
      <div className={styles.resumeContainer}>
        <div className={styles.resumeFlexContainer}>
          
          <div className={styles.leftColumn}>
            <div className={styles.statusBadge}>
              <span className={styles.statusDot}></span>
              READY FOR DEPLOYMENT
            </div>
            
            <h2 className={styles.heading}>
              <span className={styles.headingWhite}>Resume &</span><br/>
              <span className={styles.headingGradient}>Capabilities</span>
            </h2>
            
            <p className={styles.description}>
              A comprehensive overview of my professional journey, highlighting 1+ years of experience engineering scalable interfaces with React, Angular, and TypeScript.
            </p>
            
            <div className={styles.resumeButtons}>
              <a 
                href="/Binayak_Maharana_Resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="View Resume PDF in new tab"
                className={`interactive ${styles.btnPrimary}`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path></svg>
                VIEW RESUME
              </a>
              <a 
                href="/Binayak_Maharana_Resume.pdf" 
                download
                aria-label="Download Resume PDF"
                className={`interactive ${styles.btnSecondary}`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                DOWNLOAD
              </a>
            </div>
          </div>

          <div className={styles.rightColumn}>
            {/* Holographic Document UI */}
            <div className={styles.hologramUi}>
              {/* Header */}
              <div className={styles.hologramHeader}>
                <div className={styles.docId}>DOC_ID: 8092_BM_RESUME</div>
                <div className={styles.hologramDots}>
                  <div className={styles.hologramDot1}></div>
                  <div className={styles.hologramDot2}></div>
                  <div className={styles.hologramDot3}></div>
                </div>
              </div>
              
              {/* Content Wireframe */}
              <div className={styles.wireframe}>
                {/* Left column */}
                <div className={styles.wireframeLeft}>
                  <div className={styles.wireBlockPrimary} style={{ width: '40%' }}></div>
                  
                  <div className={styles.wireLines} style={{ marginBottom: '1rem' }}>
                    <div className={styles.wireLine} style={{ width: '100%' }}></div>
                    <div className={styles.wireLine} style={{ width: '90%' }}></div>
                    <div className={styles.wireLine} style={{ width: '75%' }}></div>
                  </div>
                  
                  <div className={styles.wireBlockPrimary} style={{ width: '35%' }}></div>
                  
                  <div className={styles.wireLines}>
                    <div className={styles.wireLine} style={{ width: '100%' }}></div>
                    <div className={styles.wireLine} style={{ width: '85%' }}></div>
                    <div className={styles.wireLine} style={{ width: '40%' }}></div>
                  </div>
                </div>
                
                {/* Right column */}
                <div className={styles.wireframeRight}>
                  <div className={styles.wireBlockSecondary} style={{ width: '80%' }}></div>
                  <div className={styles.wireLine} style={{ width: '100%' }}></div>
                  <div className={styles.wireLine} style={{ width: '90%' }}></div>
                  
                  <div className={styles.wireBlockSecondary} style={{ width: '70%', marginTop: '1rem' }}></div>
                  <div className={styles.wireLine} style={{ width: '100%' }}></div>
                  <div className={styles.wireLine} style={{ width: '60%' }}></div>
                </div>
              </div>
              
              {/* Scanning Line Animation */}
              <div className={styles.scanline}></div>
            </div>
            
            {/* Decorative Corner Accents */}
            <div className={`${styles.cornerAccent} ${styles.cornerTopLeft}`}></div>
            <div className={`${styles.cornerAccent} ${styles.cornerTopRight}`}></div>
            <div className={`${styles.cornerAccent} ${styles.cornerBottomLeft}`}></div>
            <div className={`${styles.cornerAccent} ${styles.cornerBottomRight}`}></div>
          </div>
        </div>
      </div>
    </section>
  );
};
