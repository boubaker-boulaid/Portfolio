import { useEffect, useState } from 'react';
import Button from '../components/ui/Button.jsx';
import Icon from '../components/ui/Icon.jsx';
import Link from '../components/ui/Link.jsx';
import Lightbox from '../components/ui/Lightbox.jsx';
import Pill from '../components/ui/Pill.jsx';
import { Burst, Squiggle } from '../components/ui/Doodles.jsx';
import ContactCta from '../components/ContactCta.jsx';
import { projectPath, projects } from '../data/projects.js';
import { site } from '../data/site.js';
import { gsap } from '../motion/gsap.js';
import { useMotion } from '../motion/useMotion.js';
import { drawIn, enter, revealTiles, revealUp, riseIn } from '../motion/presets.js';
import './ProjectDetail.css';

function Screenshot({ image, onOpen, className = '', eager = false }) {
  return (
    <figure className={`shot ${className}`.trim()}>
      <button className="shot__open" type="button" onClick={onOpen} aria-label={`Enlarge: ${image.caption || image.alt}`}>
        <span className="shot__frame">
          <img
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
          />
        </span>
        <span className="shot__zoom" aria-hidden="true">
          <Icon name="arrow-up-right" />
        </span>
      </button>
      {image.caption && <figcaption className="shot__caption">{image.caption}</figcaption>}
    </figure>
  );
}

export default function ProjectDetail({ project }) {
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  // Everything that can open in the viewer, in reading order.
  const images = [project.cover, ...project.gallery, project.mobile];
  const [viewing, setViewing] = useState(null);

  useEffect(() => {
    const previous = document.title;
    document.title = `${project.name} — ${site.fullName}`;
    return () => {
      document.title = previous;
    };
  }, [project]);

  const ref = useMotion(
    ({ desktop }) => {
      // Header builds like the home hero: label, title, then the details.
      const tl = gsap.timeline({ delay: 0.1 });
      tl.add(enter('.pd-back', { x: -10, y: 0 }, { duration: 0.6 }))
        .add(enter('.pd-head .pill', { y: 12 }, { duration: 0.6 }), '-=0.4')
        .add(riseIn('.pd-title'), '-=0.35')
        .add(drawIn('.pd-burst path', { stagger: 0.08, duration: 0.6 }), '-=0.4')
        .add(enter(['.pd-kind', '.pd-summary', '.pd-actions', '.pd-meta > *'], { y: 16 }, { stagger: 0.07 }), '-=0.7')
        // The cover rises in and un-masks from the bottom.
        .fromTo(
          '.pd-cover .shot__frame',
          { clipPath: 'inset(100% 0% 0% 0%)', y: 40 },
          { clipPath: 'inset(0% 0% 0% 0%)', y: 0, duration: 1.2, ease: 'expo.out', clearProps: 'clipPath,transform' },
          0.35,
        );

      if (desktop) {
        gsap.fromTo(
          '.pd-cover img',
          { yPercent: -3, scale: 1.06 },
          {
            yPercent: 3,
            scale: 1.06,
            ease: 'none',
            scrollTrigger: { trigger: '.pd-cover', start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      }

      revealUp('.pd-stats > *', { trigger: '.pd-stats', start: 'top 88%', stagger: 0.1 });
      revealUp('.pd-section-title', { start: 'top 85%', from: { y: 20 } });
      revealUp('.pd-overview p', { trigger: '.pd-overview', start: 'top 85%', stagger: 0.12 });
      gsap.utils.toArray('.pd-feature').forEach((group) => {
        revealUp(group.children, { trigger: group, start: 'top 88%', stagger: 0.06, from: { y: 18 } });
      });
      revealUp('.pd-aside', { start: 'top 85%', from: { y: 32 } });
      revealTiles('.pd-gallery .shot', { trigger: '.pd-gallery', start: 'top 85%', from: { y: 40, scale: 0.97 }, stagger: 0.08, duration: 0.9 });
      revealUp('.pd-mobile .shot', { start: 'top 85%', from: { y: 48 }, duration: 1.1 });
      revealUp('.pd-next', { start: 'top 90%', from: { y: 30 } });
    },
    [project],
  );

  return (
    <article ref={ref} className="pd" aria-labelledby="pd-title">
      {/* ---------- Header ---------- */}
      <header className="pd-head container">
        <Link className="pd-back" to="/#projects">
          <Icon name="arrow-right" className="pd-back__icon" />
          All projects
        </Link>

        <div className="pd-head__grid">
          <div>
            <Pill tone={project.tone}>{project.category}</Pill>
            <h1 id="pd-title" className="pd-title">
              {project.name}
              <Burst className="pd-burst" />
            </h1>
            <p className="pd-kind">{project.title}</p>
          </div>

          <div className="pd-head__side">
            <p className="pd-summary">{project.summary}</p>
            <div className="pd-actions">
              {project.repo ? (
                <Button href={project.repo} icon="github" iconStyle="badge">
                  Source code
                </Button>
              ) : (
                <p className="pd-private">
                  <Icon name="lock" />
                  {project.privateNote}
                </p>
              )}
            </div>
          </div>
        </div>

        <dl className="pd-meta">
          {project.meta.map(({ label, value }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
          <div>
            <dt>Stack</dt>
            <dd>{project.stack.join(' · ')}</dd>
          </div>
        </dl>
      </header>

      {/* ---------- Cover ---------- */}
      <div className="container">
        <Screenshot image={project.cover} className="pd-cover" eager onOpen={() => setViewing(0)} />
      </div>

      {/* ---------- Story + tech ---------- */}
      <section className="pd-body container" aria-labelledby="pd-overview-title">
        <div className="pd-main">
          <ul className="pd-stats">
            {project.stats.map(({ value, label }) => (
              <li key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </li>
            ))}
          </ul>

          <h2 id="pd-overview-title" className="section-title pd-section-title">
            Overview
          </h2>
          <div className="pd-overview">
            {project.overview.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <h2 className="section-title pd-section-title">Key features</h2>
          <div className="pd-features">
            {project.features.map((group) => (
              <div key={group.title} className="pd-feature">
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item.slice(0, 32)}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <aside className="pd-aside on-cream" aria-label="Tech stack">
          <h2 className="pd-aside__title">Tech stack</h2>
          <dl className="pd-tech">
            {project.techStack.map(({ label, value }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <Squiggle className="pd-aside__squiggle" />
          {project.repo ? (
            <a className="pd-aside__link" href={project.repo} target="_blank" rel="noreferrer noopener">
              <Icon name="github" />
              View the repository
              <Icon name="arrow-up-right" />
            </a>
          ) : (
            <p className="pd-aside__note">{project.privateNote}</p>
          )}
          {project.note && <p className="pd-aside__note">{project.note}</p>}
        </aside>
      </section>

      {/* ---------- Screens ---------- */}
      <section className="pd-screens container" aria-labelledby="pd-screens-title">
        <h2 id="pd-screens-title" className="section-title pd-section-title">
          Screens
        </h2>
        <div className="pd-gallery">
          {project.gallery.map((image, i) => (
            <Screenshot key={image.src} image={image} onOpen={() => setViewing(i + 1)} />
          ))}
        </div>
      </section>

      {/* ---------- On phones ---------- */}
      <section className="pd-mobile section--cream" aria-labelledby="pd-mobile-title">
        <div className="container">
          <h2 id="pd-mobile-title" className="section-title pd-section-title">
            On phones
          </h2>
          <Screenshot image={project.mobile} onOpen={() => setViewing(images.length - 1)} />
        </div>
      </section>

      {/* ---------- Next project ---------- */}
      <nav className="container" aria-label="Next project">
        <Link className="pd-next" to={projectPath(next)}>
          <span className="pd-next__label">Next project</span>
          <span className="pd-next__name">{next.name}</span>
          <span className="pd-next__kind">{next.title}</span>
          <img className="pd-next__img" src={next.cover.src} alt="" width={next.cover.width} height={next.cover.height} loading="lazy" />
          <span className="pd-next__arrow" aria-hidden="true">
            <Icon name="arrow-up-right" />
          </span>
        </Link>
      </nav>

      <ContactCta />

      <Lightbox images={images} index={viewing} onChange={setViewing} onClose={() => setViewing(null)} />
    </article>
  );
}
