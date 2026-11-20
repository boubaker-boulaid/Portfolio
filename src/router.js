import { useSyncExternalStore } from 'react';

/*
 * A tiny History-API router: the site has two kinds of page (home and a
 * project's detail page), so a routing library would be dead weight.
 *
 * - navigate('/projects/x') pushes a new entry and starts it at the top.
 * - navigate('/#about') goes back to the home page and lands on a section.
 * - Back/forward restore the scroll position each entry was left at.
 *
 * Scrolling itself is done by App (see `takePendingScroll`), after the new
 * page has rendered.
 */

const listeners = new Set();
let pending = null; // { top } | { hash } | null — consumed by App after render
let currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

const notify = () => listeners.forEach((listener) => listener());

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const getPath = () => window.location.pathname;

if (typeof window !== 'undefined') {
  // We restore positions ourselves; the browser's attempt would fight Lenis.
  if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';

  window.addEventListener('popstate', (event) => {
    // Only page changes are ours to handle (in-page anchors replace their entry).
    if (window.location.pathname === currentPath) return;
    currentPath = window.location.pathname;
    pending = { top: event.state?.scrollY ?? 0, hash: event.state ? null : window.location.hash };
    notify();
  });

  // A first visit to "/#projects" should land on that section.
  if (window.location.hash.length > 1) pending = { hash: window.location.hash };
}

/** The current pathname, re-rendering on navigation. */
export function usePath() {
  return useSyncExternalStore(subscribe, getPath, getPath);
}

/** Splits "/path#hash" into its parts. */
export function splitHref(href) {
  const [path, hash = ''] = href.split('#');
  return { path: path || '/', hash: hash ? `#${hash}` : '' };
}

/** Client-side navigation to a same-site path, with an optional #section. */
export function navigate(href) {
  const { path, hash } = splitHref(href);
  // Remember where the visitor was, so Back returns them to the same spot.
  window.history.replaceState({ ...window.history.state, scrollY: window.scrollY }, '');
  window.history.pushState({ scrollY: 0 }, '', path + hash);
  currentPath = path;
  pending = hash ? { hash } : { top: 0 };
  notify();
}

/** Records an in-page section in the address without adding a history entry. */
export function replaceHash(hash) {
  if (window.location.hash !== hash) {
    window.history.replaceState(window.history.state, '', window.location.pathname + hash);
  }
}

/** The scroll App should apply now that the new page is on screen. */
export function takePendingScroll() {
  const next = pending;
  pending = null;
  return next;
}
