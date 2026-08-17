import React, { useState } from 'react';
import { testimonialsData } from '../home4Data';

const Testimonials = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  const current = testimonialsData[activeIdx];

  return (
    <section className="babet-testimonials-section" id="testimonials">
      <div className="babet-container">
        {/* Header */}
        <div className="babet-section-header">
          <span className="babet-badge">Happy Pet Parents</span>
          <h2 className="babet-section-title">Our Success Stories</h2>
          <p className="babet-section-subtitle">
            Loyal Hearts, Forever Homes. Read heartwarming reviews from pet owners who trust Babet.
          </p>
        </div>

        {/* Testimonial Quote Box */}
        <div className="babet-testimonial-card">
          <div className="babet-quote-mark">“</div>
          <p className="babet-quote-body">
            {current.quote}
          </p>

          <div className="babet-author-info">
            <img src={current.avatar} alt={current.name} className="babet-author-img" />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: '800', fontSize: '17px', color: 'var(--babet-navy)' }}>{current.name}</div>
              <div style={{ fontSize: '13px', color: 'var(--babet-orange)', fontWeight: '700' }}>{current.role}</div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '28px' }}>
            <button className="babet-btn-navy" style={{ padding: '8px 16px', borderRadius: '20px' }} onClick={handlePrev}>
              ← Prev
            </button>
            <button className="babet-btn-orange" style={{ padding: '8px 16px', borderRadius: '20px' }} onClick={handleNext}>
              Next →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
