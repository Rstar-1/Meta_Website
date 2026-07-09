import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';
import Icon from '../../../components/common/Icon';

const BusinessPromo = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Basic Plan',
      price: '$150',
      period: 'month',
      description: 'Ideal for individuals seeking general healthcare checkups.',
      features: [
        'Standard health checkups',
        'General physician consults',
        '24/7 medical hotline support',
        'Basic lab diagnostics'
      ],
      isPopular: false,
      buttonBg: 'primary'
    },
    {
      name: 'Professional Plan',
      price: '$380',
      period: 'month',
      description: 'Best for families requiring specialized care & diagnostics.',
      features: [
        'Advanced health diagnostics',
        'Pediatric & Dental consultations',
        'Specialist doctors queue priority',
        'Family health portal access',
        'Prescription drug discounts'
      ],
      isPopular: true,
      buttonBg: 'secondary'
    },
    {
      name: 'Business Plan',
      price: '$550',
      period: 'month',
      description: 'Comprehensive wellness plans for corporate teams or large families.',
      features: [
        'Full body MRI & Lab scans',
        'Unlimited specialist consults',
        'Dedicated health manager',
        'In-home nursing care options',
        'Vaccination coverage included'
      ],
      isPopular: false,
      buttonBg: 'primary'
    }
  ];

  return (
    <Container className="bg-white py-50">
      <style>{`
        .pricing-section-title {
          text-align: center;
          margin-bottom: 40px;
        }
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          align-items: stretch;
        }
        .pricing-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 30px;
          display: flex;
          flex-direction: column;
          position: relative;
          transition: all 0.3s ease;
          text-align: left;
        }
        .pricing-card.popular {
          border-color: #6b63ff;
          box-shadow: 0 10px 25px -5px rgba(107, 99, 255, 0.15);
          transform: translateY(-8px);
        }
        .popular-badge {
          position: absolute;
          top: -12px;
          right: 20px;
          background: #6b63ff;
          color: white;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 12px;
          text-transform: uppercase;
        }
        .price-text {
          font-size: 2.2rem;
          font-weight: 800;
          color: #0f1623;
          margin-top: 15px;
          margin-bottom: 15px;
        }
        .price-period {
          font-size: 0.9rem;
          color: #64748b;
          font-weight: 400;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          font-size: 0.9rem;
          color: #334155;
        }
        @media (max-width: 960px) {
          .pricing-grid {
            grid-template-columns: 1fr;
          }
          .pricing-card.popular {
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="w-full">
        <div className="pricing-section-title">
          <span style={{ color: '#1e74db', fontWeight: '700', fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>🩺 Membership Plans</span>
          <h2 className="large-text text-dark font-700 mt-6">Flexible Options for Every Patient</h2>
        </div>

        <div className="pricing-grid">
          {plans.map((plan, idx) => (
            <div key={idx} className={`pricing-card ${plan.isPopular ? 'popular' : ''}`}>
              {plan.isPopular && <div className="popular-badge">Most Popular</div>}
              
              <h3 className="title-text text-dark font-700">{plan.name}</h3>
              <p className="mini-text text-gray mt-6">{plan.description}</p>
              
              <div className="price-text">
                {plan.price}<span className="price-period">/{plan.period}</span>
              </div>
              
              <hr style={{ border: '0', borderTop: '1px solid #e2e8f0', margin: '10px 0 20px 0' }} />
              
              <div style={{ marginBottom: '30px' }}>
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className="feature-item">
                    <Icon name="Checkmark" width="14" height="14" stroke="#10b981" strokeWidth="3.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button
                text="Subscribe Plan"
                bg={plan.isPopular ? 'secondary' : 'primary'}
                version="v3"
                className="w-full mt-auto"
                onClick={() => navigate('/connect')}
              />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default BusinessPromo;
