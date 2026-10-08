import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

import Banner from '../../components/layout/generic/Banner';
import DetailSection from './sections/DetailSection';
import SpecifySection from './sections/SpecifySection';
import SEO from '../../seo';

import bannerImg from '../../assets/about-banner.jpg';

import { productsData, categoriesData } from '../../utils/apiData';

const ProductDetail = () => {
    const { id } = useParams();
    const location = useLocation();

    const product = React.useMemo(() => {
        const fromState = location.state?.product;
        if (fromState) return fromState;
        if (id) {
            const found = productsData.find((p) => String(p.id) === String(id));
            if (found) return found;
        }
        return productsData.find((p) => !p.isBanner) || productsData[0];
    }, [id, location.state]);

    const category = React.useMemo(() => {
        if (!product) return null;
        if (product.categoryId) {
            return categoriesData.find((c) => c.id === product.categoryId) || null;
        }
        return categoriesData.find((c) => c.name.toLowerCase() === product.category?.toLowerCase()) || null;
    }, [product]);

    const categoryName = category?.name || product?.category || 'Products';
    const productName = product?.name || product?.title || 'Product Detail';

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
                breadcrumbs={[
                    { label: 'Home', path: '/home' },
                    { label: categoryName, path: `/product?category=${encodeURIComponent(categoryName)}` },
                    { label: productName, path: `/product/${product?.id || id || ''}` }
                ]}
            />
            <Banner
                title="Product Detail"
                desc={productName}
                bgImage={bannerImg}
                breadcrumbs={[
                    { label: 'Home', path: '/home' },
                    { label: categoryName, path: `/product?category=${encodeURIComponent(categoryName)}` },
                    { label: productName, path: `/product/${product?.id || id || ''}` }
                ]}
            />
            <DetailSection currentProduct={product} category={category} />
            <SpecifySection />
        </>
    );
};

export default React.memo(ProductDetail);