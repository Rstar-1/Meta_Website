import React from 'react';
import Container from '../../../components/common/Container';
import CardLayout from '../../../components/layout/CardLayout';
import blogsData from '../../../data/blogs.json';

const CaseStudies = () => {
  // Get first 6 blogs
  const cases = blogsData.slice(0, 6);

  return (
    <section>
      <Container>
        <div className='w-full py-60'>
          <div className="text-center">
            <p className="text-primary font-500 uppercase small-text">FROM OUR BLOG</p>
            <h2 className="text-dark font-600 head-text uppercase pt-8">
              Read Our Latest Insights
            </h2>
          </div>
          {/* Cases Grid */}
          <CardLayout
            items={cases}
            cardType="case-study"
            cols="3"
            mdCols="1"
            smCols="1"
            gap="12"
            className="mt-35"
          />
        </div>
      </Container>
    </section>
  );
};

export default CaseStudies;
