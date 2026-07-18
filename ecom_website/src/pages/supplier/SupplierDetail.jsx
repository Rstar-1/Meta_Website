import React, { useState, lazy, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products as productsData, categories as categoryData, client as clientData } from '../../utils/apiData';
import Container from '../../components/common/Container';
import CardLayout from '../../components/layout/CardLayout';
import SeoHelmet from '../../components/seo/SeoHelmet';
import BreadcrumbSchema from '../../components/seo/BreadcrumbSchema';
import Banner from '../../components/layout/Banner';
import Tab from '../../components/common/Tab';
import Skeleton from '../../components/common/Skeleton';

const Table = lazy(() => import('../../components/common/Table'));

const SupplierDetail = () => {
  const { brandName } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  // Lookup client in client.json
  const matchedClient = clientData.find(
    (c) => c.name?.toLowerCase() === brandName?.toLowerCase() ||
      c.id?.toLowerCase() === brandName?.toLowerCase()
  );

  // Normalize name
  const nameDisplay = matchedClient?.name || (brandName
    ? brandName.charAt(0).toUpperCase() + brandName.slice(1)
    : 'Verified Supplier');

  // Filter products by this brand
  const supplierProducts = productsData.filter(
    (p) => p.brand?.toLowerCase() === brandName?.toLowerCase()
  );

  // If no products match, check if there's a substring match or fallback
  const finalProducts = supplierProducts.length > 0
    ? supplierProducts
    : productsData.filter(p => p.brand?.toLowerCase().includes(brandName?.toLowerCase() || ''));

  // Get first product to determine location, category, or fallback
  const referenceProduct = finalProducts[0];
  const cityLocation = matchedClient?.location || referenceProduct?.city || 'Delhi, India';
  const supplierCategory = matchedClient?.category || (referenceProduct
    ? (categoryData.find((c) => c.id === referenceProduct.category)?.name || 'Industrial Supplies')
    : 'Industrial Engineering Solutions');

  // Rating metrics
  const averageRating = matchedClient?.rating || referenceProduct?.rating || 4.6;
  const totalReviews = matchedClient?.reviews || referenceProduct?.reviewCount || 245;

  // Additional B2B Profile Data fetched from client.json or resolved dynamically
  const phone = matchedClient?.phone || "+91 11 5555 0199";
  const legalName = matchedClient?.legalName || `${nameDisplay} B2B Distributors Ltd.`;
  const gstin = matchedClient?.gstin || "07AABCPMT234A1ZS (Verified)";
  const established = matchedClient?.established || "Established 2018 (8+ Years)";
  const yearsInBusiness = matchedClient?.yearsInBusiness || "8+";
  const paymentTerms = matchedClient?.paymentTerms || "Net 15 / Net 30 for Corporate Accounts";
  const moq = matchedClient?.moq || "Bulk MOQ of ₹5,000 INR applies";
  const trustScore = matchedClient?.trustScore || "98% Excellent";
  const aboutText = matchedClient?.about || `${nameDisplay} is an established wholesale vendor and certified distributor of premium quality ${supplierCategory}. Operating under verified standard B2B operations, we facilitate smooth bulk procurement, commercial grade supply contracts, and pan-India express logistics.`;

  const profileTableColumns = [
    { header: 'Specification Field', accessor: 'label', style: { width: '40%' } },
    { header: 'Detail / Value', accessor: 'value', style: { width: '60%' } }
  ];

  const profileTableData = [
    { id: 1, label: 'Legal Business Name', value: legalName },
    { id: 2, label: 'Primary Category', value: supplierCategory },
    { id: 3, label: 'GSTIN Registration', value: gstin },
    { id: 4, label: 'Primary Dispatch Hub', value: cityLocation },
    { id: 5, label: 'Years in Operation', value: established },
    { id: 6, label: 'Standard Payment Terms', value: paymentTerms },
    { id: 7, label: 'Minimum Order Quantity (MOQ)', value: moq }
  ];

  const handleProductClick = (id) => {
    navigate(`/product-detail/${id}`);
  };

  return (
    <>
      <SeoHelmet
        title={`${nameDisplay} - Verified Supplier | SOBO`}
        description={`Get authentic products, wholesale prices, and verified profile info for ${nameDisplay}. Location: ${cityLocation}.`}
        keywords={[`${nameDisplay} Supplier`, `${nameDisplay} Wholesale`, `Verified Supplier ${cityLocation}`]}
        path={`/supplier/${brandName}`}
      />

      <BreadcrumbSchema
        links={[
          { name: 'Home', url: '/' },
          { name: 'Products', url: '/products' },
          { name: nameDisplay, url: `/supplier/${brandName}` },
        ]}
      />

      <Banner
        title={nameDisplay}
        desc="Verified B2B Supplier Profile & Catalog"
        img="https://html.ditsolution.net/industry/indastre1/assets/images/slider/banner.jpg"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Products', path: '/products' },
          { label: nameDisplay },
        ]}
      />

      <Container>
        <div className="flex sm-grid-cols-1 gap-12 items-start w-full py-40">
          <div className="grid-cols-1 w-25 sm-w-full gap-12 sticky-top">
            <div className="bg-white border-ec p-18 rounded-5">
              <div className="flex items-center gap-12 bordb pb-12">
                <div
                  className="bg-light-secondary rounded-full flex items-center justify-center"
                  style={{
                    width: '45px',
                    height: '45px',
                  }}
                >
                  <h2 className='font-500 text-secondary title-text'>{nameDisplay.charAt(0)}</h2>
                </div>
                <div>
                  <h2 className="text-dark mid-text font-500">{nameDisplay}</h2>
                  <p className="mini-text text-secondary font-500">Verified Supplier</p>
                </div>
              </div>

              {/* Rating Section */}
              <div className="flex items-center gap-8 mt-10">
                <p className="font-500 text-dark mini-text">{averageRating}</p>
                <p className="text-warning mini-text">★★★★★</p>
                <p className="text-gray mini-text">({totalReviews} Reviews)</p>
              </div>

              <p className="text-gray mini-text mt-12 font-400">
                Supplier of premium B2B products in {supplierCategory} categories.
              </p>

              {/* Details List */}
              <div className="grid-cols-1 gap-7 mt-12">
                <p className='text-gray mini-text font-400'>📍 {cityLocation}</p>
                <p className='text-gray mini-text font-400'>🕒 Years in Business: {yearsInBusiness}</p>
                <p className='text-gray mini-text font-400'>📋 GST No: {gstin}</p>
                <p className='text-gray mini-text font-400'>🛡️ Trust Score: {trustScore}</p>
                <p className='text-gray mini-text font-400'>📞 {phone}</p>

              </div>
            </div>
            <div className="bg-white border-ec p-18 rounded-5">
              <h4 className="headmini-text font-500 text-dark pb-8 bordb">Trust & Assurance</h4>
              <div className="grid-cols-1 gap-12 mt-8">
                <p className="flex items-center gap-8 mini-text text-gray">
                  <span className='text-success'>✓</span> 100% Original Products
                </p>
                <p className="flex items-center gap-8 mini-text text-gray">
                  <span className='text-success'>✓</span> GST Invoices Provided
                </p>
                <p className="flex items-center gap-8 mini-text text-gray">
                  <span className='text-success'>✓</span> Quality Check Completed
                </p>
                <p className="flex items-center gap-8 mini-text text-gray">
                  <span className='text-success'>✓</span> Secure B2B Enquiries
                </p>
              </div>
            </div>
          </div>
          <div className="w-75 sm-w-full">
            <Tab
              tabs={[
                { value: 'profile', name: 'Company Profile' },
                { value: 'catalog', name: 'Products Catalog', count: finalProducts.length }
              ]}
              activeTab={activeTab}
              onChange={setActiveTab}
            />

            {activeTab === 'catalog' && (
              <div className="mt-15">
                {finalProducts.length > 0 ? (
                  <CardLayout
                    items={finalProducts}
                    cardType="product"
                    imageHeight="h-300"
                    cols="3"
                    mdCols="2"
                    smCols="1"
                    gap="12"
                    onCardClick={(product) => handleProductClick(product.id)}
                    onButtonClick={(product) => handleProductClick(product.id)}
                  />
                ) : (
                  <div className="bg-white p-40 rounded-5 text-center text-gray border-ec">
                    <p className="mini-text text-gray font-500">No products found for this supplier.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="mt-15 grid-cols-1 gap-12">
                <div className="bg-forth p-16 rounded-5">
                  <h4 className="mid-text font-600 text-dark mb-3">About {nameDisplay}</h4>
                  <p className="small-text text-gray font-400 m-0">
                    {aboutText}
                  </p>
                </div>

                <Suspense fallback={
                  <div className="bg-white border-ec p-20 rounded-5">
                    <Skeleton variant="rect" height="250px" />
                  </div>
                }>
                  <Table
                    columns={profileTableColumns}
                    data={profileTableData}
                    showControls={false}
                    minWidth="100%"
                  />
                </Suspense>
              </div>
            )}

          </div>
        </div>
      </Container>
    </>
  );
};

export default SupplierDetail;
