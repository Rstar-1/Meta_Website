import React, { useState, useMemo, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Button from '../../../components/common/Button';
import Fields from '../../../components/forms/Fields';
import products from '../../../data/product.json';

// ─── Static Configuration Constants ───────────────────────────────────

const SORT_OPTIONS = [
    { label: 'Featured', value: 'featured' },
    { label: 'Price: Low to High', value: 'price-low' },
    { label: 'Price: High to Low', value: 'price-high' },
    { label: 'Newest Arrivals', value: 'newest' }
];

const AVAILABILITY_OPTIONS = [
    { label: 'In Stock', value: 'in-stock' },
    { label: 'Out of Stock', value: 'out-of-stock' }
];

const COLOR_FILTERS = [
    { name: 'Blue', color: '#60A5FA', count: 3 },
    { name: 'Brown', color: '#9A3412', count: 1 },
    { name: 'Charcoal', color: '#374151', count: 2 },
    { name: 'Chocolate', color: '#451A03', count: 4 },
    { name: 'Grey', color: '#D1D5DB', count: 2 },
    { name: 'Light Beige', color: '#F3E8FF', count: 3 },
    { name: 'Olive', color: '#365314', count: 3 },
    { name: 'Red', color: '#DC2626', count: 1 },
    { name: 'Soft Green', color: '#86EFAC', count: 3 },
    { name: 'Yellow', color: '#FDE047', count: 2 }
];

// ─── Section-wise Subcomponents (Memoized) ─────────────────────────────

const FilterTopBar = memo(({
    isFilterVisible,
    totalCount,
    compareEnabled,
    sortBy,
    onToggleFilter,
    onCompareChange,
    onSortChange
}) => (
    <div className="flex sm-grid-cols-1 items-center w-full gap-12 justify-between">
        <div className="flex items-center gap-12">
            <Button
                onClick={onToggleFilter}
                icon="Filter"
                text="Filter By"
                iconWidth="11"
                iconHeight="11"
                version="v2"
                variant={isFilterVisible ? 'primary' : 'outline'}
                color={isFilterVisible ? 'white' : 'dark'}
                bg={isFilterVisible ? 'dark' : 'tertiary'}
                className="rounded-30 font-500"
            />
            <p className="small-text text-gray font-500">{totalCount} Products</p>
        </div>

        <div className="flex items-center gap-12">
            <div className="flex items-center gap-8">
                <p className="small-text font-500 text-dark">Compare:</p>
                <Fields
                    type="switch"
                    value={compareEnabled}
                    onChange={onCompareChange}
                />
            </div>

            <div className="flex items-center gap-8">
                <p className="small-text font-500 text-dark">Sort by:</p>
                <div style={{ width: '170px' }}>
                    <Fields
                        type="select"
                        version="v2"
                        value={sortBy}
                        onChange={onSortChange}
                        options={SORT_OPTIONS}
                    />
                </div>
            </div>
        </div>
    </div>
));

FilterTopBar.displayName = 'FilterTopBar';

const FilterSidebar = memo(({
    availability,
    onAvailabilityChange,
    priceMax,
    onPriceChange,
    selectedColors,
    onToggleColor
}) => (
    <div className="w-20 sm-w-full">
        <div className="pr-15">
            <div className="bordb pb-20">
                <Fields
                    type="slider"
                    min={0}
                    max={100000}
                    step={1000}
                    value={priceMax}
                    onChange={onPriceChange}
                />
            </div>

            <div className="bordb py-20">
                <h4 className="headmini-text font-500 text-dark mb-12">Availability</h4>
                <div className="grid-cols-1 gap-10">
                    <Fields
                        type="checkbox"
                        options={AVAILABILITY_OPTIONS}
                        position="y"
                        value={availability}
                        onChange={onAvailabilityChange}
                    />
                </div>
            </div>

            <div className="bordb py-20">
                <h4 className="headmini-text font-500 text-dark mb-12">Color</h4>
                <div className="flex flex-column gap-10">
                    {COLOR_FILTERS.map((c) => {
                        const isSelected = selectedColors.includes(c.name);
                        return (
                            <div
                                key={c.name}
                                onClick={() => onToggleColor(c.name)}
                                className="flex items-center justify-between cursor-pointer"
                            >
                                <div className="flex items-center gap-8">
                                    <span
                                        style={{
                                            width: '16px',
                                            height: '16px',
                                            borderRadius: '3px',
                                            backgroundColor: c.color,
                                            outline: isSelected ? '2px solid #0F172A' : '1px solid rgba(0,0,0,0.15)',
                                            outlineOffset: '1px'
                                        }}
                                    />
                                    <p className={`small-text ${isSelected ? 'font-600 text-dark' : 'font-400 text-gray'}`}>
                                        {c.name}
                                    </p>
                                </div>
                                <p className="mini-text text-gray">{c.count}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    </div>
));

FilterSidebar.displayName = 'FilterSidebar';

const ProductCard = memo(({ item, onProductClick }) => {
    if (item.isBanner) {
        return (
            <div className="overflow-hidden rounded-10 relative h-350 sm-h-250">
                <Image
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover flex filter-b4"
                />
                <div className="absolute bottom-0 left-0 px-16 py-20">
                    <p className="text-primary font-500 small-text">{item.subtitle}</p>
                    <h3 className="text-white font-600 title-text mt-4">{item.title}</h3>
                </div>
            </div>
        );
    }

    const price = typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : (item.priceFormatted || `$${item.price || 0}`);
    const originalPrice = item.originalPrice ? (typeof item.originalPrice === 'number' ? `$${item.originalPrice.toFixed(2)}` : (item.originalPriceFormatted || `$${item.originalPrice}`)) : null;

    return (
        <div
            onClick={() => onProductClick(item)}
            className="cursor-pointer"
        >
            <div className="h-300 sm-h-150 rounded-10 overflow-hidden transition-transform duration-200 group-hover:-translate-y-1">
                <Image
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full flex object-cover"
                />
            </div>
            <div className="mt-6">
                <p className="font-500 mini-text text-gray uppercase">{item.category}</p>
                <h4 className="font-600 mid-text text-dark line-clamp1 uppercase mt-2">{item.name}</h4>
                <div className="flex items-center gap-6 mt-4">
                    <p className="font-600 mini-text" style={{ color: item.originalPrice ? '#C8281E' : '#0F172A' }}>
                        {price}
                    </p>
                    {originalPrice && (
                        <span className="font-500 mini-text text-gray line-through">
                            {originalPrice}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
});

ProductCard.displayName = 'ProductCard';

const ProductGrid = memo(({ productsList, onProductClick }) => (
    <div className="grid-cols-4 sm-grid-cols-2 gap-12">
        {productsList.map((item) => (
            <ProductCard
                key={item.id}
                item={item}
                onProductClick={onProductClick}
            />
        ))}
    </div>
));

ProductGrid.displayName = 'ProductGrid';

// ─── Main Section Component ───────────────────────────────────────────

const FilterSection = () => {
    const navigate = useNavigate();
    const [compareEnabled, setCompareEnabled] = useState(false);
    const [sortBy, setSortBy] = useState('featured');
    const [priceMax, setPriceMax] = useState(100000);
    const [selectedColors, setSelectedColors] = useState([]);
    const [availability, setAvailability] = useState([]);
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const handleToggleFilter = useCallback(() => {
        setIsFilterVisible((prev) => !prev);
    }, []);

    const handleCompareToggle = useCallback((val) => {
        setCompareEnabled(val);
    }, []);

    const handleSortChange = useCallback((val) => {
        setSortBy(val);
    }, []);

    const handleAvailabilityChange = useCallback((val) => {
        setAvailability(Array.isArray(val) ? val : []);
    }, []);

    const handlePriceChange = useCallback((val) => {
        setPriceMax(Number(val) || 0);
    }, []);

    const handleToggleColor = useCallback((name) => {
        setSelectedColors((prev) =>
            prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
        );
    }, []);

    const handleProductClick = useCallback((item) => {
        navigate(`/product/${item.id}`, { state: { product: item } });
    }, [navigate]);

    const filteredProducts = useMemo(() => {
        return products
            .filter((item) => {
                if (item.isBanner) return true;

                // Availability Filter logic
                if (availability.length === 1) {
                    if (availability.includes('in-stock') && !item.inStock) return false;
                    if (availability.includes('out-of-stock') && item.inStock) return false;
                }

                // Price Filter
                if (typeof item.price === 'number' && item.price > priceMax) return false;

                // Color Filter
                if (selectedColors.length > 0) {
                    const hasColor = item.colors?.some((c) =>
                        selectedColors.some(
                            (sc) => sc.toLowerCase() === c.toLowerCase() || c.toLowerCase().includes(sc.toLowerCase())
                        )
                    );
                    if (!hasColor) return false;
                }
                return true;
            })
            .sort((a, b) => {
                if (a.isBanner || b.isBanner) return 0;
                if (sortBy === 'price-low') return (a.price || 0) - (b.price || 0);
                if (sortBy === 'price-high') return (b.price || 0) - (a.price || 0);
                if (sortBy === 'newest') return (b.id || 0) - (a.id || 0);
                return 0;
            });
    }, [availability, priceMax, selectedColors, sortBy]);

    const totalProductCount = useMemo(
        () => filteredProducts.filter((p) => !p.isBanner).length,
        [filteredProducts]
    );

    return (
        <Container>
            <div className="w-full py-40">
                <FilterTopBar
                    isFilterVisible={isFilterVisible}
                    totalCount={totalProductCount}
                    compareEnabled={compareEnabled}
                    sortBy={sortBy}
                    onToggleFilter={handleToggleFilter}
                    onCompareChange={handleCompareToggle}
                    onSortChange={handleSortChange}
                />

                <div className="mt-30 flex sm-grid-cols-1 items-start gap-12">
                    {isFilterVisible && (
                        <FilterSidebar
                            availability={availability}
                            onAvailabilityChange={handleAvailabilityChange}
                            priceMax={priceMax}
                            onPriceChange={handlePriceChange}
                            selectedColors={selectedColors}
                            onToggleColor={handleToggleColor}
                        />
                    )}

                    <div className={isFilterVisible ? 'w-80 sm-w-full' : 'w-full'}>
                        <ProductGrid
                            productsList={filteredProducts}
                            onProductClick={handleProductClick}
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default memo(FilterSection);