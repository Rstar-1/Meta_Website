import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';
import Image from '../../../components/common/Image';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <Container className="relative z-10" style={{ backgroundImage: "url('https://demo.alhikmahsoft.com/template/stir/assets/images/shape-4.png')", backgroundRepeat: "no-repeat", backgroundSize: "contain", backgroundPosition: "center" }}>
      <div className="grid-cols-2 md-grid-cols-1 sm-grid-cols-1 items-center gap-12 py-30">
        {/* Text Content */}
        <div className="">
          <h1 className="text-dark font-600 large-text uppercase">
            Delivering Unique Solutions for Success
          </h1>
          <p className="text-gray font-400 para-text mt-12">
            👋 Welcome to Stir, where innovation meets strategy & excellence is our standard. As a premier business agency, Business agencies are specialized entities...
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
        <div className="relative">
          <Image
            src="https://demo.alhikmahsoft.com/template/stir/assets/images/who-we-are-img-2.jpg"
            alt="Digital Agency Team"
            className="w-full object-cover h-500 flex rounded-10"
          />

          {/* User Testimonial Overlay Card */}
          <div className="absolute bottom-0 left-0 m-10" style={{ maxWidth: '50%' }}>
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
    </Container>
  );
};

export default Hero;
