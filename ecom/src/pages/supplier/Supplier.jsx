import React, { lazy, Suspense, memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import LazySection from '../../components/common/LazySection';
import Container from '../../components/common/Container';
import Banner from '../../components/layout/generic/Banner';
import SEO from '../../seo';
import { metalPatchBanner } from '../../utils/imageResolver';

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
            backgroundImage: `linear-gradient(90deg, rgba(10, 15, 25, 0.94) 0%, rgba(10, 15, 25, 0.82) 50%, rgba(10, 15, 25, 0.45) 100%), url(${metalPatchBanner})`,
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
    foxecom: 'Jubilant Metal And Alloys',
    united: 'Jubilant Metal And Alloys',
    unitedbrothers: 'Jubilant Metal And Alloys',
    jubilant: 'Jubilant Metal And Alloys',
    jubilantmetal: 'Jubilant Metal And Alloys',
    jubilantmetalandalloys: 'Jubilant Metal And Alloys',
    ashmita: 'Jubilant Metal And Alloys',
    ashmitaenterprises: 'Jubilant Metal And Alloys',
    ashmitavinyls: 'Jubilant Metal And Alloys',
    wsi: 'Jubilant Metal And Alloys'
};

const Supplier = () => {
    const { brandName } = useParams();
    const brandKey = (brandName || 'jubilantmetal').toLowerCase().replace(/[^a-z0-9]/g, '');
    const displayName = useMemo(() => {
        return KNOWN_NAMES[brandKey] || (brandName
            ? brandName.charAt(0).toUpperCase() + brandName.slice(1)
            : 'Jubilant Metal And Alloys');
    }, [brandKey, brandName]);

    const breadcrumbs = useMemo(() => [
        { label: 'Home', path: '/home' },
        { label: 'Products', path: '/products' },
        { label: displayName, path: `/supplier/${brandKey}` }
    ], [displayName, brandKey]);

    return (
        <>
            <SEO
                title="Jubilant Metal And Alloys - Stainless Steel Pipes, Flanges, Fittings & Fasteners | Mumbai"
                description="Manufacturer, Stockist & Exporter of Stainless Steel Pipes, Tubes, Flanges, Pipe Fittings, Forged Fittings, Fasteners, Round Bars, Sheets & Plates. Shop No 6, A Wing, 1st Floor, Nakoda Mehta Sunshine Heights, Girgaon, Mumbai - 400004. Contact: +91 9820171740."
                path={`/supplier/${brandKey}`}
                breadcrumbs={breadcrumbs}
            />
            <Banner
                title={displayName}
                desc="Your Trusted Partner in Stainless Steel & Alloy Products | Girgaon, Mumbai"
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
