import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '../../../../components/common/Container';
import Icon from '../../../../components/common/Icon';
import Image from '../../../../components/common/Image';
import Heading from '../../../../components/layout/generic/Heading';

import { configData, categories } from '../../../../utils/apiData';
import { resolveImagePath } from '../../../../utils/imageResolver';

const CategoryVersion1 = React.memo(({ items, onCategoryClick }) => (
    <div className="grid-cols-6 sm-grid-cols-1 mt-30">
        {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
                <div
                    key={item.id}
                    onClick={() => onCategoryClick(item)}
                    className="p-20 sm-p-16 grid-cols-1 cursor-pointer border-ec"
                >
                    <Image
                        src={resolveImagePath(item.image || item.icon)}
                        alt={item.title || item.name}
                        width="100"
                        height="100"
                        className="rounded-full object-cover flex mx-auto"
                    />
                    <h3 className="headmini-text text-dark font-500 text-center mt-12">
                        {item.title || item.name}
                    </h3>
                </div>
            );
        })}
    </div>
));

const CategoryVersion2 = React.memo(({ items, onCategoryClick }) => (
    <div className="grid-cols-6 sm-grid-cols-1 mt-30 gap-12">
        {items?.map((cat, idx) => (
            <div
                key={cat.id}
                className="p-20 border-ec rounded-5 cursor-pointer"
                onClick={() => onCategoryClick(cat)}
            >
                <div className="relative">
                    <Image
                        src={resolveImagePath(cat.icon || cat.image)}
                        alt={cat.name || cat.title}
                        width="100"
                        height="100"
                        loading={idx < 3 ? "eager" : "lazy"}
                        fetchPriority={idx < 3 ? "high" : undefined}
                        className="flex object-cover rounded-full mx-auto"
                    />
                </div>
                <h3 className="text-dark font-500 headmini-text text-center mt-12">
                    {cat.name || cat.title}
                </h3>
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
                    <div className="w-55 sm-w-60 p-20">
                        <div>
                            <div
                                className="icon-lg rounded-5"
                                style={{ backgroundColor: cat.bgColor, color: cat.accentColor }}
                            >
                                <Icon name={cat.iconName || 'Grid'} width="22" height="22" stroke={cat.accentColor} />
                            </div>
                            <h3 className="mid-text text-dark font-600 pt-8">{cat.name || cat.title}</h3>
                            <p className="text-gray mini-text line-clamp3 mt-4">
                                {cat.description}
                            </p>
                        </div>
                        <p className="mini-text font-500 mt-12 flex items-center gap-4" style={{ color: cat.accentColor }}>
                            Explore Products <Icon name="ArrowRight" width="13" height="13" stroke="currentColor" />
                        </p>
                    </div>

                    <div className="card-image-right w-45 sm-w-40 relative overflow-hidden rounded-5 h-full">
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
        <Container>
            <div className="w-full py-60 bordb">
                <Heading
                    version="v1"
                    tag="WHAT WE PROVIDE"
                    title="Expert Innovative And Deliver Exceptional For NOT Solution Now."
                />
                <ActiveVersionComponent items={categories} onCategoryClick={handleCategoryClick} />
            </div>
        </Container>
    );
});

export default CategorySection;
