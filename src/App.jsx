import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Impact from './components/Impact.jsx';
import Contact from './components/Contact.jsx';
import ContactCta from './components/ContactCta.jsx';
import Footer from './components/Footer.jsx';
import ScrollProgress from './components/ui/ScrollProgress.jsx';
import { useSmoothScroll } from './motion/useSmoothScroll.js';
import { useMagnetic } from './motion/useMagnetic.js';

export default function App() {
  useSmoothScroll();
  useMagnetic();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Impact />
        <Contact />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
