import React from 'react';
import agencyVideo from '../../../assets/agency.mp4';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import { AvatarGroup } from '../../../components/common/Avatar';

const clientAvatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
];

const AgencyHero = () => {
  return (
    <Container>
      <div className='py-100 relative'>
        <div className='absolute top-0 left-0 w-full h-full overflow-hidden z-10'>
          <Image
            src={agencyVideo}
            alt="Agency Hero Background Video"
            className='w-full h-full'
            style={{
              objectFit: 'cover',
              opacity: 0.55,
              filter: 'brightness(0.75) contrast(1.1)'
            }}
          />
          <div className='absolute w-full h-full top-0 left-0'
            style={{
              background: 'radial-gradient(ellipse 65% 55% at 50% 0%, rgba(255, 175, 40, 0.28) 0%, rgba(0, 0, 0, 0.5) 90%, rgba(10, 10, 10, 0.95) 100%), linear-gradient(180deg, rgba(10, 10, 10, 0.4) 90%, rgba(10, 10, 10, 0.3) 100%)',
            }}
          />
        </div>
        <div className='relative z-10 text-center sm-text-left w-full'>
          <h1 className='largehead-text text-white'>
            A NEW
            <br />
            GENERATION
            <br />
            <span className='text-warning'>COMMUNICATION</span>
          </h1>
          <div className='flex sm-grid-cols-1 items-center justify-center gap-12 w-full mt-10'>
            <p
              style={{
                maxWidth: '250px'
              }}
              className='mini-text text-left'
            >
              Are You Struggling To Turn Your Ideas Into Something Users Love? Pixelr Designs Digital Products.
            </p>

            <h2 className='largehead-text'>AGENCY</h2>

            <div className='flex items-center gap-12'>
              <AvatarGroup
                avatars={clientAvatars}
                badgeText="1M"
                size={42}
                overlap={-12}
              />
              <div className='grid-cols-1 text-left'
              >
                <p className='mini-text text-white'>Trusted Clients</p>
                <p className='mini-text text-white'>World Wide</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AgencyHero;
