import React, { memo, lazy, Suspense, useState, useEffect } from "react";
import BlogLayout from "../../components/layout/BlogLayout";
import { blogs as blogsData } from "../../utils/apiData";
import SeoHelmet from "../../components/seo/SeoHelmet";
import BreadcrumbSchema from "../../components/seo/BreadcrumbSchema";
import LazySection from "../../components/common/LazySection";
import Container from "../../components/common/Container";
import Skeleton from "../../components/common/Skeleton";

// Lazy Loaded Sections
const Review = lazy(() => import("../home/sections/Review"));

const lazySections = [
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

const Blogs = memo(() => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ecom-website.example.com';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SeoHelmet
        title="B2B Industry Insights & Blogs | SOBO Marketing Solution"
        description="Read our latest articles on industrial trends, office supply optimization, and manufacturing best practices."
        keywords={['Industrial Blog', 'B2B Trends', 'Manufacturing Guide', 'Toner Cartridge Tips']}
        image={siteUrl + '/sobo_logo.webp'}
        path="/blog"
        type="blog"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: siteUrl + '/home' },
        { name: 'Blog', url: siteUrl + '/blog' }
      ]} />
      <BlogLayout type="list" blogsData={blogsData} loading={loading} />
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
});

export default Blogs;
