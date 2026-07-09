import React from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from '../../components/layout/Banner';
import Container from '../../components/common/Container';
import Image from '../../components/common/Image';
import Icon from '../../components/common/Icon';
import Button from '../../components/common/Button';

const Portfolio = () => {
  const navigate = useNavigate();

  const galleryItems = [
    {
      id: 1,
      title: 'Medical and Surgical Rooms',
      description: 'Fully equipped sterile surgery rooms with modern diagnostic imaging, high-precision laser scalpels, and automated anesthesia monitors.',
      image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=600&auto=format&fit=crop',
      tag: 'Critical Care'
    },
    {
      id: 2,
      title: 'Mental Care Treatment Suites',
      description: 'Private, noise-insulated clinical consultation rooms designed to provide therapy patients with absolute calm, comfort, and security.',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=600&auto=format&fit=crop',
      tag: 'Therapy & Wellness'
    },
    {
      id: 3,
      title: 'Pediatric Care Units',
      description: 'Colorful, child-friendly checkup spaces equipped with kid-focused diagnostic toys and friendly play corners to alleviate doctor anxiety.',
      image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=600&auto=format&fit=crop',
      tag: 'Pediatrics'
    },
    {
      id: 4,
      title: 'Dental Clinic Equipment',
      description: 'High-end ergonomic dental suites featuring intraoral cameras, painless digital anesthesia systems, and low-radiation panoramic X-ray units.',
      image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?q=80&w=600&auto=format&fit=crop',
      tag: 'Dental Clinic'
    },
    {
      id: 5,
      title: 'Cardiology Diagnostics Center',
      description: 'Specialized cardiac care testing labs featuring advanced echocardiograms, treadmills for cardiac stress tests, and multi-lead ECG systems.',
      image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?q=80&w=600&auto=format&fit=crop',
      tag: 'Cardiology'
    },
    {
      id: 6,
      title: 'Clinical Pathology Laboratory',
      description: 'Highly automated blood testing and pathology laboratories providing accurate, rapid diagnostic panel results for patients.',
      image: 'https://images.unsplash.com/photo-1579154204601-01588f35116f?q=80&w=600&auto=format&fit=crop',
      tag: 'Diagnostics'
    }
  ];

  return (
    <>
      <Banner
        title="Our Facilities"
        desc="Clinic Portfolio Gallery"
        breadcrumbs={[
          { label: 'Home', path: '/home' },
          { label: 'Portfolio' }
        ]}
      />

      <Container className="bg-white py-60">
        <style>{`
          .portfolio-grid {
            display: grid;
            grid-template-cols: repeat(3, 1fr);
            gap: 30px;
          }
          .portfolio-item-card {
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            overflow: hidden;
            background: #ffffff;
            transition: all 0.3s ease;
            text-align: left;
            display: flex;
            flex-direction: column;
            height: 100%;
          }
          .portfolio-item-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.08);
            border-color: #cbd5e1;
          }
          .portfolio-img-box {
            position: relative;
            width: 100%;
            height: 220px;
            overflow: hidden;
          }
          .portfolio-img-box img {
            width: 100%;
            height: 100%;
            object-cover: cover;
            transition: transform 0.5s ease;
          }
          .portfolio-item-card:hover .portfolio-img-box img {
            transform: scale(1.05);
          }
          .portfolio-tag {
            position: absolute;
            top: 15px;
            left: 15px;
            background: rgba(30, 116, 219, 0.95);
            color: #ffffff;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
            z-index: 10;
            backdrop-filter: blur(4px);
          }
          .facility-feature-box {
            border-left: 4px solid #1e74db;
            background-color: #f8fafc;
            padding: 20px;
            border-radius: 0 12px 12px 0;
            text-align: left;
          }
          @media (max-width: 992px) {
            .portfolio-grid {
              grid-template-cols: repeat(2, 1fr);
            }
          }
          @media (max-width: 768px) {
            .portfolio-grid {
              grid-template-cols: 1fr;
            }
          }
        `}</style>

        <div className="w-full">
          {/* Intro text */}
          <div className="text-center mb-50 max-w-700 mx-auto">
            <span style={{ color: '#1e74db', fontWeight: '700', fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>🩺 Our Environment</span>
            <h2 className="large-text text-dark font-700 mt-6">Designed For Healing & Comfort</h2>
            <p className="para-text text-gray mt-15" style={{ lineHeight: '1.6' }}>
              Medula Clinic has invested in top-tier medical environments. Every room is carefully designed to enforce strict hygiene control, ensure patient comfort, and provide specialists with optimal medical utilities.
            </p>
          </div>

          {/* Portfolio Grid */}
          <div className="portfolio-grid mb-60">
            {galleryItems.map((item) => (
              <div key={item.id} className="portfolio-item-card">
                <div className="portfolio-img-box">
                  <span className="portfolio-tag">{item.tag}</span>
                  <Image src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-24 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="mid-text font-700 text-dark mb-10">{item.title}</h3>
                    <p className="small-text text-gray" style={{ lineHeight: '1.5' }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Facility Standards section */}
          <div className="mt-80 pt-40" style={{ borderTop: '1px solid #e2e8f0' }}>
            <div className="grid grid-cols-2 md-grid-cols-1 gap-40 items-center">
              <div className="text-left">
                <span style={{ color: '#1e74db', fontWeight: '700', fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>🛡️ Strict Clinical Standards</span>
                <h3 className="large-text text-dark font-700 mt-6 mb-15">Hygiene & Safety Metrics</h3>
                <p className="para-text text-gray mb-24" style={{ lineHeight: '1.6' }}>
                  Patient safety is the cornerstone of our clinical practice. We systematically sterilize surgical gear and patient rooms using hospital-grade HEPA filters and cleanrooms.
                </p>
                <div className="flex flex-col gap-15">
                  <div className="facility-feature-box">
                    <h4 className="small-text font-700 text-dark mb-5">HEPA Air Filtration Systems</h4>
                    <p className="mini-text text-gray">99.97% clean air recycling rates to eliminate airborne bacteria.</p>
                  </div>
                  <div className="facility-feature-box">
                    <h4 className="small-text font-700 text-dark mb-5">High-Tech Sterile Instruments</h4>
                    <p className="mini-text text-gray">Rigorous autoclave sterilization cycles verified prior to treatments.</p>
                  </div>
                </div>
              </div>
              <div>
                <Image
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=600&auto=format&fit=crop"
                  alt="Doctor at desk clinic room"
                  className="w-full rounded-16 shadow-lg object-cover"
                  style={{ height: '380px' }}
                />
              </div>
            </div>
          </div>

          {/* Final Call to Action */}
          <div className="bg-light-primary rounded-16 p-40 text-center mt-60">
            <h3 className="large-text text-dark font-700 mb-12">Plan a Visit to Our Facilities</h3>
            <p className="para-text text-gray mb-20 max-w-600 mx-auto">
              We welcome patients for consultation visits. Get in touch with our scheduling department.
            </p>
            <Button
              text="Get In Touch"
              bg="primary"
              version="v1"
              onClick={() => navigate('/connect')}
              style={{ padding: '12px 28px' }}
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Portfolio;
