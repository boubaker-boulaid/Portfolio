import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger, MOTION_OK } from './gsap.js';

let lenis = null;

/**
 * Scrolls to an in-page anchor. Uses Lenis when it is running, otherwise the
 * browser (instant for reduced-motion visitors, see base.css).
 */
export function scrollToHash(hash) {
  const id = decodeURIComponent(hash.replace(/^#/, ''));
  const target = id && document.getElementById(id);
  if (!target) return false;

  const top = id === 'home' ? 0 : target;
  if (lenis) {
    // Lenis already honours the CSS scroll-margin-top / scroll-padding-top
    // (sticky nav offset), exactly like a native anchor jump.
    lenis.scrollTo(top, { duration: 1.15 });
  } else if (top === 0) {
    window.scrollTo({ top: 0 });
  } else {
    target.scrollIntoView();
  }
  return true;
}

/**
 * Fluid page scrolling with Lenis, driven by GSAP's ticker so ScrollTrigger
 * and Lenis read the same frame. Also turns every same-page `#anchor` link
 * into a smooth, offset-aware scroll. Skipped entirely when the visitor
 * prefers reduced motion; anchors then fall back to native jumps.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      lenis = new Lenis({
        lerp: 0.1, // smoothing per frame: responsive, never floaty
        wheelMultiplier: 1,
        smoothWheel: true,
        // Touch keeps the platform's native momentum scrolling.
      });

      const raf = (time) => lenis.raf(time * 1000);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(raf);
        gsap.ticker.lagSmoothing(500, 33);
        lenis.destroy();
        lenis = null;
      };
    });

    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute('href');
      if (!scrollToHash(hash)) return;

      event.preventDefault();
      if (window.location.hash !== hash) window.history.pushState(null, '', hash);

      // The skip link must also move keyboard focus.
      if (hash === '#main') {
        const main = document.getElementById('main');
        main.setAttribute('tabindex', '-1');
        main.focus({ preventScroll: true });
      }
    };

    // Re-measure once web fonts settle, since they change section heights.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
      mm.revert();
    };
  }, []);
}
