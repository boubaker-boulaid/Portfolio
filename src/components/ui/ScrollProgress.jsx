import { gsap } from '../../motion/gsap.js';
import { useMotion } from '../../motion/useMotion.js';
import './ui.css';

/** Thin lime line along the top edge that fills as the page is read. */
export default function ScrollProgress() {
  const ref = useMotion((_, bar) => {
    gsap.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: document.documentElement, start: 0, end: 'max', scrub: 0.3 },
      },
    );
  });

  return <div ref={ref} className="scroll-progress" aria-hidden="true" />;
}
