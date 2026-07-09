import React from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from '../../components/layout/Banner';
import Container from '../../components/common/Container';
import Icon from '../../components/common/Icon';
import Button from '../../components/common/Button';

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 'pediatric',
      title: 'Pediatric Care Department',
      description: 'Comprehensive healthcare services tailored specifically for infants, children, and young adolescents. Our pediatric specialists focus on preventative health, immunizations, and developmental milestones.',
      icon: 'Heart',
      bgColor: '#e8f8f0',
      iconColor: '#10b981',
      treatments: [
        'Routine Pediatric Physical Exams',
        'Childhood Immunization Schedules',
        'Developmental & Behavior Screenings',
        'Pediatric Nutrition & Allergy Consults'
      ]
    },
    {
      id: 'mental',
      title: 'Mental Health & counseling',
      description: 'Empathetic therapy sessions, psychiatric evaluations, and counseling to support your cognitive and emotional well-being. We offer warm, private clinical environments for healing.',
      icon: 'Users',
      bgColor: '#fce7f3',
      iconColor: '#ec4899',
      treatments: [
        'Individual Cognitive Behavioral Therapy',
        'Stress & Anxiety Management Sessions',
        'Couples & Family Relationship Counseling',
        'Child & Adolescent Psychiatry'
      ]
    },
    {
      id: 'dental',
      title: 'Dental Care Clinic',
      description: 'Complete oral hygiene, cleanings, root canals, braces, and cosmetic dentistry from certified dental experts. We employ high-precision dental scanners and painless treatment approaches.',
      icon: 'ShieldCheck',
      bgColor: '#fef3c7',
      iconColor: '#d97706',
      treatments: [
        'Professional Deep Cleanings & Fillings',
        'Root Canal Therapies & Dental Crowns',
        'Orthodontics & Invisalign Clear Aligners',
        'Pediatric Dental Checkups & Sealants'
      ]
    },
    {
      id: 'eye',
      title: 'Ophthalmology & Eye Care',
      description: 'Comprehensive vision testing, spectacles prescriptions, laser eye surgeries, and general ophthalmology solutions. Our diagnostic tools accurately check corneal thickness and ocular pressure.',
      icon: 'Building',
      bgColor: '#e0f2fe',
      iconColor: '#0284c7',
      treatments: [
        'Visual Acuity & Refraction Tests',
        'Glaucoma & Macular Degeneration Screenings',
        'Dry Eye Therapy & Corneal Topography',
        'Prescriptions for Glasses & Contact Lenses'
      ]
    }
  ];

  const faqs = [
    {
      q: 'How do I book an appointment with a specialist?',
      a: 'You can easily request an appointment online through our Contact page, or call our clinical desk directly. We will confirm your scheduled slot within 2 hours.'
    },
    {
      q: 'Do you accept health insurance plans?',
      a: 'Yes, Medula Clinic collaborates with leading healthcare insurance networks. Please bring your insurance card during your checkup for seamless claims.'
    },
    {
      q: 'What should I bring to my first diagnostic checkup?',
      a: 'Please bring a valid photo ID, active medical records or prescriptions, and a list of any current medications you are taking.'
    }
  ];

  return (
    <>
      <Banner
        title="Our Departments"
        desc="Professional Clinical Services"
        breadcrumbs={[
          { label: 'Home', path: '/home' },
          { label: 'Services' }
        ]}
      />

      <Container className="bg-white py-60">
        <style>{`
          .svc-list-card {
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            padding: 30px;
            display: flex;
            gap: 30px;
            background: #ffffff;
            transition: all 0.3s ease;
            text-align: left;
            margin-bottom: 30px;
          }
          .svc-list-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.08);
            border-color: #cbd5e1;
          }
          .svc-icon-box {
            width: 60px;
            height: 60px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }
          .treatment-badge {
            background-color: #f1f5f9;
            color: #475569;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 500;
            display: inline-block;
          }
          .faq-box {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 24px;
            text-align: left;
          }
          @media (max-width: 768px) {
            .svc-list-card {
              flex-direction: column;
              gap: 20px;
            }
          }
        `}</style>

        <div className="w-full">
          {/* Services Detailed List */}
          <div className="mb-60">
            {services.map((svc) => (
              <div key={svc.id} className="svc-list-card">
                <div
                  className="svc-icon-box"
                  style={{ backgroundColor: svc.bgColor, color: svc.iconColor }}
                >
                  <Icon name={svc.icon} width="28" height="28" stroke="currentColor" strokeWidth="2.5" />
                </div>
                <div>
                  <h3 className="large-text text-dark font-700 mb-10">{svc.title}</h3>
                  <p className="para-text text-gray mb-20" style={{ lineHeight: '1.6' }}>
                    {svc.description}
                  </p>
                  
                  <h4 className="small-text font-700 text-dark uppercase mb-10 tracking-wider">Key Treatments Offered</h4>
                  <div className="flex flex-wrap gap-8">
                    {svc.treatments.map((treatment, idx) => (
                      <span key={idx} className="treatment-badge">
                        ✓ {treatment}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Help FAQs Section */}
          <div className="mt-80 pt-40" style={{ borderTop: '1px solid #e2e8f0' }}>
            <div className="text-center mb-40">
              <span style={{ color: '#1e74db', fontWeight: '700', fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>🩺 Patient Help</span>
              <h2 className="large-text text-dark font-700 mt-6">Clinical Support & FAQs</h2>
            </div>

            <div className="grid grid-cols-3 md-grid-cols-1 gap-24">
              {faqs.map((faq, idx) => (
                <div key={idx} className="faq-box">
                  <h3 className="mid-text font-700 text-dark mb-10">❓ {faq.q}</h3>
                  <p className="small-text text-gray" style={{ lineHeight: '1.5' }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action Banner */}
          <div className="bg-light-primary rounded-16 p-40 text-center mt-60">
            <h3 className="large-text text-dark font-700 mb-12">Need Personalized Medical Consultation?</h3>
            <p className="para-text text-gray mb-20 max-w-600 mx-auto">
              Get in touch with our friendly clinic assistants to consult with our specialized clinical doctors.
            </p>
            <Button
              text="Request An Appointment"
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

export default Services;
