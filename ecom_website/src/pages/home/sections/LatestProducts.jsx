import React from 'react';
import { useNavigate } from 'react-router-dom';
import { products, categories } from '../../../utils/apiData';
import CardLayout from '../../../components/layout/CardLayout';

const LatestProducts = ({ cms }) => {
  const navigate = useNavigate();

  const handleProductClick = (item) => {
    if (item && item.id) {
      navigate(`/product-detail/${item.id}`);
    }
  };

  if (!cms) return null;

  const targetCategoryIds = cms.latestProducts.targetCategoryIds;

  return (
    <div className='w-full py-40'>
      {targetCategoryIds.map((catId, catIndex) => {
        const category = categories.find(c => c.id === catId);
        if (!category) return null;

        // Filter products belonging to this category
        const categoryProducts = products.filter(p => p.category === category.id);

        // Only render the category section if it has products
        if (categoryProducts.length === 0) return null;

        return (
          <div key={category.id} className="pb-20 w-full">
            <div className="flex justify-between items-center mb-10">
              <h2 className="title-text text-dark font-600">{category.name}</h2>
              <p
                className="text-primary font-500 cursor-pointer small-text"
                onClick={() => navigate(`/products?category=${category.id}`)}
              >
                {cms.latestProducts.viewAll}
              </p>
            </div>

            <CardLayout
              items={categoryProducts}
              cardType="product"
              imageHeight="h-350 sm-h-300"
              isSlider={true}
              eagerCount={catIndex === 0 ? 2 : 0}
              onCardClick={handleProductClick}
              onButtonClick={handleProductClick}
            />
          </div>
        );
      })}
    </div>
  );
};

export default LatestProducts;
