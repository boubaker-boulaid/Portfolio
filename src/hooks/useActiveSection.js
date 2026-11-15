import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Scroll-spy for the navigation.
 *
 * The active section is the last one whose top has passed a reading line
 * 35% down the viewport. Sections that sit side by side (About / Skills on
 * desktop) share a top edge, so the later one only wins if the visitor
 * explicitly navigated to it — `select(id)` records that choice.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  const picked = useRef(null);

  const select = useCallback((id) => {
    picked.current = id;
    setActive(id);
  }, []);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      const tops = ids.map((id) => document.getElementById(id)?.getBoundingClientRect().top);

      let group = [];
      ids.forEach((id, i) => {
        const top = tops[i];
        if (top === undefined || top > line) return;
        const sameRow = group.length > 0 && Math.abs(top - tops[ids.indexOf(group[0])]) < 160;
        group = sameRow ? [...group, id] : [id];
      });

      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) group = [ids[ids.length - 1]];
      if (group.length === 0) group = [ids[0]];

      if (!group.includes(picked.current)) picked.current = null;
      setActive(picked.current ?? group[0]);
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
