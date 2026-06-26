import React, { useState, useEffect } from 'react';
import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';

const BusinessPromo = ({ onRegisterBusiness }) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;

  return (
    <Container className='bg-forth'>
      <div className="w-full py-30">
        <div
          className={isMobile ? "flex flex-column items-center text-center p-30 gap-20" : "flex items-center justify-between p-40"}
          style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, #1e40af 100%)',
            borderRadius: '5px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)'
          }}
        >
          {/* Text Side */}
          <div className="flex flex-column text-left" style={{ alignItems: isMobile ? 'center' : 'flex-start', textAlign: isMobile ? 'center' : 'left' }}>
            <h2
              className="text-white font-700 head-text"
            >
              Grow <span style={{ color: 'var(--warning)' }}>Your Business</span> with Justdial
            </h2>
            <p
              className="text-white small-text mt-7"
            >
              Get more visibility, connect with more customers and grow your business fast.
            </p>
          </div>

          {/* Action Button Side */}
          <Button
            text="List Your Business"
            bg="warning"
            version="v2"
            className="font-700 cursor-pointer"
          />
        </div>
      </div>
    </Container>
  );
};

export default BusinessPromo;
