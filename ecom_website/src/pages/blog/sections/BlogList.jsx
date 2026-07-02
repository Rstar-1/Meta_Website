import React, { memo, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../../components/common/Container";
import Fade from "../../../components/common/Fade";
import Banner from "../../../components/layout/Banner";
import Icon from "../../../components/common/Icon";
import blogsData from "../../../data/blogs.json";

const CATEGORIES = [
    { name: "All", count: 24 },
    { name: "Digital Marketing", count: 8 },
    { name: "SEO", count: 6 },
    { name: "Social Media", count: 5 },
    { name: "Content Marketing", count: 3 },
    { name: "Analytics", count: 2 }
];

const BlogList = memo(() => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [activePage, setActivePage] = useState(1);
    const [newsletterEmail, setNewsletterEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);

    // Filter and search logic
    const filteredBlogs = useMemo(() => {
        let result = blogsData || [];
        if (selectedCategory && selectedCategory !== "All") {
            result = result.filter(
                (blog) => blog.category?.toLowerCase() === selectedCategory.toLowerCase()
            );
        }
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (blog) =>
                    blog.title?.toLowerCase().includes(query) ||
                    blog.summary?.toLowerCase().includes(query) ||
                    blog.category?.toLowerCase().includes(query)
            );
        }
        return result;
    }, [selectedCategory, searchQuery]);

    // Popular posts: first 3 posts
    const popularPosts = useMemo(() => {
        return (blogsData || []).slice(0, 3);
    }, []);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (newsletterEmail.trim()) {
            setIsSubscribed(true);
            setNewsletterEmail("");
            setTimeout(() => {
                setIsSubscribed(false);
            }, 5000);
        }
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case "Digital Marketing":
                return "text-primary";
            case "SEO":
                return "text-info";
            case "Social Media":
                return "text-warning";
            case "Content Marketing":
                return "text-warning";
            case "Analytics":
                return "text-primary";
            default:
                return "text-primary";
        }
    };

    return (
        <>
            {/* Tiny style tag strictly for micro-interactions/transitions not present in global SCSS */}
            <style>{`
        .blog-card-hover:hover img {
          transform: scale(1.03);
        }
        .blog-card-hover img {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .text-hover-primary {
          transition: color 0.2s ease;
        }
        .text-hover-primary:hover {
          color: var(--primary) !important;
        }
        .cat-item-hover {
          transition: all 0.2s ease;
        }
        .cat-item-hover:hover {
          background-color: var(--tertiary) !important;
          color: var(--primary) !important;
        }
      `}</style>

            {/* --- Page Banner --- */}
            <Banner
                style={{ background: "linear-gradient(135deg, #021B44 0%, #00102A 100%)" }}
                img="https://metatechnical.org/images/banners/blog.png"
                title="Latest Articles"
                desc="Insights, strategies, and tips to help your business grow with smart marketing."
            />

            {/* --- Main Content Area --- */}
            <div className="bg-forth py-50">
                <Container version="v2">
                    <div className="flex gap-12 sm-grid-cols-1">

                        {/* Left Column - Articles */}
                        <div className="w-70 md-w-full sm-w-full">
                            <div className="flex items-center justify-between sm-grid-cols-1 gap-12 mb-25">
                                <h2 className="title-text font-600 text-dark">Latest Articles</h2>

                                <div className="relative w-40 sm-w-full">
                                    <input
                                        type="text"
                                        placeholder="Search articles..."
                                        className="h-input border-0"
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value);
                                            setActivePage(1);
                                        }}
                                    />

                                    <Icon name="Search" width="18" height="18" className="absolute top-0 right-0 m-11 text-gray" strokeWidth="2" />
                                </div>
                            </div>

                            {filteredBlogs.length > 0 ? (
                                <div className="grid-cols-1 gap-12">
                                    {filteredBlogs.map((blog, idx) => {
                                        const categoryColorClass = getCategoryColor(blog.category);
                                        const formattedDate = blog.datePublished
                                            ? new Date(blog.datePublished).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                                            : "May 20, 2024";

                                        return (
                                            <Fade
                                                key={blog.id}
                                                direction="up"
                                                distance={40}
                                                delay={100 + idx * 100}
                                            >
                                                <article className="blog-card-hover flex sm-grid-cols-1 bg-white rounded-5 overflow-hidden">

                                                    {/* Card Image */}
                                                    <div
                                                        className="w-40 sm-w-full overflow-hidden cursor-pointer"
                                                        onClick={() => navigate(`/blog-detail/${blog.id}`)}
                                                    >
                                                        <img
                                                            src={blog.image}
                                                            alt={blog.title}
                                                            className="w-full h-250 object-cover flex"
                                                            loading="lazy"
                                                        />
                                                    </div>

                                                    {/* Card Content */}
                                                    <div className="w-60 sm-w-full p-20 sm-p-20 flex flex-column justify-between">
                                                        <div>
                                                            <p
                                                                className={`small-text font-600 uppercase cursor-pointer ${categoryColorClass}`}
                                                                onClick={() => {
                                                                    setSelectedCategory(blog.category);
                                                                    setActivePage(1);
                                                                }}
                                                            >
                                                                {blog.category}
                                                            </p>
                                                            <h3
                                                                className="title-text font-600 text-dark cursor-pointer pt-5 line-clamp2"
                                                                onClick={() => navigate(`/blog-detail/${blog.id}`)}
                                                            >
                                                                {blog.title}
                                                            </h3>
                                                            <p className="small-text text-gray font-400 line-clamp2 my-10">{blog.summary}</p>
                                                        </div>

                                                        {/* Card Footer */}
                                                        <div className="flex items-center justify-between pt-8 bordh">
                                                            <div className="flex items-center gap-10">
                                                                <img
                                                                    src={blog.authorAvatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60"}
                                                                    alt={blog.authorName}
                                                                    className="rounded-full"
                                                                    style={{ width: "32px", height: "32px", objectFit: "cover" }}
                                                                />
                                                                <span className="small-text font-500 text-dark">By {blog.authorName}</span>
                                                            </div>
                                                            <div className="flex items-center gap-8 mini-text text-gray">
                                                                <span>{formattedDate}</span>
                                                                <span className="font-600" style={{ fontSize: "6px" }}>•</span>
                                                                <span>{blog.readTime || "5 min read"}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </article>
                                            </Fade>
                                        );
                                    })}

                                    {/* Pagination */}
                                    <div className="flex items-center gap-8 mt-40">
                                        <button
                                            className={`p-10 px-15 rounded-5 border cursor-pointer font-500 ${activePage === 1 ? 'bg-primary text-white border-primary font-600' : 'bg-white border-gray text-dark cat-item-hover'}`}
                                            onClick={() => setActivePage(1)}
                                        >
                                            1
                                        </button>
                                        <button
                                            className={`p-10 px-15 rounded-5 border cursor-pointer font-500 ${activePage === 2 ? 'bg-primary text-white border-primary font-600' : 'bg-white border-gray text-dark cat-item-hover'}`}
                                            onClick={() => setActivePage(2)}
                                        >
                                            2
                                        </button>
                                        <button
                                            className={`p-10 px-15 rounded-5 border cursor-pointer font-500 ${activePage === 3 ? 'bg-primary text-white border-primary font-600' : 'bg-white border-gray text-dark cat-item-hover'}`}
                                            onClick={() => setActivePage(3)}
                                        >
                                            3
                                        </button>
                                        <span className="text-gray font-600 px-5">...</span>
                                        <button
                                            className={`p-10 px-15 rounded-5 border cursor-pointer font-500 ${activePage === 10 ? 'bg-primary text-white border-primary font-600' : 'bg-white border-gray text-dark cat-item-hover'}`}
                                            onClick={() => setActivePage(10)}
                                        >
                                            10
                                        </button>
                                        <button
                                            className="p-10 px-15 rounded-5 border border-gray bg-white text-dark cursor-pointer font-500 cat-item-hover"
                                            onClick={() => setActivePage((prev) => (prev < 10 ? prev + 1 : 1))}
                                        >
                                            Next &gt;
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white rounded-10 p-50 text-center border border-gray text-gray">
                                    <h3 className="title-text font-700 text-dark mb-10">No articles found</h3>
                                    <p className="para-text">Try refining your search terms or selecting another category.</p>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="w-30 md-w-full sm-w-full">

                            {/* Categories Widget */}
                            <div className="bg-white rounded-10 p-20 mb-20">
                                <h3 className="mid-text font-600 text-dark pb-12">Categories</h3>
                                <div className="flex flex-column gap-6">
                                    {CATEGORIES.map((cat) => {
                                        const isActive = selectedCategory === cat.name;
                                        return (
                                            <div
                                                key={cat.name}
                                                className={`cat-item-hover flex items-center justify-between p-10 px-15 rounded-5 cursor-pointer font-500 ${isActive ? "bg-light-primary text-primary" : "text-gray"}`}
                                                onClick={() => {
                                                    setSelectedCategory(cat.name);
                                                    setActivePage(1);
                                                }}
                                            >
                                                <span>{cat.name}</span>
                                                <div className="flex items-center">
                                                    <p className="mini-text font-500">{cat.count}</p>
                                                    {!isActive && <p className="mini-text text-gray ml-10">&gt;</p>}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Popular Posts Widget */}
                            <div className="bg-white rounded-10 p-20 mb-20">
                                <h3 className="mid-text font-600 text-dark pb-12">Popular Post</h3>
                                <div className="grid-cols-1 gap-12">
                                    {popularPosts.map((post) => {
                                        const formattedDate = post.datePublished
                                            ? new Date(post.datePublished).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                                            : "May 20, 2024";

                                        return (
                                            <div
                                                key={post.id}
                                                className="flex items-center gap-12 cursor-pointer"
                                                onClick={() => navigate(`/blog-detail/${post.id}`)}
                                            >
                                                <div className="overflow-hidden w-35">
                                                    <img
                                                        src={post.image}
                                                        alt={post.title}
                                                        className="w-full object-cover rounded-10"
                                                        style={{ height: '80px' }}
                                                    />
                                                </div>
                                                <div className="w-65">
                                                    <h4 className="headmini-text font-500 text-dark line-clamp2">
                                                        {post.title}
                                                    </h4>
                                                    <p className="mini-text text-gray mt-5">{formattedDate}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Newsletter Widget */}
                            <div className="bg-dark text-white rounded-10 p-20 mb-20 relative overflow-hidden">
                                <Icon
                                    name="Send"
                                    width="36"
                                    height="36"
                                    className="absolute text-white"
                                    strokeWidth="1.5"
                                    style={{ color: "rgba(255, 255, 255, 0.06)", right: "15px", top: "15px", pointerEvents: "none" }}
                                />

                                <h3 className="mid-text font-500 text-white">Subscribe to Our Newsletter</h3>
                                <p className="mini-text text-white mt-6 mb-20" style={{ opacity: 0.85 }}>
                                    Get the latest marketing insights and strategies straight to your inbox.
                                </p>

                                {isSubscribed ? (
                                    <div className="p-10 bg-light-success text-success rounded-5 font-600 small-text text-center">
                                        ✓ Thank you for subscribing!
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubscribe} className="flex bg-white rounded-5 overflow-hidden">
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            className="h-input bg-white"
                                            style={{ outline: "none" }}
                                            value={newsletterEmail}
                                            onChange={(e) => setNewsletterEmail(e.target.value)}
                                            required
                                        />
                                        <button type="submit" className="bg-primary text-white font-600 px-20 border-none cursor-pointer cat-item-hover">
                                            Subscribe
                                        </button>
                                    </form>
                                )}
                                <p className="mini-text text-white mt-15">No spam, unsubscribe anytime.</p>
                            </div>

                        </div>

                    </div>
                </Container>
            </div>
        </>
    );
});

export default BlogList;
