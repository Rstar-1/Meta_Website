import React from 'react';
import topCities from '../../../data/topCities.json';
import Container from '../../../components/common/Container';

const TopCity = () => {
  return (
    <Container className="bg-white">
      <div className="w-full py-40">

        <div
          className="flex justify-between items-center mb-20"
        >
          <h2 className="title-text text-dark font-600">Top Cities</h2>
          <p className='text-primary font-500 cursor-pointer small-text'>
            View All ➔</p>
        </div>
        <div className="grid-cols-4 md-grid-cols-2 sm-grid-cols-1 gap-12">
          {topCities?.slice(0, 4)?.map((city) => (
            <div
              key={city.id}
              className="relative overflow-hidden rounded-5"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.85) 100%), url(${city.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 1,
              }}
            >
              <div
                className="px-25 py-35 flex items-end justify-between text-white"
              >
                <div>
                  <div className='grid-cols-1 gap-6'>
                    <div className="flex items-center gap-6">
                      <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <h4 className='title-text text-white'>{city.name}</h4>
                    </div>

                    <div className="flex items-center gap-6">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                      </svg>
                      <p className='mini-text text-white'>{city.businesses}</p>
                    </div>

                    <div className="flex items-center gap-6">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                      </svg>
                      <p className='mini-text text-white'>{city.categories}</p>
                    </div>
                  </div>

                  {city.tag ? (
                    <div
                      className="px-8 py-3 rounded-5 w-max mt-16"
                      style={{
                        backgroundColor: city.tagType === 'most-searched' ? '#facc15' : '#22c55e',
                        color: city.tagType === 'most-searched' ? '#0f1623' : '#ffffff',
                      }}
                    >
                      <p className='mini-text font-500'>{city.tag}</p>
                    </div>
                  ) : null}
                </div>
                <div
                  className="bg-white icon-lg rounded-full"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Cities Button */}
        <div className="flex justify-center mt-30">
          <button
            className="px-24 py-10 rounded-5 font-600 small-text cursor-pointer transition-all"
            style={{
              border: '1.5px solid var(--primary)',
              color: 'var(--primary)',
              backgroundColor: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--primary)';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--primary)';
            }}
          >
            View All Cities &rarr;
          </button>
        </div>
      </div>
    </Container>
  );
};

export default TopCity;
