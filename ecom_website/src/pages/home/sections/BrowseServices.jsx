import React from 'react';
import Container from '../../../components/common/Container';
import CardLayout from '../../../components/layout/CardLayout';

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
      <div className='py-60'>
        <div className="text-center">
          <p className="text-primary font-500 uppercase small-text">WHAT WE DO</p>
          <h2 className="text-dark font-600 head-text uppercase pt-8">
            Browse Our Categories
          </h2>
        </div>

        <CardLayout
          items={services}
          cardType="service"
          cols="3"
          mdCols="2"
          smCols="1"
          gap="12"
          className="mt-40"
        />
      </div>
    </Container>
  );
};

export default BrowseServices;
