import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/common/Button'
import Icon from '../../../components/common/Icon'

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
              <Icon name="WhatsApp" width="20" height="20" fill="#16a34a" />
              Chat on WhatsApp
            </Button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default ProductOverview
