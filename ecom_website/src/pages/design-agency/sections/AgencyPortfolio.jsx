import React, { useState } from 'react';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Icon from '../../../components/common/Icon';

const projectsData = [
  {
    id: 'p1',
    category: 'App Design',
    tag: 'E-COMMERCE APP • 2024',
    title: 'Sneakers & Apparel Mobile Store',
    desc: 'High-converting mobile application designed with frictionless checkout, interactive 3D product previews, and personalized recommendations.',
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80',
    ]
  },
  {
    id: 'p2',
    category: 'Web Design',
    tag: 'SaaS PLATFORM • 2024',
    title: 'Fintech Analytics Dashboard',
    desc: 'Real-time financial management suite built for enterprise security, fluid data visualizations, and high performance.',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80'
    ]
  },
  {
    id: 'p3',
    category: 'Creative Media',
    tag: 'BRAND IDENTITY • 2024',
    title: 'Aura Luxury Spatial Experience',
    desc: 'Full brand design system including motion graphics, custom typography, digital storefronts, and marketing collateral.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=500&q=80'
    ]
  }
];

const AgencyPortfolio = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [activeProject, setActiveProject] = useState(projectsData[0]);
  const [hoveredFrame, setHoveredFrame] = useState(null);

  const categories = ['App Design', 'Web Design', 'Creative Media'];

  return (
    <Container>
      <div className="py-50 bordb">
        <p
          className="mini-text text-dark bg-white w-max px-18 py-6 rounded-20 flex items-center gap-8 font-700 uppercase mb-16"
        >
          <Icon name="Settings" width="14" height="14" className="text-warning" />
          OUR COMPLETE PROJECTS
        </p>
        <div className="flex sm-grid-cols-1 items-center justify-between">
          <h2 className="large-text text-white uppercase font-500">
            OUR Portfolio
          </h2>

          {/* Category Filter Tabs */}
          <div className="flex gap-12 items-center">
            {categories.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    const first = projectsData.find(p => tab === 'All' || p.category === tab);
                    if (first) setActiveProject(first);
                  }}
                  className="px-18 py-8 rounded-5 font-600 mini-text cursor-pointer"
                  style={{
                    background: isActive ? '#FF5100' : 'rgba(255, 255, 255, 0.05)',
                    border: isActive ? '1px solid #FF5100' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#FFFFFF',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Active Project Showcase */}
        <div
          className="relative overflow-hidden p-35 flex sm-grid-cols-1 bg-dark gap-12 items-center rounded-10 mt-30"
        >
          <div className="w-40 sm-w-full">
            <p className="text-warning small-text font-500 uppercase">
              {activeProject.tag}
            </p>
            <h3 className="head-text text-white font-600 pt-12">
              {activeProject.title}
            </h3>
            <p className="text-white small-text font-400 mt-8">
              {activeProject.desc}
            </p>

            <button
              className="px-28 py-12 rounded-5 font-700 flex items-center gap-8 cursor-pointer mt-20 text-white"
              style={{
                alignSelf: 'flex-start',
                backgroundColor: '#FF5100',
                border: 'none',
                boxShadow: '0 4px 15px rgba(255, 81, 0, 0.35)'
              }}
            >
              View Case Study
              <Icon name="Link" width="16" height="16" stroke="#FFFFFF" />
            </button>
          </div>

          {/* Mockup Frame Carousel */}
          <div className="grid-cols-2 sm-grid-cols-1 gap-12 w-60 sm-w-full">
            {activeProject.images.map((imgUrl, index) => (
              <div
                key={index}
              >
                <Image
                  src={imgUrl}
                  alt={`${activeProject.title} preview ${index + 1}`}
                  className="w-full h-450 object-cover flex rounded-10"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AgencyPortfolio;
