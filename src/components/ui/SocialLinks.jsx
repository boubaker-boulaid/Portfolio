import Icon from './Icon.jsx';
import { socialLinks } from '../../data/site.js';
import './ui.css';

/** GitHub / LinkedIn / Email icon links, shared by the hero rail and the footer. */
export default function SocialLinks({ className = '' }) {
  return (
    <ul className={`socials ${className}`.trim()}>
      {socialLinks.map(({ id, label, href, external }) => (
        <li key={id}>
          <a
            className="socials__link"
            href={href}
            aria-label={label}
            target={external ? '_blank' : undefined}
            rel={external ? 'noreferrer noopener' : undefined}
          >
            <Icon name={id} />
          </a>
        </li>
      ))}
    </ul>
  );
}
