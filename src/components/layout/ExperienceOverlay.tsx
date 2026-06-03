import { useStore } from '../../store/useStore';
import styles from './ExperienceOverlay.module.css';

export const ExperienceOverlay = () => {
  const activeExperience = useStore((state) => state.activeExperience);
  const setActiveExperience = useStore((state) => state.setActiveExperience);

  if (!activeExperience) return null;

  return (
    <div className={styles.overlayContainer}>
      <div className={styles.backdrop} onClick={() => setActiveExperience(null)}></div>
      
      <div className={styles.modal} style={{ boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px ${activeExperience.color}20` }}>
        <button 
          className={`${styles.closeBtn} interactive`} 
          onClick={() => setActiveExperience(null)}
          aria-label="Close Details"
        >
          ✕
        </button>
        
        <h2 className={styles.title}>{activeExperience.title}</h2>
        <h3 className={styles.company} style={{ color: activeExperience.color }}>{activeExperience.company}</h3>
        <p className={styles.date}>{activeExperience.date}</p>
        
        <div className={styles.bulletsContainer}>
          {activeExperience.bullets.map((bullet, index) => (
            <div key={index} className={styles.bullet}>
              <span className={styles.bulletIcon} style={{ color: activeExperience.color }}>✦</span>
              <span>{bullet}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
