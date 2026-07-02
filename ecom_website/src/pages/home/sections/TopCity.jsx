import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import topCities from '../../../data/topCities.json';
import Container from '../../../components/common/Container';
import Icon from '../../../components/common/Icon';

const TopCity = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (cityId, e) => {
    e.stopPropagation();
    setFavorites((prev) => ({
      ...prev,
      [cityId]: !prev[cityId],
    }));
  };

  return (
    <Container className="bg-white">
      {/* Page-specific CSS transitions for premium hover zoom, button effects, and card shadows */}
      <style>{`
        .city-card {
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .city-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .city-card:hover .city-img {
          transform: scale(1.08);
        }
        .city-img {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .city-card:hover .city-action-btn {
          background-color: var(--primary) !important;
          transform: scale(1.05);
        }
        .city-card:hover .city-action-btn svg {
          stroke: #ffffff !important;
        }
        .view-cities-btn {
          transition: all 0.25s ease;
        }
        .view-cities-btn:hover {
          background-color: var(--primary) !important;
          color: #ffffff !important;
          box-shadow: 0 5px 15px rgba(30, 116, 219, 0.35);
        }
      `}</style>

      <div className="w-full py-50">
        <h2 className="title-text text-dark font-600">Top Cities</h2>

        {/* --- Grid Layout of Cities (Top 4) --- */}
        <div className="grid-cols-4 md-grid-cols-2 sm-grid-cols-1 gap-12 mt-20">
          {topCities?.slice(0, 4)?.map((city, idx) => {
            const paddedIndex = String(idx + 1).padStart(2, '0');
            const isFavorite = favorites[city.id];

            return (
              <div
                key={city.id}
                className="city-card relative overflow-hidden rounded-10 cursor-pointer h-350 flex items-end"
                style={{ backgroundImage: `url(${city.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                onClick={() => navigate('/products')}
              >
                <div className="bg-white icon-lg rounded-full absolute top-0 left-0 m-12">
                  <p className='text-primary small-text font-600'>{paddedIndex}</p>
                </div>

                <div className="relative w-full">
                  <div className="p-20">
                    <div className="flex items-center gap-8 mb-6">
                      <Icon name="MapPin" width="14" height="14" strokeWidth="2.5" className="text-white" />
                      <h4 className="mid-text text-white font-600">{city.name}</h4>
                    </div>

                    {/* Stats List */}
                    <div className="grid-cols-1 gap-6 mb-16">
                      <div className="flex items-center gap-8 text-white opacity-95">
                        <Icon name="Building" width="14" height="14" strokeWidth="2.5" className="text-white" />
                        <span className="small-text font-400">{city.businesses}</span>
                      </div>
                      <div className="flex items-center gap-8 text-white opacity-95">
                        <Icon name="Grid" width="14" height="14" strokeWidth="2.5" className="text-white" />
                        <span className="small-text font-400">{city.categories}</span>
                      </div>
                    </div>

                    <div className='flex items-center justify-between w-full'>
                      {/* Dynamic Tag Badge */}
                      {city.tag ? (
                        <div
                          className="px-12 py-5 rounded-20 w-max flex items-center gap-6"
                          style={{
                            backgroundColor: city.tagType === 'most-searched' ? '#eab308' : '#22c55e',
                            color: city.tagType === 'most-searched' ? '#000000' : '#ffffff',
                          }}
                        >
                          {city.tagType === 'most-searched' ? (
                            <Icon name="Star" width="12" height="12" fill="currentColor" stroke="none" className="flex" />
                          ) : (
                            <Icon name="Trending" width="12" height="12" stroke="currentColor" strokeWidth="3" className="flex" />
                          )}
                          <span className="mini-text font-600 uppercase tracking-wider">
                            {city.tag}
                          </span>
                        </div>
                      ) : null}

                      {/* Circular Right Action Button */}
                      <div className="icon-lg bg-white rounded-full">
                        <Icon name="ArrowRight" width="16" height="16" stroke="var(--primary)" strokeWidth="3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* --- View All Cities Button with Dot Grid Decor --- */}
        <div className="flex items-center justify-center mt-27">


          <button
            onClick={() => navigate('/products')}
            className="view-cities-btn px-28 py-12 rounded-8 font-600 small-text cursor-pointer transition-all flex items-center gap-8 border-primary bg-transparent text-primary"
            style={{
              border: '1.5px solid var(--primary)',
              outline: 'none',
            }}
          >
            <Icon name="Building" width="16" height="16" strokeWidth="2.5" />
            <span>View All Cities</span>
            <span style={{ fontSize: '14px', marginLeft: '2px' }}>➔</span>
          </button>

        </div>
      </div>
    </Container>
  );
};

export default TopCity;
