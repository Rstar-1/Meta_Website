import React from 'react';
import { popularProducts } from '../data/home4Data';

const PopularProducts = ({ onViewProduct }) => {
  return (
    <section className="home4-products-section">
      <div className="products-container">
        <div className="section-header">
          <h2 className="section-title">Popular Products</h2>
          <a href="#all-products" className="view-all-link">
            View All Products ➔
          </a>
        </div>

        <div className="products-slider-wrapper">
          <div className="products-grid">
            {popularProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-img-box">
                  <img src={product.image} alt={product.name} loading="lazy" />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <span className="listing-count">{product.listings}</span>
                  <button 
                    className="view-btn"
                    onClick={() => onViewProduct && onViewProduct(product.name)}
                  >
                    View Products
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="carousel-nav-btn" aria-label="Next items">
            ➔
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
