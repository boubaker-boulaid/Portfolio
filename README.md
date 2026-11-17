# Boubaker Boulaid — Portfolio

My official portfolio: a single-page site for a Full-Stack Developer, built with React and Vite.

Dark editorial layout, neon-lime accents, lavender shapes and hand-drawn doodles, implemented from the design in `UI/reference.png`.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build in dist/
npm run preview  # serve the production build locally
```

Requires Node 20.19+ (or 22.12+).

## Editing content

All copy and links live in `src/data` — no component changes needed.

| File | What it controls |
| --- | --- |
| `site.js` | Name, tagline, email, phone, location, CV path, contact-form endpoint, social links, nav items, hero and impact stats |
| `projects.js` | Project cards. `featured: true` cards are always shown; the rest appear under "View All Projects" |
| `skills.js` | Skill grid (name + logo) and the extra skill tags under it |
| `testimonials.js` | Testimonial slider (feedback from HOUATNOUR, in French) |

### Before publishing

- [ ] Add the sixth project to `src/data/projects.js` (the stats say 6).
- [ ] Confirm the stacks and repositories marked `TODO` in `src/data/projects.js`.
- [ ] Optional: set `formEndpoint` in `src/data/site.js` (e.g. Formspree) so the contact form sends messages directly instead of opening the visitor's email app.
- [ ] Re-export `public/Boubaker-Boulaid-CV.pdf` whenever the resume in `../info` changes.

## Project structure

```
src/
  main.jsx, App.jsx        entry point and page composition
  styles/
    tokens.css             design tokens: colours, type, spacing, motion
    base.css               reset, fluid root size, shared helpers
  components/
    Navbar, Hero, About, Projects, Impact, Contact (form), ContactCta, Footer
    ui/                    Button, Pill, Icon, Logo, SocialLinks, Reveal, Doodles
  hooks/useActiveSection   scroll-spy for the navigation
  motion/                  Lenis smooth scrolling and GSAP section animations
  data/                    all editable content
  assets/                  portraits, project screenshots, technology logos
```

Each section component has a CSS file next to it. Colours and fonts are CSS variables in `tokens.css`.

## How the layout scales

The design was drawn on a 1024px artboard. From 1024px upwards the root font size tracks the viewport (`1rem` = 1/64 of the width, capped at a 1536px artboard), and every measurement is in `rem`, so desktop keeps the reference proportions at any width. Below 1024px the root size is fixed and each section switches to a stacked layout.

## Motion

Smooth scrolling and animations use [Lenis](https://github.com/darkroomengineering/lenis) and [GSAP](https://gsap.com) with ScrollTrigger and SplitText. Everything lives in `src/motion`:

| File | Role |
| --- | --- |
| `gsap.js` | Registers the plugins and sets the shared easing (`power3.out`). |
| `useSmoothScroll.js` | Starts Lenis on GSAP's ticker, keeps ScrollTrigger in sync, and turns every `#anchor` link into a smooth scroll that respects the CSS `scroll-margin-top` / `scroll-padding-top` (sticky nav). |
| `useMotion.js` | Hook each section uses for its own animations. Selectors are scoped to the section, and everything is reverted on unmount. |
| `presets.js` | Shared moves: `revealUp`, `revealTiles`, `riseIn` (heading lines), `wipeIn` (script/marker words) and `drawIn` (hand-drawn doodles). |

Each section keeps its animation next to its markup (`Hero.jsx`, `About.jsx`, `Projects.jsx` …). Project images use the CSS `translate` (scroll parallax, `--shift`) and `scale` (hover zoom) properties, so the two never conflict.

Do not add `scroll-behavior: smooth` back to `html`: ScrollTrigger re-applies it inline during refresh, and it then fights Lenis.

## Accessibility

- Semantic landmarks, a skip link (it also moves focus), visible focus rings and labelled icon links.
- The mobile menu exposes `aria-expanded` and closes on Escape.
- Reveals only animate opacity and position, never `visibility`, so links and form fields stay reachable by keyboard before they have animated in.
- With `prefers-reduced-motion: reduce`, Lenis and every GSAP animation are skipped: content renders in its final state and anchor links jump instantly.

## Credits

Motion: GSAP and Lenis. Fonts: Plus Jakarta Sans, Satisfy, Damion and Permanent Marker (self-hosted via Fontsource). Technology logos from [Devicon](https://devicon.dev).
