import React, { useRef, useState, useCallback, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../../components/common/Container';
import Image from '../../../../components/common/Image';
import Button from '../../../../components/common/Button';
import Badge from '../../../../components/common/Badge';
import Fields from '../../../../components/forms/Fields';
import Heading from '../../../../components/layout/generic/Heading';
import { useCart } from '../../../../context/CartContext';


const DEAL_PRODUCTS = [
    {
        id: 1,
        vendor: 'Meridian Tech',
        name: 'Meridian VectorPro 15 ...',
        rating: 0,
        ratingCount: 0,
        price: '$1,599.00',
        badges: [
            {
                text: 'Daily deals',
                bg: '#fef08a',
                color: '#854d0e'
            }
        ],
        promo: 'Extra Deals Available',
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=500&q=80',
        variants: [
            'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=500&q=80'
        ]
    },
    {
        id: 2,
        vendor: 'NovaTech Wearables',
        name: 'ActiveCore Smartwatch...',
        rating: 5,
        ratingCount: 3,
        price: '$74.99',
        oldPrice: '$109.99',
        discount: '-32%',
        image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 3,
        vendor: 'Evolution',
        name: 'Evolution Tab Air 11',
        rating: 0,
        ratingCount: 0,
        pricePrefix: 'From',
        price: '$599.00',
        image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=500&q=80',
        variants: [
            'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=500&q=80'
        ]
    },
    {
        id: 4,
        vendor: 'Evolution Phones',
        name: 'Evolution X Air 5G...',
        rating: 0,
        ratingCount: 0,
        pricePrefix: 'From',
        price: '$869.00',
        image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80',
        variants: [
            'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=500&q=80'
        ]
    },
    {
        id: 5,
        vendor: 'UrbanCraft Essentials',
        name: 'Precision Stainless...',
        rating: 5,
        ratingCount: 3,
        pricePrefix: 'From',
        price: '$179.00',
        promo: '5 years warranty*',
        image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=500&q=80',
        variants: [
            'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=500&q=80'
        ]
    },
    {
        id: 6,
        vendor: 'AeroNote',
        name: 'BreezeBook 13 —...',
        rating: 0,
        ratingCount: 0,
        price: '$849.00',
        badges: [
            {
                text: 'Weekend deal',
                bg: '#4338ca',
                color: '#ffffff'
            },
            {
                text: 'Daily deals',
                bg: '#fef08a',
                color: '#854d0e'
            },
            {
                text: 'Price drop',
                bg: '#ffedd5',
                color: '#9a3412'
            },
            {
                text: 'New',
                bg: '#e0f2fe',
                color: '#0369a1'
            }
        ],
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=80'
    }
];


const featureSections = [1, 2];


const ProductDealCard = memo(({ item, onClick }) => {
    const { addToCart } = useCart();
    const [selectedVariant, setSelectedVariant] = useState(0);

    const activeImage = useMemo(
        () => item.variants?.[selectedVariant] || item.image,
        [item.variants, selectedVariant, item.image]
    );

    const handleCardClick = useCallback(
        () => onClick?.(item),
        [onClick, item]
    );

    return (
        <div
            onClick={handleCardClick}
            className="cursor-pointer"
            style={{
                width: '270px',
                minWidth: '270px'
            }}
        >
            <div className="w-full h-250 rounded-5 relative overflow-hidden product-card">

                <div className="absolute top-0 right-0 m-10 z-50">
                    <Badge
                        text="In stock"
                        color="success"
                        size="xs"
                        shape="rounded"
                        className="font-400"
                    />
                </div>

                <Image
                    src={activeImage}
                    alt={item.name}
                    className="h-full w-full object-cover flex"
                />

                <div className="product-btn w-full absolute bottom-0 left-0">
                    <div className="p-18">
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                addToCart(item);
                            }}
                            text="Add to Cart"
                            icon="Cart"
                            iconWidth="18"
                            iconHeight="18"
                            iconStrokeWidth="2"
                            iconPosition="left"
                            version="v3"
                            bg="primary"
                            color="white"
                            className="rounded-30 w-full"
                        />
                    </div>
                </div>
            </div>

            <div className="pt-10">

                <p className="mini-text text-gray font-500 uppercase">
                    {item.vendor}
                </p>

                <h3
                    className="headmini-text text-dark font-600 line-clamp1"
                    title={item.name}
                >
                    {item.name}
                </h3>

                <Fields
                    type="rating"
                    value={item.rating || 0}
                    size={13}
                    activeColor="#f59e0b"
                    inactiveColor="#d1d5db"
                    disabled
                    className="mt-5"
                />

                <div className="flex items-center gap-6 mt-4 flex-wrap">

                    <p
                        className={`small-text font-600 ${item.oldPrice
                            ? 'text-danger'
                            : 'text-dark'
                            }`}
                    >
                        {item.price}
                    </p>

                    {item.oldPrice && (
                        <p className="mini-text text-gray line-through font-400">
                            {item.oldPrice}
                        </p>
                    )}

                    {item.discount && (
                        <Badge
                            text={item.discount}
                            color="danger"
                            size="xs"
                            shape="rounded"
                            className="font-500"
                        />
                    )}
                </div>
                {item.variants?.length > 0 && (
                    <div className="flex items-center gap-6 mt-8">
                        {item.variants.map((vUrl, vIdx) => (
                            <div
                                key={vIdx}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedVariant(vIdx);
                                }}
                                className={`rounded-full cursor-pointer ${selectedVariant === vIdx
                                    ? 'border-primary'
                                    : 'border-gray'
                                    }`}
                            >
                                <Image
                                    width="25px"
                                    height="25px"
                                    src={vUrl}
                                    alt="click"
                                    className="flex object-cover rounded-full p-3"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
});


ProductDealCard.displayName = 'ProductDealCard';

const ProductSliderSection = memo(
    ({ products, onProductClick, scrollRef }) => {

        return (
            <div
                ref={scrollRef}
                style={{
                    scrollBehavior: 'smooth',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    gap: '18px'
                }}
                className="flex overflow-auto mt-25"
            >
                {products?.map((item) => (
                    <ProductDealCard
                        key={item.id}
                        item={item}
                        onClick={() => onProductClick?.(item)}
                    />
                ))}
            </div>
        );
    }
);

ProductSliderSection.displayName = 'ProductSliderSection';


const ProductSection = () => {
    const navigate = useNavigate();
    const sliderRefs = useRef([]);
    const handleProductClick = useCallback(
        (item) => {
            navigate(`/product/${item.id}`, {
                state: {
                    product: item
                }
            });
        },
        [navigate]
    );

    const handleScroll = useCallback(
        (idx, direction) => {
            const slider = sliderRefs.current[idx];
            if (!slider) return;
            const scrollAmount =
                direction === 'left'
                    ? -260
                    : 260;
            slider.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        },
        []
    );

    return (
        <Container style={{ background: 'var(--forth)' }}>
            <div className="w-full py-40">
                <style>{`
                    .product-card .product-btn {
                        opacity: 0;
                        visibility: hidden;
                        transform: translateY(10px);
                        transition:
                            opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                            transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                            visibility 0.3s;
                    }
                    .product-card:hover .product-btn {
                        opacity: 1;
                        visibility: visible;
                        transform: translateY(0);
                    }
                    .product-card img {
                        transition: transform 0.5s ease;
                    }
                    .product-card:hover img {
                        transform: scale(1.04);
                    }
                `}</style>

                {featureSections.map((sectionId, idx) => (
                    <div key={sectionId} className='mb-30'>
                        <div className="flex items-center justify-between">
                            <Heading
                                version="v2"
                                tag=""
                                title="Featured Products"
                            />
                            <div className="flex items-center gap-8">
                                <Button
                                    aria-label="Previous Products"
                                    icon="ChevronLeft"
                                    version="icon"
                                    variant="outline"
                                    border="tertiary"
                                    bg="transparent"
                                    color="gray"
                                    className="rounded-30"
                                    onClick={() =>
                                        handleScroll(idx, 'left')
                                    }
                                />
                                <Button
                                    aria-label="Next Products"
                                    icon="ChevronRight"
                                    version="icon"
                                    variant="outline"
                                    border="tertiary"
                                    bg="transparent"
                                    color="gray"
                                    className="rounded-30"
                                    onClick={() =>
                                        handleScroll(idx, 'right')
                                    }
                                />
                            </div>
                        </div>
                        <ProductSliderSection
                            products={DEAL_PRODUCTS}
                            onProductClick={handleProductClick}
                            scrollRef={(el) => {
                                sliderRefs.current[idx] = el;
                            }}
                        />
                    </div>
                ))}
            </div>
        </Container>
    );
};


export default React.memo(ProductSection);