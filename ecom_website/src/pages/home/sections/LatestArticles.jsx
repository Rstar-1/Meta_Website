import React from 'react';
import Container from '../../../components/common/Container';
import Accordion from '../../../components/common/Accordion';

const LatestArticles = () => {
  const faqs = [
    {
      id: 1,
      question: "What services does SOBO Marketing Solution offer?",
      answer: "We offer a wide range of services including branding design, website development, digital marketing, social media management, search engine optimization (SEO), and analytics performance tracking."
    },
    {
      id: 2,
      question: "How do you ensure high-quality delivery for B2B industrial clients?",
      answer: "We leverage industry-specific market insights, custom branding strategies, and modern technologies to craft websites and campaigns that resonate with industrial B2B audiences and generate qualified leads."
    },
    {
      id: 3,
      question: "Can I customize the marketing packages for my brand?",
      answer: "Yes, absolutely! We believe every business is unique. We offer tailor-made strategies and flexible pricing models to suit your specific growth objectives and budget requirements."
    },
    {
      id: 4,
      question: "How do I get started with a design or marketing workshop?",
      answer: "You can easily get started by navigating to our Connect page or clicking the 'Explore More' / 'Let's Talk' button. Fill out the contact form, and our team will reach out within 24 hours to schedule a consultation."
    }
  ];

  return (
    <Container>
      <style>{`
        @keyframes scrollMarqueeBlog {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-blog-container {
          overflow: hidden;
          white-space: nowrap;
          width: 100%;
          background: #ffffff;
          padding: 30px 0;
          border-top: 1px solid #eeeeee;
          border-bottom: 1px solid #eeeeee;
        }
        .marquee-blog-content {
          display: inline-block;
          animation: scrollMarqueeBlog 20s linear infinite;
        }
        .marquee-blog-text {
          font-size: 80px;
          font-weight: 800;
          color: transparent;
          -webkit-text-stroke: 1px #dddddd;
          margin-right: 50px;
          text-transform: uppercase;
        }
        .blog-card {
          border-radius: 24px;
          overflow: hidden;
          background: #ffffff;
          box-shadow: 0 10px 30px rgba(0,0,0,0.02);
          transition: all 0.4s ease;
        }
        .blog-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.08);
        }
        .blog-img-wrap {
          position: relative;
          overflow: hidden;
          border-radius: 24px;
        }
        .blog-img {
          transition: transform 0.6s ease;
        }
        .blog-card:hover .blog-img {
          transform: scale(1.05);
        }
      `}</style>

      {/* FAQ Section */}
      <div className="w-full py-60">
        <div className="text-center mb-40">
          <p className="text-primary font-500 uppercase small-text">FAQ</p>
          <h2 className="text-dark font-600 head-text uppercase pt-8">
            Frequently Asked Questions
          </h2>
        </div>

        <div>
          <Accordion items={faqs} allowMultiple={false} />
        </div>
      </div>
    </Container>
  );
};

export default LatestArticles;
