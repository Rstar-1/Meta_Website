import React, { lazy, Suspense, memo } from 'react';
import LazySection from '../../components/common/LazySection';
import Container from '../../components/common/Container';
import SEO from '../../seo';
import aboutBanner from '../../assets/about-banner.jpg';

const HeroBanner = lazy(() => import('./sections/ecom/HeroBanner'));
const CategorySection = lazy(() => import('./sections/ecom/CategorySection'));
const FeatureSection = lazy(() => import('./sections/ecom/FeatureSection'));
const ProductSection = lazy(() => import('./sections/ecom/ProductSection'));
const AboutSection = lazy(() => import('./sections/ecom/AboutSection'));
const PatchSection = lazy(() => import('./sections/ecom/PatchSection'));
const OfferSection = lazy(() => import('./sections/ecom/OfferSection'));

const ecomSections = [
    {
        id: 'hero',
        Component: HeroBanner,
        minHeight: '500px',
        isContainer: false
    },
    {
        id: 'category',
        Component: CategorySection,
        minHeight: '300px',
        isContainer: true
    },
    {
        id: 'product',
        Component: ProductSection,
        minHeight: '400px',
        isContainer: true
    },
    {
        id: 'about',
        Component: AboutSection,
        minHeight: '400px',
        isContainer: true,
        containerStyle: { background: 'var(--forth)' }
    },
    {
        id: 'patch',
        Component: PatchSection,
        minHeight: '300px',
        isContainer: true,
        containerClass: 'relative z-10',
        containerStyle: {
            backgroundImage: `linear-gradient(90deg, rgba(10, 15, 25, 0.94) 0%, rgba(10, 15, 25, 0.82) 50%, rgba(10, 15, 25, 0.45) 100%), url(${aboutBanner})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
        }
    },
    {
        id: 'feature',
        Component: FeatureSection,
        minHeight: '400px',
        isContainer: true,
        containerStyle: { background: 'var(--forth)' }
    },
    {
        id: 'offer',
        Component: OfferSection,
        minHeight: '300px',
        isContainer: true
    },
];

const SectionFallback = memo(({ minHeight = '100px' }) => (
    <div className="w-full" style={{ minHeight }} />
));

const Home = () => (
    <>
        <SEO page="home" />
        {ecomSections.map(({ id, Component, isEager, minHeight, isContainer = true, containerClass, containerStyle }) => {
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

export default memo(Home);