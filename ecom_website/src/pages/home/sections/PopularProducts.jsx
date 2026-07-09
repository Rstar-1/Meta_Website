import { useNavigate } from 'react-router-dom';
import products from '../../../data/products.json';
import Container from '../../../components/common/Container';
import CardLayout from '../../../components/layout/CardLayout';

const PopularProducts = () => {
  const navigate = useNavigate();
  const popularProducts = products.filter(p => p.type === 'general' && p.popular);

  const handleViewAll = () => {
    navigate('/products');
  };

  const handleProductClick = (item) => {
    if (item && item.id) {
      navigate(`/product-detail/${item.id}`);
    }
  };


  return (
    <Container className='bg-white'>
      <div className="w-full pt-40 pb-20">
        <div
          className="flex justify-between items-center"
        >
          <h2 className="title-text text-dark font-600">Popular Products</h2>
          <p className='text-primary font-500 cursor-pointer small-text' onClick={handleViewAll}>
            View All ➔</p>
        </div>

        <CardLayout
          items={popularProducts}
          cardType="product"
          imageHeight="h-150"
          isSlider={true}
          sliderSlidesPerView={1.2}
          sliderBreakpoints={{
            640: {
              slidesPerView: 2.2,
            },
            768: {
              slidesPerView: 3.7,
            },
            1024: {
              slidesPerView: 5.4,
            }
          }}
          className="mt-20"
          showViewProducts={false}
          onCardClick={handleProductClick}
          onButtonClick={handleProductClick}
        />
      </div>
    </Container>
  );
};

export default PopularProducts;
