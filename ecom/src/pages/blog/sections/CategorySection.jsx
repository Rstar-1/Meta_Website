import React from 'react';
import { useNavigate } from 'react-router-dom';

import Image from '../../../components/common/Image';
import Fields from '../../../components/forms/Fields';
import Button from '../../../components/common/Button';
import Badge from '../../../components/common/Badge';

import { resolveImagePath } from '../../../utils/imageResolver';
import blogData from '../../../data/blog.json';

const POPULAR_STEEL_TAGS = [
    'Seamless Pipes',
    'ASTM A516 Gr. 70',
    'Hardox 400/500',
    'Inconel 625',
    'Butt-Weld Fittings',
    'ASME B16.5 Flanges',
    '3.1 Mill Certificates',
    'Duplex 2205'
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
                    placeholder="Search steel, piping & alloy guides..."
                    value={searchQuery}
                    onChange={handleSearch}
                    icon="Search"
                    iconPosition="right"
                />
            </div>

            {/* Steel & Piping Categories */}
            <div className="mb-25">
                <h4 className="text-dark mid-text font-600">
                    Steel & Piping Categories
                </h4>
                <div className="grid-cols-1 gap-10 mt-15">
                    {categories.map((cat, idx) => {
                        const isSelected = selectedCategory === cat.name;
                        return (
                            <div
                                key={idx}
                                onClick={() => handleCategoryClick(cat.name)}
                                className={`rounded-5 p-15 flex justify-between items-center cursor-pointer transition-colors ${isSelected ? 'bg-primary text-white' : 'bg-forth text-dark hover:bg-white'
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

            {/* Recent Metallurgy Articles */}
            <div className="mb-25">
                <h4 className="text-dark mid-text font-600">
                    Recent Metallurgy Articles
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

            {/* Popular Topics */}
            <div className="mb-25">
                <h4 className="text-dark mid-text font-600">
                    Popular Topics
                </h4>
                <div className="flex flex-wrap gap-8 mt-15">
                    {POPULAR_STEEL_TAGS.map((tag, idx) => (
                        <span
                            key={idx}
                            onClick={() => handleTagClick(tag)}
                            className="mini-text font-500 py-6 px-12 rounded-30 bg-forth text-dark hover:bg-primary hover:text-white cursor-pointer transition-colors"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>
        </aside>
    );
});

CategorySection.displayName = 'CategorySection';

export default CategorySection;