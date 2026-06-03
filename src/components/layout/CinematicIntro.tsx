import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useStore } from '../../store/useStore';
import styles from './CinematicIntro.module.css';

// Custom hook for the hacker text scramble effect
const useScramble = (text: string, trigger: boolean) => {
  const [displayText, setDisplayText] = useState('');
  const chars = '!<>-_\\\\/[]{}—=+*^?#________';
  
  useEffect(() => {
    if (!trigger) return;
    
    let frame = 0;
    let timeoutId: number;
    const duration = 40; // frames
    
    const animate = () => {
      let output = '';
      let complete = 0;
      
      for (let i = 0; i < text.length; i++) {
        if (frame >= (i * (duration / text.length))) {
          output += text[i];
          complete++;
        } else {
          output += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      
      setDisplayText(output);
      
      if (complete === text.length) {
        return;
      }
      
      frame++;
      timeoutId = window.setTimeout(animate, 30);
    };
    
    animate();
    
    return () => clearTimeout(timeoutId);
  }, [text, trigger]);
  
  return displayText;
};

export const CinematicIntro = () => {
  const introComplete = useStore(state => state.introComplete);
  const setIntroComplete = useStore(state => state.setIntroComplete);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalLinesRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarContainerRef = useRef<HTMLDivElement>(null);
  const progressBarFillRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLDivElement>(null);
  const phaseIdentityRef = useRef<HTMLDivElement>(null);
  
  const [scrambleTrigger, setScrambleTrigger] = useState(false);
  const nameText = useScramble("BINAYAK MAHARANA", scrambleTrigger);
  const roleText = useScramble("STAFF FRONTEND ENGINEER", scrambleTrigger);

  const terminalOutput = [
    "> INITIALIZING KERNEL...",
    "> MOUNTING WEBGL PIPELINE...",
    "> COMPILING SHADERS [OK]",
    "> ALLOCATING MEMORY BUFFERS...",
    "> ESTABLISHING REACT FIBER TREE...",
    "> SYSTEM INTEGRITY: 100%"
  ];

  useEffect(() => {
    if (introComplete) return;

    // Lock scroll
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        setIntroComplete(true);
        document.body.style.overflow = 'auto';
        if (containerRef.current) {
          containerRef.current.style.pointerEvents = 'none';
        }
      }
    });

    // Phase 1: Terminal Sequence
    tl.to(progressBarContainerRef.current, { opacity: 1, duration: 0.5 });
    
    terminalLinesRef.current.forEach((line, index) => {
      if (!line) return;
      tl.to(line, {
        opacity: 1,
        duration: 0.1,
      }, `+=${Math.random() * 0.3}`);
      
      // Animate progress bar incrementally
      tl.to(progressBarFillRef.current, {
        width: `${((index + 1) / terminalOutput.length) * 100}%`,
        duration: 0.2,
        onUpdate: function() {
          if (progressTextRef.current) {
            progressTextRef.current.innerText = `${Math.round(this.progress() * ((index + 1) / terminalOutput.length) * 100)}%`;
          }
        }
      }, "<");
    });

    // Pause slightly after terminal finishes
    tl.to({}, { duration: 0.8 });

    // Phase 2: Clear Terminal and Glitch
    tl.to([".terminalLine", progressBarContainerRef.current], {
      opacity: 0,
      duration: 0.1,
      stagger: 0.05,
    });

    // Phase 3: Identity Reveal with Scramble
    tl.call(() => setScrambleTrigger(true));
    tl.to(phaseIdentityRef.current, {
      opacity: 1,
      duration: 0.1,
    });
    
    // Add glitch class momentarily
    tl.call(() => {
      phaseIdentityRef.current?.classList.add(styles.glitch);
    }, undefined, "+=1.5");
    
    tl.call(() => {
      phaseIdentityRef.current?.classList.remove(styles.glitch);
    }, undefined, "+=0.2");

    // Phase 4: Dissolve into 3D Universe
    tl.to(phaseIdentityRef.current, {
      opacity: 0,
      scale: 1.1,
      filter: "blur(10px)",
      duration: 1,
      ease: "power2.in"
    }, "+=1");

    tl.to(containerRef.current, {
      opacity: 0,
      duration: 1.5,
      ease: "power2.inOut"
    }, "-=0.5");

    return () => {
      tl.kill();
      document.body.style.overflow = 'auto';
    };
  }, [introComplete, setIntroComplete, terminalOutput.length]);

  if (introComplete) return null;

  return (
    <div className={styles.introContainer} ref={containerRef}>
      <div className={styles.scanlines}></div>
      
      {/* Terminal Boot Sequence */}
      <div className={styles.terminalContainer}>
        {terminalOutput.map((text, i) => (
          <div 
            key={i} 
            className={`${styles.terminalLine} terminalLine`}
            ref={el => { terminalLinesRef.current[i] = el; }}
          >
            {text}
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className={styles.progressBarContainer} ref={progressBarContainerRef}>
        <div className={styles.progressText} ref={progressTextRef}>0%</div>
        <div className={styles.progressBarFill} ref={progressBarFillRef}></div>
      </div>

      <div className={styles.contentWrapper}>
        {/* Identity Scramble Reveal */}
        <div className={styles.phaseIdentity} ref={phaseIdentityRef}>
          <h1 className={styles.name}>{nameText}</h1>
          <h2 className={styles.role}>{roleText}</h2>
          <div className={styles.techStack}>
            React • Angular • TypeScript • WebGL
          </div>
        </div>
      </div>
    </div>
  );
};
