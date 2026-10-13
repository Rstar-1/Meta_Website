import React from 'react';
import { useNavigate } from 'react-router-dom';

import Image from '../../../components/common/Image';
import Fields from '../../../components/forms/Fields';
import Button from '../../../components/common/Button';
import Badge from '../../../components/common/Badge';

import { resolveImagePath } from '../../../utils/imageResolver';
import blogData from '../../../data/blog.json';

const CARPET_SWATCH_COLORS = [
    { name: 'Jet Black', hex: '#18181b', type: 'Dilour & Ribs' },
    { name: 'Slate Grey', hex: '#64748b', type: 'Dilour & Ribs' },
    { name: 'Royal Beige', hex: '#d4b896', type: 'Dilour Velour' },
    { name: 'Chestnut Brown', hex: '#5c3d28', type: 'Dilour & Ribs' },
    { name: 'Ruby Red', hex: '#881337', type: 'Dilour & Ribs' },
];

const POPULAR_CARPET_TAGS = [
    '1800 GSM Rugs',
    'Dilour Automotive',
    'Ribs Carpets',
    'Poly Shrink 3D',
    'Shalimar Weaves',
    'Acoustic Damping'
];

const CategorySection = React.memo(({
    searchQuery = '',
    onSearchChange,
    selectedCategory = null,
    onSelectCategory,
    excludeBlogId,
    onBlogClick
}) => {
    const navigate = useNavigate();
    const blogsList = React.useMemo(() => blogData || [], []);

    const categories = React.useMemo(() => {
        const counts = {};
        blogsList.forEach((b) => {
            if (b.category) {
                counts[b.category] = (counts[b.category] || 0) + 1;
            }
        });
        return Object.entries(counts).map(([name, count]) => ({
            name,
            count: count.toString().padStart(2, '0')
        }));
    }, [blogsList]);

    const recentPosts = React.useMemo(() => {
        const filtered = excludeBlogId
            ? blogsList.filter((b) => b.id !== excludeBlogId)
            : blogsList;
        return filtered.slice(0, 3);
    }, [blogsList, excludeBlogId]);

    const handleCategoryClick = React.useCallback((catName) => {
        if (onSelectCategory) {
            onSelectCategory(selectedCategory === catName ? null : catName);
        } else {
            navigate('/blog');
        }
    }, [onSelectCategory, selectedCategory, navigate]);

    const handlePostClick = React.useCallback((post) => {
        if (onBlogClick) {
            onBlogClick(post);
        } else {
            navigate('/blog-detail', { state: { blog: post } });
        }
    }, [onBlogClick, navigate]);

    const handleSearch = React.useCallback((val) => {
        if (onSearchChange) {
            onSearchChange(val);
        } else {
            navigate('/blog');
        }
    }, [onSearchChange, navigate]);

    const handleTagClick = React.useCallback((tag) => {
        if (onSearchChange) {
            onSearchChange(tag);
        } else {
            navigate('/blog');
        }
    }, [onSearchChange, navigate]);

    return (
        <aside className="w-full pb-50 sm-pb-5">
            {/* Search Box */}
            <div className="mb-25 bg-forth rounded-10 p-15">
                <Fields
                    type="input"
                    placeholder="Search carpet & rug guides..."
                    value={searchQuery}
                    onChange={handleSearch}
                    icon="Search"
                    iconPosition="right"
                />
            </div>

            {/* Carpet Categories */}
            <div className="mb-25">
                <h4 className="text-dark mid-text font-600">
                    Carpet & Rug Categories
                </h4>
                <div className="grid-cols-1 gap-10 mt-15">
                    {categories.map((cat, idx) => {
                        const isSelected = selectedCategory === cat.name;
                        return (
                            <div
                                key={idx}
                                onClick={() => handleCategoryClick(cat.name)}
                                className={`rounded-5 p-15 flex justify-between items-center cursor-pointer transition-colors ${
                                    isSelected ? 'bg-primary text-white' : 'bg-forth text-dark hover:bg-white'
                                }`}
                            >
                                <h5 className={`headmini-text font-500 ${isSelected ? 'text-white' : 'text-dark'}`}>
                                    {cat.name}
                                </h5>
                                <p className={`mini-text font-500 ${isSelected ? 'text-white' : 'text-light'}`}>
                                    ({cat.count})
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Recent Carpet Posts */}
            <div className="mb-25">
                <h4 className="text-dark mid-text font-600">
                    Recent Flooring Articles
                </h4>
                <div className="mt-15 grid-cols-1 gap-12">
                    {recentPosts.map((post) => (
                        <div
                            key={post.id}
                            onClick={() => handlePostClick(post)}
                            className="flex items-center gap-12 mb-10 cursor-pointer group"
                        >
                            <div className="w-35 h-100px rounded-5 overflow-hidden flex-shrink-0 bg-forth">
                                <Image
                                    src={resolveImagePath(post.image)}
                                    alt={post.title}
                                    className="w-full h-full object-cover flex transition-transform group-hover:scale-105"
                                />
                            </div>
                            <div className="w-65">
                                <p className="text-primary mini-text font-600 mb-3">
                                    {post.date}
                                </p>
                                <h5 className="text-dark mid-text font-600 line-clamp1">
                                    {post.title}
                                </h5>
                                <p className="text-gray mt-4 small-text font-400 line-clamp2">
                                    {post.excerpt}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Factory Swatch Colors Widget */}
            <div className="mb-25 p-18 bg-forth rounded-10">
                <div className="flex items-center justify-between mb-12">
                    <h5 className="text-dark mid-text font-600">
                        Available Swatch Colors
                    </h5>
                    <span className="mini-text text-primary font-600">
                        In Stock
                    </span>
                </div>
                <div className="flex flex-wrap gap-8 items-center">
                    {CARPET_SWATCH_COLORS.map((swatch, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-6 px-10 py-6 bg-white rounded-20 border border-gray-100 cursor-pointer hover:shadow-sm transition-shadow"
                            onClick={() => handleSearch(swatch.name)}
                            title={`${swatch.name} (${swatch.type})`}
                        >
                            <span
                                className="w-12 h-12 rounded-full inline-block border border-gray-300"
                                style={{ backgroundColor: swatch.hex, width: '12px', height: '12px' }}
                            />
                            <span className="mini-text font-500 text-dark">
                                {swatch.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Popular Carpet Tags */}
            <div className="mb-25">
                <h4 className="text-dark mid-text font-600 mb-12">
                    Popular Flooring Tags
                </h4>
                <div className="flex flex-wrap gap-6">
                    {POPULAR_CARPET_TAGS.map((tag, idx) => (
                        <span
                            key={idx}
                            onClick={() => handleTagClick(tag)}
                            className="px-12 py-6 bg-forth hover:bg-primary hover:text-white rounded-20 small-text font-500 text-dark cursor-pointer transition-colors"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* United Brothers Factory Promo Card */}
            <div className="relative rounded-10 overflow-hidden bg-dark text-white p-20 shadow-md">
                <div className="absolute inset-0 z-0 opacity-25">
                    <Image
                        src={resolveImagePath('/products/spaces/living_room.webp')}
                        alt="United Brothers Flooring"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-10">
                    <Badge
                        text="UNITED BROTHERS"
                        color="white"
                        bg="primary"
                        size="sm"
                        shape="pill"
                        className="mb-10 font-600"
                    />
                    <h4 className="title-text font-700 leading-tight mb-8">
                        Looking for Wholesale Carpet Rolls or Rugs?
                    </h4>
                    <p className="small-text text-gray-200 opacity-90 mb-16 leading-relaxed">
                        Direct manufacturer pricing on Dilour automotive rolls, ribbed commercial carpets, and 1800 GSM luxury poly shrink rugs.
                    </p>
                    <Button
                        text="Explore All Products"
                        version="v1"
                        bg="primary"
                        color="white"
                        className="w-full rounded-20 font-600 small-text py-10"
                        onClick={() => navigate('/product')}
                    />
                </div>
            </div>
        </aside>
    );
});

CategorySection.displayName = 'CategorySection';

export default CategorySection;