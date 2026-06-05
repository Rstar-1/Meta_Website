import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import blogs from '../../data/blogs.json'
import { formatDate } from '../../utils/formatDate'
import SeoHelmet from '../../components/seo/SeoHelmet'
import BlogSchema from '../../components/seo/BlogSchema'

const BlogDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const post = blogs.find(b => b.id === id) || blogs[0];

  return (
    <div className="post-container">
      <SeoHelmet 
        title={post.title}
        description={post.summary}
        keywords={post.keywords}
        image={post.image}
        path={`/blog/${post.slug}`}
        type="article"
      />
      <BlogSchema post={post} />

      <style>{`
        .post-container {
          padding: 50px 30px;
          max-width: 800px;
          margin: 0 auto;
          font-family: 'Outfit', sans-serif;
        }
        .back-btn {
          background: transparent;
          border: none;
          color: #aa3bff;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 30px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .post-header {
          margin-bottom: 35px;
          text-align: center;
        }
        .post-date {
          color: #aa3bff;
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 12px;
          display: block;
        }
        .post-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #08060d;
          line-height: 1.25;
          margin-bottom: 20px;
        }
        .author-box {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #08060d;
          font-weight: 500;
          background: #faf9fb;
          border: 1px solid #e5e4e7;
          padding: 6px 15px;
          border-radius: 99px;
        }
        .post-hero-image {
          height: 380px;
          background: linear-gradient(135deg, rgba(170, 59, 255, 0.1), rgba(99, 102, 241, 0.1));
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 7rem;
          margin-bottom: 40px;
        }
        .post-content {
          color: #6b6375;
          font-size: 1.1rem;
          line-height: 1.8;
        }
        .post-content p {
          margin-bottom: 25px;
        }
        @media (max-width: 768px) {
          .post-title { font-size: 1.85rem; }
          .post-hero-image { height: 240px; font-size: 5rem; }
        }
      `}</style>

      <button className="back-btn" onClick={() => navigate('/blog')}>
        ← Back to Insights
      </button>

      <article>
        <header className="post-header">
          <span className="post-date">{formatDate(post.datePublished, 'human')}</span>
          <h1 className="post-title">{post.title}</h1>
          <div className="author-box">
            <span>✍️</span>
            <span>By {post.authorName}</span>
          </div>
        </header>

        <div className="post-hero-image">
          {post.id === 'post-1' ? '🤖' : '⚙️'}
        </div>

        <div className="post-content">
          <p><strong>{post.summary}</strong></p>
          <p>{post.description}</p>
          <p>
            Standardizing automation lines is key to managing capital expenditure and reducing operational friction. Metatech engineers work alongside corporate integration partners to verify PLC protocols, design mounting armatures, and validate custom firmware versions prior to mechanical shipment.
          </p>
        </div>
      </article>
    </div>
  )
}

export default BlogDetail
