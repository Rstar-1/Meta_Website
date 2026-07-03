import React from 'react';
import { useNavigate } from 'react-router-dom';
import topCities from '../../../data/topCities.json';
import Container from '../../../components/common/Container';
import Icon from '../../../components/common/Icon';
import CardLayout from '../../../components/layout/CardLayout';

const TopCity = () => {
  const navigate = useNavigate();

  return (
    <Container className="bg-white">
      {/* Page-specific CSS transitions for button effects */}
      <style>{`
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

        {/* --- View All Cities Button --- */}
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
