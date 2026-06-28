import React from 'react'

const ProductReviews = () => {
  return (
    <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px' }}>
      <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: '0 0 20px 0' }}>Customer Reviews</h3>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'center' }}>

        {/* Score Breakdown */}
        <div style={{ flex: '0 0 180px', textAlign: 'center', paddingRight: '20px', borderRight: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '42px', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>4.6</div>
          <div style={{ color: '#f59e0b', fontSize: '16px', margin: '6px 0' }}>★★★★★</div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>Based on 245 Reviews</div>
        </div>

        {/* Rating Progress Bars */}
        <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
          {[
            { stars: '5★', pct: '70%' },
            { stars: '4★', pct: '20%' },
            { stars: '3★', pct: '6%' },
            { stars: '2★', pct: '3%' },
            { stars: '1★', pct: '1%' }
          ].map((bar, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '24px', color: '#64748b' }}>{bar.stars}</span>
              <div style={{ flex: 1, height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: bar.pct, height: '100%', backgroundColor: '#2563eb', borderRadius: '4px' }}></div>
              </div>
              <span style={{ width: '30px', textAlign: 'right', color: '#64748b' }}>{bar.pct}</span>
            </div>
          ))}
        </div>

        {/* Featured Review */}
        <div style={{ flex: '1 1 280px', backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#475569', fontSize: '14px' }}>R</div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Rakesh Sharma</div>
                <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600 }}>✔ Verified Buyer</div>
              </div>
            </div>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>May 10, 2024</span>
          </div>
          <div style={{ color: '#f59e0b', fontSize: '12px', marginBottom: '6px' }}>★★★★★</div>
          <p style={{ fontSize: '12px', color: '#334155', margin: 0, lineHeight: '1.5', italic: 'true' }}>
            "Excellent print quality and page yield. Original product with good packaging and fast delivery. Highly recommended!"
          </p>
        </div>

      </div>
    </div>
  )
}

export default ProductReviews
