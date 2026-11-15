import { useState } from 'react';
import Pill from './ui/Pill.jsx';
import Icon from './ui/Icon.jsx';
import Reveal from './ui/Reveal.jsx';
import { QuoteMark } from './ui/Doodles.jsx';
import { impactStats } from '../data/site.js';
import { testimonials } from '../data/testimonials.js';
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
        <blockquote className="testimonial__quote">
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
  return (
    <section id="impact" className="impact" aria-labelledby="impact-title">
      <div className="container impact__inner">
        <Reveal className="impact__card">
          <div className="impact__intro">
            <Pill>My Impact</Pill>
            <h2 id="impact-title" className="section-title impact__title">
              Numbers That Speak
            </h2>
            <p className="section-text">A quick look at what I’ve achieved so far in my journey.</p>
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

        <Reveal delay={120}>
          <Testimonials />
        </Reveal>
      </div>
    </section>
  );
}
