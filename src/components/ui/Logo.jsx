import Link from './Link.jsx';
import './ui.css';

export default function Logo({ size = 'md', onClick }) {
  return (
    <Link className={`logo logo--${size}`} to="/#home" aria-label="Boubaker — home" onClick={onClick}>
      bK<span className="logo__dot">.</span>
    </Link>
  );
}
