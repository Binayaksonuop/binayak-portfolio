import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Center cursor on load to avoid weird initial jump
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.3, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.3, ease: 'power3' });

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const addMagneticEffect = () => {
      const interactiveElements = document.querySelectorAll('a, button, .interactive');
      
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          cursor.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
          cursor.classList.remove('active');
        });
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    
    // Initial binding
    addMagneticEffect();

    // Re-bind when DOM changes (basic implementation for now)
    const observer = new MutationObserver(() => {
      addMagneticEffect();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
};
