import Button from './ui/Button.jsx';
import Pill from './ui/Pill.jsx';
import Icon from './ui/Icon.jsx';
import SocialLinks from './ui/SocialLinks.jsx';
import { Blob, Bolt, Crown, LoopArrow, Scribble, Squiggle } from './ui/Doodles.jsx';
import { heroStats, site } from '../data/site.js';
import heroPortrait from '../assets/portraits/hero-portrait.webp';
import { gsap } from '../motion/gsap.js';
import { useMotion } from '../motion/useMotion.js';
import { countUp, drawIn, enter, idle, riseIn, wipeIn } from '../motion/presets.js';
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
  const ref = useMotion(({ desktop }, root) => {
    // Entrance: copy builds line by line while the portrait settles in.
    const tl = gsap.timeline({ delay: 0.15 });
    tl.add(enter('.hero__copy .pill', { y: 12 }, { duration: 0.6 }))
      .add(riseIn(['.hero__hi', '.hero__name']), '-=0.35')
      .add(wipeIn('.hero__last', { duration: 0.85 }), '-=0.6')
      .add(drawIn('.hero__scribble path', { duration: 0.7 }), '-=0.25')
      .add(enter('.hero__crown', { y: -10, scale: 0.8 }, { duration: 0.6 }), '<')
      .add(enter('.hero__lead', { y: 16 }, { duration: 0.8 }), '-=0.55')
      .add(enter('.hero__actions > *', { y: 14 }, { duration: 0.7, stagger: 0.08 }), '-=0.6')
      .add(enter('.hero__arrow', { y: 0 }, { duration: 0.8 }), '-=0.5');

    tl.add(enter('.hero__blob', { y: 0, scale: 0.9, transformOrigin: '50% 60%' }, { duration: 1.4, ease: 'expo.out' }), 0.2)
      // Fade the photo quickly (so the blob never tints it) but let it settle slowly.
      .fromTo('.hero__portrait', { y: 36 }, { y: 0, duration: 1.3, ease: 'expo.out' }, 0.15)
      .fromTo('.hero__portrait', { opacity: 0 }, { opacity: 1, duration: 0.45, ease: 'power1.out' }, 0.15)
      // Stat cards float with a CSS animation on transform, so only fade them.
      .fromTo('.stat-card', { opacity: 0 }, { opacity: 1, duration: 0.8, stagger: 0.15, clearProps: 'opacity' }, 1.05)
      .add(enter('.hero__rail > *', { y: 0, x: 10 }, { duration: 0.6, stagger: 0.06 }), 0.9);

    // The stat values count up as their cards appear.
    const restore = gsap.utils
      .toArray('.stat-card__value', root)
      .map((el, i) => countUp(el, { delay: 1.3 + i * 0.15, duration: 1.2 }));

    // Gentle life once everything has landed: the blob breathes, the crown
    // and the bolt drift. Small, slow and on separate elements from the
    // entrance tweens so the two never fight.
    gsap.to('.hero__blob path', {
      scale: 1.035,
      rotation: 1.5,
      transformOrigin: '50% 50%',
      duration: 5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 1.6,
    });
    // Both start after their own entrance has finished and cleared its styles.
    idle('.hero__crown', { y: -3, rotation: '+=4', duration: 2.2, delay: 2.8 });
    idle('.hero__bolt', { y: -6, delay: 2.4 });

    // Subtle depth on the way out: the portrait drifts slower than the page
    // and the copy eases upward, both tied to the scroll position.
    if (desktop) {
      const out = { trigger: root, start: 'top top', end: 'bottom top', scrub: true };
      gsap.to('.hero__visual', { yPercent: 7, ease: 'none', scrollTrigger: out });
      gsap.to('.hero__inner > .hero__copy', { y: -60, ease: 'none', scrollTrigger: out });
    }

    return () => restore.forEach((undo) => undo());
  });

  return (
    <section ref={ref} id="home" className="hero" aria-labelledby="hero-title">
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
