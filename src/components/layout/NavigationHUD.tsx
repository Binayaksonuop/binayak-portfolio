import { useStore } from '../../store/useStore';
import styles from './NavigationHUD.module.css';

export const NavigationHUD = () => {
  const introComplete = useStore(state => state.introComplete);

  const scrollToId = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!introComplete) return null;

  return (
    <nav className={styles.hudContainer}>
      <div className={styles.logo} onClick={() => scrollToId('top')} aria-label="Scroll to top" role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && scrollToId('top')}>
        BM.
      </div>
      
      <div className={styles.navLinks}>
        <span className={`${styles.navLink} interactive`} onClick={() => scrollToId('about')}>About</span>
        <span className={`${styles.navLink} interactive`} onClick={() => scrollToId('experience')}>Experience</span>
        <span className={`${styles.navLink} interactive`} onClick={() => scrollToId('projects')}>Projects</span>
        <span className={`${styles.navLink} interactive`} onClick={() => scrollToId('contact')}>Contact</span>
      </div>

      <button className={`${styles.a4mamBtn} interactive`} onClick={() => scrollToId('projects')} aria-label="Jump to Projects">
        View Work
      </button>
    </nav>
  );
};
