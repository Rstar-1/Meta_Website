import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import blogs from '../../data/blogs.json';
import SeoHelmet from '../../components/seo/SeoHelmet';
import BlogSchema from '../../components/seo/BlogSchema';
import Container from '../../components/common/Container';
import Fade from '../../components/common/Fade';
import Icon from '../../components/common/Icon';
import Image from '../../components/common/Image';
import LatestArticles from '../home/sections/LatestArticles';

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
      post.summary || "In today's digital world, success depends on having a clear, data-driven approach to marketing.",
      post.description || "In this article, we outline key considerations, strategies, and methodologies to optimize your channels and reach your business goals."
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

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Scroll to top on mount or ID change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const post = useMemo(() => {
    return blogs.find((b) => b.id === id) || blogs[0];
  }, [id]);

  const content = useMemo(() => {
    return getBlogContent(post.id, post);
  }, [post]);

  const authorBio = useMemo(() => {
    return getAuthorBio(post.authorName);
  }, [post.authorName]);



  // First 3 popular posts for sidebar
  const popularPosts = useMemo(() => {
    return blogs.slice(0, 3);
  }, []);

  const tags = useMemo(() => {
    return post.keywords ? post.keywords.split(',').map((t) => t.trim()) : [];
  }, [post.keywords]);

  const formattedDate = useMemo(() => {
    return post.datePublished
      ? new Date(post.datePublished).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      : 'May 20, 2024';
  }, [post.datePublished]);

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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  return (
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

      {/* Embedded CSS for custom details specific to BlogDetail layouts (social buttons, Table of Contents etc) */}
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
        .toc-link {
          color: var(--gray);
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .toc-link:hover {
          color: var(--primary);
        }
        .toc-active-item {
          border-left: 2px solid var(--primary);
          padding-left: 10px;
        }
        .toc-active-item .toc-link {
          color: var(--primary) !important;
          font-weight: 600;
        }
        .popular-item:hover h4 {
          color: var(--primary) !important;
        }
        .author-bio-box {
          border: 1px solid #e5e7eb;
          background: #f8fafc;
        }
        .related-card {
          border: 1px solid #e5e7eb;
          transition: all 0.25s ease;
        }
        .related-card:hover {
          transform: translateY(-3px);
          box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.05);
        }
      `}</style>

      {/* --- Premium Deep Blue Gradient Banner (Hero Section) --- */}
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

      {/* --- Main Reading Section --- */}
      <div className="bg-forth py-60">
        <Container version="v2">
          <div className="flex gap-12 sm-grid-cols-1">

            {/* Far Left: Sticky Social Share Widget (Desktop Only) */}
            <div className="w-5 md-hidden sm-hidden">
              <div className="sticky flex flex-column items-center gap-12" style={{ top: '100px' }}>
                <span className="mini-text text-gray uppercase font-600 tracking-wider mb-5">
                  Share
                </span>

                {/* Facebook Share */}
                <a
                  href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    window.location.href
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="share-btn"
                >
                  <Icon name="Facebook" width="18" height="18" fill="currentColor" />
                </a>

                {/* Twitter Share */}
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    window.location.href
                  )}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="share-btn"
                >
                  <Icon name="Twitter" width="16" height="16" fill="currentColor" />
                </a>

                {/* LinkedIn Share */}
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

                {/* Copy URL */}
                <button onClick={copyToClipboard} className="share-btn" title="Copy link">
                  <Icon name="CopyLink" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" />
                </button>
              </div>
            </div>

            {/* Left/Center Column - Post Content */}
            <div className="w-65 md-w-70 sm-w-full">
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

                {/* Mobile Social Share Row (Hidden on Desktop) */}
                <div className="hidden sm-flex md-flex gap-10 items-center mb-25 bg-white p-12 rounded-5 border-ec">
                  <span className="small-text font-600 text-dark">Share:</span>
                  <button onClick={copyToClipboard} className="share-btn" title="Copy link">
                    <Icon name="CopyLink" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" />
                  </button>
                  <a
                    href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      window.location.href
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="share-btn"
                  >
                    <Icon name="Facebook" width="16" height="16" fill="currentColor" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      window.location.href
                    )}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="share-btn"
                  >
                    <Icon name="Twitter" width="14" height="14" fill="currentColor" />
                  </a>
                </div>

                {/* Article Body */}
                <div className="blog-body-text">
                  {/* Introductory paragraphs */}
                  {content.intro.map((p, idx) => (
                    <p key={idx} className="para-text text-dark font-400">
                      {p}
                    </p>
                  ))}

                  {/* Subsections with titles */}
                  {content.sections.map((section) => (
                    <section key={section.id} id={section.id} className="pt-10">
                      <h3 className="mid-text font-600 text-dark pt-10">{section.title}</h3>
                      <p className="para-text text-dark font-400">{section.text}</p>
                    </section>
                  ))}

                  {/* Quote Banner */}
                  {content.quote && (
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

                  {/* Outro paragraphs */}
                  {content.outro && <p className="para-text text-dark font-400">{content.outro}</p>}
                </div>

                {/* Horizontal Tags Block */}
                {tags.length > 0 && (
                  <div className="flex items-center gap-8 flex-wrap pt-25 pb-15 border-top border-bottom mt-35 mb-35">
                    <span className="small-text font-600 text-dark">Tags:</span>
                    {tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-12 py-5 rounded-5 bg-light-primary text-primary font-500 mini-text"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Author Bio Card Widget */}
                <div className="author-bio-box rounded-10 p-20 flex gap-20 sm-grid-cols-1 items-start">
                  <Image
                    src={
                      post.authorAvatar ||
                      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
                    }
                    alt={post.authorName}
                    className="rounded-full flex"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                  <div className="flex-1">
                    <h4 className="mid-text font-600 text-dark">{post.authorName}</h4>
                    <p className="mini-text text-primary font-500 uppercase tracking-wide mb-8">
                      Digital Marketing Expert
                    </p>
                    <p className="small-text text-gray font-400" style={{ margin: 0 }}>
                      {authorBio}
                    </p>
                    {/* Author Social Media Handles */}
                    <div className="flex gap-10 mt-12">
                      <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                        <Icon
                          name="LinkedInOutline"
                          width="16"
                          height="16"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-gray hover:text-primary transition-all"
                        />
                      </a>
                      <a href="https://twitter.com" target="_blank" rel="noreferrer">
                        <Icon
                          name="TwitterOutline"
                          width="16"
                          height="16"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-gray hover:text-primary transition-all"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </Fade>
            </div>

            {/* Right Column - Sidebar Widgets */}
            <div className="w-30 md-w-30 sm-w-full">
              <Fade direction="up" distance={30} delay={200}>
                {/* Table of Contents Widget */}
                <div className="bg-white rounded-10 p-20 mb-20 border-ec">
                  <h3 className="mid-text font-600 text-dark pb-12 border-bottom">
                    Table of Contents
                  </h3>
                  <div className="flex flex-column gap-12 mt-15">
                    {content.sections.map((sec, idx) => (
                      <div key={sec.id} className="toc-item font-500 small-text">
                        <a href={`#${sec.id}`} className="toc-link block py-2">
                          {sec.title}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sidebar Popular Posts Widget */}
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
                          <span
                            className="mini-text text-gray"
                            style={{ display: 'block', marginTop: '4px' }}
                          >
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

      {/* --- Latest Articles Section (At Bottom) --- */}
      <LatestArticles />
    </>
  );
};

export default BlogDetail;
