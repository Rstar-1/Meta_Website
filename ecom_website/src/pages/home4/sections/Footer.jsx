import React from 'react';

const Footer = ({ onSocialClick }) => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { id: 'fb', icon: '🔵', label: 'Facebook' },
    { id: 'tw', icon: '🐦', label: 'Twitter' },
    { id: 'li', icon: '💼', label: 'LinkedIn' },
    { id: 'ig', icon: '📸', label: 'Instagram' },
    { id: 'yt', icon: '📺', label: 'YouTube' }
  ];

  return (
    <footer className="home4-footer">
      <div className="footer-grid-container">
        <div className="footer-col">
          <div className="footer-logo">
            Just<span>dial</span>
          </div>
          <p className="footer-desc">
            India's No. 1 local business discovery platform, connecting buyers and sellers for products, services, and local businesses nationwide.
          </p>
          <div className="social-links">
            {socialLinks.map((social) => (
              <a 
                key={social.id} 
                href={`#social-${social.id}`}
                className="social-icon-btn"
                title={social.label}
                onClick={(e) => {
                  e.preventDefault();
                  if (onSocialClick) onSocialClick(social.label);
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h4 className="col-title">For Users</h4>
          <ul className="footer-links-list">
            <li><a href="#home" className="footer-link-item">Home</a></li>
            <li><a href="#categories" className="footer-link-item">Categories</a></li>
            <li><a href="#products" className="footer-link-item">Products</a></li>
            <li><a href="#companies" className="footer-link-item">Companies</a></li>
            <li><a href="#services" className="footer-link-item">Services</a></li>
            <li><a href="#deals" className="footer-link-item">Deals</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="col-title">For Business</h4>
          <ul className="footer-links-list">
            <li><a href="#list" className="footer-link-item">List Your Business</a></li>
            <li><a href="#advertise" className="footer-link-item">Advertise with Us</a></li>
            <li><a href="#login" className="footer-link-item">Business Login</a></li>
            <li><a href="#directory" className="footer-link-item">Business Directory</a></li>
            <li><a href="#social" className="footer-link-item">JD Social</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="col-title">Support</h4>
          <ul className="footer-links-list">
            <li><a href="#help" className="footer-link-item">Help & Support</a></li>
            <li><a href="#contact" className="footer-link-item">Contact Us</a></li>
            <li><a href="#feedback" className="footer-link-item">Feedback</a></li>
            <li><a href="#report" className="footer-link-item">Report an Issue</a></li>
            <li><a href="#sitemap" className="footer-link-item">Sitemap</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="col-title">Legal</h4>
          <ul className="footer-links-list">
            <li><a href="#terms" className="footer-link-item">Terms of Use</a></li>
            <li><a href="#privacy" className="footer-link-item">Privacy Policy</a></li>
            <li><a href="#cookie" className="footer-link-item">Cookie Policy</a></li>
            <li><a href="#refund" className="footer-link-item">Refund Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <span className="copyright-text">
          © {currentYear} Justdial Ltd. All Rights Reserved.
        </span>

        <div className="selectors-row">
          <select className="select-box" defaultValue="India" aria-label="Select Country">
            <option value="India">🇮🇳 India</option>
            <option value="USA">🇺🇸 USA</option>
            <option value="UK">🇬🇧 UK</option>
          </select>

          <select className="select-box" defaultValue="English" aria-label="Select Language">
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Tamil">Tamil</option>
          </select>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
