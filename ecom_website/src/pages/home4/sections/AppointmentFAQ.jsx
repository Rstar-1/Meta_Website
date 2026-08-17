import React, { useState } from 'react';
import { faqData } from '../home4Data';

const AppointmentFAQ = () => {
  const [openIdx, setOpenIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const toggleFaq = (id) => {
    setOpenIdx(openIdx === id ? null : id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="babet-appointment-faq-section" id="faq">
      <div className="babet-container">
        <div className="babet-app-faq-grid">
          {/* Left Column: FAQ Accordion */}
          <div>
            <span className="babet-badge">Got Questions?</span>
            <h2 className="babet-section-title" style={{ textAlign: 'left', marginBottom: '24px' }}>
              Frequently Asked Questions
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {faqData.map((faq) => {
                const isOpen = openIdx === faq.id;
                return (
                  <div
                    key={faq.id}
                    style={{
                      background: 'var(--babet-cream-bg)',
                      border: `1px solid ${isOpen ? 'var(--babet-orange)' : 'var(--babet-border)'}`,
                      borderRadius: '16px',
                      overflow: 'hidden',
                      transition: 'all 0.25s'
                    }}
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      style={{
                        width: '100%',
                        padding: '18px 22px',
                        background: 'transparent',
                        border: 'none',
                        textAlign: 'left',
                        fontWeight: '700',
                        fontSize: '16px',
                        color: 'var(--babet-navy)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <span>{faq.question}</span>
                      <span style={{ color: 'var(--babet-orange)', fontSize: '20px' }}>
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>

                    {isOpen && (
                      <div style={{ padding: '0 22px 18px', fontSize: '14px', color: 'var(--babet-muted)', lineHeight: '1.6' }}>
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Appointment Form */}
          <div className="babet-booking-form-card" id="appointment">
            <h3 className="babet-form-title">Make an Appointment 🐾</h3>
            <p style={{ fontSize: '14px', color: 'var(--babet-muted)', marginBottom: '24px' }}>
              Need advice or want to book a grooming slot? Fill out the quick form below.
            </p>

            {submitted ? (
              <div style={{ background: '#D1FAE5', color: '#065F46', padding: '16px', borderRadius: '14px', fontWeight: '700' }}>
                ✓ Thank you! Your grooming appointment request has been received. We will contact you shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="babet-form-group">
                  <input type="text" placeholder="Your Name *" required className="babet-input" />
                </div>
                <div className="babet-form-group">
                  <input type="tel" placeholder="Phone Number *" required className="babet-input" />
                </div>
                <div className="babet-form-group">
                  <select required className="babet-input">
                    <option value="">Select Grooming Service</option>
                    <option value="bath">Bathing & Drying ($35.99)</option>
                    <option value="sitting">Dog Sitting ($45.00)</option>
                    <option value="styling">Body Massage & Hair Style ($55.00)</option>
                    <option value="spa">Deluxe Spa & Nail Care ($65.99)</option>
                  </select>
                </div>
                <div className="babet-form-group">
                  <input type="date" required className="babet-input" />
                </div>
                <div className="babet-form-group">
                  <textarea placeholder="Pet Breed & Special Notes" rows="3" className="babet-input"></textarea>
                </div>

                <button type="submit" className="babet-btn-orange" style={{ width: '100%', justifyContent: 'center' }}>
                  Book Appointment Now 🐾
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentFAQ;
