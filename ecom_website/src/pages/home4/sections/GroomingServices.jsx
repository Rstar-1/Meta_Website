import React from 'react';
import { servicesData } from '../home4Data';

const GroomingServices = () => {
  return (
    <section className="babet-services-section" id="services">
      <div className="babet-container">
        {/* Section Header */}
        <div className="babet-section-header">
          <span className="babet-badge">Top Grooming Services</span>
          <h2 className="babet-section-title">Our All Grooming Services Include</h2>
          <p className="babet-section-subtitle">
            From soothing baths and precision hair haircuts to paw spa therapies, we provide full-service pet pampering.
          </p>
        </div>

        {/* 8-Card Grid */}
        <div className="babet-services-grid">
          {servicesData.map((svc) => (
            <div className="babet-service-card" key={svc.id}>
              <span className="babet-service-badge">{svc.badge}</span>
              <div>
                <div className="babet-service-icon">{svc.icon}</div>
                <h3 className="babet-service-title">{svc.title}</h3>
                <p className="babet-service-desc">{svc.desc}</p>
              </div>
              <a href="#appointment" style={{ color: 'var(--babet-orange)', fontWeight: '700', fontSize: '13.5px', textDecoration: 'none' }}>
                Book Service ↗
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GroomingServices;
