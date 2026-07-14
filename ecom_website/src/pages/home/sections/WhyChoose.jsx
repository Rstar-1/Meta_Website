import React from 'react';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Chart from '../../../components/common/Chart';

const WhyChoose = () => {
  const skills = [
    { label: "Development", percentage: 85 },
    { label: "Advertising", percentage: 65 },
    { label: "Marketing", percentage: 90 },
    { label: "Branding", percentage: 75 }
  ];

  return (
    <Container className='bg-forth'>
      <div className="grid-cols-2 md-grid-cols-1 sm-grid-cols-1 gap-12 items-center py-60">
        {/* Left Column - Image */}
        <div className='relative pr-15 sm-pr-1'>
          <Image
            src="https://demo.alhikmahsoft.com/template/stir/assets/images/who-we-are-img-2.jpg"
            alt="Brand Services"
            className="w-full object-cover h-500 rounded-5 flex"
          />
        </div>

        {/* Right Column - Text & Progress Bars */}
        <div className='pl-15 sm-pl-1'>
          <div>
            <p className="text-primary font-600 uppercase small-text">WHO WE ARE</p>
            <h2 className="text-dark font-600 head-text uppercase pt-8">
              We Offer a Wide Range of Brand Services
            </h2>
            <p className="text-gray small-text mt-10">
              We are a Digital agency working with brands building insightful strategy, creating unique designs and crafting value.
            </p>

            {/* Progress Bars */}
            <div className='mt-20'>
              <Chart items={skills} color="var(--primary)" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default WhyChoose;
