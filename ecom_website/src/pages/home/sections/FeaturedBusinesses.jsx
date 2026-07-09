import React from 'react';
import Icon from '../../../components/common/Icon';

const FeaturedBusinesses = () => {
  const items = [
    { label: 'MEDICAL GROUP', icon: 'Building' },
    { label: 'CORE SERVICES', icon: 'ShieldCheck' },
    { label: 'TECHNOLOGY', icon: 'Layers' },
    { label: 'EXPERT CLINICIANS', icon: 'Users' },
    { label: 'COMPASSIONATE TREATMENT', icon: 'Heart' },
    { label: 'ACCURATE DIAGNOSTICS', icon: 'Star' }
  ];

  // Duplicate items to ensure smooth infinite loop
  const marqueeItems = [...items, ...items, ...items, ...items];

  return (
    <div style={{ background: '#1e74db', overflow: 'hidden', width: '100%' }}>
      <style>{`
        @keyframes scrollMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        .marquee-container {
          display: flex;
          white-space: nowrap;
          overflow: hidden;
          padding: 15px 0;
        }
        .marquee-track {
          display: flex;
          align-items: center;
          gap: 50px;
          animation: scrollMarquee 25s linear infinite;
        }
        .marquee-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #ffffff;
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: 0.05em;
        }
      `}</style>
      
      <div className="marquee-container">
        <div className="marquee-track">
          {marqueeItems.map((item, index) => (
            <div key={index} className="marquee-item">
              <Icon name={item.icon} width="16" height="16" stroke="#ffffff" strokeWidth="2.5" fill="none" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedBusinesses;
