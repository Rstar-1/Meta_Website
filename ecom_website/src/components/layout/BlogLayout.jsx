import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../common/Container';
import Fade from '../common/Fade';
import Icon from '../common/Icon';
import Image from '../common/Image';
import Banner from './Banner';
import SeoHelmet from '../seo/SeoHelmet';
import BlogSchema from '../seo/BlogSchema';
import LatestArticles from '../../pages/home/sections/LatestArticles';

// Helper to get detailed mock content for each blog post to build a rich, premium reading experience
const getBlogContent = (postId, post) => {
  if (postId === 'post-1') {
    return {
      intro: [
        "In today's competitive digital landscape, having a solid marketing strategy is more important than ever. Whether you're a startup or an established business, the right digital marketing tactics can help you reach your target audience, build brand awareness, and drive revenue.",
        "Here are 5 proven digital marketing strategies to grow your business in 2024."
      ],
      sections: [
        {
          id: "seo",
          title: "1. Search Engine Optimization (SEO)",
          text: "SEO remains one of the most effective ways to drive organic traffic to your website. Optimize your content with relevant keywords, improve site speed, build quality backlinks, and ensure your website is mobile-friendly."
        },
        {
          id: "content",
          title: "2. Content Marketing",
          text: "High-quality content builds trust and establishes your brand as an authority. Create blog posts, guides, videos, and infographics that educate your audience and solve their problems."
        },
        {
          id: "social",
          title: "3. Social Media Marketing",
          text: "Leverage platforms like Facebook, Instagram, LinkedIn, and Twitter to connect with your audience. Share valuable content, engage with followers, and run targeted ad campaigns."
        },
        {
          id: "email",
          title: "4. Email Marketing",
          text: "Email marketing offers one of the highest ROI. Build an email list and send personalized campaigns, newsletters, and offers to nurture leads and retain customers."
        },
        {
          id: "ppc",
          title: "5. Pay-Per-Click (PPC) Advertising",
          text: "PPC campaigns on Google Ads, Bing, and social media platforms can help you reach a highly targeted audience and generate instant traffic."
        }
      ],
      quote: "Success in digital marketing comes from combining the right strategies, analyzing results, and continuously optimizing for better performance.",
      outro: "The digital marketing landscape is constantly evolving, but these strategies will help you stay ahead of the competition and achieve sustainable growth in 2024 and beyond."
    };
  }

  if (postId === 'post-2') {
    return {
      intro: [
        "On-page SEO forms the foundation of all successful search engine visibility. If search engines can't crawl, understand, and value your content, off-page strategies won't save you.",
        "This checklist outlines the exact step-by-step process to optimize your website for maximum visibility and organic rankings."
      ],
      sections: [
        {
          id: "titles",
          title: "1. Title Tags & Meta Descriptions",
          text: "Your title tag is the single most important on-page SEO element. Keep it under 60 characters, place your target keyword near the front, and make it highly click-worthy."
        },
        {
          id: "headings",
          title: "2. Heading Structure (H1-H6)",
          text: "Use a single H1 tag for your page title containing your primary keyword. Organize subtopics using H2 and H3 tags to create a logical content hierarchy for readers and search engines."
        },
        {
          id: "images",
          title: "3. Image Optimization",
          text: "Always use descriptive file names (e.g. on-page-seo-checklist.jpg) and write descriptive alt text containing your secondary keywords for accessibility and image search."
        },
        {
          id: "internal",
          title: "4. Internal Linking",
          text: "Link to relevant internal pages to distribute link equity and help search engines understand page relationships. Use descriptive anchor text."
        },
        {
          id: "speed",
          title: "5. Page Loading Speed",
          text: "Optimize page loading times by compressing images, minifying code, and leveraging browser caching to improve search rankings and user retention."
        }
      ],
      quote: "Creating high-value content that matches search intent is the single most important factor for long-term SEO success.",
      outro: "By following this checklist, you will ensure that search engines can easily find, understand, and rank your content for your target keywords."
    };
  }

  // Fallback content for other post IDs
  return {
    intro: [
      post?.summary || "In today's digital world, success depends on having a clear, data-driven approach to marketing.",
      post?.description || "In this article, we outline key considerations, strategies, and methodologies to optimize your channels and reach your business goals."
    ],
    sections: [
      {
        id: "strategy",
        title: "1. Establish Core Goals",
        text: "Before building any campaigns, define clear, measurable objectives that align with your broader business strategy."
      },
      {
        id: "audience",
        title: "2. Analyze Target Audiences",
        text: "Understand your prospects' pain points, demographics, and favorite channels to tailormake your marketing messages."
      },
      {
        id: "channels",
        title: "3. Choose Key Channels",
        text: "Focus your energy and budget on the platforms where your target audience is most active and receptive to your messages."
      },
      {
        id: "execution",
        title: "4. Execute and Iterate",
        text: "Launch your campaigns and monitor metrics closely to make data-driven adjustments and optimization choices."
      }
    ],
    quote: "A strategy is only as good as its execution and the responsiveness of your team to real-time marketing data.",
    outro: "Consistency, quality content, and regular analysis are the core pillars of any successful campaign in today's digital landscape."
  };
};

const getAuthorBio = (authorName) => {
  switch (authorName) {
    case "John Smith":
      return "John is a digital marketing strategist with over 8 years of experience helping businesses grow online. He specializes in SEO, content marketing, and data-driven strategies.";
    case "Sarah Johnson":
      return "Sarah is an SEO consultant and writer with a passion for helping brands rank higher. She has worked with Fortune 500 companies to optimize their search presence.";
    case "Michael Brown":
      return "Michael is a social media strategist specializing in community building and organic brand growth. He teaches businesses how to drive actual sales through social channels.";
    case "Emily Davis":
      return "Emily is an analytics specialist and marketing auditor. She helps organizations set up proper attribution modeling and optimize their marketing spend.";
    default:
      return "A seasoned marketing specialist and consultant who focuses on data-driven growth strategies, high-quality content production, and conversion optimization.";
  }
};

const BlogLayout = ({
  type = 'list', // 'list' or 'detail'
  blogsData = [],
  post = null,
  allBlogs = [],
}) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Scroll to top on type or post change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type, post?.id]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setIsSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
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
      return getBlogContent(post.id, post);
    }
    return null;
  }, [type, post]);

  const authorBio = useMemo(() => {
    if (post) {
      return getAuthorBio(post.authorName);
    }
    return '';
  }, [post]);

  const tags = useMemo(() => {
    return post?.keywords ? post.keywords.split(',').map((t) => t.trim()) : [];
  }, [post?.keywords]);

  const formattedDate = useMemo(() => {
    return post?.datePublished
      ? new Date(post.datePublished).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      : 'May 20, 2024';
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

  return (
    <>
      {type === 'detail' && post && (
        <>
          <SeoHelmet
            title={post.title}
            description={post.summary}
            keywords={post.keywords}
            image={post.image}
            path={`/blog/${post.slug}`}
            type="article"
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
          background-color: #f8fafc;
          border-left: 4px solid var(--primary);
          padding: 20px 25px;
          margin: 30px 0px;
          border-radius: 0px 8px 8px 0px;
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
      `}</style>

      {/* --- Page Banner / Hero --- */}
      {type === 'list' ? (
        <Banner
          style={{ background: "linear-gradient(135deg, #021B44 0%, #00102A 100%)" }}
          img="https://metatechnical.org/images/banners/blog.png"
          title="Latest Articles"
          desc="Insights, strategies, and tips to help your business grow with smart marketing."
        />
      ) : (
        post && (
          <div
            className="w-full text-white py-60 px-10 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #021B44 0%, #00102A 100%)' }}
          >
            <Container>
              <div>
                {/* Breadcrumbs */}
                <div className="flex items-center gap-8 text-white opacity-70 mb-15 small-text flex-wrap">
                  <span className="cursor-pointer hover:underline" onClick={() => navigate('/')}>
                    Home
                  </span>
                  <span>&gt;</span>
                  <span className="cursor-pointer hover:underline" onClick={() => navigate('/blog')}>
                    Blog
                  </span>
                  <span>&gt;</span>
                  <span className="line-clamp1 font-400">{post.title}</span>
                </div>

                {/* Category Pill Tag */}
                <span
                  className="px-12 py-4 rounded-50 text-white font-600 mini-text uppercase tracking-wider inline-block mb-15"
                  style={{ backgroundColor: '#2563eb' }}
                >
                  {post.category}
                </span>

                {/* Post Title */}
                <h1 className="large-text font-700 text-white leading-tight mb-20">{post.title}</h1>

                {/* Metadata: Author, Date, Read Time */}
                <div className="flex items-center gap-12 sm-grid-cols-1 flex-wrap">
                  <div className="flex items-center gap-10">
                    <Image
                      src={
                        post.authorAvatar ||
                        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
                      }
                      alt={post.authorName}
                      className="rounded-full"
                      style={{ width: '36px', height: '36px', objectFit: 'cover' }}
                    />
                    <span className="small-text font-500 text-white">By {post.authorName}</span>
                  </div>
                  <span className="hidden sm-hidden md-block text-white opacity-50">•</span>
                  <span className="small-text opacity-80">{formattedDate}</span>
                  <span className="hidden sm-hidden md-block text-white opacity-50">•</span>
                  <span className="small-text opacity-80">{post.readTime || '5 min read'}</span>
                </div>
              </div>
            </Container>
          </div>
        )
      )}

      <div className="bg-forth py-50">
        <Container version="v2">
          <div className="flex gap-12 sm-grid-cols-1">
            {/* Far Left: Sticky Social Share Widget (Desktop Only, Details View Only) */}
            {type === 'detail' && post && (
              <div className="w-5 md-hidden sm-hidden">
                <div className="sticky flex flex-column items-center gap-12" style={{ top: '100px' }}>
                  <span className="mini-text text-gray uppercase font-600 tracking-wider mb-5">Share</span>
                  <a
                    href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="share-btn"
                  >
                    <Icon name="Facebook" width="18" height="18" fill="currentColor" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(
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
                      window.location.href
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
            <div className={`${type === 'detail' ? 'w-65' : 'w-70'} md-w-70 sm-w-full`}>
              {type === 'list' ? (
                <>
                  <div className="flex items-center justify-between sm-grid-cols-1 gap-12 mb-25">
                    <h2 className="title-text font-600 text-dark">Latest Articles</h2>
                  </div>

                  {filteredBlogs.length > 0 ? (
                    <div className="grid-cols-1 gap-12">
                      {filteredBlogs.map((blog, idx) => {
                        const categoryColorClass = getCategoryColor(blog.category);
                        const itemFormattedDate = blog.datePublished
                          ? new Date(blog.datePublished).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                          : 'May 20, 2024';

                        return (
                          <Fade key={blog.id} direction="up" distance={40} delay={100 + idx * 100}>
                            <article className="blog-card-hover flex sm-grid-cols-1 bg-white rounded-5 overflow-hidden mb-20">
                              {/* Card Image */}
                              <div
                                className="w-40 sm-w-full overflow-hidden cursor-pointer"
                                onClick={() => navigate(`/blog-detail/${blog.id}`)}
                              >
                                <Image
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
                            </article>
                          </Fade>
                        );
                      })}

                      {/* Pagination */}
                      <div className="flex items-center gap-8 mt-40">
                        <button
                          className={`p-10 px-15 rounded-5 border cursor-pointer font-500 ${activePage === 1 ? 'bg-primary text-white border-primary font-600' : 'bg-white border-gray text-dark cat-item-hover'
                            }`}
                          onClick={() => setActivePage(1)}
                        >
                          1
                        </button>
                        <button
                          className={`p-10 px-15 rounded-5 border cursor-pointer font-500 ${activePage === 2 ? 'bg-primary text-white border-primary font-600' : 'bg-white border-gray text-dark cat-item-hover'
                            }`}
                          onClick={() => setActivePage(2)}
                        >
                          2
                        </button>
                        <button
                          className={`p-10 px-15 rounded-5 border cursor-pointer font-500 ${activePage === 3 ? 'bg-primary text-white border-primary font-600' : 'bg-white border-gray text-dark cat-item-hover'
                            }`}
                          onClick={() => setActivePage(3)}
                        >
                          3
                        </button>
                        <span className="text-gray font-600 px-5">...</span>
                        <button
                          className={`p-10 px-15 rounded-5 border cursor-pointer font-500 ${activePage === 10 ? 'bg-primary text-white border-primary font-600' : 'bg-white border-gray text-dark cat-item-hover'
                            }`}
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
                </>
              ) : (
                post && (
                  <Fade direction="up" distance={30} delay={100}>
                    {/* Main Article Image */}
                    <div className="overflow-hidden rounded-10 mb-35">
                      <Image
                        src={post.image}
                        alt={post.title}
                        className="w-full object-cover flex"
                        style={{ maxHeight: '420px', borderRadius: '10px' }}
                      />
                    </div>

                    {/* Mobile Social Share Row */}
                    <div className="hidden sm-flex md-flex gap-10 items-center mb-25 bg-white p-12 rounded-5 border-ec">
                      <span className="small-text font-600 text-dark">Share:</span>
                      <button onClick={copyToClipboard} className="share-btn" title="Copy link">
                        <Icon name="CopyLink" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" />
                      </button>
                      <a
                        href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="share-btn"
                      >
                        <Icon name="Facebook" width="16" height="16" fill="currentColor" />
                      </a>
                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(
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
                        <p key={idx} className="para-text text-dark font-400">
                          {p}
                        </p>
                      ))}

                      {content?.sections.map((section) => (
                        <section key={section.id} id={section.id} className="pt-10">
                          <h3 className="mid-text font-600 text-dark pt-10">{section.title}</h3>
                          <p className="para-text text-dark font-400">{section.text}</p>
                        </section>
                      ))}

                      {content?.quote && (
                        <div className="blockquote-container">
                          <div className="blockquote-text relative">
                            <span
                              className="absolute text-primary"
                              style={{
                                fontSize: '4.5rem',
                                fontFamily: 'serif',
                                opacity: 0.15,
                                top: '-35px',
                                left: '-15px',
                                lineHeight: 1,
                              }}
                            >
                              “
                            </span>
                            {content.quote}
                          </div>
                        </div>
                      )}

                      {content?.outro && <p className="para-text text-dark font-400">{content.outro}</p>}
                    </div>

                    {/* Tags */}
                    {tags.length > 0 && (
                      <div className="flex items-center gap-8 flex-wrap py-20 bordb">
                        <span className="small-text font-600 text-dark">Tags:</span>
                        {tags.map((t, idx) => (
                          <span key={idx} className="px-12 py-5 rounded-5 bg-light-primary text-primary font-500 mini-text">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Author Bio Box */}
                    <div className="rounded-5 mt-18 p-20 flex gap-20 sm-grid-cols-1 items-start border-ec">
                      <div className='w-15 sm-w-full'>
                        <Image
                          src={
                            post.authorAvatar ||
                            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
                          }
                          alt={post.authorName}
                          className="rounded-full flex"
                          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                        />
                      </div>
                      <div className="w-85 sm-w-full">
                        <h4 className="mid-text font-600 text-dark">{post.authorName}</h4>
                        <p className="mini-text text-primary font-500 uppercase tracking-wide mb-8">
                          Digital Marketing Expert
                        </p>
                        <p className="small-text text-gray font-400" style={{ margin: 0 }}>
                          {authorBio}
                        </p>
                        <div className="flex gap-10 mt-12">
                          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                            <Icon
                              name="LinkedIn"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="text-gray hover:text-primary transition-all"
                            />
                          </a>
                          <a href="https://twitter.com" target="_blank" rel="noreferrer">
                            <Icon
                              name="Twitter"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="text-gray hover:text-primary transition-all"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </Fade>
                )
              )}
            </div>

            {/* Right Column - Sidebar Widgets */}
            <div className="w-30 md-w-30 sm-w-full">
              <Fade direction="up" distance={30} delay={200}>
                {/* Search Widget */}
                {type === 'list' && (
                  <div className="bg-white rounded-10 p-20 mb-20 border-ec">
                    <h3 className="mid-text font-600 text-dark pb-12 border-bottom">Search</h3>
                    <div className="relative mt-15">
                      <input
                        type="text"
                        placeholder="Search articles..."
                        className="h-input w-full pr-40 border-0"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setActivePage(1);
                        }}
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
                  <div className="bg-white rounded-10 p-20 mb-20 border-ec">
                    <h3 className="mid-text font-600 text-dark pb-12 border-bottom">Table of Contents</h3>
                    <div className="flex flex-column gap-12 mt-15">
                      {content.sections.map((sec) => (
                        <div key={sec.id} className="toc-item font-500 small-text">
                          <a href={`#${sec.id}`} className="toc-link block py-2">
                            {sec.title}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Categories Widget */}
                {type === 'list' && categoriesList.length > 0 && (
                  <div className="bg-white rounded-10 p-20 mb-20 border-ec">
                    <h3 className="mid-text font-600 text-dark pb-12 border-bottom">Categories</h3>
                    <div className="flex flex-column gap-8 mt-15">
                      {categoriesList.map((cat, idx) => (
                        <div
                          key={idx}
                          className={`flex justify-between items-center p-10 rounded-5 cursor-pointer font-500 small-text cat-item-hover ${selectedCategory === cat.name ? 'bg-tertiary text-primary font-600' : 'text-dark'
                            }`}
                          onClick={() => {
                            setSelectedCategory(cat.name);
                            setActivePage(1);
                          }}
                        >
                          <span>{cat.name}</span>
                          <span className="text-gray small-text">({cat.count})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sidebar Popular Posts Widget */}
                {popularPosts.length > 0 && (
                  <div className="bg-white rounded-10 p-20 mb-20 border-ec">
                    <h3 className="mid-text font-600 text-dark pb-12 border-bottom">Popular Posts</h3>
                    <div className="flex flex-column gap-16 mt-15">
                      {popularPosts.map((popPost) => (
                        <div
                          key={popPost.id}
                          className="popular-item flex items-center gap-12 cursor-pointer"
                          onClick={() => navigate(`/blog-detail/${popPost.id}`)}
                        >
                          <Image
                            src={popPost.image}
                            alt={popPost.title}
                            className="rounded-5 flex"
                            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                          />
                          <div>
                            <h4 className="headmini-text font-500 text-dark line-clamp2 leading-tight">
                              {popPost.title}
                            </h4>
                            <span className="mini-text text-gray" style={{ display: 'block', marginTop: '4px' }}>
                              {popPost.datePublished
                                ? new Date(popPost.datePublished).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                })
                                : 'May 2024'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sidebar Newsletter Subscribe Widget */}
                <div className="bg-dark text-white rounded-10 p-20 mb-20 relative overflow-hidden">
                  <Icon
                    name="Send"
                    width="42"
                    height="42"
                    className="absolute text-white"
                    strokeWidth="1.5"
                    style={{
                      color: 'rgba(255, 255, 255, 0.05)',
                      right: '15px',
                      top: '15px',
                      pointerEvents: 'none',
                    }}
                  />

                  <h3 className="mid-text font-600 text-white mb-6">Subscribe to Our Newsletter</h3>
                  <p className="mini-text text-white opacity-80 mb-15 leading-tight">
                    Get the latest marketing insights and strategies straight to your inbox.
                  </p>

                  {isSubscribed ? (
                    <div className="p-10 bg-light-success text-success rounded-5 font-600 small-text text-center">
                      ✓ Subscribed successfully!
                    </div>
                  ) : (
                    <form onSubmit={handleSubscribe} className="flex bg-white rounded-5 overflow-hidden">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="h-input bg-white p-10 border-0 flex-1"
                        style={{ outline: 'none', fontSize: '13px', width: '100%' }}
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        required
                      />
                      <button
                        type="submit"
                        className="bg-primary text-white font-600 px-15 border-0 cursor-pointer hover:opacity-90"
                        style={{ fontSize: '13px' }}
                      >
                        Subscribe
                      </button>
                    </form>
                  )}
                  <p className="mini-text text-white opacity-60 mt-12" style={{ margin: 0 }}>
                    No spam, unsubscribe anytime.
                  </p>
                </div>
              </Fade>
            </div>
          </div>
        </Container>
      </div>

      {/* --- Latest Articles Section (At Bottom, Details View Only) --- */}
      {type === 'detail' && <LatestArticles />}
    </>
  );
};

export default BlogLayout;
