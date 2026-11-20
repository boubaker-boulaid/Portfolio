import { navigate, replaceHash, splitHref } from '../../router.js';
import { scrollToHash } from '../../motion/useSmoothScroll.js';

/**
 * Same-site link that navigates without a page reload.
 * `to` is a path, optionally with a section: "/projects/x", "/#about".
 * When the path is the current page, it simply scrolls to the section.
 * Modified clicks (new tab, etc.) are left to the browser.
 */
export default function Link({ to, onClick, children, ...rest }) {
  const handleClick = (event) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();

    const { path, hash } = splitHref(to);
    if (path === window.location.pathname && hash) {
      scrollToHash(hash);
      replaceHash(hash);
    } else {
      navigate(to);
    }
  };

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
