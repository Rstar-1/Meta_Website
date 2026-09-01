import React, { useState, useEffect, useRef } from 'react';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Icon from '../../../components/common/Icon';

const metrics = [
  { label: 'TOTAL REVENUE', value: '+$29 B' },
  { label: 'LOCATIONS SUPPORTED', value: '24 K+' },
  { label: 'TOTAL NEW CUSTOMER', value: '2.6 M+' }
];

const officeCards = [
  {
    id: 'website-design',
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    alt: 'Website Design & Development Agency'
  },
  {
    id: 'marketing-agency',
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    alt: 'Digital Marketing & Strategy Team',
    hasPlayBtn: false
  },
  {
    id: 'agency-strategy',
    src: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    alt: 'Creative Agency Website Strategy'
  }
];

const AgencyAbout = () => {
  const [isHoveredBadge, setIsHoveredBadge] = useState(false);
  const cardsRef = useRef([]);

  useEffect(() => {
    let animId;
    let ticking = false;

    const handleScroll = () => {
      const winW = window.innerWidth || document.documentElement.clientWidth;
      if (winW <= 640) {
        cardsRef.current.forEach((card) => {
          if (card) card.style.transform = 'none';
        });
        ticking = false;
        return;
      }

      const winH = window.innerHeight || document.documentElement.clientHeight;
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        if (rect.top <= winH && rect.bottom >= 0) {
          const totalDist = winH + rect.height;
          const rawProgress = (winH - rect.top) / totalDist;
          const progress = Math.max(0, Math.min(1, rawProgress));

          // Card 0 & 2 move down as scroll progresses (-45px -> +45px)
          // Card 1 moves up as scroll progresses (+45px -> -45px)
          const speedFactor = idx === 1 ? -90 : 90;
          const offsetY = (progress - 0.5) * speedFactor;
          card.style.transform = `translate3d(0, ${offsetY.toFixed(2)}px, 0)`;
        }
      });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        animId = requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <Container style={{ background: 'var(--white)' }}>
      <div className="py-100 sm-py-50 relative">
        <p className="mini-text text-white bg-dark w-max px-18 py-8 rounded-20 flex items-center gap-8 font-500 uppercase">
          <Icon name="Settings" width="14" height="14" className="text-warning" />
          WHO WE ARE
        </p>
        <div className="flex sm-grid-cols-1 items-start">
          <div className="grid-cols-1 sm-grid-cols-2 w-25 sm-w-full">


            <div style={{ position: 'relative', marginTop: '10px', marginLeft: '20px' }}>
              <svg style={{ width: '90px', height: '60px', marginBottom: '-5px', marginLeft: '30px' }} viewBox="0 0 100 80" fill="none">
                <path d="M10 10 C 60 10, 80 35, 75 70" stroke="#161616" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M68 62 L 75 70 L 82 62" stroke="#161616" strokeWidth="1.8" strokeLinecap="round" />
              </svg>

              <div
                onMouseEnter={() => setIsHoveredBadge(true)}
                onMouseLeave={() => setIsHoveredBadge(false)}
                style={{
                  width: '140px',
                  height: '140px',
                  borderRadius: '50%',
                  backgroundColor: isHoveredBadge ? 'var(--warning)' : 'var(--tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  transform: isHoveredBadge ? 'scale(1.08)' : 'scale(1)',
                  boxShadow: isHoveredBadge ? '0 12px 30px rgba(255, 81, 0, 0.35)' : 'none',
                  transition: 'all 0.4s ease'
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    color: isHoveredBadge ? '#FFFFFF' : '#161616',
                    lineHeight: 1.3,
                    transition: 'color 0.35s ease'
                  }}
                >
                  <span className="flex items-center gap-4">
                    Know <Icon name="ArrowUpRight" width="14" height="14" stroke="currentColor" />
                  </span>
                  <span>More Here</span>
                </div>
              </div>
            </div>

            <div className="grid-cols-1 gap-12 mt-60 w-80 sm-w-full sm-mt-1">
              {metrics.map((item, idx) => (
                <div key={idx} className="p-10 bordb">
                  <p className="text-gray mini-text font-500">{item.label}</p>
                  <h3 className="head-text text-dark font-600 pt-4">{item.value}</h3>
                </div>
              ))}
            </div>
          </div>

          <div className="w-75 sm-w-full sm-mt-40">
            <h2 className="large-text text-dark font-600">
              <span className="font-600 text-warning">Hello!</span> Focus On Branding, Purpose, And Impactful Websites.
            </h2>

            <p className="text-gray para-text mt-12">
              With Over 8 Years Of Experience, In Your Interest, For You, For Your Customers And, Last But Not Least, For Us, We Do Everything We Can To Ensure That Our Work Makes Sense.
            </p>

            <div className="mt-62 sm-mt-30 grid-cols-3 sm-grid-cols-2 gap-12 relative">
              <div
                style={{
                  position: 'absolute',
                  bottom: '10%',
                  left: '31%',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(235, 120, 110, 0.45)',
                  zIndex: 1,
                  pointerEvents: 'none'
                }}
              />

              {officeCards.map((card, idx) => (
                <div key={card.id || idx} className={idx === 2 ? 'sm-col-span-2' : ''}>
                  <div
                    ref={(el) => (cardsRef.current[idx] = el)}
                    className="rounded-10 overflow-hidden relative w-full h-400 sm-h-200"
                    style={{
                      willChange: 'transform',
                      transform: 'translate3d(0, 0, 0)'
                    }}
                  >
                    <Image
                      src={card.src}
                      alt={card.alt}
                      className="w-full h-400 sm-h-200 object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AgencyAbout;
