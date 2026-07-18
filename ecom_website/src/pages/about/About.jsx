import React, { useState, useEffect, lazy, Suspense } from 'react';
import Banner from '../../components/layout/Banner';
import SeoHelmet from '../../components/seo/SeoHelmet';
import OrganizationSchema from '../../components/seo/OrganizationSchema';
import LazySection from '../../components/common/LazySection';
import Container from '../../components/common/Container';
import Skeleton from '../../components/common/Skeleton';
import { cms } from '../../utils/apiData';

// Lazy Loaded Sections
const WhyChoose = lazy(() => import('../home/sections/WhyChoose'));
const LatestArticles = lazy(() => import('../home/sections/LatestArticles'));
const BusinessPromo = lazy(() => import('../home/sections/BusinessPromo'));
const Review = lazy(() => import('../home/sections/Review'));

const lazySections = [
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

const About = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://sobo-marketing.com';
  return (
    <>
      <SeoHelmet
        title="About Us | SOBO Marketing Solution"
        description="Learn about SOBO Marketing Solution, our journey, values, and how we deliver top-tier industrial products."
        keywords={['About SOBO', 'B2B Supplier India', 'Industrial Partner']}
        image={siteUrl + '/sobo_logo.webp'}
        path="/about"
        type="about"
      />
      <OrganizationSchema orgData={{ name: 'SOBO Marketing Solution', url: siteUrl, logo: siteUrl + '/sobo_logo.webp' }} />
      <Banner
        title="About Us"
        img="https://html.ditsolution.net/industry/indastre1/assets/images/slider/banner.jpg"
        desc="Solutions Industrial Market Values for Funding"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'About Us' }
        ]}
        loading={loading}
      />

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

export default About;