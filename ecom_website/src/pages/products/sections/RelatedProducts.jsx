import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../components/common/Button'

const RelatedProducts = ({ relatedProducts = [] }) => {
  const navigate = useNavigate()

  return (
    <div className="mt-30">
      <div className="flex justify-between items-center mb-16">
        <h3 className="mid-text text-dark font-600">Related Products</h3>
        <Link to="/products" className="text-primary font-500 small-text no-underline">
          View All Products &gt;
        </Link>
      </div>

      <div className='grid-cols-6 gap-12'>
        {relatedProducts?.map(rel => (
          <div
            key={rel.id}
            className="bg-white border border-ec rounded-10 p-12 flex flex-column justify-between cursor-pointer"
            onClick={() => navigate('/product-detail')}
          >
            <div>
              <div className="mb-12">
                <img src={rel.image} alt={rel.title} className="w-full h-200 object-cover" />
              </div>
              <h2 className="text-dark font-500 mid-text">
                {rel.title}
              </h2>
              <p className="text-gray font-500 mini-text mt-8 mb-12">
                {rel.price}
              </p>
            </div>

            <Button
              text="View Products"
              bg="primary"
              version="v3"
              onClick={(e) => {
                e.stopPropagation()
                navigate('/product-detail')
              }}
              className="font-500"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts
