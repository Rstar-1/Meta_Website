import React from 'react'
import ContactForm from '../../components/forms/ContactForm'
import Banner from '../../components/layout/Banner'
import BlogList from '../blog/BlogList'

const Contact = () => {
  return (
    <>
      <Banner
        title="Connect With Us"
        img="https://html.ditsolution.net/industry/indastre1/assets/images/slider/banner.jpg"
        desc="Solutions Industrial Market Values for Funding"
      />
      <ContactForm />
      <BlogList />
    </>
  )
}

export default Contact