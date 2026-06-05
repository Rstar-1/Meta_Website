import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import products from '../../data/products.json'

const Enquiry = () => {
  const [searchParams] = useSearchParams()
  const productId = searchParams.get('productId')
  const selectedProduct = products.find(p => p.id === productId);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: '100',
    productName: selectedProduct ? selectedProduct.name : 'General Enquiry',
    details: ''
  })
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
  }

  return (
    <div className="enquiry-container">
      <style>{`
        .enquiry-container {
          padding: 60px 30px;
          max-width: 650px;
          margin: 0 auto;
          font-family: 'Outfit', sans-serif;
        }
        .card {
          background: #ffffff;
          border: 1px solid #e5e4e7;
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.02);
        }
        .title {
          font-size: 2rem;
          color: #08060d;
          font-weight: 700;
          margin-bottom: 12px;
          text-align: center;
        }
        .title span {
          color: #aa3bff;
        }
        .desc {
          color: #6b6375;
          font-size: 0.95rem;
          margin-bottom: 30px;
          text-align: center;
          line-height: 1.5;
        }
        .form-group {
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .form-label {
          color: #08060d;
          font-size: 0.9rem;
          font-weight: 500;
        }
        .form-input, .form-textarea, .form-select {
          background: #ffffff;
          border: 1px solid #e5e4e7;
          border-radius: 6px;
          padding: 12px;
          color: #08060d;
          outline: none;
          font-size: 0.95rem;
        }
        .form-input:focus, .form-textarea:focus, .form-select:focus {
          border-color: #aa3bff;
        }
        .btn-submit {
          background: linear-gradient(135deg, #aa3bff, #7c3aed);
          color: #ffffff;
          border: none;
          width: 100%;
          padding: 14px;
          font-size: 1rem;
          font-weight: 700;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(170, 59, 255, 0.2);
          margin-top: 15px;
        }
        .btn-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(170, 59, 255, 0.35);
        }
        .success-box {
          text-align: center;
          padding: 30px 10px;
        }
        .success-icon {
          font-size: 3rem;
          color: #aa3bff;
          margin-bottom: 20px;
        }
        .success-title {
          font-size: 1.5rem;
          color: #08060d;
          font-weight: 700;
          margin-bottom: 12px;
        }
        .success-desc {
          color: #6b6375;
          line-height: 1.6;
        }
      `}</style>

      <div className="card">
        {success ? (
          <div className="success-box">
            <div className="success-icon">✓</div>
            <h3 className="success-title">RFQ Submitted Successfully</h3>
            <p className="success-desc">
              Your Request for Quote has been received. Our sales engineering department will contact you within 24 business hours to discuss drafts, lead times, and bulk contracts.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="title">B2B <span>RFQ Portal</span></h2>
            <p className="desc">Request custom engineering configurations, volume pricing models, or customized PLC control schemes.</p>
            
            <div className="form-group">
              <label className="form-label">Contact Name</label>
              <input 
                type="text" 
                className="form-input" 
                required 
                placeholder="John Doe"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Corporate Email</label>
              <input 
                type="email" 
                className="form-input" 
                required 
                placeholder="engineering@company.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input 
                type="tel" 
                className="form-input" 
                required 
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Target System</label>
              <select 
                className="form-select"
                value={formData.productName}
                onChange={e => setFormData({ ...formData, productName: e.target.value })}
              >
                <option value="General Enquiry">General System Commissioning</option>
                {products.map(p => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Target Quantity</label>
              <input 
                type="number" 
                className="form-input" 
                required 
                min="1"
                value={formData.quantity}
                onChange={e => setFormData({ ...formData, quantity: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Technical Details / CAD Specifications</label>
              <textarea 
                className="form-textarea" 
                rows="4" 
                placeholder="Specify PLC communication requirements (Modbus, EtherNet/IP), power parameters, or physical dimensions..."
                value={formData.details}
                onChange={e => setFormData({ ...formData, details: e.target.value })}
              />
            </div>

            <button type="submit" className="btn-submit">
              Submit Request for Quote
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Enquiry
