import React from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';

import Button from '../../../components/common/Button';
import Fields from '../../../components/forms/Fields';
import ProductCard from '../../../components/layout/sections/CardLayout';
import { products, categories } from '../../../utils/apiData';

const SORT_OPTIONS = [
    { label: 'Trending', value: 'trending' },
    { label: 'Price: Low to High', value: 'price-low' },
    { label: 'Price: High to Low', value: 'price-high' },
];

const COLOR_NAMES_MAP = {
    '#38bdf8': 'Sky Blue',
    '#0284c7': 'Deep Blue',
    '#93c5fd': 'Light Blue',
    '#fbbf24': 'Amber Yellow',
    '#92400e': 'Bronze Brown',
    '#818cf8': 'Indigo',
    '#94a3b8': 'Silver Slate',
    '#cbd5e1': 'Light Slate',
    '#64748b': 'Steel Gray',
    '#1e293b': 'Dark Charcoal'
};

const FilterTopBar = React.memo(({
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
                <Fields type="switch" value={compareEnabled} onChange={onCompareChange} />
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

const FilterSidebar = React.memo(({
    availability,
    onAvailabilityChange,
    availabilityOptions,
    selectedCategories,
    onCategoryChange,
    categoryOptions,
    priceMax,
    maxPriceLimit,
    onPriceChange,
    selectedColors,
    colorFilters,
    onToggleColor
}) => (
    <div className="w-20 sm-w-full">
        <div className="pr-15">
            <div className="bordb pb-20">
                <h4 className="headmini-text font-500 text-dark mb-12">Price Range</h4>
                <Fields
                    type="slider"
                    min={0}
                    max={maxPriceLimit}
                    step={10}
                    value={priceMax}
                    onChange={onPriceChange}
                />
            </div>

            <div className="bordb py-20">
                <h4 className="headmini-text font-500 text-dark mb-12">Availability</h4>
                <Fields
                    type="checkbox"
                    options={availabilityOptions}
                    position="y"
                    value={availability}
                    onChange={onAvailabilityChange}
                />
            </div>

            <div className="bordb py-20">
                <h4 className="headmini-text font-500 text-dark mb-12">Category</h4>
                <Fields
                    type="checkbox"
                    options={categoryOptions}
                    position="y"
                    value={selectedCategories}
                    onChange={onCategoryChange}
                />
            </div>

            <div className="bordb py-20">
                <h4 className="headmini-text font-500 text-dark mb-12">Color</h4>
                <div className="flex flex-column gap-10">
                    {colorFilters.map((c) => {
                        const isSelected = selectedColors.includes(c.color);
                        return (
                            <div
                                key={c.color}
                                onClick={() => onToggleColor(c.color)}
                                className="flex items-center justify-between cursor-pointer"
                            >
                                <div className="flex items-center gap-8">
                                    <span
                                        style={{
                                            width: '16px',
                                            height: '16px',
                                            borderRadius: '10px',
                                            backgroundColor: c.color,
                                            outline: isSelected ? '1px solid var(--danger)' : '1px solid var(--white)',
                                            outlineOffset: '2px'
                                        }}
                                    />
                                    <p className={`small-text font-400 ${isSelected ? 'text-danger' : 'text-gray'}`}>
                                        {c.name}
                                    </p>
                                </div>
                                <p className={`mini-text font-400 ${isSelected ? 'text-danger' : 'text-gray'}`}>
                                    {c.count}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    </div>
));
FilterSidebar.displayName = 'FilterSidebar';

const ProductGrid = React.memo(({ productsList, isFilterVisible, onProductClick }) => (
    <div className={`${isFilterVisible ? 'grid-cols-4' : 'grid-cols-5'} sm-grid-cols-2 gap-12`}>
        {productsList.map((item) => (
            <ProductCard
                key={item.id}
                item={item}
                onProductClick={onProductClick}
                isFluid={true}
            />
        ))}
    </div>
));
ProductGrid.displayName = 'ProductGrid';

const FilterSection = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const location = useLocation();

    const maxPriceLimit = React.useMemo(() => {
        const maxVal = Math.max(
            ...products
                .filter((p) => !p.isBanner && typeof p.price === 'number')
                .map((p) => p.price),
            300
        );
        return Math.ceil(maxVal / 50) * 50;
    }, []);

    const [compareEnabled, setCompareEnabled] = React.useState(false);
    const [sortBy, setSortBy] = React.useState('trending');
    const [priceMax, setPriceMax] = React.useState(maxPriceLimit);
    const [selectedCategories, setSelectedCategories] = React.useState([]);
    const [selectedColors, setSelectedColors] = React.useState([]);
    const [availability, setAvailability] = React.useState([]);
    const [isFilterVisible, setIsFilterVisible] = React.useState(false);

    React.useEffect(() => {
        const catQuery =
            searchParams.get('category') ||
            searchParams.get('categoryId') ||
            location.state?.categoryId ||
            location.state?.categoryName ||
            location.state?.category;

        if (catQuery) {
            const matchedCategory = (categories || []).find((c) =>
                String(c.id).toLowerCase() === String(catQuery).toLowerCase() ||
                (c.name && c.name.toLowerCase() === String(catQuery).toLowerCase()) ||
                (c.title && c.title.toLowerCase() === String(catQuery).toLowerCase()) ||
                (c.slug && c.slug.toLowerCase() === String(catQuery).toLowerCase())
            );

            if (matchedCategory) {
                setSelectedCategories([String(matchedCategory.id)]);
            } else {
                setSelectedCategories([String(catQuery)]);
            }
            setIsFilterVisible(true);
        }
    }, [searchParams, location.state]);

    const categoryOptions = React.useMemo(() => {
        return (categories || []).map((cat) => {
            const count = products.filter(
                (p) => !p.isBanner && (String(p.categoryId) === String(cat.id) || p.category === cat.name || p.category === cat.title)
            ).length;
            return {
                label: `${cat.name || cat.title}${count ? ` (${count})` : ''}`,
                value: String(cat.id)
            };
        });
    }, []);

    const availabilityOptions = React.useMemo(() => {
        const inStockCount = products.filter((p) => !p.isBanner && p.inStock).length;
        const outOfStockCount = products.filter((p) => !p.isBanner && !p.inStock).length;
        return [
            { label: `In Stock (${inStockCount})`, value: 'in-stock' },
            { label: `Out of Stock (${outOfStockCount})`, value: 'out-of-stock' }
        ];
    }, []);

    const colorFilters = React.useMemo(() => {
        const counts = {};
        products.forEach((p) => {
            if (!p.isBanner && Array.isArray(p.colors)) {
                p.colors.forEach((hex) => {
                    const normalized = hex.toLowerCase();
                    counts[normalized] = (counts[normalized] || 0) + 1;
                });
            }
        });
        return Object.entries(counts).map(([color, count]) => ({
            color,
            name: COLOR_NAMES_MAP[color] || color,
            count
        }));
    }, []);

    const handleToggleFilter = React.useCallback(() => setIsFilterVisible((prev) => !prev), []);
    const handleCompareToggle = React.useCallback((val) => setCompareEnabled(val), []);
    const handleSortChange = React.useCallback((val) => setSortBy(val), []);
    const handleAvailabilityChange = React.useCallback((val) => setAvailability(Array.isArray(val) ? val : []), []);
    const handleCategoryChange = React.useCallback((val) => setSelectedCategories(Array.isArray(val) ? val : []), []);
    const handlePriceChange = React.useCallback((val) => setPriceMax(Number(val) || 0), []);
    const handleToggleColor = React.useCallback((color) => {
        setSelectedColors((prev) =>
            prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
        );
    }, []);
    const handleProductClick = React.useCallback((item) => {
        navigate(`/product/${item.id}`, { state: { product: item } });
    }, [navigate]);

    const filteredProducts = React.useMemo(() => {
        return products
            .filter((item) => {
                if (item.isBanner) return true;

                if (availability.length === 1) {
                    if (availability.includes('in-stock') && !item.inStock) return false;
                    if (availability.includes('out-of-stock') && item.inStock) return false;
                }

                if (selectedCategories.length > 0) {
                    const matchesCategory = selectedCategories.some((catVal) => {
                        const catObj = categories.find((c) => String(c.id) === String(catVal) || c.name === catVal);
                        return (
                            String(item.categoryId) === String(catVal) ||
                            item.category === catVal ||
                            (catObj && (item.category === catObj.name || item.category === catObj.title || String(item.categoryId) === String(catObj.id)))
                        );
                    });
                    if (!matchesCategory) return false;
                }

                if (typeof item.price === 'number' && item.price > priceMax) return false;

                if (selectedColors.length > 0) {
                    const hasColor = item.colors?.some((c) => selectedColors.includes(c.toLowerCase()));
                    if (!hasColor) return false;
                }

                return true;
            })
            .sort((a, b) => {
                if (a.isBanner || b.isBanner) return 0;
                if (sortBy === 'trending') {
                    if (Boolean(a.trending) === Boolean(b.trending)) return (a.id || 0) - (b.id || 0);
                    return a.trending ? -1 : 1;
                }
                if (sortBy === 'price-low') return (a.price || 0) - (b.price || 0);
                if (sortBy === 'price-high') return (b.price || 0) - (a.price || 0);
                return 0;
            });
    }, [availability, selectedCategories, priceMax, selectedColors, sortBy]);

    const totalProductCount = React.useMemo(
        () => filteredProducts.filter((p) => !p.isBanner).length,
        [filteredProducts]
    );

    return (
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
                        availabilityOptions={availabilityOptions}
                        selectedCategories={selectedCategories}
                        onCategoryChange={handleCategoryChange}
                        categoryOptions={categoryOptions}
                        priceMax={priceMax}
                        maxPriceLimit={maxPriceLimit}
                        onPriceChange={handlePriceChange}
                        selectedColors={selectedColors}
                        colorFilters={colorFilters}
                        onToggleColor={handleToggleColor}
                    />
                )}

                <div className={isFilterVisible ? 'w-80 sm-w-full' : 'w-full'}>
                    <ProductGrid
                        productsList={filteredProducts}
                        isFilterVisible={isFilterVisible}
                        onProductClick={handleProductClick}
                    />
                </div>
            </div>
        </div>
    );
};

export default React.memo(FilterSection);
