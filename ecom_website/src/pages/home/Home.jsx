import React from 'react';
import Hero from './sections/Hero';
import SeoHelmet from '../../components/seo/SeoHelmet';
import WebsiteSchema from '../../components/seo/WebsiteSchema';
import OrganizationSchema from '../../components/seo/OrganizationSchema';
import SiteNavigationSchema from '../../components/seo/SiteNavigationSchema';

import BrowseServices from './sections/BrowseServices';
import WhyChoose from './sections/WhyChoose';
import CaseStudies from './sections/CaseStudies';
import Marquee from './sections/Marquee';
import PromoCTA from './sections/PromoCTA';
import FAQSection from './sections/FAQSection';
import TeamSection from './sections/TeamSection';
import Reviews from './sections/Reviews';
import LazySection from '../../components/common/LazySection';

const Home = () => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://sobo-marketing.com';
  const navItems = [
    { name: 'Home', url: `${siteUrl}/home` },
    { name: 'About Us', url: `${siteUrl}/about` },
    { name: 'Blog', url: `${siteUrl}/blog` },
    { name: 'Contact Us', url: `${siteUrl}/contact` }
  ];

  return (
    <>
      <SeoHelmet
        title="SOBO Marketing Solution | Industrial B2B E-Commerce"
        description="Discover high-quality industrial supplies, printing cartridges, and stainless steel products at SOBO Marketing Solution."
        keywords={['Industrial Supplies', 'Printer Cartridges', 'Stainless Steel', 'SOBO Marketing', 'B2B India']}
        image={siteUrl + '/sobo_logo.webp'}
        path="/home"
        type="website"
      />
      <WebsiteSchema siteData={{ name: 'SOBO Marketing Solution', url: siteUrl }} />
      <OrganizationSchema orgData={{ name: 'SOBO Marketing Solution', url: siteUrl, logo: siteUrl + '/sobo_logo.webp' }} />
      <SiteNavigationSchema navItems={navItems} />

      <Hero />
      <LazySection placeholderHeight="140px">
        <Marquee text="OUR LATEST CASES • " />
      </LazySection>
      <BrowseServices />

      <LazySection placeholderHeight="500px">
        <WhyChoose />
      </LazySection>
      <LazySection placeholderHeight="600px">
        <CaseStudies />
      </LazySection>
      <LazySection placeholderHeight="400px">
        <TeamSection />
      </LazySection>
      <LazySection placeholderHeight="500px">
        <FAQSection />
      </LazySection>
      <LazySection placeholderHeight="400px">
        <Reviews />
      </LazySection>
      <LazySection placeholderHeight="300px">
        <PromoCTA />
      </LazySection>
    </>
  );
};

export default Home;
