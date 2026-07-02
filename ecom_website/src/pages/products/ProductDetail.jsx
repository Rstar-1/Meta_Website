import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import products from '../../data/products.json'
import ProductSchema from '../../components/seo/ProductSchema'
import SeoHelmet from '../../components/seo/SeoHelmet'

// Import product images from assets
import printerHp88a from '../../assets/printer_hp_88a.png'
import printerCanon746 from '../../assets/printer_canon_746.png'
import printerCanon74s from '../../assets/printer_canon_74s.png'
import printerEpson003 from '../../assets/printer_epson_003.png'
import printerBrotherTn2321 from '../../assets/printer_brother_tn2321.png'

// Import section components
import {
  ProductOverview,
  ProductReviews
} from './sections'
import PopularProducts from '../home/sections/PopularProducts'

const ProductDetail = () => {
  const { id } = useParams()
  const foundProduct = products.find(p => p.id === id || p.slug === id)

  // Default product data matching the requested UI image
  const productData = {
    title: foundProduct ? foundProduct.name : 'HP 88A Toner Cartridge (Black)',
    brand: foundProduct ? foundProduct.brand : 'PrintMax Solutions',
    rating: foundProduct ? parseFloat(foundProduct.aggregateRating?.ratingValue || 4.6) : 4.6,
    reviewCount: foundProduct ? (foundProduct.aggregateRating?.reviewCount || 245) : 245,
    price: foundProduct ? `₹ ${foundProduct.price} / Piece` : '₹ 1,250 / Piece',
    priceSubtext: 'Prices are inclusive of all taxes',
    isBestseller: true,
    description: foundProduct ? foundProduct.description : 'HP 88A Toner Cartridge (Black) delivers professional quality prints with crisp text and sharp images. Designed for reliability and high performance, it ensures consistent results and long lasting prints.',
    specs: [
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
  }

  // Thumbnails gallery list
  const galleryImages = [
    printerHp88a,
    printerCanon74s,
    printerCanon746,
    printerEpson003,
    printerBrotherTn2321
  ]

  const [activeImage, setActiveImage] = useState(printerHp88a)
  const [isWishlist, setIsWishlist] = useState(false)

  return (
    <>
      <SeoHelmet
        title={productData.title}
        description={productData.description}
        keywords={['HP 88A', 'Toner Cartridge', 'Printer Ink', 'PrintMax Solutions']}
        image={activeImage}
        path="/product-detail"
        type="product"
      />
      <ProductSchema product={foundProduct || { name: productData.title, description: productData.description, price: '1250', sku: 'HP-88A' }} />

      <div className='py-50'>
        <ProductOverview
          title={productData.title}
          productData={productData}
          galleryImages={galleryImages}
          activeImage={activeImage}
          setActiveImage={setActiveImage}
          isWishlist={isWishlist}
          setIsWishlist={setIsWishlist}
        />
      </div>
      <PopularProducts />
      <ProductReviews />
    </>
  )
}

export default ProductDetail
