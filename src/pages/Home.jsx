import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import Projects from '../components/Projects.jsx';
import Impact from '../components/Impact.jsx';
import Contact from '../components/Contact.jsx';
import ContactCta from '../components/ContactCta.jsx';

/** The one-page home: every section the nav links to. */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Impact />
      <Contact />
      <ContactCta />
    </>
  );
}
