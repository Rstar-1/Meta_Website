import React from 'react';
import { useNavigate } from 'react-router-dom';

import Heading from '../../../../components/layout/generic/Heading';
import SlideLayout from '../../../../components/layout/sections/SlideLayout';
import CardLayout from '../../../../components/layout/sections/CardLayout';

import { useCart } from '../../../../feature/slice/cartSlice';
import { feedCMS, productsData } from '../../../../utils/apiData';

const FeatureSection = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const items = productsData?.slice(0, 6) || [];
    const heading = feedCMS?.heading || {
        tag: 'Product Protection',
        title: 'Delivering Innovative IT',
        actionText: 'Show All',
        actionLink: '/products'
    };

    const handleItemClick = React.useCallback((item) => {
        if (item.id) {
            navigate(`/product/${item.id}`, { state: { product: item } });
        } else {
            navigate('/products');
        }
    }, [navigate]);

    const handleShopLook = React.useCallback((item) => {
        addToCart(item);
    }, [addToCart]);

    const renderItem = React.useCallback((item) => (
        <CardLayout
            key={item.id}
            version="feature3"
            minWidth='280px'
            maxWidth='280px'
            item={item}
            onClick={() => handleItemClick(item)}
            onShopLook={() => handleShopLook(item)}
        />
    ), [handleItemClick, handleShopLook]);

    return (
        <div className="w-full py-50">
            <Heading
                version="v2"
                tag={heading.tag}
                title={heading.title}
                actionText={heading.actionText}
                actionLink={heading.actionLink}
            />

            <SlideLayout
                version="slide"
                col={4}
                gap="12"
                className="mt-30"
                items={items}
                renderItem={renderItem}
            />
        </div>
    );
};

FeatureSection.displayName = 'FeatureSection';

export default React.memo(FeatureSection);