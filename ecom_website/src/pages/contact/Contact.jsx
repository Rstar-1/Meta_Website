import React from 'react'
import Banner from '../../components/layout/Banner'
import SeoHelmet from '../../components/seo/SeoHelmet'
import LocalBusinessSchema from '../../components/seo/LocalBusinessSchema'
import LatestArticles from '../home/sections/LatestArticles'
import BusinessPromo from '../home/sections/BusinessPromo'
import Review from '../home/sections/Review'
import Details from './sections/Details'

const Contact = () => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ecom-website.example.com';
  return (
    <>
      <SeoHelmet
        title="Connect With Us | SOBO Marketing Solution"
        description="Get in touch with SOBO Marketing Solution for wholesale inquiries, product support, and partnership opportunities."
        keywords={['Contact SOBO', 'Wholesale Inquiry', 'Supplier Support']}
        image={siteUrl + '/sobo_logo.png'}
        path="/connect"
        type="contact"
      />
      <LocalBusinessSchema bizData={{
        name: 'SOBO Marketing Solution',
        url: siteUrl,
        image: siteUrl + '/sobo_logo.png',
        phone: '+91-XXXXXXXXXX',
        address: { street: 'Industrial Area', city: 'Mumbai', region: 'Maharashtra', postalCode: '400001', country: 'India' }
      }} />
      <Banner
        title="Connect With Us"
        img="https://html.ditsolution.net/industry/indastre1/assets/images/slider/banner.jpg"
        desc="Solutions Industrial Market Values for Funding"
        breadcrumbs={[
          { label: "Home", path: "/home" },
          { label: "Connect" },
        ]}
      />
      <Details />
      <LatestArticles />
      <BusinessPromo />
      <Review />
    </>
  )
}

export default Contact