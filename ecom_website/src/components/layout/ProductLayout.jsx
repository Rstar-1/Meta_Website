import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import Icon from '../common/Icon';
import Container from '../common/Container';
import Image from '../common/Image';
import Tab from '../common/Tab';
import SeoHelmet from '../seo/SeoHelmet';
import ProductSchema from '../seo/ProductSchema';
import Banner from './Banner';
import FormBuilder from '../common/FormBuilder';

export const GetBestPriceForm = ({ isCart = false, cartCount = 0, onClearCart }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const fields = isCart ? [
    {
      name: 'name',
      type: 'text',
      placeholder: 'Enter your full name',
      validation: { required: true }
    },
    {
      name: 'mobile',
      type: 'tel',
      placeholder: 'Enter your mobile number',
      validation: { required: true }
    },
    {
      name: 'city',
      type: 'select',
      border: true,
      defaultValue: '',
      options: [
        { label: 'Select your city', value: '' },
        { label: 'Delhi', value: 'Delhi' },
        { label: 'Mumbai', value: 'Mumbai' },
        { label: 'Bangalore', value: 'Bangalore' },
        { label: 'Chennai', value: 'Chennai' },
        { label: 'Hyderabad', value: 'Hyderabad' }
      ],
      validation: { required: true }
    }
  ] : [
    {
      name: 'name',
      type: 'text',
      placeholder: 'Enter Your Name',
      validation: { required: true }
    },
    {
      name: 'mobile',
      type: 'tel',
      placeholder: 'Enter Mobile Number',
      validation: { required: true }
    },
    {
      name: 'quantity',
      type: 'select',
      border: true,
      defaultValue: '',
      options: [
        { label: '1 - 5 Pieces', value: '1-5' },
        { label: '6 - 20 Pieces', value: '6-20' },
        { label: '21 - 50 Pieces', value: '21-50' },
        { label: '50+ Pieces (Bulk)', value: '50+' }
      ]
    },
    {
      name: 'requirement',
      type: 'textarea',
      placeholder: 'Your Requirement'
    }
  ];

  const handleFormSubmit = (data) => {
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      if (isCart && onClearCart) {
        onClearCart();
      }
    }, 4000);
  };

  return (
    <div className='border-ec p-15 rounded-5 bg-white'>
      <h3 className='title-text text-dark font-600'>{isCart ? 'Request a Quote' : 'Get Best Price'}</h3>
      <p className='mini-text text-gray mt-4'>Fill the form and get quotes from verified suppliers</p>

      {formSubmitted ? (
        <div className='mt-8 p-10 text-center bg-forth'>
          <div style={{ fontSize: '24px', marginBottom: '4px' }}>✅</div>
          <h4 className='text-dark mid-text font-600'>Thank you!</h4>
          <p className='mt-5 mini-text text-gray'>{isCart ? 'Your enquiry has been submitted. Our team will contact you shortly.' : 'Your requirement has been sent to verified suppliers.'}</p>
        </div>
      ) : (
        <div className="mt-10">
          <FormBuilder
            fields={fields}
            onSubmit={handleFormSubmit}
            submitType="json"
            submitText={isCart ? "Submit Enquiry" : "Submit Requirement"}
            buttonVersion="v3"
            buttonBg="primary"
            buttonClassName="mt-14 w-full"
            buttonStyle={{ backgroundColor: '#2563eb', padding: '12px', fontSize: '14px', fontWeight: 700 }}
          >
            {isCart && (
              <div className="bg-forth p-12 rounded-5 flex items-center justify-between mt-10">
                <p className="small-text font-500 text-dark">🛍️ Items in Enquiry</p>
                <p className="mini-text text-primary" >{cartCount} Items</p>
              </div>
            )}
          </FormBuilder>

          <p className='font-400 mini-text text-center mt-12 text-gray'>🛡️ 100% Secure &amp; Confidential</p>
        </div>
      )}
    </div>
  );
};

// Inline SupplierCard Component
const SupplierCard = ({ brand = 'PrintMax Solutions' }) => {
  const navigate = useNavigate();

  return (
    <div className='border-ec p-15 rounded-5'>
      <div className='flex items-center gap-10'>
        <p className='bg-light-secondary icon-lg text-primary rounded-5 font-600 para-text'>
          {brand.charAt(0)}
        </p>
        <div>
          <p className='text-dark mid-text font-600'>
            {brand}
          </p>
          <p className='text-secondary mini-text font-600 flex-items-center gap-3'>
            ✔ Verified Supplier
          </p>
        </div>
      </div>

      <div className='flex items-center gap-8 mt-6'>
        <p className='mini-text text-dark font-600'>4.6</p>
        <p className='small-text text-warning'>★★★★★</p>
        <p className='mini-text text-gray'>(245)</p>
      </div>

      <p className='text-gray mini-text mt-5'>Supplier of Printer Cartridges</p>

      <div className='grid-cols-1 gap-9 bordh py-6'>
        <p className='text-gray mini-text font-500'>📍 Delhi, India</p>
        <p className='text-gray mini-text font-500'>🕒 Years in Business: 8+</p>
        <p className='text-gray mini-text font-500'>📋 GST No: 07AABCPMT234A1ZS</p>
      </div>

      <Button
        onClick={() => navigate('/brands')}
        version="v3"
        bg="secondary"
        className="font-600 mt-8"
      >
        View Supplier Profile
      </Button>

      <Link to="/products" className='text-secondary mini-text mt-8'>
        More Products by this Supplier
      </Link>

    </div>
  );
};

// Inline TrustAssurance Component
const TrustAssurance = () => {
  return (
    <div className='border-ec p-15 rounded-5'>
      <h4 className='mid-text font-500 text-dark'>Trust &amp; Assurance</h4>
      <div className='grid-cols-1 gap-6 mt-8'>
        <p className='text-gray mini-text font-500'>✓ Verified Supplier</p>
        <p className='text-gray mini-text font-500'>✓ 100% Original Products</p>
        <p className='text-gray mini-text font-500'>✓ GST Invoice Available</p>
        <p className='text-gray mini-text font-500'>✓ Easy Returns</p>
      </div>
    </div>
  );
};

// Inline ShareProduct Component
const ShareProduct = () => {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className='border-ec p-15 rounded-5'>
      <h4 className='mid-text font-500 text-dark'>Share this product</h4>
      <div className='flex items-center gap-12 mt-8'>
        <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', textDecoration: 'none' }} title="Share on WhatsApp">
          <Icon name="WhatsAppShare" width="18" height="18" fill="#ffffff" />
        </a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#1877F2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', textDecoration: 'none' }} title="Share on Facebook">
          <Icon name="Facebook" width="18" height="18" fill="#ffffff" />
        </a>
        <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', textDecoration: 'none' }} title="Share on X">
          <Icon name="X" width="16" height="16" fill="#ffffff" />
        </a>
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#0A66C2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', textDecoration: 'none' }} title="Share on LinkedIn">
          <Icon name="LinkedIn" width="18" height="18" fill="#ffffff" />
        </a>
        <Button
          onClick={handleCopyLink}
          version="v2"
          className="flex items-center justify-center cursor-pointer"
          style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', padding: 0 }}
          title="Copy Link"
        >
          {copiedLink ? <span style={{ fontSize: '12px', color: '#475569' }}>✓</span> : <Icon name="Link" width="18" height="18" stroke="#475569" strokeWidth="2" />}
        </Button>
      </div>
    </div>
  );
};

const features = [
  {
    icon: '🏷️',
    bg: '#fff7ed',
    title: 'Best Price',
    subtitle: 'Guarantee'
  },
  {
    icon: '🚚',
    bg: '#f0fdf4',
    title: 'Timely Delivery',
    subtitle: 'Nationwide'
  },
  {
    icon: '🛡️',
    bg: '#eff6ff',
    title: '100% Original',
    subtitle: 'Products'
  },
  {
    icon: '💳',
    bg: '#fef2f2',
    title: 'Secure Payments',
    subtitle: 'Safe & Secure'
  }
];

const tabList = [
  { id: 'description', label: 'Product Description' },
  { id: 'specifications', label: 'Specifications' },
  { id: 'compatibility', label: 'Compatibility' },
  { id: 'shipping', label: 'Shipping & Delivery' }
];

const ProductLayout = ({
  productData,
  galleryImages,
  foundProduct,
  seoKeywords = ['HP 88A', 'Toner Cartridge', 'Printer Ink', 'PrintMax Solutions']
}) => {
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(galleryImages?.[0] || '');
  const [activeTab, setActiveTab] = useState('description');

  const productType = foundProduct?.type || 'general';
  const defaultFeatures = productType === 'printer'
    ? ['Sharp & clear prints', 'Easy to install', 'High page yield', 'Reliable performance', 'Leak-proof technology', 'Value for money']
    : productType === 'steel'
      ? ['High tensile strength', 'Corrosion resistant', 'Durable & long lasting', 'Premium surface finish', 'Accurate dimensions', 'Grade certified']
      : ['High Quality Assurance', 'Industry Standard Certified', 'Reliable Performance', 'Durable Construction', 'Tested & Verified', 'Value for Money'];

  const productFeatures = foundProduct?.keyFeatures || foundProduct?.features || defaultFeatures;
  const specsOverview = productData.specs?.slice(0, 5) || [];

  useEffect(() => {
    if (galleryImages && galleryImages.length > 0) {
      setActiveImage(galleryImages[0]);
    }
  }, [galleryImages]);

  return (
    <>
      <SeoHelmet
        title={productData.title}
        description={productData.description}
        keywords={seoKeywords}
        image={activeImage}
        path="/product-detail"
        type="product"
      />
      <ProductSchema product={foundProduct || { name: productData.title, description: productData.description, price: '1250', sku: 'HP-88A' }} />

      <Banner
        title={productData.category || 'Product Detail'}
        desc={productData.title}
        img="https://html.ditsolution.net/industry/indastre1/assets/images/slider/banner.jpg"
        productData={productData}
      />

      <Container>
        <div className="py-50">
          <div className='flex items-start gap-12'>
            <div className='w-75 pr-15 sm-pr-1'>
              {/* Product Overview Section */}
              <div className='grid-cols-2 gap-12'>
                <div className='pr-10 sm-pr-1'>
                  <div className='relative'>
                    <Image
                      src={activeImage}
                      alt={productData.title}
                      className='w-full h-400 object-cover border-ec rounded-5 flex'
                      loading="eager"
                      fetchPriority="high"
                    />
                  </div>
                  <div className='grid-cols-4 gap-9 mt-12'>
                    {galleryImages?.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => setActiveImage(img)}
                        style={{ border: activeImage === img ? '1px solid #2563eb' : '1px solid #e2e8f0' }}
                        className='rounded-5 overflow-hidden cursor-pointer'
                      >
                        <Image src={img} alt={`Thumbnail ${idx + 1}`} className='w-full h-100px flex object-cover' />
                      </div>
                    ))}
                  </div>
                </div>

                <div className='pl-10 sm-pl-1'>
                  <h2 className='title-text text-dark font-600'>
                    {productData.title}
                  </h2>

                  <p className='text-gray mini-text font-400 mb-12 mt-5'>
                    {productData.brand}
                  </p>

                  {/* Rating & Verified Badge */}
                  <div className='flex items-center gap-7 mb-12'>
                    <div className='flex items-center gap-4 bg-light-warning py-2 px-8 rounded-5'>
                      <p className='text-warning font-500 mini-text'>{productData.rating}</p>
                      <p className='text-warning mini-text'>★</p>
                    </div>
                    <p className='text-gray mini-text font-400'>({productData.reviewCount} Reviews)</p>
                  </div>

                  <div className='flex items-center gap-4 mb-6'>
                    <Icon name="Verified" width="18" height="18" fill="#0284c7" />
                    <p className='mini-text text-info font-500'>Verified Supplier</p>
                  </div>

                  {/* Price Block */}
                  <div className='mb-16 pb-12 bordb'>
                    <h4 className='title-text text-dark font-600 text-2xl'>
                      {productData.price}
                    </h4>
                    <p className='text-gray mini-text font-400 mt-2'>
                      {productData.priceSubtext}
                    </p>


                    <p className='small-text text-gray mt-16'>
                      {productData.description}
                    </p>
                  </div>

                  {/* Primary Action Buttons */}
                  <div className='grid-cols-2 gap-12 mt-14'>
                    <Button
                      text="Get Best Quote"
                      bg="primary"
                      version="v3"
                      onClick={() => navigate('/enquiry')}
                      className="font-600"
                    />

                    <Button
                      version="v3"
                      bg="white"
                      onClick={() => window.open(`https://wa.me/?text=Hi%20I%20am%20interested%20in%20${encodeURIComponent(productData.title)}`, '_blank')}
                      style={{ border: '1.5px solid #22c55e', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                      className="font-600"
                    >
                      <Icon name="WhatsApp" width="20" height="20" fill="#16a34a" />
                      Chat on WhatsApp
                    </Button>
                  </div>
                </div>
              </div>

              {/* Feature Highlights Section */}
              <div className='grid-cols-4 gap-12 bg-forth p-20 rounded-5 mt-12'>
                {features.map((item, index) => (
                  <div key={index} className='flex items-center gap-12'>
                    <div className='icon-lg flex items-center justify-center rounded-5 bg-light-warning'>
                      <p className='headpara-text flex'>
                        {item.icon}
                      </p>
                    </div>
                    <div>
                      <p className='small-text font-600 text-dark'>{item.title}</p>
                      <p className='mini-text text-gray'>{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Product Tabs Section */}
              <div className='bg-white mt-12 p-15 border-ec rounded-5'>
                {/* Tab Header */}
                <div className="mb-20">
                  <Tab
                    tabs={tabList.map(tab => ({ name: tab.label, value: tab.id }))}
                    activeTab={activeTab}
                    onChange={setActiveTab}
                  />
                </div>

                {/* Tab Content */}
                {activeTab === 'description' && (
                  <div className='grid-cols-2 gap-12 items-start'>
                    <div className='bg-tertiary p-16 rounded-5'>
                      <h4 className='mid-text font-600 text-dark mb-12'>Specifications Overview</h4>
                      <div className='flex flex-column gap-8'>
                        <div className='flex justify-between py-7 bordb'>
                          <span className='mini-text text-gray'>Brand</span>
                          <span className='mini-text text-dark font-600 text-right'>{productData.brand}</span>
                        </div>
                        {specsOverview.map((spec, sIdx) => (
                          <div key={sIdx} className={`flex justify-between ${sIdx < specsOverview.length - 1 ? 'py-7 bordb' : ''}`}>
                            <span className='mini-text text-gray'>{spec.label}</span>
                            <span className='mini-text text-dark font-600 text-right'>{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className='mid-text font-600 text-dark mb-12'>Key Features</h4>
                      <div className='grid-cols-1 gap-10'>
                        {productFeatures.map((feat, idx) => (
                          <div key={idx} className='flex items-center gap-8'>
                            <span className='text-success font-600 mini-text'>✓</span>
                            <span className='mini-text text-dark font-500'>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'specifications' && (
                  <div>
                    <table className='w-full border-collapse'>
                      <tbody>
                        {productData.specs?.map((s, idx) => (
                          <tr key={idx} className={`bordb ${idx % 2 === 0 ? 'bg-forth' : 'bg-white'}`}>
                            <td className='p-12 mini-text text-gray font-600 w-35'>{s.label}</td>
                            <td className='p-12 mini-text text-dark font-500'>{s.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'compatibility' && (
                  <div className='small-text text-dark'>
                    <p className='font-600 mb-10'>Usage &amp; Compatibility:</p>
                    <ul className='pl-20 m-0 flex flex-column gap-6 text-gray mini-text'>
                      {foundProduct?.compatibility ? (
                        Array.isArray(foundProduct.compatibility) ? (
                          foundProduct.compatibility.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))
                        ) : (
                          <li>{foundProduct.compatibility}</li>
                        )
                      ) : productData.specs?.find(s => s.label === 'Compatibility' || s.label === 'Usage' || s.label === 'Usage/Application') ? (
                        (productData.specs.find(s => s.label === 'Compatibility' || s.label === 'Usage' || s.label === 'Usage/Application').value).split(',').map((model, index) => (
                          <li key={index}>{model.trim()}</li>
                        ))
                      ) : (
                        <li>Suitable for standard industrial and commercial use.</li>
                      )}
                    </ul>
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div className='small-text text-dark'>
                    {foundProduct?.shipping || foundProduct?.shippingDetails ? (
                      <p className='text-gray mini-text m-0'>{foundProduct.shipping || foundProduct.shippingDetails}</p>
                    ) : (
                      <>
                        <p className='font-600 mb-6'>Dispatch &amp; Delivery Information:</p>
                        <p className='text-gray mini-text mb-12'>Orders placed before 2:00 PM are dispatched on the same business day. Standard delivery takes 2-4 business days across major cities in India.</p>
                        <p className='font-600 mb-6'>Packaging:</p>
                        <p className='text-gray mini-text m-0'>All products are sealed in protective packaging inside reinforced corrugated boxes to prevent damage during transit.</p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className='w-25 grid-cols-1 gap-12 pl-15 sm-pl-1'>
              <GetBestPriceForm />
              <SupplierCard brand={productData.brand} />
              <TrustAssurance />
              <ShareProduct />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ProductLayout;
