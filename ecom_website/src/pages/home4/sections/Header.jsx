import React, { useState } from 'react';

const Header = ({ onSearch, onCategorySelect, activeSubNav }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Delhi');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ query: searchQuery, location: selectedLocation });
    }
  };

  const subNavItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'categories', label: 'Categories', icon: '📂' },
    { id: 'products', label: 'Products', icon: '📦' },
    { id: 'companies', label: 'Companies', icon: '🏢' },
    { id: 'services', label: 'Services', icon: '🛠️' },
    { id: 'deals', label: 'Deals', icon: '🏷️', isNew: true },
    { id: 'jdsocial', label: 'JD Social', icon: '💬' }
  ];

  return (
    <header className="home4-header-container">
      <div className="home4-top-nav">
        <div className="logo-section">
          Just<span>dial</span>
        </div>

        <form className="search-bar-wrapper" onSubmit={handleSubmit}>
          <select 
            className="location-select" 
            value={selectedLocation} 
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
            <option value="Hyderabad">Hyderabad</option>
          </select>
          <input 
            type="text" 
            className="search-input" 
            placeholder="What are you looking for?" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>

        <nav className="nav-links">
          <a href="#advertise" className="nav-link-item">Advertise</a>
          <a href="#login" className="nav-link-item">Login / Sign Up</a>
          <a href="#list-business" className="business-badge">For Business</a>
        </nav>
      </div>

      <nav className="home4-sub-nav">
        <ul className="sub-nav-list">
          {subNavItems.map((item) => (
            <li 
              key={item.id} 
              className={`sub-nav-item ${activeSubNav === item.id ? 'active' : ''}`}
              onClick={() => onCategorySelect && onCategorySelect(item.id)}
            >
              <span>{item.icon}</span>
              {item.label}
              {item.isNew && <span className="badge-new">New</span>}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
