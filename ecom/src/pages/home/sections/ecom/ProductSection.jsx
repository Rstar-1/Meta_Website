import React from 'react';
import { useNavigate } from 'react-router-dom';

import Heading from '../../../../components/layout/generic/Heading';
import SlideLayout from '../../../../components/layout/sections/SlideLayout';
import CardLayout from '../../../../components/layout/sections/CardLayout';

import { productsData } from '../../../../utils/apiData';

const ProductSection = () => {
    const navigate = useNavigate();

    const allProducts = React.useMemo(() => {
        return productsData.filter((p) => !p.isBanner);
    }, []);

    const firstRowProducts = React.useMemo(() => allProducts.slice(0, 6), [allProducts]);
    const secondRowProducts = React.useMemo(
        () => (allProducts.length > 6 ? allProducts.slice(6, 12) : allProducts.slice(0, 6)),
        [allProducts]
    );

    const handleProductClick = React.useCallback((item) => {
        navigate(`/product/${item.id}`, { state: { product: item } });
    }, [navigate]);

    const handleCategoryClick = React.useCallback((cat) => {
        navigate(`/product?category=${encodeURIComponent(cat)}`);
    }, [navigate]);

    return (
        <div className="w-full py-10">

            <SlideLayout
                items={firstRowProducts}
                className='py-30'
                version='btnslide'
                tag=""
                title="FEATURED PRODUCTS & POPULAR DESIGNS"
                renderItem={(item) => (
                    <CardLayout
                        key={item.id}
                        version="product"
                        item={item}
                        onClick={() => handleProductClick(item)}
                        onCategoryClick={handleCategoryClick}
                    />
                )}
            />

            <SlideLayout
                items={secondRowProducts}
                className='py-10'
                version='btnslide'
                tag=""
                title="FEATURED PRODUCTS & POPULAR DESIGNS"
                renderItem={(item) => (
                    <CardLayout
                        key={item.id}
                        version="product"
                        item={item}
                        onClick={() => handleProductClick(item)}
                        onCategoryClick={handleCategoryClick}
                    />
                )}
            />
        </div>
    );
};

export default React.memo(ProductSection);