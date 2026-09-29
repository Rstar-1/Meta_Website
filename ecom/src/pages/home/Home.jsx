import React, { lazy, Suspense, memo } from 'react';
import LazySection from '../../components/common/LazySection';
import SEO from '../../seo';

const HeroBanner = lazy(() => import('./sections/ecom/HeroBanner'));
const CategorySection = lazy(() => import('./sections/ecom/CategorySection'));
const FeatureSection = lazy(() => import('./sections/ecom/FeatureSection'));
const ProductSection = lazy(() => import('./sections/ecom/ProductSection'));
const AboutSection = lazy(() => import('./sections/ecom/AboutSection'));
const TrendingSection = lazy(() => import('./sections/ecom/TrendingSection'));
const PatchSection = lazy(() => import('./sections/ecom/PatchSection'));
const OfferSection = lazy(() => import('./sections/ecom/OfferSection'));

const ecomSections = [
    { id: 'hero', Component: HeroBanner, minHeight: '500px' },
    { id: 'category', Component: CategorySection, minHeight: '300px' },
    { id: 'product', Component: ProductSection, minHeight: '400px' },
    // { id: 'trending', Component: TrendingSection, minHeight: '400px' },
    { id: 'about', Component: AboutSection, minHeight: '400px' },
    { id: 'feature', Component: FeatureSection, minHeight: '400px' },
    { id: 'patch', Component: PatchSection, minHeight: '300px' },
    { id: 'offer', Component: OfferSection, minHeight: '300px' }
];

const SectionFallback = memo(({ minHeight = '100px' }) => (
    <div className="w-full" style={{ minHeight }} />
));

const Home = () => (
    <main className="w-full">
        <SEO page="home" />
        {ecomSections.map(({ id, Component, isEager, minHeight }) =>
            isEager ? (
                <Component key={id} />
            ) : (
                <LazySection
                    key={id}
                    placeholderHeight={minHeight}
                    placeholder={<SectionFallback minHeight={minHeight} />}
                >
                    <Suspense fallback={<SectionFallback minHeight={minHeight} />}>
                        <Component />
                    </Suspense>
                </LazySection>
            )
        )}
    </main>
);

export default memo(Home);