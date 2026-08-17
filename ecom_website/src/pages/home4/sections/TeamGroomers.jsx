import React from 'react';
import { teamData } from '../home4Data';

const TeamGroomers = () => {
  return (
    <section className="babet-team-section" id="groomers">
      <div className="babet-container">
        {/* Header */}
        <div className="babet-section-header">
          <span className="babet-badge">Dedicated Specialists</span>
          <h2 className="babet-section-title">Meet Our Pet Care Team</h2>
          <p className="babet-section-subtitle">
            Our team is made up of passionate, certified professionals who treat every animal with love and patience.
          </p>
        </div>

        {/* 4-Member Grid */}
        <div className="babet-team-grid">
          {teamData.map((member) => (
            <div className="babet-team-card" key={member.id}>
              <img src={member.image} alt={member.name} className="babet-team-img" />
              <div className="babet-team-details">
                <h4 className="babet-member-name">{member.name}</h4>
                <div className="babet-member-role">{member.role}</div>
                <p style={{ fontSize: '12.5px', color: 'var(--babet-muted)', marginTop: '8px', marginBottom: 0 }}>
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamGroomers;
