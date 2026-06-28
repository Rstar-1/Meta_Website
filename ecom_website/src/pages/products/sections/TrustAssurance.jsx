import React from 'react'

const TrustAssurance = () => {
  return (
    <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
      <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: '0 0 12px 0' }}>Trust &amp; Assurance</h4>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#334155' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#16a34a', fontWeight: 700 }}>✓</span> Verified Supplier
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#16a34a', fontWeight: 700 }}>✓</span> 100% Original Products
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#16a34a', fontWeight: 700 }}>✓</span> GST Invoice Available
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#16a34a', fontWeight: 700 }}>✓</span> Easy Returns
        </div>
      </div>
    </div>
  )
}

export default TrustAssurance
