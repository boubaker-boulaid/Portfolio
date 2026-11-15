import './ui.css';

/** Small rounded label: tone = lime | lavender | dark | outline. */
export default function Pill({ tone = 'lime', size = 'sm', dot = false, className = '', children }) {
  return (
    <span className={`pill pill--${tone} pill--${size} ${className}`.trim()}>
      {dot && <span className="pill__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
