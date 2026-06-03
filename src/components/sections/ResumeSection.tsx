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
      <style>
        {`
          @keyframes scanline {
            0% { top: 0; opacity: 0; }
            10% { opacity: 0.5; }
            90% { opacity: 0.5; }
            100% { top: 100%; opacity: 0; }
          }
          .resume-container {
            border: 1px solid rgba(0, 229, 255, 0.15);
            background: linear-gradient(135deg, rgba(2, 6, 23, 0.8) 0%, rgba(2, 6, 23, 0.4) 100%);
            backdrop-filter: blur(20px);
            border-radius: 16px;
            padding: 3rem;
            box-shadow: 0 0 40px rgba(0, 229, 255, 0.05), inset 0 0 20px rgba(255, 255, 255, 0.02);
            position: relative;
            overflow: hidden;
          }
          .resume-container::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.5), transparent);
          }
        `}
      </style>
      
      <div className="resume-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '3rem' }}>
          
          <div style={{ flex: 1, minWidth: '300px' }}>
            <div style={{ display: 'inline-block', padding: '0.4rem 1rem', background: 'rgba(0, 229, 255, 0.1)', border: '1px solid rgba(0, 229, 255, 0.2)', borderRadius: '20px', color: 'var(--accent-cyan)', fontFamily: 'monospace', fontSize: '0.85rem', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>
              <span style={{ display: 'inline-block', width: '6px', height: '6px', background: 'var(--accent-cyan)', borderRadius: '50%', marginRight: '8px', boxShadow: '0 0 8px var(--accent-cyan)' }}></span>
              READY FOR DEPLOYMENT
            </div>
            
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>
              <span style={{ color: '#fff' }}>Resume &</span><br/>
              <span style={{ background: 'linear-gradient(90deg, var(--accent-cyan), #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Capabilities</span>
            </h2>
            
            <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontSize: '1.1rem', marginBottom: '2.5rem', maxWidth: '500px', lineHeight: 1.6 }}>
              A comprehensive overview of my professional journey, highlighting 1+ years of experience engineering scalable interfaces with React, Angular, and TypeScript.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a 
                href="/Binayak_Maharana_Resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="View Resume PDF in new tab"
                className="interactive"
                style={{
                  padding: '1rem 2rem',
                  background: 'var(--accent-cyan)',
                  color: '#020617',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontFamily: 'var(--font-heading)',
                  letterSpacing: '0.05em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 0 20px rgba(0, 229, 255, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 229, 255, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 229, 255, 0.3)';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path></svg>
                VIEW RESUME
              </a>
              <a 
                href="/Binayak_Maharana_Resume.pdf" 
                download
                aria-label="Download Resume PDF"
                className="interactive"
                style={{
                  padding: '1rem 2rem',
                  border: '1px solid rgba(0, 229, 255, 0.3)',
                  background: 'rgba(0, 229, 255, 0.05)',
                  color: 'var(--accent-cyan)',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontFamily: 'var(--font-heading)',
                  letterSpacing: '0.05em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 229, 255, 0.1)';
                  e.currentTarget.style.border = '1px solid rgba(0, 229, 255, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 229, 255, 0.05)';
                  e.currentTarget.style.border = '1px solid rgba(0, 229, 255, 0.3)';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                DOWNLOAD
              </a>
            </div>
          </div>

          <div style={{ flex: '1', minWidth: '320px', position: 'relative' }}>
            {/* Holographic Document UI */}
            <div style={{
              width: '100%',
              height: '320px',
              background: 'linear-gradient(180deg, rgba(0, 229, 255, 0.03) 0%, rgba(2, 6, 23, 0) 100%)',
              border: '1px solid rgba(0, 229, 255, 0.15)',
              borderRadius: '12px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              padding: '1.5rem',
              boxShadow: '0 0 40px rgba(0, 229, 255, 0.05) inset',
              position: 'relative'
            }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,229,255,0.1)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ color: 'var(--accent-cyan)', fontFamily: 'monospace', fontSize: '0.8rem', letterSpacing: '0.1em' }}>DOC_ID: 8092_BM_RESUME</div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(0, 229, 255, 0.3)' }}></div>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(0, 229, 255, 0.6)' }}></div>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-cyan)', boxShadow: '0 0 8px var(--accent-cyan)' }}></div>
                </div>
              </div>
              
              {/* Content Wireframe */}
              <div style={{ display: 'flex', gap: '2rem', flex: 1 }}>
                {/* Left column */}
                <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ width: '40%', height: '16px', background: 'rgba(0, 229, 255, 0.2)', borderRadius: '4px' }}></div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                    <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px' }}></div>
                    <div style={{ width: '90%', height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px' }}></div>
                    <div style={{ width: '75%', height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px' }}></div>
                  </div>
                  
                  <div style={{ width: '35%', height: '16px', background: 'rgba(0, 229, 255, 0.2)', borderRadius: '4px' }}></div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px' }}></div>
                    <div style={{ width: '85%', height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px' }}></div>
                    <div style={{ width: '40%', height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px' }}></div>
                  </div>
                </div>
                
                {/* Right column */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '1px dashed rgba(0,229,255,0.2)', paddingLeft: '1.5rem' }}>
                  <div style={{ width: '80%', height: '12px', background: 'rgba(139, 92, 246, 0.3)', borderRadius: '4px' }}></div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px' }}></div>
                  <div style={{ width: '90%', height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px' }}></div>
                  
                  <div style={{ width: '70%', height: '12px', background: 'rgba(139, 92, 246, 0.3)', borderRadius: '4px', marginTop: '1rem' }}></div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px' }}></div>
                  <div style={{ width: '60%', height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px' }}></div>
                </div>
              </div>
              
              {/* Scanning Line Animation */}
              <div style={{ 
                position: 'absolute', 
                left: 0, 
                width: '100%', 
                height: '2px', 
                background: 'var(--accent-cyan)', 
                boxShadow: '0 0 15px 2px var(--accent-cyan)', 
                animation: 'scanline 3s linear infinite' 
              }}></div>
            </div>
            
            {/* Decorative Corner Accents */}
            <div style={{ position: 'absolute', top: -1, left: -1, width: 20, height: 20, borderTop: '2px solid var(--accent-cyan)', borderLeft: '2px solid var(--accent-cyan)' }}></div>
            <div style={{ position: 'absolute', top: -1, right: -1, width: 20, height: 20, borderTop: '2px solid var(--accent-cyan)', borderRight: '2px solid var(--accent-cyan)' }}></div>
            <div style={{ position: 'absolute', bottom: -1, left: -1, width: 20, height: 20, borderBottom: '2px solid var(--accent-cyan)', borderLeft: '2px solid var(--accent-cyan)' }}></div>
            <div style={{ position: 'absolute', bottom: -1, right: -1, width: 20, height: 20, borderBottom: '2px solid var(--accent-cyan)', borderRight: '2px solid var(--accent-cyan)' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};
