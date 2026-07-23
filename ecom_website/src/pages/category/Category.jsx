import React, { lazy, Suspense, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SeoHelmet from '../../components/seo/SeoHelmet';
import Container from '../../components/common/Container';
import Skeleton from '../../components/common/Skeleton';
import LazySection from '../../components/common/LazySection';
import Banner from '../../components/layout/Banner';
import { categories, cms } from '../../utils/apiData';
import Feature from './sections/Feature';

// Lazy Loaded Sections
const LatestArticles = lazy(() => import('../home/sections/LatestArticles'));
const BusinessPromo = lazy(() => import('../home/sections/BusinessPromo'));
const Review = lazy(() => import('../home/sections/Review'));

const lazySections = [
    {
        Component: LatestArticles,
        height: 500,
        fallback: (
            <Container version="v2">
                <Skeleton variant="articles" theme="adaptive" />
            </Container>
        ),
    },
    {
        Component: BusinessPromo,
        height: 300,
        fallback: (
            <Container version="v2">
                <Skeleton variant="promo" theme="adaptive" />
            </Container>
        ),
    },
    {
        Component: Review,
        height: 400,
        containerStyle: { backgroundColor: 'var(--forth)' },
        fallback: (
            <Container version="v2" style={{ backgroundColor: 'var(--forth)' }}>
                <Skeleton variant="review-section" theme="adaptive" />
            </Container>
        ),
    },
];

const Category = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    const handleCategoryClick = (catId) => {
        navigate(`/products?category=${catId}`, { state: { category: catId } });
    };

    const siteUrl = typeof window !== 'undefined' ? window.location.origin : (import.meta.env.VITE_SITE_URL || 'https://sobo-marketing.com');

    // Get categories directly from category.json
    const displayCategories = categories.filter(cat => cat.number);

    return (
        <>
            <SeoHelmet
                title="Product Categories | SOBO Marketing Solution"
                description="Browse industrial and commercial products by category. Find premium stainless steel, PVC strip curtains, and printing consumables."
                keywords={['Product Categories', 'PVC Strip Curtains', 'PVC Sheets', 'PVC Rolls', 'SOBO Marketing']}
                image={siteUrl + '/sobo_logo.webp'}
                path="/category"
                type="website"
            />

            <Banner
                title="OUR CATEGORIES"
                img="https://html.ditsolution.net/industry/indastre1/assets/images/slider/banner.jpg"
                desc="Product Categories"
                breadcrumbs={[
                    { label: "Home", path: "/home" },
                    { label: "Categories" },
                ]}
                loading={loading}
            />

            <Feature
                loading={loading}
                displayCategories={displayCategories}
                handleCategoryClick={handleCategoryClick}
            />

            {/* Lazy Loaded Sections */}
            {lazySections.map(({ Component, height, fallback, containerClass, containerStyle, version, noContainer }, index) => (
                <LazySection key={index} placeholderHeight={height}>
                    <Suspense fallback={fallback}>
                        {noContainer ? (
                            <Component cms={cms} />
                        ) : (
                            <Container
                                className={containerClass || ''}
                                style={containerStyle || {}}
                                version={version || 'v2'}
                            >
                                <Component cms={cms} />
                            </Container>
                        )}
                    </Suspense>
                </LazySection>
            ))}
        </>
    );
};

export default Category;