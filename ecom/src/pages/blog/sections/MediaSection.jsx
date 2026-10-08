import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/common/Button';
import CardLayout from '../../../components/layout/sections/CardLayout';
import blogData from '../../../data/blog.json';

const CategorySection = React.lazy(() => import('./CategorySection'));

const MediaSection = React.memo(() => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedCategory, setSelectedCategory] = React.useState(null);

    const blogsList = React.useMemo(() => blogData || [], []);

    const filteredPosts = React.useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        const cat = selectedCategory?.toLowerCase();

        return blogsList.filter((post) => {
            const matchesQuery = query
                ? post.title.toLowerCase().includes(query) ||
                post.excerpt.toLowerCase().includes(query) ||
                post.category?.toLowerCase().includes(query)
                : true;

            const matchesCategory = cat
                ? post.category?.toLowerCase() === cat
                : true;

            return matchesQuery && matchesCategory;
        });
    }, [blogsList, searchQuery, selectedCategory]);

    const handleBlogClick = React.useCallback((post) => {
        navigate('/blog-detail', { state: { blog: post } });
    }, [navigate]);

    const handleClearCategory = React.useCallback(() => {
        setSelectedCategory(null);
    }, []);

    return (
        <div className="flex sm-grid-cols-1 items-start gap-12 w-full py-60">
            <div className="w-70 sm-w-full pr-10 sm-pr-1">
                {selectedCategory && (
                    <div className="flex items-center justify-between mb-20 p-12 bg-forth rounded-5">
                        <p className="small-text font-500 text-dark">
                            Category filter: <span className="text-primary font-600">{selectedCategory}</span>
                        </p>
                        <Button
                            text="Clear"
                            version="v0"
                            bg="transparent"
                            color="danger"
                            className="small-text font-600 cursor-pointer"
                            onClick={handleClearCategory}
                        />
                    </div>
                )}

                {filteredPosts.length === 0 ? (
                    <div className="text-center py-100 bg-forth rounded-10">
                        <h4 className="title-text font-600 text-dark uppercase">No articles found</h4>
                        <p className="para-text text-gray capitalize mt-6">Try adjusting your search query or category filter.</p>
                    </div>
                ) : (
                    filteredPosts.map((post) => (
                        <CardLayout
                            key={post.id}
                            version="blog"
                            post={post}
                            onClick={handleBlogClick}
                        />
                    ))
                )}
            </div>

            <div className="w-30 sm-w-full pl-10 sm-pl-1 sticky" style={{ top: '19%' }}>
                <React.Suspense fallback={<div className="w-full h-300" />}>
                    <CategorySection
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                        onBlogClick={handleBlogClick}
                    />
                </React.Suspense>
            </div>
        </div>
    );
});

MediaSection.displayName = 'MediaSection';

export default MediaSection;