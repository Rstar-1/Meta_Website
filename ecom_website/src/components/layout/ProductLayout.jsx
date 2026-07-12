import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { addToCart } from '../../utils/cartHelper';
import Icon from '../common/Icon';
import Container from '../common/Container';
import Image from '../common/Image';
import Tab from '../common/Tab';
import SeoHelmet from '../seo/SeoHelmet';
import ProductSchema from '../seo/ProductSchema';
import { productMetaTemplate } from '../../seo/metaTemplates';
import Banner from './Banner';

import FormBuilder from '../common/FormBuilder';
import Fields from '../common/Fields';
import clientData from '../../data/client.json';

import ProductEnquiryForm from '../forms/ProductEnquiryForm';

export const GetBestPriceForm = ProductEnquiryForm;

// Inline SupplierCard Component
const SupplierCard = ({ brand = 'PrintMax Solutions' }) => {
  const navigate = useNavigate();

  // Lookup client in client.json
  const matchedClient = clientData.find(
    (c) => c.name?.toLowerCase() === brand?.toLowerCase() ||
           c.id?.toLowerCase() === brand?.toLowerCase()
  );

  const nameDisplay = matchedClient?.name || brand;
  const rating = matchedClient?.rating || 4.6;
  const reviews = matchedClient?.reviews || 245;
  const location = matchedClient?.location || "Delhi, India";
  const yearsInBusiness = matchedClient?.yearsInBusiness || "8+";
  const gstin = matchedClient?.gstin || "07AABCPMT234A1ZS";
  const category = matchedClient?.category || "Industrial Products";

  return (
    <div className='border-ec p-15 rounded-5'>
      <div className='flex items-center gap-10'>
        <p className='bg-light-secondary icon-lg text-primary rounded-5 font-600 para-text'>
          {nameDisplay.charAt(0)}
        </p>
        <div>
          <p className='text-dark mid-text font-600'>
            {nameDisplay}
          </p>
          <p className='text-secondary mini-text font-600 flex-items-center gap-3'>
            ✔ Verified Supplier
          </p>
        </div>
      </div>

      <div className='flex items-center gap-8 mt-6'>
        <p className='mini-text text-dark font-600'>{rating}</p>
        <p className='small-text text-warning'>★★★★★</p>
        <p className='mini-text text-gray'>({reviews})</p>
      </div>

      <p className='text-gray mini-text mt-5'>Supplier of {category}</p>

      <div className='grid-cols-1 gap-9 bordh py-6'>
        <p className='text-gray mini-text font-500'>📍 {location}</p>
        <p className='text-gray mini-text font-500'>🕒 Years in Business: {yearsInBusiness}</p>
        <p className='text-gray mini-text font-500'>📋 GST No: {gstin}</p>
      </div>

      <Button
        onClick={() => navigate(`/supplier/${brand}`)}
        version="v3"
        bg="secondary"
        className="font-600 mt-8"
      >
        View Supplier Profile
      </Button>

      <p onClick={() => navigate(`/supplier/${brand}`)} className='text-secondary cursor-pointer text-center mini-text mt-8'>
        More Products by this Supplier
      </p>

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
  const [quantity, setQuantity] = useState(1);

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

  const productMeta = useMemo(() => {
    const productObj = foundProduct || {
      name: productData.title,
      description: productData.description,
      tags: seoKeywords,
      image: activeImage
    };
    return productMetaTemplate(productObj, typeof window !== 'undefined' ? window.location.origin : 'https://sobo-marketing.com');
  }, [foundProduct, productData, seoKeywords, activeImage]);

  return (
    <>
      <SeoHelmet
        title={productMeta.title}
        description={productMeta.description}
        keywords={productMeta.keywords}
        image={productMeta.image}
        path={productMeta.path}
        canonical={productMeta.canonical}
        type={productMeta.type}
      />

      <ProductSchema
        product={
          foundProduct || {
            name: productData.title,
            description: productData.description,
            price: productData.price ? String(productData.price).replace(/[^0-9.]/g, '') : '0.00',
            sku: productData.specs?.find(s => s.label === 'Model' || s.label === 'SKU')?.value || 'GENERIC-SKU',
            brand: productData.brand || 'Generic',
            images: galleryImages,
            priceCurrency: 'INR',
            inStock: true
          }
        }
        reviews={foundProduct?.reviews || []}
      />

      <Banner
        title={productData.category || 'Product Detail'}
        desc={productData.title}
        img="https://html.ditsolution.net/industry/indastre1/assets/images/slider/banner.jpg"
        productData={productData}
      />

      <Container>
        <div className="py-50">
          <div className='flex sm-grid-cols-1 items-start gap-12'>
            <div className='w-75 sm-w-full pr-15 sm-pr-1'>
              {/* Product Overview Section */}
              <div className='grid-cols-2 sm-grid-cols-1 gap-12'>
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

                  <div className='flex items-center gap-4 mb-9'>
                    <Icon name="Verified" width="18" height="18" fill="#0284c7" />
                    <p className='mini-text text-info font-500'>Verified Supplier</p>
                  </div>

                  {/* Price Block */}
                  <div className='pb-12'>
                    <h4 className='title-text text-dark font-600'>
                      {productData.price}
                    </h4>
                    <p className='text-gray mini-text font-400 mt-6'>
                      {productData.priceSubtext}
                    </p>

                    <div className='flex items-center gap-12 mt-10'>
                      <p className='small-text text-dark font-500'>Quantity:</p>
                      <Fields
                        type="quantity"
                        value={quantity}
                        onChange={setQuantity}
                      />
                    </div>

                    <p className='mini-text text-gray mt-12'>
                      {productData.description}
                    </p>

                    <div className='grid-cols-2 gap-12 mt-12'>
                      {features?.map((item, index) => (
                        <div key={index} className='flex items-center gap-12 bg-forth p-12 rounded-5'>
                          <div className='icon-lg flex items-center justify-center rounded-5 bg-light-warning'>
                            <p className='headpara-text flex'>
                              {item.icon}
                            </p>
                          </div>
                          <div>
                            <h3 className='headmini-text font-600 text-dark'>{item.title}</h3>
                            <p className='mini-text font-400 text-gray'>{item.subtitle}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className='grid-cols-2 gap-12 mt-8'>
                    <Button
                      text="Add to Cart"
                      bg="primary"
                      version="v3"
                      onClick={() => {
                        const targetProduct = foundProduct || {
                          id: productData.sku || 'general-product',
                          name: productData.title,
                          price: productData.price,
                          image: galleryImages?.[0] || '',
                          ...productData
                        };
                        addToCart(targetProduct, quantity);
                        navigate('/cart');
                      }}
                      className="font-600"
                    />

                    <Button
                      version="v3"
                      bg="success"
                      variant="outline"
                      icon="WhatsApp"
                      iconWidth="20"
                      iconHeight="20"
                      className="font-600"
                      onClick={() => window.open(`https://wa.me/?text=Hi%20I%20am%20interested%20in%20${encodeURIComponent(productData.title)}`, '_blank')}
                    >
                      Chat on WhatsApp
                    </Button>
                  </div>
                </div>
              </div>

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
                  <div className='grid-cols-2 sm-grid-cols-1 gap-12 items-start'>
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

            <div className='w-25 sm-w-full grid-cols-1 gap-12 pl-15 sm-pl-1'>
              <ProductEnquiryForm />
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
