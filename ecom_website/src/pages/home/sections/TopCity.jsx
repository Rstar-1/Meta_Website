import React from 'react';
import topCities from '../../../data/topCities.json';
import Container from '../../../components/common/Container';
import Icon from '../../../components/common/Icon';

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
                      <Icon name="MapPin" width="23" height="23" strokeWidth="2.5" className="text-white" />
                      <h4 className='title-text text-white'>{city.name}</h4>
                    </div>

                    <div className="flex items-center gap-6">
                      <Icon name="Building" width="12" height="12" strokeWidth="2" className="text-white" />
                      <p className='mini-text text-white'>{city.businesses}</p>
                    </div>

                    <div className="flex items-center gap-6">
                      <Icon name="Grid" width="12" height="12" strokeWidth="2" className="text-white" />
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
                  <Icon name="ArrowRight" width="16" height="16" stroke="var(--primary)" strokeWidth="3" />
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
