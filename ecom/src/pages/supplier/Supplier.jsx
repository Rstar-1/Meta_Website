import React, { lazy, Suspense, memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import LazySection from '../../components/common/LazySection';
import Container from '../../components/common/Container';
import Banner from '../../components/layout/generic/Banner';
import SEO from '../../seo';
import { carpetPatchBanner } from '../../utils/imageResolver';

const SupplierSection = lazy(() => import('./sections/SupplierSection'));
const PatchSection = lazy(() => import('../home/sections/ecom/PatchSection'));

const supplierSections = [
    { id: 'supplier', Component: SupplierSection, minHeight: '600px', isContainer: false },
    {
        id: 'patch',
        Component: PatchSection,
        minHeight: '300px',
        isContainer: true,
        containerClass: 'relative z-10',
        containerStyle: {
            backgroundImage: `linear-gradient(90deg, rgba(10, 15, 25, 0.94) 0%, rgba(10, 15, 25, 0.82) 50%, rgba(10, 15, 25, 0.45) 100%), url(${carpetPatchBanner})`,
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
    foxecom: 'United Brothers',
    united: 'United Brothers',
    unitedbrothers: 'United Brothers',
    ashmita: 'United Brothers',
    ashmitaenterprises: 'United Brothers',
    ashmitavinyls: 'United Brothers',
    wsi: 'United Brothers'
};

const Supplier = () => {
    const { brandName } = useParams();
    const brandKey = (brandName || 'unitedbrothers').toLowerCase().replace(/[^a-z0-9]/g, '');
    const displayName = useMemo(() => {
        return KNOWN_NAMES[brandKey] || (brandName
            ? brandName.charAt(0).toUpperCase() + brandName.slice(1)
            : 'United Brothers');
    }, [brandKey, brandName]);

    const breadcrumbs = useMemo(() => [
        { label: 'Home', path: '/home' },
        { label: 'Products', path: '/products' },
        { label: displayName, path: `/supplier/${brandKey}` }
    ], [displayName, brandKey]);

    return (
        <>
            <SEO
                title="United Brothers - Quality Flooring Solutions | Ahmedabad, Gujarat"
                description="Manufacturer & Supplier of Dilour Carpets, Ribs Carpets, New Poly Shrink Rugs & Shalimar Rugs. Office No. 827, Siddhi Vinayak Arcade, Vasna, Ahmedabad. Contact: +91 84548 38638."
                path={`/supplier/${brandKey}`}
                breadcrumbs={breadcrumbs}
            />
            <Banner
                title={displayName}
                desc="Quality Flooring Solutions — Better Floors Brighter Spaces | Ahmedabad, Gujarat"
                breadcrumbs={breadcrumbs}
            />
            {supplierSections.map(({ id, Component, isEager, minHeight, isContainer, containerClass, containerStyle }) => {
                const SectionContent = (
                    <Suspense fallback={<SectionFallback minHeight={minHeight} />}>
                        <Component supplierName={displayName} brandKey={brandKey} />
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
};

export default memo(Supplier);
