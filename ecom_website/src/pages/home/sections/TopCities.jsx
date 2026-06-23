import React, { useState } from 'react';
import { cities } from '../data/home4Data';

const TopCities = ({ onCitySelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="home4-cities-section">
      <div className="cities-container">
        <div className={`cities-grid ${isExpanded ? 'expanded' : ''}`}>
          {cities.map((city, idx) => (
            <a 
              key={idx} 
              href={`#city-${city.toLowerCase()}`}
              className="city-link"
              onClick={(e) => {
                e.preventDefault();
                if (onCitySelect) onCitySelect(city);
              }}
            >
              {city}
            </a>
          ))}
        </div>

        <button className="cities-toggle-btn" onClick={handleToggle}>
          {isExpanded ? 'View Less Cities ▲' : 'View All Cities ▼'}
        </button>
      </div>
    </section>
  );
};

export default TopCities;
