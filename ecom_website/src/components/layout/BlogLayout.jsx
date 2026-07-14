import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../common/Container';
import Icon from '../common/Icon';
import Image from '../common/Image';
import Fields from '../common/Fields';
import Banner from './Banner';
import SeoHelmet from '../seo/SeoHelmet';
import BlogSchema from '../seo/BlogSchema';
import FAQSection from '../../pages/home/sections/FAQSection';
import NewsletterForm from '../forms/NewsletterForm';

import { formatDate } from '../../utils/formatDate';
import { blogMetaTemplate } from '../../seo/metaTemplates';

const BlogLayout = ({
  type = 'list', // 'list' or 'detail'
  blogsData = [],
  post = null,
  allBlogs = [],
}) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  // Scroll to top on type or post change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type, post?.id]);

  const shareUrl = useMemo(() => {
    return post?.shareLink || (typeof window !== 'undefined' ? window.location.origin + `/blog-detail/${post?.id}` : '');
  }, [post]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
  };

  // Combine blogs source
  const blogsList = useMemo(() => {
    return blogsData.length > 0 ? blogsData : (allBlogs.length > 0 ? allBlogs : []);
  }, [blogsData, allBlogs]);

  // Compute categories dynamically
  const categoriesList = useMemo(() => {
    const counts = {};
    let total = 0;
    blogsList.forEach((blog) => {
      if (blog.category) {
        counts[blog.category] = (counts[blog.category] || 0) + 1;
        total++;
      }
    });
    const list = Object.keys(counts).map((name) => ({
      name,
      count: counts[name],
    }));
    list.sort((a, b) => b.count - a.count);
    return [{ name: "All", count: total }, ...list];
  }, [blogsList]);

  // Filter and search logic for list
  const filteredBlogs = useMemo(() => {
    let result = blogsList;
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
  }, [blogsList, selectedCategory, searchQuery]);

  // Popular posts: first 3 posts
  const popularPosts = useMemo(() => {
    return blogsList.slice(0, 3);
  }, [blogsList]);

  // Detail post computations
  const content = useMemo(() => {
    if (type === 'detail' && post) {
      return post.content || null;
    }
    return null;
  }, [type, post]);

  const authorBio = useMemo(() => {
    if (post) {
      return post.authorBio || '';
    }
    return '';
  }, [post]);

  const tags = useMemo(() => {
    return post?.keywords ? post.keywords.split(',').map((t) => t.trim()) : [];
  }, [post?.keywords]);

  const formattedDate = useMemo(() => {
    return formatDate(post?.datePublished, 'human') || 'May 20, 2024';
  }, [post?.datePublished]);


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

  const blogMeta = useMemo(() => {
    return post ? blogMetaTemplate(post, typeof window !== 'undefined' ? window.location.origin : 'https://sobo-marketing.com') : {};
  }, [post]);

  return (
    <>
      {type === 'detail' && post && (
        <>
          <SeoHelmet
            title={blogMeta.title}
            description={blogMeta.description}
            keywords={blogMeta.keywords}
            image={blogMeta.image}
            path={blogMeta.path}
            canonical={blogMeta.canonical}
            type={blogMeta.type}
          />
          <BlogSchema post={post} />
        </>
      )}

      {/* Shared Blog Layout CSS styles */}
      <style>{`
        .share-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gray);
          background: #ffffff;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .share-btn:hover {
          background: var(--primary);
          color: #ffffff;
          border-color: var(--primary);
          transform: translateY(-2px);
        }
        .toc-link {
          color: var(--gray);
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .toc-link:hover {
          color: var(--primary);
        }
        .popular-item:hover h4 {
          color: var(--primary) !important;
        }
        .cat-item-hover {
          transition: all 0.2s ease;
        }
        .cat-item-hover:hover {
          background-color: var(--tertiary) !important;
          color: var(--primary) !important;
        }
        .blockquote-container {
          border-left: 4px solid var(--primary);
        }
        .blockquote-text {
          font-style: italic;
          font-weight: 500;
          line-height: 1.6;
          color: var(--dark);
        }
         .author-bio-box {
          border: 1px solid #e5e7eb;
          background: #f8fafc;
        }
        .sticky-sidebar {
          position: sticky;
          top: 20px;
          align-self: start;
        }
        @media (max-width: 640px) {
          .sticky-sidebar {
            position: static !important;
          }
        }
      `}</style>

      {/* --- Page Banner / Hero --- */}
      {type === 'list' ? (
        <Banner
          style={{ background: "linear-gradient(135deg, #021B44 0%, #00102A 100%)" }}
          img="https://metatechnical.org/images/banners/blog.webp"
          title="Latest Articles"
          desc="Insights, strategies, and tips to help your business grow with smart marketing."
          breadcrumbs={[
            { label: 'Home', path: '/home' },
            { label: 'Blog' }
          ]}
        />
      ) : (
        post && (
          <Banner
            style={{ background: "linear-gradient(135deg, #021B44 0%, #00102A 100%)" }}
            img="https://metatechnical.org/images/banners/blog.webp"
            title={post.category}
            desc={post.title}
            breadcrumbs={[
              { label: 'Home', path: '/home' },
              { label: 'Blog', path: '/blog' },
              { label: post.title }
            ]}
          />
        )
      )}

      <div className="bg-forth py-50 sm-py-36">
        <Container>
          <div className="flex gap-12 sm-grid-cols-1">
            {/* Far Left: Sticky Social Share Widget (Desktop Only, Details View Only) */}
            {type === 'detail' && post && (
              <div className="w-5 md-hidden sm-hidden">
                <div className="sticky flex flex-column items-center gap-12" style={{ top: '100px' }}>
                  <span className="mini-text text-gray uppercase font-600 tracking-wider mb-5">Share</span>
                  <a
                    href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="share-btn"
                  >
                    <Icon name="Facebook" width="18" height="18" fill="currentColor" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(
                      post.title
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="share-btn"
                  >
                    <Icon name="Twitter" width="16" height="16" fill="currentColor" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                      shareUrl
                    )}&title=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="share-btn"
                  >
                    <Icon name="LinkedIn" width="16" height="16" fill="currentColor" />
                  </a>
                  <button onClick={copyToClipboard} className="share-btn" title="Copy link">
                    <Icon name="CopyLink" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Left/Center Column - Main Content */}
            <div className='w-70 md-w-70 sm-w-full'>
              {type === 'list' ? (
                <>
                  <div className="flex items-center justify-between sm-grid-cols-1 gap-12 mb-25 sm-mb-15">
                    <h2 className="title-text font-600 text-dark">Latest Articles</h2>
                  </div>

                  {filteredBlogs.length > 0 ? (
                    <div className="grid-cols-1 gap-12">
                      {filteredBlogs.map((blog, idx) => {
                        const categoryColorClass = getCategoryColor(blog.category);
                        const itemFormattedDate = formatDate(blog.datePublished, 'human') || 'May 20, 2024';

                        return (
                          <article key={blog.id} className="blog-card-hover flex sm-grid-cols-1 bg-white rounded-5 overflow-hidden mb-20">
                            {/* Card Image */}
                            <div
                              className="w-40 sm-w-full overflow-hidden cursor-pointer"
                              onClick={() => navigate(`/blog-detail/${blog.id}`)}
                            >
                              <Image
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-250 object-cover flex"
                                loading={idx < 2 ? "eager" : "lazy"}
                                fetchPriority={idx < 2 ? "high" : undefined}
                              />
                            </div>

                            {/* Card Content */}
                            <div className="w-60 sm-w-full">
                              <div className='p-20 sm-p-12'>
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
                                  <p className="small-text text-gray font-400 line-clamp2 sm-my-5 my-10">{blog.summary}</p>
                                </div>

                                <div className="flex sm-grid-cols-1 sm-gap-12 items-center justify-between pt-8 bordh">
                                  <div className="flex items-center gap-10">
                                    <Image
                                      src={
                                        blog.authorAvatar ||
                                        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60'
                                      }
                                      alt={blog.authorName}
                                      className="rounded-full"
                                      style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                                    />
                                    <span className="small-text font-500 text-dark">By {blog.authorName}</span>
                                  </div>
                                  <div className="flex items-center gap-8 mini-text text-gray">
                                    <span>{itemFormattedDate}</span>
                                    <span className="font-600" style={{ fontSize: '6px' }}>
                                      •
                                    </span>
                                    <span>{blog.readTime || '5 min read'}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="bg-white rounded-5 p-50 text-center border border-gray text-gray">
                      <h3 className="title-text font-700 text-dark mb-10">No articles found</h3>
                      <p className="para-text">Try refining your search terms or selecting another category.</p>
                    </div>
                  )}
                </>
              ) : (
                post && (
                  <>
                    {/* Main Article Image */}
                    <div className="overflow-hidden rounded-5 mb-35">
                      <Image
                        src={post.image}
                        alt={post.title}
                        className="w-full object-cover flex"
                        style={{ maxHeight: '420px', borderRadius: '10px' }}
                        loading="eager"
                        fetchPriority="high"
                      />
                    </div>

                    {/* Metadata: Author, Date, Read Time */}
                    <div className="flex items-center gap-12 mb-25 sm-mb-1 pb-15 bordb">
                      <div className="flex items-center gap-10">
                        <Image
                          src={
                            post.authorAvatar ||
                            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
                          }
                          alt={post.authorName}
                          className="rounded-full"
                          style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                        />
                        <p className="mini-text font-600 text-dark">By {post.authorName} </p>
                      </div>
                      <p className="mini-text text-gray">• {formattedDate} •</p>
                      <p className="mini-text text-gray"> {post.readTime || '5 min read'}</p>
                    </div>

                    {/* Mobile Social Share Row */}
                    <div className="hidden sm-flex md-flex gap-10 items-center mb-25 sm-mb-14 bg-white p-12 rounded-5 border-ec">
                      <span className="small-text font-600 text-dark">Share:</span>
                      <button onClick={copyToClipboard} className="share-btn" title="Copy link">
                        <Icon name="CopyLink" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" />
                      </button>
                      <a
                        href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="share-btn"
                      >
                        <Icon name="Facebook" width="16" height="16" fill="currentColor" />
                      </a>
                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(
                          post.title
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="share-btn"
                      >
                        <Icon name="Twitter" width="14" height="14" fill="currentColor" />
                      </a>
                    </div>

                    {/* Article Body */}
                    <div className="blog-body-text">
                      {content?.intro.map((p, idx) => (
                        <p key={idx} className="small-text text-gray font-400">
                          {p}
                        </p>
                      ))}

                      {content?.sections.map((section) => (
                        <section key={section.id} id={section.id} className="my-20">
                          <h3 className="headmini-text font-600 text-dark">{section.title}</h3>
                          <p className="small-text text-gray font-400 mt-4">{section.text}</p>
                        </section>
                      ))}

                      {content?.quote && (
                        <div className="blockquote-container p-16 mt-10">
                          <p className="small-text text-gray font-400">{content.quote}</p>
                          {content?.outro && <p className="small-text text-gray font-400">{content.outro}</p>}
                        </div>
                      )}


                    </div>

                    {/* Tags */}
                    {tags.length > 0 && (
                      <div className="flex items-center gap-8 flex-wrap py-20">
                        <p className="small-text font-600 text-dark">Tags:</p>
                        {tags.map((t, idx) => (
                          <p key={idx} className="px-12 py-5 rounded-5 bg-light-success text-success font-500 mini-text">
                            {t}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Author Bio Box */}
                    <div className="rounded-10 mt-18 w-80 p-20 flex gap-12 sm-grid-cols-1 items-start border-ec">
                      <div className='w-15 sm-w-full'>
                        <Image
                          src={
                            post.authorAvatar ||
                            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
                          }
                          alt={post.authorName}
                          className="rounded-full flex mx-auto"
                          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                      </div>
                      <div className="w-85 sm-w-full">
                        <h4 className="mid-text font-600 text-dark">{post.authorName}</h4>
                        <p className="mini-text text-primary font-500 uppercase tracking-wide mb-8">
                          {post.authorRole || 'Digital Marketing Expert'}
                        </p>
                        <p className="small-text text-gray font-400" style={{ margin: 0 }}>
                          {authorBio}
                        </p>
                      </div>
                    </div>
                  </>
                )
              )}
            </div>

            {/* Right Column - Sidebar Widgets */}
            <div className="w-30 md-w-30 sm-w-full sticky-sidebar">
              <>
                {/* Search Widget */}
                {type === 'list' && (
                  <div className="bg-white rounded-5 p-15 mb-12">
                    <div className="relative">
                      <Fields
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(val) => setSearchQuery(val)}
                        outline={true}
                        style={{ paddingRight: '40px' }}
                      />
                      <Icon
                        name="Search"
                        width="18"
                        height="18"
                        className="absolute top-0 right-0 m-11 text-gray"
                        strokeWidth="2"
                      />
                    </div>
                  </div>
                )}

                {/* Table of Contents Widget */}
                {type === 'detail' && content?.sections && (
                  <div className="bg-white rounded-5 p-20 mb-12">
                    <h3 className="headmini-text font-500 text-dark pb-8 bordb">Table of Contents</h3>
                    <div className="grid-cols-1 gap-12 mt-15">
                      {content.sections.map((sec) => (
                        <div key={sec.id} className="toc-item">
                          <a href={`#${sec.id}`} className="toc-link">
                            <p className='mini-text text-gray font-400'>{sec.title}</p>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Categories Widget */}
                {type === 'list' && categoriesList.length > 0 && (
                  <div className="bg-white rounded-5 p-15 mb-12">
                    <h3 className="headmini-text font-500 text-dark pb-8 bordb">Categories</h3>
                    <div className="grid-cols-1 gap-8 mt-8">
                      {categoriesList.map((cat, idx) => (
                        <div
                          key={idx}
                          className={`flex justify-between items-center py-9 px-12 rounded-5 cursor-pointer cat-item-hover ${selectedCategory === cat.name ? 'bg-tertiary text-primary font-600' : 'text-dark'
                            }`}
                          onClick={() => setSelectedCategory(cat.name)}
                        >
                          <p className="text-dark font-500 small-text">{cat.name}</p>
                          <p className="text-gray font-500 mini-text">({cat.count})</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sidebar Popular Posts Widget */}
                {popularPosts.length > 0 && (
                  <div className="bg-white rounded-5 p-15 mb-12">
                    <h3 className="headmini-text font-500 text-dark pb-8 bordb">Popular Posts</h3>
                    <div className="grid-cols-1 gap-12 mt-12">
                      {popularPosts.map((popPost) => (
                        <div
                          key={popPost.id}
                          className="flex items-center gap-12 cursor-pointer"
                          onClick={() => navigate(`/blog-detail/${popPost.id}`)}
                        >
                          <Image
                            src={popPost.image}
                            alt={popPost.title}
                            className="rounded-5 flex w-30"
                            style={{ height: '80px' }}
                          />
                          <div className='w-70'>
                            <h4 className="headmini-text font-500 text-dark line-clamp2">
                              {popPost.title}
                            </h4>
                            <p className="mini-text text-gray" style={{ display: 'block', marginTop: '4px' }}>
                              {formatDate(popPost.datePublished, 'short') || 'May 2024'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sidebar Newsletter Subscribe Widget */}
                <NewsletterForm variant="card" />
              </>
            </div>
          </div>
        </Container>
      </div>

      {type === 'detail' && <FAQSection />}
    </>
  );
};

export default BlogLayout;
