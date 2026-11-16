import Button from './ui/Button.jsx';
import Pill from './ui/Pill.jsx';
import Icon from './ui/Icon.jsx';
import SocialLinks from './ui/SocialLinks.jsx';
import { Blob, Bolt, Crown, LoopArrow, Scribble, Squiggle } from './ui/Doodles.jsx';
import { heroStats, site } from '../data/site.js';
import heroPortrait from '../assets/portraits/hero-portrait.webp';
import './Hero.css';

function StatCard({ stat }) {
  return (
    <div className={`stat-card stat-card--${stat.id}`}>
      <p className="stat-card__label">{stat.label}</p>
      <p className="stat-card__value">
        {stat.value}
        <span className={`stat-card__icon stat-card__icon--${stat.icon}`}>
          <Icon name={stat.icon} />
        </span>
      </p>
      <p className="stat-card__note">{stat.note}</p>
      <Squiggle className="stat-card__squiggle" />
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero__inner">
        <div className="hero__copy">
          <Pill tone="outline" dot>
            {site.role}
          </Pill>

          <h1 id="hero-title" className="hero__title">
            <span className="hero__hi">Hi, I’m</span>{' '}
            <span className="hero__name">{site.name}</span>
            <span className="hero__last">
              {site.lastName}
              <span className="hero__dot">.</span>
              <Scribble className="hero__scribble" />
            </span>
            <Crown className="hero__crown" />
          </h1>

          <p className="hero__lead">{site.tagline}</p>

          <div className="hero__actions">
            <Button href="#projects">View My Projects</Button>
            <a className="hero__cv" href={site.cvUrl} download>
              Download CV
              <Icon name="download" />
            </a>
          </div>

          <LoopArrow className="hero__arrow" />
        </div>

        <div className="hero__visual">
          <Blob className="hero__blob" />
          <img
            className="hero__portrait"
            src={heroPortrait}
            alt="Portrait of Boubaker Boulaid wearing a black hoodie and a denim jacket"
            width="562"
            height="530"
            fetchPriority="high"
            decoding="async"
          />
          {heroStats.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>

        <aside className="hero__rail" aria-label="Social links">
          <SocialLinks className="hero__socials" />
          <span className="hero__rail-line" aria-hidden="true" />
          <a className="hero__scroll" href="#about">
            Scroll down
          </a>
          <Bolt className="hero__bolt" />
        </aside>
      </div>
    </section>
  );
}
