import React from 'react';
import Hero from './sections/Hero';
import BrowseCategory from './sections/BrowseCategory';
import PopularProducts from './sections/PopularProducts';
import ProductSteel from './sections/ProductSteel';
import ProductPrinter from './sections/ProductPrinter';
import WhyChoose from './sections/WhyChoose';
import FeaturedBusinesses from './sections/FeaturedBusinesses';
import BusinessPromo from './sections/BusinessPromo';
import LatestArticles from './sections/LatestArticles';
import TopCity from './sections/TopCity';
import Review from './sections/Review';

const Home = () => {
  return (
    <>
      <Hero />
      <BrowseCategory />
      <PopularProducts />
      <ProductPrinter />
      <ProductSteel />
      <WhyChoose />
      <TopCity />
      <FeaturedBusinesses />
      <LatestArticles />
      <BusinessPromo />
      <Review />
    </>
  );
};

export default Home;
