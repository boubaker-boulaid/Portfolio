import { gsap } from './gsap.js';

/*
 * Shared motion vocabulary.
 *
 * Rules every preset follows:
 * - End states are explicit (opacity 1, x/y 0, scale 1), never read from the
 *   page. GSAP re-runs a section's setup when a media query changes; if it
 *   read the "current" position while a CSS transition was mid-way, an
 *   element could stay stuck a few pixels off (this happened to the hero
 *   button).
 * - CSS transitions are paused while GSAP animates (`transition: none`), and
 *   every inline style is cleared at the end, so hover effects and the CSS
 *   rotations of the doodles work exactly as before.
 * - Only opacity and position animate, never `visibility`, so links and form
 *   fields stay reachable by keyboard before they have been revealed.
 */

const START = 'top 82%';
const CLEAR = 'opacity,transform,transition';

/** Fade + lift `targets` in. Use inside a timeline, or pass `scrollTrigger`. */
export function enter(targets, from = {}, vars = {}) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: 24, transition: 'none', ...from },
    { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.85, transition: 'none', clearProps: CLEAR, ...vars },
  );
}

/** enter() once, when `trigger` (default: the first target) scrolls into view. */
export function revealUp(targets, { trigger, start = START, from, ...vars } = {}) {
  const items = gsap.utils.toArray(targets);
  if (!items.length) return null;
  return enter(items, { y: 28, ...from }, {
    stagger: 0.08,
    ...vars,
    scrollTrigger: { trigger: trigger ?? items[0], start, once: true },
  });
}

/** Grid items (skill tiles, project cards): a slightly smaller, quicker lift. */
export function revealTiles(targets, { trigger, start = START, from, ...vars } = {}) {
  return revealUp(targets, {
    trigger,
    start,
    from: { y: 24, scale: 0.95, ...from },
    duration: 0.7,
    stagger: 0.035,
    ...vars,
  });
}

/** Draws SVG strokes (hand-drawn doodles) as if sketched. */
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
      clearProps: 'clipPath,transform,opacity',
      ...vars,
    },
  );
}

/**
 * Section intro block (pill label, heading, text, button): the label fades
 * in, the heading rises out of its mask, the rest follows.
 */
export function introReveal(intro, { start = 'top 80%' } = {}) {
  const root = gsap.utils.toArray(intro)[0];
  if (!root) return null;
  const [label, title, ...rest] = root.children;
  const tl = gsap.timeline({ scrollTrigger: { trigger: root, start, once: true } });
  if (label) tl.add(enter(label, { y: 12 }, { duration: 0.6 }));
  if (title) tl.add(riseIn(title), '-=0.35');
  if (rest.length) tl.add(enter(rest, { y: 18 }, { stagger: 0.08 }), '-=0.6');
  return tl;
}

/**
 * Counts a number up from 0 ("6+", "47"), keeping any suffix. Writes into
 * the element's first text node, so React's own node is reused, and returns
 * a function that restores the original text on cleanup.
 */
export function countUp(el, vars = {}) {
  const node = el.firstChild;
  const original = node?.nodeValue ?? '';
  const match = original.match(/^(\d+)(.*)$/s);
  if (!node || node.nodeType !== Node.TEXT_NODE || !match) return () => {};
  const [, digits, suffix] = match;
  const counter = { value: 0 };
  node.nodeValue = `0${suffix}`;
  gsap.to(counter, {
    value: Number(digits),
    duration: 1.4,
    ease: 'power2.out',
    ...vars,
    onUpdate: () => {
      node.nodeValue = `${Math.round(counter.value)}${suffix}`;
    },
  });
  return () => {
    node.nodeValue = original;
  };
}

/** A slow, endless drift for small decorative doodles. */
export function idle(targets, vars = {}) {
  return gsap.to(targets, { y: -5, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1, ...vars });
}
