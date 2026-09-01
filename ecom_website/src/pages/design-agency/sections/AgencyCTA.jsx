import React, { useState, useEffect, useRef } from 'react';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Icon from '../../../components/common/Icon';
import Button from '../../../components/common/Button';
import Avatar from '../../../components/common/Avatar';

const AgencyCTA = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    aboutProject: '',
    option: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const sectionRef = useRef(null);
  const shapeRef = useRef(null);

  useEffect(() => {
    let animId;

    const handleScroll = () => {
      if (!sectionRef.current || !shapeRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const totalDistance = windowHeight + rect.height;
        const progress = (windowHeight - rect.top) / totalDistance;
        const translateX = 350 - progress * 700;
        shapeRef.current.style.transform = `translate3d(${translateX.toFixed(2)}px, 0, 0)`;
      }
    };

    const onScroll = () => {
      animId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  const inputStyle = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(255, 255, 255, 0.25)',
    padding: '14px 0',
    color: '#FFFFFF',
    fontSize: '1rem',
    outline: 'none'
  };

  return (
    <Container>
      <div ref={sectionRef} className="py-50 relative overflow-hidden w-full">
        <div
          className="w-full bg-white rounded-10"
        >
          <div className='text-center p-40'>
            <h3
              className="head-text font-700 text-dark uppercase text-center"
            >
              WE'RE A GLOBAL{' '}
              POWERHOUSE OF CREATIVITY AND INNOVATION WE WORK WITH THE BEST BRANDS IN THE BIZ, AND WE'RE NOT AFRAID TO SHAKE THINGS UP{' '}
              <span>
                <Avatar src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80" size={32} borderColor="#FFFFFF" borderWidth={2} />
                <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80" size={32} borderColor="#FFFFFF" borderWidth={2} />
              </span>{' '}
              WITH OUR DARING AND UNCONVENTIONAL DESIGNS.
            </h3>
          </div>
        </div>

        <div
          ref={shapeRef}
          className="absolute pointer-events-none"
          style={{
            top: '25%',
            right: '-5%',
            width: '650px',
            height: '650px',
            zIndex: 1,
            opacity: 0.28,
            willChange: 'transform'
          }}
        >
          <Image
            src="https://infitech.ex-coders.com/wp-content/uploads/2026/08/contactShape1_1.png"
            alt="Contact Background Shape Accent"
            className="w-full h-full object-contain"
            style={{ filter: 'brightness(1.2) contrast(1.1)' }}
          />
        </div>

        {/* Main Contact Section */}
        <div className="relative grid-cols-2 sm-grid-cols-1 gap-12 mt-60">
          {/* Left Side Form Card */}
          <div
            className="rounded-10 p-50 relative"
            style={{
              background: 'rgba(22, 22, 22, 0.75)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <p className="mini-text text-dark bg-white w-max px-18 py-6 rounded-20 flex items-center gap-8 bg-white font-700 uppercase mb-16">
              <Icon name="Settings" width="14" height="14" className="text-warning" />
              <span>START A PROJECT</span>
            </p>

            <h2 className="large-text text-white font-800 mb-35">
              Get A Quote
            </h2>

            {submitted ? (
              <div className="p-40 rounded-20 text-center" style={{ background: 'rgba(255, 81, 0, 0.1)', border: '1px solid #FF5100' }}>
                <Icon name="CheckCircle" width="48" height="48" stroke="#FF5100" className="mb-16 mx-auto" />
                <h3 className="head-text text-white font-800 mb-8">Message Sent Successfully!</h3>
                <p className="para-text text-gray mini-text font-400">Thank you for reaching out. Our design director will respond within 24 business hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="gap-28">
                <div className="grid-cols-2 gap-30" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                  <div>
                    <input
                      type="text"
                      placeholder="Name *"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Email Address *"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div className="grid-cols-2 gap-30" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                  <div>
                    <input
                      type="text"
                      placeholder="About Project"
                      value={formData.aboutProject}
                      onChange={(e) => setFormData({ ...formData, aboutProject: e.target.value })}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <select
                      value={formData.option}
                      onChange={(e) => setFormData({ ...formData, option: e.target.value })}
                      style={{ ...inputStyle, color: formData.option ? '#FFFFFF' : '#999999', cursor: 'pointer' }}
                    >
                      <option value="" style={{ background: '#1A1A1A', color: '#FFFFFF' }}>Chose A Option</option>
                      <option value="web" style={{ background: '#1A1A1A', color: '#FFFFFF' }}>Web Design &amp; Development</option>
                      <option value="app" style={{ background: '#1A1A1A', color: '#FFFFFF' }}>Mobile App Design</option>
                      <option value="branding" style={{ background: '#1A1A1A', color: '#FFFFFF' }}>Brand Identity &amp; Strategy</option>
                    </select>
                  </div>
                </div>

                <div>
                  <textarea
                    rows="3"
                    placeholder="Write About Project . . ."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={inputStyle}
                  />
                </div>

                <div className="mt-24">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-10 rounded-50 font-700 cursor-pointer text-white"
                    style={{
                      backgroundColor: '#FF5100',
                      border: 'none',
                      padding: '16px 36px',
                      fontSize: '1rem',
                      boxShadow: '0 10px 25px rgba(255, 81, 0, 0.35)'
                    }}
                  >
                    Send Message <Icon name="ArrowUpRight" width="16" height="16" stroke="#FFFFFF" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Side Locations & Info */}
          <div className="p-30">
            <div>
              <h3 className="head-text text-white font-600 mb-8">
                IN<br />
                Maharashtra
              </h3>
              <p className="para-text text-gray small-text font-400" style={{ color: '#AAAAAA', lineHeight: 1.6 }}>
                540 Madison Ave, 18th Floor<br />
                New York, NY 10022<br />
                contact@infitech.com | +1 (212) 555-0199
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AgencyCTA;
