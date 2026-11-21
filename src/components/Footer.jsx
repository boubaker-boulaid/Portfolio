import Logo from './ui/Logo.jsx';
import SocialLinks from './ui/SocialLinks.jsx';
import Link from './ui/Link.jsx';
import { navLinks, site } from '../data/site.js';
import { useMotion } from '../motion/useMotion.js';
import { revealUp } from '../motion/presets.js';
import './Footer.css';

export default function Footer() {
  const ref = useMotion((_, root) => {
    revealUp(['.footer__row', '.footer__copy'], { trigger: root, start: 'top 95%', from: { y: 16 }, duration: 0.8 });
  });

  return (
    <footer ref={ref} className="footer">
      <div className="container">
        <div className="footer__row">
          <Logo size="lg" />
          <nav aria-label="Footer">
            <ul className="footer__links">
              {navLinks.map(({ id, label }) => (
                <li key={id}>
                  <Link className="footer__link" to={`/#${id}`}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <SocialLinks className="footer__socials" />
        </div>
        <p className="footer__copy">
          © {new Date().getFullYear()} {site.fullName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
