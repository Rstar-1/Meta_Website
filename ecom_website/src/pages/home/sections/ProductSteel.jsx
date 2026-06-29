import React from 'react';
import { useNavigate } from 'react-router-dom';
import steelProducts from '../../../data/homeSteelProducts.json';
import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';

const ProductSteel = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/product-detail');
    };

    return (
        <Container className="bg-white">
            <div className="w-full py-30">
                <div className="flex justify-between items-center">
                    <h2 className="title-text text-dark font-600">Popular Stainless Steel Products</h2>
                    <p className="text-primary font-500 cursor-pointer small-text" onClick={handleNavigate}>
                        View All Products &gt;
                    </p>
                </div>

                <div className="grid-cols-4 md-grid-cols-2 sm-grid-cols-1 gap-12 mt-20">
                    {steelProducts?.slice(0, 4)?.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white border-ec rounded-10 p-12 cursor-pointer flex flex-column justify-between"
                            onClick={handleNavigate}
                        >
                            <div>
                                <div className="overflow-hidden rounded-5 relative">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        loading="lazy"
                                        className="w-full h-250 object-cover rounded-5"
                                    />
                                </div>

                                <div className="mt-6">
                                    <h3 className="text-dark font-500 mid-text line-clamp1">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray mini-text mt-4">
                                        {product.subtitle}
                                    </p>
                                    <p className="text-dark font-600 small-text mt-4">
                                        {product.price}
                                    </p>
                                </div>
                            </div>

                            <Button
                                text="View Products"
                                bg="primary"
                                version="v3"
                                className="mt-12 font-500"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleNavigate();
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default ProductSteel;
