import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';
import Image from '../../../components/common/Image';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <Container style={{ background: "url(https://vibetech-html.vercel.app/assets/images/hero/hero-bg-sp-2.png)", backgroundRepeat: 'no-repeat' }}>
      <div className="grid-cols-2 md-grid-cols-1 sm-grid-cols-1 items-center gap-12 py-50">
        {/* Text Content */}
        <div className="pr-15 sm-pr-1">
          <p className="text-gray font-500 uppercase para-text">🚀 GROW YOUR BRAND</p>
          <h1 className="text-dark font-600 large-text uppercase pt-12">
            Transforming Ideas Into Digital Success
          </h1>
          <p className="text-gray font-400 para-text mt-12">
            Welcome to our premier digital agency. We design high-converting websites, launch high-yield Meta advertising campaigns, and optimize search engine visibility (SEO) to accelerate your business growth.
          </p>
          <Button
            onClick={() => navigate('/connect')}
            version='v2'
            text='Get Started'
            icon='Management'
            className='mt-26'
          />
        </div>

        {/* Visual Content */}
        <div className="pl-15 sm-pl-1">
          <div className='relative'>
            <Image
              src="https://demo.alhikmahsoft.com/template/stir/assets/images/testimonial-6.jpg"
              alt="Digital Agency Team"
              className="w-full object-cover h-500 flex rounded-5"
            />

            {/* User Testimonial Overlay Card */}
            <div className="absolute bottom-0 right-0 m-10">
              <div className='p-20 bg-white rounded-5'>
                <div className="flex items-center gap-12">
                  <Image className='flex object-cover rounded-full' width='40px' height='40px' src="https://demo.alhikmahsoft.com/template/stir/assets/images/team-1.jpg" alt="User" />
                  <Image className='flex object-cover rounded-full' width='40px' height='40px' src="https://demo.alhikmahsoft.com/template/stir/assets/images/team-2.jpg" alt="User" />
                  <Image className='flex object-cover rounded-full' width='40px' height='40px' src="https://demo.alhikmahsoft.com/template/stir/assets/images/team-3.jpg" alt="User" />
                </div>
                <h5 className="text-dark font-500 mid-text pt-12">Juan Manuel</h5>
                <p className="text-gray font-400 small-text">"Their Meta campaign strategy grew our sales by 150%!"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Hero;
