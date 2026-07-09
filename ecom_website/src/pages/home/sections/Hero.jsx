import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';
import Icon from '../../../components/common/Icon';
import Image from '../../../components/common/Image';
import doctorImg from '../../../assets/doctor.png';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#f0f7ff', overflow: 'hidden', position: 'relative' }}>
      <style>{`
        .hero-container {
          min-height: 550px;
          display: flex;
          align-items: center;
          position: relative;
        }
        .hero-left {
          width: 55%;
          z-index: 10;
        }
        .hero-right {
          width: 45%;
          position: relative;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          height: 100%;
        }
        .hero-circle-bg {
          position: absolute;
          bottom: 10px;
          right: 10px;
          width: 380px;
          height: 380px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1e74db 0%, #6b63ff 100%);
          opacity: 0.15;
          z-index: 1;
        }
        .hero-doctor-img {
          position: relative;
          z-index: 2;
          max-height: 420px;
          width: 380px;
          object-fit: cover;
          border-radius: 24px;
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.15);
        }
        .welcome-tag {
          background-color: #fee2e2;
          color: #ef4444;
          font-weight: 700;
          font-size: 0.7rem;
          letter-spacing: 0.05em;
          padding: 6px 12px;
          border-radius: 20px;
          display: inline-block;
          margin-bottom: 15px;
        }
        .avatar-group {
          display: flex;
          align-items: center;
        }
        .avatar-item {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid white;
          background-color: #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.65rem;
          font-weight: 700;
          color: #475569;
          margin-left: -8px;
        }
        .avatar-item:first-child {
          margin-left: 0;
        }
        .stat-card {
          border-left: 3px solid #1e74db;
          padding-left: 15px;
        }
        @media (max-width: 768px) {
          .hero-container {
            flex-direction: column;
            padding-top: 40px;
            padding-bottom: 40px;
          }
          .hero-left, .hero-right {
            width: 100%;
          }
          .hero-right {
            justify-content: center;
            margin-top: 30px;
          }
          .hero-doctor-img {
            max-height: 320px;
          }
          .hero-circle-bg {
            width: 280px;
            height: 280px;
            right: 50%;
            transform: translateX(50%);
          }
        }
      `}</style>

      <Container className="hero-container">
        {/* Left Side Info */}
        <div className="hero-left text-left">
          <span className="welcome-tag">🩺 WELCOME TO MEDULA CLINIC</span>
          
          <h1 className="large-text text-dark font-700 mt-10" style={{ lineHeight: '1.15' }}>
            YOUR <span style={{ color: '#1e74db' }}>HEALTH</span><br />
            OUR PRIORITY
          </h1>
          
          <p className="para-text text-gray mt-15 max-w-450">
            The best medical clinic with professional doctors and high-tech equipment to treat and monitor you.
          </p>

          <div className="flex items-center gap-24 mt-30 sm-flex-wrap">
            <Button
              text="Get Started"
              bg="primary"
              version="v3"
              onClick={() => navigate('/connect')}
              style={{ padding: '12px 28px' }}
            />
            
            <div className="flex items-center gap-8">
              <div className="avatar-group">
                <div className="avatar-item" style={{ backgroundColor: '#e0f2fe', color: '#0369a1' }}>JS</div>
                <div className="avatar-item" style={{ backgroundColor: '#f0fdf4', color: '#15803d' }}>AM</div>
                <div className="avatar-item" style={{ backgroundColor: '#faf5ff', color: '#7e22ce' }}>RK</div>
                <div className="avatar-item" style={{ backgroundColor: '#fef2f2', color: '#b91c1c' }}>+</div>
              </div>
              <div>
                <p className="small-text font-700 text-dark leading-none">10K+</p>
                <p className="mini-text text-gray mt-2 leading-none">Happy Patients</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Doctor Image */}
        <div className="hero-right">
          <div className="hero-circle-bg" />
          <Image
            src={doctorImg}
            alt="Doctor"
            className="hero-doctor-img"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </Container>

      {/* Stats Bottom Bar */}
      <div className="bg-white py-30" style={{ borderTop: '1px solid #e2e8f0' }}>
        <Container>
          <div className="grid grid-cols-3 sm-grid-cols-1 gap-24">
            <div className="stat-card text-left">
              <h3 className="large-text font-700 text-primary leading-none">500+</h3>
              <p className="small-text text-gray mt-4">Specialist Doctors</p>
            </div>
            <div className="stat-card text-left">
              <h3 className="large-text font-700 text-primary leading-none">2M+</h3>
              <p className="small-text text-gray mt-4">Happy Patients</p>
            </div>
            <div className="stat-card text-left">
              <h3 className="large-text font-700 text-primary leading-none">100+</h3>
              <p className="small-text text-gray mt-4">Diagnostic Rooms</p>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Hero;
