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
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://sobo-marketing.com';
  const navItems = [
    { name: 'Home', url: `${siteUrl}/home` },
    { name: 'Products', url: `${siteUrl}/products` },
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
      <Suspense fallback={null}>
        <BrowseCategory />
        <LatestProducts />
        <PopularProducts />
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
