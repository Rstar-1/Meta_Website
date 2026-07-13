import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';
import Image from '../../../components/common/Image';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative" style={{ backgroundImage: 'https://unifato.com/finazze/assets/img/all-images/bg/hero-bg1.png', backgroundSize: 'cover' }}>
      <Container>
        <div className="grid-cols-2 md-grid-cols-1 sm-grid-cols-1 items-center gap-12 py-50">
          {/* Text Content */}
          <div className="pr-15 sm-pr-1">
            <p className="text-dark bg-white p-10 w-max rounded-5 font-500 uppercase headpara-text">👋 Strategic Solutions For Financial Growth</p>
            <h1 className="text-dark font-600 large-text uppercase pt-12">
              Navigate Complex
              Financial Challenge
              With Confidence
            </h1>
            <p className="text-gray font-400 para-text mt-12">
              Welcome to Stir, where innovation meets strategy & excellence is our standard. As a premier business agency, Business agencies are specialized entities...
            </p>
            <Button
              onClick={() => navigate('/connect')}
              version='v2'
              text='Explore More'
              icon='Management'
              className='mt-16'
            />
          </div>

          {/* Visual Content */}
          <div className="pl-15 sm-pl-1">
            <div className='relative'>
              <Image
                src="https://unifato.com/finazze/assets/img/all-images/hero/hero-img1.png"
                alt="Digital Agency Team"
                className="w-full object-contain h-700 flex rounded-10"
              />

              {/* User Testimonial Overlay Card */}
              <div className="absolute bottom-0 right-0 m-10" style={{ maxWidth: '50%' }}>
                <div className='p-20 bg-white rounded-5'>
                  <div className="flex items-center gap-12">
                    <Image className='flex object-cover rounded-full' width='40px' height='40px' src="https://demo.alhikmahsoft.com/template/stir/assets/images/team-1.jpg" alt="User" />
                    <Image className='flex object-cover rounded-full' width='40px' height='40px' src="https://demo.alhikmahsoft.com/template/stir/assets/images/team-2.jpg" alt="User" />
                    <Image className='flex object-cover rounded-full' width='40px' height='40px' src="https://demo.alhikmahsoft.com/template/stir/assets/images/team-3.jpg" alt="User" />
                  </div>
                  <h5 className="text-dark font-500 mid-text pt-12">Juan Manuel</h5>
                  <p className="text-gray font-400 small-text">"The depth of exploration and quality was great."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
