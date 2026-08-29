import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Accordion from '../../../components/common/Accordion';

const FAQSection = () => {
  const faqs = [
    {
      id: 1,
      question: "What core services does MetaTech Digital Agency offer?",
      answer: "We offer full-service digital agency solutions including custom web design & React development, performance Meta & Google ad campaigns, advanced Search Engine Optimization (SEO), visual brand identity, and growth analytics."
    },
    {
      id: 2,
      question: "How do you design & optimize ad campaigns for maximum ROAS?",
      answer: "We combine demographic research, high-converting video creative hooks, A/B ad copy testing, custom audience retargeting, and multi-touch GA4 attribution to maximize return on ad spend (ROAS)."
    },
    {
      id: 3,
      question: "Can I get a tailored web design & marketing campaign package?",
      answer: "Yes! We customize our web engineering, Meta ad budget management, and SEO packages to match your specific industry niche, growth objectives, and launch timeline."
    },
    {
      id: 4,
      question: "How quickly can we begin work on a new campaign or website?",
      answer: "Our team initiates strategic discovery within 48 hours of onboarding. Digital ad campaigns typically launch within 3–5 business days, while custom web applications take 2–4 weeks."
    }
  ];

  return (
    <Container style={{ backgroundColor: 'var(--forth)' }}>
      <div className='py-80'>
        <Image
          src="https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=800&auto=format&fit=crop&q=80"
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
