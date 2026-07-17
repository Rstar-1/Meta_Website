import React, { lazy, Suspense } from 'react';
import Banner from '../../components/layout/Banner';
import SeoHelmet from '../../components/seo/SeoHelmet';
import LocalBusinessSchema from '../../components/seo/LocalBusinessSchema';
import LazySection from '../../components/common/LazySection';
import Container from '../../components/common/Container';
import Skeleton from '../../components/common/Skeleton';
import Details from './sections/Details';

// Lazy Loaded Sections
const LatestArticles = lazy(() => import('../home/sections/LatestArticles'));
const BusinessPromo = lazy(() => import('../home/sections/BusinessPromo'));
const Review = lazy(() => import('../home/sections/Review'));

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
  }
];

const Contact = () => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://sobo-marketing.com';
  return (
    <>
      <SeoHelmet
        title="Connect With Us | SOBO Marketing Solution"
        description="Get in touch with SOBO Marketing Solution for wholesale inquiries, product support, and partnership opportunities."
        keywords={['Contact SOBO', 'Wholesale Inquiry', 'Supplier Support']}
        image={siteUrl + '/sobo_logo.webp'}
        path="/connect"
        type="contact"
      />
      <LocalBusinessSchema bizData={{
        name: 'SOBO Marketing Solution',
        url: siteUrl,
        image: siteUrl + '/sobo_logo.webp',
        phone: '+91-XXXXXXXXXX',
        address: { street: 'Industrial Area', city: 'Mumbai', region: 'Maharashtra', postalCode: '400001', country: 'India' }
      }} />
      <Banner
        title="Connect With Us"
        img="https://html.ditsolution.net/industry/indastre1/assets/images/slider/banner.jpg"
        desc="Solutions Industrial Market Values for Funding"
        breadcrumbs={[
          { label: "Home", path: "/home" },
          { label: "Connect" },
        ]}
      />
      <Details />

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

export default Contact;