import { useLayoutEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ScrollProgress from './components/ui/ScrollProgress.jsx';
import Home from './pages/Home.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import NotFound from './pages/NotFound.jsx';
import { findProject } from './data/projects.js';
import { takePendingScroll, usePath } from './router.js';
import { ScrollTrigger } from './motion/gsap.js';
import { jumpTo, scrollToHash, useSmoothScroll } from './motion/useSmoothScroll.js';
import { useMagnetic } from './motion/useMagnetic.js';

/** Which page a path shows: '/', '/projects/<slug>', or not found. */
function route(path) {
  if (path === '/' || path === '/index.html') return { page: 'home' };
  const match = path.match(/^\/projects\/([\w-]+)\/?$/);
  const project = match && findProject(match[1]);
  return project ? { page: 'project', project } : { page: 'missing' };
}

export default function App() {
  useSmoothScroll();
  useMagnetic();

  const path = usePath();
  const current = route(path);

  // After a page change: land where the navigation asked (top, a section, or
  // the position Back/Forward remembered), then re-measure every trigger.
  useLayoutEffect(() => {
    const next = takePendingScroll();
    if (next?.hash) {
      if (!scrollToHash(next.hash, { immediate: true })) jumpTo(next.top ?? 0);
    } else if (next) {
      jumpTo(next.top ?? 0);
    }
    ScrollTrigger.refresh();
  }, [path]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar onHome={current.page === 'home'} />
      <main id="main">
        {current.page === 'home' && <Home />}
        {current.page === 'project' && <ProjectDetail key={current.project.slug} project={current.project} />}
        {current.page === 'missing' && <NotFound />}
      </main>
      <Footer />
    </>
  );
}
