import React, { useState } from 'react'

const GetBestPriceForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    quantity: '',
    requirement: ''
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => setFormSubmitted(false), 4000)
    setFormData({ name: '', mobile: '', email: '', quantity: '', requirement: '' })
  }

  return (
    <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
      <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: '0 0 4px 0' }}>Get Best Price</h3>
      <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px 0' }}>Fill the form and get quotes from verified suppliers</p>

      {formSubmitted ? (
        <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '16px', borderRadius: '8px', textAlign: 'center', fontSize: '13px' }}>
          <div style={{ fontSize: '24px', marginBottom: '4px' }}>✅</div>
          <strong>Thank you!</strong>
          <p style={{ margin: '4px 0 0 0' }}>Your requirement has been sent to verified suppliers.</p>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            required
            value={formData.name}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
          />
          <input
            type="tel"
            name="mobile"
            placeholder="Enter Mobile Number"
            required
            value={formData.mobile}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email Address"
            required
            value={formData.email}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
          />
          <select
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none', backgroundColor: '#ffffff', boxSizing: 'border-box', color: formData.quantity ? '#0f172a' : '#94a3b8' }}
          >
            <option value="" disabled>Select Quantity</option>
            <option value="1-5">1 - 5 Pieces</option>
            <option value="6-20">6 - 20 Pieces</option>
            <option value="21-50">21 - 50 Pieces</option>
            <option value="50+">50+ Pieces (Bulk)</option>
          </select>
          <textarea
            name="requirement"
            rows="3"
            placeholder="Your Requirement"
            value={formData.requirement}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical' }}
          ></textarea>

          <button
            type="submit"
            style={{ width: '100%', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '12px', borderRadius: '6px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'backgroundColor 0.2s', marginTop: '4px' }}
            onMouseOver={e => e.target.style.backgroundColor = '#1d4ed8'}
            onMouseOut={e => e.target.style.backgroundColor = '#2563eb'}
          >
            Submit Requirement
          </button>

          <div style={{ textAlign: 'center', fontSize: '11px', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginTop: '4px' }}>
            <span>🛡️</span> 100% Secure &amp; Confidential
          </div>
        </form>
      )}
    </div>
  )
}

export default GetBestPriceForm
