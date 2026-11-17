/* Small inline icon set — no icon library needed. All icons use currentColor. */

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const ICONS = {
  'arrow-up-right': (
    <g {...stroke} strokeWidth={2.4}>
      <path d="M7 17 17 7" />
      <path d="M8.5 7H17v8.5" />
    </g>
  ),
  'arrow-right': (
    <g {...stroke} strokeWidth={2.2}>
      <path d="M4 12h16" />
      <path d="m14 6 6 6-6 6" />
    </g>
  ),
  download: (
    <g {...stroke} strokeWidth={2.4}>
      <path d="M12 3.5v11" />
      <path d="m7 10.5 5 5 5-5" />
      <path d="M4.5 20h15" />
    </g>
  ),
  folder: (
    <g {...stroke} strokeWidth={1.8}>
      <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
    </g>
  ),
  users: (
    <g {...stroke} strokeWidth={1.8}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </g>
  ),
  clock: (
    <g {...stroke} strokeWidth={1.8}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 6.5V12l3.5 2" />
    </g>
  ),
  rocket: (
    <g {...stroke} strokeWidth={1.7}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </g>
  ),
  code: (
    <g {...stroke} strokeWidth={2}>
      <path d="m8 7-5 5 5 5" />
      <path d="m16 7 5 5-5 5" />
      <path d="m13.5 4-3 16" />
    </g>
  ),
  phone: (
    <path
      fill="currentColor"
      d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"
    />
  ),
  pin: (
    <g {...stroke} strokeWidth={1.9}>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </g>
  ),
  menu: (
    <g {...stroke} strokeWidth={2.2}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </g>
  ),
  close: (
    <g {...stroke} strokeWidth={2.2}>
      <path d="M6 6l12 12M18 6 6 18" />
    </g>
  ),
  star: (
    <path
      fill="currentColor"
      d="m12 2.6 2.85 6.02 6.55.84-4.8 4.56 1.22 6.5L12 17.38l-5.82 3.14 1.22-6.5-4.8-4.56 6.55-.84L12 2.6z"
    />
  ),
  github: (
    <path
      fill="currentColor"
      d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57 0-.29-.01-1.04-.02-2.04-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.5 1 .1-.78.41-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.29 0 .31.21.69.82.57A12 12 0 0 0 12 .3"
    />
  ),
  linkedin: (
    <g fill="currentColor">
      <circle cx="4.6" cy="4.4" r="2.5" />
      <rect x="2.5" y="8.6" width="4.2" height="13.2" />
      <path d="M9.6 8.6h4v1.8h.06c.56-1.05 1.92-2.16 3.95-2.16 4.22 0 5 2.78 5 6.4v7.16h-4.17v-6.35c0-1.51-.03-3.46-2.11-3.46-2.11 0-2.43 1.65-2.43 3.35v6.46H9.6V8.6z" />
    </g>
  ),
  mail: (
    <path
      fill="currentColor"
      d="M3.2 4.5h17.6c.9 0 1.6.6 1.7 1.4L12 12.6 1.5 5.9c.1-.8.8-1.4 1.7-1.4zM1.5 8.2v9.6c0 .9.8 1.7 1.7 1.7h17.6c.9 0 1.7-.8 1.7-1.7V8.2L12 14.9 1.5 8.2z"
    />
  ),
};

export default function Icon({ name, className = '', title, ...rest }) {
  const content = ICONS[name];
  if (!content) return null;
  return (
    <svg
      className={`icon ${className}`.trim()}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...rest}
    >
      {content}
    </svg>
  );
}
