import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/common/Container';
import Icon from '../../../components/common/Icon';

const BrowseCategory = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 'pediatric',
      title: 'Pediatric Care',
      description: 'Professional medical checkups and treatments specifically tailored for infants, children, and adolescents.',
      icon: 'Heart',
      bgColor: '#e8f8f0',
      iconColor: '#10b981'
    },
    {
      id: 'mental',
      title: 'Mental Health',
      description: 'Empathetic therapy sessions, psychiatric evaluations, and counseling to support your cognitive well-being.',
      icon: 'Users',
      bgColor: '#fce7f3',
      iconColor: '#ec4899'
    },
    {
      id: 'dental',
      title: 'Dental Care',
      description: 'Complete oral hygiene, cleanings, root canals, braces, and cosmetic dentistry from certified dental experts.',
      icon: 'ShieldCheck',
      bgColor: '#fef3c7',
      iconColor: '#d97706'
    },
    {
      id: 'eye',
      title: 'Eye Care',
      description: 'Comprehensive vision testing, spectacles prescriptions, laser eye surgeries, and general ophthalmology solutions.',
      icon: 'Building',
      bgColor: '#e0f2fe',
      iconColor: '#0284c7'
    }
  ];

  return (
    <Container id="services" className="bg-white">
      <style>{`
        .service-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 24px;
          text-align: left;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          border-color: #cbd5e1;
        }
        .service-icon-wrapper {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }
        .service-link {
          margin-top: auto;
          font-size: 0.8rem;
          color: #1e74db;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        .service-card:hover .service-link {
          color: #6b63ff;
        }
      `}</style>

      <div className="w-full py-50">
        <div className="text-center mb-40">
          <span style={{ color: '#1e74db', fontWeight: '700', fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>🩺 Our Services</span>
          <h2 className="large-text text-dark font-700 mt-6">Our Medical Services</h2>
        </div>

        <div className="grid grid-cols-4 md-grid-cols-2 sm-grid-cols-1 gap-24">
          {services.map((svc) => (
            <div key={svc.id} className="service-card">
              <div 
                className="service-icon-wrapper"
                style={{ backgroundColor: svc.bgColor, color: svc.iconColor }}
              >
                <Icon name={svc.icon} width="22" height="22" stroke="currentColor" strokeWidth="2.5" />
              </div>
              
              <h3 className="title-text text-dark font-700 mb-12">{svc.title}</h3>
              
              <p className="small-text text-gray mb-20" style={{ lineHeight: '1.5' }}>
                {svc.description}
              </p>
              
              <div className="service-link" onClick={() => navigate('/connect')}>
                <span>Read More</span>
                <Icon name="ArrowRight" width="12" height="12" stroke="currentColor" strokeWidth="2.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default BrowseCategory;
