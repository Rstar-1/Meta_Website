import React, { lazy, Suspense } from 'react';
import SeoHelmet from '../../components/seo/SeoHelmet';
import WebsiteSchema from '../../components/seo/WebsiteSchema';
import OrganizationSchema from '../../components/seo/OrganizationSchema';
import SiteNavigationSchema from '../../components/seo/SiteNavigationSchema';
import LazySection from '../../components/common/LazySection';
import Container from '../../components/common/Container';
import Skeleton from '../../components/common/Skeleton';
import { cms } from '../../utils/apiData';

// Lazy Loaded Sections
const Marketing = lazy(() => import('./sections/Marketing'));
const LatestArticles = lazy(() => import('../home/sections/LatestArticles'));
const BusinessPromo = lazy(() => import('../home/sections/BusinessPromo'));
const Review = lazy(() => import('../home/sections/Review'));

const lazySections = [
    {
        Component: Marketing,
        height: 500,
        noContainer: true,
        fallback: (
            <Container version="v2" style={{ background: 'linear-gradient(135deg, #041022 0%, #081a36 50%, #051329 100%)' }}>
                <Skeleton variant="where" theme="dark" />
            </Container>
        ),
    },
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

const Purchase = () => {
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : (import.meta.env.VITE_SITE_URL || 'https://sobo-marketing.com');
    const navItems = [
        { name: 'Home', url: `${siteUrl}/home` },
        { name: 'Products', url: `${siteUrl}/products` },
        { name: 'About Us', url: `${siteUrl}/about` },
        { name: 'Blog', url: `${siteUrl}/blog` },
        { name: 'Where to Buy', url: `${siteUrl}/wheretobuy` },
        { name: 'Contact Us', url: `${siteUrl}/connect` },
    ];

    return (
        <>
            <SeoHelmet
                title="Find Responsive Products Near You | Authorized Dealer Locator | SOBO Marketing Solution"
                description="Connect with our sales team to find authorized dealers for genuine PVC sheets, rolls, strip curtains, and SS hardware near your location."
                keywords={['Industrial Supplies', 'Authorized Dealers', 'Where to Buy', 'PVC Sheets', 'SOBO Marketing', 'B2B India']}
                image={siteUrl + '/sobo_logo.webp'}
                path="/wheretobuy"
                type="website"
            />
            <WebsiteSchema siteData={{ name: 'SOBO Marketing Solution', url: siteUrl }} />
            <OrganizationSchema orgData={{ name: 'SOBO Marketing Solution', url: siteUrl, logo: siteUrl + '/sobo_logo.webp' }} />
            <SiteNavigationSchema navItems={navItems} />

            {/* Lazy Loaded Sections with Skeleton Loaders */}
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

export default Purchase;
