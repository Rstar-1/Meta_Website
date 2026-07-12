import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import products from '../../data/products.json';
import categories from '../../data/category.json';
import Container from '../../components/common/Container';
import CardLayout from '../../components/layout/CardLayout';
import SeoHelmet from '../../components/seo/SeoHelmet';
import BreadcrumbSchema from '../../components/seo/BreadcrumbSchema';
import Fields from '../../components/common/Fields';
import Icon from '../../components/common/Icon';
import Banner from '../../components/layout/Banner';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getCatId = (nameOrId) => {
    if (!nameOrId || nameOrId === 'All') return 'All';
    if (categories.some(c => c.id === nameOrId)) return nameOrId;
    const found = categories.find(c => c.name === nameOrId);
    if (found) return found.id;
    if (nameOrId === 'Printer Cartridges') return 'cat-7';
    if (nameOrId === 'Steel Products') return 'cat-1';
    return nameOrId;
  };

  const getInitialCategories = () => {
    let initial = [];
    if (location.state?.category) {
      initial = [location.state.category];
    } else {
      const queryParams = new URLSearchParams(location.search);
      const cat = queryParams.get('category');
      if (cat) {
        initial = [cat];
      }
    }
    return initial.map(c => getCatId(c)).filter(c => c !== 'All');
  };

  const getInitialSearch = () => {
    if (location.state?.search) return location.state.search;
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get('search') || '';
  };

  const getInitialCities = () => {
    if (location.state?.city) return [location.state.city];
    const queryParams = new URLSearchParams(location.search);
    const city = queryParams.get('city');
    return city ? [city] : [];
  };

  const maxProductPrice = React.useMemo(() => {
    const highest = Math.max(...products.map(p => p.price || 0));
    return (highest || 250000) + 20;
  }, []);

  const [selectedCats, setSelectedCats] = useState(getInitialCategories());
  const [search, setSearch] = useState(getInitialSearch());
  const [selectedCities, setSelectedCities] = useState(getInitialCities());
  const [priceRange, setPriceRange] = useState(maxProductPrice);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState("sm");

  useEffect(() => {
    const handleResize = () => {
      setModalSize(window.innerWidth < 768 ? "full" : "sm");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // 1. Resolve Category
    if (location.state?.category) {
      const catId = getCatId(location.state.category);
      if (catId && catId !== 'All') {
        setSelectedCats([catId]);
      } else {
        setSelectedCats([]);
      }
    } else {
      const queryParams = new URLSearchParams(location.search);
      const queryCat = queryParams.get('category');
      if (queryCat) {
        const catId = getCatId(queryCat);
        if (catId && catId !== 'All') {
          setSelectedCats([catId]);
        } else {
          setSelectedCats([]);
        }
      } else {
        setSelectedCats([]);
      }
    }

    // 2. Resolve Search Query
    if (location.state?.hasOwnProperty('search')) {
      setSearch(location.state.search || '');
    } else {
      const queryParams = new URLSearchParams(location.search);
      setSearch(queryParams.get('search') || '');
    }

    // 3. Resolve City
    if (location.state?.hasOwnProperty('city')) {
      const city = location.state.city;
      setSelectedCities(city ? [city] : []);
    } else {
      const queryParams = new URLSearchParams(location.search);
      const city = queryParams.get('city');
      setSelectedCities(city ? [city] : []);
    }
  }, [location.state, location.search]);

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCats.length === 0 || selectedCats.includes(p.category);
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(search.toLowerCase())));
    const matchesCity = selectedCities.length === 0 || selectedCities.includes(p.city);

    const matchesPrice = (p.price || 0) <= priceRange;

    return matchesCat && matchesSearch && matchesCity && matchesPrice;
  }).map((p) => ({
    ...p,
    supplier: p.client || (p.type === 'printer' ? 'biz-4' : 'biz-1')
  }));

  const handleProductClick = (id) => {
    navigate(`/product-detail/${id}`);
  };

  const getPageHeader = () => {
    const cityPrefix = selectedCities.length > 0 ? `In ${selectedCities.join(', ')}: ` : '';
    if (selectedCats.length === 1) {
      const catId = selectedCats[0];
      const catName = categories.find(c => c.id === catId)?.name || 'Products';
      let desc = `Discover our comprehensive range of premium ${catName.toLowerCase()} and industrial solutions.`;
      if (catId === 'cat-2') {
        desc = "Discover Ashmita Enterprises' comprehensive range of premium PVC strip curtains, printed rolls, sheets, rolls, films, mounting brackets, and clear sheets.";
      } else if (catId === 'cat-1') {
        desc = "Discover our comprehensive range of premium stainless steel sheets, pipes, coils, rods, plates, and kitchen equipment.";
      } else if (catId === 'cat-7') {
        desc = "Discover our comprehensive range of professional toner cartridges, ink bottles, and printing solutions.";
      }
      return {
        title: `${cityPrefix}Explore Our ${catName}`,
        desc
      };
    }
    return {
      title: `${cityPrefix}Explore Our Products`,
      desc: "Discover our comprehensive range of high-quality industrial products, steel piping, printing consumables, and office equipment."
    };
  };

  const headerInfo = getPageHeader();
  const categoryOptions = categories.map(c => ({
    label: c.name,
    value: c.id
  }));

  const renderFilters = () => {
    return (
      <div className="bg-white border-ec p-12 rounded-10">
        <div className="flex items-center justify-between">
          <h3 className="headmini-text text-dark font-600">
            Filter By
          </h3>
          {(selectedCats.length > 0 || selectedCities.length > 0 || priceRange < maxProductPrice) && (
            <p
              onClick={() => {
                setSelectedCats([]);
                setSelectedCities([]);
                setPriceRange(maxProductPrice);
                setShowAllCategories(false);
              }}
              className="mini-text text-danger font-500 cursor-pointer"
            >
              Reset
            </p>
          )}
        </div>
        <div className='mt-10 border-ec p-10 rounded-5'>
          <h4 className="headmini-text text-dark font-500 pb-6 mb-6 bordb">Price Range</h4>
          <Fields
            type="slider"
            min={0}
            max={maxProductPrice}
            step={maxProductPrice / 100}
            value={priceRange}
            onChange={(newVal) => setPriceRange(newVal)}
          />
        </div>
        <div className='mt-10 border-ec p-10 rounded-5'>
          <h4 className="headmini-text text-dark font-500 pb-6 mb-6 bordb">Category</h4>
          <Fields
            type="checkbox"
            options={showAllCategories ? categoryOptions : categoryOptions.slice(0, 5)}
            value={selectedCats}
            onChange={(newSelected) => setSelectedCats(newSelected)}
            position="y"
          />
          {categoryOptions.length > 5 && (
            <p
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="mini-text text-primary font-600 mt-8 cursor-pointer hover-text-secondary"
              style={{ userSelect: 'none' }}
            >
              {showAllCategories ? "Show Less" : `+${categoryOptions.length - 5} More`}
            </p>
          )}
        </div>
        <div className='mt-10 border-ec p-10 rounded-5'>
          <h4 className="headmini-text text-dark font-500 pb-6 mb-6 bordb">Location</h4>
          <Fields
            type="checkbox"
            options={[
              { label: 'Delhi', value: 'Delhi' },
              { label: 'Mumbai', value: 'Mumbai' },
              { label: 'Bangalore', value: 'Bangalore' },
              { label: 'Chennai', value: 'Chennai' },
              { label: 'Hyderabad', value: 'Hyderabad' },
              { label: 'Kolkata', value: 'Kolkata' },
              { label: 'Ahmedabad', value: 'Ahmedabad' },
              { label: 'Surat', value: 'Surat' },
              { label: 'Jaipur', value: 'Jaipur' },
            ]}
            value={selectedCities}
            onChange={(newSelected) => setSelectedCities(newSelected)}
            position="y"
          />
        </div>
      </div>
    );
  };

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ecom-website.example.com';

  return (
    <>
      <SeoHelmet
        title="Industrial Products & Supplies Catalog | SOBO Marketing Solution"
        description="Browse our comprehensive catalog of toner cartridges, stainless steel pipes, sheets, rods, and general products."
        keywords={['Product Catalog', 'Toner Cartridges Shop', 'SS Steel Sheets', 'B2B Supplies']}
        image={siteUrl + '/sobo_logo.webp'}
        path="/products"
        type="product"
      />
      <Banner
        title="Products Catalog"
        img="https://html.ditsolution.net/industry/indastre1/assets/images/slider/banner.jpg"
        desc="Our Products"
        breadcrumbs={[
          { label: "Home", path: "/home" },
          { label: "Products" },
        ]}
      />
      <Container className="bg-white">
        <BreadcrumbSchema items={[
          { name: 'Home', url: siteUrl + '/home' },
          { name: 'Products', url: siteUrl + '/products' }
        ]} />

        <style>{`
          .sidebar-filters {
            position: sticky !important;
            top: 20px !important;
            align-self: start !important;
            z-index: 100;
          }
          .mobile-filter-trigger {
            display: none !important;
          }
          @media (max-width: 912px) {
            .sidebar-filters {
              display: none !important;
            }
            .mobile-filter-trigger {
              display: block !important;
            }
          }
        `}</style>

        <div className="w-full py-30 flex md-flex-column sm-flex-column gap-12">
          {/* Left Sidebar Filter */}
          <div className="w-20 md-w-full sm-w-full sidebar-filters">
            {renderFilters()}
          </div>

          <div className="w-80 md-w-full sm-w-full">
            <div className="mb-15">
              <h2 className="title-text text-dark font-600 pb-4">{headerInfo.title}</h2>
              <p className="small-text text-gray font-400">{headerInfo.desc}</p>
            </div>

            <div className="flex sm-flex-column gap-12 items-center mb-12 w-40 md-w-full sm-w-full">
              <div className="relative flex-grow w-full">
                <Fields
                  type="text"
                  placeholder="Search products by name or description..."
                  value={search}
                  onChange={(val) => setSearch(val)}
                  outline={true}
                />
                <Icon
                  name="Search"
                  width="18"
                  height="18"
                  className="absolute top-0 right-0 m-11 text-gray"
                  strokeWidth="2"
                />
              </div>
            </div>
            <div className="hidden sm-flex justify-end mb-10">
              <Button
                text="Filters"
                bg="primary"
                onClick={() => setIsFilterModalOpen(true)}
                icon="Filter"
                iconWidth="13"
                iconHeight="13"
                version="v2"
              />
            </div>

            {/* Product Cards Grid */}
            <CardLayout
              items={filteredProducts}
              cardType="product"
              imageHeight="h-200 sm-h-250"
              cols="4"
              mdCols="2"
              smCols="1"
              gap="12"
              onCardClick={(product) => handleProductClick(product.id)}
              onButtonClick={(product) => handleProductClick(product.id)}
            />

            {filteredProducts.length === 0 && (
              <div className="text-center py-50 text-gray">
                <p className="mid-text font-500">No products found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </Container>

      <Modal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title="Filter Options"
        size={modalSize}
        type="sidebar"
        placement="left"
        footer={
          <Button
            text="Apply Filters"
            bg="primary"
            onClick={() => setIsFilterModalOpen(false)}
            version='v2'
            className="w-full"
          />
        }
      >
        {renderFilters()}
      </Modal>
    </>
  );
};

export default Products;
