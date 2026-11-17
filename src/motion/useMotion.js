import { useLayoutEffect, useRef } from 'react';
import { gsap, MOTION_OK, DESKTOP } from './gsap.js';

/**
 * Runs `setup(conditions, root)` inside a GSAP matchMedia context scoped to
 * the returned ref, so selector strings only match inside that element.
 *
 * - Nothing runs for visitors who prefer reduced motion: content simply
 *   stays in its final, readable state.
 * - `conditions.desktop` lets a section keep heavier effects (parallax) to
 *   wide screens.
 * - Every tween, ScrollTrigger and SplitText created during setup is
 *   reverted on unmount, when `deps` change, or when the media query flips.
 *
 * It runs in a layout effect so "from" states apply before the first paint
 * (no flash of content that then jumps).
 */
export function useMotion(setup, deps = []) {
  const scope = useRef(null);

  useLayoutEffect(() => {
    const root = scope.current;
    if (!root) return undefined;
    const mm = gsap.matchMedia(root);
    mm.add({ motion: MOTION_OK, desktop: DESKTOP }, (context) => {
      if (!context.conditions.motion) return undefined;
      return setup(context.conditions, root);
    });
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scope;
}
