import React, { useState, useEffect, lazy, Suspense } from 'react';
import Banner from '../../components/layout/Banner';
import SeoHelmet from '../../components/seo/SeoHelmet';
import LocalBusinessSchema from '../../components/seo/LocalBusinessSchema';
import LazySection from '../../components/common/LazySection';
import Container from '../../components/common/Container';
import Skeleton from '../../components/common/Skeleton';
import { cms } from '../../utils/apiData';
import Details from './sections/Details';

// Lazy Loaded Sections
const LatestArticles = lazy(() => import('../home/sections/LatestArticles'));
const BusinessPromo = lazy(() => import('../home/sections/BusinessPromo'));
const Review = lazy(() => import('../home/sections/Review'));

const lazySections = [
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
  }
];

const Contact = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

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
        loading={loading}
      />
      {loading ? (
        <Container>
          <div className="w-full py-40 sm-py-30 flex flex-column gap-20">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="flex gap-12 items-center">
                <Skeleton variant="circle" width="40px" height="40px" theme="adaptive" />
                <div className="flex-grow flex flex-column gap-6">
                  <Skeleton variant="text" width="40%" height="16px" theme="adaptive" />
                  <Skeleton variant="text" width="60%" height="12px" theme="adaptive" />
                </div>
              </div>
            ))}
            <Skeleton variant="rect" height="350px" borderRadius="8px" theme="adaptive" />
          </div>
        </Container>
      ) : (
        <Details />
      )}

      {lazySections.map(({ Component, height, fallback, containerClass, containerStyle, version }, index) => (
        <LazySection key={index} placeholderHeight={height}>
          <Suspense fallback={fallback}>
            <Container
              className={containerClass || ''}
              style={containerStyle || {}}
              version={version || 'v2'}
            >
              <Component cms={cms} />
            </Container>
          </Suspense>
        </LazySection>
      ))}
    </>
  );
};

export default Contact;