import React from 'react';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Accordion from '../../../components/common/Accordion';

const FAQSection = () => {
  const faqs = [
    {
      id: 1,
      question: "What services does your digital agency offer?",
      answer: "We offer full-service digital solutions including custom website development, Meta/social media advertising campaigns, advanced search engine optimization (SEO), branding design, and growth analytics."
    },
    {
      id: 2,
      question: "How do you design and optimize campaigns for lead generation?",
      answer: "We combine modern UX design, data-driven Meta campaigns, and targeted search optimization. Every project includes comprehensive keyword research and high-accuracy conversion tracking to maximize ROI."
    },
    {
      id: 3,
      question: "Can I customize the design and SEO packages?",
      answer: "Yes, absolutely! We customize our website design, Meta advertising, and SEO strategy to match your specific industry, growth goals, and marketing budget."
    },
    {
      id: 4,
      question: "How do we get started on a project?",
      answer: "Simply visit our Connect page or click 'Get Started'. Complete the quick inquiry form, and one of our digital strategists will contact you within 24 hours to set up a discovery call."
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

export default FAQSection;
