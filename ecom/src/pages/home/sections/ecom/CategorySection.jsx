import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '../../../../components/common/Container';
import Icon from '../../../../components/common/Icon';
import Image from '../../../../components/common/Image';
import Heading from '../../../../components/layout/generic/Heading';

import { configData } from '../../../../utils/apiData';
import { resolveImagePath } from '../../../../utils/imageResolver';
import categoryData from '../../../../data/category.json';

const CategoryVersion1 = React.memo(({ items, onCategoryClick }) => (
    <div className="grid-cols-4 sm-grid-cols-2 mt-30 border-ec">
        {items.map((item, index) => {
            const isLastInRow = (index + 1) % 4 === 0;
            const isTopRow = index < 4;
            return (
                <div
                    key={item.id}
                    onClick={() => onCategoryClick(item)}
                    style={{
                        borderRight: isLastInRow ? 'none' : '1px solid #EBEBEB',
                        borderBottom: isTopRow ? '1px solid #EBEBEB' : 'none'
                    }}
                    className="p-25 sm-p-14 grid-cols-1 cursor-pointer hover:bg-forth transition"
                >
                    <Image
                        src={resolveImagePath(item.icon || item.image)}
                        alt={item.name || item.title}
                        width="100px"
                        height="100px"
                        className="rounded-full object-cover flex mx-auto"
                    />
                    <p className="small-text text-center text-dark font-600 mt-16">
                        {item.name || item.title}
                    </p>
                    <p className="mini-text text-center text-gray mt-6 line-clamp2">
                        {item.description}
                    </p>
                </div>
            );
        })}
    </div>
));

const CategoryVersion2 = React.memo(({ items, onCategoryClick }) => (
    <div className="grid-cols-4 sm-grid-cols-2 mt-30 gap-16">
        {items?.slice(0, 8)?.map((cat, idx) => (
            <div
                key={cat.id}
                className="px-16 py-20 border-ec rounded-10 cursor-pointer text-center hover:shadow transition"
                onClick={() => onCategoryClick(cat)}
            >
                <div className="relative">
                    <Image
                        src={resolveImagePath(cat.icon || cat.image)}
                        alt={cat.name || cat.title}
                        width="110"
                        height="110"
                        loading={idx < 4 ? "eager" : "lazy"}
                        fetchPriority={idx < 4 ? "high" : undefined}
                        className="flex object-cover rounded-full mx-auto"
                    />
                </div>
                <p className="text-dark font-600 small-text text-center mt-16">
                    {cat.name || cat.title}
                </p>
                <p className="mini-text text-gray line-clamp2 mt-6">
                    {cat.description}
                </p>
            </div>
        ))}
    </div>
));

const CategoryVersion3 = React.memo(({ items, onCategoryClick }) => (
    <>
        <style>{`
            .category-card {
                transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .category-card:hover {
                transform: translateY(-2px);
            }
            .card-image-right {
                clip-path: polygon(18% 0, 100% 0, 100% 100%, 0% 100%);
                transition: clip-path 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .category-card:hover .card-image-right {
                clip-path: polygon(10% 0, 100% 0, 100% 100%, 0% 100%);
            }
        `}</style>
        <div className="grid-cols-3 sm-grid-cols-1 mt-30" style={{ gap: '20px' }}>
            {items?.slice(0, 3)?.map((cat) => (
                <div
                    key={cat.id}
                    className="category-card bg-forth rounded-5 overflow-hidden flex cursor-pointer relative"
                    onClick={() => onCategoryClick(cat)}
                >
                    <div className="w-50 sm-w-60 p-20">
                        <div>
                            <div
                                className="icon-lg rounded-5"
                                style={{ backgroundColor: cat.bgColor, color: cat.accentColor }}
                            >
                                <Icon name={cat.iconName} width="22" height="22" stroke={cat.accentColor} />
                            </div>
                            <h3 className="mid-text text-dark font-600 pt-8">{cat.name || cat.title}</h3>
                            <p className="text-gray mini-text line-clamp3 mt-4">
                                {cat.description}
                            </p>
                        </div>
                        <p className="mini-text font-500 mt-6 flex items-center gap-4" style={{ color: cat.accentColor }}>
                            Explore Products <Icon name="ArrowRight" width="13" height="13" stroke="currentColor" />
                        </p>
                    </div>

                    <div className="card-image-right w-50 sm-w-40 relative overflow-hidden rounded-5 h-200">
                        <Image
                            src={resolveImagePath(cat.icon || cat.image)}
                            alt={cat.name || cat.title}
                            className="card-image-element w-full h-full object-cover flex"
                            loading="lazy"
                        />
                        <div
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                width: '60px',
                                height: '60px',
                                background: cat.accentColor,
                                clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                                opacity: 0.85,
                                zIndex: 2
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    </>
));

const VERSION_COMPONENTS = {
    1: CategoryVersion1,
    2: CategoryVersion2,
    3: CategoryVersion3
};

const CategorySection = React.memo(() => {
    const navigate = useNavigate();
    const categoryVersion = configData?.Category?.[0]?.CategoryVersion ?? 1;

    const handleCategoryClick = useCallback((cat) => {
        const query = typeof cat === 'object' ? (cat.name || cat.title || cat.id) : cat;
        navigate(`/product?category=${encodeURIComponent(query)}`);
    }, [navigate]);

    const ActiveVersionComponent = VERSION_COMPONENTS[categoryVersion] || CategoryVersion1;

    return (
        <div className="w-full py-50">
            <Heading
                version="v1"
                tag="HEALTHCARE & MEDICAL SUPPLIES"
                title="Certified Medical Equipment, Surgical Holloware & Industrial First Aid Solutions"
            />
            <ActiveVersionComponent items={categoryData} onCategoryClick={handleCategoryClick} />
        </div>
    );
});

export default CategorySection;
