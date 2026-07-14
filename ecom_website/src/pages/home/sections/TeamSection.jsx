import React from 'react';
import Container from '../../../components/common/Container';
import CardLayout from '../../../components/layout/CardLayout';

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
      <div className='py-50 w-full'>
        <div className="text-center">
          <p className="text-primary font-500 uppercase small-text">OUR TEAM</p>
          <h2 className="text-dark font-600 head-text uppercase pt-8">
            Experienced Team Members
          </h2>
        </div>

        <CardLayout
          items={team}
          cardType="team-member"
          cols="4"
          mdCols="2"
          smCols="1"
          gap="12"
          className="mt-40"
        />
      </div>
    </Container>
  );
};

export default TeamSection;
