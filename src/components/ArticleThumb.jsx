import linux from '../assets/logos/linux.webp';
import vscode from '../assets/logos/vscode.svg';
import './ArticleThumb.css';

/*
 * Illustrated article thumbnails, built from CSS/SVG so no stock imagery is
 * needed. Pass an `image` on an article instead if you have real cover art.
 */

const CODE_COLOURS = ['#8b9cff', '#ff7ac6', '#5eead4', '#facc15', '#c4b5fd', '#64748b', '#f97316'];

// Deterministic pseudo-random "lines of code": [indent, [segment widths…]].
const INDENTS = [0, 6, 12, 12, 18, 6, 12, 18, 18, 12, 6, 0];
const CODE_LINES = Array.from({ length: 24 }, (_, row) => {
  const indent = INDENTS[row % INDENTS.length];
  const count = 2 + ((row * 7) % 5);
  const segments = Array.from({ length: count }, (_, i) => 6 + ((row * 13 + i * 29) % 26));
  return { indent, segments };
});

function CodeArt() {
  return (
    <svg className="thumb__code" viewBox="0 0 216 105" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g transform="translate(12 4) skewY(-3)" opacity="0.9">
        {CODE_LINES.map(({ indent, segments }, row) => {
          let x = indent + 12;
          return (
            <g key={row}>
              <rect x="0" y={row * 4.6} width="4" height="1.4" rx="0.7" fill="#3b3f7a" />
              {segments.map((width, i) => {
                const rect = (
                  <rect
                    key={i}
                    x={x}
                    y={row * 4.6}
                    width={width}
                    height="1.4"
                    rx="0.7"
                    fill={CODE_COLOURS[(row * 3 + i * 2) % CODE_COLOURS.length]}
                  />
                );
                x += width + 3;
                return rect;
              })}
            </g>
          );
        })}
      </g>
    </svg>
  );
}

export default function ArticleThumb({ type }) {
  if (type === 'linux') {
    return (
      <div className="thumb thumb--linux" aria-hidden="true">
        <span className="thumb__tower thumb__tower--a" />
        <span className="thumb__tower thumb__tower--b" />
        <span className="thumb__tower thumb__tower--c" />
        <img className="thumb__tux" src={linux} alt="" width="256" height="256" loading="lazy" />
      </div>
    );
  }

  if (type === 'vscode') {
    return (
      <div className="thumb thumb--vscode" aria-hidden="true">
        <span className="thumb__screen">
          <img className="thumb__vscode" src={vscode} alt="" width="64" height="64" loading="lazy" />
        </span>
      </div>
    );
  }

  return (
    <div className="thumb thumb--code" aria-hidden="true">
      <CodeArt />
    </div>
  );
}
