import { useCallback, useEffect, useRef, useState } from 'react';

// How long a click on a nav link "owns" the active state while the page
// smooth-scrolls (Lenis, ~1.15s) past other sections on its way to the target.
const CLICK_LOCK_MS = 1400;
// The reading line, as a fraction of the viewport height. Just above the middle
// so the short closing sections still get a fair share of the scroll range.
const READING_LINE = 0.45;
// Sections whose tops are this close together are treated as one row.
const SAME_ROW_PX = 160;

/**
 * Scroll-spy for the navigation.
 *
 * The active section is the last one whose top has passed a reading line
 * a little above the middle of the viewport. Two cases need more than that:
 *
 * - Sections that sit side by side (About / Skills on desktop) share a top
 *   edge, so the later one can only win if the visitor chose it.
 * - Sections near the end of the page may never reach the reading line, so
 *   at the very bottom every section still on screen is a candidate and the
 *   last one wins by default.
 *
 * `select(id)` records an explicit choice; it stays active for as long as
 * that section remains a candidate.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  const picked = useRef(null);
  const lockedUntil = useRef(0);

  const select = useCallback((id) => {
    picked.current = id;
    lockedUntil.current = performance.now() + CLICK_LOCK_MS;
    setActive(id);
  }, []);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      if (performance.now() < lockedUntil.current) return;

      const line = window.innerHeight * READING_LINE;
      const tops = Object.fromEntries(
        ids.map((id) => [id, document.getElementById(id)?.getBoundingClientRect().top]),
      );

      // Candidates: the last row of sections that has crossed the reading line.
      let candidates = [];
      for (const id of ids) {
        const top = tops[id];
        if (top === undefined || top > line) continue;
        const sameRow = candidates.length > 0 && Math.abs(top - tops[candidates[0]]) < SAME_ROW_PX;
        candidates = sameRow ? [...candidates, id] : [id];
      }
      if (candidates.length === 0) candidates = [ids[0]];
      let fallback = candidates[0];

      const page = document.documentElement;
      const atBottom = window.innerHeight + window.scrollY >= page.scrollHeight - 4;
      if (atBottom) {
        const start = ids.indexOf(candidates[0]);
        candidates = ids.filter(
          (id, i) => i >= start && tops[id] !== undefined && tops[id] < window.innerHeight,
        );
        fallback = candidates[candidates.length - 1] ?? ids[ids.length - 1];
      }

      if (!candidates.includes(picked.current)) picked.current = null;
      setActive(picked.current ?? fallback);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids]);

  return [active, select];
}
