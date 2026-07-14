import React from 'react';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Icon from '../../../components/common/Icon';

const TeamSection = () => {
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
          transition: all 0.4s ease;
        }
        .team-card:hover {
          transform: translateY(-8px);
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
      `}</style>
      <div className='py-50 w-full'>
        <div className="text-center">
          <p className="text-primary font-500 uppercase small-text">OUR TEAM</p>
          <h2 className="text-dark font-600 head-text uppercase pt-8">
            Experienced Team Members
          </h2>
        </div>

        <div className="grid-cols-4 md-grid-cols-2 sm-grid-cols-1 gap-12 mt-40">
          {team.map((member) => (
            <div key={member.id}>
              <div className="overflow-hidden h-300 team-card relative">
                <Image
                  src={member.image}
                  alt={member.name}
                  className="w-full object-cover h-300 flex"
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '40%',
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.99) 0%, rgba(0, 0, 0, 0) 100%)',
                    pointerEvents: 'none'
                  }}
                />
                <div className="flex items-center gap-8 absolute bottom-0 left-0 m-8">
                  <div className="icon-lg bg-white rounded-full">
                    <Icon name="Facebook" width="18" height="18" stroke="currentColor" />
                  </div>
                  <div className="icon-lg bg-white rounded-full">
                    <Icon name="Instagram" width="18" height="18" stroke="currentColor" />
                  </div>
                  <div className="icon-lg bg-white rounded-full">
                    <Icon name="WhatsApp" width="18" height="18" stroke="currentColor" />
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

export default TeamSection;
