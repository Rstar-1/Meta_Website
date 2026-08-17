import React from 'react';
import { blogData } from '../home4Data';

const LatestBlog = () => {
  return (
    <section className="babet-blog-section" id="blog">
      <div className="babet-container">
        {/* Header */}
        <div className="babet-section-header">
          <span className="babet-badge">Articles & Tips</span>
          <h2 className="babet-section-title">Latest Pet Care Blog</h2>
          <p className="babet-section-subtitle">
            Expert guidance, health advice, and grooming tips to keep your furry friends happy and thriving.
          </p>
        </div>

        {/* 3 Blog Cards */}
        <div className="babet-blog-grid">
          {blogData.map((article) => (
            <div className="babet-blog-card" key={article.id}>
              <img src={article.image} alt={article.title} className="babet-blog-img" />
              <div className="babet-blog-content">
                <div className="babet-blog-meta">
                  <span>✍️ {article.author}</span>
                  <span>📅 {article.date}</span>
                </div>
                <h3 className="babet-blog-title">{article.title}</h3>
                <p style={{ fontSize: '13.5px', color: 'var(--babet-muted)', marginBottom: '18px', lineHeight: '1.6' }}>
                  {article.excerpt}
                </p>
                <a href="#blog" style={{ color: 'var(--babet-orange)', fontWeight: '700', fontSize: '14px', textDecoration: 'none' }}>
                  Read Article ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestBlog;
