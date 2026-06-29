import React, { useState } from 'react'
import Icon from '../../../components/common/Icon'

const ShareProduct = () => {
  const [copiedLink, setCopiedLink] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  return (
    <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: '0 0 14px 0' }}>Share this product</h4>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        {/* WhatsApp */}
        <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', textDecoration: 'none' }} title="Share on WhatsApp">
          <Icon name="WhatsAppShare" width="18" height="18" fill="#ffffff" />
        </a>

        {/* Facebook */}
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#1877F2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', textDecoration: 'none' }} title="Share on Facebook">
          <Icon name="Facebook" width="18" height="18" fill="#ffffff" />
        </a>

        {/* Twitter / X */}
        <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', textDecoration: 'none' }} title="Share on X">
          <Icon name="X" width="16" height="16" fill="#ffffff" />
        </a>

        {/* LinkedIn */}
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#0A66C2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', textDecoration: 'none' }} title="Share on LinkedIn">
          <Icon name="LinkedIn" width="18" height="18" fill="#ffffff" />
        </a>

        {/* Copy Link */}
        <button onClick={handleCopyLink} style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} title="Copy Link">
          {copiedLink ? <span style={{ fontSize: '12px' }}>✓</span> : <Icon name="Link" width="18" height="18" stroke="#475569" strokeWidth="2" />}
        </button>
      </div>
    </div>
  )
}

export default ShareProduct
