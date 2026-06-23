import React from 'react';
import { articles } from '../data/home4Data';

const LatestArticles = ({ onArticleClick }) => {
  // Helper to format tags into CSS classes
  const getTagClass = (tag) => {
    return `article-tag tag-${tag.toLowerCase().replace(/\s+/g, '-')}`;
  };

  return (
    <section className="home4-articles-section">
      <div className="section-header">
        <h2 className="section-title">Latest from Justdial</h2>
        <a href="#articles-all" className="view-all-link">
          View All Articles ➔
        </a>
      </div>

      <div className="articles-grid">
        {articles.map((article) => (
          <article 
            key={article.id} 
            className="article-card"
            onClick={() => onArticleClick && onArticleClick(article)}
          >
            <div className="article-img-box">
              <img src={article.image} alt={article.title} loading="lazy" />
            </div>

            <div className="article-details">
              <span className={getTagClass(article.tag)}>
                {article.tag}
              </span>
              <h3 className="article-title">{article.title}</h3>
              <div className="article-meta">
                <span>{article.date}</span>
                <span>•</span>
                <span>{article.readTime}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default LatestArticles;
