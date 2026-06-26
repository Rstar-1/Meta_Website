import popularProducts from '../../../data/homePopularProducts.json';
import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';

const PopularProducts = ({ onViewProduct }) => {

  return (
    <Container className='bg-white'>
      <div className="w-full pt-40 pb-20">
        <div
          className="flex justify-between items-center"
        >
          <h2 className="title-text text-dark font-600">Popular Products</h2>
          <p className='text-primary font-500 cursor-pointer small-text'>
            View All Products ➔</p>
        </div>

        <div className='grid-cols-6 gap-12 mt-20'>
          {popularProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border-ec rounded-10 p-12 cursor-pointer"
              onClick={() => onViewProduct && onViewProduct(product.name)}
            >
              <div className="overflow-hidden rounded-5 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-150 object-cover rounded-5"
                />
              </div>

              <div className='mt-10'>
                <h3
                  className="text-dark font-500 mid-text line-clamp1"
                >
                  {product.name}
                </h3>
                <p className="text-gray mini-text mt-2">
                  {product.listings}
                </p>

                <Button
                  text="View Products"
                  bg="primary"
                  version="v3"
                  className='mt-10'
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default PopularProducts;
