import React from 'react'
import Banner from '../../components/layout/Banner'
import DetailSection from './sections/DetailSection'
import Timeline from './sections/Timeline'
import SeoHelmet from '../../components/seo/SeoHelmet'
import OrganizationSchema from '../../components/seo/OrganizationSchema'

const About = () => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ecom-website.example.com';
  return (
    <>
      <SeoHelmet
        title="About Us | SOBO Marketing Solution"
        description="Learn about SOBO Marketing Solution, our journey, values, and how we deliver top-tier industrial products."
        keywords={['About SOBO', 'B2B Supplier India', 'Industrial Partner']}
        image={siteUrl + '/src/assets/sobo_logo.png'}
        path="/about"
        type="about"
      />
      <OrganizationSchema orgData={{ name: 'SOBO Marketing Solution', url: siteUrl, logo: siteUrl + '/src/assets/sobo_logo.png' }} />
      <Banner
        title="About Us"
        img="https://html.ditsolution.net/industry/indastre1/assets/images/slider/banner.jpg"
        desc="Solutions Industrial Market Values for Funding"
      />
      <DetailSection />
      <Timeline />
    </>
  )
}

export default About