import React, { lazy, Suspense, memo } from 'react';
import LazySection from '../../components/common/LazySection';
import Container from '../../components/common/Container';
import Banner from '../../components/layout/generic/Banner';
import SEO from '../../seo';

const FilterSection = lazy(() => import('./sections/FilterSection'));
const SpecifySection = lazy(() => import('./sections/SpecifySection'));

const productSections = [
    {
        id: 'filter',
        Component: FilterSection,
        minHeight: '600px',
        isContainer: true
    },
    {
        id: 'specify',
        Component: SpecifySection,
        minHeight: '400px',
        isContainer: true,
        version: 'v2'
    },
];

const BREADCRUMBS = [
    { label: 'Home', path: '/home' },
    { label: 'Products', path: '/products' }
];

const SectionFallback = memo(({ minHeight = '100px' }) => (
    <div className="w-full" style={{ minHeight }} />
));

const Product = () => {
    return (
        <>
            <SEO page="product" breadcrumbs={BREADCRUMBS} />
            <Banner
                title="Products Collection"
                desc="Products"
                breadcrumbs={BREADCRUMBS}
            />
            {productSections.map(({ id, Component, isEager, minHeight, isContainer = true, containerClass, containerStyle, version }) => {
                const SectionContent = (
                    <Suspense fallback={<SectionFallback minHeight={minHeight} />}>
                        <Component />
                    </Suspense>
                );

                const Content = isContainer ? (
                    <Container className={containerClass} style={containerStyle} version={version}>
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

export default memo(Product);