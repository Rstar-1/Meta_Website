import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SupplierCard = ({ brand = 'PrintMax Solutions' }) => {
  const navigate = useNavigate()

  return (
    <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '20px' }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#2563eb', fontSize: '18px' }}>
          {brand.charAt(0)}
        </div>
        <div>
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
            {brand}
          </div>
          <div style={{ fontSize: '11px', color: '#0284c7', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px' }}>
            <span>✔</span> Verified Supplier
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', marginBottom: '8px' }}>
        <span style={{ fontWeight: 700, color: '#0f172a' }}>4.6</span>
        <span style={{ color: '#f59e0b' }}>★★★★★</span>
        <span style={{ color: '#64748b' }}>(245)</span>
      </div>

      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '16px' }}>
        Supplier of Printer Cartridges
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: '#334155', borderTop: '1px solid #f1f5f9', paddingTop: '12px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>📍</span> Delhi, India
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🕒</span> Years in Business: 8+
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>📋</span> GST No: 07AABCPMT234A1ZS
        </div>
      </div>

      <button
        onClick={() => navigate('/brands')}
        style={{ width: '100%', backgroundColor: '#ffffff', color: '#2563eb', border: '1px solid #bfdbfe', padding: '10px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', marginBottom: '12px' }}
        onMouseOver={e => { e.target.style.backgroundColor = '#eff6ff'; }}
        onMouseOut={e => { e.target.style.backgroundColor = '#ffffff'; }}
      >
        View Supplier Profile
      </button>

      <div style={{ textAlign: 'center' }}>
        <Link to="/products" style={{ fontSize: '12px', color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>
          More Products by this Supplier
        </Link>
      </div>

    </div>
  )
}

export default SupplierCard
