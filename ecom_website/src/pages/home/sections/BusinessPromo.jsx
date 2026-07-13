import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/common/Container';
import Icon from '../../../components/common/Icon';
import Button from '../../../components/common/Button';

const BusinessPromo = () => {
  const navigate = useNavigate();

  return (
    <Container className='bg-primary'>
      <div className='w-full flex items-center justify-between py-25'>
        <div className='w-80'>
          <h2 className="text-white font-600 head-text mt-8">
            Let’s Work Together
          </h2>
          <p className="text-white small-text mt-4">
            We are digital agency that helps businesses develop immersive and engaging user experiences.
          </p>
        </div>

        <Button
          onClick={() => navigate('/connect')}
          bg='white'
          color='primary'
          version='v2'
          text='Explore More'
          className='mt-16'
        />
      </div >
    </Container >
  );
};

export default BusinessPromo;
