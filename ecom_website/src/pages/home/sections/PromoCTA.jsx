import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';

const PromoCTA = () => {
  const navigate = useNavigate();

  return (
    <div className='bg-primary'>
      <Container>
        <div className='w-full flex items-center justify-between py-30'>
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
      </Container>
    </div>
  );
};

export default PromoCTA;
