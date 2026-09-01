import React from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from '../../components/layout/Banner';
import Container from '../../components/common/Container';
import Icon from '../../components/common/Icon';
import Button from '../../components/common/Button';
import SeoHelmet from '../../components/seo/SeoHelmet';

const pricingPlans = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$49',
    period: '/Month',
    isPopular: false,
    desc: 'Essential digital presence for startups and small businesses.',
    buttonText: 'Get Started Today',
    features: [
      'Basic Website Audit',
      'Responsive UI Design',
      'SEO Metadata Setup',
      'Standard Support (Mon-Fri)',
      '1 Revision Cycle'
    ]
  },
  {
    id: 'essential',
    name: 'Essential',
    price: '$199',
    period: '/Month',
    isPopular: true,
    desc: 'Comprehensive package for growing brands needing active performance.',
    buttonText: 'Get Started Today',
    features: [
      'Custom Web & UI Design',
      'Advanced SEO Optimization',
      '24/7 Uptime Monitoring',
      'Monthly Analytics Report',
      'Priority Email Support'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '$499',
    period: '/Month',
    isPopular: false,
    desc: 'For scaling businesses requiring custom web apps & growth strategy.',
    buttonText: 'Get Started Today',
    features: [
      'Full-Stack App Development',
      'Custom API Integration',
      'Conversion Rate Optimization',
      'Dedicated Account Manager',
      'Unlimited Minor Tweaks'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$999',
    period: '/Month',
    isPopular: false,
    desc: 'Tailored digital ecosystem with round-the-clock priority SLA.',
    buttonText: 'Get Started Today',
    features: [
      'Bespoke Enterprise Systems',
      'Multi-Platform Integration',
      '24/7 SLA & Incident Team',
      'Security & Audit Reports',
      'Strategic Advisory Calls'
    ]
  }
];

const Pricing = () => {
  const navigate = useNavigate();
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://sobo-marketing.com';

  return (
    <>
      <SeoHelmet
        title="Pricing Plans | SOBO Marketing Solution"
        description="Explore our flexible and transparent pricing plans tailored to scale your digital presence."
        keywords={['Pricing Plans', 'IT Support Pricing', 'Digital Agency Pricing', 'SOBO Marketing']}
        image={siteUrl + '/sobo_logo.webp'}
        path="/pricing"
        type="website"
      />

      <Banner
        title="Pricing Plans"
        img="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80"
        desc="Transparent & Flexible Pricing Designed For Business Growth"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Pricing' }
        ]}
      />

      <Container style={{ background: 'var(--forth)' }}>
        <div className='py-80 sm-py-50'>
          <p className="mini-text text-white bg-dark mx-auto w-max px-18 py-8 rounded-20 flex items-center gap-8 font-500 uppercase mb-10">
            <Icon name="Settings" width="14" height="14" className="text-warning" />
            OUR SERVICE FOR YOU
          </p>
          <h2 className="large-text text-dark uppercase font-600 text-center">
            Solutions That Work For You
          </h2>

          <div className="grid-cols-4 sm-grid-cols-1 gap-12 mt-40 sm-mt-20">
            {pricingPlans?.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-10 p-25 b-shadow relative flex flex-column justify-between"
                style={plan.isPopular ? { border: '2px solid #FF5100' } : {}}
              >
                {plan.isPopular && (
                  <span
                    className="absolute bg-warning text-white mini-text font-700 uppercase px-12 py-4 rounded-20"
                    style={{ top: '-14px', right: '20px' }}
                  >
                    Popular
                  </span>
                )}
                <div>
                  <p className="mid-text font-600 text-dark mb-5 uppercase">
                    {plan.name}
                  </p>

                  <div className="flex items-center gap-4 mb-14">
                    <h2
                      className="font-600 text-dark large-text"
                    >
                      {plan.price}
                    </h2>
                    <p className="mini-text text-gray font-400">
                      {plan.period}
                    </p>
                  </div>

                  <p className="small-text text-gray text-muted mb-24" style={{ minHeight: '44px' }}>
                    {plan.desc}
                  </p>

                  <Button
                    text={plan.buttonText}
                    icon="ArrowUpRight"
                    iconPosition="right"
                    onClick={() => navigate('/connect')}
                    version="v3"
                    bg={plan.isPopular ? 'warning' : 'dark'}
                    color="white"
                  />

                  {/* Includes Header */}
                  <p className="mini-text font-600 text-gray uppercase mt-28 mb-16 m-0" style={{ color: '#888888', letterSpacing: '0.02em' }}>
                    Includes:
                  </p>

                  {/* Feature Bullets */}
                  <div className="grid-cols-1 gap-12">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-10">
                        <Icon name="ArrowUpRight" width="16" height="16" stroke="var(--warning)" />
                        <p className="small-text font-500 text-dark text-muted m-0">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Pricing;
