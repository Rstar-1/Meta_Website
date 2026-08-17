import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Top Mini Info Bar */}
      <div className="babet-topbar">
        <div className="babet-container babet-topbar-content">
          <div className="babet-topbar-left">
            <a href="tel:001203456789" className="babet-topbar-item">
              <span>📞</span> Call us: +00-(120) 3456 789
            </a>
            <span className="babet-topbar-item">
              <span>📍</span> West 2nd lane, New York City
            </span>
            <span className="babet-topbar-item">
              <span>📧</span> info@babetpet.com
            </span>
          </div>
          <div>
            <span className="babet-topbar-item">
              🐾 Open Hours: Mon - Sat 8:00 AM - 7:00 PM
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="babet-header">
        <div className="babet-container babet-nav">
          {/* Logo */}
          <a href="/home4" className="babet-logo">
            <div className="babet-logo-icon">🐾</div>
            <span>Babet</span>
          </a>

          {/* Nav Links */}
          <ul className="babet-nav-links">
            <li><a href="/home4" className="babet-nav-link">Home</a></li>
            <li><a href="#about" className="babet-nav-link">About Us</a></li>
            <li><a href="#services" className="babet-nav-link">Services</a></li>
            <li><a href="#pricing" className="babet-nav-link">Pricing</a></li>
            <li><a href="#groomers" className="babet-nav-link">Our Groomers</a></li>
            <li><a href="#blog" className="babet-nav-link">Blog</a></li>
            <li><a href="/connect" className="babet-nav-link">Contact</a></li>
          </ul>

          {/* CTA Action */}
          <button className="babet-btn-orange" onClick={() => navigate('/connect')}>
            <span>Make Appointment</span> 🐾
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
