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
          items={topCities?.slice(0, 4)}
          cardType="city"
          cols="4"
          mdCols="2"
          smCols="1"
          gap="12"
          className="mt-20"
          onCardClick={() => navigate('/products')}
        />
      </div>
    </Container>
  );
};

export default TopCity;
