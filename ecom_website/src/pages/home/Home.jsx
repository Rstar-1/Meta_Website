import React, { lazy, Suspense } from 'react';
import SeoHelmet from '../../components/seo/SeoHelmet';
import WebsiteSchema from '../../components/seo/WebsiteSchema';
import OrganizationSchema from '../../components/seo/OrganizationSchema';
import SiteNavigationSchema from '../../components/seo/SiteNavigationSchema';
import LazySection from '../../components/common/LazySection';
import Container from '../../components/common/Container';
import Skeleton from '../../components/common/Skeleton';
import { cms } from '../../utils/apiData';

import Hero from './sections/Hero';

// Lazy Loaded Sections
const BrowseCategory = lazy(() => import('./sections/BrowseCategory'));
const LatestProducts = lazy(() => import('./sections/LatestProducts'));
const WhyChoose = lazy(() => import('./sections/WhyChoose'));
const LatestArticles = lazy(() => import('./sections/LatestArticles'));
const PopularProducts = lazy(() => import('./sections/PopularProducts'));
const BusinessPromo = lazy(() => import('./sections/BusinessPromo'));
const Review = lazy(() => import('./sections/Review'));

const lazySections = [
  {
    Component: BrowseCategory,
    height: 180,
    containerClass: 'bg-forth',
    fallback: (
      <Container className="bg-forth">
        <Skeleton variant="browse-category" theme="adaptive" />
      </Container>
    ),
  },
  {
    Component: LatestProducts,
    height: 1350,
    containerClass: 'bg-white',
    fallback: (
      <Container className="bg-white">
        <div className='w-full' style={{ minHeight: '1350px' }}>
          {['PVC Sheet', 'PVC Roll', 'PVC Strip Curtains'].map((name, catIndex) => (
            <div key={catIndex} className="py-30 w-full">
              <Skeleton variant="section-header" theme="adaptive" />
              <Skeleton variant="card-grid" count={4} theme="adaptive" />
            </div>
          ))}
        </div>
      </Container>
    ),
  },
  {
    Component: WhyChoose,
    height: 350,
    containerStyle: { background: 'var(--forth)' },
    fallback: (
      <Container style={{ background: 'var(--forth)' }}>
        <Skeleton variant="why-choose" theme="adaptive" />
      </Container>
    ),
  },
  {
    Component: LatestArticles,
    height: 500,
    fallback: (
      <Container>
        <Skeleton variant="articles" theme="adaptive" />
      </Container>
    ),
  },
  {
    Component: PopularProducts,
    height: 500,
    containerStyle: { background: 'var(--forth)' },
    fallback: (
      <Container style={{ background: 'var(--forth)' }}>
        <div className="py-40 w-full" style={{ minHeight: '500px' }}>
          <Skeleton variant="section-header" theme="adaptive" />
          <div className="mt-20">
            <Skeleton variant="card-grid" count={4} theme="adaptive" />
          </div>
        </div>
      </Container>
    ),
  },
  {
    Component: BusinessPromo,
    height: 300,
    fallback: (
      <Container>
        <Skeleton variant="promo" theme="adaptive" />
      </Container>
    ),
  },
  {
    Component: Review,
    height: 400,
    containerStyle: { backgroundColor: 'var(--forth)' },
    fallback: (
      <Container style={{ backgroundColor: 'var(--forth)' }}>
        <Skeleton variant="review-section" theme="adaptive" />
      </Container>
    ),
  },
];

const Home = () => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://sobo-marketing.com';
  const navItems = [
    { name: 'Home', url: `${siteUrl}/home` },
    { name: 'Products', url: `${siteUrl}/products` },
    { name: 'About Us', url: `${siteUrl}/about` },
    { name: 'Blog', url: `${siteUrl}/blog` },
    { name: 'Contact Us', url: `${siteUrl}/contact` },
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

      <Hero cms={cms} />

      {lazySections.map(({ Component, height, fallback, containerClass, containerStyle, version, noContainer }, index) => (
        <LazySection key={index} placeholderHeight={height}>
          <Suspense fallback={fallback}>
            {noContainer ? (
              <Component cms={cms} />
            ) : (
              <Container
                className={containerClass || ''}
                style={containerStyle || {}}
                version={version || 'v2'}
              >
                <Component cms={cms} />
              </Container>
            )}
          </Suspense>
        </LazySection>
      ))}
    </>
  );
};

export default Home;
