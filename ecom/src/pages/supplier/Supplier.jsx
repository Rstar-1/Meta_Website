import React, { lazy, Suspense, memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import LazySection from '../../components/common/LazySection';
import Container from '../../components/common/Container';
import Banner from '../../components/layout/generic/Banner';
import SEO from '../../seo';
import bannerImg from '../../assets/about-banner.jpg';

const SupplierSection = lazy(() => import('./sections/SupplierSection'));
const PatchSection = lazy(() => import('../home/sections/ecom/PatchSection'));
const OfferSection = lazy(() => import('../home/sections/ecom/OfferSection'));

const supplierSections = [
    { id: 'supplier', Component: SupplierSection, minHeight: '600px', isContainer: false },
    { id: 'offer', Component: OfferSection, minHeight: '300px', isContainer: true },
    {
        id: 'patch',
        Component: PatchSection,
        minHeight: '300px',
        isContainer: true,
        containerClass: 'relative z-10',
        containerStyle: {
            backgroundImage: `linear-gradient(90deg, rgba(10, 15, 25, 0.94) 0%, rgba(10, 15, 25, 0.82) 50%, rgba(10, 15, 25, 0.45) 100%), url(${bannerImg})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
        }
    },
];

const SectionFallback = memo(({ minHeight = '100px' }) => (
    <div className="w-full" style={{ minHeight }} />
));

const KNOWN_NAMES = {
    foxecom: 'Ashmita Vinyls'
};

const Supplier = () => {
    const { brandName } = useParams();
    const brandKey = (brandName || 'foxecom').toLowerCase().replace(/[^a-z0-9]/g, '');
    const displayName = useMemo(() => {
        return KNOWN_NAMES[brandKey] || (brandName
            ? brandName.charAt(0).toUpperCase() + brandName.slice(1)
            : 'Ashmita Vinyls');
    }, [brandKey, brandName]);

    return (
        <main className="w-full">
            <SEO
                title={`${displayName} — Verified Supplier Profile`}
                description={`Explore verified supplier profile, catalog, and wholesale pricing for ${displayName}.`}
            />
            <Banner
                title={displayName}
                desc="Verified Supplier Profile"
                bgImage={bannerImg}
                breadcrumbs={[
                    { label: 'Home', path: '/home' },
                    { label: 'Products', path: '/products' },
                    { label: displayName }
                ]}
            />
            {supplierSections.map(({ id, Component, isEager, minHeight, isContainer, containerClass, containerStyle }) => {
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
        </main>
    );
};

export default memo(Supplier);
