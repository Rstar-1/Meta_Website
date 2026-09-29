import React, { memo } from 'react';
import Banner from '../../components/layout/generic/Banner';
import FilterSection from './sections/FilterSection';
import SpecifySection from './sections/SpecifySection';
import SEO from '../../seo';
import bannerImg from '../../assets/about-banner.jpg';

const BREADCRUMBS = [
    { label: 'Home', path: '/home' },
    { label: 'Products', path: '/products' }
];

const Product = () => {
    return (
        <>
            <SEO page="product" />
            <Banner
                title="Products Collection"
                desc="Products"
                bgImage={bannerImg}
                breadcrumbs={BREADCRUMBS}
            />
            <FilterSection />
            <SpecifySection />
        </>
    );
};

export default memo(Product);