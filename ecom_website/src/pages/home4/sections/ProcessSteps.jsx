import React from 'react';
import { processSteps } from '../home4Data';

const ProcessSteps = () => {
  return (
    <section className="babet-process-section" id="process">
      <div className="babet-container">
        {/* Section Header */}
        <div className="babet-section-header">
          <span className="babet-badge">Simple 3-Step Process</span>
          <h2 className="babet-section-title">How We Help Your Pet</h2>
          <p className="babet-section-subtitle">
            Seamless booking and professional pet pampering from start to finish.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="babet-process-grid">
          {processSteps.map((stepItem, idx) => (
            <div className="babet-process-card" key={idx}>
              <span className="babet-step-number">{stepItem.step}</span>
              <div className="babet-process-icon">{stepItem.icon}</div>
              <h3 className="babet-process-title">{stepItem.title}</h3>
              <p className="babet-process-desc">{stepItem.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
