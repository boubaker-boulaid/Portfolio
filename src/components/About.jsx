import Pill from './ui/Pill.jsx';
import Reveal from './ui/Reveal.jsx';
import { Burst, Heart, Sparks, Underline } from './ui/Doodles.jsx';
import { skills } from '../data/skills.js';
import aboutPortrait from '../assets/portraits/about-portrait.webp';
import { gsap, SplitText } from '../motion/gsap.js';
import { useMotion } from '../motion/useMotion.js';
import { drawIn, enter, idle, revealTiles, revealUp, wipeIn } from '../motion/presets.js';
import './About.css';

export default function About() {
  const ref = useMotion(() => {
    // Photo: the frame lifts in while the picture un-masks and settles.
    revealUp('.about__photo', { from: { y: 40 }, duration: 1.1, start: 'top 80%' });
    gsap.fromTo(
      '.polaroid__img',
      { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.18 },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        scale: 1,
        duration: 1.3,
        ease: 'expo.out',
        clearProps: 'clipPath',
        scrollTrigger: { trigger: '.about__photo', start: 'top 80%', once: true },
      },
    );

    // Heading: label, then the line, then the script word written in.
    const heading = gsap.timeline({ scrollTrigger: { trigger: '.about__copy', start: 'top 80%', once: true } });
    heading
      .add(enter('.about__copy .pill', { y: 12 }, { duration: 0.6 }))
      .add(enter('.about__hey', { y: 20 }, { duration: 0.8 }), '-=0.35')
      .add(wipeIn('.about__name', { duration: 0.8 }), '-=0.45')
      .add(drawIn('.about__heart path', { duration: 0.7 }), '-=0.35')
      .add(drawIn('.about__sparks path', { duration: 0.5, stagger: 0.08 }), '<');

    // Body copy brightens word by word as it scrolls up to reading height;
    // it is fully opaque well before it reaches the middle of the screen.
    const { words } = SplitText.create('.about__text', { type: 'words' });
    gsap.fromTo(
      words,
      { opacity: 0.18 },
      {
        opacity: 1,
        ease: 'none',
        stagger: 0.05,
        scrollTrigger: { trigger: '.about__text', start: 'top 88%', end: 'bottom 62%', scrub: 0.5 },
      },
    );

    revealUp('.about__hand', { start: 'top 92%', from: { y: 12 } });
    drawIn('.about__underline path', {
      delay: 0.3,
      scrollTrigger: { trigger: '.about__hand', start: 'top 92%', once: true },
    });

    // Skills: label, then the tiles in reading order.
    revealUp('.skills__title', { from: { y: 16 }, start: 'top 85%' });
    drawIn('.skills__burst path', {
      stagger: 0.08,
      delay: 0.2,
      scrollTrigger: { trigger: '.skills__title', start: 'top 85%', once: true },
    });
    revealTiles('.skill', { trigger: '.skills__grid', start: 'top 85%' });

    // The sparks by the photo keep a slow, small drift.
    idle('.about__sparks', { y: -4, rotation: '+=6', duration: 2.4, delay: 1.5 });
  });

  return (
    <section ref={ref} id="about" className="about section--cream" aria-labelledby="about-title">
      <div className="about__grid">
        <Reveal className="about__photo">
          <figure className="polaroid">
            <span className="polaroid__tape" aria-hidden="true" />
            <img
              className="polaroid__img"
              src={aboutPortrait}
              alt="Boubaker Boulaid smiling slightly, photographed against a pale sky"
              width="436"
              height="399"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <Sparks className="about__sparks" />
        </Reveal>

        <Reveal className="about__copy">
          <Pill tone="lavender">About Me</Pill>
          <h2 id="about-title" className="about__title">
            <span className="about__hey">Get to Know</span>{' '}
            <span className="about__name">
              Me
              <Heart className="about__heart" />
            </span>
          </h2>
          <p className="about__text">
            I’m a Full-Stack Developer specialising in <strong>Laravel</strong> and{' '}
            <strong>React</strong>. During my internship at HOUATNOUR I shipped a 47-endpoint REST
            API that replaced spreadsheets and paper logs. I hold a Diploma in Digital Development
            (OFPPT) and speak Arabic, Tamazight, English and French.
          </p>
          <p className="about__hand">
            Let’s build something amazing!
            <Underline className="about__underline" />
          </p>
        </Reveal>

        <Reveal className="skills" id="skills">
          <h2 className="skills__title">
            <Pill tone="dark" size="lg">
              My Skills
            </Pill>
            <Burst className="skills__burst" />
          </h2>
          <ul className="skills__grid">
            {skills.map(({ name, logo }) => (
              <li key={name} className="skill">
                <img className="skill__logo" src={logo} alt="" width="40" height="40" loading="lazy" />
                <span className="skill__name">{name}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
