import Container from '../../../components/common/Container';
import CardLayout from '../../../components/layout/CardLayout';

const TeamSection = () => {
  const team = [
    {
      id: 1,
      name: "Diana Wilson",
      role: "UI/UX Designer",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      name: "Sheila Barrier",
      role: "Web Developer",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      name: "Glenda Pellerin",
      role: "Product Designer",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: 4,
      name: "Jessica Parrott",
      role: "Senior Consultant",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80"
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
