import React, { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../../utils/productsData';
import ProductLayout from '../../components/layout/ProductLayout';
import { resolveImagePath } from '../../utils/imageResolver';
import Skeleton from '../../components/common/Skeleton';

// Lazy load section components
const ProductReviews = lazy(() => import('./sections/ProductReviews'));

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
        <div className="container mx-auto py-40">
          <Skeleton variant="text" width="200px" height="30px" />
          <div className="grid-cols-2 gap-12 mt-12">
            <Skeleton variant="rect" height="150px" />
            <Skeleton variant="rect" height="150px" />
          </div>
        </div>
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
