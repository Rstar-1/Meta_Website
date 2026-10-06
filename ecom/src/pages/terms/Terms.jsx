import React, { lazy, Suspense, memo } from 'react';
import LazySection from '../../components/common/LazySection';
import Container from '../../components/common/Container';
import Banner from '../../components/layout/generic/Banner';
import SEO from '../../seo';
import aboutBanner from '../../assets/about-banner.jpg';

const DetailSection = lazy(() => import('./sections/DetailSection'));

const termsSections = [
    {
        id: 'detail',
        Component: DetailSection,
        minHeight: '500px',
        isContainer: true
    },
];

const SectionFallback = memo(({ minHeight = '100px' }) => (
    <div className="w-full" style={{ minHeight }} />
));

const Terms = () => {
    return (
        <>
            <SEO page="terms" />
            <Banner
                title="Terms & Conditions"
                bgImage={aboutBanner}
                breadcrumbs={[
                    { label: 'Home', path: '/home' },
                    { label: 'Terms & Conditions', path: '/terms' }
                ]}
            />
            {termsSections.map(({ id, Component, isEager, minHeight, isContainer = true, containerClass, containerStyle }) => {
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

export default memo(Terms);