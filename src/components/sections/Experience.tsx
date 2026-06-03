

export const Experience = () => {
  // Empty space to let the Time Tunnel 3D component shine, 
  // we just need enough height to scroll through it
  return (
    <section id="experience" style={{ height: '200vh', pointerEvents: 'none', overflow: 'hidden' }}>
      {/* Intentionally left blank to allow 3D Time Tunnel cards to be clearly visible without overlapping HTML text */}
    </section>
  );
};

export const Projects = () => {
  // Empty space for the Project Universe
  return (
    <section id="projects" style={{ height: '200vh', pointerEvents: 'none', overflow: 'hidden' }}>
      <div style={{ position: 'sticky', top: '10%', textAlign: 'center', opacity: 0.8, color: 'white' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', textTransform: 'uppercase', textShadow: '0 0 20px rgba(255,255,255,0.5)' }}>
          Project Universe
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', marginTop: '1rem' }}>
          Select a world to enter.
        </p>
      </div>
    </section>
  );
};
