import React from 'react';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Icon from '../../../components/common/Icon';

const TopCity = () => {
  const portfolios = [
    {
      id: 'p-1',
      title: 'Medical and Surgical Rooms',
      category: 'Surgical Care',
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'p-2',
      title: 'Mental Care Treatment Suites',
      category: 'Psychiatric Care',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'p-3',
      title: 'Pediatric Care Units',
      category: 'Pediatric Care',
      image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'p-4',
      title: 'Dental Clinic Equipment',
      category: 'Dental Care',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=600&auto=format&fit=crop'
    }
  ];

  return (
    <Container id="portfolio" className="bg-white py-50">
      <style>{`
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .portfolio-card {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          height: 320px;
          cursor: pointer;
          group: hover;
        }
        .portfolio-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .portfolio-card:hover img {
          transform: scale(1.08);
        }
        .portfolio-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0) 40%, rgba(15, 22, 35, 0.85) 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 20px;
          color: white;
          text-align: left;
        }
        .portfolio-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: white;
          color: #1e74db;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.3s ease;
        }
        .portfolio-card:hover .portfolio-btn {
          opacity: 1;
          transform: scale(1);
        }
        @media (max-width: 1024px) {
          .portfolio-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .portfolio-grid {
            grid-template-columns: 1fr;
          }
          .portfolio-card {
            height: 260px;
          }
        }
      `}</style>

      <div className="w-full">
        <div className="text-center mb-40">
          <span style={{ color: '#1e74db', fontWeight: '700', fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>🩺 Clinic Portfolio</span>
          <h2 className="large-text text-dark font-700 mt-6">One Portfolio at a Time</h2>
        </div>

        <div className="portfolio-grid">
          {portfolios.map((item) => (
            <div key={item.id} className="portfolio-card">
              <img src={item.image} alt={item.title} />
              
              <div className="portfolio-overlay">
                <span className="mini-text text-primary font-700 uppercase mb-4" style={{ color: '#60a5fa' }}>{item.category}</span>
                <h4 className="mid-text font-600 leading-tight">{item.title}</h4>
              </div>
              
              <div className="portfolio-btn">
                <Icon name="ArrowRight" width="14" height="14" stroke="currentColor" strokeWidth="2.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default TopCity;
