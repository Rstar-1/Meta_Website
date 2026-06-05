import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import products from '../../data/products.json'
import categories from '../../data/categories.json'
import brands from '../../data/brands.json'

const Products = () => {
  const navigate = useNavigate()
  const [selectedCat, setSelectedCat] = useState('All')
  const [selectedBrand, setSelectedBrand] = useState('All')
  const [search, setSearch] = useState('')

  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCat === 'All' || p.category === selectedCat;
    const matchesBrand = selectedBrand === 'All' || p.brand === selectedBrand;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesBrand && matchesSearch;
  })

  return (
    <div className="shop-container">
      <style>{`
        .shop-container {
          padding: 50px 30px;
          max-width: 1200px;
          margin: 0 auto;
          font-family: 'Outfit', sans-serif;
        }
        .shop-title {
          font-size: 2.2rem;
          font-weight: 700;
          color: #08060d;
          margin-bottom: 30px;
        }
        .shop-title span {
          color: #aa3bff;
        }
        .filter-section {
          background: #faf9fb;
          border: 1px solid #e5e4e7;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 40px;
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          align-items: center;
        }
        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .filter-label {
          font-size: 0.85rem;
          color: #6b6375;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .filter-select, .search-input {
          background: #ffffff;
          border: 1px solid #e5e4e7;
          color: #08060d;
          padding: 10px 16px;
          border-radius: 6px;
          font-size: 0.95rem;
          outline: none;
          min-width: 180px;
        }
        .filter-select:focus, .search-input:focus {
          border-color: #aa3bff;
        }
        .search-input {
          min-width: 250px;
          flex: 1;
        }
        .results-count {
          color: #6b6375;
          font-size: 0.95rem;
          margin-bottom: 20px;
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 30px;
        }
        .product-card {
          background: #ffffff;
          border: 1px solid #e5e4e7;
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
          position: relative;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.01);
        }
        .product-card:hover {
          transform: translateY(-5px);
          border-color: rgba(170, 59, 255, 0.4);
          box-shadow: 0 10px 30px rgba(170, 59, 255, 0.06), 0 2px 8px rgba(0, 0, 0, 0.02);
        }
        .product-img-box {
          height: 180px;
          background: #faf9fb;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3.5rem;
          margin-bottom: 15px;
          border: 1px solid #faf9fb;
        }
        .product-brand {
          font-size: 0.8rem;
          color: #aa3bff;
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 0.5px;
          margin-bottom: 5px;
        }
        .product-name {
          font-size: 1.1rem;
          color: #08060d;
          font-weight: 600;
          margin-bottom: 10px;
          line-height: 1.4;
          height: 48px;
          overflow: hidden;
        }
        .product-meta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
        }
        .product-price {
          font-size: 1.25rem;
          color: #08060d;
          font-weight: 700;
        }
        .view-btn {
          background: #aa3bff;
          border: none;
          color: #ffffff;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease;
        }
        .view-btn:hover {
          background: #7c3aed;
        }
      `}</style>

      <h1 className="shop-title">Systems <span>Catalog</span></h1>

      <div className="filter-section">
        <div className="filter-group" style={{ flex: 1 }}>
          <span className="filter-label">Search Systems</span>
          <input 
            type="text" 
            placeholder="Search by part number, model, tags..." 
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <span className="filter-label">Department</span>
          <select 
            className="filter-select"
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
          >
            <option value="All">All Departments</option>
            {categories.map(c => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <span className="filter-label">OEM Partner</span>
          <select 
            className="filter-select"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="All">All Partners</option>
            {brands.map(b => (
              <option key={b.id} value={b.name}>{b.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="results-count">
        Showing {filteredProducts.length} of {products.length} systems
      </div>

      <div className="products-grid">
        {filteredProducts.map((p, idx) => {
          const icons = {
            'prod-1': '⚡',
            'prod-2': '🤖',
            'prod-3': '⚙️',
            'prod-4': '🔌'
          };
          return (
            <div key={p.id} className="product-card">
              <div className="product-img-box">
                {icons[p.id] || '🛠️'}
              </div>
              <span className="product-brand">{p.brand}</span>
              <h3 className="product-name">{p.name}</h3>
              <div className="product-meta-row">
                <span className="product-price">${p.price}</span>
                <button className="view-btn" onClick={() => navigate(`/product-detail/${p.id}`)}>
                  ➔
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Products
