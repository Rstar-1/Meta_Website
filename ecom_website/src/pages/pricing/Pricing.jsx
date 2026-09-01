import React from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from '../../components/layout/Banner';
import Container from '../../components/common/Container';
import Icon from '../../components/common/Icon';
import SeoHelmet from '../../components/seo/SeoHelmet';

const pricingPlans = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$29',
    period: '/Months',
    desc: 'For businesses ready to level up their digital presence with a professional.',
    buttonText: 'Get Started Today',
    features: [
      'Basic IT support',
      'Uptime monitoring',
      'Email priority help',
      'Small fixes included',
      'Team Q&A session'
    ]
  },
  {
    id: 'essential',
    name: 'Essential',
    price: '$799',
    period: '/Months',
    desc: 'For businesses ready to level up their digital presence with a professional.',
    buttonText: 'Get Started Today',
    features: [
      'Advanced tech support',
      'Full infra audit',
      '24/7 monitoring',
      'Cloud optimization',
      'Disaster plan setup'
    ]
  },
  {
    id: 'starter',
    name: 'Starter',
    price: '$29',
    period: '/Months',
    desc: 'For businesses ready to level up their digital presence with a professional.',
    buttonText: 'Get Started Today',
    features: [
      'Basic IT support',
      'Uptime monitoring',
      'Email priority help',
      'Small fixes included',
      'Team Q&A session'
    ]
  },
  {
    id: 'basic',
    name: 'Basic',
    price: '$2,800',
    period: '/Months',
    desc: 'For businesses ready to level up their digital presence with a professional.',
    buttonText: 'Get Started Today',
    features: [
      'Basic IT support',
      'Uptime monitoring',
      'Email priority help',
      'Small fixes included',
      'Team Q&A session'
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

      {/* Hero Banner Section */}
      <Banner
        title="Pricing Plans"
        img="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80"
        desc="Transparent & Flexible Pricing Designed For Business Growth"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Pricing' }
        ]}
      />

      {/* Main Pricing Section */}
      <div style={{ backgroundColor: '#FAF8F5' }} className="py-80">
        <Container>
          <div className="grid-cols-4 sm-grid-cols-1 gap-12">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-10 p-25 flex flex-column justify-between transition-all"

              >
                <div>
                  {/* Plan Title */}
                  <p className="title-text font-600 text-dark mb-16">
                    {plan.name}
                  </p>

                  {/* Price Header */}
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

                  {/* Subtitle / Target Description */}
                  <p className="small-text text-gray mb-24">
                    {plan.desc}
                  </p>

                  {/* CTA Button */}
                  <button
                    type="button"
                    onClick={() => navigate('/connect')}
                    className="flex items-center justify-center gap-8 w-full py-14 px-20 font-600 small-text cursor-pointer text-white border-none transition-all"
                    style={{
                      backgroundColor: '#262626',
                      borderRadius: '10px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <span>{plan.buttonText}</span>
                    <Icon name="ArrowUpRight" width="16" height="16" stroke="#FFFFFF" />
                  </button>

                  {/* Includes Header */}
                  <p className="mini-text font-600 text-gray uppercase mt-28 mb-16 m-0" style={{ color: '#888888', letterSpacing: '0.02em' }}>
                    Includes:
                  </p>

                  {/* Feature Bullets */}
                  <div className="grid-cols-1 gap-12">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-10">
                        <Icon name="ArrowUpRight" width="16" height="16" stroke="#FF5100" />
                        <p className="small-text font-500 text-dark" style={{ color: '#333333' }}>
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Pricing;
