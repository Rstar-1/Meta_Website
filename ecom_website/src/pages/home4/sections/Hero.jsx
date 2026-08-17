import React from 'react';
import { useNavigate } from 'react-router-dom';
import { statsData } from '../home4Data';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="babet-hero" id="home">
      <div className="babet-container">
        <div className="babet-hero-grid">
          {/* Left Column: Copy & Actions */}
          <div className="babet-hero-content">
            <span className="babet-badge">🐾 Loved By 2500+ Pets</span>
            <h1 className="babet-hero-title">
              The Best Pets <span>Grooming Session</span>
            </h1>
            <p className="babet-hero-desc">
              We blend professional grooming with compassionate care to deliver clean, stylish, and stress-free results your pet will love every day.
            </p>

            <div className="babet-hero-actions">
              <button className="babet-btn-orange" onClick={() => navigate('/connect')}>
                <span>Make an Appointment</span> ↗
              </button>
              <a href="#services" className="babet-btn-navy">
                <span>Browse all Services</span>
              </a>
            </div>

            {/* Stat Counters Row */}
            <div className="babet-stats-row">
              {statsData.map((stat, idx) => (
                <div className="babet-stat-item" key={idx}>
                  <div className="babet-stat-val">{stat.value}</div>
                  <div className="babet-stat-lbl">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Image with Floating Badge */}
          <div className="babet-hero-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&auto=format&fit=crop&q=80"
              alt="Pet Grooming Session"
              className="babet-hero-img"
            />
            <div className="babet-hero-badge-float">
              <span style={{ fontSize: '32px' }}>✂️</span>
              <div>
                <div style={{ fontWeight: '800', fontSize: '15px', color: 'var(--babet-navy)' }}>Certified Pet Groomer</div>
                <div style={{ fontSize: '12px', color: 'var(--babet-muted)' }}>100% Gentle & Safe Care</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
