import React from 'react'
import { useNavigate } from 'react-router-dom'
import brands from '../../data/brands.json'

const Brands = () => {
  const navigate = useNavigate()
  return (
    <div className="brands-container">
      <style>{`
        .brands-container {
          padding: 50px 30px;
          max-width: 1200px;
          margin: 0 auto;
          font-family: 'Outfit', sans-serif;
        }
        .title {
          font-size: 2.2rem;
          color: #08060d;
          font-weight: 700;
          margin-bottom: 12px;
        }
        .title span {
          color: #aa3bff;
        }
        .desc {
          color: #6b6375;
          font-size: 1rem;
          margin-bottom: 45px;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
        }
        .card {
          background: #ffffff;
          border: 1px solid #e5e4e7;
          border-radius: 16px;
          padding: 40px;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.01);
        }
        .card:hover {
          transform: translateY(-5px);
          border-color: #aa3bff;
          background: #ffffff;
          box-shadow: 0 10px 30px rgba(170, 59, 255, 0.06), 0 2px 8px rgba(0, 0, 0, 0.02);
        }
        .brand-logo-placeholder {
          font-size: 3rem;
          margin-bottom: 20px;
        }
        .brand-name {
          color: #08060d;
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 15px;
        }
        .brand-desc {
          color: #6b6375;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 25px;
          flex: 1;
        }
        .brand-action {
          color: #aa3bff;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          background: none;
          border: none;
          text-align: left;
          padding: 0;
        }
      `}</style>

      <h1 className="title">OEM Integration <span>Partners</span></h1>
      <p className="desc">Partnering with standard-setting automation manufacturers globally</p>

      <div className="grid">
        {brands.map((b, idx) => {
          const logos = ['🤖', '⚙️', '⚡'];
          return (
            <div key={b.id} className="card">
              <div className="brand-logo-placeholder">{logos[idx] || '🛠️'}</div>
              <h2 className="brand-name">{b.name}</h2>
              <p className="brand-desc">{b.description}</p>
              <button className="brand-action" onClick={() => navigate('/products')}>
                Explore OEM Systems ➔
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Brands
