import React from 'react'
import Banner from '../../components/layout/Banner'
import DetailSection from './sections/DetailSection'
import Timeline from './sections/Timeline'
import SeoHelmet from '../../components/seo/SeoHelmet'
import OrganizationSchema from '../../components/seo/OrganizationSchema'
import FAQSection from '../home/sections/FAQSection'
import PromoCTA from '../home/sections/PromoCTA'
import Reviews from '../home/sections/Reviews'

const About = () => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ecom-website.example.com';
  return (
    <>
      <SeoHelmet
        title="About Us | SOBO Marketing Solution"
        description="Learn about SOBO Marketing Solution, our journey, values, and how we deliver top-tier industrial products."
        keywords={['About SOBO', 'B2B Supplier India', 'Industrial Partner']}
        image={siteUrl + '/sobo_logo.webp'}
        path="/about"
        type="about"
      />
      <OrganizationSchema orgData={{ name: 'SOBO Marketing Solution', url: siteUrl, logo: siteUrl + '/sobo_logo.webp' }} />
      <Banner
        title="About Us"
        img="https://html.ditsolution.net/industry/indastre1/assets/images/slider/banner.jpg"
        desc="Solutions Industrial Market Values for Funding"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'About Us' }
        ]}
      />
      <Timeline />
      <DetailSection />
      <FAQSection />
      <Reviews />
      <PromoCTA />
    </>
  )
}

export default About