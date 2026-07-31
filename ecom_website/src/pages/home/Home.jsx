import { lazy, Suspense } from 'react';
import SeoHelmet from '../../components/seo/SeoHelmet';
import WebsiteSchema from '../../components/seo/WebsiteSchema';
import OrganizationSchema from '../../components/seo/OrganizationSchema';
import SiteNavigationSchema from '../../components/seo/SiteNavigationSchema';
import LazySection from '../../components/common/LazySection';
import Container from '../../components/common/Container';
import Skeleton from '../../components/common/Skeleton';
import { cms } from '../../utils/apiData';

import Hero from './sections/Hero';
import BrowseCategory from './sections/BrowseCategory';

// Lazy Loaded Sections
const LatestProducts = lazy(() => import('./sections/LatestProducts'));

// Lazy Loaded Sections
const WhyChoose = lazy(() => import('./sections/WhyChoose'));
const LatestArticles = lazy(() => import('./sections/LatestArticles'));
const PopularProducts = lazy(() => import('./sections/PopularProducts'));
const BusinessPromo = lazy(() => import('./sections/BusinessPromo'));
const Review = lazy(() => import('./sections/Review'));

const lazySections = [
  {
    Component: WhyChoose,
    height: 600,
    containerStyle: { background: 'var(--forth)' },
    fallback: (
      <Container style={{ background: 'var(--forth)' }}>
        <Skeleton variant="why-choose" theme="adaptive" />
      </Container>
    ),
  },
  {
    Component: LatestArticles,
    height: 440,
    fallback: (
      <Container>
        <Skeleton variant="articles" theme="adaptive" />
      </Container>
    ),
  },
  {
    Component: PopularProducts,
    height: 410,
    containerStyle: { background: 'var(--forth)' },
    fallback: (
      <Container style={{ background: 'var(--forth)' }}>
        <div className="py-40 w-full" style={{ minHeight: '410px' }}>
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
    height: 510,
    fallback: (
      <Container>
        <Skeleton variant="promo" theme="adaptive" />
      </Container>
    ),
  },
  {
    Component: Review,
    height: 280,
    containerStyle: { backgroundColor: 'var(--forth)' },
    fallback: (
      <Container style={{ backgroundColor: 'var(--forth)' }}>
        <Skeleton variant="review-section" theme="adaptive" />
      </Container>
    ),
  },
];

import { config } from '../../config/env';

const Home = () => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : (config.siteUrl || 'https://www.ashmitaenterprises.co.in');
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
        title="Ashmita Enterprises | Importer & Wholesaler of PVC Strip Curtains & PVC Roll in Mumbai"
        description="Ashmita Enterprises is a leading importer and wholesaler of high-quality PVC Strip Curtains, PVC Rolls, PVC Sheets, Plastic Curtains, PVC Films, and Mounting Brackets based in Mumbai, Maharashtra."
        keywords={['PVC Strip Curtains Mumbai', 'PVC Roll Wholesaler', 'Soft PVC Roll', 'PVC Sheet Importer', 'Opaque Black PVC Strips', 'Anti Insect PVC Curtain', 'Cold Storage Curtains', 'PVC AC Curtain', 'Ashmita Enterprises Mumbai', 'Industrial PVC curtains']}
        image={siteUrl + '/sobo_logo.webp'}
        path="/home"
        type="website"
      />
      <WebsiteSchema siteData={{ name: 'Ashmita Enterprises', url: siteUrl }} />
      <OrganizationSchema orgData={{ name: 'Ashmita Enterprises', url: siteUrl, logo: siteUrl + '/sobo_logo.webp' }} />
      <SiteNavigationSchema navItems={navItems} />

      <Hero cms={cms} />

      <Container className="bg-forth" version="v2">
        <BrowseCategory cms={cms} />
      </Container>

      <LazySection placeholderHeight={860}>
        <Suspense fallback={
          <Container className="bg-white" version="v2">
            <div className="py-40 w-full" style={{ minHeight: '860px' }}>
              <Skeleton variant="section-header" theme="adaptive" />
              <div className="mt-20 mb-40">
                <Skeleton variant="card-grid" count={4} theme="adaptive" />
              </div>
              <Skeleton variant="section-header" theme="adaptive" />
              <div className="mt-20">
                <Skeleton variant="card-grid" count={4} theme="adaptive" />
              </div>
            </div>
          </Container>
        }>
          <Container className="bg-white" version="v2">
            <LatestProducts cms={cms} />
          </Container>
        </Suspense>
      </LazySection>

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
