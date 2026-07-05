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

// Import local product images for reliable rendering
import printerHp88a from '../../assets/printer_hp_88a.png';
import printerCanon74s from '../../assets/printer_canon_74s.png';
import printerCanon746 from '../../assets/printer_canon_746.png';
import printerEpson003 from '../../assets/printer_epson_003.png';
import printerBrotherTn2321 from '../../assets/printer_brother_tn2321.png';
import printerSamsungD111s from '../../assets/printer_samsung_d111s.png';
import ss304Sheets from '../../assets/ss_304_sheets.png';
import ss304Pipes from '../../assets/ss_304_pipes.png';
import ssCoils from '../../assets/ss_coils.png';
import ss316Rods from '../../assets/ss_316_rods.png';
import ssPlates from '../../assets/ss_plates.png';
import ssKitchen from '../../assets/ss_kitchen.png';
import ssFlanges from '../../assets/ss_flanges.png';
import ssAngleBars from '../../assets/ss_angle_bars.png';
import ssWireMesh from '../../assets/ss_wire_mesh.png';
import ssFasteners from '../../assets/ss_fasteners.png';

const imageMap = {
  'printer-1': printerHp88a,
  'printer-2': printerCanon74s,
  'printer-3': printerCanon746,
  'printer-4': printerEpson003,
  'printer-5': printerBrotherTn2321,
  'printer-6': printerSamsungD111s,
  'printer-7': printerHp88a,
  'printer-8': printerCanon74s,
  'printer-9': printerBrotherTn2321,
  'printer-10': printerHp88a,
  'steel-1': ss304Sheets,
  'steel-2': ss304Pipes,
  'steel-3': ssCoils,
  'steel-4': ss316Rods,
  'steel-5': ssPlates,
  'steel-6': ssKitchen,
  'steel-7': ssFlanges,
  'steel-8': ssAngleBars,
  'steel-9': ssWireMesh,
  'steel-10': ssFasteners,
};

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

  const getInitialCity = () => {
    if (location.state?.city) return location.state.city;
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get('city') || '';
  };

  const [selectedCats, setSelectedCats] = useState(getInitialCategories());
  const [search, setSearch] = useState(getInitialSearch());
  const [selectedCity, setSelectedCity] = useState(getInitialCity());

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
      setSelectedCity(location.state.city || '');
    } else {
      const queryParams = new URLSearchParams(location.search);
      setSelectedCity(queryParams.get('city') || '');
    }
  }, [location.state, location.search]);

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCats.length === 0 || selectedCats.includes(p.category);
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(search.toLowerCase())));
    const matchesCity = !selectedCity || selectedCity === 'All' || p.city === selectedCity;
    return matchesCat && matchesSearch && matchesCity;
  }).map((p) => ({
    ...p,
    supplier: p.client || (p.type === 'printer' ? 'biz-4' : 'biz-1')
  }));

  const handleProductClick = (id) => {
    navigate(`/product-detail/${id}`);
  };

  const getPageHeader = () => {
    const cityPrefix = selectedCity ? `In ${selectedCity}: ` : '';
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

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ecom-website.example.com';

  return (
    <>
      <SeoHelmet
        title="Industrial Products & Supplies Catalog | SOBO Marketing Solution"
        description="Browse our comprehensive catalog of toner cartridges, stainless steel pipes, sheets, rods, and general products."
        keywords={['Product Catalog', 'Toner Cartridges Shop', 'SS Steel Sheets', 'B2B Supplies']}
        image={siteUrl + '/src/assets/sobo_logo.png'}
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

        <div className="w-full py-30 flex gap-12">
          {/* Left Sidebar Filter */}
          <div className="sm-w-full w-20">
            <div className="bg-white border-ec p-18 rounded-5">
              <div className="flex items-center justify-between pb-10 bordb">
                <h3 className="mid-text text-dark font-500">
                  Filter By
                </h3>
                {(selectedCats.length > 0 || selectedCity) && (
                  <p
                    onClick={() => {
                      setSelectedCats([]);
                      setSelectedCity('');
                    }}
                    className="mini-text text-danger font-500 cursor-pointer"
                  >
                    Reset
                  </p>
                )}
              </div>
              <div className='mt-10'>
                <p className="small-text text-dark font-500 mb-6">Category</p>
                <Fields
                  type="checkbox"
                  options={categoryOptions}
                  value={selectedCats}
                  onChange={(newSelected) => setSelectedCats(newSelected)}
                  position="y"
                />
              </div>
              <div className='mt-20 pt-10' style={{ borderTop: '1px solid #ececec' }}>
                <p className="small-text text-dark font-500 mb-6">Location (City)</p>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full h-select bg-forth border-0 rounded-5 px-8 mini-text text-gray"
                >
                  <option value="">All Cities</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Hyderabad">Hyderabad</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right Main Content */}
          <div className="w-80">
            {/* Header Info */}
            <div className="mb-15">
              <h1 className="head-text text-dark font-600 pb-8">{headerInfo.title}</h1>
              <p className="small-text text-gray font-400">{headerInfo.desc}</p>
            </div>

            <div className="relative w-40 mb-12">
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

            {/* Product Cards Grid */}
            <CardLayout
              items={filteredProducts}
              cardType="product"
              imageMap={imageMap}
              imageHeight="h-250"
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
    </>
  );
};

export default Products;
