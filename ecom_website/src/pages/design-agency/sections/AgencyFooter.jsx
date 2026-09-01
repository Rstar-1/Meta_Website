import React, { useState } from 'react';

const AgencyFooter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer style={{ backgroundColor: '#FAF8F5', color: '#161616', fontFamily: 'system-ui, sans-serif' }}>
      {/* Main Footer Container */}
      <div style={{ maxWidth: '1350px', margin: '0 auto', padding: '80px 5% 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '50px', marginBottom: '60px' }}>
          {/* Col 1: Brand Info & Social Icons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <a href="/design-agency" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#161616', fontWeight: 800, fontSize: '1.6rem' }}>
              <span style={{ width: '34px', height: '34px', backgroundColor: '#FF5100', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', fontWeight: 900, fontSize: '1.2rem' }}>
                i
              </span>
              Infitech
            </a>

            <p style={{ color: '#666666', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
              Businesses to thrive in changing digital world. With over a decade systems that drive growth an efficiency. From IT consulting.
            </p>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              {['Facebook', 'LinkedIn', 'Twitter', 'YouTube'].map((name, i) => (
                <a
                  key={i}
                  href={`https://${name.toLowerCase()}.com`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1px solid #DED9CF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#161616',
                    textDecoration: 'none',
                    fontSize: '0.85rem'
                  }}
                >
                  ✦
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Company Links */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#161616', marginBottom: '20px', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['About us', 'Work process', 'Our team', 'Contact', 'Careers'].map((link, idx) => (
                <li key={idx}>
                  <a href={`#${link.toLowerCase().replace(' ', '')}`} style={{ color: '#666666', textDecoration: 'none', fontSize: '0.95rem' }}>
                    {link}
                  </a>
                </li>
              ))}
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <a href="#blog" style={{ color: '#666666', textDecoration: 'none', fontSize: '0.95rem' }}>
                  Blogs
                </a>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FF5100' }} />
              </li>
            </ul>
          </div>

          {/* Col 3: Resource Links */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#161616', marginBottom: '20px', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
              Recourse
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Future innovations', 'Smart solutions', 'IT consulting', 'NextGen IT', 'Marketing Agency', 'Software solution'].map((link, idx) => (
                <li key={idx}>
                  <a href="#services" style={{ color: '#666666', textDecoration: 'none', fontSize: '0.95rem' }}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Subscribe Newsletter */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#161616', marginBottom: '20px', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
              Subscribe Newsletter
            </h4>

            {subscribed ? (
              <div style={{ color: '#FF5100', fontWeight: 700, fontSize: '0.95rem' }}>
                ✓ Subscribed! Thank you for joining Infitech.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    borderRadius: '50px',
                    border: '1px solid #DED9CF',
                    backgroundColor: '#FFFFFF',
                    outline: 'none',
                    fontSize: '0.95rem',
                    boxSizing: 'border-box'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#FF5100',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '14px 24px',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(255, 81, 0, 0.35)'
                  }}
                >
                  Subscribe Now ↗
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '30px',
            borderTop: '1px solid #DED9CF',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.88rem',
            color: '#666666'
          }}
        >
          <div>
            Copyright <span style={{ color: '#FF5100', fontWeight: 700 }}>infitech.</span> All rights reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <a href="/privacy" style={{ color: '#666666', textDecoration: 'none' }}>Privacy policy</a>
            <span style={{ color: '#AAAAAA' }}>|</span>
            <a href="/terms" style={{ color: '#666666', textDecoration: 'none' }}>Terms &amp; conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AgencyFooter;
