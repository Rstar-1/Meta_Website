import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';
import Icon from '../../../components/common/Icon';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import pvcFactoryVideo from '../../../assets/pvc_factory_video.mp4';
import pvcRollsVideo from '../../../assets/pvc_rolls.mp4';

const Hero = ({ cms }) => {
  const navigate = useNavigate();

  if (!cms) return null;

  const features = cms.hero.features;

  const videoSlides = [
    { src: pvcFactoryVideo, alt: '/pvc_factory_video.mp4' },
    { src: pvcRollsVideo, alt: '/pvc_rolls.mp4' }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Custom styles for Swiper video pagination dots */}
      <style>{`
        .hero-video-swiper .swiper-pagination {
          bottom: 20px !important;
          z-index: 5 !important;
        }
        .hero-video-swiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.4);
          opacity: 1;
          transition: all 0.3s ease;
        }
        .hero-video-swiper .swiper-pagination-bullet-active {
          background: var(--primary, #1e74db);
          width: 24px;
          border-radius: 4px;
        }
      `}</style>

      {/* Background HTML5 Video Swiper Carousel */}
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        className="hero-video-swiper"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0
        }}
      >
        {videoSlides.map((slide, idx) => (
          <SwiperSlide key={idx} style={{ width: '100%', height: '100%' }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                pointerEvents: 'none'
              }}
            >
              <source src={slide.src} type="video/mp4" />
              <source src={slide.alt} type="video/mp4" />
            </video>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay Gradient from bottom side for text contrast */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: "linear-gradient(to top, rgba(3, 6, 16, 0.95) 20%, rgba(3, 6, 16, 0.65) 45%, rgba(13, 21, 37, 0.15) 90%)",
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

      <Container className='relative z-10'>
        <div className="w-full h-550 flex items-end">

          {/* Left Column: Text & Features */}
          <div className="w-70 py-40">

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
