import { useState } from 'react';
import Pill from './ui/Pill.jsx';
import Icon from './ui/Icon.jsx';
import Reveal from './ui/Reveal.jsx';
import { QuoteMark } from './ui/Doodles.jsx';
import { impactStats } from '../data/site.js';
import { testimonials } from '../data/testimonials.js';
import { useMotion } from '../motion/useMotion.js';
import { countUp, drawIn, introReveal, revealUp } from '../motion/presets.js';
import { gsap } from '../motion/gsap.js';
import './Impact.css';

const initials = (name) =>
  name
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

function Testimonials() {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];

  return (
    <div className="testimonials">
      <figure className="testimonial on-cream" key={current.id} aria-live="polite">
        <QuoteMark className="testimonial__mark" />
        <blockquote className="testimonial__quote" lang={current.lang}>
          <p>{current.quote}</p>
        </blockquote>
        <figcaption className="testimonial__author">
          {current.avatar ? (
            <img className="testimonial__avatar" src={current.avatar} alt="" width="56" height="56" />
          ) : (
            <span className="testimonial__avatar testimonial__avatar--initials" aria-hidden="true">
              {initials(current.name)}
            </span>
          )}
          <span className="testimonial__who">
            <span className="testimonial__name">{current.name}</span>
            <span className="testimonial__role">{current.role}</span>
          </span>
          <span className="testimonial__stars" role="img" aria-label={`Rated ${current.rating} out of 5`}>
            {Array.from({ length: current.rating }, (_, i) => (
              <Icon key={i} name="star" />
            ))}
          </span>
        </figcaption>
      </figure>

      {testimonials.length > 1 && (
        <div className="testimonials__dots" role="group" aria-label="Choose testimonial">
          {testimonials.map((item, i) => (
            <button
              key={item.id}
              type="button"
              className={`testimonials__dot ${i === index ? 'is-active' : ''}`.trim()}
              aria-label={`Show testimonial ${i + 1} of ${testimonials.length}`}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Impact() {
  const ref = useMotion((_, root) => {
    revealUp('.impact__card', { from: { y: 40 }, duration: 1, start: 'top 80%' });
    introReveal('.impact__intro');
    revealUp('.impact__stat', { trigger: '.impact__stats', start: 'top 85%', delay: 0.3, stagger: 0.1 });
    revealUp('.impact__quote', { from: { y: 40 }, duration: 1, start: 'top 85%', delay: 0.15 });

    // The figures count up as the stats arrive.
    const restore = gsap.utils.toArray('.impact__value', root).map((el, i) =>
      countUp(el, {
        delay: 0.45 + i * 0.1,
        scrollTrigger: { trigger: '.impact__stats', start: 'top 85%', once: true },
      }),
    );
    drawIn('.testimonial__mark path', {
      delay: 0.5,
      scrollTrigger: { trigger: '.impact__quote', start: 'top 85%', once: true },
    });

    return () => restore.forEach((undo) => undo());
  });

  return (
    <section ref={ref} id="impact" className="impact" aria-labelledby="impact-title">
      <div className="container impact__inner">
        <Reveal className="impact__card">
          <div className="impact__intro">
            <Pill>My Impact</Pill>
            <h2 id="impact-title" className="section-title impact__title">
              Numbers That Speak
            </h2>
            <p className="section-text">A quick look at what I’ve shipped so far in my journey.</p>
          </div>
          <ul className="impact__stats">
            {impactStats.map(({ id, value, label, icon }) => (
              <li key={id} className="impact__stat">
                <Icon name={icon} className="impact__icon" />
                <strong className="impact__value">{value}</strong>
                <span className="impact__label">{label}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="impact__quote">
          <Testimonials />
        </Reveal>
      </div>
    </section>
  );
}
