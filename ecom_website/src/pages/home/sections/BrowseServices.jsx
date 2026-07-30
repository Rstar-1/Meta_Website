import Container from '../../../components/common/Container';
import CardLayout from '../../../components/layout/CardLayout';

const BrowseServices = () => {
  const services = [
    {
      id: 1,
      icon: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231e74db' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.01438 19.1558 5.06836 19.3853 4.99264 19.5746C4.85109 19.9285 4.7679 20.313 4.7679 20.7143C4.7679 21.4243 5.34357 22 6.05357 22H12Z'/><circle cx='7.5' cy='10.5' r='1.5' fill='%231e74db'/><circle cx='11.5' cy='7.5' r='1.5' fill='%231e74db'/><circle cx='16.5' cy='9.5' r='1.5' fill='%231e74db'/><circle cx='15.5' cy='14.5' r='1.5' fill='%231e74db'/></svg>",
      title: "Branding Design",
      desc: "We care success relationships fuel real success We love building brands and helping fuel real success We love building brands and helping"
    },
    {
      id: 2,
      icon: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231e74db' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='16 18 22 12 16 6'/><polyline points='8 6 2 12 8 18'/></svg>",
      title: "Website Development",
      desc: "We care success relationships fuel real success We love building brands and helping fuel real success We love building brands and helping"
    },
    {
      id: 3,
      icon: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231e74db' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M11 5L6 9H2v6h4l5 4V5z'/><path d='M15.54 8.46a5 5 0 0 1 0 7.07'/></svg>",
      title: "Digital Marketing",
      desc: "We care success relationships fuel real success We love building brands and helping fuel real success We love building brands and helping"
    },
    {
      id: 4,
      icon: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231e74db' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='18' cy='5' r='3'/><circle cx='6' cy='12' r='3'/><circle cx='18' cy='19' r='3'/><line x1='8.59' y1='13.51' x2='15.42' y2='17.49'/><line x1='15.41' y1='6.51' x2='8.59' y2='10.49'/></svg>",
      title: "Social Media Management",
      desc: "We care success relationships fuel real success We love building brands and helping fuel real success We love building brands and helping"
    },
    {
      id: 5,
      icon: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231e74db' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><line x1='18' y1='20' x2='18' y2='10'/><line x1='12' y1='20' x2='12' y2='4'/><line x1='6' y1='20' x2='6' y2='14'/></svg>",
      title: "Analytics and Performance",
      desc: "We care success relationships fuel real success We love building brands and helping fuel real success We love building brands and helping"
    },
    {
      id: 6,
      icon: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231e74db' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='11' cy='11' r='8'/><line x1='21' y1='21' x2='16.65' y2='16.65'/></svg>",
      title: "Search Engine Optimization",
      desc: "We care success relationships fuel real success We love building brands and helping fuel real success We love building brands and helping"
    }
  ];

  return (
    <Container id="services">
      <div className='py-60'>
        <div className="text-center">
          <p className="text-primary font-500 uppercase small-text">WHAT WE DO</p>
          <h2 className="text-dark font-600 head-text uppercase pt-8">
            Browse Our Categories
          </h2>
        </div>

        <CardLayout
          items={services}
          cardType="service"
          cols="3"
          mdCols="2"
          smCols="1"
          gap="12"
          className="mt-40"
        />
      </div>
    </Container>
  );
};

export default BrowseServices;
