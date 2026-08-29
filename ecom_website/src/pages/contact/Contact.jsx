import React from 'react'
import Banner from '../../components/layout/Banner'
import SeoHelmet from '../../components/seo/SeoHelmet'
import LocalBusinessSchema from '../../components/seo/LocalBusinessSchema'
import FAQSection from '../home/sections/FAQSection'
import PromoCTA from '../home/sections/PromoCTA'
import Details from './sections/Details'

const Contact = () => {
  const siteUrl = 'https://inraclick.com';
  return (
    <>
      <SeoHelmet
        title="Contact Inraclick | Connect With Digital Agency Experts"
        description="Connect with Inraclick Digital Agency for website development, Meta ad campaigns, and SEO strategy audits. Reach us at hello@inraclick.com."
        keywords={['Contact Inraclick', 'Inraclick Phone', 'Inraclick Address', 'Inraclick Inquiry', 'Inraclick.com Contact']}
        image={siteUrl + '/sobo_logo.webp'}
        path="/connect"
        type="contact"
      />
      <LocalBusinessSchema bizData={{
        name: 'Inraclick Digital Agency',
        url: siteUrl,
        image: siteUrl + '/sobo_logo.webp',
        phone: '+91 98765 43210',
        address: { street: 'Bandra Kurla Complex', city: 'Mumbai', region: 'Maharashtra', postalCode: '400051', country: 'India' }
      }} />
      <Banner
        title="Connect With Inraclick Agency"
        img="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80"
        desc="Let's Discuss How We Can Transform Your Digital Brand Presence"
        breadcrumbs={[
          { label: "Home", path: "/home" },
          { label: "Connect" },
        ]}
      />
      <Details />
      <FAQSection />
      <PromoCTA />
    </>
  )
}

export default Contact