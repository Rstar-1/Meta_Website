import React, { useState, useMemo, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../../components/common/Container';
import Image from '../../../../components/common/Image';
import Button from '../../../../components/common/Button';
import Tab from '../../../../components/common/Tab';
import Badge from '../../../../components/common/Badge';
import Heading from '../../../../components/layout/generic/Heading';
import { useCart } from '../../../../context/CartContext';

const TABS = ['New Arrivals', 'Hot Items', 'Best Sellers'];

const WINTER_PRODUCTS = [
    {
        id: 1,
        name: 'Haven Hooded Puffer',
        category: 'HOODIES',
        price: '$100.00',
        originalPrice: null,
        badge: null,
        colors: ['#5b6951'],
        image: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=600&q=80',
        tabs: ['New Arrivals', 'Best Sellers']
    },
    {
        id: 2,
        name: 'Leo 84 Classic',
        category: 'PANTS',
        price: '$130.00',
        originalPrice: null,
        badge: { text: 'New', color: '#0F8354' },
        colors: ['#6692bc', '#b8cde3', '#324a73'],
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80',
        tabs: ['New Arrivals', 'Hot Items']
    },
    {
        id: 3,
        name: 'Timber Flannel',
        category: 'FLANNEL',
        price: '$100.00',
        originalPrice: null,
        badge: null,
        colors: ['#c77a34', '#eddab8'],
        image: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&w=600&q=80',
        tabs: ['New Arrivals', 'Best Sellers']
    },
    {
        id: 4,
        name: 'Comfy Pant',
        category: 'PANTS',
        price: '$120.00',
        originalPrice: null,
        badge: { text: 'New', color: '#0F8354' },
        colors: ['#5f6368', '#dedad5'],
        image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=600&q=80',
        tabs: ['New Arrivals', 'Hot Items']
    },
    {
        id: 5,
        name: 'Seafarer Sweater',
        category: 'SWEATERS',
        price: '$100.00',
        originalPrice: null,
        badge: null,
        colors: ['#3b455b', '#ebdcc0'],
        image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80',
        tabs: ['New Arrivals', 'Best Sellers']
    },
    {
        id: 6,
        name: 'Breezy Sock',
        category: 'SOCKS',
        price: '$100.00',
        originalPrice: null,
        badge: { text: 'Best Choice!', color: '#000000' },
        colors: ['#8bb2d4', '#f4f6f8'],
        image: 'https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&w=600&q=80',
        tabs: ['New Arrivals', 'Hot Items', 'Best Sellers']
    },
    {
        id: 7,
        name: 'Sage Knit Hoodie',
        category: 'HOODIES',
        price: '$350.00',
        originalPrice: null,
        badge: null,
        colors: ['#ded4bc', '#b9cbda'],
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
        tabs: ['New Arrivals', 'Hot Items']
    },
    {
        id: 8,
        name: 'Seasonal Hat',
        category: 'HATS',
        price: '$200.00',
        originalPrice: '$245.00',
        badges: [
            { text: 'Sale', color: '#C8281E' },
            { text: 'New', color: '#0F8354' }
        ],
        colors: ['#59634b', '#e8dcbe'],
        image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80',
        tabs: ['New Arrivals', 'Hot Items', 'Best Sellers']
    },
    {
        id: 9,
        name: 'Ridge Hoodie',
        category: 'HOODIES',
        price: '$300.00',
        originalPrice: '$345.00',
        badge: { text: 'Sale', color: '#C8281E' },
        ticker: 'Selling Fast ⚡ Selling Fast ⚡',
        colors: ['#b9cbda', '#ded4bc'],
        image: 'https://images.unsplash.com/photo-1578768079052-aa76e520028b?auto=format&fit=crop&w=600&q=80',
        tabs: ['New Arrivals', 'Hot Items', 'Best Sellers']
    },
    {
        id: 10,
        name: 'Mason Corduroy Pant',
        category: 'PANTS',
        price: '$120.00',
        originalPrice: null,
        badge: null,
        colors: ['#ddc79e', '#7b4421', '#cfcbca', '#c2b39e'],
        extraCount: '+1',
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80',
        tabs: ['New Arrivals', 'Best Sellers']
    }
];

const ProductCard = memo(({ item, onClick }) => {
    const { addToCart } = useCart();

    const handleCardClick = useCallback(() => {
        onClick?.(item);
    }, [onClick, item]);

    const handleAddToCart = useCallback((e) => {
        e.stopPropagation();
        addToCart(item);
    }, [addToCart, item]);

    const badges = item.badges || (item.badge ? [item.badge] : []);

    return (
        <div
            onClick={handleCardClick}
            className='cursor-pointer'
        >
            <div className="h-250 w-full overflow-hidden rounded-10 relative product-card">
                {badges.length > 0 && (
                    <div className='top-0 left-0 absolute p-10 flex flex-col gap-6 z-10'>
                        {badges.map((b, idx) => {
                            const text = typeof b === 'object' ? b.text : b;
                            const color = typeof b === 'object' ? b.color || b.bg : undefined;
                            return (
                                <Badge
                                    key={idx}
                                    text={text}
                                    bg={color || 'bg-danger'}
                                    textColor="white"
                                    shape="pill"
                                    size="xs"
                                    capitalize={false}
                                    className="font-500"
                                />
                            );
                        })}
                    </div>
                )}

                <Image
                    src={item.image}
                    alt={item.name}
                    className="flex w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {item.ticker && (
                    <div className="absolute bottom-12 left-0 right-0 flex justify-center z-10 pointer-events-none px-10">
                        <Badge
                            text={item.ticker}
                            bg="#ffffff"
                            textColor="#000000"
                            shape="pill"
                            size="sm"
                            capitalize={false}
                            className="font-600 shadow-sm whitespace-nowrap"
                        />
                    </div>
                )}

                <div className='product-btn w-full absolute bottom-0 left-0'>
                    <div className='p-18'>
                        <Button
                            onClick={handleAddToCart}
                            text="Add to Cart"
                            icon="Cart"
                            iconWidth="18"
                            iconHeight="18"
                            iconStrokeWidth="2"
                            iconPosition='left'
                            version="v3"
                            bg="primary"
                            color="white"
                            className='rounded-30 w-full'
                        />
                    </div>
                </div>
            </div>

            <p className='text-gray font-500 uppercase mini-text mt-5'>
                {item.category}
            </p>

            <h3 className='headmini-text text-dark uppercase font-600 mt-2 truncate'>
                {item.name}
            </h3>

            <div className='flex items-center gap-6 mt-2'>
                <p className={`mini-text font-600 ${item.originalPrice ? 'text-danger' : 'text-dark'}`}>
                    {item.price}
                </p>
                {item.originalPrice && (
                    <p className='mini-text text-gray font-400 line-through'>
                        {item.originalPrice}
                    </p>
                )}
            </div>

            {item.colors && (
                <div className='flex items-center gap-8 mt-6'>
                    {item.colors.map((color, cIdx) => (
                        <span
                            key={cIdx}
                            style={{
                                width: '14px',
                                height: '14px',
                                borderRadius: '3px',
                                backgroundColor: color,
                                border: '1px solid rgba(0,0,0,0.15)'
                            }}
                        />
                    ))}
                    {item.extraCount && (
                        <span className="mini-text text-gray font-500 ml-2">
                            {item.extraCount}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
});

ProductCard.displayName = 'ProductCard';

const TrendingSection = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('New Arrivals');

    const handleTabChange = useCallback((tab) => {
        setActiveTab(tab);
    }, []);

    const handleProductClick = useCallback((item) => {
        navigate(`/product/${item.id}`, { state: { product: item } });
    }, [navigate]);

    const filteredProducts = useMemo(() => {
        return WINTER_PRODUCTS.filter((item) =>
            item.tabs ? item.tabs.includes(activeTab) : true
        );
    }, [activeTab]);

    return (
        <Container style={{ background: 'var(--forth)' }}>
            <div className="w-full py-40">
                <style>{`
                    .product-card .product-btn {
                        opacity: 0;
                        visibility: hidden;
                        transform: translateY(10px);
                        transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.3s;
                    }
                    .product-card:hover .product-btn {
                        opacity: 1;
                        visibility: visible;
                        transform: translateY(0);
                    }
                `}</style>

                <div>
                    <Heading
                        version="v2"
                        tag="SPECIAL OFFERS FOR YOU"
                        title="Featured Products & Popular Designs"
                        actionText="Shop All Products"
                        actionLink="/products"
                    />
                    <Tab
                        tabs={TABS}
                        activeTab={activeTab}
                        onChange={handleTabChange}
                        version="v1"
                        className='mt-16'
                    />
                </div>

                <div className="grid grid-cols-5 md-grid-cols-3 sm-grid-cols-2 mt-20" style={{ gap: '20px' }}>
                    {filteredProducts.map((item) => (
                        <ProductCard
                            key={item.id}
                            item={item}
                            onClick={handleProductClick}
                        />
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default memo(TrendingSection);