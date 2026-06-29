import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import API from '../../api/Api'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../products/ProductCard'

const BrandDetail = () => {
  const { brandName } = useParams()
  const navigate = useNavigate()
  const [brandProducts, setBrandProducts] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    GetBrandProducts()
  }, [brandName])

  const GetBrandProducts = () => {
    API.get('/products', { brand: brandName })
      .then((response) => {
        if (response?.data?.products?.length > 0) {
          setBrandProducts(response.data.products)
        } else {
          navigate("/not-found")
        }
      })
      .catch(() => {
        navigate("/not-found")
      })
  }

  return (
    <>
      <div className="pt-50 pb-50">
        <Container>
          <Row className="gx-3 gy-3">
            <Col lg={12} md={12} sm={12}>
              <div className='flex items-center gap-2'>
                <p className="text-capitalize text-text head-small-text">Products By Brand - {brandName?.replaceAll('-', ' ')}</p>
                {/* <Image src={Images.arrowDown} className="w-full h-[12px] object-contain" /> */}
              </div>
            </Col>
            {brandProducts?.map((item) => (
              <Col key={item?._id} lg={3} md={4} sm={6}>
                <ProductCard
                  image={item?.image?.[0]}
                  subimage={item?.image?.[1]}
                  data={{ ...item, images: item?.image }}
                  name={item?.name}
                  price={item?.price}
                  oldPrice={item?.oldPrice}
                  badge={item?.badge}
                />
              </Col>
            ))}
            {brandProducts?.length === 0 && (
              <Col lg={12} md={12} sm={12}>
                <p className="text-text text-center">No products found for this brand.</p>
              </Col>
            )}
          </Row>
        </Container>
      </div>
    </>
  )
}

export default BrandDetail
