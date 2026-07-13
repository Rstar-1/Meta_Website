import React from 'react';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Icon from '../../../components/common/Icon';

const TopCity = () => {
  const team = [
    {
      id: 1,
      name: "Diana Wilson",
      role: "UI/UX Designer",
      image: "https://demo.alhikmahsoft.com/template/stir/assets/images/team-1.jpg"
    },
    {
      id: 2,
      name: "Sheila Barrier",
      role: "Web Developer",
      image: "https://demo.alhikmahsoft.com/template/stir/assets/images/team-2.jpg"
    },
    {
      id: 3,
      name: "Glenda Pellerin",
      role: "Product Designer",
      image: "https://demo.alhikmahsoft.com/template/stir/assets/images/team-3.jpg"
    },
    {
      id: 4,
      name: "Jessica Parrott",
      role: "Senior Consultant",
      image: "https://demo.alhikmahsoft.com/template/stir/assets/images/team-4.jpg"
    }
  ];

  return (
    <Container>
      <style>{`
        .team-card {
          overflow: hidden;
          background: #ffffff;
          transition: all 0.4s ease;
        }
        .team-card:hover {
          transform: translateY(-8px);
        }
        .team-social-overlay {
          position: absolute;
          inset: 0;
          background: rgba(15, 22, 35, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          opacity: 0;
          transition: all 0.4s ease;
        }
        .team-card:hover .team-social-overlay {
          opacity: 1;
        }
        .team-social-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #ffffff;
          color: var(--dark);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .team-social-icon:hover {
          background: var(--primary);
          color: #ffffff;
        }
      `}</style>
      <div className='py-80 w-full'>
        <div className="text-center">
          <p className="text-primary font-500 uppercase small-text">OUR TEAM</p>
          <h2 className="text-dark font-600 head-text uppercase pt-8">
            Experienced Team Members
          </h2>
        </div>

        <div className="grid-cols-4 md-grid-cols-2 sm-grid-cols-1 gap-12 mt-40">
          {team.map((member) => (
            <div key={member.id}>
              <div className="overflow-hidden h-300 team-card">
                <Image
                  src={member.image}
                  alt={member.name}
                  className="w-full object-cover h-300 flex"
                />
                <div className="team-social-overlay">
                  <div className="team-social-icon">
                    <Icon name="Facebook" width="16" height="16" stroke="currentColor" />
                  </div>
                  <div className="team-social-icon">
                    <Icon name="Instagram" width="16" height="16" stroke="currentColor" />
                  </div>
                  <div className="team-social-icon">
                    <Icon name="WhatsApp" width="16" height="16" stroke="currentColor" />
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <h3 className="text-dark mid-text font-600">{member.name}</h3>
                <p className="text-gray mini-text font-400 uppercase">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default TopCity;
