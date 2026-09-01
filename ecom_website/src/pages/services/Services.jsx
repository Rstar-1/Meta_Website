import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Banner from '../../components/layout/Banner';
import Container from '../../components/common/Container';
import Image from '../../components/common/Image';
import Icon from '../../components/common/Icon';
import SeoHelmet from '../../components/seo/SeoHelmet';

const sidebarServices = [
  { id: 'katmaru', label: 'Katmaru solutions', path: '/services' },
  { id: 'tech', label: 'Tech solution', path: '/services' },
  { id: 'consulting', label: 'IT consulting', path: '/services' },
  { id: 'ui-design', label: 'UI Design', path: '/services' },
  { id: 'web-dev', label: 'Web Development', path: '/services' }
];

const Services = () => {
  const navigate = useNavigate();
  const [activeSidebarIndex, setActiveSidebarIndex] = useState(0);
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://sobo-marketing.com';

  return (
    <>
      <SeoHelmet
        title="Our Services | SOBO Marketing Solution"
        description="Explore our range of premium branding design, website development, digital marketing, analytics, and IT consulting services."
        keywords={['B2B Services', 'Branding Design', 'Web Development', 'Digital Marketing', 'SEO India']}
        image={siteUrl + '/sobo_logo.webp'}
        path="/services"
        type="services"
      />

      <Banner
        title="Our Services"
        img="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80"
        desc="Innovative Solutions Tailored to Power Your Business Growth"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Services' }
        ]}
      />

      {/* Main Service Layout Section */}
      <div style={{ backgroundColor: '#FAF8F5' }} className="py-80">
        <Container>
          <div className="flex sm-grid-cols-1 gap-12 items-start">

            {/* Left Main Content Column */}
            <div className="w-70 sm-w-full">
              {/* Main Showcase Hero Image */}
              <div className="rounded-20 overflow-hidden relative w-full" style={{ height: '420px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                  alt="End-to-End Tech Solutions for Modern Businesses"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Main Heading & Description */}
              <h2 className="head-text font-600 text-dark mt-28 mb-16" style={{ letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                End-to-End Tech Solutions for modern businesses
              </h2>

              <p className="small-text text-gray mb-16">
                We deliver end-to-end tech solutions designed to simplify complexity, improve performance, and support long-term business growth. From strategy and system architecture to development, integration, and ongoing support, our solutions are built to be secure, scalable, and aligned with your business goals.
              </p>

              <p className="small-text text-gray mb-28">
                Our tech solutions help businesses operate smarter, faster, and more securely. We analyze your challenges, design tailored systems, and implement reliable technologies that integrate seamlessly with your existing infrastructure. With a focus on performance, security, and scalability, we ensure your technology evolves as your business grows.
              </p>

              <div className="mt-20">
                <h3 className="title-text font-600 text-dark mb-12">Explore Benefits</h3>
                <p className="small-text text-gray mb-24">
                  We deliver end-to-end tech solutions designed to simplify complexity, improve performance, and support long-term business growth. From strategy and system architecture to development.
                </p>

                {/* Dual Benefit Showcase Images */}
                <div className="grid-cols-2 sm-grid-cols-1 gap-12 mb-32">
                  <div className="rounded-15 overflow-hidden relative" style={{ height: '220px' }}>
                    <Image
                      src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80"
                      alt="Explore Benefits Strategy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-15 overflow-hidden relative" style={{ height: '220px' }}>
                    <Image
                      src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80"
                      alt="Explore Benefits Innovation"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Final Conclusion Subsection */}
              <div className="mt-32">
                <h3 className="title-text font-600 text-dark mb-12">Final Conclusion</h3>
                <p className="small-text text-gray mb-14">
                  Our tech solutions help businesses operate smarter, faster, and more securely. We analyze your challenges, design tailored systems, and implement reliable technologies that integrate seamlessly with your existing infrastructure. With a focus on performance, security, and scalability, we ensure your technology evolves as your business grows.
                </p>
                <p className="small-text text-gray">
                  Our tech solutions help businesses operate smarter, faster, and more securely. We analyze your challenges, design tailored systems, and implement reliable technologies that integrate.
                </p>
              </div>
            </div>

            {/* Right Sidebar Column */}
            <div className="w-30 sm-w-full">

              <div
                className="rounded-10 p-28 relative overflow-hidden text-white"
                style={{
                  background: 'linear-gradient(145deg, #2E1914 0%, #1A0D0A 100%)',
                }}
              >
                {/* Subtle background decorative glow */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-30px',
                    right: '-30px',
                    width: '140px',
                    height: '140px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 81, 0, 0.12)',
                    pointerEvents: 'none'
                  }}
                />

                <h3 className="title-text font-700 text-white mb-12">
                  Need Any Software Company Services?
                </h3>
                <p className="mini-text text-gray" style={{ color: '#C0B7B1' }}>
                  Our tech solutions help businesses operate smarter, faster, and more.
                </p>

                {/* Contact items */}
                <div className="grid-cols-1 gap-12 mt-16">
                  {/* Item 1 */}
                  <div className="flex items-center gap-12">
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        backgroundColor: '#FF5100'
                      }}
                    >
                      <Icon name="Phone" width="18" height="18" stroke="#FFFFFF" />
                    </div>
                    <span className="small-text font-600 text-white">+880-1234-567890</span>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-center gap-12">
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        backgroundColor: '#FF5100'
                      }}
                    >
                      <Icon name="Mail" width="18" height="18" stroke="#FFFFFF" />
                    </div>
                    <span className="small-text font-600 text-white">Hello@Infitech.Com</span>
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-center gap-12">
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        backgroundColor: '#FF5100'
                      }}
                    >
                      <Icon name="Phone" width="18" height="18" stroke="#FFFFFF" />
                    </div>
                    <span className="small-text font-600 text-white">+880-1234-567890</span>
                  </div>

                  {/* Item 4 */}
                  <div className="flex items-center gap-12">
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        backgroundColor: '#FF5100'
                      }}
                    >
                      <Icon name="Mail" width="18" height="18" stroke="#FFFFFF" />
                    </div>
                    <span className="small-text font-600 text-white">Hello@Infitech.Com</span>
                  </div>
                </div>

                {/* Orange Action Button */}
                <button
                  type="button"
                  onClick={() => navigate('/connect')}
                  className="flex items-center justify-center gap-10 w-full py-14 px-20 mt-15 font-700 small-text cursor-pointer text-white border-0"
                  style={{
                    backgroundColor: '#FF5100',
                    borderRadius: '50px',
                    boxShadow: '0 6px 20px rgba(255, 81, 0, 0.4)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span>Know More Us</span>
                  <Icon name="ArrowUpRight" width="16" height="16" stroke="#FFFFFF" />
                </button>
              </div>

              <div className="grid-cols-1 gap-12 mt-16">
                {/* Feature Card 1 */}
                <div
                  className="bg-white rounded-10 p-20 flex items-start gap-12 border"
                >
                  <div
                    className="flex items-center justify-center w-30"
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#FFF0EB'
                    }}
                  >
                    <Icon name="Settings" width="22" height="22" stroke="#FF5100" />
                  </div>
                  <div>
                    <h4 className="mid-text font-600 text-dark mb-6">Digital Solutions</h4>
                    <p className="mini-text text-gray leading-normal m-0">
                      We provide info-reliable solutions designed to help our modern business thrive.
                    </p>
                  </div>
                </div>

                {/* Feature Card 2 */}
                <div
                  className="bg-white rounded-10 p-20 flex items-start gap-12 border"
                >
                  <div
                    className="flex items-center justify-center w-30"
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#FFF0EB'
                    }}
                  >
                    <Icon name="ArrowUpRight" width="22" height="22" stroke="#FF5100" />
                  </div>
                  <div>
                    <h4 className="mid-text font-600 text-dark mb-6">Live And Delivers</h4>
                    <p className="mini-text text-gray leading-normal m-0">
                      We provide info-reliable solutions designed to help our modern business thrive.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </Container>
      </div>
    </>
  );
};

export default Services;
