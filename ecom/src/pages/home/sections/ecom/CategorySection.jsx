import React, { memo, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import Icon from '../../../../components/common/Icon';
import Image from '../../../../components/common/Image';
import { resolveImagePath } from '../../../../utils/imageResolver';
import { categories } from '../../../../utils/apiData';

const FEATURED_CATEGORY_ITEMS = [
    {
        id: 1,
        name: 'Dilour Carpets',
        title: 'Dilour Carpets',
        subtitle: 'Needle-Punch Non-Woven Automotive Velour & Trunk Linings',
        badgeNumber: '30%',
        badgeText: 'Automotive Grade',
        tag: 'Acoustic Damping',
        image: '/products/spaces/auto_interior.webp',
        categoryParam: 'Dilour Carpets'
    },
    {
        id: 2,
        name: 'Ribs Carpets',
        title: 'Ribs Carpets',
        subtitle: 'Directional Grooved Anti-Slip High-Traffic Commercial Flooring',
        badgeNumber: '20+',
        badgeText: 'Years of Manufacturing',
        tag: 'High Traffic',
        image: '/products/spaces/office_corridor.webp',
        categoryParam: 'Ribs Carpets'
    },
    {
        id: 3,
        name: 'New Poly Shrink Rugs',
        title: 'New Poly Shrink Rugs',
        subtitle: '1800 GSM Dimensional High-Low Textures & Self-Backing Stability',
        badgeNumber: '23+',
        badgeText: 'GSM Density',
        tag: '3D Embossed',
        image: '/products/spaces/living_room.webp',
        categoryParam: 'Rugs'
    },
    {
        id: 4,
        name: 'Shalimar Heritage Rugs',
        title: 'Shalimar Heritage Rugs',
        subtitle: 'Classic Floral & Geometric Polypropylene Designer Collections',
        badgeNumber: '30+',
        badgeText: 'Timeless Weaves',
        tag: 'Stain Resistant',
        image: '/products/spaces/dining_salon.webp',
        categoryParam: 'Rugs'
    },
    {
        id: 5,
        name: 'Acoustic Non-Woven Rolls',
        title: 'Acoustic Non-Woven Rolls',
        subtitle: 'Thermal & Sound Absorption Carpet Rolls for Studios & Venues',
        badgeNumber: '35+',
        badgeText: 'Sound Reduction',
        tag: 'Thermal Insulation',
        image: '/products/spaces/bedroom_retreat.webp',
        categoryParam: 'Dilour Carpets'
    }
];

const CategoryCard = memo(({ item, onClick }) => {
    const imgSrc = resolveImagePath(item.image);

    return (
        <div
            className="feature-category-card overflow-hidden h-450 sm-h-350 rounded-10 relative cursor-pointer group select-none"
            onClick={onClick}
            role="button"
            tabIndex={0}
        >
            <Image
                src={imgSrc}
                alt={item.name}
                className="card-bg-img w-full h-full object-cover filter-b5 flex"
                loading="lazy"
            />

            <div className="absolute top-0 left-0 p-12 z-10">
                {item.badgeNumber ? (
                    <div className="bg-primary rounded-5 p-10">
                        <h5 className="head-text font-600 text-white">
                            {item.badgeNumber}
                        </h5>
                        <p className="font-500 text-white mini-text">
                            {item.badgeText}
                        </p>
                    </div>
                ) : <div />}
            </div>

            <div className="absolute bottom-0 left-0 z-10 w-full">
                <div className="p-16">
                    <h3 className="font-600 text-white title-text uppercase line-clamp1 bordh pt-16">
                        {item.name}
                    </h3>

                    <p className="small-text uppercase text-white font-500 flex items-center gap-6 mt-4 text-muted">
                        Explore Category
                        <Icon name="ArrowRight" width="16" height="16" stroke="currentColor" />
                    </p>
                </div>
            </div>
        </div>
    );
});

CategoryCard.displayName = 'CategoryCard';

const CategorySection = memo(() => {
    const navigate = useNavigate();
    const [swiper, setSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleCategoryClick = useCallback(
        (cat) => {
            const query = typeof cat === 'object' ? cat.categoryParam || cat.name || cat.title || cat.id : cat;
            const catId = typeof cat === 'object' ? cat.id : undefined;
            navigate(`/product?category=${encodeURIComponent(query)}`, {
                state: { categoryId: catId ? String(catId) : undefined, categoryName: query },
            });
        },
        [navigate]
    );

    const categoryItems = useMemo(() => {
        // Fall back to categories if available, enriched with FEATURED_CATEGORY_ITEMS
        if (categories && categories.length > 0) {
            return FEATURED_CATEGORY_ITEMS;
        }
        return FEATURED_CATEGORY_ITEMS;
    }, []);

    const handlePrev = useCallback(() => swiper?.slidePrev(), [swiper]);
    const handleNext = useCallback(() => swiper?.slideNext(), [swiper]);

    return (
        <div className="w-full py-40">
            <style>{`
                .feature-category-card .card-bg-img {
                    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .feature-category-card:hover .card-bg-img {
                    transform: scale(1.08);
                }
                .category-swiper-bullet {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background-color: var(--gray, #94a3b8);
                    opacity: 0.4;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    border: none;
                    padding: 0;
                }
                .category-swiper-bullet.active {
                    width: 28px;
                    border-radius: 4px;
                    background-color: var(--primary, #0284c7);
                    opacity: 1;
                }
            `}</style>



            <Swiper
                onSwiper={setSwiper}
                onSlideChange={(s) => setActiveIndex(s.realIndex)}
                modules={[Autoplay]}
                slidesPerView={3}
                spaceBetween={20}
                loop={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                speed={650}
                breakpoints={{
                    320: {
                        slidesPerView: 1.15,
                        spaceBetween: 12,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 16,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                }}
                className="w-full pb-10"
            >
                {categoryItems.map((item, index) => (
                    <SwiperSlide key={item.id || index}>
                        <CategoryCard
                            item={item}
                            onClick={() => handleCategoryClick(item)}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Dot Indicators */}
            <div className="flex items-center justify-center gap-8 mt-20">
                {categoryItems.map((_, idx) => (
                    <button
                        key={idx}
                        type="button"
                        aria-label={`Slide ${idx + 1}`}
                        onClick={() => swiper?.slideToLoop(idx)}
                        className={`category-swiper-bullet ${idx === (activeIndex % categoryItems.length) ? 'active' : ''}`}
                    />
                ))}
            </div>
        </div>
    );
});

CategorySection.displayName = 'CategorySection';

export default CategorySection;
