import React from 'react';
import { useNavigate } from 'react-router-dom';
import { commitmentFeatures } from '../home4Data';

const AboutCommitment = () => {
  const navigate = useNavigate();

  return (
    <section className="babet-about-section" id="about">
      <div className="babet-container">
        <div className="babet-about-grid">
          {/* Left Side Image */}
          <div className="babet-about-image-card">
            <img
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&auto=format&fit=crop&q=80"
              alt="Dedicated Pet Care"
              className="babet-about-img"
            />
          </div>

          {/* Right Side Copy & Features Checklist */}
          <div>
            <span className="babet-badge">Over 12 Years of Excellence</span>
            <h2 className="babet-section-title" style={{ textAlign: 'left' }}>
              We Are Fully Committed to Your Pet’s Well-Being
            </h2>
            <p className="babet-section-subtitle" style={{ textAlign: 'left' }}>
              For over 12 years, we’ve been dedicated to making pets look fabulous and feel loved. Because to us, your pet isn’t just a client – they’re family.
            </p>

            <div className="babet-features-checklist">
              {commitmentFeatures.map((feat, idx) => (
                <div className="babet-check-item" key={idx}>
                  <div className="babet-check-icon">✓</div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <button className="babet-btn-orange" onClick={() => navigate('/about')}>
              <span>Learn More About Us</span> ↗
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCommitment;
