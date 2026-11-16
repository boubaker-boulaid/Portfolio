import { useState } from 'react';
import Button from './ui/Button.jsx';
import Pill from './ui/Pill.jsx';
import Icon from './ui/Icon.jsx';
import Reveal from './ui/Reveal.jsx';
import { Burst } from './ui/Doodles.jsx';
import { projects } from '../data/projects.js';
import './Projects.css';

function ProjectCard({ project, delay }) {
  const { title, category, tone, stack, image, alt, url } = project;
  return (
    <Reveal as="li" className="project" delay={delay}>
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

  return (
    <section id="projects" className="projects" aria-labelledby="projects-title">
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
          {visible.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={(i % 3) * 90} />
          ))}
        </ul>
      </div>
    </section>
  );
}
