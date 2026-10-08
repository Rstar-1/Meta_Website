import React, { lazy, Suspense, memo } from 'react';
import LazySection from '../../components/common/LazySection';
import Container from '../../components/common/Container';
import Banner from '../../components/layout/generic/Banner';
import SEO from '../../seo';
import bannerImg from '../../assets/about-banner.jpg';

const MediaSection = lazy(() => import('./sections/MediaSection'));

const blogSections = [
    {
        id: 'media',
        Component: MediaSection,
        minHeight: '600px',
        isContainer: true
    },
];

const SectionFallback = memo(({ minHeight = '100px' }) => (
    <div className="w-full" style={{ minHeight }} />
));

const BREADCRUMBS = [
    { label: 'Home', path: '/home' },
    { label: 'News & Media', path: '/blog' }
];

const Blog = () => {
    return (
        <>
            <SEO page="blog" breadcrumbs={BREADCRUMBS} />
            <Banner
                title="News & Articles"
                desc="News & Media"
                bgImage={bannerImg}
                breadcrumbs={BREADCRUMBS}
            />
            {blogSections.map(({ id, Component, isEager, minHeight, isContainer = true, containerClass, containerStyle }) => {
                const SectionContent = (
                    <Suspense fallback={<SectionFallback minHeight={minHeight} />}>
                        <Component />
                    </Suspense>
                );

                const Content = isContainer ? (
                    <Container className={containerClass} style={containerStyle}>
                        {SectionContent}
                    </Container>
                ) : (
                    SectionContent
                );

                return isEager ? (
                    <React.Fragment key={id}>
                        {Content}
                    </React.Fragment>
                ) : (
                    <LazySection
                        key={id}
                        placeholderHeight={minHeight}
                        placeholder={<SectionFallback minHeight={minHeight} />}
                    >
                        {Content}
                    </LazySection>
                );
            })}
        </>
    );
};

export default memo(Blog);