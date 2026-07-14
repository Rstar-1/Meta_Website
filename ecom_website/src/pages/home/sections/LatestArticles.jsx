import React from 'react';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
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
    <Container className='bg-forth'>
      <div className='py-80'>
        <Image
          src="https://demo.alhikmahsoft.com/template/stir/assets/images/faq-img.jpg"
          alt="Digital Agency Team"
          className="w-full object-cover h-250 flex rounded-5"
        />

        <div className='mt-20'>
          <Accordion items={faqs} allowMultiple={false} />
        </div>
      </div>
    </Container>
  );
};

export default LatestArticles;
