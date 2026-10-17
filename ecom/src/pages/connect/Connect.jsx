import React, { lazy, Suspense, memo } from 'react';
import LazySection from '../../components/common/LazySection';
import Container from '../../components/common/Container';
import Banner from '../../components/layout/generic/Banner';
import SEO from '../../seo';
import { carpetPatchBanner } from '../../utils/imageResolver';

const Enquiry = lazy(() => import('./sections/Enquiry'));
const PatchSection = lazy(() => import('../home/sections/ecom/PatchSection'));

const connectSections = [
    {
        id: 'enquiry',
        Component: Enquiry,
        minHeight: '500px',
        isContainer: true
    },
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

const BREADCRUMBS = [
    { label: 'Home', path: '/home' },
    { label: 'Connect With Us', path: '/connect' }
];

const SectionFallback = memo(({ minHeight = '100px' }) => (
    <div className="w-full" style={{ minHeight }} />
));

const Connect = () => {
    return (
        <>
            <SEO
                title="Connect With Us - Roxy Enterprises | Exporter, Stockiest & Supplier Mumbai"
                description="Kind Attention Procurement Department: Connect with Roxy Enterprises for Stainless Steel, Nickel Alloy, Alloy Steel & Carbon Steel Pipes, Plates, Flanges, and Fittings. Stockyard at 5th Kumbharwada, Mumbai. Call +91 9769257080."
                path="/connect"
                breadcrumbs={BREADCRUMBS}
            />
            <Banner
                title="Connect With Us"
                desc="Kind Attention: Procurement Department — Direct Exporter & Stockiest Quotations, MTC 3.1/3.2 Specs & Inquiries"
                breadcrumbs={BREADCRUMBS}
            />
            {connectSections.map(({ id, Component, isEager, minHeight, isContainer, containerClass, containerStyle }) => {
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
        </>
    );
};

export default memo(Connect);