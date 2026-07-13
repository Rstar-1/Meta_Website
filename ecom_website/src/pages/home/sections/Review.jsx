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


    <Container >
      <style>{`
        .testimonial-img {
          border-radius: 30px 30px 30px 0;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .nav-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 1px solid #dddddd;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          color: var(--dark);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .nav-btn:hover {
          background: var(--dark);
          color: #ffffff;
          border-color: var(--dark);
        }
        .quote-slide {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="grid-cols-2 md-grid-cols-1 sm-grid-cols-1 gap-40 items-center">
        {/* Left Column - Content */}
        <div>
          <span className="text-primary font-600 uppercase mini-text tracking-widest block mb-12">TESTIMONIALS</span>

          {/* Stars */}
          <div className="flex gap-4 mb-25">
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
          <div className="quote-slide mb-40">
            <p className="text-dark font-500 leading-relaxed italic mb-30" style={{ fontSize: '22px', borderLeft: '4px solid var(--primary)', paddingLeft: '20px' }}>
              "{testimonials[activeIdx].text}"
            </p>

            <div className="flex items-center gap-16">
              <Image
                src={testimonials[activeIdx].avatar}
                alt={testimonials[activeIdx].name}
                className="rounded-full object-cover"
                style={{ width: '60px', height: '60px' }}
              />
              <div>
                <h4 className="text-dark font-600 mb-2" style={{ fontSize: '18px' }}>{testimonials[activeIdx].name}</h4>
                <p className="text-gray mini-text">{testimonials[activeIdx].role}</p>
              </div>
            </div>
          </div>

          {/* Nav Arrows */}
          <div className="flex gap-16">
            <button className="nav-btn" onClick={handlePrev} aria-label="Previous testimonial">
              <Icon name="ChevronLeft" width="18" height="18" stroke="currentColor" strokeWidth="2.5" />
            </button>
            <button className="nav-btn" onClick={handleNext} aria-label="Next testimonial">
              <Icon name="ChevronRight" width="18" height="18" stroke="currentColor" strokeWidth="2.5" />
            </button>
          </div>
        </div>

        {/* Right Column - Large image */}
        <div>
          <Image
            src="https://demo.alhikmahsoft.com/template/stir/assets/images/testimonial-5.jpg"
            alt="Testimonials Meeting"
            className="w-full object-cover testimonial-img"
            style={{ height: '480px' }}
          />
        </div>
      </div>
    </Container>
  );
};

export default Review;
