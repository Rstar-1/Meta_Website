import React from 'react'

const features = [
  {
    icon: '🏷️',
    bg: '#fff7ed',
    title: 'Best Price',
    subtitle: 'Guarantee'
  },
  {
    icon: '🚚',
    bg: '#f0fdf4',
    title: 'Timely Delivery',
    subtitle: 'Nationwide'
  },
  {
    icon: '🛡️',
    bg: '#eff6ff',
    title: '100% Original',
    subtitle: 'Products'
  },
  {
    icon: '💳',
    bg: '#fef2f2',
    title: 'Secure Payments',
    subtitle: 'Safe & Secure'
  }
]

const FeatureHighlights = () => {
  return (
    <div className='grid-cols-4 gap-12 bg-forth p-20 rounded-5 mt-12'>
      {features.map((item, index) => (
        <div key={index} className='flex items-center gap-12'>
          <div className='icon-lg flex items-center justify-center rounded-5 bg-light-warning'>
            <p className='headpara-text flex'>
              {item.icon}
            </p>
          </div>
          <div>
            <p className='small-text font-600 text-dark'>{item.title}</p>
            <p className='mini-text text-gray'>{item.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FeatureHighlights
