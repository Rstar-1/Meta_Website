import React from 'react';
import { useNavigate } from 'react-router-dom';
import topCities from '../../../data/topCities.json';
import Container from '../../../components/common/Container';
import CardLayout from '../../../components/layout/CardLayout';

const TopCity = () => {
  const navigate = useNavigate();

  return (
    <Container className="bg-white">

      <div className="w-full py-50">
        <h2 className="title-text text-dark font-600">Top Cities</h2>

        {/* --- Grid Layout of Cities (Top 4) using CardLayout --- */}
        <CardLayout
          items={topCities}
          cardType="city"
          isSlider={true}
          sliderSlidesPerView={1.4}
          sliderBreakpoints={{
            640: {
              slidesPerView: 2.2,
            },
            768: {
              slidesPerView: 4.2,
            },
            1024: {
              slidesPerView: 4.5,
            }
          }}
          className="mt-20"
          onCardClick={() => navigate('/products')}
        />
      </div>
    </Container>
  );
};

export default TopCity;
