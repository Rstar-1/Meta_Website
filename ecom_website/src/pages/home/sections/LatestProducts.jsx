import React from 'react';
import { useNavigate } from 'react-router-dom';
import products from '../../../data/products.json';
import categories from '../../../data/category.json';
import Container from '../../../components/common/Container';
import CardLayout from '../../../components/layout/CardLayout';

const LatestProducts = () => {
  const navigate = useNavigate();

  const handleProductClick = (item) => {
    if (item && item.id) {
      navigate(`/product-detail/${item.id}`);
    }
  };

  const targetCategoryIds = ['cat-7', 'cat-2', 'cat-1', 'cat-10', 'cat-5'];

  return (
    <>
      {targetCategoryIds.map((catId, catIndex) => {
        const category = categories.find(c => c.id === catId);
        if (!category) return null;

        // Filter products belonging to this category
        const categoryProducts = products.filter(p => p.category === category.id);

        // Only render the category section if it has products
        if (categoryProducts.length === 0) return null;

        return (
          <Container key={category.id} className="bg-white">
            <div className="w-full pt-30 pb-15">
              <div className="flex justify-between items-center mb-10">
                <h2 className="title-text text-dark font-600">{category.name}</h2>
                <p
                  className="text-primary font-500 cursor-pointer small-text"
                  onClick={() => navigate(`/products?category=${category.id}`)}
                >
                  View All ➔
                </p>
              </div>

              <CardLayout
                items={categoryProducts}
                cardType="product"
                imageHeight="h-250"
                isSlider={true}
                eagerCount={catIndex === 0 ? 2 : 0}
                sliderSlidesPerView={1.2}
                sliderBreakpoints={{
                  640: {
                    slidesPerView: 2.2,
                  },
                  768: {
                    slidesPerView: 3.7,
                  },
                  1024: {
                    slidesPerView: 4,
                  }
                }}
                onCardClick={handleProductClick}
                onButtonClick={handleProductClick}
              />
            </div>
          </Container>
        );
      })}
    </>
  );
};

export default LatestProducts;
