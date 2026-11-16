import { useState } from 'react';
import Button from './ui/Button.jsx';
import Pill from './ui/Pill.jsx';
import Icon from './ui/Icon.jsx';
import Reveal from './ui/Reveal.jsx';
import { Burst } from './ui/Doodles.jsx';
import { projects } from '../data/projects.js';
import { gsap, ScrollTrigger } from '../motion/gsap.js';
import { useMotion } from '../motion/useMotion.js';
import { drawIn, revealTiles, revealUp } from '../motion/presets.js';
import './Projects.css';

function ProjectCard({ project }) {
  const { title, category, tone, stack, image, alt, url } = project;
  return (
    <Reveal as="li" className="project" data-featured={project.featured || undefined}>
      <Pill tone={tone} className="project__badge">
        {category}
      </Pill>
      <article className="project__frame">
        <div className="project__media">
          <img
            className="project__shot"
            src={image}
            alt={alt}
            width="900"
            height="511"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="project__body">
          <div>
            <h3 className="project__title">{title}</h3>
            <p className="project__stack">
              {stack.map((tech, i) => (
                <span key={tech}>
                  {i > 0 && <span className="project__sep" aria-hidden="true" />}
                  {tech}
                </span>
              ))}
            </p>
          </div>
          {url && (
            <a
              className="project__link"
              href={url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`View ${title}`}
            >
              <Icon name="arrow-up-right" />
            </a>
          )}
        </div>
      </article>
    </Reveal>
  );
}

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const hasMore = projects.some((project) => !project.featured);
  const visible = showAll ? projects : projects.filter((project) => project.featured);

  // Intro and the featured cards: revealed once, as the section arrives.
  const ref = useMotion(() => {
    revealUp('.projects__intro > *', { trigger: '.projects__intro', start: 'top 80%' });
    drawIn('.projects__burst path', {
      stagger: 0.08,
      delay: 0.4,
      scrollTrigger: { trigger: '.projects__intro', start: 'top 80%', once: true },
    });
    // revealTiles pauses the cards' hover transitions while they animate.
    revealTiles('.project[data-featured]', {
      trigger: '.projects__grid',
      start: 'top 82%',
      y: 56,
      scale: 1,
      duration: 1,
      stagger: 0.12,
    });
  });

  // Parallax inside every card's frame (rebuilt when cards are added), and a
  // soft entrance for the cards that "View All Projects" brings in.
  const extraRef = useMotion(
    (_, root) => {
      root.querySelectorAll('.project__media').forEach((media) => {
        gsap.set(media, { '--zoom': 1.1 });
        gsap.fromTo(
          media,
          { '--shift': '-4.5%' },
          {
            '--shift': '4.5%',
            ease: 'none',
            scrollTrigger: { trigger: media, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      });

      if (showAll) {
        revealTiles('.project:not([data-featured])', { start: 'top 98%', y: 40, scale: 1, duration: 0.8, stagger: 0.1 });
      }
      ScrollTrigger.refresh();
    },
    [showAll],
  );

  return (
    <section
      ref={(node) => {
        ref.current = node;
        extraRef.current = node;
      }}
      id="projects"
      className="projects"
      aria-labelledby="projects-title"
    >
      <div className="projects__inner">
        <Reveal className="projects__intro">
          <Pill>My Work</Pill>
          <h2 id="projects-title" className="section-title projects__title">
            My Projects
            <Burst className="projects__burst" />
          </h2>
          <p className="section-text projects__text">
            Real-world work, from client systems built during my internship to full-stack apps
            with tested APIs.
          </p>
          {hasMore && (
            <Button
              size="sm"
              className="projects__more"
              aria-expanded={showAll}
              aria-controls="projects-grid"
              onClick={() => setShowAll((value) => !value)}
            >
              {showAll ? 'Show Fewer Projects' : 'View All Projects'}
            </Button>
          )}
        </Reveal>

        <ul id="projects-grid" className="projects__grid">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </ul>
      </div>
    </section>
  );
}
