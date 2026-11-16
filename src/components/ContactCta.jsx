import Button from './ui/Button.jsx';
import Reveal from './ui/Reveal.jsx';
import { PaperPlane, Scribble } from './ui/Doodles.jsx';
import { mailto } from '../data/site.js';
import { gsap } from '../motion/gsap.js';
import { useMotion } from '../motion/useMotion.js';
import { drawIn, enter, idle } from '../motion/presets.js';
import './ContactCta.css';

export default function ContactCta() {
  // The closing note: the card settles, the plane glides in, the word is underlined.
  const ref = useMotion(() => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: '.cta__card', start: 'top 88%', once: true } });
    tl.add(enter('.cta__card', { y: 30, scale: 0.98 }, { duration: 1 }))
      .add(enter('.cta__plane', { x: -36, y: 14 }, { duration: 1.1, ease: 'power2.out' }), 0.15)
      .add(enter(['.cta__title', '.cta__text', '.cta__button'], { y: 16 }, { stagger: 0.09, duration: 0.8 }), 0.25)
      .add(drawIn('.cta__scribble path', { duration: 0.7 }), 0.75)
      // Then the plane keeps gliding, very gently.
      .add(idle('.cta__plane', { y: -6, x: 4, duration: 3 }), '+=0.2');
  });

  return (
    <section ref={ref} id="lets-talk" className="cta" aria-labelledby="cta-title">
      <div className="container">
        <Reveal className="cta__card">
          <PaperPlane className="cta__plane" />
          <h2 id="cta-title" className="cta__title">
            Let’s Work{' '}
            <span className="cta__together">
              Together
              <Scribble className="cta__scribble" />
            </span>
          </h2>
          <p className="cta__text">Have a project in mind? Let’s turn your ideas into reality.</p>
          <Button className="cta__button" href={mailto}>
            Get In Touch
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
