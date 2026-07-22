import React, { useState, useEffect, lazy, Suspense } from 'react';
import Container from '../../components/common/Container';
import Button from '../../components/common/Button';
import Icon from '../../components/common/Icon';
import Image from '../../components/common/Image';
import SeoHelmet from '../../components/seo/SeoHelmet';
import Banner from '../../components/layout/Banner';
import Skeleton from '../../components/common/Skeleton';
import LazySection from '../../components/common/LazySection';

import { resolveProductImage } from '../../utils/imageResolver';
import { products, cms } from '../../utils/apiData';

const BusinessPromo = lazy(() => import('../home/sections/BusinessPromo'));

const ORDER_STEPS = [
  { id: 1, title: 'Order Confirmed', time: '18 May 2026 | 10:30 AM', icon: 'Clipboard' },
  { id: 2, title: 'Processing', time: '19 May 2026 | 09:15 AM', icon: 'Package' },
  { id: 3, title: 'Shipped', time: 'Pending', icon: 'Truck' },
  { id: 4, title: 'Delivered', time: 'Pending', icon: 'Check' },
];

const Order = () => {
  const [loading, setLoading] = useState(true);
  const [orderItems, setOrderItems] = useState([]);
  const [showAllItems, setShowAllItems] = useState(false);
  const [activeStep, setActiveStep] = useState(2);
  const [activeOrderId] = useState('ORD123456');
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('order_products');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setOrderItems(parsed);
          return;
        }
      } catch (e) {
        console.error("Error parsing order_products:", e);
      }
    }
    // Default fallback demo products (4 items to allow testing "View All Items")
    setOrderItems(products.slice(0, 4));
  }, []);

  const handleDownloadInvoice = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert(`Invoice for Order #${activeOrderId} downloaded successfully!`);
    }, 800);
  };

  const displayedItems = showAllItems ? orderItems : orderItems.slice(0, 3);
  const subtotal = orderItems.reduce((acc, item) => acc + (Number(item.price) || 0) * (item.quantity || 1), 0);
  const gst = subtotal * 0.18;
  const totalAmount = subtotal + gst;

  const progressPercentage = ((activeStep - 1) / (ORDER_STEPS.length - 1)) * 100;

  const getStepStatusLabel = () => {
    switch (activeStep) {
      case 1:
        return { text: 'Confirmed', bg: 'bg-light-success', textCol: 'text-success' };
      case 2:
        return { text: 'Processing', bg: 'bg-light-primary', textCol: 'text-primary' };
      case 3:
        return { text: 'Shipped', bg: 'bg-light-warning', textCol: 'text-warning' };
      case 4:
        return { text: 'Delivered', bg: 'bg-light-success', textCol: 'text-success' };
      default:
        return { text: 'Confirmed', bg: 'bg-light-success', textCol: 'text-success' };
    }
  };

  const currentStatusLabel = getStepStatusLabel();

  return (
    <>
      <SeoHelmet
        title={`Order #${activeOrderId} - Order Details | SOBO Marketing Solution`}
        description="Track your order status, view shipment timeline and download invoice."
        path="/order"
        type="website"
      />

      <Banner
        title="Order Details"
        desc="Track & View Your Order"
        breadcrumbs={[
          { label: 'Home', path: '/home' },
          { label: 'Order' }
        ]}
        loading={loading}
      />

      <LazySection placeholderHeight={300} placeholder={<Skeleton variant="order" />}>
        {loading ? (
          <Skeleton variant="order" />
        ) : (
          <Container>
            <style>{`
              .stepper-container {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 12px;
                position: relative;
              }
              .stepper-line {
                position: absolute;
                top: 24px;
                left: 12%;
                right: 12%;
                height: 3px;
                background: #e5e7eb;
                z-index: 1;
              }
              .stepper-line-progress {
                position: absolute;
                top: 24px;
                left: 12%;
                height: 3px;
                background: linear-gradient(to right, #12b76a 0%, #f25c2b 100%);
                z-index: 2;
                transition: width 0.3s ease;
              }
              .stepper-step {
                position: relative;
                z-index: 3;
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                cursor: pointer;
              }
              @media (max-width: 768px) {
                .stepper-container {
                  grid-template-columns: repeat(2, 1fr);
                  gap: 20px;
                }
                .stepper-line, .stepper-line-progress {
                  display: none;
                }
              }
            `}</style>

            <div className="grid-cols-1 gap-12 py-40 w-full">
              <div className="border-ec p-24 rounded-10 bg-white">
                {/* Header Row */}
                <div className="flex sm-grid-cols-1 sm-gap-12 justify-between items-center">
                  <div>
                    <div className="flex items-center gap-12">
                      <h2 className="headmini-text font-600 text-dark">
                        Order #{activeOrderId}
                      </h2>
                      <p className={`mini-text font-500 px-10 py-3 rounded-20 ${currentStatusLabel.bg} ${currentStatusLabel.textCol}`}>
                        {currentStatusLabel.text}
                      </p>
                    </div>
                    <p className="mini-text text-gray mt-3">
                      Placed on: 18 May 2026 | 10:30 AM
                    </p>
                  </div>

                  <Button
                    onClick={handleDownloadInvoice}
                    disabled={downloading}
                    text={downloading ? 'Downloading...' : 'Download Invoice'}
                    icon={downloading ? 'Spinner' : 'Download'}
                    variant="outline"
                    version="v0"
                  />
                </div>

                {/* Timeline Stepper Dynamic Map */}
                <div className="py-10">
                  <div className="stepper-container">
                    <div className="stepper-line" />
                    <div
                      className="stepper-line-progress"
                      style={{ width: `${Math.min(progressPercentage, 76)}%` }}
                    />

                    {ORDER_STEPS.map((step) => {
                      const isCompleted = step.id <= activeStep;
                      const isActive = step.id === activeStep;

                      let circleBg = '#f3f4f6';
                      let borderColor = '#d1d5db';
                      let iconColor = '#9ca3af';
                      let shadowStyle = {};

                      if (isCompleted) {
                        if (isActive) {
                          circleBg = '#fff0eb';
                          borderColor = '#f25c2b';
                          iconColor = '#f25c2b';
                          shadowStyle = { boxShadow: '0 0 0 4px #fff5f0' };
                        } else {
                          circleBg = '#e6f9ed';
                          borderColor = '#12b76a';
                          iconColor = '#12b76a';
                          shadowStyle = { boxShadow: '0 0 0 4px #f0fdf4' };
                        }
                      }

                      return (
                        <div
                          key={step.id}
                          className="stepper-step"
                          onClick={() => setActiveStep(step.id)}
                          title={`Click to set status to ${step.title}`}
                        >
                          <div
                            className="flex items-center justify-center rounded-full mb-8 transition-all"
                            style={{
                              width: '48px',
                              height: '48px',
                              backgroundColor: circleBg,
                              border: `2px solid ${borderColor}`,
                              ...shadowStyle
                            }}
                          >
                            <Icon name={step.icon} width="22" height="22" stroke={iconColor} />
                          </div>
                          <h5 className={`small-text font-600 m-0 ${isCompleted ? 'text-dark' : 'text-gray'}`}>
                            {step.title}
                          </h5>
                          <p className="mini-text text-gray m-0 mt-2">{step.time}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Good news alert banner */}
                <div className="p-12 rounded-5 bg-light-primary flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Icon name="Hourglass" width="12" height="12" stroke="#f25c2b" />
                    <p className="mini-text font-400 text-gray">
                      <span className="text-primary">Status: </span>
                      Order is currently <strong>{ORDER_STEPS.find(s => s.id === activeStep)?.title}</strong>. Click any stage above to update view.
                    </p>
                  </div>
                  {activeStep < ORDER_STEPS.length && (
                    <Button
                      text="Next Stage"
                      onClick={() => setActiveStep((prev) => Math.min(prev + 1, 4))}
                      version="v0"
                      bg="primary"
                    />
                  )}
                </div>
              </div>

              <div className="flex sm-grid-cols-1 items-start gap-12 w-full mt-6">
                {/* Left Side: Order Details */}
                <div className="w-70 md-w-full sm-w-full">
                  <div className='flex items-center justify-between'>
                    <h3 className="mid-text font-600 text-dark">Order Details ({orderItems.length} Items)</h3>

                    {orderItems.length > 3 && (
                      <Button
                        text={showAllItems ? 'Show Less' : `View All`}
                        onClick={() => setShowAllItems((prev) => !prev)}
                        variant="outline"
                        version="v0"
                      />
                    )}
                  </div>
                  {displayedItems.map((item, index) => (
                    <div key={item.id || index} className="flex items-start gap-12 bg-white mt-10 p-14 rounded-5 border-ec">
                      <div className='w-15 sm-w-full'>
                        <Image
                          src={resolveProductImage(item)}
                          alt={item.name}
                          height={90}
                          className="object-cover flex rounded-5 w-full"
                        />
                      </div>

                      <div className="w-85 sm-w-full">
                        <div className="flex sm-grid-cols-1 justify-between items-start">
                          <div>
                            <h4 className="headmini-text font-600 text-dark">{item.name}</h4>
                            <p className="mini-text text-gray font-400 mt-2">{item.category || 'General'}</p>
                            <p className="mini-text text-gray mt-2">
                              Qty: {item.quantity || 1}
                            </p>
                          </div>
                          <p className="small-text font-500 text-dark">
                            ₹{item.price ? (Number(item.price) * (item.quantity || 1)).toLocaleString('en-IN') : '115'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Side: Total Summary */}
                <div className="grid-cols-1 gap-12 w-30 md-w-full sm-w-full">
                  {/* Order Summary Card */}
                  <div
                    className="border-ec rounded-10 p-16 bg-white grid-cols-1 gap-12"
                  >
                    {/* Subtotal */}
                    <div className="flex justify-between items-center mb-5">
                      <div className="flex items-center gap-8">
                        <Icon name="Bag" width="14" height="14" stroke="#12b76a" />
                        <p className="mini-text font-400 text-dark">Subtotal</p>
                      </div>
                      <p className="mini-text font-500 text-dark">₹{subtotal.toLocaleString('en-IN')}</p>
                    </div>

                    {/* Shipping */}
                    <div className="flex justify-between items-center mb-5">
                      <div className="flex items-center gap-8">
                        <Icon name="Truck" width="14" height="14" stroke="#2563eb" />
                        <p className="mini-text font-400 text-dark">Shipping</p>
                      </div>
                      <p className="mini-text font-500 text-dark">₹0</p>
                    </div>

                    {/* GST (18%) */}
                    <div className="flex justify-between items-center mb-5">
                      <div className="flex items-center gap-8">
                        <Icon name="Percent" width="14" height="14" stroke="#f59e0b" />
                        <p className="mini-text font-400 text-dark">GST (18%)</p>
                      </div>
                      <p className="mini-text font-500 text-dark">₹{gst.toLocaleString('en-IN', { maximumFractionDigits: 1 })}</p>
                    </div>

                    <hr style={{ border: 'none', height: '1px', background: '#f0f0f0', margin: '2px 0' }} />

                    {/* Total Amount */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-8">
                        <Icon name="Receipt" width="14" height="14" stroke="#f25c2b" />
                        <p className="mini-text font-400 text-dark">Total Amount</p>
                      </div>
                      <p className="mini-text font-500 text-primary">₹{totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 1 })}</p>
                    </div>
                  </div>

                  {/* Need Help Card */}
                  <div
                    className="rounded-10 p-16 relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #fff7f2 0%, #fffbf8 100%)',
                    }}
                  >
                    <div className="flex gap-12 items-start relative" style={{ zIndex: 2 }}>
                      <div
                        className="flex items-center justify-center rounded-full bg-light-primary"
                        style={{
                          width: '52px',
                          height: '52px',
                        }}
                      >
                        <Icon name="Headset" width="26" height="26" stroke="#f25c2b" />
                      </div>

                      <div className="grid-cols-1 gap-4">
                        <h4 className="headmini-text font-600 text-dark m-0">Need Help?</h4>
                        <p className="mini-text text-gray font-400 m-0">We are here to help you</p>

                        <div className="mt-6 grid-cols-1 gap-6">
                          <a
                            href={`tel:+91${import.meta.env.VITE_PHONE || '9876543210'}`}
                            className="mini-text font-400 text-gray flex items-center gap-6"
                          >
                            <Icon name="Phone" width="13" height="13" stroke="#f25c2b" />
                            {(() => {
                              const phone = import.meta.env.VITE_PHONE || '9876543210';
                              return `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`;
                            })()}
                          </a>
                          <a
                            href="mailto:support@kalom.in"
                            className="mini-text font-400 text-gray flex items-center gap-6"
                          >
                            <Icon name="Mail" width="13" height="13" stroke="#f25c2b" />
                            support@kalom.in
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Chat Bubble graphic matching screenshot */}
                    <div
                      style={{
                        position: 'absolute',
                        right: '0px',
                        bottom: '-25px',
                        opacity: 0.55,
                        pointerEvents: 'none',
                        zIndex: 1
                      }}
                    >
                      <svg width="130" height="110" viewBox="0 0 130 110" fill="none">
                        <path
                          d="M95 25C65 25 45 42 45 64C45 72 48 79 53 85L47 99L63 94C72 99 83 101 95 101C125 101 145 83 145 61C145 39 125 25 95 25Z"
                          fill="#ffe5dc"
                          opacity="0.6"
                        />
                        <rect x="58" y="32" width="64" height="46" rx="16" fill="#fcae96" opacity="0.8" />
                        <circle cx="78" cy="55" r="3.5" fill="#ffffff" />
                        <circle cx="90" cy="55" r="3.5" fill="#ffffff" />
                        <circle cx="102" cy="55" r="3.5" fill="#ffffff" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </Container>
        )}
      </LazySection>

      {/* BusinessPromo Section with LazySection & Skeleton Fallback */}
      <LazySection placeholderHeight={300}>
        <Suspense fallback={
          <Container>
            <Skeleton variant="promo" theme="adaptive" />
          </Container>
        }>
          <Container version="v2">
            <BusinessPromo cms={cms} />
          </Container>
        </Suspense>
      </LazySection>
    </>
  );
};

export default Order;
