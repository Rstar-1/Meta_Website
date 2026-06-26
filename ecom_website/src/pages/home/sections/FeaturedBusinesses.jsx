import featuredBusinesses from '../../../data/homeFeaturedBusinesses.json';
import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';

const FeaturedBusinesses = ({ onCallBusiness }) => {

  return (
    <Container className="bg-forth">
      <div className="w-full py-30">

        <div className="flex justify-between items-center">
          <h2 className="title-text text-dark font-600">Featured Businesses</h2>
          <p className="text-primary font-500 cursor-pointer small-text">
            View All ➔
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid-cols-5 gap-12 mt-20">
          {featuredBusinesses.map((biz) => (
            <div
              key={biz.id}
              className="bg-white border-ec rounded-5 overflow-hidden p-10 cursor-pointer"
            >
              <div className="relative rounded-5 overflow-hidden">
                <img
                  src={biz.image}
                  alt={biz.name}
                  loading="lazy"
                  className="w-full h-150 object-cover rounded-5 flex"
                />
                <div
                  className="absolute bottom-0 left-0 mb-15 ml-10 border-white flex items-center justify-center rounded-full icon-lg bg-primary z-10"

                >
                  <p className="text-white font-600 mini-text">{biz.logo}</p>
                </div>
              </div>

              <div className="mt-5">
                <h3
                  className="text-dark font-600 mid-text"
                >
                  {biz.name}
                </h3>
                <p className="text-gray mini-text mb-8">{biz.category}</p>

                {/* Rating Row */}
                <div className="flex items-center gap-6 mb-8">
                  <p
                    className="text-white font-600 mini-text px-6 py-2 rounded-3 bg-success"
                  >
                    ★ {biz.rating}
                  </p>
                  <p className="text-gray mini-text">({biz.reviews} Reviews)</p>
                </div>

                <p className='mini-text text-gray'>📍 {biz.location}</p>

                <Button
                  text="Call Now"
                  bg="primary"
                  version="v3"
                  className="w-full cursor-pointer font-600 mt-8"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default FeaturedBusinesses;
