import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../components/common/Container';
import Button from '../../components/common/Button';
import Icon from '../../components/common/Icon';
import Image from '../../components/common/Image';
import SeoHelmet from '../../components/seo/SeoHelmet';
import CardLayout from '../../components/layout/CardLayout';
import { GetBestPriceForm } from '../../components/layout/ProductLayout';
import { getCart, removeFromCart, clearCart } from '../../utils/cartHelper';
import productsData from '../../data/products.json';
import categoriesData from '../../data/category.json';
import Table from '../../components/common/Table';

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
      style: { width: '45%' },
      render: (row) => (
        <div className="flex items-center gap-12">
          <Image
            src={row.image}
            alt={row.name}
            style={{
              width: '60px',
              height: '60px',
              objectFit: 'cover',
              borderRadius: '6px',
              border: '1px solid #ececec'
            }}
          />
          <div>
            <p className="small-text font-600 text-dark line-clamp2 cursor-pointer hover:text-primary mb-2" onClick={() => navigate(`/product-detail/${row.id}`)}>
              {row.name}
            </p>
            <p className="mini-text text-gray m-0">
              {row.brand || 'Verified Seller'}
            </p>
          </div>
        </div>
      )
    },
    {
      header: 'Category',
      accessor: 'category',
      ui: 'badge',
      style: { width: '25%' }
    },
    {
      header: 'Price',
      accessor: 'price',
      style: { width: '20%' },
      render: (row) => (
        <div>
          <p className="small-text font-600 text-dark m-0">₹{row.price}</p>
          <p className="mini-text text-gray m-0">On Request</p>
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
            className="border-ec flex items-center justify-center rounded-full hover:bg-light-danger hover:text-danger cursor-pointer transition-all"
            style={{ width: '32px', height: '32px', padding: 0, minWidth: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => removeFromCart(row.id)}
            title="Remove Item"
          >
            <Icon name="Trash" width="15" height="15" stroke="var(--danger)" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <>
      <SeoHelmet
        title="Your Cart | SOBO Marketing Solution"
        description="Review your selected items and submit your requirement to get the best quotes from verified suppliers."
        path="/cart"
        type="website"
      />

      <Container className="bg-white">
        <div className="py-30 w-full">

          <div className="flex gap-12 items-start w-full">
            {/* Left Column - Selected Items */}
            <div id="cart-items-section" className="w-75 md-w-full pr-12 sm-pr-1 grid-cols-1 gap-12">
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="mid-text text-dark font-600">Selected Items ({cartItems.length})</h3>
                  {cartItems.length > 0 && (
                    <Button
                      onClick={clearCart}
                      variant="outline"
                      bg="danger"
                      version='v2'
                    >
                      Clear Cart
                    </Button>
                  )}
                </div>

                {cartItems.length === 0 ? (
                  <div className="text-center py-40 grid-cols-1 gap-8 bg-forth rounded-5 mt-10">
                    <Icon name="Cart" width='28' height='28' color="var(--primary)" className='mx-auto' />
                    <h4 className="title-text font-500 capitalize text-dark">Your cart is empty</h4>
                    <p className="small-text font-400 text-gray">Browse our product catalog to add products and get quotes.</p>
                    <div className='mt-3'>
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
                    <Table
                      data={cartItems}
                      columns={columns}
                      showControls={false}
                      minWidth="100%"
                    />

                    {/* Summary row */}
                    <div className="flex justify-between items-center p-15">
                      <span className="small-text text-dark font-600">Total Items ({cartItems.length})</span>
                      <span className="small-text font-600">Total Price: <span className="text-primary font-700">On Request</span></span>
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
            <div className="w-25 md-w-full pl-12 sm-pl-1">
              <GetBestPriceForm
                isCart={true}
                cartCount={cartItems.length}
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
