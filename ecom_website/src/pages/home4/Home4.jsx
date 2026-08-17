import React from 'react';
import './home4.css';

import Header from './sections/Header';
import Hero from './sections/Hero';
import AboutCommitment from './sections/AboutCommitment';
import GroomingServices from './sections/GroomingServices';
import WhyChooseUs from './sections/WhyChooseUs';
import ProcessSteps from './sections/ProcessSteps';
import PricingPackages from './sections/PricingPackages';
import Testimonials from './sections/Testimonials';
import TeamGroomers from './sections/TeamGroomers';
import AppointmentFAQ from './sections/AppointmentFAQ';
import LatestBlog from './sections/LatestBlog';
import Footer from './sections/Footer';

import SeoHelmet from '../../components/seo/SeoHelmet';
import WebsiteSchema from '../../components/seo/WebsiteSchema';
import OrganizationSchema from '../../components/seo/OrganizationSchema';

const Home4 = () => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://babetpet.com';

  return (
    <div className="babet-home4-wrapper">
      <SeoHelmet
        title="Babet | Pet Care, Grooming & Salon Services"
        description="Professional pet grooming, bathing, hair styling, dog sitting, and veterinary care services."
        keywords={['Babet', 'Pet Grooming', 'Pet Care', 'Dog Sitting', 'Pet Salon', 'Veterinary Care']}
        image={siteUrl + '/sobo_logo.webp'}
        path="/home4"
        type="website"
      />
      <WebsiteSchema siteData={{ name: 'Babet Pet Care & Shop', url: siteUrl }} />
      <OrganizationSchema orgData={{ name: 'Babet Pet Care', url: siteUrl, logo: siteUrl + '/sobo_logo.webp' }} />

      {/* Navigation Header */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* About & Commitment */}
      <AboutCommitment />

      {/* 8 Grooming Services Grid */}
      <GroomingServices />

      {/* Why Choose Us & Marquee */}
      <WhyChooseUs />

      {/* 3-Step Process Workflow */}
      <ProcessSteps />

      {/* Pricing Packages */}
      <PricingPackages />

      {/* Client Testimonials */}
      <Testimonials />

      {/* Groomers Team */}
      <TeamGroomers />

      {/* Appointment Booking & FAQ */}
      <AppointmentFAQ />

      {/* Latest Blog Articles */}
      <LatestBlog />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home4;
