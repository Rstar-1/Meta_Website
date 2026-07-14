import React from 'react';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';

const CaseStudies = () => {
  const cases = [
    {
      id: 1,
      image: "https://demo.alhikmahsoft.com/template/stir/assets/images/case-study-6.jpg",
      tags: ["Branding", "Development", "Marketing"],
      title: "Creating high-quality video content, including promotional videos, tutorials,"
    },
    {
      id: 2,
      image: "https://demo.alhikmahsoft.com/template/stir/assets/images/case-study-8.jpg",
      tags: ["Branding", "Development", "Marketing"],
      title: "Optimizing online presence for local businesses, including local SEO strategies,"
    },
    {
      id: 3,
      image: "https://demo.alhikmahsoft.com/template/stir/assets/images/case-study-7.jpg",
      tags: ["Branding", "Development", "Marketing"],
      title: "Collaborating with influential individuals or personalities on social media,"
    },
    {
      id: 4,
      image: "https://demo.alhikmahsoft.com/template/stir/assets/images/case-study-9.jpg",
      tags: ["Branding", "Development", "Marketing"],
      title: "Running targeted paid advertisements on social media platforms to reach specific,"
    },
    {
      id: 5,
      image: "https://demo.alhikmahsoft.com/template/stir/assets/images/case-study-6.jpg",
      tags: ["Branding", "Development", "Marketing"],
      title: "Creating high-quality video content, including promotional videos, tutorials,"
    },
    {
      id: 6,
      image: "https://demo.alhikmahsoft.com/template/stir/assets/images/case-study-8.jpg",
      tags: ["Branding", "Development", "Marketing"],
      title: "Optimizing online presence for local businesses, including local SEO strategies,"
    },
  ];

  return (
    <section>
      <Container>
        <div className='w-full py-60'>
          <div className="text-center">
            <p className="text-primary font-500 uppercase small-text">WHAT WE DO</p>
            <h2 className="text-dark font-600 head-text uppercase pt-8">
              Browse Our Categories
            </h2>
          </div>
          {/* Cases Grid */}
          <div className="grid-cols-3 md-grid-cols-1 sm-grid-cols-1 mt-35" style={{ gap: '30px' }}>
            {cases.map((item, idx) => (
              <div key={idx} className="">
                <div className="">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="w-full object-cover h-300 flex rounded-5"
                  />
                </div>
                <div className="py-10">
                  <h3 className="text-dark font-500 mid-text line-clamp2 cursor-pointer">
                    {item.title}
                  </h3>
                  <div className="flex gap-12 mt-6">
                    {item.tags.map((tag, i) => (
                      <p key={i} className="bg-forth text-gray font-400 mini-text px-12 py-4 rounded-5">
                        {tag}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CaseStudies;
