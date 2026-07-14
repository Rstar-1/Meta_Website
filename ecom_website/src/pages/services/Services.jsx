import React from 'react';
import Banner from '../../components/layout/Banner';
import BrowseServices from '../home/sections/BrowseServices';
import WhyChoose from '../home/sections/WhyChoose';
import PromoCTA from '../home/sections/PromoCTA';
import SeoHelmet from '../../components/seo/SeoHelmet';

const Services = () => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://sobo-marketing.com';

  return (
    <>
      <SeoHelmet
        title="Our Services | SOBO Marketing Solution"
        description="Explore our range of premium branding design, website development, digital marketing, analytics, and SEO services."
        keywords={['B2B Services', 'Branding Design', 'Web Development', 'Digital Marketing', 'SEO India']}
        image={siteUrl + '/sobo_logo.webp'}
        path="/services"
        type="services"
      />
      <Banner
        title="Our Services"
        img="https://demo.alhikmahsoft.com/template/stir/assets/images/who-we-are-img-2.jpg"
        desc="Innovative Solutions Tailored to Power Your Business Growth"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Services' }
        ]}
      />
      
      {/* Services Grid Section */}
      <BrowseServices />
      
      {/* Additional value-adding sections */}
      <WhyChoose />
      <PromoCTA />
    </>
  );
};

export default Services;
