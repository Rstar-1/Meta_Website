import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../common/Container';
import Image from '../common/Image';
import Icon from '../common/Icon';
import footerData from '../../data/footer.json';
import NewsletterForm from '../forms/NewsletterForm';

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
              {/* Column 1: Brand Logo & Description */}
              <div>
                <div className="flex items-center mb-16">
                  <Image
                    src={footerData.brand?.logo || '/sobo_logo.webp'}
                    alt={`${footerData.brand?.name || 'Inraclick'} Logo`}
                    className="object-contain cursor-pointer"
                    style={{ height: '52px' }}
                    onClick={() => navigate('/home')}
                  />
                </div>
                <p className="small-text text-gray m-0" style={{ lineHeight: '1.65', maxWidth: '280px' }}>
                  {footerData.brand?.description}
                </p>

                {footerData.brand?.address && (
                  <div className="flex items-start gap-8 mt-12 text-gray" style={{ maxWidth: '280px' }}>
                    <Icon name="MapPin" width="16" height="16" stroke="#FF5100" className="flex-shrink-0 mt-1" />
                    <p className="small-text m-0 text-gray" style={{ lineHeight: '1.5' }}>
                      {footerData.brand.address}
                    </p>
                  </div>
                )}

                {/* Social Links */}
                <div className="flex gap-10 mt-20">
                  {footerData.brand?.socials?.map((item, idx) => (
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

              {/* Dynamic Menu Columns from footerData */}
              {footerData.columns?.map((col, cIdx) => (
                <div key={cIdx}>
                  <h3 className="mid-text text-dark font-600 mb-16">{col.title}</h3>
                  <ul className="list-none grid-cols-1 gap-12 p-1">
                    {col.links?.map((link, lIdx) => (
                      <li key={lIdx}>
                        <span onClick={() => navigate(link.path)} className="cursor-pointer small-text text-gray">
                          {link.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Newsletter Column */}
              <div>
                <h3 className="mid-text text-dark font-600 mb-16">{footerData.newsletter?.title || 'Subscribe Newsletter'}</h3>
                <NewsletterForm
                  variant="footer"
                  placeholder={footerData.newsletter?.placeholder || 'Email address'}
                  buttonText={footerData.newsletter?.buttonText || 'Subscribe Now'}
                />
              </div>
            </div>

            {/* Bottom Copyright Row */}
            <div className="flex justify-between items-center sm-flex-column pt-30 bordb-top gap-16 text-gray">
              <div className="small-text">
                {footerData.bottom?.copyright || '© 2026 Inraclick. All rights reserved.'}
              </div>
              <div className="flex gap-12">
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
