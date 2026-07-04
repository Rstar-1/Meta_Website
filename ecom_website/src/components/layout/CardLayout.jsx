import React from 'react';
import Button from '../common/Button';
import Image from '../common/Image';
import Icon from '../common/Icon';
import { addToCart } from '../../utils/cartHelper';

const CardLayout = ({
    items,
    renderItem,
    cardType, // "product" | "business" | "article" | "city"
    imageMap,
    imageHeight,
    onCardClick,
    onButtonClick,
    onAddToCart,
    showAddToCart = true,
    showViewProducts = true,
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
                                loading={index < 2 ? "eager" : "lazy"}
                                fetchPriority={index < 2 ? "high" : undefined}
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
                            {item.supplier && (
                                <p
                                    className="text-gray mini-text mt-4 font-500"
                                    style={{
                                        color: '#64748b',
                                        fontSize: '0.8rem',
                                        marginTop: '4px',
                                    }}
                                >
                                    Supplier: <span style={{ color: '#2563eb' }}>{item.supplier}</span>
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons at Bottom */}
                    <div className="flex gap-10 mt-16 w-full">
                        {showAddToCart && (
                            <Button
                                text="Add to Cart"
                                variant="outline"
                                bg="primary"
                                version="v3"
                                icon="Cart"
                                className={showViewProducts ? "flex-1" : "w-full"}
                                style={{
                                    borderColor: '#2563eb',
                                    color: '#2563eb',
                                    borderRadius: '8px',
                                    fontWeight: '500',
                                    fontSize: '0.95rem',
                                    padding: '10px 0',
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (onAddToCart) {
                                        onAddToCart(item);
                                    } else {
                                        addToCart(item);
                                        alert(`${item.name} added to cart!`);
                                    }
                                }}
                            />
                        )}
                        {showViewProducts && (
                            <Button
                                text="View Products"
                                bg="primary"
                                variant="filled"
                                version="v3"
                                className={showAddToCart ? "flex-1" : "w-full"}
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
                        )}
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
                                loading={index < 2 ? "eager" : "lazy"}
                                fetchPriority={index < 2 ? "high" : undefined}
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
                                loading={index < 2 ? "eager" : "lazy"}
                                fetchPriority={index < 2 ? "high" : undefined}
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

        if (cardType === 'city') {
            const paddedIndex = String(index + 1).padStart(2, '0');
            return (
                <div
                    key={item.id || index}
                    className="city-card relative overflow-hidden rounded-10 cursor-pointer h-350 flex items-end"
                    style={{
                        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.75) 100%), url(${item.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                    onClick={() => onCardClick && onCardClick(item)}
                >
                    <div className="bg-white icon-lg rounded-full absolute top-0 left-0 m-12">
                        <p className="text-primary small-text font-600">{paddedIndex}</p>
                    </div>

                    <div className="relative w-full">
                        <div className="p-20">
                            <div className="flex items-center gap-8 mb-6">
                                <Icon name="MapPin" width="14" height="14" strokeWidth="2.5" className="text-white" />
                                <h4 className="mid-text text-white font-600">{item.name}</h4>
                            </div>

                            {/* Stats List */}
                            <div className="grid-cols-1 gap-6 mb-16">
                                <div className="flex items-center gap-8 text-white opacity-95">
                                    <Icon name="Building" width="14" height="14" strokeWidth="2.5" className="text-white" />
                                    <span className="small-text font-400">{item.businesses}</span>
                                </div>
                                <div className="flex items-center gap-8 text-white opacity-95">
                                    <Icon name="Grid" width="14" height="14" strokeWidth="2.5" className="text-white" />
                                    <span className="small-text font-400">{item.categories}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between w-full">
                                {/* Dynamic Tag Badge */}
                                {item.tag ? (
                                    <div
                                        className="px-12 py-5 rounded-20 w-max flex items-center gap-6"
                                        style={{
                                            backgroundColor: item.tagType === 'most-searched' ? '#eab308' : '#22c55e',
                                            color: item.tagType === 'most-searched' ? '#000000' : '#ffffff',
                                        }}
                                    >
                                        {item.tagType === 'most-searched' ? (
                                            <Icon name="Star" width="12" height="12" fill="currentColor" stroke="none" className="flex" />
                                        ) : (
                                            <Icon name="Trending" width="12" height="12" stroke="currentColor" strokeWidth="3" className="flex" />
                                        )}
                                        <span className="mini-text font-600 uppercase tracking-wider">
                                            {item.tag}
                                        </span>
                                    </div>
                                ) : null}

                                {/* Circular Right Action Button */}
                                <div className="icon-lg bg-white rounded-full">
                                    <Icon name="ArrowRight" width="16" height="16" stroke="var(--primary)" strokeWidth="3.5" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <>
            <style>{`
                .city-card {
                    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .city-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                }
                .city-card:hover .city-img {
                    transform: scale(1.08);
                }
                .city-card:hover .icon-lg {
                    background-color: var(--primary) !important;
                }
                .city-card:hover .icon-lg svg {
                    stroke: #ffffff !important;
                }
            `}</style>

            <div className={combinedClassName} {...props}>
                {items && (renderItem || cardType)
                    ? items.map((item, index) => (renderItem ? renderItem(item, index) : renderDefaultCard(item, index)))
                    : children}
            </div>
        </>
    );
};

export default CardLayout;