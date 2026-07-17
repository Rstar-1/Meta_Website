import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';
import Icon from '../../../components/common/Icon';
import Image from '../../../components/common/Image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';

import pvcRollIndustrial from '../../../assets/pvc_roll_industrial.webp';
import pvcSheetsIndustrial from '../../../assets/pvc_sheets_industrial.webp';
import pvcCurtainIndustrial from '../../../assets/pvc_curtain_industrial.webp';

const Hero = () => {
  const navigate = useNavigate();

  const features = [
    { title: "Premium Quality", desc: "100% Virgin Material", icon: "Shield" },
    { title: "Wide Range", desc: "of Products", icon: "Grid" },
    { title: "Custom Solutions", desc: "Made to Measure", icon: "Builder" },
    { title: "Fast Delivery", desc: "Pan India", icon: "Location" }
  ];

  const slides = [
    {
      image: pvcRollIndustrial,
      title: "Soft Transparent PVC Rolls",
      desc: "High clarity, flexible grade"
    },
    {
      image: pvcSheetsIndustrial,
      title: "Super Clear PVC Sheets",
      desc: "Industrial grade transparent protection"
    },
    {
      image: pvcCurtainIndustrial,
      title: "Polar Grade Strip Curtains",
      desc: "Ideal for cold rooms and freezers"
    }
  ];

  return (
    <Container style={{
      background: "linear-gradient(135deg, #0d1525ff 0%, #030610ff 100%)",
    }}>
      <div className='py-40'>
        <div className="grid-cols-2 sm-grid-cols-1 gap-12 items-center w-full overflow-hidden">

          {/* Left Column: Text & Features */}
          <div className="w-full pr-12 sm-pr-1">

            {/* Tag Badge */}
            <div
              className="flex items-center gap-10 w-max px-16 py-10 rounded-20"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.14)"
              }}
            >
              <Icon name="Shield" width="14" height="14" stroke="var(--primary)" />
              <p className="mini-text text-white font-500 uppercase">
                India's No.1 PVC Manufacturer
              </p>
            </div>

            {/* Title */}
            <h1 className="large-text text-white font-600 uppercase pt-10">
              Premium PVC<br />
              <span className="text-primary font-800">For Every Industry</span>
            </h1>

            {/* Subtext */}
            <p className="para-text font-400 uppercase text-white mt-12" style={{ opacity: 0.60 }}>
              High quality PVC sheets, rolls, strip curtains and industrial films for temperature control, safety, protection and performance.
            </p>

            {/* Features Grid */}
            <div className="grid-cols-2 sm-grid-cols-1 gap-12 mt-30">
              {features?.map((f, idx) => (
                <div key={idx} className="flex items-center gap-12 mb-16">
                  <div
                    className="rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.19)",
                      width: "40px",
                      height: "40px",
                      minWidth: "40px"
                    }}
                  >
                    <Icon name={f.icon} width="18" height="18" stroke="var(--white)" />
                  </div>
                  <div>
                    <h4 className="headmini-text font-500 text-white">{f.title}</h4>
                    <p className="mini-text font-400 text-white" style={{ opacity: 0.60 }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-12 mt-20">
              <Button
                text="Shop Now"
                version="v2"
                bg="primary"
                onClick={() => navigate("/products")}
              />
              <Button
                text="Request a Quote"
                version="v2"
                bg="transparent"
                style={{ border: "1px solid rgba(255, 255, 255, 0.2)", color: "#ffffff" }}
                onClick={() => navigate("/connect")}
                icon="ArrowRight"
                iconPosition="right"
              />
            </div>
          </div>

          {/* Right Column: Swiper Slider */}
          <div className="w-full pl-12 sm-pl-1 sm-mt-10">
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
              className="w-full"
            >
              {slides.map((slide, idx) => (
                <SwiperSlide key={idx}>
                  <div className="relative h-500 sm-h-300 rounded-5 overflow-hidden">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      width={600}
                      height={500}
                      loading={idx === 0 ? "eager" : "lazy"}
                      fetchPriority={idx === 0 ? "high" : undefined}
                      className="w-full h-full object-cover flex"
                    />
                    <div className="absolute bottom-0 left-0 z-10 m-10">
                      <div className='bg-dark rounded-5 p-20'>
                        <h3 className="mid-text font-500 text-white">
                          {slide.title}
                        </h3>
                        <p className="mini-text text-white font-400" style={{ opacity: 0.80 }}>
                          {slide.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>

      </div>
    </Container>
  );
};

export default Hero;
