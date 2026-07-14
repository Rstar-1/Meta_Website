import React from 'react';
import Container from '../../../components/common/Container';

const Marquee = ({ text = "OUR LATEST CASES •" }) => {
  return (
    <Container version='v0'>
      <style>{`
        @keyframes scrollMarqueeCases {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-cases-container {
          overflow: hidden;
          white-space: nowrap;
          width: 100%;
          background: #ffffff;
          padding: 30px 0;
          border-top: 1px solid #eeeeee;
          border-bottom: 1px solid #eeeeee;
        }
        .marquee-cases-content {
          display: inline-block;
          animation: scrollMarqueeCases 20s linear infinite;
        }
        .marquee-cases-text {
          font-size: 80px;
          font-weight: 800;
          color: transparent;
          -webkit-text-stroke: 1px #dddddd;
          margin-right: 50px;
          text-transform: uppercase;
        }
      `}</style>

      <div className="marquee-cases-container">
        <div className="marquee-cases-content">
          <span className="marquee-cases-text">{text}</span>
          <span className="marquee-cases-text">{text}</span>
          <span className="marquee-cases-text">{text}</span>
          <span className="marquee-cases-text">{text}</span>
        </div>
      </div>
    </Container>
  );
};

export default Marquee;
