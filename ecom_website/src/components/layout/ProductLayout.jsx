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

// Inline GetBestPriceForm Component
const GetBestPriceForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    quantity: '',
    requirement: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
    setFormData({ name: '', mobile: '', email: '', quantity: '', requirement: '' });
  };

  return (
    <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
      <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: '0 0 4px 0' }}>Get Best Price</h3>
      <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px 0' }}>Fill the form and get quotes from verified suppliers</p>

      {formSubmitted ? (
        <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '16px', borderRadius: '8px', textAlign: 'center', fontSize: '13px' }}>
          <div style={{ fontSize: '24px', marginBottom: '4px' }}>✅</div>
          <strong>Thank you!</strong>
          <p style={{ margin: '4px 0 0 0' }}>Your requirement has been sent to verified suppliers.</p>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            required
            value={formData.name}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
          />
          <input
            type="tel"
            name="mobile"
            placeholder="Enter Mobile Number"
            required
            value={formData.mobile}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email Address"
            required
            value={formData.email}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
          />
          <select
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none', backgroundColor: '#ffffff', boxSizing: 'border-box', color: formData.quantity ? '#0f172a' : '#94a3b8' }}
          >
            <option value="" disabled>Select Quantity</option>
            <option value="1-5">1 - 5 Pieces</option>
            <option value="6-20">6 - 20 Pieces</option>
            <option value="21-50">21 - 50 Pieces</option>
            <option value="50+">50+ Pieces (Bulk)</option>
          </select>
          <textarea
            name="requirement"
            rows="3"
            placeholder="Your Requirement"
            value={formData.requirement}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical' }}
          ></textarea>

          <button
            type="submit"
            style={{ width: '100%', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '12px', borderRadius: '6px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'backgroundColor 0.2s', marginTop: '4px' }}
            onMouseOver={e => e.target.style.backgroundColor = '#1d4ed8'}
            onMouseOut={e => e.target.style.backgroundColor = '#2563eb'}
          >
            Submit Requirement
          </button>

          <div style={{ textAlign: 'center', fontSize: '11px', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginTop: '4px' }}>
            <span>🛡️</span> 100% Secure &amp; Confidential
          </div>
        </form>
      )}
    </div>
  );
};

// Inline SupplierCard Component
const SupplierCard = ({ brand = 'PrintMax Solutions' }) => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#2563eb', fontSize: '18px' }}>
          {brand.charAt(0)}
        </div>
        <div>
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
            {brand}
          </div>
          <div style={{ fontSize: '11px', color: '#0284c7', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px' }}>
            <span>✔</span> Verified Supplier
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', marginBottom: '8px' }}>
        <span style={{ fontWeight: 700, color: '#0f172a' }}>4.6</span>
        <span style={{ color: '#f59e0b' }}>★★★★★</span>
        <span style={{ color: '#64748b' }}>(245)</span>
      </div>

      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '16px' }}>
        Supplier of Printer Cartridges
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: '#334155', borderTop: '1px solid #f1f5f9', paddingTop: '12px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>📍</span> Delhi, India
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🕒</span> Years in Business: 8+
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>📋</span> GST No: 07AABCPMT234A1ZS
        </div>
      </div>

      <button
        onClick={() => navigate('/brands')}
        style={{ width: '100%', backgroundColor: '#ffffff', color: '#2563eb', border: '1px solid #bfdbfe', padding: '10px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', marginBottom: '12px' }}
        onMouseOver={e => { e.target.style.backgroundColor = '#eff6ff'; }}
        onMouseOut={e => { e.target.style.backgroundColor = '#ffffff'; }}
      >
        View Supplier Profile
      </button>

      <div style={{ textAlign: 'center' }}>
        <Link to="/products" style={{ fontSize: '12px', color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>
          More Products by this Supplier
        </Link>
      </div>
    </div>
  );
};

// Inline TrustAssurance Component
const TrustAssurance = () => {
  return (
    <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
      <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: '0 0 12px 0' }}>Trust &amp; Assurance</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#334155' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#16a34a', fontWeight: 700 }}>✓</span> Verified Supplier
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#16a34a', fontWeight: 700 }}>✓</span> 100% Original Products
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#16a34a', fontWeight: 700 }}>✓</span> GST Invoice Available
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#16a34a', fontWeight: 700 }}>✓</span> Easy Returns
        </div>
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
    <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: '0 0 14px 0' }}>Share this product</h4>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
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
        <button onClick={handleCopyLink} style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} title="Copy Link">
          {copiedLink ? <span style={{ fontSize: '12px' }}>✓</span> : <Icon name="Link" width="18" height="18" stroke="#475569" strokeWidth="2" />}
        </button>
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
          <div className='flex gap-12'>
            {/* Left Column - 75% width */}
            <div className='w-75'>
              {/* Product Overview Section */}
              <div className='grid-cols-2 gap-12'>
                <div>
                  <div className='relative'>
                    <Image
                      src={activeImage}
                      alt={productData.title}
                      className='w-full h-400 object-cover border-ec rounded-5'
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

                <div>
                  <h2 className='title-text text-dark font-600'>
                    {productData.title}
                  </h2>

                  <p className='text-gray mini-text font-400 mb-20 mt-5'>
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
              <div className='bg-white border border-ec p-20 rounded-5 mt-12'>
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

            {/* Right Column - 25% width */}
            <div className='w-25'>
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
