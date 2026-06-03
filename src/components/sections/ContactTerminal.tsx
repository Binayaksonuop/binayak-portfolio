import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from './ContactTerminal.module.css';

gsap.registerPlugin(ScrollTrigger);

const Typewriter = ({ text, onComplete, start }: { text: string, onComplete?: () => void, start: boolean }) => {
  const [displayed, setDisplayed] = useState('');
  
  useEffect(() => {
    if (!start) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        if (onComplete) setTimeout(onComplete, 500); // slight pause
      }
    }, 50); // typing speed
    
    return () => clearInterval(interval);
  }, [text, start, onComplete]);
  
  return <span>{displayed}</span>;
};

export const ContactTerminal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top center",
      onEnter: () => setStarted(true),
      once: true
    });
  }, []);

  return (
    <div className={styles.terminalContainer} ref={containerRef}>
      <div className={styles.terminal}>
        <div className={styles.header}>
          <div className={styles.dot} style={{ background: '#FF5F56' }}></div>
          <div className={styles.dot} style={{ background: '#FFBD2E' }}></div>
          <div className={styles.dot} style={{ background: '#27C93F' }}></div>
        </div>
        
        <div className={styles.inputLine}>
          <span style={{ color: '#8B5CF6' }}>visitor@universe</span>:~$ 
          {started && (
            <Typewriter 
              text="connect binayak" 
              start={started} 
              onComplete={() => setStep(1)} 
            />
          )}
          {step === 0 && started && <div className={styles.cursor}></div>}
        </div>

        {step >= 1 && <div className={`${styles.line} ${styles.visible}`}>[SYSTEM] System scanning profile...</div>}
        {step >= 1 && (
          <div style={{ display: 'none' }}>
            {setTimeout(() => { if(step === 1) setStep(2) }, 1000)}
          </div>
        )}

        {step >= 2 && <div className={`${styles.line} ${styles.visible}`}>[SYSTEM] Experience detected.</div>}
        {step >= 2 && (
          <div style={{ display: 'none' }}>
            {setTimeout(() => { if(step === 2) setStep(3) }, 800)}
          </div>
        )}

        {step >= 3 && <div className={`${styles.line} ${styles.visible}`}>[SYSTEM] Projects detected.</div>}
        {step >= 3 && (
          <div style={{ display: 'none' }}>
            {setTimeout(() => { if(step === 3) setStep(4) }, 800)}
          </div>
        )}

        {step >= 4 && <div className={`${styles.line} ${styles.visible}`}>[SYSTEM] Skills synchronized.</div>}
        {step >= 4 && (
          <div style={{ display: 'none' }}>
            {setTimeout(() => { if(step === 4) setStep(5) }, 800)}
          </div>
        )}

        {step >= 5 && <div className={`${styles.line} ${styles.visible}`} style={{ color: '#27C93F' }}>[SYSTEM] Connection established.</div>}
        {step >= 5 && (
          <div style={{ display: 'none' }}>
            {setTimeout(() => { if(step === 5) setStep(6) }, 1000)}
          </div>
        )}

        <div className={`${styles.links} ${step >= 6 ? styles.visible : ''}`}>
          <a href="mailto:binayakmaharana2000@gmail.com" className={`interactive ${styles.link}`} aria-label="Send Email">Email</a>
          <a href="tel:+917684944450" className={`interactive ${styles.link}`} aria-label="Call Phone">Phone</a>
          <a href="https://linkedin.com/in/binayak-maharana" target="_blank" rel="noopener noreferrer" className={`interactive ${styles.link}`} aria-label="LinkedIn Profile">LinkedIn</a>
          <a href="https://github.com/binayakmaharana" target="_blank" rel="noopener noreferrer" className={`interactive ${styles.link}`} aria-label="GitHub Profile">GitHub</a>
          <a href="/projects/Binayak_Maharana_Resume.pdf" download className={`interactive ${styles.link}`} aria-label="Download Resume">Resume Download</a>
        </div>
        <div className={`${styles.terminalFooter} ${step >= 6 ? styles.visible : ''}`}>
          <p>&gt; SYSTEM.HALTED // DESIGNED_BY: BINAYAK_MAHARANA</p>
          <p className={styles.footerTech}>&gt; TECH_STACK: [REACT, ANGULAR, THREE.JS, GSAP]</p>
        </div>
      </div>
    </div>
  );
};
