import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../common/Container';
import Icon from '../common/Icon';
import footerData from '../../data/footer.json';
import NewsletterForm from '../forms/NewsletterForm';

const socialLinks = [
  { iconName: 'Facebook', url: 'https://www.facebook.com/Inraclick/' },
  { iconName: 'YouTube', url: 'https://www.youtube.com/@INRACLICK' },
  { iconName: 'LinkedIn', url: 'https://www.linkedin.com/company/-inraclick/' }
];

const Footer = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const bannerRef = useRef(null);

  useEffect(() => {
    let animId;
    let ticking = false;

    const updateParallax = () => {
      if (!containerRef.current || !bannerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      const totalDistance = windowHeight + rect.height;
      const rawProgress = (windowHeight - rect.top) / totalDistance;
      const progress = Math.max(0, Math.min(1, rawProgress));

      const offsetY = (progress - 0.5) * 160;
      bannerRef.current.style.transform = `translate3d(0, ${offsetY.toFixed(2)}px, 0)`;
      ticking = false;
    };

    const handleScrollOrResize = () => {
      if (!ticking) {
        animId = requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });
    updateParallax();

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <footer className="w-full relative" style={{ backgroundColor: '#FAF8F5', color: '#161616' }}>
      {/* 1. High-Height Parallax Image Banner */}
      <div
        ref={containerRef}
        className="w-full relative overflow-hidden h-500 sm-h-250"
        style={{ backgroundColor: '#0F1623' }}
      >
        <div
          ref={bannerRef}
          style={{
            position: 'absolute',
            top: '-25%',
            left: 0,
            width: '100%',
            height: '150%',
            backgroundImage: 'url(/agency_footer_banner.png)',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            willChange: 'transform',
            transform: 'translate3d(0, -80px, 0)'
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)' }}
        />
      </div>

      {/* 2. Main Footer Content */}
      <div className="py-60">
        <Container>
          <div className="w-full">
            <div className="grid-cols-4 md-grid-cols-2 sm-grid-cols-1 items-start gap-30">
              {/* Column 1: Infitech Brand */}
              <div>
                <div className="flex items-center gap-10 mb-16">
                  <span
                    className="rounded-6 font-900 text-white center-div flex-shrink-0"
                    style={{ width: '34px', height: '34px', backgroundColor: '#FF5100', fontSize: '1.2rem' }}
                  >
                    i
                  </span>
                  <span className="font-800 text-dark" style={{ fontSize: '1.5rem', letterSpacing: '-0.02em' }}>
                    Infitech
                  </span>
                </div>
                <p className="small-text text-gray m-0" style={{ lineHeight: '1.65', maxWidth: '300px' }}>
                  Businesses to thrive in changing digital world. With over a decade systems that drive growth an efficiency. From IT consulting.
                </p>

                {/* Social Links */}
                <div className="flex gap-10 mt-20">
                  {socialLinks.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.iconName}
                      className="center-div rounded-circle text-white decoration-none transition-all"
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: '#4A4D52'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#FF5100';
                        e.currentTarget.style.transform = 'translateY(-3px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#4A4D52';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <Icon name={item.iconName} width="16" height="16" fill="#FFFFFF" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Column 2: Company Links */}
              <div>
                <h3 className="mid-text text-dark font-600 mb-16">Company</h3>
                <ul className="list-none grid-cols-1 gap-12 p-1">
                  {[
                    { label: 'Home', path: '/' },
                    { label: 'About Us', path: '/about' },
                    { label: 'Blogs', path: '/blog' }
                  ].map((item, idx) => (
                    <li key={idx}>
                      <span onClick={() => navigate(item.path)} className="cursor-pointer small-text text-gray">
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Recourse Links */}
              <div>
                <h3 className="mid-text text-dark font-600 mb-16">Recourse</h3>
                <ul className="list-none grid-cols-1 gap-12 p-1">
                  {[
                    { label: 'About Group', path: '/about' },
                    { label: 'Contact Desk', path: '/connect' },
                    { label: 'Engineering Insights', path: '/blog' }
                  ].map((item, idx) => (
                    <li key={idx}>
                      <span onClick={() => navigate(item.path)} className="cursor-pointer small-text text-gray">
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 4: Newsletter */}
              <div>
                <h3 className="mid-text text-dark font-600 mb-16">Subscribe Newsletter</h3>
                <NewsletterForm variant="footer" placeholder="Email address" buttonText="Subscribe Now" />
              </div>
            </div>

            {/* Bottom Copyright Row */}
            <div className="flex justify-between items-center sm-flex-column mt-50 pt-24 bordb-top gap-16 text-gray">
              <div className="small-text">
                {footerData.bottom?.copyright || '© 2026 Infitech. All Rights Reserved.'}
              </div>
              <div className="flex gap-16">
                {footerData.bottom?.links?.map((link, idx) => (
                  <a key={idx} href={link.url} className="decoration-none small-text text-gray">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
