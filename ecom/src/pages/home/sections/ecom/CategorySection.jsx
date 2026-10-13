import React, { memo, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import Icon from '../../../../components/common/Icon';
import Image from '../../../../components/common/Image';

import { resolveImagePath } from '../../../../utils/imageResolver';
import { categories } from '../../../../utils/apiData';

const CATEGORY_IMAGES = [
    '/products/spaces/auto_interior.webp',
    '/products/spaces/office_corridor.webp',
    '/products/spaces/living_room.webp',
];

const CategoryCard = memo(({ cat, index, onClick }) => {
    const isMiddle = index === 1;
    const badgeNumber = cat.badgeNumber || (isMiddle ? '20+' : null);
    const badgeText = cat.badgeText || (isMiddle ? 'Years of Manufacturing' : null);
    const imgSrc = CATEGORY_IMAGES[index] || resolveImagePath(cat.image || cat.icon);

    return (
        <div
            className="feature-category-card overflow-hidden h-450 rounded-10 relative"
            onClick={onClick}
        >
            <Image
                src={imgSrc}
                alt={cat.name || cat.title}
                className="card-bg-img w-full h-full object-cover filter-b6 flex"
                loading={index === 0 ? 'eager' : 'lazy'}
            />

            {badgeNumber && (
                <div
                    className="absolute top-0 left-0 m-18 z-10"
                >
                    <div className='bg-primary rounded-5 p-14'>
                        <h5 className='large-text font-600 text-white'>
                            {badgeNumber}
                        </h5>
                        <p
                            className="font-500 text-white small-text"
                        >
                            {badgeText}
                        </p>
                    </div>
                </div>
            )}

            <div className="absolute bottom-0 left-0 z-10 w-full">
                <div className='bordh m-20 pt-16'>
                    <h3
                        className="font-600 text-white title-text uppercase line-clamp1"
                    >
                        {cat.name || cat.title}
                    </h3>

                    <p className='para-text uppercase text-white font-500 read-more-link flex items-center gap-6 mt-5'>
                        Read More
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

    const handleCategoryClick = useCallback(
        (cat) => {
            const query = typeof cat === 'object' ? cat.name || cat.title || cat.id : cat;
            const catId = typeof cat === 'object' ? cat.id : undefined;
            navigate(`/product?category=${encodeURIComponent(query)}`, {
                state: { categoryId: catId ? String(catId) : undefined, categoryName: query },
            });
        },
        [navigate]
    );

    const displayCategories = useMemo(() => (categories || []).slice(0, 3), []);

    return (
        <div className="w-full py-40">
            <style>{`
                .feature-category-card .card-bg-img {
                    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .feature-category-card:hover .card-bg-img {
                    transform: scale(1.08);
                }
            `}</style>

            <div className="grid-cols-3 sm-grid-cols-1 gap-12">
                {displayCategories.map((cat, index) => (
                    <CategoryCard
                        key={cat.id || index}
                        cat={cat}
                        index={index}
                        onClick={() => handleCategoryClick(cat)}
                    />
                ))}
            </div>
        </div>
    );
});

CategorySection.displayName = 'CategorySection';

export default CategorySection;
