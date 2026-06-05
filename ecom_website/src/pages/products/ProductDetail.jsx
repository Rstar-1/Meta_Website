import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import products from '../../data/products.json'
import ProductSchema from '../../components/seo/ProductSchema'
import SeoHelmet from '../../components/seo/SeoHelmet'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find(p => p.id === id) || products[0];

  const handleEnquiry = () => {
    navigate(`/enquiry?productId=${product.id}`)
  }

  const icons = {
    'prod-1': '⚡',
    'prod-2': '🤖',
    'prod-3': '⚙️',
    'prod-4': '🔌'
  };

  return (
    <div className="detail-container">
      <SeoHelmet 
        title={product.name}
        description={product.description}
        keywords={product.tags}
        image={product.images[0]}
        path={`/products/${product.slug}`}
        type="product"
      />
      <ProductSchema product={product} />

      <style>{`
        .detail-container {
          padding: 50px 30px;
          max-width: 1200px;
          margin: 0 auto;
          font-family: 'Outfit', sans-serif;
        }
        .back-btn {
          background: transparent;
          border: none;
          color: #aa3bff;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 30px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .product-view {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 50px;
          margin-bottom: 50px;
        }
        .gallery-box {
          background: #faf9fb;
          border: 1px solid #e5e4e7;
          border-radius: 16px;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 8rem;
        }
        .info-box {
          display: flex;
          flex-direction: column;
        }
        .prod-brand {
          font-size: 0.9rem;
          color: #aa3bff;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 1px;
          margin-bottom: 10px;
        }
        .prod-name {
          font-size: 2.2rem;
          color: #08060d;
          font-weight: 800;
          margin-bottom: 15px;
          line-height: 1.2;
        }
        .rating-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        .stars {
          color: #f59e0b;
        }
        .review-count {
          color: #6b6375;
          font-size: 0.9rem;
        }
        .price-tag {
          font-size: 2rem;
          color: #08060d;
          font-weight: 800;
          margin-bottom: 25px;
        }
        .desc-title {
          font-size: 1.1rem;
          color: #08060d;
          font-weight: 600;
          margin-bottom: 10px;
        }
        .desc-text {
          color: #6b6375;
          line-height: 1.6;
          font-size: 0.95rem;
          margin-bottom: 30px;
        }
        .action-row {
          display: flex;
          gap: 20px;
        }
        .btn-enquiry {
          background: linear-gradient(135deg, #aa3bff, #7c3aed);
          color: #ffffff;
          border: none;
          padding: 15px 35px;
          font-size: 1rem;
          font-weight: 700;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(170, 59, 255, 0.2);
          flex: 1;
        }
        .btn-enquiry:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(170, 59, 255, 0.35);
        }
        .btn-call {
          background: #ffffff;
          color: #08060d;
          border: 1px solid #e5e4e7;
          padding: 15px 35px;
          font-size: 1rem;
          font-weight: 700;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .btn-call:hover {
          background: #faf9fb;
          border-color: #6b6375;
        }
        .specifications-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 40px;
          background: #faf9fb;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #e5e4e7;
        }
        .spec-row {
          border-bottom: 1px solid #e5e4e7;
        }
        .spec-row:last-child {
          border-bottom: none;
        }
        .spec-label {
          padding: 15px 20px;
          color: #6b6375;
          font-weight: 600;
          width: 30%;
          background: rgba(170, 59, 255, 0.02);
        }
        .spec-val {
          padding: 15px 20px;
          color: #08060d;
        }
        @media (max-width: 868px) {
          .product-view {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .gallery-box { height: 300px; font-size: 6rem; }
        }
      `}</style>

      <button className="back-btn" onClick={() => navigate('/products')}>
        ← Back to Catalog
      </button>

      <div className="product-view">
        <div className="gallery-box">
          {icons[product.id] || '🛠️'}
        </div>

        <div className="info-box">
          <span className="prod-brand">{product.brand}</span>
          <h1 className="prod-name">{product.name}</h1>
          
          <div className="rating-row">
            <span className="stars">
              {'★'.repeat(Math.round(parseFloat(product.aggregateRating.ratingValue)))}
              {'☆'.repeat(5 - Math.round(parseFloat(product.aggregateRating.ratingValue)))}
            </span>
            <span className="review-count">({product.aggregateRating.reviewCount} calibration reviews)</span>
          </div>

          <div className="price-tag">${product.price} <span style={{fontSize: '1rem', color: '#6b6375', fontWeight: 500}}>Unit price</span></div>

          <h3 className="desc-title">System Description</h3>
          <p className="desc-text">{product.description}</p>

          <div className="action-row">
            <button className="btn-enquiry" onClick={handleEnquiry}>
              Request Technical Quote
            </button>
            <button className="btn-call" onClick={() => alert('Call Engineering support at +1-555-0199')}>
              Contact Engineer
            </button>
          </div>
        </div>
      </div>

      <table className="specifications-table">
        <tbody>
          <tr className="spec-row">
            <td className="spec-label">System Part (SKU)</td>
            <td className="spec-val">{product.sku}</td>
          </tr>
          <tr className="spec-row">
            <td className="spec-label">Model (MPN)</td>
            <td className="spec-val">{product.mpn}</td>
          </tr>
          <tr className="spec-row">
            <td className="spec-label">Supply Status</td>
            <td className="spec-val">{product.inStock ? 'Available (Standard Lead Times Apply)' : 'On Backorder'}</td>
          </tr>
          <tr className="spec-row">
            <td className="spec-label">Keywords</td>
            <td className="spec-val">{product.tags.join(', ')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ProductDetail
