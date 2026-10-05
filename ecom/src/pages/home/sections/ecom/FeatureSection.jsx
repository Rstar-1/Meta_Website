import { useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '../../../../components/common/Container';
import Image from '../../../../components/common/Image';
import Button from '../../../../components/common/Button';

import Heading from '../../../../components/layout/generic/Heading';

import { useCart } from '../../../../context/CartContext';

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
            className="h-400 sm-h-350 rounded-10 relative overflow-hidden cursor-pointer w-full feature-card"
        >
            <Image
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover flex filter-b4"
            />

            <div className='absolute bottom-0 left-0 w-full feature-info'>
                <div className='px-12 mb-20 feature-data '>
                    <p className="para-text font-400 text-white">
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
                        <div className=" w-70">
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

const FeatureSection = () => {
    const navigate = useNavigate();

    const handleSelect = useCallback((item) => {
        navigate(`/product/${item.id}`, { state: { product: item } });
    }, [navigate]);

    return (
        <Container>
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
                <div className="mt-20 grid-cols-4 md-grid-cols-2 sm-grid-cols-1 gap-12">
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