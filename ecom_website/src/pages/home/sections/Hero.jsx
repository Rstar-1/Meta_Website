import React from 'react';
import Container from '../../../components/common/Container';
import Icon from '../../../components/common/Icon';
import Image from '../../../components/common/Image';

const heroVideoSrc = '/pvc_factory_video.mp4';

const Hero = ({ cms }) => {
  if (!cms) return null;

  return (
    <div className="relative overflow-hidden h-500" style={{ backgroundColor: '#0a1120', width: '100%' }}>
      {/* Background Video using generic Image component */}
      <Image
        src={heroVideoSrc}
        alt="Hero Background Video"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Overlay Gradient from bottom side for text contrast */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: "linear-gradient(to top, rgba(3, 6, 16, 0.95) 20%, rgba(3, 6, 16, 0.65) 45%, rgba(13, 21, 37, 0.15) 90%)",
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />

      <Container className='relative z-10'>
        <div className="w-full h-500 flex items-end">

          {/* Left Column: Text & Features */}
          <div className="w-70 sm-w-full py-40">

            {/* Tag Badge */}
            <div
              className="flex items-center gap-10 w-max px-16 py-10 rounded-20"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.14)"
              }}
            >
              <Icon name="Shield" width="14" height="14" stroke="var(--primary)" />
              <p className="mini-text text-white font-500 uppercase">
                {cms.hero.badge}
              </p>
            </div>

            {/* Title */}
            <h1 className="large-text text-white font-600 uppercase pt-12">
              {cms.hero.title.split('\\n')[0]}<br />
              <span className="text-primary font-800">{cms.hero.title.split('\\n')[1]}</span>
            </h1>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
