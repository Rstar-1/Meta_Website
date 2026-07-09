import React from 'react';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Icon from '../../../components/common/Icon';
import childDoctorImg from '../../../assets/doctor_treating_child.png';
const discussDoctorImg = 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=600&auto=format&fit=crop';

const LatestProducts = () => {
  return (
    <Container className="bg-white py-50">
      <style>{`
        .trust-section {
          display: flex;
          align-items: center;
          gap: 40px;
          margin-bottom: 60px;
        }
        .trust-col {
          flex: 1;
        }
        .trust-img {
          width: 100%;
          border-radius: 15px;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
          object-fit: cover;
          height: 380px;
        }
        .about-tag {
          color: #1e74db;
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .trust-list {
          list-style: none;
          padding: 0;
          margin: 20px 0 0 0;
        }
        .trust-list-item {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          color: #334155;
          font-size: 0.95rem;
        }
        
        .satisfaction-row {
          display: flex;
          align-items: center;
          gap: 40px;
        }
        .stat-circle-box {
          display: flex;
          align-items: center;
          gap: 20px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 20px;
          flex: 1;
        }
        .radial-progress-dummy {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          border: 5px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: #1e74db;
          font-size: 1.1rem;
          position: relative;
        }
        .radial-progress-dummy::after {
          content: '';
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          border: 5px solid transparent;
          border-top-color: #1e74db;
          border-right-color: #1e74db;
          transform: rotate(45deg);
        }
        .radial-progress-dummy.high::after {
          border-bottom-color: #1e74db;
        }

        @media (max-width: 768px) {
          .trust-section, .satisfaction-row {
            flex-direction: column;
            gap: 24px;
          }
          .trust-section.reverse {
            flex-direction: column-reverse;
          }
          .trust-img {
            height: 280px;
          }
          .stat-circle-box {
            width: 100%;
          }
        }
      `}</style>

      {/* Row 1: Image Left, Content Right */}
      <div className="trust-section">
        <div className="trust-col">
          <Image
            src={childDoctorImg}
            alt="Doctor treating child"
            className="trust-img"
            loading="lazy"
          />
        </div>
        <div className="trust-col text-left">
          <span className="about-tag">🩺 Excellence & Care</span>
          <h2 className="large-text text-dark font-700 mt-6 leading-tight">
            Excellence in Healthcare Rooted in Trust
          </h2>
          <p className="small-text text-gray mt-15" style={{ lineHeight: '1.6' }}>
            Medula Medical Clinic provides high-end medical care solutions with a professional, compassionate approach. We prioritize your comfort, healing, and diagnostic accuracy above all else, ensuring a seamless experience.
          </p>
          <ul className="trust-list">
            <li className="trust-list-item">
              <Icon name="Checkmark" width="16" height="16" stroke="#1e74db" strokeWidth="3" />
              <span>Emergency medical assistance 24/7</span>
            </li>
            <li className="trust-list-item">
              <Icon name="Checkmark" width="16" height="16" stroke="#1e74db" strokeWidth="3" />
              <span>Top-tier diagnosis and laboratory rooms</span>
            </li>
            <li className="trust-list-item">
              <Icon name="Checkmark" width="16" height="16" stroke="#1e74db" strokeWidth="3" />
              <span>Highly experienced pediatric and general staff</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Row 2: Stats Left, Image Right */}
      <div className="trust-section reverse">
        <div className="trust-col text-left">
          <span className="about-tag">📈 Our Track Record</span>
          <h2 className="title-text text-dark font-700 mt-6 mb-20">
            Pioneering Medical Care Standards
          </h2>
          
          <div className="satisfaction-row">
            {/* Stat 1 */}
            <div className="stat-circle-box">
              <div className="radial-progress-dummy">85%</div>
              <div className="text-left">
                <h4 className="headmini-text text-dark font-700 leading-none">Specialist Doctors</h4>
                <p className="mini-text text-gray mt-4 leading-tight">Highly certified specialists in every clinical category.</p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="stat-circle-box">
              <div className="radial-progress-dummy high">90%</div>
              <div className="text-left">
                <h4 className="headmini-text text-dark font-700 leading-none">Patients Satisfaction</h4>
                <p className="mini-text text-gray mt-4 leading-tight">Consistent positive feedback from recovery patients.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="trust-col">
          <Image
            src={discussDoctorImg}
            alt="Doctors discussing consultation"
            className="trust-img"
            loading="lazy"
          />
        </div>
      </div>
    </Container>
  );
};

export default LatestProducts;
