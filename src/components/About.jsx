import Pill from './ui/Pill.jsx';
import Reveal from './ui/Reveal.jsx';
import { Burst, Heart, Sparks, Underline } from './ui/Doodles.jsx';
import { skills } from '../data/skills.js';
import { site } from '../data/site.js';
import aboutPortrait from '../assets/portraits/about-portrait.webp';
import './About.css';

export default function About() {
  return (
    <section id="about" className="about section--cream" aria-labelledby="about-title">
      <div className="about__grid">
        <Reveal className="about__photo">
          <figure className="polaroid">
            <span className="polaroid__tape" aria-hidden="true" />
            <img
              className="polaroid__img"
              src={aboutPortrait}
              alt="Boubaker smiling slightly, photographed against a pale sky"
              width="436"
              height="399"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <Sparks className="about__sparks" />
        </Reveal>

        <Reveal className="about__copy" delay={80}>
          <Pill tone="lavender">About Me</Pill>
          <h2 id="about-title" className="about__title">
            <span className="about__hey">Hey, I’m</span>{' '}
            <span className="about__name">
              {site.name}
              <Heart className="about__heart" />
            </span>
          </h2>
          <p className="about__text">
            I’m a passionate Full-Stack Developer with a strong focus on <strong>Laravel</strong>. I
            love building clean, scalable and user-friendly web applications.
          </p>
          <p className="about__hand">
            Let’s build something amazing!
            <Underline className="about__underline" />
          </p>
        </Reveal>

        <Reveal className="skills" id="skills" delay={160}>
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
