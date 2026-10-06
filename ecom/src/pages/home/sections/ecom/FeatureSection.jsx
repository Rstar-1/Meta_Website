import React, { useMemo, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '../../../../components/common/Container';
import Heading from '../../../../components/layout/generic/Heading';
import SlideLayout from '../../../../components/layout/sections/SlideLayout';
import CardLayout from '../../../../components/layout/sections/CardLayout';
import { productsData } from '../../../../utils/apiData';

const FeatureSection = () => {
    const navigate = useNavigate();

    const trendingProducts = useMemo(() => {
        const filtered = productsData.filter((item) => item.trending && !item.isBanner);
        return filtered.length > 0 ? filtered : productsData.filter((item) => !item.isBanner).slice(0, 6);
    }, []);

    const handleSelect = useCallback((item) => {
        navigate(`/product/${item.id}`, { state: { product: item } });
    }, [navigate]);

    return (
        <Container style={{ background: 'var(--forth)' }}>
            <div className="w-full py-50 sm-py-20">
                <Heading
                    version="v2"
                    tag="BEST SELLING PVC STRIPS"
                    title="Featured PVC Strip Curtains & Rolls"
                    actionText="View All Products"
                    actionLink="/product"
                />
                <SlideLayout
                    className="mt-20"
                    items={trendingProducts}
                    renderItem={(item) => (
                        <CardLayout
                            key={item.id}
                            version="feature"
                            item={item}
                            onSelect={handleSelect}
                        />
                    )}
                />
            </div>
        </Container>
    );
};

export default memo(FeatureSection);