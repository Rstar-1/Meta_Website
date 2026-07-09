import React, { Suspense, lazy } from 'react';
import Hero from './sections/Hero';
import SeoHelmet from '../../components/seo/SeoHelmet';
import WebsiteSchema from '../../components/seo/WebsiteSchema';
import OrganizationSchema from '../../components/seo/OrganizationSchema';
import SiteNavigationSchema from '../../components/seo/SiteNavigationSchema';

// Lazy load below-the-fold sections to optimize TBT and initial load time
const BrowseCategory = lazy(() => import('./sections/BrowseCategory'));
const PopularProducts = lazy(() => import('./sections/PopularProducts'));
const LatestProducts = lazy(() => import('./sections/LatestProducts'));
const WhyChoose = lazy(() => import('./sections/WhyChoose'));
const FeaturedBusinesses = lazy(() => import('./sections/FeaturedBusinesses'));
const BusinessPromo = lazy(() => import('./sections/BusinessPromo'));
const LatestArticles = lazy(() => import('./sections/LatestArticles'));
const TopCity = lazy(() => import('./sections/TopCity'));
const Review = lazy(() => import('./sections/Review'));

const Home = () => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://medula-clinic.com';
  const navItems = [
    { name: 'Home', url: `${siteUrl}/home` },
    { name: 'Services', url: `${siteUrl}/home#services` },
    { name: 'Portfolio', url: `${siteUrl}/home#portfolio` },
    { name: 'About Us', url: `${siteUrl}/about` },
    { name: 'Blog', url: `${siteUrl}/blog` },
    { name: 'Contact', url: `${siteUrl}/connect` }
  ];

  return (
    <>
      <SeoHelmet
        title="Medula Medical Clinic | Professional Healthcare & Diagnostic Services"
        description="Welcome to Medula Medical Clinic. We offer specialized pediatric care, dental services, mental health counseling, and top-tier clinical diagnostic imaging."
        keywords={['Medical Clinic', 'Healthcare Services', 'Pediatrics', 'Dental Care', 'Mental Health', 'Medula Clinic']}
        image={siteUrl + '/sobo_logo.png'}
        path="/home"
        type="website"
      />
      <WebsiteSchema siteData={{ name: 'Medula Medical Clinic', url: siteUrl }} />
      <OrganizationSchema orgData={{ name: 'Medula Medical Clinic', url: siteUrl, logo: siteUrl + '/sobo_logo.png' }} />
      <SiteNavigationSchema navItems={navItems} />

      <Hero />
      <Suspense fallback={null}>
        <BrowseCategory />
        <LatestProducts />
        <WhyChoose />
        <TopCity />
        <FeaturedBusinesses />
        <LatestArticles />
        <BusinessPromo />
        <Review />
      </Suspense>
    </>
  );
};

export default Home;
