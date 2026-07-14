import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';

const PromoCTA = () => {
  const navigate = useNavigate();

  return (
    <Container style={{ backgroundColor: 'var(--primary)' }}>
      <div className='w-full flex items-end justify-between py-40'>
        <div className='w-80'>
          <h2 className="text-white font-600 head-text mt-8">
            Let’s Work Together
          </h2>
          <p className="text-white para-text mt-8">
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
    </Container>
  );
};

export default PromoCTA;
