import React, { lazy, Suspense } from 'react';
import Banner from '../../components/layout/generic/Banner';
import Loader from '../../components/common/generic/Loader';
import SEO from '../../seo';
import aboutBanner from '../../assets/about-banner.jpg';

const DetailSection = lazy(() => import('./sections/DetailSection'));

const ecomSections = [
    DetailSection,
];

const Privacy = () => {
    return (
        <>
            <SEO page="privacy" />
            <Banner
                title="Privacy Policy"
                // desc="We respect your privacy and are committed to protecting any personal data you share with us."
                bgImage={aboutBanner}
                breadcrumbs={[
                    { label: 'Home', path: '/home' },
                    { label: 'Privacy Policy', path: '/privacy' }
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

export default Privacy;
