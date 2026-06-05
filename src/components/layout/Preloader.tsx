import { useEffect, useState } from 'react';
import styles from './Preloader.module.css';

const BOOT_LOGS = [
  "INITIALIZING QUANTUM CORE...",
  "LOADING WEBGL SHADERS...",
  "MOUNTING GEOMETRY BUFFERS...",
  "COMPILING MATERIALS...",
  "ESTABLISHING DATABASE CONNECTION...",
  "VERIFYING COMPONENT TREE...",
  "ALLOCATING VRAM...",
  "BYPASSING SECURITY PROTOCOLS...",
  "SYSTEM READY."
];

export const Preloader = () => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentLog, setCurrentLog] = useState(BOOT_LOGS[0]);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 12 + 2; 
      
      // Update the log text randomly to simulate rapid terminal output
      setCurrentLog(BOOT_LOGS[Math.floor(Math.random() * (BOOT_LOGS.length - 1))]);
      
      if (current >= 100) {
        current = 100;
        setCurrentLog(BOOT_LOGS[BOOT_LOGS.length - 1]); // SYSTEM READY
        clearInterval(interval);
        
        const fadeTimer = setTimeout(() => setFading(true), 800);
        const removeTimer = setTimeout(() => setVisible(false), 1800);
        
        return () => {
          clearTimeout(fadeTimer);
          clearTimeout(removeTimer);
        };
      }
      setProgress(current);
    }, 150);

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className={`${styles.preloader} ${fading ? styles.fadeOut : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo}>BM.</div>
        
        <div className={styles.loadingText}>
          {currentLog}
        </div>
        
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBarBg} />
          <div 
            className={styles.progressBar} 
            style={{ width: `${progress}%` }} 
          >
            <div className={styles.progressHead} />
          </div>
        </div>
        
        <div className={styles.progressData}>
          <span className={styles.progressText}>{Math.floor(progress)}</span>
          <span className={styles.percentSymbol}>%</span>
        </div>
      </div>
    </div>
  );
};
