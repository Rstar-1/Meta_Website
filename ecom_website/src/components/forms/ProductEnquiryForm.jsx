import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormBuilder from '../common/FormBuilder';
import { getCart } from '../../utils/cartHelper';

const ProductEnquiryForm = ({ isCart = false, cartCount = 0, onClearCart }) => {
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const fields = isCart ? [
    {
      name: 'name',
      type: 'text',
      placeholder: 'Enter your full name',
      validation: { required: true }
    },
    {
      name: 'mobile',
      type: 'tel',
      placeholder: 'Enter your mobile number',
      validation: { required: true }
    },
    {
      name: 'city',
      type: 'select',
      border: true,
      defaultValue: '',
      options: [
        { label: 'Select your city', value: '' },
        { label: 'Delhi', value: 'Delhi' },
        { label: 'Mumbai', value: 'Mumbai' },
        { label: 'Bangalore', value: 'Bangalore' },
        { label: 'Chennai', value: 'Chennai' },
        { label: 'Hyderabad', value: 'Hyderabad' }
      ],
      validation: { required: true }
    }
  ] : [
    {
      name: 'name',
      type: 'text',
      placeholder: 'Enter Your Name',
      validation: { required: true }
    },
    {
      name: 'mobile',
      type: 'tel',
      placeholder: 'Enter Mobile Number',
      validation: { required: true }
    },
    {
      name: 'quantity',
      type: 'select',
      border: true,
      defaultValue: '',
      options: [
        { label: 'Select Quantity', value: '' },
        { label: '1 - 5 Pieces', value: '1-5' },
        { label: '6 - 20 Pieces', value: '6-20' },
        { label: '21 - 50 Pieces', value: '21-50' },
        { label: '50+ Pieces (Bulk)', value: '50+' }
      ],
      validation: { required: true }
    },
    {
      name: 'requirement',
      type: 'textarea',
      placeholder: 'Your Requirement',
      validation: { required: true }
    }
  ];

  const handleFormSubmit = (data) => {
    // Send SMS & Email notification
    const message = `New Product Enquiry:\nName: ${data.name || ''}\nMobile: ${data.mobile || ''}\n${data.city ? `City: ${data.city}\n` : ''}${data.quantity ? `Quantity: ${data.quantity}\n` : ''}${data.requirement ? `Requirement: ${data.requirement}\n` : ''}`;
    const smsBody = encodeURIComponent(message);

    // Send background email via Formspree
    fetch("https://formspree.io/rajshetye.5855@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: data.name,
        mobile: data.mobile,
        city: data.city,
        quantity: data.quantity,
        requirement: data.requirement,
        message: message,
        subject: "New Product Enquiry"
      })
    }).catch(err => console.error("Formspree error:", err));

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const smsUrl = `sms:${import.meta.env.VITE_PHONE || '8779030638'}${isIOS ? '&' : '?'}body=${smsBody}`;

    window.location.href = smsUrl;

    if (isCart) {
      const currentCart = getCart();
      if (currentCart && currentCart.length > 0) {
        localStorage.setItem('order_products', JSON.stringify(currentCart));
      }
    }

    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      if (isCart) {
        if (onClearCart) onClearCart();
        const ecomEnv = import.meta.env.ECOM ?? import.meta.env.VITE_ECOM;
        const isEcom = String(ecomEnv).toLowerCase() === 'true';
        if (isEcom) {
          navigate('/order');
        } else {
          navigate('/wheretobuy');
        }
      }
    }, 1500);
  };

  return (
    <div className='border-ec p-15 rounded-5 bg-white'>
      <h3 className='title-text text-dark font-600'>{isCart ? 'Request a Quote' : 'Get Best Price'}</h3>
      <p className='mini-text text-gray mt-4'>Fill the form and get quotes from verified suppliers</p>

      {formSubmitted ? (
        <div className='mt-8 p-10 text-center bg-forth'>
          <div style={{ fontSize: '24px', marginBottom: '4px' }}>✅</div>
          <h4 className='text-dark mid-text font-600'>Thank you!</h4>
          <p className='mt-5 mini-text text-gray'>{isCart ? 'Your enquiry has been submitted. Our team will contact you shortly.' : 'Your requirement has been sent to verified suppliers.'}</p>
        </div>
      ) : (
        <div className="mt-10">
          <FormBuilder
            fields={fields}
            onSubmit={handleFormSubmit}
            submitType="json"
            submitText={isCart ? "Submit Enquiry" : "Submit Requirement"}
            buttonVersion="v3"
            buttonBg="primary"
          >
            {isCart && (
              <div className="bg-forth p-12 rounded-5 flex items-center justify-between mt-10">
                <p className="small-text font-500 text-dark">🛍️ Items in Enquiry</p>
                <p className="mini-text text-primary" >{cartCount} Items</p>
              </div>
            )}
          </FormBuilder>

          <p className='font-400 mini-text text-center mt-12 text-gray'>🛡️ 100% Secure &amp; Confidential</p>
        </div>
      )}
    </div>
  );
};

export default ProductEnquiryForm;
