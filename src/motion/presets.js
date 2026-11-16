import { gsap } from './gsap.js';

/*
 * Shared motion vocabulary. Elements fade with opacity only (never
 * visibility), so links and form fields stay reachable by keyboard before
 * they have been revealed.
 */

const START = 'top 82%';

/** Fades and lifts `targets` once, when `trigger` scrolls into view. */
export function revealUp(targets, { trigger, start = START, ...vars } = {}) {
  return gsap.from(targets, {
    opacity: 0,
    y: 28,
    duration: 0.9,
    stagger: 0.08,
    ...vars,
    scrollTrigger: { trigger: trigger ?? targets, start, once: true },
  });
}

/**
 * Same as revealUp for elements that already have CSS transitions on
 * transform (hover lifts): the transition is paused while GSAP animates,
 * then every inline style is cleared so the CSS hover works again.
 */
export function revealTiles(targets, { trigger, start = START, ...vars } = {}) {
  const items = gsap.utils.toArray(targets);
  if (!items.length) return null;
  gsap.set(items, { transition: 'none' });
  return gsap.from(items, {
    opacity: 0,
    y: 24,
    scale: 0.95,
    duration: 0.7,
    stagger: 0.035,
    ...vars,
    clearProps: 'transition,transform,opacity',
    scrollTrigger: { trigger: trigger ?? items[0], start, once: true },
  });
}

/** Draws SVG strokes (hand-drawn doodles) as if sketched. Returns a tween. */
export function drawIn(paths, vars = {}) {
  return gsap.fromTo(
    paths,
    {
      strokeDasharray: (_, el) => el.getTotalLength(),
      strokeDashoffset: (_, el) => el.getTotalLength(),
    },
    { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset', ...vars },
  );
}

/**
 * Wipes an element into view from left to right, like a pen stroke. The
 * insets reach past the box because slanted script/marker glyphs overhang it.
 */
export function wipeIn(target, vars = {}) {
  return gsap.fromTo(
    target,
    { clipPath: 'inset(-30% 112% -60% -12%)' },
    { clipPath: 'inset(-30% -12% -60% -12%)', duration: 0.9, ease: 'power2.inOut', clearProps: 'clipPath', ...vars },
  );
}

/** Raises a line of heading text out of an invisible baseline mask. */
export function riseIn(targets, vars = {}) {
  return gsap.fromTo(
    targets,
    { yPercent: 45, opacity: 0, clipPath: 'inset(100% -10% -10% -10%)' },
    {
      yPercent: 0,
      opacity: 1,
      clipPath: 'inset(-10% -10% -10% -10%)',
      duration: 1,
      ease: 'power4.out',
      stagger: 0.12,
      clearProps: 'clipPath',
      ...vars,
    },
  );
}
