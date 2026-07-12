import featuredBusinesses from '../../../data/client.json';
import Container from '../../../components/common/Container';
import CardLayout from '../../../components/layout/CardLayout';

const FeaturedBusinesses = ({ onCallBusiness }) => {

  return (
    <Container className="bg-forth">
      <div className='py-30 w-full'>
        <div className="flex justify-between items-center">
          <h2 className="title-text text-dark font-600">Featured Businesses</h2>
          <p className="text-primary font-500 cursor-pointer small-text">
            View All ➔
          </p>
        </div>

        {/* Slider Container */}
        <CardLayout
          items={featuredBusinesses}
          cardType="business"
          isSlider={true}
          cols="4"
          mdCols="2"
          smCols="1"
          className="mt-20"
          onButtonClick={onCallBusiness}
        />
      </div>
    </Container>
  );
};

export default FeaturedBusinesses;
