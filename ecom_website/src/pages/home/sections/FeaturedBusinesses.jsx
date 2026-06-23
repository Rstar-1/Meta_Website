import React from 'react';
import { featuredBusinesses } from '../data/home4Data';

const FeaturedBusinesses = ({ onCallBusiness }) => {
  return (
    <section className="home4-featured-section">
      <div className="featured-container">
        <div className="section-header">
          <h2 className="section-title">Featured Businesses</h2>
          <a href="#featured-all" className="view-all-link">
            View All ➔
          </a>
        </div>

        <div className="featured-grid-wrapper">
          <div className="featured-grid">
            {featuredBusinesses.map((biz) => (
              <div key={biz.id} className="biz-card">
                <div className="biz-img-wrapper">
                  <img src={biz.image} alt={biz.name} loading="lazy" />
                  <div className="biz-logo-overlay">
                    <span>{biz.logo}</span>
                  </div>
                </div>

                <div className="biz-details">
                  <h3 className="biz-name">{biz.name}</h3>
                  <span className="biz-cat">{biz.category}</span>
                  
                  <div className="rating-row">
                    <span className="rating-num">{biz.rating}</span>
                    <span className="rating-stars">★★★★★</span>
                    <span className="rating-count">({biz.reviews})</span>
                  </div>

                  <div className="location-info">
                    <span>📍</span> {biz.location}
                  </div>

                  <button 
                    className="call-btn"
                    onClick={() => onCallBusiness && onCallBusiness(biz)}
                  >
                    Call Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="carousel-nav-btn" aria-label="Next featured items">
            ➔
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBusinesses;
