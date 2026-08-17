import React from 'react';
import { useNavigate } from 'react-router-dom';

const WhyChooseUs = () => {
  const navigate = useNavigate();

  const highlights = [
    { title: "Expert Grooming Excellence", text: "Skilled groomers bringing years of technique and passion.", icon: "⭐" },
    { title: "Hygienic & Safe Practice", text: "Sanitized tools, organic pet shampoos, and stress-free baths.", icon: "🛡️" },
    { title: "Tailored TLC For Every Pet", text: "Customized grooming plans matching breed, coat, and temperament.", icon: "🐾" },
    { title: "Stress-Free Grooming Zone", text: "Calm atmosphere with gentle handling and soothing music.", icon: "🕊️" }
  ];

  const marqueeTags = [
    "Professionalism", "Expertise", "Pet Care", "Quality Service", "Nutrition Consulting", "Certified Groomers", "Emergency Care"
  ];

  return (
    <>
      <section className="babet-why-section" id="why-choose">
        <div className="babet-container">
          <div className="babet-why-grid">
            {/* Left Copy */}
            <div>
              <span className="babet-badge">Why Choose Babet</span>
              <h2 className="babet-section-title" style={{ textAlign: 'left' }}>
                Easily Find & Book Trusted Pet Caregivers Near You
              </h2>
              <p className="babet-section-subtitle" style={{ textAlign: 'left', marginBottom: '32px' }}>
                We prioritize your pet’s comfort, health, and style. Every session is backed by love, patience, and professional pet expertise.
              </p>

              <div style={{ display: 'flex', gap: '16px' }}>
                <button className="babet-btn-orange" onClick={() => navigate('/connect')}>
                  <span>Schedule a Visit</span> 🐾
                </button>
              </div>
            </div>

            {/* Right Cards Stack */}
            <div className="babet-why-cards">
              {highlights.map((item, idx) => (
                <div className="babet-why-card-item" key={idx}>
                  <div className="babet-why-icon">{item.icon}</div>
                  <div>
                    <h4 className="babet-why-card-title">{item.title}</h4>
                    <p className="babet-why-card-text">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Ticker Banner */}
      <div className="babet-tag-marquee">
        <div className="babet-marquee-track">
          {marqueeTags.concat(marqueeTags).map((tag, idx) => (
            <span key={idx}>🐾 {tag} • </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default WhyChooseUs;
