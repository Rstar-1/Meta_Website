import React, { useState } from 'react';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Icon from '../../../components/common/Icon';

const Review = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const testimonials = [
    {
      id: 1,
      text: "Whether it's enhancing market visibility, improving operational efficiency, or implementing cutting-edge technologies, our agency offers a wide spectrum of services. From strategic consulting & digital transformation to marketing strategies & financial advisory...",
      name: "Brandi Rowe",
      role: "Marketing Lead at Technlogia",
      avatar: "https://demo.alhikmahsoft.com/template/stir/assets/images/testimonial-3.png"
    },
    {
      id: 2,
      text: "Their deep domain expertise and structured design workshops helped us accelerate our digital product launch by three months. The level of collaboration, execution quality, and brand insight is absolutely unmatched.",
      name: "David Ross",
      role: "Product Manager at Innova Group",
      avatar: "https://demo.alhikmahsoft.com/template/stir/assets/images/team-2.jpg"
    }
  ];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <Container>
      <div className="grid-cols-2 md-grid-cols-1 sm-grid-cols-1 gap-12 items-center">
        {/* Left Column - Content */}
        <div>
          <p className="text-primary font-500 uppercase small-text">TESTIMONIALS</p>
          <h4 className="text-dark font-600 head-text uppercase mt-5">What Our Clients Say</h4>

          {/* Stars */}
          <div className="flex gap-4 mt-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <Icon
                key={i}
                name="Star"
                width="18"
                height="18"
                fill="#facc15"
                stroke="#facc15"
                strokeWidth="2"
              />
            ))}
          </div>

          {/* Testimonial Active Slide */}
          <div className="mt-22">
            <p className="text-gray font-400 small-text px-14 py-10" style={{ borderLeft: '3px solid var(--primary)' }}>
              "{testimonials[activeIdx].text}"
            </p>

            <div className="flex items-center gap-12 mt-20">
              <Image
                src={testimonials[activeIdx].avatar}
                alt={testimonials[activeIdx].name}
                className="rounded-full object-cover"
                style={{ width: '60px', height: '60px' }}
              />
              <div>
                <h4 className="text-dark font-600 mid-text">{testimonials[activeIdx].name}</h4>
                <p className="text-gray mini-text">{testimonials[activeIdx].role}</p>
              </div>
            </div>
          </div>

          {/* Nav Arrows */}
          <div className="flex gap-12 mt-25">
            <button className="icon-lg bg-transparent border-ec rounded-full cursor-pointer" onClick={handlePrev} aria-label="Previous testimonial">
              <Icon name="ChevronLeft" width="18" height="18" stroke="currentColor" strokeWidth="2.5" />
            </button>
            <button className="icon-lg bg-transparent border-ec rounded-full cursor-pointer" onClick={handleNext} aria-label="Next testimonial">
              <Icon name="ChevronRight" width="18" height="18" stroke="currentColor" strokeWidth="2.5" />
            </button>
          </div>
        </div>

        {/* Right Column - Large image */}
        <div>
          <Image
            src="https://demo.alhikmahsoft.com/template/stir/assets/images/testimonial-5.jpg"
            alt="Testimonials Meeting"
            className="w-full object-cover h-500 flex"
          />
        </div>
      </div>
    </Container>
  );
};

export default Review;
