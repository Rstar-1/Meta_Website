import React, { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../../utils/apiData';
import ProductLayout from '../../components/layout/ProductLayout';
import { resolveImagePath } from '../../utils/imageResolver';
import Skeleton from '../../components/common/Skeleton';
import Container from '../../components/common/Container';

// Lazy load section components
const ProductReviews = lazy(() => import('./sections/ProductReviews'));

// DRY Skeleton Helper Components
const SectionHeaderSkeleton = ({ titleWidth = '200px' }) => (
  <div className="flex justify-between items-center mb-10">
    <Skeleton variant="rect" width={titleWidth} height="32px" borderRadius="4px" theme="adaptive" />
    <Skeleton variant="rect" width="80px" height="20px" borderRadius="4px" theme="adaptive" />
  </div>
);

const CardGridSkeleton = ({ count = 4, className = 'grid-cols-4 md-grid-cols-2 sm-grid-cols-1 gap-12' }) => (
  <div className={className}>
    <Skeleton variant="card" count={count} theme="adaptive" />
  </div>
);

const ProductDetail = () => {
  const { id } = useParams();
  const foundProduct = products.find(p => p.id === id || p.slug === id);

  // Default product data matching the requested UI image
  const productData = {
    title: foundProduct ? foundProduct.name : 'HP 88A Toner Cartridge (Black)',
    brand: foundProduct ? foundProduct.brand : 'PrintMax Solutions',
    rating: foundProduct ? (foundProduct.rating || 4.6) : 4.6,
    reviewCount: foundProduct ? (foundProduct.reviewCount || 245) : 245,
    price: foundProduct ? foundProduct.priceDisplay : '₹ 1,250 / Piece',
    priceSubtext: 'Prices are inclusive of all taxes',
    isBestseller: true,
    description: foundProduct ? foundProduct.description : 'HP 88A Toner Cartridge (Black) delivers professional quality prints with crisp text and sharp images. Designed for reliability and high performance, it ensures consistent results and long lasting prints.',
    category: foundProduct ? foundProduct.category : 'Printer Cartridges',
    specs: foundProduct && foundProduct.specs ? foundProduct.specs : [
      { label: 'Cartridge Type', value: 'Toner Cartridge' },
      { label: 'Color', value: 'Black' },
      { label: 'Model', value: 'HP 88A (CC388A)' },
      { label: 'Compatibility', value: 'HP LaserJet P1007, P1008, P1106, P1108, M1136, M1213nf, M1216nfh, M126nw' },
      { label: 'Page Yield', value: 'Up to 1500 pages (at 5% coverage)' },
      { label: 'Technology', value: 'Laser Toner' },
      { label: 'Warranty', value: '6 Months' },
      { label: 'Condition', value: 'New' },
      { label: 'Pack Type', value: 'Box' },
      { label: 'Supply Type', value: 'Wholesale / Bulk' },
      { label: 'Usage/Application', value: 'For Laser Printers' }
    ]
  };

  // Thumbnails gallery list
  const galleryImages = foundProduct && foundProduct.images
    ? foundProduct.images.map(resolveImagePath)
    : [
      resolveImagePath('/src/assets/printer_hp_88a.webp'),
      resolveImagePath('/src/assets/printer_canon_74s.webp'),
      resolveImagePath('/src/assets/printer_canon_746.webp'),
      resolveImagePath('/src/assets/printer_epson_003.webp'),
      resolveImagePath('/src/assets/printer_brother_tn2321.webp')
    ];

  const keywords = foundProduct && foundProduct.tags
    ? foundProduct.tags
    : ['HP 88A', 'Toner Cartridge', 'Printer Ink', 'PrintMax Solutions'];

  return (
    <>
      <ProductLayout
        productData={productData}
        galleryImages={galleryImages}
        foundProduct={foundProduct}
        seoKeywords={keywords}
      />
      <Suspense fallback={
        <Container>
          <div className="py-40 w-full">
            <SectionHeaderSkeleton titleWidth="200px" />
            <CardGridSkeleton count={2} className="grid-cols-2 md-grid-cols-1 gap-12 mt-12" />
          </div>
        </Container>
      }>
        <ProductReviews
          rating={foundProduct?.rating}
          reviewCount={foundProduct?.reviewCount}
          reviews={foundProduct?.reviews}
          productName={foundProduct?.name}
          galleryImages={galleryImages}
        />
      </Suspense>
    </>
  );
};

export default ProductDetail;
