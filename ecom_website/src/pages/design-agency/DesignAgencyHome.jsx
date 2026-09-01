import React from 'react';
import SeoHelmet from '../../components/seo/SeoHelmet';
import WebsiteSchema from '../../components/seo/WebsiteSchema';

import AgencyHero from './sections/AgencyHero';
import AgencyAbout from './sections/AgencyAbout';
import AgencyMarquee from './sections/AgencyMarquee';
import AgencyServices from './sections/AgencyServices';
import AgencyPortfolio from './sections/AgencyPortfolio';
import AgencyTestimonials from './sections/AgencyTestimonials';
import AgencyCTA from './sections/AgencyCTA';

const DesignAgencyHome = () => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://infitech-agency.com';

  return (
    <div
      style={{
        backgroundColor: '#0b0b0b',
        color: '#ffffff',
        fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        overflowX: 'hidden',
        minHeight: '100vh'
      }}
    >
      <SeoHelmet
        title="Infitech Design Agency | A New Generation Communications Agency"
        description="Infitech is a premier digital communications agency specializing in branding, high-converting websites, app design, and creative media solutions."
        keywords={['Design Agency', 'Web Design', 'App Design', 'Infitech', 'Branding', 'Creative Media']}
        path="/design-agency"
        type="website"
      />
      <WebsiteSchema siteData={{ name: 'Infitech Design Agency', url: siteUrl }} />

      <AgencyHero />
      <AgencyAbout />
      <AgencyMarquee />
      <AgencyServices />
      <AgencyPortfolio />
      <AgencyCTA />
      <AgencyTestimonials />
    </div>
  );
};

export default DesignAgencyHome;
