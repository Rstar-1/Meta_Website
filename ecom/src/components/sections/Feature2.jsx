import React, { useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../../components/common/Container';
import Image from '../../../../components/common/Image';
import { useCart } from '../../../../context/CartContext';

const TRENDING_ITEMS = [
    {
        id: 1,
        tag: 'Danish Design',
        title: 'Material Natural',
        productName: 'Grid Chair...',
        price: '$309.00',
        image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=700&q=80',
        thumb: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=150&q=80'
    },
    {
        id: 2,
        tag: 'Cotton Collection',
        title: 'Authority Design',
        productName: 'Lunara Te...',
        price: '$27.00',
        image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=700&q=80',
        thumb: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=150&q=80'
    },
    {
        id: 3,
        tag: 'Minimalism Style',
        title: 'Steels Lighting',
        productName: 'Sculpt...',
        price: '$415.00',
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80',
        thumb: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=150&q=80'
    },
    {
        id: 4,
        tag: 'Danish Design',
        title: 'Nightstand',
        productName: 'Pixel...',
        price: '$85.00',
        image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=700&q=80',
        thumb: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=150&q=80'
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
            className="h-400 sm-h-350 rounded-10 relative overflow-hidden group cursor-pointer w-full"
        >
            {/* Background image */}
            <Image
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Dark gradient overlay & text */}
            <div
                className="absolute bottom-0 left-0"
                style={{
                    background: 'linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.88) 100%)'
                }}
            >
                {/* Subtitle / Tag */}
                <p className="small-text font-600 text-white mb-4">
                    {item.tag}
                </p>

                {/* Main Heading */}
                <h3 className="title-text font-600 text-white">
                    {item.title}
                </h3>

                {/* Bottom interactive card bar */}
                <div
                    className="rounded-5 p-8 flex items-center justify-between gap-10 mt-10"
                    style={{
                        backgroundColor: 'rgba(30, 30, 30, 0.75)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.12)'
                    }}
                >
                    <div className="flex items-center gap-10 overflow-hidden flex-1">
                        <img
                            src={item.thumb}
                            alt={item.productName}
                            width='50px'
                            height='50px'
                            className="flex object-cover"
                        />

                        {/* Title & Price */}
                        <div className="overflow-hidden flex-1">
                            <p className="small-text font-600 text-white truncate leading-tight">
                                {item.productName}
                            </p>
                            <p className="small-text font-600 text-white mt-2 leading-tight">
                                {item.price}
                            </p>
                        </div>
                    </div>

                    {/* Shop Button */}
                    <button
                        type="button"
                        onClick={handleShop}
                        className="rounded-20 bg-white text-dark font-600 px-16 py-6 mini-text hover:bg-primary hover:text-white transition-colors border-none cursor-pointer flex-shrink-0"
                    >
                        Shop
                    </button>
                </div>
            </div>
        </div>
    );
});

TrendingCard.displayName = 'TrendingCard';

const FeatureSection = () => {
    const navigate = useNavigate();

    const handleSelect = useCallback((item) => {
        navigate(`/product/${item.id}`, { state: { product: item } });
    }, [navigate]);

    return (
        <Container>
            <div className="w-full py-40 sm-py-20">
                <div className="grid grid-cols-4 md-grid-cols-2 sm-grid-cols-1 gap-12">
                    {TRENDING_ITEMS.map((item) => (
                        <TrendingCard
                            key={item.id}
                            item={item}
                            onSelect={handleSelect}
                        />
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default memo(FeatureSection);