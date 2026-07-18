import { useNavigate } from 'react-router-dom';
import { products } from '../../../utils/apiData';
import CardLayout from '../../../components/layout/CardLayout';

const PopularProducts = ({ cms }) => {
  const navigate = useNavigate();
  if (!cms) return null;
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
    <div className='py-40 w-full'>
      <div className="flex justify-between items-center mb-10">
        <h2 className="title-text text-dark font-600">{cms.popularProducts.title}</h2>
        <p className='text-primary font-500 cursor-pointer small-text' onClick={handleViewAll}>
          {cms.popularProducts.viewAll}</p>
      </div>

      <CardLayout
        items={popularProducts}
        cardType="product"
        imageHeight="h-250"
        isSlider={true}
        className="mt-20"
        showViewProducts={false}
        onCardClick={handleProductClick}
        onButtonClick={handleProductClick}
      />
    </div>
  );
};

export default PopularProducts;
