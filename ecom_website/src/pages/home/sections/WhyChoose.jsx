import React from 'react';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Icon from '../../../components/common/Icon';
import elderlyPatientImg from '../../../assets/elderly_patient_doctor.png';

const WhyChoose = () => {
  return (
    <Container className="bg-white py-50">
      <style>{`
        .compassion-section {
          display: flex;
          align-items: center;
          gap: 50px;
        }
        .compassion-col {
          flex: 1;
        }
        .compassion-img-container {
          position: relative;
          width: 100%;
        }
        .compassion-img {
          width: 100%;
          border-radius: 20px;
          object-fit: cover;
          height: 420px;
          box-shadow: 0 15px 30px -10px rgba(0,0,0,0.1);
        }
        .compassion-deco-badge {
          position: absolute;
          top: -20px;
          left: -20px;
          background: #6b63ff;
          color: white;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 16px rgba(107, 99, 255, 0.3);
          z-index: 10;
        }
        .compassion-point {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          margin-top: 30px;
        }
        .point-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        @media (max-width: 768px) {
          .compassion-section {
            flex-direction: column;
            gap: 30px;
          }
          .compassion-img {
            height: 300px;
          }
          .compassion-deco-badge {
            top: -10px;
            left: -10px;
            width: 45px;
            height: 45px;
          }
        }
      `}</style>

      <div className="compassion-section">
        {/* Left: Image with decorative badge */}
        <div className="compassion-col">
          <div className="compassion-img-container">
            <div className="compassion-deco-badge">
              <Icon name="Star" width="22" height="22" fill="white" stroke="none" />
            </div>
            <Image
              src={elderlyPatientImg}
              alt="Compassion meets expertise"
              className="compassion-img"
              loading="lazy"
            />
          </div>
        </div>

        {/* Right: Content details */}
        <div className="compassion-col text-left">
          <span style={{ color: '#1e74db', fontWeight: '700', fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>🩺 Our philosophy</span>
          
          <h2 className="large-text text-dark font-700 mt-6 leading-tight">
            Where Compassion Meets Expertise.
          </h2>
          
          <p className="small-text text-gray mt-15" style={{ lineHeight: '1.6' }}>
            We believe in treating every individual with kindness, warmth, and the highest standard of medical skill. Our team is committed to delivering holistic care centered entirely around our patients' physical and emotional well-being.
          </p>

          {/* Point 1 */}
          <div className="compassion-point">
            <div className="point-icon-box" style={{ backgroundColor: '#fce7f3', color: '#ec4899' }}>
              <Icon name="Users" width="20" height="20" stroke="currentColor" strokeWidth="2.5" />
            </div>
            <div>
              <h4 className="mid-text text-dark font-700 leading-none">Expert Professionals</h4>
              <p className="small-text text-gray mt-6" style={{ lineHeight: '1.4' }}>
                All of our medical staff have gone through rigorous training, licensing, and continuous medical education.
              </p>
            </div>
          </div>

          {/* Point 2 */}
          <div className="compassion-point">
            <div className="point-icon-box" style={{ backgroundColor: '#e0f2fe', color: '#0284c7' }}>
              <Icon name="ShieldCheck" width="20" height="20" stroke="currentColor" strokeWidth="2.5" />
            </div>
            <div>
              <h4 className="mid-text text-dark font-700 leading-none">Beyond Treatments</h4>
              <p className="small-text text-gray mt-6" style={{ lineHeight: '1.4' }}>
                We follow up on your healing journey long after your prescription has ended to ensure a complete, healthy recovery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default WhyChoose;
