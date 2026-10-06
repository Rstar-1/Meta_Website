import React, { useRef, useState, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '../../../../components/common/Container';
import Image from '../../../../components/common/Image';
import Button from '../../../../components/common/Button';

import Heading from '../../../../components/layout/generic/Heading';

import { useCart } from '../../../../feature/slice/cartSlice';

const TRENDING_ITEMS = [
    {
        id: 1,
        tag: 'Danish Design',
        title: 'Material Natural',
        productName: 'Grid Chair Material Natural',
        price: '$309.00',
        image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=700&q=80',
        thumb: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=150&q=80'
    },
    {
        id: 2,
        tag: 'Cotton Collection',
        title: 'Authority Design',
        productName: 'Lunara Material Natural.',
        price: '$27.00',
        image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=700&q=80',
        thumb: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=150&q=80'
    },
    {
        id: 3,
        tag: 'Minimalism Style',
        title: 'Steels Lighting',
        productName: 'Sculpt Material Natural',
        price: '$415.00',
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80',
        thumb: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=150&q=80'
    },
    {
        id: 4,
        tag: 'Danish Design',
        title: 'Nightstand',
        productName: 'Pixel Material Natural',
        price: '$85.00',
        image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=700&q=80',
        thumb: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=150&q=80'
    },
    {
        id: 5,
        tag: 'Modern Living',
        title: 'Nordic Table',
        productName: 'Elegance Material Natural',
        price: '$240.00',
        image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=700&q=80',
        thumb: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=150&q=80'
    },
    {
        id: 6,
        tag: 'Contemporary',
        title: 'Velvet Lounge',
        productName: 'Plush Material Natural',
        price: '$510.00',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=700&q=80',
        thumb: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=150&q=80'
    }
];

const TrendingCard = memo(({ item, onSelect }) => {
    const { addToCart } = useCart();

    const handleClick = useCallback(() => {
        onSelect?.(item);
    }, [onSelect, item]);

    const handleShop = useCallback((e) => {
        e.stopPropagation();
        addToCart({
            id: item.id,
            name: item.productName.replace('...', ''),
            price: item.price,
            image: item.thumb
        });
        onSelect?.(item);
    }, [addToCart, onSelect, item]);

    return (
        <div
            onClick={handleClick}
            className="h-350 sm-h-350 rounded-10 relative overflow-hidden cursor-pointer feature-card flex-shrink-0"
            style={{ minWidth: '280px', maxWidth: '280px' }}
        >
            <Image
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover flex filter-b4"
            />

            <div className='absolute bottom-0 left-0 w-full feature-info'>
                <div className='px-12 mb-20 feature-data'>
                    <p className="small-text font-400 text-white">
                        {item.tag}
                    </p>
                    <h3 className="title-text font-600 text-white mt-3 uppercase">
                        {item.title}
                    </h3>
                </div>
                <div
                    className="rounded-5 p-14 flex items-center justify-between bg-gray feature-div"
                >
                    <div className="flex items-center gap-8 w-60">
                        <Image
                            src={item.thumb}
                            alt={item.productName}
                            height='45px'
                            className="flex object-cover rounded-5 w-30"
                        />
                        <div className="w-70">
                            <p className="small-text font-400 text-white line-clamp1">
                                {item.productName}
                            </p>
                            <p className="mini-text font-500 text-white">
                                {item.price}
                            </p>
                        </div>
                    </div>
                    <Button
                        onClick={handleShop}
                        text='Shop Now'
                        version="v2"
                        bg="white"
                        color="dark"
                        className="rounded-20"
                    />
                </div>
            </div>
        </div>
    );
});

TrendingCard.displayName = 'TrendingCard';

const FeatureSliderSection = ({ items, onSelect }) => {
    const scrollRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(25);

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            const maxScroll = scrollWidth - clientWidth;
            if (maxScroll > 0) {
                const progress = Math.min(100, Math.max(25, ((scrollLeft / maxScroll) * 75) + 25));
                setScrollProgress(progress);
            }
        }
    };

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className='mt-20'>
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                style={{
                    scrollBehavior: 'smooth',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}
                className="flex gap-12 overflow-auto"
            >
                {items.map((item) => (
                    <TrendingCard
                        key={item.id}
                        item={item}
                        onSelect={onSelect}
                    />
                ))}
            </div>

            <div className='flex items-center justify-between mt-20'>
                <div style={{ height: '3px' }} className='w-80 sm-w-60 bg-tertiary relative'>
                    <div
                        style={{
                            height: '3px',
                            width: `${scrollProgress}%`,
                            transition: 'width 0.2s ease'
                        }}
                        className='top-0 left-0 bg-primary absolute'
                    />
                </div>

                <div className='flex items-center gap-12'>
                    <Button
                        aria-label="Previous Items"
                        onClick={() => scroll('left')}
                        icon="ArrowLeft"
                        iconWidth="18"
                        iconHeight="18"
                        iconStrokeWidth="2"
                        variant="outline"
                        version="icon"
                        color='primary'
                        className="border-primary rounded-30"
                    />
                    <Button
                        aria-label="Next Items"
                        onClick={() => scroll('right')}
                        icon="ArrowRight"
                        iconWidth="18"
                        iconHeight="18"
                        iconStrokeWidth="2"
                        variant="outline"
                        version="icon"
                        color='primary'
                        className="border-primary rounded-30"
                    />
                </div>
            </div>
        </div>
    );
};

const FeatureSection = () => {
    const navigate = useNavigate();

    const handleSelect = useCallback((item) => {
        navigate(`/product/${item.id}`, { state: { product: item } });
    }, [navigate]);

    return (
        <Container style={{ background: 'var(--forth)' }}>
            <style>{`
                    .feature-card .feature-info {
                        transform: translateY(73px);
                        transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1);
                        will-change: transform;
                    }
                    .feature-card:hover .feature-info {
                        transform: translateY(0);
                    }
                    .feature-card:hover .feature-data {
                       opacity: 0;
                        transition: opacity 0.3s ease;
                    }
                    .feature-card:hover .feature-div {
                        opacity: 1;
                    }
                    .feature-card:hover > img {
                        transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
                        will-change: transform;
                        transform: scale(1.06);
                    }
                `}</style>
            <div className="w-full py-50 sm-py-20">
                <Heading
                    version="v2"
                    tag="SPECIAL OFFERS FOR YOU"
                    title="Featured Products & Popular Designs"
                    actionText="Shop All Products"
                    actionLink="/products"
                />
                <FeatureSliderSection
                    items={TRENDING_ITEMS}
                    onSelect={handleSelect}
                />
            </div>
        </Container>
    );
};

export default memo(FeatureSection);