import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Icon from '../../../components/common/Icon';

const LatestArticles = () => {
  const navigate = useNavigate();

  const articles = [
    {
      id: 1,
      image: "https://demo.alhikmahsoft.com/template/stir/assets/images/blog-3.jpg",
      tags: ["Branding", "Development", "Marketing", "3 Min Read"],
      title: "Improving user experience (UX) and user interface (UI) design on websites, apps,"
    },
    {
      id: 2,
      image: "https://demo.alhikmahsoft.com/template/stir/assets/images/blog-4.jpg",
      tags: ["Branding", "Development", "Marketing", "3 Min Read"],
      title: "Creating chatbot solutions for websites and social media platforms to automate customer,"
    }
  ];

  return (
    <section className="bg-white py-80 sm-py-60" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <style>{`
        @keyframes scrollMarqueeBlog {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-blog-container {
          overflow: hidden;
          white-space: nowrap;
          width: 100%;
          background: #ffffff;
          padding: 30px 0;
          border-top: 1px solid #eeeeee;
          border-bottom: 1px solid #eeeeee;
        }
        .marquee-blog-content {
          display: inline-block;
          animation: scrollMarqueeBlog 20s linear infinite;
        }
        .marquee-blog-text {
          font-size: 80px;
          font-weight: 800;
          color: transparent;
          -webkit-text-stroke: 1px #dddddd;
          margin-right: 50px;
          text-transform: uppercase;
        }
        .blog-card {
          border-radius: 24px;
          overflow: hidden;
          background: #ffffff;
          box-shadow: 0 10px 30px rgba(0,0,0,0.02);
          transition: all 0.4s ease;
        }
        .blog-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.08);
        }
        .blog-img-wrap {
          position: relative;
          overflow: hidden;
          border-radius: 24px;
        }
        .blog-img {
          transition: transform 0.6s ease;
        }
        .blog-card:hover .blog-img {
          transform: scale(1.05);
        }
      `}</style>

      {/* Marquee Banner */}
      <div className="marquee-blog-container mb-80">
        <div className="marquee-blog-content">
          <span className="marquee-blog-text">OUR LATEST ARTICLES • </span>
          <span className="marquee-blog-text">OUR LATEST ARTICLES • </span>
          <span className="marquee-blog-text">OUR LATEST ARTICLES • </span>
          <span className="marquee-blog-text">OUR LATEST ARTICLES • </span>
        </div>
      </div>

      <Container version="v1">
        <div className="grid-cols-2 md-grid-cols-1 sm-grid-cols-1 gap-40">
          {articles.map((item) => (
            <div key={item.id} className="blog-card flex flex-column gap-20 p-15 border border-ec">
              <div className="blog-img-wrap">
                <Image
                  src={item.image}
                  alt={item.title}
                  className="w-full object-cover blog-img"
                  style={{ height: '320px' }}
                />
              </div>
              <div className="px-10 pb-10">
                <div className="flex flex-wrap gap-8 mb-15">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="bg-forth text-gray font-500 mini-text px-12 py-4 rounded-5">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 
                  onClick={() => navigate('/blog')}
                  className="text-dark font-600 leading-snug hover:text-primary transition-colors cursor-pointer mb-20" 
                  style={{ fontSize: '20px' }}
                >
                  {item.title}
                </h3>
                <a
                  href="/blog"
                  className="flex items-center gap-8 font-600 text-dark hover:text-primary transition-all small-text"
                  style={{ textDecoration: 'none' }}
                >
                  <span>Read Article</span>
                  <Icon name="ArrowRight" width="14" height="14" stroke="currentColor" strokeWidth="2.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default LatestArticles;
