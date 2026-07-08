import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';
const background = "/background.png";
import Icon from '../../../components/common/Icon';
import Fields from '../../../components/common/Fields';
import categoriesData from '../../../data/category.json';

const Hero = ({ onSearch }) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('Delhi');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ category, query, location });
    }
    navigate(`/products?category=${category}&search=${query}&city=${location}`, {
      state: { category, search: query, city: location }
    });
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
    <Container
      className='h-500 sm-h-700 py-40 flex items-center relative overflow-hidden'
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none'
        }}
      >
        <img
          src={background}
          alt="Hero Background"
          loading="eager"
          fetchPriority="high"
          width="1920"
          height="500"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'right' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.54))',
            zIndex: 1
          }}
        />
      </div>

      <div className="w-full relative z-10">
        <h1 className="large-text text-white font-700 uppercase">
          India's No. 1<br />
          Local Business Discovery Platform
        </h1>

        <div className="flex sm-flex-wrap items-center gap-12 mt-22 sm-mt-12">
          {badges.map((badge) => (
            <div key={badge.id} className="flex items-center gap-12 mr-18 sm-mr-10">
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

        <form className="mt-25 bg-white w-70 md-w-full sm-w-full rounded-10" onSubmit={handleSearchSubmit}>
          <div className='flex md-grid-cols-1 sm-grid-cols-1 items-center gap-12 py-12 sm-py-15 px-16 sm-px-16'>
            <div className="flex items-center gap-12 w-20 md-w-full sm-w-full">
              <Icon name="Grid" width="20" height="20" stroke="var(--primary)" />
              <Fields
                type="select"
                options={[
                  { label: 'All Categories', value: 'All' },
                  ...categoriesData.map(c => ({ label: c.name, value: c.id }))
                ]}
                value={category}
                onChange={setCategory}
                variant='outline'
                className="w-full"
              />
            </div>

            <div className="flex items-center gap-12 w-45 md-w-full sm-w-full">
              <Icon name="Search" width="20" height="20" stroke="var(--primary)" />
              <Fields
                type="text"
                placeholder="What are you looking for?"
                value={query}
                onChange={setQuery}
                variant='outline'
                className="w-full"
              />
            </div>

            <div className="flex items-center gap-12 w-20 md-w-full sm-w-full">
              <Icon name="MapPin" width="20" height="20" stroke="var(--primary)" />
              <Fields
                type="select"
                options={[
                  { label: 'Delhi', value: 'Delhi' },
                  { label: 'Mumbai', value: 'Mumbai' },
                  { label: 'Bangalore', value: 'Bangalore' },
                  { label: 'Chennai', value: 'Chennai' },
                  { label: 'Hyderabad', value: 'Hyderabad' }
                ]}
                value={location}
                onChange={setLocation}
                variant='outline'
                className="w-full"
              />
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
          </div>
        </form>

        <div className="flex sm-flex-wrap items-center gap-12 mt-26 sm-mt-18">
          <p className="para-text text-white font-500">Popular Searches:</p>
          {popularSearches.map((tag, index) => (
            <p
              key={index}
              className='bg-transparent mini-text text-white px-20 py-4 rounded-5 cursor-pointer'
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setQuery(tag);
                navigate(`/products?search=${tag}&city=${location}`, {
                  state: { category: 'All', search: tag, city: location }
                });
              }}
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
