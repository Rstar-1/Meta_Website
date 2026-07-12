import React, { lazy, Suspense } from 'react';
import Hero from './sections/Hero';
import BrowseCategory from './sections/BrowseCategory';
import LatestProducts from './sections/LatestProducts';

// Lazy load below-the-fold sections to speed up LCP and FCP
const PopularProducts = lazy(() => import('./sections/PopularProducts'));
const WhyChoose = lazy(() => import('./sections/WhyChoose'));
const TopCity = lazy(() => import('./sections/TopCity'));
const FeaturedBusinesses = lazy(() => import('./sections/FeaturedBusinesses'));
const LatestArticles = lazy(() => import('./sections/LatestArticles'));
const BusinessPromo = lazy(() => import('./sections/BusinessPromo'));
const Review = lazy(() => import('./sections/Review'));

import SeoHelmet from '../../components/seo/SeoHelmet';
import WebsiteSchema from '../../components/seo/WebsiteSchema';
import OrganizationSchema from '../../components/seo/OrganizationSchema';
import SiteNavigationSchema from '../../components/seo/SiteNavigationSchema';

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
      <BrowseCategory />
      <LatestProducts />
      <Suspense fallback={null}>
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
