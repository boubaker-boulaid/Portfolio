import { useState } from 'react';
import Button from './ui/Button.jsx';
import Pill from './ui/Pill.jsx';
import Icon from './ui/Icon.jsx';
import Reveal from './ui/Reveal.jsx';
import { mailto, site, tel } from '../data/site.js';
import { useMotion } from '../motion/useMotion.js';
import { revealUp } from '../motion/presets.js';
import './Contact.css';

const EMPTY = { name: '', email: '', subject: '', message: '' };

/*
 * Without a `formEndpoint` in site.js the form opens the visitor's email app
 * with the message filled in, so it works on a static host with no backend.
 * With one (e.g. Formspree), it posts the fields as JSON and shows the result.
 */
async function send(fields) {
  if (!site.formEndpoint) {
    const subject = fields.subject || `Portfolio contact from ${fields.name}`;
    const body = `${fields.message}\n\n— ${fields.name} (${fields.email})`;
    window.location.href = `${mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    return 'mail-app';
  }

  const response = await fetch(site.formEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(fields),
  });
  if (!response.ok) throw new Error(`Form endpoint answered ${response.status}`);
  return 'sent';
}

const STATUS_TEXT = {
  sending: 'Sending…',
  sent: 'Thanks! Your message is on its way. I’ll get back to you soon.',
  'mail-app': 'Your email app should open with the message ready — just press send.',
  error: `Something went wrong. Please email me directly at ${site.email}.`,
};

export default function Contact() {
  const [fields, setFields] = useState(EMPTY);
  const [status, setStatus] = useState('idle');

  const ref = useMotion(() => {
    revealUp('.contact__intro > *', { trigger: '.contact__intro', start: 'top 80%' });
    revealUp('.contact__details li', { trigger: '.contact__details', start: 'top 90%', delay: 0.2, stagger: 0.07 });
    revealUp('.contact__form', { y: 48, duration: 1.1, start: 'top 82%' });
    revealUp('.contact__form > *', { trigger: '.contact__form', start: 'top 82%', y: 16, delay: 0.25, stagger: 0.07 });
  });

  const update = (event) => setFields((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus('sending');
    try {
      const result = await send(fields);
      setStatus(result);
      if (result === 'sent') setFields(EMPTY);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section ref={ref} id="contact" className="contact" aria-labelledby="contact-title">
      <div className="contact__inner">
        <Reveal className="contact__intro">
          <Pill>Contact</Pill>
          <h2 id="contact-title" className="section-title contact__title">
            Send Me a Message
          </h2>
          <p className="section-text contact__text">
            Have a project, an internship or a job offer? I usually reply within a day.
          </p>
          <ul className="contact__details">
            <li>
              <Icon name="mail" />
              <a href={mailto}>{site.email}</a>
            </li>
            <li>
              <Icon name="phone" />
              <a href={tel}>{site.phone}</a>
            </li>
            <li>
              <Icon name="pin" />
              <span>
                {site.location}
                <small>{site.availability}</small>
              </span>
            </li>
          </ul>
        </Reveal>

        <Reveal className="contact__formwrap">
          <form className="contact__form on-cream" onSubmit={onSubmit}>
            <div className="contact__row">
              <label className="field">
                <span className="field__label">Name</span>
                <input
                  className="field__input"
                  name="name"
                  autoComplete="name"
                  required
                  value={fields.name}
                  onChange={update}
                />
              </label>
              <label className="field">
                <span className="field__label">Email</span>
                <input
                  className="field__input"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={fields.email}
                  onChange={update}
                />
              </label>
            </div>
            <label className="field">
              <span className="field__label">
                Subject <span className="field__optional">(optional)</span>
              </span>
              <input className="field__input" name="subject" value={fields.subject} onChange={update} />
            </label>
            <label className="field">
              <span className="field__label">Message</span>
              <textarea
                className="field__input field__input--area"
                name="message"
                rows="5"
                required
                minLength={10}
                value={fields.message}
                onChange={update}
              />
            </label>

            <div className="contact__footer">
              <Button type="submit" icon="arrow-right" disabled={status === 'sending'}>
                Send Message
              </Button>
              <p
                className={`contact__status contact__status--${status}`}
                role={status === 'error' ? 'alert' : 'status'}
              >
                {STATUS_TEXT[status] ?? ''}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
