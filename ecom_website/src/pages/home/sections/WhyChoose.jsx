import React from 'react';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';

const WhyChoose = () => {
  const skills = [
    { label: "Development", percentage: 85 },
    { label: "Advertising", percentage: 65 },
    { label: "Marketing", percentage: 90 },
    { label: "Branding", percentage: 75 }
  ];

  return (
    <Container version='v0'>
      <style>{`
        .skill-bar-container {
          margin-bottom: 25px;
        }
        .skill-bar-bg {
          width: 100%;
          height: 6px;
          background: #e5e7eb;
          border-radius: 10px;
          overflow: hidden;
          margin-top: 8px;
        }
        .skill-bar-fill {
          height: 100%;
          background: var(--primary);
          border-radius: 10px;
          transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
      <div className="grid-cols-2 md-grid-cols-1 sm-grid-cols-1 gap-12 items-center">
        {/* Left Column - Image */}
        <div className='relative'>
          <Image
            src="https://demo.alhikmahsoft.com/template/stir/assets/images/who-we-are-img-2.jpg"
            alt="Brand Services"
            className="w-full object-cover h-550 flex"
          />
        </div>

        {/* Right Column - Text & Progress Bars */}
        <div className='px-30'>
          <div>
            <p className="text-primary font-600 uppercase small-text">WHO WE ARE</p>
            <h2 className="text-dark font-600 head-text pt-8">
              We Offer a Wide Range of Brand Services
            </h2>
            <p className="text-gray para-text mt-10">
              We are a Digital agency working with brands building insightful strategy, creating unique designs and crafting value.
            </p>

            {/* Progress Bars */}
            <div className='mt-20'>
              {skills.map((skill, idx) => (
                <div key={idx} className="mt-20">
                  <div className="flex justify-between items-center">
                    <p className="text-dark font-500 small-text">{skill.label}</p>
                    <p className="text-primary font-600 mini-text">{skill.percentage}%</p>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill" style={{ width: `${skill.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default WhyChoose;
