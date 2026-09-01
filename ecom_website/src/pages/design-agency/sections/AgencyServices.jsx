import React, { useState } from 'react';
import Container from '../../../components/common/Container';
import Icon from '../../../components/common/Icon';
import Button from '../../../components/common/Button';
import Avatar from '../../../components/common/Avatar';

const servicesData = [
  {
    id: '01',
    title: 'APP DESIGN',
    desc: 'Crafting intuitive mobile & web applications designed for maximum user engagement, seamless micro-interactions, and conversion success.',
    count: '2.4K',
    photos: [
      { url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
      { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
      { url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80' }
    ]
  },
  {
    id: '02',
    title: 'WEB DESIGN',
    desc: 'Engineered high-performance web applications using modern visual standards, responsive layouts, motion design, and SEO structure.',
    count: '1.8K',
    photos: [
      { url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' },
      { url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80' },
      { url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80' }
    ]
  },
  {
    id: '03',
    title: 'CREATIVE MEDIA',
    desc: 'Full-spectrum brand identities, 3D visual assets, motion graphics, and content systems that position your company as an industry leader.',
    count: '3.1K',
    photos: [
      { url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80' },
      { url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80' },
      { url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80' }
    ]
  }
];

const AgencyServices = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <Container style={{ background: 'var(--white)' }}>
      <div className="py-80">
        <p className="mini-text text-white bg-dark mx-auto w-max px-18 py-8 rounded-20 flex items-center gap-8 font-500 uppercase mb-10">
          <Icon name="Settings" width="14" height="14" className="text-warning" />
          OUR SERVICE FOR YOU
        </p>
        <h2 className="large-text text-dark uppercase font-600 text-center">
          Solutions That Work For You
        </h2>

        {/* Cards Grid */}
        <div className="grid-cols-3 sm-grid-cols-1 gap-12 mt-40">
          {servicesData.map((service) => {
            const isHovered = hoveredCard === service.id;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="rounded-10 relative p-30 bg-tertiary"
                style={{
                  transform: isHovered ? 'translateY(-6px)' : 'none',
                  transition: 'all 0.35s ease'
                }}
              >
                {/* Service ID Counter */}
                <h4
                  className="large-text font-800 mb-10"
                  style={{
                    color: 'transparent',
                    WebkitTextStroke: '1.5px #777777'
                  }}
                >
                  {service.id}
                </h4>

                {/* Title & Description */}
                <div className="mb-30">
                  <h3 className="head-text text-dark font-700 uppercase mb-12">
                    {service.title}
                  </h3>
                  <p className="para-text text-gray font-400">
                    {service.desc}
                  </p>
                </div>

                {/* Photo Stack + Action Button */}
                <div className="flex items-center justify-between gap-16 pb-24 bordb">
                  <div className="flex items-center">
                    {service.photos.map((item, index) => (
                      <Avatar
                        key={index}
                        src={item.url}
                        alt={`Team ${index + 1}`}
                        size={46}
                        borderColor={isHovered ? '#ECE8DD' : '#E6E2D8'}
                        borderWidth={2}
                        style={{ marginLeft: index > 0 ? '-14px' : 0 }}
                      />
                    ))}
                  </div>

                  <Button
                    aria-label="Previous review"
                    icon="ArrowUp"
                    iconWidth="25"
                    iconHeight="25"
                    iconStroke="#FFFFFF"
                    version="icon"
                    bg="gray"
                  />
                </div>
                <p className="font-500 text-dark small-text mt-12">
                  {service.count}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default AgencyServices;
