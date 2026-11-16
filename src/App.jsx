import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Impact from './components/Impact.jsx';
import Contact from './components/Contact.jsx';
import ContactCta from './components/ContactCta.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
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
