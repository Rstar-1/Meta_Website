import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../../data/products.json';
import ProductLayout from '../../components/layout/ProductLayout';

// Import product images from assets
import printerHp88a from '../../assets/printer_hp_88a.png';
import printerCanon74s from '../../assets/printer_canon_74s.png';
import printerCanon746 from '../../assets/printer_canon_746.png';
import printerEpson003 from '../../assets/printer_epson_003.png';
import printerBrotherTn2321 from '../../assets/printer_brother_tn2321.png';
import printerSamsungD111s from '../../assets/printer_samsung_d111s.png';
import ss304Sheets from '../../assets/ss_304_sheets.png';
import ss304Pipes from '../../assets/ss_304_pipes.png';
import ssCoils from '../../assets/ss_coils.png';
import ss316Rods from '../../assets/ss_316_rods.png';
import ssPlates from '../../assets/ss_plates.png';
import ssKitchen from '../../assets/ss_kitchen.png';
import ssFlanges from '../../assets/ss_flanges.png';
import ssAngleBars from '../../assets/ss_angle_bars.png';
import ssWireMesh from '../../assets/ss_wire_mesh.png';
import ssFasteners from '../../assets/ss_fasteners.png';

// Import section components
import { ProductReviews } from './sections';
import PopularProducts from '../home/sections/PopularProducts';

const assetMap = {
  '/src/assets/printer_hp_88a.png': printerHp88a,
  '/src/assets/printer_canon_74s.png': printerCanon74s,
  '/src/assets/printer_canon_746.png': printerCanon746,
  '/src/assets/printer_epson_003.png': printerEpson003,
  '/src/assets/printer_brother_tn2321.png': printerBrotherTn2321,
  '/src/assets/printer_samsung_d111s.png': printerSamsungD111s,
  '/src/assets/ss_304_sheets.png': ss304Sheets,
  '/src/assets/ss_304_pipes.png': ss304Pipes,
  '/src/assets/ss_coils.png': ssCoils,
  '/src/assets/ss_316_rods.png': ss316Rods,
  '/src/assets/ss_plates.png': ssPlates,
  '/src/assets/ss_kitchen.png': ssKitchen,
  '/src/assets/ss_flanges.png': ssFlanges,
  '/src/assets/ss_angle_bars.png': ssAngleBars,
  '/src/assets/ss_wire_mesh.png': ssWireMesh,
  '/src/assets/ss_fasteners.png': ssFasteners
};

const resolveImage = (path) => {
  if (!path) return '';
  if (assetMap[path]) return assetMap[path];
  return path;
};

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
    ? foundProduct.images.map(resolveImage)
    : [
        printerHp88a,
        printerCanon74s,
        printerCanon746,
        printerEpson003,
        printerBrotherTn2321
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
      <PopularProducts />
      <ProductReviews />
    </>
  );
};

export default ProductDetail;
