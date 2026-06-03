import { useStore } from '../../store/useStore';
import styles from './NavigationHUD.module.css';

export const NavigationHUD = () => {
  const introComplete = useStore(state => state.introComplete);

  const scrollTo = (vh: number) => {
    window.scrollTo({
      top: (vh / 100) * window.innerHeight,
      behavior: 'smooth'
    });
  };

  if (!introComplete) return null;

  return (
    <nav className={styles.hudContainer}>
      <div className={styles.logo} onClick={() => scrollTo(0)} aria-label="Scroll to top" role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && scrollTo(0)}>
        BM.
      </div>
      
      <div className={styles.navLinks}>
        <span className={`${styles.navLink} interactive`} onClick={() => scrollTo(120)}>About</span>
        <span className={`${styles.navLink} interactive`} onClick={() => scrollTo(450)}>Experience</span>
        <span className={`${styles.navLink} interactive`} onClick={() => scrollTo(650)}>Projects</span>
        <span className={`${styles.navLink} interactive`} onClick={() => scrollTo(850)}>Contact</span>
      </div>

      <button className={`${styles.a4mamBtn} interactive`} onClick={() => scrollTo(650)} aria-label="Jump to Projects">
        View Work
      </button>
    </nav>
  );
};
