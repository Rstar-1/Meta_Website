import React, { lazy, Suspense } from 'react';
import Banner from '../../components/layout/generic/Banner';
import Loader from '../../components/common/generic/Loader';
import SEO from '../../seo';
import aboutBanner from '../../assets/about-banner.jpg';

const DetailSection = lazy(() => import('./sections/DetailSection'));

const ecomSections = [
    DetailSection,
];

const Terms = () => {
    return (
        <>
            <SEO page="terms" />
            <Banner
                title="Terms & Conditions"
                // desc="Please read these terms and conditions carefully before using our website or ordering our PVC and Vinyl products."
                bgImage={aboutBanner}
                breadcrumbs={[
                    { label: 'Home', path: '/home' },
                    { label: 'Terms & Conditions', path: '/terms' }
                ]}
            />
            <Suspense fallback={<Loader />}>
                {ecomSections.map((Component, index) => (
                    <Component key={index} />
                ))}
            </Suspense>
        </>
    );
};

export default Terms;