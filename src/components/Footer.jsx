import Logo from './ui/Logo.jsx';
import SocialLinks from './ui/SocialLinks.jsx';
import { navLinks, site } from '../data/site.js';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__row">
          <Logo size="lg" />
          <nav aria-label="Footer">
            <ul className="footer__links">
              {navLinks.map(({ id, label }) => (
                <li key={id}>
                  <a className="footer__link" href={`#${id}`}>
                    {label}
                  </a>
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
