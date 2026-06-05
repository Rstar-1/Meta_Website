import React, { useState } from 'react'
import faqs from '../../../data/faqs.json'

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  return (
    <section className="faq-section">
      <style>{`
        .faq-section {
          padding: 60px 30px;
          max-width: 800px;
          margin: 0 auto 40px auto;
          font-family: 'Outfit', sans-serif;
        }
        .header {
          text-align: center;
          margin-bottom: 40px;
        }
        .title {
          font-size: 2rem;
          color: #08060d;
          font-weight: 700;
        }
        .title span {
          color: #aa3bff;
        }
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .faq-item {
          background: #ffffff;
          border: 1px solid #e5e4e7;
          border-radius: 8px;
          overflow: hidden;
          transition: border-color 0.2s ease;
        }
        .faq-item.active {
          border-color: rgba(170, 59, 255, 0.5);
        }
        .faq-question {
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          color: #08060d;
          font-weight: 600;
          background: none;
          border: none;
          width: 100%;
          text-align: left;
          font-size: 1rem;
        }
        .faq-answer {
          padding: 0 20px 20px 20px;
          color: #6b6375;
          font-size: 0.95rem;
          line-height: 1.6;
          display: none;
        }
        .faq-answer.show {
          display: block;
        }
        .faq-icon {
          color: #aa3bff;
          font-size: 1.1rem;
          transition: transform 0.2s ease;
        }
        .faq-item.active .faq-icon {
          transform: rotate(180deg);
        }
      `}</style>

      <div className="header">
        <h2 className="title">Frequently Asked <span>Questions</span></h2>
      </div>

      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
          >
            <button 
              className="faq-question"
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              <span>{faq.question}</span>
              <span className="faq-icon">{activeIndex === index ? '▲' : '▼'}</span>
            </button>
            <div className={`faq-answer ${activeIndex === index ? 'show' : ''}`}>
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FAQ
