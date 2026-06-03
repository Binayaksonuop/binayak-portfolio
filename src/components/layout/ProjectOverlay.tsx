import { useStore } from '../../store/useStore';
import styles from './ProjectOverlay.module.css';

export const ProjectOverlay = () => {
  const activeProject = useStore((state) => state.activeProject);
  const setActiveProject = useStore((state) => state.setActiveProject);

  if (!activeProject) return null;

  return (
    <div className={styles.overlayContainer}>
      <div className={styles.backdrop} onClick={() => setActiveProject(null)}></div>
      
      <div className={styles.modal}>
        <button 
          className={`${styles.closeBtn} interactive`} 
          onClick={() => setActiveProject(null)}
          aria-label="Close Case Study"
        >
          ✕
        </button>
        
        <h2 className={styles.title}>{activeProject.name}</h2>
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          {activeProject.demoUrl && activeProject.demoUrl !== '#' && (
            <a href={activeProject.demoUrl} target="_blank" rel="noopener noreferrer" style={{ padding: '0.8rem 1.5rem', background: 'var(--accent-cyan)', color: '#000', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'transform 0.2s' }} aria-label={`Live Demo for ${activeProject.name}`} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              Live Demo
            </a>
          )}
          {activeProject.githubUrl && activeProject.githubUrl !== '#' && (
            <a href={activeProject.githubUrl} target="_blank" rel="noopener noreferrer" style={{ padding: '0.8rem 1.5rem', border: '1px solid var(--accent-cyan)', color: 'var(--accent-cyan)', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'background 0.2s' }} aria-label={`GitHub Repository for ${activeProject.name}`} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 229, 255, 0.1)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              GitHub
            </a>
          )}
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.section} style={{ gridColumn: '1 / -1' }}>
             <img src={activeProject.heroImage} alt={`${activeProject.name} Hero`} style={{ width: '100%', height: 'auto', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', objectFit: 'cover', maxHeight: '400px' }} />
          </div>

          <div className={styles.section}>
            <h4>Problem Overview</h4>
            <p>{activeProject.problem}</p>
          </div>
          
          <div className={styles.section}>
            <h4>Research & Design</h4>
            <p><strong>Research:</strong> {activeProject.research}</p>
            <p><strong>Design:</strong> {activeProject.design}</p>
          </div>

          {/* New Staff Engineer: Engineering Decisions Block */}
          <div style={{ gridColumn: '1 / -1', background: 'rgba(2, 6, 23, 0.8)', border: '1px solid rgba(0, 229, 255, 0.3)', borderRadius: '8px', padding: '2rem', marginTop: '1rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--accent-cyan)' }}></div>
            <h3 style={{ color: 'var(--accent-cyan)', fontFamily: 'monospace', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
              Engineering Decisions
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              <div>
                <h5 style={{ color: '#8B949E', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Framework Choice</h5>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.5' }}>{activeProject.frameworkChoice}</p>
              </div>
              
              <div>
                <h5 style={{ color: '#8B949E', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Architecture Selected</h5>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.5' }}>{activeProject.architectureSelected}</p>
              </div>

              <div>
                <h5 style={{ color: '#8B949E', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Performance Tradeoffs</h5>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.5' }}>{activeProject.performanceTradeoffs}</p>
              </div>

              <div>
                <h5 style={{ color: '#8B949E', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Challenges Faced</h5>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.5' }}>{activeProject.challengesFaced}</p>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <h5 style={{ color: '#8B949E', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Solutions Implemented</h5>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.5', color: '#E6EDF3' }}>{activeProject.solutionsImplemented}</p>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h4>Engineering Details</h4>
            <p><strong>Reusable Components:</strong> {activeProject.reusableComponents}</p>
            <p><strong>API Integrations:</strong> {activeProject.apiIntegrations}</p>
          </div>

          <div className={styles.section}>
            <h4>Result & Lessons Learned</h4>
            <p><strong>Result:</strong> {activeProject.result}</p>
            <p><strong>Lessons Learned:</strong> {activeProject.lessonsLearned}</p>
          </div>
        </div>

        <div className={styles.tagsContainer}>
          <div className={styles.tagGroup}>
            <h4>Tech Stack</h4>
            <div className={styles.tags}>
              {activeProject.techStack.map(tech => (
                <span key={tech} className={styles.tag}>{tech}</span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#fff', fontFamily: 'var(--font-heading)' }}>Project Gallery</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {activeProject.featureImages.map((img, i) => (
              <img key={i} src={img} alt={`Feature ${i+1}`} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }} />
            ))}
            {activeProject.mobileImages.map((img, i) => (
              <img key={`mob-${i}`} src={img} alt={`Mobile ${i+1}`} style={{ width: '100%', height: '150px', objectFit: 'contain', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', background: '#000' }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
