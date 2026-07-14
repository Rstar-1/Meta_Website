import React from 'react';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';

const FeaturedBusinesses = () => {
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
  ];

  return (
    <section>
      <style>{`
        @keyframes scrollMarqueeCases {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-cases-container {
          overflow: hidden;
          white-space: nowrap;
          width: 100%;
          background: #ffffff;
          padding: 30px 0;
          border-top: 1px solid #eeeeee;
          border-bottom: 1px solid #eeeeee;
        }
        .marquee-cases-content {
          display: inline-block;
          animation: scrollMarqueeCases 20s linear infinite;
        }
        .marquee-cases-text {
          font-size: 80px;
          font-weight: 800;
          color: transparent;
          -webkit-text-stroke: 1px #dddddd;
          margin-right: 50px;
          text-transform: uppercase;
        }
      `}</style>

      <div className="marquee-cases-container">
        <div className="marquee-cases-content">
          <span className="marquee-cases-text">OUR LATEST CASES • </span>
          <span className="marquee-cases-text">OUR LATEST CASES • </span>
          <span className="marquee-cases-text">OUR LATEST CASES • </span>
          <span className="marquee-cases-text">OUR LATEST CASES • </span>
        </div>
      </div>

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
            {cases.map((item) => (
              <div key={item.id} className="">
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

export default FeaturedBusinesses;
