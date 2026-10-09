import React, { lazy, Suspense, memo, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import LazySection from '../../components/common/LazySection';
import Container from '../../components/common/Container';
import Banner from '../../components/layout/generic/Banner';
import SEO from '../../seo';

import { productsData, categoriesData } from '../../utils/apiData';

const DetailSection = lazy(() => import('./sections/DetailSection'));
const SpecifySection = lazy(() => import('./sections/SpecifySection'));

const productDetailSections = [
    {
        id: 'detail',
        Component: DetailSection,
        minHeight: '600px',
        isContainer: false,
        isEager: true,
    },
    {
        id: 'specify',
        Component: SpecifySection,
        minHeight: '400px',
        isContainer: true,
    },
];

const SectionFallback = memo(({ minHeight = '100px' }) => (
    <div className="w-full" style={{ minHeight }} />
));

const ProductDetail = () => {
    const { id } = useParams();
    const location = useLocation();

    const product = useMemo(() => {
        const fromState = location.state?.product;
        if (fromState) return fromState;
        if (id) {
            const found = productsData.find((p) => String(p.id) === String(id));
            if (found) return found;
        }
        return productsData.find((p) => !p.isBanner) || productsData[0];
    }, [id, location.state]);

    const category = useMemo(() => {
        if (!product) return null;
        if (product.categoryId) {
            return categoriesData.find((c) => c.id === product.categoryId) || null;
        }
        return categoriesData.find((c) => c.name.toLowerCase() === product.category?.toLowerCase()) || null;
    }, [product]);

    const categoryName = category?.name || product?.category || 'Products';
    const productName = product?.name || product?.title || 'Product Detail';

    const breadcrumbs = useMemo(() => [
        { label: 'Home', path: '/home' },
        { label: categoryName, path: `/product?category=${encodeURIComponent(categoryName)}` },
        { label: productName, path: `/product/${product?.id || id || ''}` }
    ], [categoryName, productName, product?.id, id]);

    return (
        <>
            <SEO
                page="productDetail"
                title={`${productName} | Ashmita Vinyls`}
                description={product?.desc || product?.description || `Explore ${productName} by Ashmita Vinyls. Premium quality PVC vinyl products and solutions.`}
                image={product?.image || product?.images?.[0]}
                path={`/product/${product?.id || id || ''}`}
                type="product"
                product={{
                    name: productName,
                    description: product?.desc || product?.description,
                    images: product?.images || (product?.image ? [product.image] : []),
                    price: product?.price,
                    currency: 'INR',
                    stock: product?.inStock ? (product?.stockCount || 10) : 0,
                    sku: `AV-${product?.id || id}`,
                    brand: product?.vendor || 'Ashmita Vinyls',
                }}
                breadcrumbs={breadcrumbs}
            />
            <Banner
                title="Product Overview"
                desc={productName}
                breadcrumbs={breadcrumbs}
            />
            {productDetailSections.map(({ id: sectionId, Component, isEager, minHeight, isContainer = true, containerClass, containerStyle, version }) => {
                const SectionContent = (
                    <Suspense fallback={<SectionFallback minHeight={minHeight} />}>
                        <Component currentProduct={product} category={category} />
                    </Suspense>
                );

                const Content = isContainer ? (
                    <Container className={containerClass} style={containerStyle} version={version}>
                        {SectionContent}
                    </Container>
                ) : (
                    SectionContent
                );

                return isEager ? (
                    <React.Fragment key={sectionId}>
                        {Content}
                    </React.Fragment>
                ) : (
                    <LazySection
                        key={sectionId}
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

export default memo(ProductDetail);