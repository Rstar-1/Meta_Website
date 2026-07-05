import React from 'react';
import { useNavigate } from 'react-router-dom';
import products from '../../../data/products.json';
import Container from '../../../components/common/Container';
import CardLayout from '../../../components/layout/CardLayout';

const LatestProducts = () => {
  const navigate = useNavigate();

  // Filter products by type and popularity
  const printerProducts = products.filter(p => p.type === 'printer' && p.popular);
  const steelProducts = products.filter(p => p.type === 'steel' && p.popular);

  const handleProductClick = (item) => {
    if (item && item.id) {
      navigate(`/product-detail/${item.id}`);
    }
  };

  return (
    <>
      <Container className="bg-white">
        <div className="w-full pt-30 pb-15">
          <div className="flex justify-between items-center mb-10">
            <h2 className="title-text text-dark font-600">Popular Printer Cartridges</h2>
            <p
              className="text-primary font-500 cursor-pointer small-text"
              onClick={() => navigate('/products?category=cat-7')}
            >
              View All Products &gt;
            </p>
          </div>

          <CardLayout
            items={printerProducts}
            cardType="product"
            imageHeight="h-250 sm-h-150"
            isSlider={true}
            onCardClick={handleProductClick}
            onButtonClick={handleProductClick}
          />
        </div>
      </Container>

      <Container className="bg-white">
        <div className="w-full pt-15 pb-30">
          <div className="flex justify-between items-center mb-10">
            <h2 className="title-text text-dark font-600">Popular Stainless Steel Products</h2>
            <p
              className="text-primary font-500 cursor-pointer small-text"
              onClick={() => navigate('/products?category=cat-1')}
            >
              View All Products &gt;
            </p>
          </div>

          <CardLayout
            items={steelProducts}
            cardType="product"
            imageHeight="h-250 sm-h-150"
            isSlider={true}
            onCardClick={handleProductClick}
            onButtonClick={handleProductClick}
          />
        </div>
      </Container>
    </>
  );
};

export default LatestProducts;
