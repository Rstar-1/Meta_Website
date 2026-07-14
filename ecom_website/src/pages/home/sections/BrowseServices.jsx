import React from 'react';
import Container from '../../../components/common/Container';
import Icon from '../../../components/common/Icon';
import Image from '../../../components/common/Image';

const BrowseServices = () => {
  const services = [
    {
      id: 1,
      icon: "https://demo.alhikmahsoft.com/template/stir/assets/images/services-icon-9.svg",
      title: "Branding Design",
      desc: "We care success relationships fuel real success We love building brands and helping fuel real success We love building brands and helping"
    },
    {
      id: 2,
      icon: "https://demo.alhikmahsoft.com/template/stir/assets/images/services-icon-10.svg",
      title: "Website Development",
      desc: "We care success relationships fuel real success We love building brands and helping fuel real success We love building brands and helping"
    },
    {
      id: 3,
      icon: "https://demo.alhikmahsoft.com/template/stir/assets/images/services-icon-11.svg",
      title: "Digital Marketing",
      desc: "We care success relationships fuel real success We love building brands and helping fuel real success We love building brands and helping"
    },
    {
      id: 4,
      icon: "https://demo.alhikmahsoft.com/template/stir/assets/images/services-icon-12.svg",
      title: "Social Media Management",
      desc: "We care success relationships fuel real success We love building brands and helping fuel real success We love building brands and helping"
    },
    {
      id: 5,
      icon: "https://demo.alhikmahsoft.com/template/stir/assets/images/services-icon-13.svg",
      title: "Analytics and Performance",
      desc: "We care success relationships fuel real success We love building brands and helping fuel real success We love building brands and helping"
    },
    {
      id: 6,
      icon: "https://demo.alhikmahsoft.com/template/stir/assets/images/services-icon-14.svg",
      title: "Search Engine Optimization",
      desc: "We care success relationships fuel real success We love building brands and helping fuel real success We love building brands and helping"
    }
  ];

  return (
    <Container id="services">
      <style>{`
        .service-card {
          background: var(--forth);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid transparent;
        }
        .service-card:hover {
          background: var(--white);
          border: 1px solid var(--primary);
          transform: translateY(-8px);
        }
        .service-icon-bg {
          width: 70px;
          height: 70px;
          background: #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s ease;
        }
      `}</style>

      <div className='py-60'>
        <div className="text-center">
          <p className="text-primary font-500 uppercase small-text">WHAT WE DO</p>
          <h2 className="text-dark font-600 head-text uppercase pt-8">
            Browse Our Categories
          </h2>
        </div>

        <div className="grid-cols-3 md-grid-cols-2 sm-grid-cols-1 mt-40" style={{ gap: '30px' }}>
          {services.map((item) => (
            <div key={item.id} className="service-card py-35 px-30 rounded-10">
              <div>
                <div className="service-icon-bg">
                  <Image src={item.icon} alt={item.title} width='30px' height='30px' className="flex object-contain" />
                </div>
                <h3 className="text-dark title-text font-600 pt-20">{item.title}</h3>
                <p className="text-gray small-text line-clamp3 mt-16">{item.desc}</p>
                <p className="text-dark small-text font-600 mt-28 flex items-center gap-6">Read More <Icon name="ArrowRight" width="14" height="14" stroke="currentColor" strokeWidth="2.5" /></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default BrowseServices;
