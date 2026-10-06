import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '../../../../components/common/Container';
import Tab from '../../../../components/common/Tab';

import Heading from '../../../../components/layout/generic/Heading';
import SlideLayout from '../../../../components/layout/sections/SlideLayout';
import CardLayout from '../../../../components/layout/sections/CardLayout';

import { productsData } from '../../../../utils/apiData';

const TABS = ['New Arrivals', 'Hot Items', 'Best Sellers'];

const ProductSection = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('New Arrivals');

    const handleTabChange = useCallback((tab) => {
        setActiveTab(tab);
    }, []);

    const filteredProducts = useMemo(() => {
        const real = (productsData || []).filter((p) => !p.isBanner);
        if (activeTab === 'Hot Items') {
            const trending = real.filter((p) => p.trending);
            return trending.length > 0 ? trending : real;
        }
        if (activeTab === 'Best Sellers') {
            return [...real].reverse();
        }
        return real;
    }, [activeTab]);

    const handleProductClick = useCallback((item) => {
        navigate(`/product/${item.id}`, { state: { product: item } });
    }, [navigate]);

    const handleCategoryClick = useCallback((cat) => {
        navigate(`/product?category=${encodeURIComponent(cat)}`);
    }, [navigate]);

    return (
        <Container style={{ background: 'var(--forth)' }}>
            <div className="w-full py-40">
                <div className="flex sm-grid-cols-1 items-end justify-between">
                    <div className="w-60 sm-w-full">
                        <Heading
                            version="v2"
                            tag="SPECIAL OFFERS FOR YOU"
                            title="Featured Products & Popular Designs"
                        />
                    </div>
                    <Tab
                        tabs={TABS}
                        activeTab={activeTab}
                        onChange={handleTabChange}
                        version="v2"
                        className="w-40 sm-w-full sm-mt-12"
                    />
                </div>

                <SlideLayout
                    version="grid"
                    col={5}
                    className="mt-30"
                    items={filteredProducts.slice(0, 8)}
                    renderItem={(item) => (
                        <CardLayout
                            key={item.id}
                            version="product"
                            item={item}
                            isFluid={true}
                            onClick={() => handleProductClick(item)}
                            onCategoryClick={handleCategoryClick}
                        />
                    )}
                />
            </div>
        </Container>
    );
};

export default React.memo(ProductSection);