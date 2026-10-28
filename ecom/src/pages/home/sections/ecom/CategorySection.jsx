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
        name: "Men's Rainwear",
        title: "Men's Rainwear",
        subtitle: "Heavy-Duty Biker Rainsuits, Double-Layer Storm Coats & Jackets",
        badgeNumber: "45+",
        badgeText: "Years of Excellence",
        tag: "100% Sealed Seams",
        image: "https://realrainwear.in/wp-content/uploads/2025/03/men-banner-02.jpg",
        categoryParam: "Men's Rainwear"
    },
    {
        id: 2,
        name: "Women's Rainwear",
        title: "Women's Rainwear",
        subtitle: "Elegant Trench Raincoats, Skirt Suits & Waterproof Hooded Coats",
        badgeNumber: "100%",
        badgeText: "Waterproof",
        tag: "Trench & Skirt Suits",
        image: "https://realrainwear.in/wp-content/uploads/2025/03/women-bann.jpg",
        categoryParam: "Women's Rainwear"
    },
    {
        id: 3,
        name: "Kids' Rainwear",
        title: "Kids' Rainwear",
        subtitle: "Vibrant School Raincoats with Backpack Space & Reflective Trims",
        badgeNumber: "Safety",
        badgeText: "Reflective Strips",
        tag: "School Bag Cover",
        image: "https://realrainwear.in/wp-content/uploads/2025/03/kid-bann.jpg",
        categoryParam: "Kids' Rainwear"
    },
    {
        id: 4,
        name: "Accessories & Ponchos",
        title: "Accessories & Ponchos",
        subtitle: "Waterproof Backpack Covers, Trekking Ponchos & Travel Gear",
        badgeNumber: "10,000",
        badgeText: "mm Hydrostatic",
        tag: "Trekking & Travel",
        image: "https://realrainwear.in/wp-content/uploads/2025/05/How-to-Choose-the-Best-Rain-Jacket-for-Travelers-1300x867.jpg",
        categoryParam: "Accessories & Ponchos"
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
        if (categories && categories.length > 0) {
            return categories.map((cat, idx) => {
                const feat = FEATURED_CATEGORY_ITEMS.find(f => f.id === cat.id || f.categoryParam === cat.name) || FEATURED_CATEGORY_ITEMS[idx] || {};
                return {
                    id: cat.id,
                    name: cat.name,
                    title: cat.name,
                    subtitle: cat.description || feat.subtitle,
                    badgeNumber: cat.badgeNumber || feat.badgeNumber,
                    badgeText: cat.badgeText || feat.badgeText,
                    tag: cat.tag || feat.tag,
                    image: cat.image || cat.bannerImage || feat.image,
                    categoryParam: cat.name
                };
            });
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
