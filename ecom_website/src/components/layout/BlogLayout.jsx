import React, { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../common/Container';
import Icon from '../common/Icon';
import Image from '../common/Image';
import Fields from '../common/Fields';
import Button from '../common/Button';
import Banner from './Banner';
import SeoHelmet from '../seo/SeoHelmet';
import BlogSchema from '../seo/BlogSchema';
import NewsletterForm from '../forms/NewsletterForm';
import Skeleton from '../common/Skeleton';
import LazySection from '../common/LazySection';
import { formatDate } from '../../utils/formatDate';
import { blogMetaTemplate } from '../../seo/metaTemplates';
import { cms } from '../../utils/apiData';

const LatestArticles = lazy(() => import('../../pages/home/sections/LatestArticles'));
const BusinessPromo = lazy(() => import('../../pages/home/sections/BusinessPromo'));

const CATEGORY_COLORS = {
  SEO: "text-info",
  "Social Media": "text-warning",
  "Content Marketing": "text-warning",
};

const lazySections = [
  {
    id: 'articles',
    Component: LatestArticles,
    height: 500,
    version: 'v2',
    fallback: <Skeleton variant="articles" theme="adaptive" />,
  },
  {
    id: 'promo',
    Component: BusinessPromo,
    height: 300,
    version: 'v2',
    fallback: <Skeleton variant="promo" theme="adaptive" />,
  }
];

const BlogLayout = ({
  type = 'list',
  blogsData = [],
  post = null,
  allBlogs = [],
  loading = false,
}) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type, post?.id]);

  const shareUrl = useMemo(() => post?.shareLink || (typeof window !== 'undefined' ? `${window.location.origin}/blog-detail/${post?.id}` : ''), [post]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
  };

  const blogsList = useMemo(() => blogsData.length ? blogsData : allBlogs, [blogsData, allBlogs]);

  const categoriesList = useMemo(() => {
    const counts = {};
    let total = 0;
    blogsList.forEach(({ category }) => category && (counts[category] = (counts[category] || 0) + 1, total++));
    return [
      { name: "All", count: total },
      ...Object.entries(counts).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count)
    ];
  }, [blogsList]);

  const filteredBlogs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return blogsList.filter(blog => {
      const matchCat = !selectedCategory || selectedCategory === "All" || blog.category?.toLowerCase() === selectedCategory.toLowerCase();
      const matchQuery = !query || [blog.title, blog.summary, blog.category].some(field => field?.toLowerCase().includes(query));
      return matchCat && matchQuery;
    });
  }, [blogsList, selectedCategory, searchQuery]);

  const popularPosts = useMemo(() => blogsList.slice(0, 3), [blogsList]);

  const detailData = useMemo(() => {
    if (type !== 'detail' || !post) return null;
    return {
      content: post.content || null,
      authorBio: post.authorBio || '',
      tags: post.keywords?.split(',').map(t => t.trim()) || [],
      formattedDate: formatDate(post.datePublished, 'human') || 'May 20, 2024',
    };
  }, [type, post]);

  const { content, authorBio, tags, formattedDate } = detailData || { content: null, authorBio: '', tags: [], formattedDate: 'May 20, 2024' };

  const socialShares = useMemo(() => [
    {
      name: 'Facebook',
      icon: 'Facebook',
      url: `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      aria: 'Share on Facebook',
      width: '18',
      height: '18',
    },
    {
      name: 'Twitter',
      icon: 'Twitter',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post?.title || '')}`,
      aria: 'Share on Twitter',
      width: '16',
      height: '16',
    },
    {
      name: 'LinkedIn',
      icon: 'LinkedIn',
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post?.title || '')}`,
      aria: 'Share on LinkedIn',
      width: '16',
      height: '16',
    },
  ], [shareUrl, post?.title]);

  const blogMeta = useMemo(() => post ? blogMetaTemplate(post, typeof window !== 'undefined' ? window.location.origin : (import.meta.env.VITE_SITE_URL || 'https://sobo-marketing.com')) : {}, [post]);

  const cardRenderers = useMemo(() => ({
    blogCard: (blog, idx) => {
      const categoryColorClass = CATEGORY_COLORS[blog.category] || "text-primary";
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
                    if (typeof setActivePage !== 'undefined') setActivePage(1);
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
    },
    popularCard: (popPost) => {
      return (
        <div
          key={popPost.id}
          className="flex items-center gap-12 cursor-pointer"
          onClick={() => navigate(`/blog-detail/${popPost.id}`)}
        >
          <Image
            src={popPost.image}
            alt={popPost.title}
            className="rounded-5 flex w-30"
            style={{ height: '80px', objectFit: 'cover' }}
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
      );
    }
  }), [navigate, setSelectedCategory]);



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
      {(type === 'list' || post || loading) && (
        <Banner
          title={type === 'list' ? "Latest Articles" : (post?.category || "Blog")}
          desc={type === 'list' ? "Insights, strategies, and tips to help your business grow with smart marketing." : post?.title}
          breadcrumbs={
            type === 'list' ? (
              [
                { label: 'Home', path: '/home' },
                { label: 'Blog' }
              ]
            ) : post ? (
              [
                { label: 'Home', path: '/home' },
                { label: 'Blog', path: '/blog' },
                { label: post.title }
              ]
            ) : null
          }
          loading={loading}
        />
      )}

      <div className="bg-forth py-50 sm-py-36">
        <Container>
          <div className="flex gap-12 sm-grid-cols-1 w-full">
            {/* Far Left: Sticky Social Share Widget (Desktop Only, Details View Only) */}
            {type === 'detail' && (post || loading) && (
              <div className="w-5 md-hidden sm-hidden">
                {loading ? (
                  <div className="sticky flex flex-column items-center gap-12" style={{ top: '100px' }}>
                    <Skeleton variant="text" width="40px" height="10px" theme="adaptive" />
                    <Skeleton variant="circle" width="40px" height="40px" theme="adaptive" count={4} />
                  </div>
                ) : (
                  <div className="sticky flex flex-column items-center gap-12" style={{ top: '100px' }}>
                    <span className="mini-text text-gray uppercase font-600 tracking-wider mb-5">Share</span>
                    {socialShares.map((share) => (
                      <a
                        key={share.name}
                        href={share.url}
                        target="_blank"
                        rel="noreferrer"
                        className="share-btn"
                        aria-label={share.aria}
                      >
                        <Icon name={share.icon} width={share.width} height={share.height} fill="currentColor" />
                      </a>
                    ))}
                    <Button
                      onClick={copyToClipboard}
                      className="share-btn"
                      title="Copy link"
                      aria-label="Copy link to clipboard"
                      version="v0"
                      bg="transparent"
                      icon="CopyLink"
                      iconWidth="18"
                      iconHeight="18"
                      iconStrokeWidth="2.5"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Left/Center Column - Main Content */}
            <div className='w-70 md-w-70 sm-w-full'>
              {type === 'list' ? (
                <>
                  <div className="flex items-center justify-between sm-grid-cols-1 gap-12 mb-25 sm-mb-15">
                    <h2 className="title-text font-600 text-dark">Latest Articles</h2>
                  </div>

                  {loading ? (
                    <div className="grid-cols-1 gap-12">
                      <Skeleton variant="blog" count={3} />
                    </div>
                  ) : filteredBlogs.length > 0 ? (
                    <div className="grid-cols-1 gap-12">
                      {filteredBlogs.map((blog, idx) => cardRenderers.blogCard(blog, idx))}
                    </div>
                  ) : (
                    <div className="bg-white rounded-5 p-50 text-center border border-gray text-gray">
                      <h3 className="title-text font-700 text-dark mb-10">No articles found</h3>
                      <p className="para-text">Try refining your search terms or selecting another category.</p>
                    </div>
                  )}
                </>
              ) : (
                loading ? (
                  <div className="grid-cols-1 gap-12 w-full">
                    {/* Main Image Skeleton */}
                    <Skeleton variant="rect" width="100%" height="400px" borderRadius="10px" theme="adaptive" />

                    {/* Meta Row Skeleton */}
                    <div className="flex items-center gap-12 py-15" style={{ borderBottom: '1px solid #ececec' }}>
                      <Skeleton variant="circle" width="40px" height="40px" theme="adaptive" />
                      <div className="flex-grow flex flex-column gap-6">
                        <Skeleton variant="text" width="150px" height="14px" theme="adaptive" />
                        <Skeleton variant="text" width="100px" height="10px" theme="adaptive" />
                      </div>
                    </div>

                    {/* Article Body Skeleton */}
                    <div className="flex flex-column gap-12 mt-20">
                      {['30%', '95%', '90%', '85%', '60%'].map((w, i) => (
                        <Skeleton key={i} variant="text" width={w} height={i === 0 ? '24px' : '14px'} theme="adaptive" />
                      ))}
                    </div>

                    <div className="flex flex-column gap-12 mt-25">
                      {['45%', '95%', '90%', '40%'].map((w, i) => (
                        <Skeleton key={i} variant="text" width={w} height={i === 0 ? '24px' : '14px'} theme="adaptive" />
                      ))}
                    </div>

                    {/* Author Bio Box Skeleton */}
                    <div className="rounded-10 mt-18 w-80 p-20 flex gap-12 sm-grid-cols-1 items-start border-ec">
                      <div className='w-15 sm-w-full'>
                        <Skeleton variant="circle" width="80px" height="80px" theme="adaptive" />
                      </div>
                      <div className="w-85 sm-w-full flex flex-column gap-6">
                        <Skeleton variant="text" width="120px" height="18px" theme="adaptive" />
                        <Skeleton variant="text" width="180px" height="12px" theme="adaptive" />
                        <Skeleton variant="text" width="100%" height="14px" theme="adaptive" />
                        <Skeleton variant="text" width="80%" height="14px" theme="adaptive" />
                      </div>
                    </div>
                  </div>
                ) : post && (
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
                      <Button
                        onClick={copyToClipboard}
                        className="share-btn"
                        title="Copy link"
                        aria-label="Copy link to clipboard"
                        version="v0"
                        bg="transparent"
                        icon="CopyLink"
                        iconWidth="16"
                        iconHeight="16"
                        iconStrokeWidth="2"
                      />
                      {socialShares.map((share) => (
                        <a
                          key={share.name}
                          href={share.url}
                          target="_blank"
                          rel="noreferrer"
                          className="share-btn"
                          aria-label={share.aria}
                        >
                          <Icon name={share.icon} width="16" height="16" fill="currentColor" />
                        </a>
                      ))}
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
                      <div className="w-85 sm-w-full ml-12 sm-ml-1">
                        <h4 className="mid-text font-600 text-dark">{post.authorName}</h4>
                        <p className="mini-text text-primary font-500 uppercase tracking-wide mb-5">
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
                {type === 'detail' && (
                  loading ? (
                    <div className="bg-white rounded-5 p-20 mb-12">
                      <Skeleton variant="text" width="60%" height="20px" theme="adaptive" />
                      <div className="grid-cols-1 gap-12 mt-15">
                        {['80%', '70%', '90%', '75%'].map((w, i) => (
                          <Skeleton key={i} variant="text" width={w} height="14px" theme="adaptive" />
                        ))}
                      </div>
                    </div>
                  ) : content?.sections && (
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
                  )
                )}

                {/* Categories Widget */}
                {type === 'list' && (loading || categoriesList.length > 0) && (
                  <div className="bg-white rounded-5 p-15 mb-12">
                    <h3 className="headmini-text font-500 text-dark pb-8 bordb">Categories</h3>
                    <div className="grid-cols-1 gap-8 mt-8">
                      {loading ? (
                        Array.from({ length: 5 }).map((_, idx) => (
                          <div key={idx} className="flex justify-between items-center py-9 px-12">
                            <Skeleton variant="text" width="60%" height="12px" theme="adaptive" style={{ margin: 0 }} />
                            <Skeleton variant="text" width="20px" height="12px" theme="adaptive" style={{ margin: 0 }} />
                          </div>
                        ))
                      ) : (
                        categoriesList.map((cat, idx) => (
                          <div
                            key={idx}
                            className={`flex justify-between items-center py-9 px-12 rounded-5 cursor-pointer cat-item-hover ${selectedCategory === cat.name ? 'bg-tertiary text-primary font-600' : 'text-dark'
                              }`}
                            onClick={() => setSelectedCategory(cat.name)}
                          >
                            <p className="text-dark font-500 small-text">{cat.name}</p>
                            <p className="text-gray font-500 mini-text">({cat.count})</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* Sidebar Popular Posts Widget */}
                {(loading || popularPosts.length > 0) && (
                  <div className="bg-white rounded-5 p-15 mb-12">
                    <h3 className="headmini-text font-500 text-dark pb-8 bordb">Popular Posts</h3>
                    <div className="grid-cols-1 gap-12 mt-12">
                      {loading ? (
                        Array.from({ length: 3 }).map((_, idx) => (
                          <div key={idx} className="flex items-center gap-12">
                            <div className="w-30 flex-shrink-0">
                              <Skeleton variant="rect" width="100%" height="60px" borderRadius="5px" theme="adaptive" />
                            </div>
                            <div className="w-70 flex flex-column gap-6">
                              {['90%', '60%', '40%'].map((w, i) => (
                                <Skeleton key={i} variant="text" width={w} height={i === 2 ? '10px' : '12px'} theme="adaptive" style={{ margin: 0 }} />
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        popularPosts.map((popPost) => cardRenderers.popularCard(popPost))
                      )}
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

      {lazySections.filter(s => s.id !== 'articles' || type === 'detail').map(({ Component, height, fallback, containerClass, containerStyle, version, noContainer, id }) => (
        <LazySection key={id} placeholderHeight={height}>
          <Suspense fallback={
            noContainer ? fallback : (
              <Container
                className={containerClass || ''}
                style={containerStyle || {}}
                version={version || 'v2'}
              >
                {fallback}
              </Container>
            )
          }>
            {noContainer ? (
              <Component cms={cms} />
            ) : (
              <Container
                className={containerClass || ''}
                style={containerStyle || {}}
                version={version || 'v2'}
              >
                <Component cms={cms} />
              </Container>
            )}
          </Suspense>
        </LazySection>
      ))}
    </>
  );
};

export default BlogLayout;
