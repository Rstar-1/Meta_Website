import React from 'react';
import Icon from '../../../components/common/Icon';

const marqueeWords = [
  'TRANSFORM',
  'DESIGN',
  'CREATE',
  'EMPOWER',
  'BUILD',
  'INNOVATE',
  'SCALE',
  'BRAND'
];

const AgencyMarquee = () => {
  return (
    <div
      className="bg-white py-40"
    >
      <style>{`
        @keyframes marqueeSlide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>

      <div
        style={{
          transform: 'rotate(-3deg)',
          width: '140%',
          marginLeft: '-20%',
          transformOrigin: 'center center',
          backgroundColor: '#161616',
          padding: '20px 0',
        }}
      >
        <div
          className="flex items-center"
          style={{
            display: 'inline-flex',
            animation: 'marqueeSlide 25s linear infinite',
            willChange: 'transform'
          }}
        >
          {[...marqueeWords, ...marqueeWords, ...marqueeWords].map((word, idx) => (
            <div
              key={idx}
              className="flex items-center gap-24 px-24 font-800 text-white"
              style={{
                display: 'inline-flex',
                fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                letterSpacing: '0.05em'
              }}
            >
              <span>{word}</span>
              <span className="text-warning" style={{ fontSize: '0.8em' }}>
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgencyMarquee;
