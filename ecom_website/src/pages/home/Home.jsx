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
  const siteUrl = 'https://inraclick.com';

  const navItems = [
    { 
      name: 'Home', 
      url: `${siteUrl}/home`, 
      description: 'Inraclick official homepage featuring digital marketing, web engineering, and ROI case studies.' 
    },
    { 
      name: 'About Us', 
      url: `${siteUrl}/about`, 
      description: 'Learn about Inraclick Digital Agency, our vision, team, and client performance strategy.' 
    },
    { 
      name: 'Digital Services', 
      url: `${siteUrl}/services`, 
      description: 'Inraclick full service agency offerings: web development, Meta advertising, SEO, and branding.' 
    },
    { 
      name: 'Agency Insights', 
      url: `${siteUrl}/blog`, 
      description: 'Read in-depth digital marketing guides, SEO checklists, and ad campaign tips by Inraclick.' 
    },
    { 
      name: 'Connect', 
      url: `${siteUrl}/connect`, 
      description: 'Get in touch with Inraclick digital strategists for project consultations and growth audits.' 
    }
  ];

  return (
    <>
      <SeoHelmet
        title="Inraclick: Digital Marketing & Web Engineering Agency"
        description="Inraclick (inraclick.com) is India's leading digital agency providing high-converting custom web development, Meta ad campaigns, SEO, and visual branding."
        keywords={['Inraclick', 'inraclick.com', 'Inraclick Agency', 'Inraclick Digital', 'Digital Marketing Agency', 'Web Development', 'Meta Ads', 'SEO Services']}
        image={siteUrl + '/sobo_logo.webp'}
        path="/home"
        type="website"
      />
      <WebsiteSchema siteData={{ name: 'Inraclick', url: siteUrl }} />
      <OrganizationSchema orgData={{ name: 'Inraclick Digital Agency', url: siteUrl, logo: siteUrl + '/sobo_logo.webp' }} />
      <SiteNavigationSchema navItems={navItems} />

      <Hero />
      <LazySection placeholderHeight="140px">
        <Marquee text="INRICLICK CASE STUDIES & AGENCY INSIGHTS • " />
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
      <LazySection placeholderHeight="400px">
        <Reviews />
      </LazySection>
      <LazySection placeholderHeight="500px">
        <FAQSection />
      </LazySection>
      <LazySection placeholderHeight="300px">
        <PromoCTA />
      </LazySection>
    </>
  );
};

export default Home;
