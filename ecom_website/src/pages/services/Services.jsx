import Banner from '../../components/layout/Banner';
import BrowseServices from '../home/sections/BrowseServices';
import WhyChoose from '../home/sections/WhyChoose';
import PromoCTA from '../home/sections/PromoCTA';
import SeoHelmet from '../../components/seo/SeoHelmet';

const Services = () => {
  const siteUrl = 'https://inraclick.com';

  return (
    <>
      <SeoHelmet
        title="Digital Services | Inraclick Digital Agency"
        description="Explore Inraclick's full suite of agency services including custom React web development, Meta ad campaigns, SEO optimization, and visual brand design."
        keywords={['Inraclick Services', 'Web Development Inraclick', 'Meta Ads Inraclick', 'SEO Inraclick', 'Inraclick.com']}
        image={siteUrl + '/sobo_logo.webp'}
        path="/services"
        type="services"
      />
      <Banner
        title="Inraclick Digital Services"
        img="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80"
        desc="Innovative Digital Solutions Tailored to Accelerate Revenue Growth"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Services' }
        ]}
      />
      
      {/* Services Grid Section */}
      <BrowseServices />
      
      {/* Additional value-adding sections */}
      <WhyChoose />
      <PromoCTA />
    </>
  );
};

export default Services;
