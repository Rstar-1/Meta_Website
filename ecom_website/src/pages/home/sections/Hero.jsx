import React, { useState } from 'react';
import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';
import background from '../../../assets/background.png'

const GridIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width='20' height='20' stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width='20' height='20' stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width='20' height='20' stroke="var(--primary)" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 11 2 2 4-4" />
  </svg>
);

const NetworkIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const GrowIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="19" y1="8" x2="19" y2="14" />
    <line x1="16" y1="11" x2="22" y2="11" />
  </svg>
);

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
  ];

  const badges = [
    {
      id: 1,
      icon: <ShieldIcon />,
      title: 'Trusted by',
      subtitle: 'Millions'
    },
    {
      id: 2,
      icon: <NetworkIcon />,
      title: 'Huge Network of',
      subtitle: 'Businesses'
    },
    {
      id: 3,
      icon: <GrowIcon />,
      title: 'Find. Connect.',
      subtitle: 'Grow.'
    }
  ];

  return (
    <Container className='h-500 flex items-center' style={{ background: `linear-gradient(rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.54)), url(${background})`, backgroundPosition: 'right' }}>
      <div className="w-full">
        <h1 className="large-text text-white font-700 uppercase">
          India's No. 1<br />
          Local Business Discovery Platform
        </h1>

        {/* Badges Row */}
        <div className="flex items-center gap-12 mt-30">
          {badges.map((badge) => (
            <div key={badge.id} className="flex items-center gap-12 mr-18">
              <div className="icon-lg bg-white rounded-5">
                {badge.icon}
              </div>
              <div className="block">
                <p className="text-white small-text font-500">{badge.title}</p>
                <p className="text-white mini-text">{badge.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Search Form */}
        <form className="flex items-center gap-12 mt-15 bg-white py-12 px-16 rounded-10 w-65" onSubmit={handleSearchSubmit}>

          <div className="flex items-center gap-12 w-20">
            <GridIcon />
            <select className='h-input border-0 bg-forth'
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

          <div className="flex items-center gap-12 w-45">
            <SearchIcon />
            <input
              type="text"
              className="h-input border-0 bg-forth"
              placeholder="What are you looking for?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-12 w-20">
            <MapPinIcon />
            <select
              className="h-input border-0 bg-forth"
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

          <div className="w-15">
            <Button
              type="submit"
              text="Apply Filters"
              bg="primary"
              version='v3'
            />
          </div>
        </form>

        {/* Popular Searches */}
        <div className="flex items-center gap-12 mt-26">
          <p className="para-text text-white font-500">Popular Searches:</p>
          {popularSearches.map((tag, index) => (
            <p
              className='bg-transparent small-text text-white px-20 py-4 rounded-10'
            >
              {tag}
            </p>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Hero;
