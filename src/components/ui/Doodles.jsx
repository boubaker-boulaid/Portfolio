/*
 * Hand-drawn decorative marks from the design, as inline SVG.
 * They are purely ornamental, so every one is hidden from assistive tech.
 * Colour comes from `currentColor`; size comes from CSS on the className.
 */

const base = (viewBox, className) => ({
  viewBox,
  className: `doodle ${className ?? ''}`.trim(),
  'aria-hidden': true,
  focusable: 'false',
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
});

export function Crown({ className }) {
  return (
    <svg {...base('0 0 56 48', className)} strokeWidth="2.1">
      <path d="M6.5 41.5 3 14.5l12.5 15L25 4l8.5 24.5L52.5 9l-5 31.5" />
      <path d="M6.5 41.5c12-2.6 28-3 41-1" />
      <g fill="currentColor" stroke="none">
        <circle cx="3" cy="13" r="2.1" />
        <circle cx="25" cy="3.2" r="2.1" />
        <circle cx="52.5" cy="7.5" r="2.1" />
      </g>
    </svg>
  );
}

export function Scribble({ className }) {
  return (
    <svg {...base('0 0 164 22', className)} strokeWidth="2.4">
      <path d="M2 11.5C48 8 110 4.5 162 2.5 118 7 66 12.5 34 18.5c36-4 70-7 96-8.5-22 2.5-44 5.5-62 9.5 18-2 34-3.5 48-4" />
    </svg>
  );
}

export function LoopArrow({ className }) {
  return (
    <svg {...base('0 0 40 90', className)} strokeWidth="1.5">
      <path d="M33 3C15 8 3 22 4.5 39c.8 9.5 13 12.5 15 4.5 1.6-7-8.5-9.5-12.5-2C2 51 12 71 33 81" />
      <path d="M22.5 83.5 34 81.5l-4.5-10.5" />
    </svg>
  );
}

export function Bolt({ className }) {
  return (
    <svg {...base('0 0 26 38', className)} strokeWidth="1.9">
      <path d="M17.5 2 3 21.5l9.5-1L8 36 23 14.5l-9.5 1.5L17.5 2z" />
    </svg>
  );
}

export function Sparks({ className }) {
  return (
    <svg {...base('0 0 30 34', className)} strokeWidth="2.6">
      <path d="M3 3l6 10" />
      <path d="M17 12l9-6" />
      <path d="M15 24l12 2" />
    </svg>
  );
}

export function Burst({ className }) {
  return (
    <svg {...base('0 0 32 34', className)} strokeWidth="2.2">
      <path d="M5 3l5 9" />
      <path d="M14 2l5 9" />
      <path d="M13 17l12-5" />
      <path d="M15 25l13 1" />
      <path d="M25.5 22.5l3 3.5-3.5 3" />
    </svg>
  );
}

export function Heart({ className }) {
  return (
    <svg {...base('0 0 30 34', className)} strokeWidth="2">
      <path d="M13.5 31C8 22 2.5 14.5 3.5 8.5 4.5 3 11 2 13 9c.5 2 .7 4 .5 6 1-5 4-11.5 9-11.5 5.5 0 5.5 7 2 12.5-3 4.7-7.5 10-11 15z" />
    </svg>
  );
}

export function Squiggle({ className }) {
  return (
    <svg {...base('0 0 96 10', className)} strokeWidth="1.3" preserveAspectRatio="none">
      <path d="M1 6.5c8-3 13-3.5 20-.5s11 2.5 18-.5 12-3 19 0 12 2.5 18 .5 12-2 19-1.5" />
    </svg>
  );
}

export function Underline({ className }) {
  return (
    <svg {...base('0 0 190 14', className)} strokeWidth="1.8" preserveAspectRatio="none">
      <path d="M2 8C50 3.5 120 2.5 150 3" />
      <path d="M40 11.5c30-2.5 70-3.5 96-3" />
    </svg>
  );
}

export function PaperPlane({ className }) {
  return (
    <svg {...base('0 0 100 50', className)} strokeWidth="1.6">
      <path d="M2 42c10 3 22-2 26-10 3-6-2-11-7-8-6 3.5-4 14 6 15 12 1.2 24-7 33-14" />
      <path d="M60 14.5 97 3 78 37l-6.5-13.5L60 14.5z" />
      <path d="M71.5 23.5 97 3" />
      <path d="M71.5 23.5 69 33l6-3.5" />
    </svg>
  );
}

export function QuoteMark({ className }) {
  return (
    <svg
      viewBox="0 0 30 24"
      className={`doodle ${className ?? ''}`.trim()}
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
    >
      <path d="M12.5 1.5C6 4 1.5 9 1.5 15.5c0 4.2 2.6 7 6 7 3 0 5.3-2.3 5.3-5.3 0-2.9-2-5-4.7-5.2.5-2.8 2.5-5.3 5.9-7.2L12.5 1.5zm15 0C21 4 16.5 9 16.5 15.5c0 4.2 2.6 7 6 7 3 0 5.3-2.3 5.3-5.3 0-2.9-2-5-4.7-5.2.5-2.8 2.5-5.3 5.9-7.2L27.5 1.5z" />
    </svg>
  );
}

/* The organic lavender shape behind the hero portrait. */
export function Blob({ className }) {
  return (
    <svg
      viewBox="0 0 357 324"
      className={`doodle ${className ?? ''}`.trim()}
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
      preserveAspectRatio="none"
    >
      <path d="M62 7C30 20 4 60 1 120c-2 50 13 85 19 120 6 35-8 60-6 84h312c12-16 30-39 26-69-4-27-30-40-26-65 4-25 31-40 30-85-1-50-31-97-86-103-70-5-160-9-208 5z" />
    </svg>
  );
}
