import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../components/common/Container';
import Button from '../../components/common/Button';
import Icon from '../../components/common/Icon';
import Image from '../../components/common/Image';
import SeoHelmet from '../../components/seo/SeoHelmet';
import CardLayout from '../../components/layout/CardLayout';
import Banner from '../../components/layout/Banner';
import ProductEnquiryForm from '../../components/forms/ProductEnquiryForm';
import { getCart, removeFromCart, clearCart, updateCartQuantity } from '../../utils/cartHelper';
import productsData from '../../data/products.json';
import categoriesData from '../../data/category.json';
import Table from '../../components/common/Table';
import Fields from '../../components/common/Fields';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(getCart());

    const handleCartUpdate = () => {
      setCartItems(getCart());
    };

    window.addEventListener('cart-updated', handleCartUpdate);
    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate);
    };
  }, []);

  const getCategoryName = (catId) => {
    const cat = categoriesData.find(c => c.id === catId);
    return cat ? cat.name : catId;
  };

  const getCategoryColor = (categoryName) => {
    switch (categoryName) {
      case 'Steel Products':
        return 'text-primary bg-light-primary';
      case 'PVC Products':
        return 'text-success bg-light-success';
      case 'Industrial Machinery':
        return 'text-warning bg-light-warning';
      case 'Electrical & Electronics':
        return 'text-danger bg-light-danger';
      case 'Packaging Solutions':
        return 'text-secondary bg-light-secondary';
      case 'Printers & Copiers':
        return 'text-primary bg-light-primary';
      case 'Office Supplies':
        return 'text-success bg-light-success';
      default:
        return 'text-primary bg-light-primary';
    }
  };

  // Filter 4 related/suggested products that are not currently in the cart
  const suggestedProducts = productsData
    .filter(p => !cartItems.some(item => item.id === p.id))
    .slice(0, 4);

  const handleProductClick = (item) => {
    if (item && item.id) {
      navigate(`/product-detail/${item.id}`);
    }
  };

  const columns = [
    {
      header: 'Item',
      accessor: 'name',
      ui: 'profile',
      subKey: 'brand',
      imgStyle: {
        width: '60px',
        height: '60px',
        objectFit: 'cover',
        borderRadius: '6px',
        border: '1px solid #ececec'
      },
      style: { width: '35%' }
    },
    {
      header: 'Category',
      accessor: 'category',
      style: { width: '20%' },
      render: (row) => {
        const catName = getCategoryName(row.category);
        const colorClass = getCategoryColor(catName);
        return (
          <span className={`mini-text capitalize px-10 py-4 rounded-20 font-500 inline-flex ${colorClass}`}>
            {catName}
          </span>
        );
      }
    },
    {
      header: 'Price',
      accessor: 'price',
      style: { width: '15%' },
      render: (row) => (
        <div>
          <p className="small-text font-600 text-dark m-0">₹{row.price}</p>
          <p className="mini-text text-gray m-0">On Request</p>
        </div>
      )
    },
    {
      header: 'Quantity',
      accessor: 'quantity',
      style: { width: '20%' },
      render: (row) => (
        <div className="flex justify-start">
          <Fields
            type="quantity"
            value={row.quantity || 1}
            onChange={(newVal) => updateCartQuantity(row.id, newVal)}
          />
        </div>
      )
    },
    {
      header: 'Action',
      accessor: 'id',
      style: { width: '10%' },
      className: 'text-center',
      render: (row) => (
        <div className="flex justify-center">
          <Button
            variant="outline"
            bg="danger"
            onClick={() => removeFromCart(row.id)}
            title="Remove Item"
            version='v2'
          >
            <Icon name="Trash" width="15" height="15" stroke="#c21b1b" />
          </Button>
        </div>
      )
    }
  ];
  const totalPrice = cartItems.reduce((acc, item) => acc + (Number(item.price) || 0) * (item.quantity || 1), 0);

  return (
    <>
      <SeoHelmet
        title="Your Cart | SOBO Marketing Solution"
        description="Review your selected items and submit your requirement to get the best quotes from verified suppliers."
        path="/cart"
        type="website"
      />

      <Banner
        title="Cart"
        desc="Shopping Cart"
        breadcrumbs={[
          { label: "Home", path: "/home" },
          { label: "Cart" },
        ]}
      />

      <Container className="bg-white">
        <style>{`
          .cart-mobile-cards {
            display: none;
          }
          .cart-desktop-table {
            display: block;
          }
          @media (max-width: 768px) {
            .cart-mobile-cards {
              display: flex;
              flex-direction: column;
            }
            .cart-desktop-table {
              display: none;
            }
          }
        `}</style>

        <div className="py-30 w-full">

          <div className="flex sm-grid-cols-1 gap-12 items-start w-full">
            {/* Left Column - Selected Items */}
            <div id="cart-items-section" className="w-75 md-w-full sm-w-full pr-12 sm-pr-1 grid-cols-1 gap-12">
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="mid-text text-dark font-600">Selected Items ({cartItems.length})</h3>
                  {cartItems.length > 0 && (
                    <Button
                      onClick={clearCart}
                      variant="outline"
                      bg="danger"
                      version='v0'
                    >
                      Clear All
                    </Button>
                  )}
                </div>

                {cartItems.length === 0 ? (
                  <div className="text-center py-40 grid-cols-1 gap-8 bg-forth rounded-5 mt-10">
                    <Icon name="Cart" width='28' height='28' color="var(--primary)" className='mx-auto' />
                    <h4 className="mid-text font-500 capitalize text-dark mt-8">Your cart is empty</h4>
                    <p className="small-text font-400 text-gray">Browse our product catalog to add products and get quotes.</p>
                    <div className='mt-12'>
                      <Button
                        text="Browse Products"
                        onClick={() => navigate('/products')}
                        bg="primary"
                        version="v2"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="cart-desktop-table">
                      <Table
                        data={cartItems}
                        columns={columns}
                        showControls={false}
                        minWidth="100%"
                      />
                    </div>

                    <div className="cart-mobile-cards gap-12 mt-10">
                      {cartItems.map((item) => {
                        const catName = getCategoryName(item.category);
                        const colorClass = getCategoryColor(catName);
                        return (
                          <div key={item.id} className="bg-white border-ec p-10 rounded-5 flex gap-12 items-start relative">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="object-cover rounded-5 flex"
                              style={{ width: "80px", height: "80px", flexShrink: 0 }}
                            />
                            <div className="flex-grow pr-30">
                              <h4 className="small-text font-600 text-dark line-clamp-1 w-85" style={{ margin: 0 }}>
                                {item.name}
                              </h4>
                              <div className="flex items-center gap-6 mt-6">
                                <span className={`mini-text capitalize px-8 py-2 rounded-20 font-500 inline-flex ${colorClass}`}>
                                  {catName}
                                </span>
                              </div>
                              <div className="flex gap-12 items-center mt-10">
                                <div>
                                  <p className="small-text font-700 text-dark m-0">₹{item.price}</p>
                                  <p className="mini-text text-gray m-0" style={{ fontSize: "1rem" }}>On Request</p>
                                </div>
                                <div>
                                  <Fields
                                    type="quantity"
                                    value={item.quantity || 1}
                                    onChange={(newVal) => updateCartQuantity(item.id, newVal)}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="absolute top-0 right-0 m-8">
                              <Button
                                variant="outline"
                                bg="danger"
                                onClick={() => removeFromCart(item.id)}
                                title="Remove Item"
                                version='v2'
                              >
                                <Icon name="Trash" width="16" height="16" stroke="#c21b1b" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Summary row */}
                    <div className="flex justify-between items-center p-15">
                      <p className="small-text text-dark font-500">Total Items ({cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)})</p>
                      <p className="small-text font-500">Total Price: <span className="text-primary font-700">₹{totalPrice.toLocaleString('en-IN')}</span></p>
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-5 bg-forth p-15">
                <h4 className="mid-text font-600 text-primary mb-2">ℹ️ Note</h4>
                <p className="mini-text text-gray m-0">
                  Prices shown are indicative. Final prices will be provided by suppliers based on your requirements.
                </p>
              </div>
            </div>

            {/* Right Column - Submit Enquiry Form */}
            <div className="w-25 md-w-full sm-w-full pl-12 sm-pl-1">
              <ProductEnquiryForm
                isCart={true}
                cartCount={cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)}
                onClearCart={clearCart}
              />
            </div>
          </div>


        </div>
      </Container>
    </>
  );
};

export default Cart;
