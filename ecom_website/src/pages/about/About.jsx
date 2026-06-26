import React from 'react'
import Banner from '../../components/layout/Banner'
import DetailSection from './sections/DetailSection'
import Timeline from './sections/Timeline'
import BlogList from '../blog/BlogList'

const About = () => {
  return (
    <>
      <Banner
        title="About Us"
        img="https://html.ditsolution.net/industry/indastre1/assets/images/slider/banner.jpg"
        desc="Solutions Industrial Market Values for Funding"
      />
      <DetailSection />
      <Timeline />
      <BlogList />
    </>
  )
}

export default About