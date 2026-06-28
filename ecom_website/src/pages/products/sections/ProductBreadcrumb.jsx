import React from 'react'
import { Link } from 'react-router-dom'

const ProductBreadcrumb = ({ title }) => {
  return (
    <nav className='flex items-center gap-12 text-13px text-[#64748b] mb-20px flex-wrap'>
      <Link 
        to="/home" 
        className='text-[#64748b] no-underline transition-color 0.2s' 
        onMouseOver={e => e.target.style.color = '#2563eb'} 
        onMouseOut={e => e.target.style.color = '#64748b'}
      >
        Home
      </Link>
      <span>&gt;</span>
      <Link 
        to="/products" 
        className='text-[#64748b] no-underline transition-color 0.2s' 
        onMouseOver={e => e.target.style.color = '#2563eb'} 
        onMouseOut={e => e.target.style.color = '#64748b'}
      >
        Printer Cartridges
      </Link>
      <span>&gt;</span>
      <span className='text-[#64748b]'>Toner Cartridges</span>
      <span>&gt;</span>
      <span className='text-[#0f172a] font-semibold'>{title}</span>
    </nav>
  )
}

export default ProductBreadcrumb
