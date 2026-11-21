import Link from '../components/ui/Link.jsx';

export default function NotFound() {
  return (
    <section className="container not-found" aria-labelledby="nf-title">
      <h1 id="nf-title" className="section-title">This page doesn’t exist</h1>
      <p className="section-text">The link may be old, or the project may have moved.</p>
      <Link className="btn btn--md" to="/#projects">
        <span>See all projects</span>
      </Link>
    </section>
  );
}
