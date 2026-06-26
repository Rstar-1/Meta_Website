import React, { useState, useEffect } from 'react';
import Container from '../../../components/common/Container';

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
    <Container>
      <div className="w-full p-30 my-20 bg-forth rounded-5">
        <h2 className="title-text text-dark font-600">Why Choose Us ?</h2>
        <p className="text-gray small-text mt-1">
          Genuine & reliable business listings
        </p>
        <div className="grid-cols-4 gap-20 mt-30">
          {points.map((point) => (
            <div
              key={point.id}
              className="flex items-center gap-12"
            >
              <div className='w-20'>
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    backgroundColor: '#f3f4f6',
                    width: '60px',
                    height: '60px',
                    fontSize: '22px'
                  }}
                >
                  {point.icon}
                </div>
              </div>
              <div className="w-80">
                <h3 className="text-dark font-600 mid-text">
                  {point.title}
                </h3>
                <p className="text-gray mini-text mt-2">
                  {point.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default WhyChoose;
