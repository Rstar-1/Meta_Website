import { useNavigate } from 'react-router-dom';
import popularProducts from '../../../data/homePopularProducts.json';
import Container from '../../../components/common/Container';
import CardLayout from '../../../components/layout/CardLayout';

const PopularProducts = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/product-detail');
  };

  return (
    <Container className='bg-white'>
      <div className="w-full pt-40 pb-20">
        <div
          className="flex justify-between items-center"
        >
          <h2 className="title-text text-dark font-600">Popular Products</h2>
          <p className='text-primary font-500 cursor-pointer small-text' onClick={handleNavigate}>
            View All Products ➔</p>
        </div>

        <CardLayout
          items={popularProducts}
          cardType="product"
          imageHeight="h-150"
          cols="6"
          mdCols="3"
          smCols="2"
          gap="12"
          className="mt-20"
          onCardClick={handleNavigate}
          onButtonClick={handleNavigate}
        />
      </div>
    </Container>
  );
};

export default PopularProducts;
