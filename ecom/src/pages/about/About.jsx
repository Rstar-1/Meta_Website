import React, { lazy, Suspense } from 'react';
import Banner from '../../components/layout/generic/Banner';
import Loader from '../../components/common/generic/Loader';
import SEO from '../../seo';
import aboutBanner from '../../assets/about-banner.jpg';

const AboutSection = lazy(() => import('../home/sections/ecom/AboutSection'));
const PatchSection = lazy(() => import('../home/sections/ecom/PatchSection'));
const OfferSection = lazy(() => import('../home/sections/ecom/OfferSection'));

const ecomSections = [
    AboutSection,
    OfferSection,
    PatchSection,
];

const About = () => {
    return (
        <>
            <SEO page="about" />
            <Banner
                title="About Us"
                desc="About Our Story"
                bgImage={aboutBanner}
                breadcrumbs={[
                    { label: 'Home', path: '/home' },
                    { label: 'About Us', path: '/about' }
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

export default About;