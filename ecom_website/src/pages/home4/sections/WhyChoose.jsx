import React from 'react';

const WhyChoose = () => {
  const points = [
    {
      id: 'wc-1',
      icon: '🛡️',
      title: 'Trusted Platform',
      desc: 'Over 25 Crore users trust us'
    },
    {
      id: 'wc-2',
      icon: '✅',
      title: 'Verified Businesses',
      desc: 'Genuine & reliable business listings'
    },
    {
      id: 'wc-3',
      icon: '👍',
      title: 'Easy to Use',
      desc: 'Search, connect & grow your business'
    },
    {
      id: 'wc-4',
      icon: '🎧',
      title: '24x7 Support',
      desc: "We're here to help you anytime"
    }
  ];

  return (
    <section className="home4-why-choose-section">
      <div className="why-choose-grid">
        {points.map((point) => (
          <div key={point.id} className="why-choose-card">
            <div className="card-icon-box">
              <span>{point.icon}</span>
            </div>
            <div className="why-choose-info">
              <h3 className="why-choose-title">{point.title}</h3>
              <p className="why-choose-desc">{point.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChoose;
