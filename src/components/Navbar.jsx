import { useEffect, useMemo, useState } from 'react';
import Logo from './ui/Logo.jsx';
import Button from './ui/Button.jsx';
import Icon from './ui/Icon.jsx';
import { navLinks } from '../data/site.js';
import { useActiveSection } from '../hooks/useActiveSection.js';
import { useMotion } from '../motion/useMotion.js';
import { enter } from '../motion/presets.js';
import './Navbar.css';

export default function Navbar() {
  const ids = useMemo(() => navLinks.map((link) => link.id), []);
  const [active, select] = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ref = useMotion(() => {
    enter('.nav__inner', { y: -12 }, { duration: 0.8, delay: 0.1 });
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on Escape, and when the viewport grows to desktop.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === 'Escape' && setOpen(false);
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onChange = () => desktop.matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onChange);
    return () => {
      window.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onChange);
    };
  }, [open]);

  const go = (id) => {
    select(id);
    setOpen(false);
  };

  return (
    <header ref={ref} className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`.trim()}>
      <div className="nav__inner">
        <Logo onClick={() => go('home')} />

        <nav className="nav__menu" id="primary-nav" aria-label="Primary">
          <ul className="nav__links">
            {navLinks.map(({ id, label }) => (
              <li key={id}>
                <a
                  className={`nav__link ${active === id ? 'is-active' : ''}`.trim()}
                  href={`#${id}`}
                  aria-current={active === id ? 'true' : undefined}
                  onClick={() => go(id)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <Button className="nav__cta nav__cta--menu" href="#contact" iconStyle="badge" onClick={() => go('contact')}>
            Let’s Talk
          </Button>
        </nav>

        <Button className="nav__cta nav__cta--bar" href="#contact" iconStyle="badge" onClick={() => go('contact')}>
          Let’s Talk
        </Button>

        <button
          className="nav__toggle"
          type="button"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>
    </header>
  );
}
