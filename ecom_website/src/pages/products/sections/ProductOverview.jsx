import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/common/Button'

const ProductOverview = ({
  productData,
  galleryImages,
  activeImage,
  setActiveImage,
  isWishlist,
  setIsWishlist
}) => {
  const navigate = useNavigate()

  return (
    <div>
      <div className='grid-cols-2 gap-12'>

        <div>
          <div className='relative'>
            <img
              src={activeImage}
              alt={productData.title}
              className='w-full h-450 object-cover'
            />
          </div>
          <div className='grid-cols-5 gap-9 mt-12'>
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImage(img)}
                style={{ border: activeImage === img ? '2px solid #2563eb' : '1px solid #e2e8f0' }}
                className='rounded-5 overflow-hidden'
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className='w-full h-100px flex object-contain' />
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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#0284c7" className='flex'>
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
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
          </div>

          {/* Quick Specs Table */}
          <div className='grid-cols-2 gap-12 items-start mb-20'>
            {productData.specs.map((spec, index) => (
              <React.Fragment key={index}>
                <p className='text-gray mini-text font-400'>{spec.label}:</p>
                <p className='text-dark mini-text font-600'>{spec.value}</p>
              </React.Fragment>
            ))}
          </div>

          {/* Primary Action Buttons */}
          <div className='grid-cols-2 gap-12'>
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
              onClick={() => window.open('https://wa.me/?text=Hi%20I%20am%20interested%20in%20HP%2088A%20Toner%20Cartridge', '_blank')}
              style={{ border: '1.5px solid #22c55e', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              className="font-600"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#16a34a">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.107 4.04 4.15-1.087z" />
              </svg>
              Chat on WhatsApp
            </Button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default ProductOverview
