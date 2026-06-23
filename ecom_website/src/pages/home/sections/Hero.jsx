import React, { useState } from 'react';

const Hero = ({ onSearch }) => {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('Delhi');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ category, query, location });
    }
  };

  const popularSearches = [
    'AC Repair',
    'Home Services',
    'Doctors',
    'Packers And Movers',
    'Salons',
    'Dentists',
    'Interior Designers'
  ];

  return (
    <section className="hero-section"
      style={{
        position: "relative",
        background: "linear-gradient(rgba(11, 26, 48, 0.75), rgba(11, 26, 48, 0.85)), url('https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1200&auto=format&fit=crop') no-repeat center center/cover",
        padding: "100px 6% 120px",
        color: "#fff",
        textAlign: "center"
      }}
    >
      <div className="hero-content-box">
        <h1 className="large-text text-white">
          India's No. 1<br />Local Business Discovery Platform
        </h1>

        <div className="grid-cols-5 gap-12">
          <div className="flex justify-center items-center bg-white rounded-20 p-6">
            <span className="badge-icon">🛡️</span>
            <span>Trusted by Millions</span>
          </div>
          <div className="flex justify-center items-center bg-white rounded-20 p-6">
            <span className="badge-icon">💼</span>
            <span>Huge Network of Businesses</span>
          </div>
          <div className="flex justify-center items-center bg-white rounded-20 p-6">
            <span className="badge-icon">📈</span>
            <span>Find. Connect. Grow.</span>
          </div>
        </div>

        <form className="hero-search-container" onSubmit={handleSearchSubmit}>
          <div className="search-group">
            <select
              className="select-input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Doctors">Doctors</option>
              <option value="Restaurants">Restaurants</option>
              <option value="Home Services">Home Services</option>
              <option value="Electronics">Electronics</option>
            </select>
          </div>

          <div className="search-group">
            <input
              type="text"
              className="text-input"
              placeholder="What are you looking for?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="search-group">
            <select
              className="select-input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Chennai">Chennai</option>
              <option value="Hyderabad">Hyderabad</option>
            </select>
          </div>

          <button type="submit" className="hero-search-btn">
            Search
          </button>
        </form>

        <div className="popular-searches-box">
          <span className="popular-title">Popular Searches:</span>
          {popularSearches.map((tag, index) => (
            <a
              key={index}
              href={`#search-${tag.toLowerCase().replace(/\s+/g, '-')}`}
              className="tag-item"
            >
              {tag}
            </a>
          ))}
          <button className="next-arrow-btn" aria-label="Next searches">
            ➔
          </button>
        </div>
      </div>
    </section >
  );
};

export default Hero;
