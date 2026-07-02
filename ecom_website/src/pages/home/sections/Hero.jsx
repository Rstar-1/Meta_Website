import React, { useState } from 'react';
import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';
import background from '../../../assets/background.png';
import Icon from '../../../components/common/Icon';
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
      icon: <Icon name="Shield" width="16" height="16" stroke="var(--primary)" />,
      title: 'Trusted by',
      subtitle: 'Millions'
    },
    {
      id: 2,
      icon: <Icon name="Network" width="16" height="16" stroke="var(--primary)" />,
      title: 'Huge Network of',
      subtitle: 'Businesses'
    },
    {
      id: 3,
      icon: <Icon name="Grow" width="16" height="16" stroke="var(--primary)" />,
      title: 'Find. Connect.',
      subtitle: 'Grow.'
    }
  ];

  return (
    <Container className='h-500 sm-h-700 py-40 flex items-center' style={{ background: `linear-gradient(rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.54)), url(${background})`, backgroundPosition: 'right', backgroundSize: 'cover' }}>
      <div className="w-full">
        <h1 className="large-text text-white font-700 uppercase">
          India's No. 1<br />
          Local Business Discovery Platform
        </h1>

        {/* Badges Row */}
        <div className="flex sm-flex-wrap items-center gap-12 mt-30">
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
        <form className="flex md-grid-cols-1 sm-grid-cols-1 items-center gap-12 mt-15 bg-white py-12 px-16 sm-px-1 rounded-10 w-70 md-w-full sm-w-full" onSubmit={handleSearchSubmit}>

          <div className="flex items-center gap-12 w-20 md-w-full sm-w-full">
            <Icon name="Grid" width="20" height="20" stroke="var(--primary)" />
            <select className='h-input border-0 bg-forth w-full'
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

          <div className="flex items-center gap-12 w-45 md-w-full sm-w-full">
            <Icon name="Search" width="20" height="20" stroke="var(--primary)" />
            <input
              type="text"
              className="h-input border-0 bg-forth w-full"
              placeholder="What are you looking for?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-12 w-20 md-w-full sm-w-full">
            <Icon name="MapPin" width="20" height="20" stroke="var(--primary)" />
            <select
              className="h-input border-0 bg-forth w-full"
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

          <div className="w-15 md-w-full sm-w-full">
            <Button
              type="submit"
              text="Apply Filters"
              bg="primary"
              version='v3'
              className="w-full"
            />
          </div>
        </form>

        {/* Popular Searches */}
        <div className="flex sm-flex-wrap items-center gap-12 mt-26">
          <p className="para-text text-white font-500">Popular Searches:</p>
          {popularSearches.map((tag, index) => (
            <p
              key={index}
              className='bg-transparent small-text text-white px-20 py-4 rounded-10 border-white'
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
