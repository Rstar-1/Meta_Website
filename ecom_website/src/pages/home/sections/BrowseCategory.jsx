import React from 'react';
import { categories } from '../data/home4Data';

const BrowseCategory = ({ onSelectCategory }) => {
  return (
    <section className="home4-categories-section">
      <div className="section-header">
        <h2 className="section-title">Browse by Category</h2>
        <a href="#all-categories" className="view-all-link">
          View All Categories ➔
        </a>
      </div>

      <div className="categories-grid">
        {categories.map((cat) => (
          <div 
            key={cat.id} 
            className="category-card"
            onClick={() => onSelectCategory && onSelectCategory(cat.name)}
          >
            <div className={`icon-circle cat-bg-${cat.id}`}>
              {cat.icon}
            </div>
            <span className="category-name">{cat.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrowseCategory;
