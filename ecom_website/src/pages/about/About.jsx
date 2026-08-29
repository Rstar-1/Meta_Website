import React from 'react';
import Banner from '../../components/layout/Banner';
import DetailSection from './sections/DetailSection';
import WhyChoose from '../home/sections/WhyChoose';
import TeamSection from '../home/sections/TeamSection';
import Reviews from '../home/sections/Reviews';
import PromoCTA from '../home/sections/PromoCTA';
import SeoHelmet from '../../components/seo/SeoHelmet';
import OrganizationSchema from '../../components/seo/OrganizationSchema';

const About = () => {
  const siteUrl = 'https://inraclick.com';

  return (
    <>
      <SeoHelmet
        title="About Us | Inraclick Digital Agency"
        description="Learn about Inraclick (inraclick.com), our mission, team, and how our custom web engineering and Meta campaign strategies empower modern brands."
        keywords={['About Inraclick', 'Inraclick Team', 'Inraclick Digital Agency', 'Inraclick.com']}
        image={siteUrl + '/sobo_logo.webp'}
        path="/about"
        type="about"
      />
      <OrganizationSchema orgData={{ name: 'Inraclick Digital Agency', url: siteUrl, logo: siteUrl + '/sobo_logo.webp' }} />
      <Banner
        title="About Inraclick Agency"
        img="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80"
        desc="Empowering Brands Through Modern Design, Web Engineering & Performance Growth"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'About Us' }
        ]}
      />
      
      {/* Detail Section */}
      <DetailSection />
      
      {/* Core Highlights */}
      <WhyChoose />
      
      {/* Leadership & Team */}
      <TeamSection />
      
      {/* Client Reviews */}
      <Reviews />
      
      {/* Call to Action */}
      <PromoCTA />
    </>
  );
};

export default About;