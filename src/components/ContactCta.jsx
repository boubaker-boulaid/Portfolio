import Button from './ui/Button.jsx';
import Reveal from './ui/Reveal.jsx';
import { PaperPlane, Scribble } from './ui/Doodles.jsx';
import { mailto } from '../data/site.js';
import './ContactCta.css';

export default function ContactCta() {
  return (
    <section id="lets-talk" className="cta" aria-labelledby="cta-title">
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
