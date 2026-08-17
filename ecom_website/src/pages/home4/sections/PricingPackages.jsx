import React from 'react';
import { useNavigate } from 'react-router-dom';
import { pricingPackages } from '../home4Data';

const PricingPackages = () => {
  const navigate = useNavigate();

  return (
    <section className="babet-pricing-section" id="pricing">
      <div className="babet-container">
        {/* Header */}
        <div className="babet-section-header">
          <span className="babet-badge">Affordable Care</span>
          <h2 className="babet-section-title">Grooming Packages & Pricing</h2>
          <p className="babet-section-subtitle">
            Choose the perfect spa or grooming package for your pet with transparent, all-inclusive pricing.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="babet-pricing-grid">
          {pricingPackages.map((pkg) => (
            <div className={`babet-price-card ${pkg.popular ? 'popular' : ''}`} key={pkg.id}>
              {pkg.popular && <span className="babet-popular-tag">Most Popular</span>}
              <div>
                <h3 className="babet-plan-title">{pkg.title}</h3>
                <div className="babet-plan-price">
                  {pkg.price} <span>/{pkg.period}</span>
                </div>
                <p style={{ fontSize: '13.5px', color: 'var(--babet-muted)', marginBottom: '24px' }}>
                  {pkg.desc}
                </p>

                <ul className="babet-plan-features">
                  {pkg.features.map((feat, idx) => (
                    <li className="babet-plan-feature-item" key={idx}>
                      <span style={{ color: 'var(--babet-orange)' }}>✓</span> {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={pkg.popular ? 'babet-btn-orange' : 'babet-btn-navy'}
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => navigate('/connect')}
              >
                Enquire Now 🐾
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPackages;
