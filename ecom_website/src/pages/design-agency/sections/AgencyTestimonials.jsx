import React, { useState } from 'react';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Icon from '../../../components/common/Icon';
import Button from '../../../components/common/Button';

const reviewsData = [
  {
    id: 1,
    rating: 5,
    quote: "Infitech transformed our digital presence completely. Their team brought creative direction, precision engineering, and an intuitive design language that increased our web conversions by 140% in the first quarter alone.",
    author: "Marcus Vance",
    role: "Chief Product Officer, Apex Global",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 2,
    rating: 5,
    quote: "Working with Infitech felt like an extension of our internal team. They took complex technical requirements and distilled them into an ultra-sleek, modern interface that our enterprise users love.",
    author: "Elena Rostova",
    role: "VP of Engineering, FinTech Pulse",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 3,
    rating: 5,
    quote: "The speed of execution and attention to visual detail at Infitech is unmatched. They exceeded every deadline and delivered an international award-winning website for our brand.",
    author: "David Sterling",
    role: "Founder & CEO, Sterling Media",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  }
];

const AgencyTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeReview = reviewsData[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviewsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviewsData.length - 1 ? 0 : prev + 1));
  };

  return (
    <Container>
      <div className="py-60 w-full">
        <p
          className="mini-text text-dark bg-white w-max px-18 py-6 rounded-20 flex items-center gap-8 font-700 uppercase mb-10"
        >
          <Icon name="Settings" width="14" height="14" className="text-warning" />
          CLIENT FEEDBACK
        </p>
        <h2 className="large-text text-white uppercase font-500">
          Reviews &amp; Trust Ratings
        </h2>
        <div className="rounded-10 overflow-hidden relative flex mt-40 sm-mt-20 sm-grid-cols-1">
          {/* Left Dark Sidebar */}
          <div
            className="bg-dark w-40 sm-w-full"
          >
            <div className='p-40 sm-p-20'>
              <h3 className="large-text text-white font-600">
                Clutch Reviews &amp; Trust Ratings
              </h3>

              <div className="flex items-center gap-9 text-warning mt-20">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="Star" width="18" height="18" className="text-warning" />
                ))}
              </div>
              <p className="text-white font-500 small-text mt-20">4.9 / 5.0 Rating</p>
              <p className="text-white font-500 small-text">Based on 80+ verified reviews</p>

              <div className="flex gap-12 items-center mt-50 sm-mt-25">
                <Button
                  onClick={handlePrev}
                  aria-label="Previous review"
                  icon="ChevronLeft"
                  iconWidth="30"
                  iconHeight="30"
                  iconStroke="#FFFFFF"
                  version="icon"
                  bg="transparent"
                />
                <Button
                  onClick={handleNext}
                  aria-label="Next review"
                  icon="ChevronRight"
                  iconWidth="30"
                  iconHeight="30"
                  iconStroke="#FFFFFF"
                  version="icon"
                  bg="transparent"
                />
              </div>
            </div>
          </div>

          <div className="bg-white w-60 sm-w-full">
            <div className='p-40 sm-p-20'>
              <p className="headpara-text text-dark font-400 mb-30">
                "{activeReview.quote}"
              </p>

              <div className="flex items-center gap-12">
                <Image
                  src={activeReview.avatar}
                  alt={activeReview.author}
                  width="70"
                  height="70"
                  className="object-cover flex"
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%'
                  }}
                />
                <div>
                  <h3 className="title-text text-dark font-600 m-0">
                    {activeReview.author}
                  </h3>
                  <p className="small-text text-gray font-400 m-0">
                    {activeReview.role}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AgencyTestimonials;
