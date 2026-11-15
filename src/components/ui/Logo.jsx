import './ui.css';

export default function Logo({ size = 'md', onClick }) {
  return (
    <a className={`logo logo--${size}`} href="#home" aria-label="Boubaker — back to top" onClick={onClick}>
      bK<span className="logo__dot">.</span>
    </a>
  );
}
