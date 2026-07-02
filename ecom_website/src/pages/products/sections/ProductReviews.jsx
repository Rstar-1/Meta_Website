import React from 'react'
import Container from '../../../components/common/Container'

const ProductReviews = () => {
  return (
    <Container className="">
      <div className="py-30 w-full">
        <h3 className="mid-text font-700 text-dark mb-20">Customer Reviews</h3>

        <div className="flex flex-wrap items-center" style={{ gap: '32px' }}>

          {/* Score Breakdown */}
          <div className="pr-20" style={{ flex: '0 0 180px', textAlign: 'center', borderRight: '1px solid #f1f5f9' }}>
            <div className="font-800 text-dark" style={{ fontSize: '42px', lineHeight: 1 }}>4.6</div>
            <div className="small-text font-600 my-6" style={{ color: '#f59e0b' }}>★★★★★</div>
            <div className="mini-text text-gray">Based on 245 Reviews</div>
          </div>

          {/* Rating Progress Bars */}
          <div className="flex flex-column gap-6 mini-text" style={{ flex: '1 1 200px' }}>
            {[
              { stars: '5★', pct: '70%' },
              { stars: '4★', pct: '20%' },
              { stars: '3★', pct: '6%' },
              { stars: '2★', pct: '3%' },
              { stars: '1★', pct: '1%' }
            ].map((bar, idx) => (
              <div key={idx} className="flex items-center gap-8">
                <span className="text-gray" style={{ width: '24px' }}>{bar.stars}</span>
                <div className="rounded-5 overflow-hidden" style={{ flex: 1, height: '8px', backgroundColor: '#e2e8f0' }}>
                  <div className="bg-primary rounded-5" style={{ width: bar.pct, height: '100%' }}></div>
                </div>
                <span className="text-gray" style={{ width: '30px', textAlign: 'right' }}>{bar.pct}</span>
              </div>
            ))}
          </div>

          {/* Featured Review */}
          <div className="bg-forth p-16 rounded-10 border-ec" style={{ flex: '1 1 280px' }}>
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-8">
                <div className="rounded-full flex items-center justify-center font-700 text-gray small-text" style={{ width: '32px', height: '32px', backgroundColor: '#cbd5e1' }}>R</div>
                <div>
                  <div className="small-text font-700 text-dark">Rakesh Sharma</div>
                  <div className="mini-text text-success font-600">✔ Verified Buyer</div>
                </div>
              </div>
              <span className="mini-text text-gray">May 10, 2024</span>
            </div>
            <div className="mini-text mb-6" style={{ color: '#f59e0b' }}>★★★★★</div>
            <p className="mini-text text-dark m-0" style={{ lineHeight: '1.5', fontStyle: 'italic' }}>
              "Excellent print quality and page yield. Original product with good packaging and fast delivery. Highly recommended!"
            </p>
          </div>

        </div>
      </div>
    </Container>
  )
}

export default ProductReviews
