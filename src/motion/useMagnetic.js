import { useEffect } from 'react';
import { gsap, MOTION_OK } from './gsap.js';

const SELECTOR = '.btn, .hero__cv, .socials__link';
const STRENGTH = 0.28; // share of the cursor offset the element follows
const MAX = 8; // px — a lean, not a chase

/**
 * "Magnetic" calls to action: buttons and icon links lean slightly toward
 * the cursor and glide back when it leaves. Only for precise pointers
 * (mouse, trackpad) and when motion is allowed.
 *
 * It moves the elements through the CSS custom properties --mx / --my,
 * read by the `translate` property (see ui.css), so it never touches
 * `transform` and can't clash with hover lifts or reveal animations.
 * Listeners are delegated, so buttons added later work too.
 */
export function useMagnetic() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(`${MOTION_OK} and (hover: hover) and (pointer: fine)`, () => {
      let current = null;

      const release = (el) => gsap.to(el, { '--mx': 0, '--my': 0, duration: 0.6, ease: 'power3.out' });

      const onMove = (event) => {
        const el = event.target.closest?.(SELECTOR);
        if (current && current !== el) release(current);
        current = el;
        if (!el) return;
        const box = el.getBoundingClientRect();
        const dx = (event.clientX - (box.left + box.width / 2)) * STRENGTH;
        const dy = (event.clientY - (box.top + box.height / 2)) * STRENGTH;
        gsap.to(el, {
          '--mx': gsap.utils.clamp(-MAX, MAX, dx),
          '--my': gsap.utils.clamp(-MAX, MAX, dy),
          duration: 0.4,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      };

      const onLeave = () => {
        if (current) release(current);
        current = null;
      };

      document.addEventListener('pointermove', onMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', onLeave);
      return () => {
        document.removeEventListener('pointermove', onMove);
        document.documentElement.removeEventListener('pointerleave', onLeave);
        gsap.set(SELECTOR, { clearProps: '--mx,--my' });
      };
    });

    return () => mm.revert();
  }, []);
}
