import React from 'react'

const ProductTabs = ({ productData, activeTab, setActiveTab }) => {
  const tabList = [
    { id: 'description', label: 'Product Description' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'compatibility', label: 'Compatibility' },
    { id: 'shipping', label: 'Shipping & Delivery' }
  ]

  return (
    <div className='bg-white border border-ec p-20 rounded-5 mt-12'>

      {/* Tab Header */}
      <div className='flex gap-20 bordb pb-12 overflow-x-auto mb-20'>
        {tabList.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`small-text font-600 cursor-pointer border-0 bg-transparent pb-8 transition-color ${
              activeTab === tab.id ? 'text-primary' : 'text-gray'
            }`}
            style={{
              borderBottom: activeTab === tab.id ? '2px solid var(--primary)' : '2px solid transparent',
              marginBottom: '-13px'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'description' && (
        <div className='grid-cols-2 gap-20 items-start'>
          <div>
            <p className='small-text text-gray mb-16'>
              {productData.description}
            </p>
            <h4 className='small-text font-600 text-dark mb-12'>Key Features</h4>
            <div className='grid-cols-2 gap-10'>
              {['Sharp & clear prints', 'Easy to install', 'High page yield', 'Reliable performance', 'Leak-proof technology', 'Value for money'].map((feat, idx) => (
                <div key={idx} className='flex items-center gap-8'>
                  <span className='text-success font-600 mini-text'>✓</span>
                  <span className='mini-text text-dark font-500'>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className='bg-forth p-16 rounded-5 border border-ec'>
            <h4 className='small-text font-600 text-dark mb-12'>Specifications Overview</h4>
            <div className='flex flex-column gap-8'>
              <div className='flex justify-between pb-6 bordb'>
                <span className='mini-text text-gray'>Brand</span>
                <span className='mini-text text-dark font-600'>HP</span>
              </div>
              <div className='flex justify-between pb-6 bordb'>
                <span className='mini-text text-gray'>Model</span>
                <span className='mini-text text-dark font-600'>88A (CC388A)</span>
              </div>
              <div className='flex justify-between pb-6 bordb'>
                <span className='mini-text text-gray'>Color</span>
                <span className='mini-text text-dark font-600'>Black</span>
              </div>
              <div className='flex justify-between pb-6 bordb'>
                <span className='mini-text text-gray'>Cartridge Type</span>
                <span className='mini-text text-dark font-600'>Toner Cartridge</span>
              </div>
              <div className='flex justify-between pb-6 bordb'>
                <span className='mini-text text-gray'>Page Yield</span>
                <span className='mini-text text-dark font-600'>Up to 1500 pages</span>
              </div>
              <div className='flex justify-between'>
                <span className='mini-text text-gray'>Country of Origin</span>
                <span className='mini-text text-dark font-600'>China</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'specifications' && (
        <div>
          <table className='w-full border-collapse'>
            <tbody>
              {productData.specs?.map((s, idx) => (
                <tr key={idx} className={`bordb ${idx % 2 === 0 ? 'bg-forth' : 'bg-white'}`}>
                  <td className='p-12 mini-text text-gray font-600 w-35'>{s.label}</td>
                  <td className='p-12 mini-text text-dark font-500'>{s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'compatibility' && (
        <div className='small-text text-dark'>
          <p className='font-600 mb-10'>This toner cartridge is compatible with the following printer models:</p>
          <ul className='pl-20 m-0 flex flex-column gap-6 text-gray mini-text'>
            <li>HP LaserJet P1007</li>
            <li>HP LaserJet P1008</li>
            <li>HP LaserJet P1106</li>
            <li>HP LaserJet P1108</li>
            <li>HP LaserJet Pro M1136 MFP</li>
            <li>HP LaserJet Pro M1213nf MFP</li>
            <li>HP LaserJet Pro M1216nfh MFP</li>
            <li>HP LaserJet Pro M126nw MFP</li>
          </ul>
        </div>
      )}

      {activeTab === 'shipping' && (
        <div className='small-text text-dark'>
          <p className='font-600 mb-6'>Dispatch &amp; Delivery Information:</p>
          <p className='text-gray mini-text mb-12'>Orders placed before 2:00 PM are dispatched on the same business day. Standard delivery takes 2-4 business days across major cities in India.</p>
          <p className='font-600 mb-6'>Packaging:</p>
          <p className='text-gray mini-text m-0'>All products are sealed in protective anti-static packaging inside reinforced corrugated boxes to prevent damage during transit.</p>
        </div>
      )}

    </div>
  )
}

export default ProductTabs
