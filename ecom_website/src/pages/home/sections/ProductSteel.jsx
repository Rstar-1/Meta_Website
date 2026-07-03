import React from 'react';
import { useNavigate } from 'react-router-dom';
import products from '../../../data/products.json';
import Container from '../../../components/common/Container';
import CardLayout from '../../../components/layout/CardLayout';

const ProductSteel = () => {
    const navigate = useNavigate();
    const steelProducts = products.filter(p => p.type === 'steel' && p.popular);

    const handleViewAll = () => {
        navigate('/products?category=cat-1');
    };

    const handleProductClick = (item) => {
        if (item && item.id) {
            navigate(`/product-detail/${item.id}`);
        }
    };


    return (
        <Container className="bg-white">
            <div className="w-full py-30">
                <div className="flex justify-between items-center">
                    <h2 className="title-text text-dark font-600">Popular Stainless Steel Products</h2>
                    <p className="text-primary font-500 cursor-pointer small-text" onClick={handleViewAll}>
                        View All Products &gt;
                    </p>
                </div>

                <CardLayout
                    items={steelProducts?.slice(0, 4)}
                    cardType="product"
                    imageHeight="h-250 sm-h-150"
                    cols="4"
                    mdCols="2"
                    smCols="2"
                    gap="12"
                    className="mt-20"
                    onCardClick={handleProductClick}
                    onButtonClick={handleProductClick}
                />
            </div>
        </Container>
    );
};

export default ProductSteel;
