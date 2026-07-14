import React, { useState } from 'react';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';

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

  const [activeId, setActiveId] = useState(1);

  const toggleItem = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <Container className='bg-forth'>
      <div className='py-80'>
        <Image
          src="https://demo.alhikmahsoft.com/template/stir/assets/images/faq-img.jpg"
          alt="Digital Agency Team"
          className="w-full object-cover h-250 flex rounded-5"
        />

        <div className='grid-cols-1 gap-4 mt-20'>
          {faqs.map((item, idx) => {
            const isOpen = activeId === item.id;
            const numStr = String(idx + 1).padStart(2, '0');

            return (
              <div
                key={item.id}
                style={{
                  borderBottom: '1px solid #e5e7eb',
                  padding: '28px 0',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '24px',
                    cursor: 'pointer',
                  }}
                  onClick={() => toggleItem(item.id)}
                >
                  {/* Number Circle */}
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      border: '1px solid #d1d5db',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontSize: '15px',
                      fontWeight: '500',
                      color: 'var(--dark)',
                      transition: 'border-color 0.3s ease',
                    }}
                  >
                    {numStr}
                  </div>

                  {/* Question and Answer Content */}
                  <div style={{ flex: 1, paddingTop: '10px' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '16px',
                      }}
                    >
                      <h3
                        className="text-dark"
                        style={{
                          fontSize: '18px',
                          fontWeight: '600',
                          lineHeight: '1.4',
                          margin: 0,
                        }}
                      >
                        {item.question}
                      </h3>

                      {/* Plus/Minus Sign */}
                      <span
                        style={{
                          fontSize: isOpen ? '28px' : '22px',
                          fontWeight: '400',
                          lineHeight: '1',
                          color: isOpen ? 'var(--warningtext)' : 'var(--dark)',
                          userSelect: 'none',
                          transition: 'color 0.2s ease',
                          display: 'inline-block',
                          transform: isOpen ? 'translateY(-2px)' : 'none',
                        }}
                      >
                        {isOpen ? '−' : '+'}
                      </span>
                    </div>

                    {/* Answer content (collapsible) */}
                    <div
                      style={{
                        maxHeight: isOpen ? '200px' : '0px',
                        opacity: isOpen ? 1 : 0,
                        overflow: 'hidden',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      <p
                        className="text-gray"
                        style={{
                          fontSize: '15px',
                          lineHeight: '26px',
                          marginTop: '16px',
                          marginBottom: 0,
                          paddingRight: '40px',
                        }}
                      >
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default LatestArticles;
