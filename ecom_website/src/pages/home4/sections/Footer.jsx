import React from 'react';

const Footer = () => {
  return (
    <footer className="babet-footer">
      <div className="babet-container">
        <div className="babet-footer-grid">
          {/* Brand Info */}
          <div>
            <div className="babet-footer-logo">
              <span style={{ color: 'var(--babet-orange)' }}>🐾</span> Babet Pet Care
            </div>
            <p className="babet-footer-desc">
              Babet is a convenient, full-service pet care & grooming agency in New York. We love and care for every pet with certified expertise.
            </p>
            <div style={{ marginTop: '20px', fontSize: '14px', color: 'rgba(255,255,255,0.85)' }}>
              <div>📞 Call Us: +00-(120) 3456 789</div>
              <div style={{ marginTop: '6px' }}>📧 infomail123@domain.com</div>
              <div style={{ marginTop: '6px' }}>📍 West 2nd lane, Inner circular road, New York</div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="babet-footer-heading">Quick Links</h4>
            <ul className="babet-footer-links">
              <li className="babet-footer-link"><a href="/home4">Home</a></li>
              <li className="babet-footer-link"><a href="#about">About Us</a></li>
              <li className="babet-footer-link"><a href="#services">Services</a></li>
              <li className="babet-footer-link"><a href="#groomers">Our Groomers</a></li>
              <li className="babet-footer-link"><a href="#appointment">Book Appointment</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="babet-footer-heading">Services</h4>
            <ul className="babet-footer-links">
              <li className="babet-footer-link"><a href="#services">Dog & Cat Grooming</a></li>
              <li className="babet-footer-link"><a href="#services">Bath & Brush Out</a></li>
              <li className="babet-footer-link"><a href="#services">Haircuts & Styling</a></li>
              <li className="babet-footer-link"><a href="#services">Nail Trimming</a></li>
              <li className="babet-footer-link"><a href="#services">Ear & Dental Hygiene</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="babet-footer-heading">Support</h4>
            <ul className="babet-footer-links">
              <li className="babet-footer-link"><a href="#faq">Help Center & FAQs</a></li>
              <li className="babet-footer-link"><a href="/connect">Contact Us</a></li>
              <li className="babet-footer-link"><a href="#blog">Preventative Care Blog</a></li>
              <li className="babet-footer-link"><a href="/terms">Terms & Conditions</a></li>
              <li className="babet-footer-link"><a href="/privacy">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="babet-copyright">
          © {new Date().getFullYear()} Babet Pet Care & Shop. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
