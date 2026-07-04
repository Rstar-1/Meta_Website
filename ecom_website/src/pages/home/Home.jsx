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
import SeoHelmet from '../../components/seo/SeoHelmet';
import WebsiteSchema from '../../components/seo/WebsiteSchema';
import OrganizationSchema from '../../components/seo/OrganizationSchema';
import SiteNavigationSchema from '../../components/seo/SiteNavigationSchema';

const Home = () => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://sobo-marketing.com';
  const navItems = [
    { name: 'Home', url: `${siteUrl}/home` },
    { name: 'Products', url: `${siteUrl}/products` },
    { name: 'About Us', url: `${siteUrl}/about` },
    { name: 'Blog', url: `${siteUrl}/blog` },
    { name: 'Contact Us', url: `${siteUrl}/contact` }
  ];

  return (
    <>
      <SeoHelmet
        title="SOBO Marketing Solution | Industrial B2B E-Commerce"
        description="Discover high-quality industrial supplies, printing cartridges, and stainless steel products at SOBO Marketing Solution."
        keywords={['Industrial Supplies', 'Printer Cartridges', 'Stainless Steel', 'SOBO Marketing', 'B2B India']}
        image={siteUrl + '/src/assets/sobo_logo.png'}
        path="/home"
        type="website"
      />
      <WebsiteSchema siteData={{ name: 'SOBO Marketing Solution', url: siteUrl }} />
      <OrganizationSchema orgData={{ name: 'SOBO Marketing Solution', url: siteUrl, logo: siteUrl + '/src/assets/sobo_logo.png' }} />
      <SiteNavigationSchema navItems={navItems} />

      <Hero />
      <BrowseCategory />
      <ProductPrinter />
      <ProductSteel />
      <PopularProducts />
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
