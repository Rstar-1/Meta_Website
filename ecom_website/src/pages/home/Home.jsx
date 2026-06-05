import React from 'react'
import Hero from './sections/Hero'
import Testimonials from './sections/Testimonials'
import FeaturedProducts from './sections/FeaturedProducts'
import FeaturedCategories from './sections/FeaturedCategories'
import KnowMore from './sections/KnowMore'
import PatchSection from './sections/PatchSection'
import PatchSection2 from './sections/PatchSection2'
import SlideSection from './sections/SlideSection'
import BlogList from '../blog/BlogList'

const Home = () => {
  return (
    <>
      <Hero />
      <div>
        <div
          style={{
            background:
              "url(https://html.ditsolution.net/industry/indastre1/assets/images/resource/counter_bg.jpg)",
            backgroundSize: "cover",
          }}
        >
          <PatchSection2 />
        </div>
        <img
          src="https://html.ditsolution.net/industry/indastre1/assets/images/resource/line-shape.png"
          alt="line shape"
          className="w-full flex"
        />
      </div>
      <KnowMore />
      <SlideSection />
      <FeaturedProducts />
      <FeaturedCategories />
      <Testimonials />
      <BlogList />
      <PatchSection />
    </>
  )
}

export default Home

