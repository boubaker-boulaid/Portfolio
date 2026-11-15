import Button from './ui/Button.jsx';
import Pill from './ui/Pill.jsx';
import Icon from './ui/Icon.jsx';
import Reveal from './ui/Reveal.jsx';
import ArticleThumb from './ArticleThumb.jsx';
import { articles, blogUrl } from '../data/articles.js';
import './Blog.css';

const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

function ArticleCard({ article, delay }) {
  const { title, date, thumb, image, url } = article;
  return (
    <Reveal as="li" delay={delay}>
      <article className="article on-cream">
        <div className="article__media">
          {image ? <img src={image} alt="" loading="lazy" decoding="async" /> : <ArticleThumb type={thumb} />}
        </div>
        <div className="article__panel">
          <time className="article__date" dateTime={date}>
            {formatDate(date)}
          </time>
          <h3 className="article__title">
            <a href={url}>{title}</a>
          </h3>
          <span className="article__more" aria-hidden="true">
            Read More
            <Icon name="arrow-right" />
          </span>
        </div>
      </article>
    </Reveal>
  );
}

export default function Blog() {
  return (
    <section id="blog" className="blog" aria-labelledby="blog-title">
      <div className="blog__inner">
        <Reveal className="blog__intro">
          <Pill>My Blog</Pill>
          <h2 id="blog-title" className="section-title blog__title">
            Latest Articles
          </h2>
          <p className="section-text blog__text">Tips, tutorials and insights about development.</p>
          <Button size="sm" className="blog__more" href={blogUrl}>
            View All Articles
          </Button>
        </Reveal>

        <ul className="blog__grid">
          {articles.map((article, i) => (
            <ArticleCard key={article.id} article={article} delay={i * 90} />
          ))}
        </ul>
      </div>
    </section>
  );
}
