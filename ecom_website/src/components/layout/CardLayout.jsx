import React from 'react';
import Button from '../common/Button';
import Image from '../common/Image';

const CardLayout = ({
    items,
    renderItem,
    cardType, // "product" | "business" | "article"
    imageMap,
    imageHeight,
    onCardClick,
    onButtonClick,
    cols = '4',
    mdCols = '2',
    smCols = '1',
    gap = '12',
    className = '',
    children,
    ...props
}) => {
    const combinedClassName = `grid-cols-${cols} md-grid-cols-${mdCols} sm-grid-cols-${smCols} gap-${gap} ${className}`.trim();

    const renderDefaultCard = (item, index) => {
        if (cardType === 'product') {
            const imgSrc = (imageMap && imageMap[item.id]) || item.image;
            return (
                <div
                    key={item.id || index}
                    className="bg-white border-ec rounded-10 p-12 cursor-pointer transition-all flex flex-column justify-between"
                    onClick={() => onCardClick && onCardClick(item)}
                >
                    <div>
                        {/* Product Image Container */}
                        <div className="overflow-hidden rounded-5">
                            <Image
                                src={imgSrc}
                                alt={item.name}
                                loading="lazy"
                                className={`w-full object-cover flex ${imageHeight || 'h-200'}`}
                            />
                        </div>

                        {/* Product Metadata */}
                        <div className="mt-8">
                            <h3
                                className="text-dark font-600 line-clamp1"
                                style={{
                                    fontSize: '1.05rem',
                                    color: '#0f172a',
                                    marginBottom: '4px',
                                }}
                            >
                                {item.name}
                            </h3>
                            <p
                                className="text-gray mini-text"
                                style={{ color: '#64748b', fontSize: '0.85rem' }}
                            >
                                {item.subtitle || item.listings || 'Starting from'}
                            </p>
                            {(item.priceDisplay || item.price) && (
                                <p
                                    className="text-dark font-600 mt-4"
                                    style={{
                                        color: '#0f172a',
                                        fontSize: '1rem',
                                        fontWeight: '700',
                                        marginTop: '4px',
                                    }}
                                >
                                    {item.priceDisplay || `₹ ${item.price} / Piece`}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Blue View Products Button at Bottom */}
                    <div className="mt-16">
                        <Button
                            text="View Products"
                            bg="primary"
                            version="v3"
                            className="w-full font-500 py-10"
                            style={{
                                backgroundColor: '#2563eb',
                                color: '#ffffff',
                                borderRadius: '8px',
                                fontWeight: '500',
                                fontSize: '0.95rem',
                                padding: '10px 0',
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (onButtonClick) {
                                    onButtonClick(item);
                                } else if (onCardClick) {
                                    onCardClick(item);
                                }
                            }}
                        />
                    </div>
                </div>
            );
        }

        if (cardType === 'business') {
            return (
                <div
                    key={item.id || index}
                    className="bg-white border-ec rounded-5 overflow-hidden p-10 cursor-pointer flex flex-column justify-between"
                    onClick={() => onCardClick && onCardClick(item)}
                >
                    <div>
                        <div className="relative rounded-5 overflow-hidden">
                            <Image
                                src={item.image}
                                alt={item.name}
                                loading="lazy"
                                className={`w-full object-cover rounded-5 flex ${imageHeight || 'h-150'}`}
                            />
                            {item.logo && (
                                <div className="absolute bottom-0 left-0 mb-15 ml-10 border-white flex items-center justify-center rounded-full icon-lg bg-primary z-10">
                                    <p className="text-white font-600 mini-text">{item.logo}</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-5">
                            <h3 className="text-dark font-600 mid-text">{item.name}</h3>
                            <p className="text-gray mini-text mb-8">{item.category}</p>

                            {/* Rating Row */}
                            <div className="flex items-center gap-6 mb-8">
                                <p className="text-white font-600 mini-text px-6 py-2 rounded-3 bg-success">
                                    ★ {item.rating}
                                </p>
                                <p className="text-gray mini-text">({item.reviews} Reviews)</p>
                            </div>

                            <p className="mini-text text-gray">📍 {item.location}</p>
                        </div>
                    </div>

                    <Button
                        text="Call Now"
                        bg="primary"
                        version="v3"
                        className="w-full cursor-pointer font-600 mt-8"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onButtonClick) {
                                onButtonClick(item);
                            } else if (onCardClick) {
                                onCardClick(item);
                            }
                        }}
                    />
                </div>
            );
        }

        if (cardType === 'article') {
            return (
                <article
                    key={item.id || index}
                    className="bg-white rounded-5 overflow-hidden cursor-pointer flex flex-column justify-between"
                    onClick={() => onCardClick && onCardClick(item)}
                >
                    <div>
                        {/* Image box */}
                        <div className="overflow-hidden relative">
                            <Image
                                src={item.image}
                                alt={item.title}
                                loading="lazy"
                                className={`w-full object-cover ${imageHeight || 'h-200'}`}
                            />
                        </div>

                        {/* Details */}
                        <div className="p-10">
                            {item.tag && (
                                <p className="px-12 py-5 rounded-5 font-600 mini-text mb-10 w-max bg-light-primary text-primary">
                                    {item.tag}
                                </p>
                            )}

                            <h3 className="text-dark font-600 mid-text line-clamp1">
                                {item.title}
                            </h3>
                            <p className="text-primary font-500 mini-text mt-3">
                                {item.date} • {item.readTime}
                            </p>
                            <p className="text-gray small-text line-clamp2 mt-7">
                                {item.description}
                            </p>
                        </div>
                    </div>
                </article>
            );
        }

        return null;
    };

    return (
        <div className={combinedClassName} {...props}>
            {items && (renderItem || cardType)
                ? items.map((item, index) => (renderItem ? renderItem(item, index) : renderDefaultCard(item, index)))
                : children}
        </div>
    );
};

export default CardLayout;