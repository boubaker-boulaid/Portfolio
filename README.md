# Boubaker — Portfolio

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
| `site.js` | Name, tagline, email, CV path, social links, nav items, hero and impact stats |
| `projects.js` | Project cards. `featured: true` cards are always shown; the rest appear under "View All Projects" |
| `skills.js` | Skill grid (name + logo) |
| `articles.js` | Blog cards, their dates and URLs, and the "View All Articles" target |
| `testimonials.js` | Testimonial slider |

### Before publishing

- [ ] Set your real **email** and **LinkedIn** URL in `src/data/site.js`.
- [ ] Add your CV as `public/Boubaker-CV.pdf` (or change `cvUrl`).
- [ ] Replace the **placeholder testimonials** in `src/data/testimonials.js` with real client quotes.
- [ ] Point each project's `url` at its live site or repository, and confirm the stacks marked `TODO`.
- [ ] Replace the Task Manager mockup (`src/assets/projects/task-manager.webp`) with a real screenshot if you have one.
- [ ] Give each article a real `url` and date once it is published.

## Project structure

```
src/
  main.jsx, App.jsx        entry point and page composition
  styles/
    tokens.css             design tokens: colours, type, spacing, motion
    base.css               reset, fluid root size, shared helpers
  components/
    Navbar, Hero, About, Projects, Impact, Blog, ContactCta, Footer
    ArticleThumb           CSS/SVG blog thumbnails
    ui/                    Button, Pill, Icon, Logo, SocialLinks, Reveal, Doodles
  hooks/useActiveSection   scroll-spy for the navigation
  data/                    all editable content
  assets/                  portraits, project screenshots, technology logos
```

Each section component has a CSS file next to it. Colours and fonts are CSS variables in `tokens.css`.

## How the layout scales

The design was drawn on a 1024px artboard. From 1024px upwards the root font size tracks the viewport (`1rem` = 1/64 of the width, capped at a 1536px artboard), and every measurement is in `rem`, so desktop keeps the reference proportions at any width. Below 1024px the root size is fixed and each section switches to a stacked layout.

## Accessibility and motion

- Semantic landmarks, a skip link, visible focus rings and labelled icon links.
- The mobile menu exposes `aria-expanded` and closes on Escape.
- Animations are subtle (reveal on scroll, floating stat cards, hover states) and are disabled when the visitor has `prefers-reduced-motion` set.

## Credits

Fonts: Plus Jakarta Sans, Satisfy and Damion (self-hosted via Fontsource). Technology logos from [Devicon](https://devicon.dev).
