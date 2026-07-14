import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from './Icon';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll to top on pathname changes (route changes)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Monitor scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      
      setScrollProgress(progress);
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount in case the page is already scrolled
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const circumference = 2 * Math.PI * 20; // r = 20 -> ~125.66
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <>
      <button
        onClick={scrollToTop}
        className={`scroll-to-top-btn ${isVisible ? 'visible' : ''}`}
        aria-label="Scroll to top"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          border: 'none',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          padding: 0,
          outline: 'none',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.8)',
          pointerEvents: isVisible ? 'all' : 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <svg width="50" height="50" viewBox="0 0 50 50" style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}>
          {/* Faint track background circle */}
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#eef2f6"
            strokeWidth="2.5"
          />
          {/* Active progress circle */}
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#0f1623"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.1s ease',
            }}
          />
        </svg>
        {/* Centered Arrow inside (not rotated by the parent SVG rotation) */}
        <span
          style={{
            position: 'absolute',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#0f1623',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name="ArrowUp" width="18" height="18" strokeWidth="2.5" stroke="#0f1623" />
        </span>
      </button>

      {/* Hover effects style */}
      <style>{`
        .scroll-to-top-btn:hover {
          transform: scale(1.08) !important;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15) !important;
        }
        .scroll-to-top-btn:active {
          transform: scale(0.95) !important;
        }
      `}</style>
    </>
  );
};

export default ScrollToTop;
