import React from 'react';
import { useNavigate } from 'react-router-dom';
import products from '../../../data/products.json';
import Container from '../../../components/common/Container';
import CardLayout from '../../../components/layout/CardLayout';

const ProductPrinter = () => {
  const navigate = useNavigate();
  const printerProducts = products.filter(p => p.type === 'printer' && p.popular);

  const handleNavigate = () => {
    navigate('/product-detail');
  };


  return (
    <Container className="bg-white">
      <div className="w-full py-30">
        <div className="flex justify-between items-center">
          <h2 className="title-text text-dark font-600">Popular Printer Cartridges</h2>
          <p className="text-primary font-500 cursor-pointer small-text" onClick={handleNavigate}>
            View All Products &gt;
          </p>
        </div>

        <CardLayout
          items={printerProducts?.slice(0, 4)}
          cardType="product"
          imageHeight="h-250 sm-h-150"
          cols="4"
          mdCols="2"
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

export default ProductPrinter;
