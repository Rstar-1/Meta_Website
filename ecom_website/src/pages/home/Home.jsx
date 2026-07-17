import React, { lazy, Suspense } from 'react';
import Hero from './sections/Hero';
import SeoHelmet from '../../components/seo/SeoHelmet';
import WebsiteSchema from '../../components/seo/WebsiteSchema';
import OrganizationSchema from '../../components/seo/OrganizationSchema';
import SiteNavigationSchema from '../../components/seo/SiteNavigationSchema';
import LazySection from '../../components/common/LazySection';
import Container from '../../components/common/Container';
import Skeleton from '../../components/common/Skeleton';

// Lazy Loaded Sections
const BrowseCategory = lazy(() => import('./sections/BrowseCategory'));
const LatestProducts = lazy(() => import('./sections/LatestProducts'));
const WhyChoose = lazy(() => import('./sections/WhyChoose'));
const LatestArticles = lazy(() => import('./sections/LatestArticles'));
const PopularProducts = lazy(() => import('./sections/PopularProducts'));
const BusinessPromo = lazy(() => import('./sections/BusinessPromo'));
const Review = lazy(() => import('./sections/Review'));

// DRY Skeleton Helper Components
const SectionHeaderSkeleton = ({ titleWidth = '200px' }) => (
  <div className="flex justify-between items-center mb-10">
    <Skeleton variant="rect" width={titleWidth} height="32px" borderRadius="4px" theme="adaptive" />
    <Skeleton variant="rect" width="80px" height="20px" borderRadius="4px" theme="adaptive" />
  </div>
);

const CardGridSkeleton = ({ count = 4, className = 'grid-cols-4 md-grid-cols-2 sm-grid-cols-1 gap-12' }) => (
  <div className={className}>
    <Skeleton variant="card" count={count} theme="adaptive" />
  </div>
);

const lazySections = [
  {
    Component: BrowseCategory,
    height: 180,
    containerClass: 'bg-forth',
    fallback: (
      <Container className="bg-forth">
        <div className="w-full py-30" style={{ minHeight: '180px' }}>
          <div className="grid-cols-6 md-grid-cols-4 sm-grid-cols-2 gap-12">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="px-10 py-20 bg-white rounded-10 text-center flex flex-column items-center gap-12">
                <Skeleton variant="circle" width="80px" height="80px" theme="adaptive" />
                <Skeleton variant="text" width="60%" height="12px" theme="adaptive" style={{ margin: 0 }} />
              </div>
            ))}
          </div>
        </div>
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
              <SectionHeaderSkeleton />
              <CardGridSkeleton />
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
        <div className="grid-cols-2 sm-grid-cols-1 gap-12 items-center py-50 sm-py-40 w-full" style={{ minHeight: '350px' }}>
          <div className="pr-15 sm-pr-1 flex flex-column gap-16">
            <Skeleton variant="rect" width="80px" height="24px" borderRadius="5px" theme="adaptive" />
            <Skeleton variant="rect" width="90%" height="36px" borderRadius="5px" theme="adaptive" />
            <Skeleton variant="text" count={2} theme="adaptive" />
            <div className="flex flex-column gap-12 mt-10">
              {Array.from({ length: 2 }).map((_, idx) => (
                <div key={idx} className="flex gap-12 items-center">
                  <Skeleton variant="circle" width="50px" height="50px" theme="adaptive" />
                  <div className="flex-grow flex flex-column gap-6">
                    <Skeleton variant="text" width="40%" height="16px" theme="adaptive" />
                    <Skeleton variant="text" width="90%" height="12px" theme="adaptive" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="pl-15 sm-pl-1 sm-mt-10">
            <div className="grid-cols-2 gap-12">
              <Skeleton variant="rect" height="300px" borderRadius="5px" theme="adaptive" />
              <Skeleton variant="rect" height="300px" borderRadius="5px" theme="adaptive" />
            </div>
          </div>
        </div>
      </Container>
    ),
  },
  {
    Component: LatestArticles,
    height: 500,
    fallback: (
      <Container>
        <div className="pt-30 pb-20 w-full" style={{ minHeight: '500px' }}>
          <SectionHeaderSkeleton titleWidth="220px" />
          <CardGridSkeleton />
        </div>
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
          <SectionHeaderSkeleton />
          <div className="mt-20">
            <CardGridSkeleton />
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
        <div className="w-full py-40" style={{ minHeight: '300px' }}>
          <div className="flex sm-flex-column items-center justify-between p-40 sm-p-20 gap-12 relative overflow-hidden rounded-5" style={{ background: 'linear-gradient(135deg, #020712 0%, #081026 100%)' }}>
            <div className="w-60 sm-w-full pr-12 sm-pr-1 flex flex-column gap-12">
              <Skeleton variant="rect" width="180px" height="24px" borderRadius="20px" theme="dark" />
              <Skeleton variant="rect" width="70%" height="36px" borderRadius="4px" theme="dark" />
              <Skeleton variant="text" width="90%" theme="dark" />
              <Skeleton variant="rect" width="160px" height="40px" borderRadius="4px" theme="dark" />
            </div>
            <div className="relative flex items-center justify-center w-40 sm-w-full sm-mt-10 pl-12 sm-pl-1">
              <Skeleton variant="rect" height="250px" borderRadius="5px" theme="dark" />
            </div>
          </div>
          <div className="grid-cols-4 sm-grid-cols-1 md-grid-cols-2 gap-12 mt-20">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="flex items-center gap-12 rounded-5 border-ec p-14">
                <Skeleton variant="rect" width="48px" height="48px" borderRadius="5px" theme="adaptive" />
                <div className="flex-grow flex flex-column gap-6">
                  <Skeleton variant="text" width="60%" height="14px" theme="adaptive" />
                  <Skeleton variant="text" width="40%" height="10px" theme="adaptive" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    ),
  },
  {
    Component: Review,
    height: 400,
    containerStyle: { backgroundColor: 'var(--forth)' },
    fallback: (
      <Container style={{ backgroundColor: 'var(--forth)' }}>
        <div className="w-full py-40" style={{ minHeight: '400px' }}>
          <div className="flex md-flex-column sm-flex-column items-center gap-16">
            <div className="w-20 md-w-full sm-w-full px-10 flex flex-column gap-8">
              <Skeleton variant="rect" width="140px" height="28px" borderRadius="4px" theme="adaptive" />
              <Skeleton variant="text" width="80px" height="12px" theme="adaptive" />
            </div>
            <div className="desktop-vertical-divider md-hidden" />
            <div className="w-20 md-w-full sm-w-full px-10 flex flex-column gap-8">
              <Skeleton variant="rect" width="100px" height="42px" borderRadius="4px" theme="adaptive" />
              <Skeleton variant="rect" width="80px" height="12px" borderRadius="4px" theme="adaptive" />
            </div>
            <div className="desktop-vertical-divider md-hidden" />
            <div className="grid-cols-3 md-grid-cols-1 sm-grid-cols-1 gap-12 w-70 md-w-full sm-w-full px-10">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx}>
                  <div className="flex items-center gap-12 mb-10">
                    <Skeleton variant="circle" width="45px" height="45px" theme="adaptive" />
                    <div className="flex-grow flex flex-column gap-6">
                      <Skeleton variant="text" width="60%" height="14px" theme="adaptive" />
                      <Skeleton variant="text" width="40%" height="10px" theme="adaptive" />
                    </div>
                  </div>
                  <Skeleton variant="text" count={2} theme="adaptive" />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full my-24" style={{ height: '1px', backgroundColor: '#ececec' }} />
          <div className="grid-cols-4 md-grid-cols-2 sm-grid-cols-1 gap-12">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="flex items-center justify-center sm-justify-start gap-12">
                <Skeleton variant="rect" width="80px" height="24px" borderRadius="4px" theme="adaptive" />
                <Skeleton variant="rect" width="50px" height="16px" borderRadius="4px" theme="adaptive" />
              </div>
            ))}
          </div>
        </div>
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

      <Hero />

      {lazySections.map(({ Component, height, fallback, containerClass, containerStyle, version }, index) => (
        <LazySection key={index} placeholderHeight={height}>
          <Suspense fallback={fallback}>
            <Container
              className={containerClass || ''}
              style={containerStyle || {}}
              version={version || 'v2'}
            >
              <Component />
            </Container>
          </Suspense>
        </LazySection>
      ))}
    </>
  );
};

export default Home;
