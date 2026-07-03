import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import products from '../../data/products.json';
import categories from '../../data/category.json';
import Container from '../../components/common/Container';
import CardLayout from '../../components/layout/CardLayout';

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
  
  const getInitialCategory = () => {
    if (location.state?.category) return location.state.category;
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get('category') || 'All';
  };

  const [selectedCat, setSelectedCat] = useState(getInitialCategory());
  const [search, setSearch] = useState('');

  const printerCatName = categories.find(c => c.id === 'cat-7')?.name || 'Printer Cartridges';
  const steelCatName = categories.find(c => c.id === 'cat-1')?.name || 'Steel Products';

  useEffect(() => {
    if (location.state?.category) {
      setSelectedCat(location.state.category);
    } else {
      const queryParams = new URLSearchParams(location.search);
      const queryCat = queryParams.get('category');
      if (queryCat) {
        setSelectedCat(queryCat);
      }
    }
  }, [location.state?.category, location.search]);

  const getCatId = (nameOrId) => {
    if (!nameOrId || nameOrId === 'All') return 'All';
    if (categories.some(c => c.id === nameOrId)) return nameOrId;
    const found = categories.find(c => c.name === nameOrId);
    if (found) return found.id;
    if (nameOrId === 'Printer Cartridges') return 'cat-7';
    if (nameOrId === 'Steel Products') return 'cat-1';
    return nameOrId;
  };

  const filteredProducts = products.filter((p) => {
    const targetCatId = getCatId(selectedCat);
    const matchesCat = targetCatId === 'All' || p.category === targetCatId;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  }).map((p) => ({
    ...p,
    supplier: p.client || (p.type === 'printer' ? 'biz-4' : 'biz-1')
  }));

  const handleProductClick = (id) => {
    navigate(`/product-detail/${id}`);
  };

  return (
    <Container className="bg-white">
      <div className="w-full py-30">
        {/* Top Search & Filter Bar */}
        <div className="flex justify-between items-center flex-wrap gap-12 mb-30 p-16 bg-white border-ec rounded-10">
          <div className="flex items-center gap-12 flex-1 min-w-250">
            <input
              type="text"
              placeholder="Search printer cartridges, steel products..."
              className="w-full p-10 border-ec rounded-5 outline-none font-400 text-dark small-text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-10">
            {['All', printerCatName, steelCatName].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-16 py-8 rounded-5 cursor-pointer border-0 font-500 small-text transition-all ${selectedCat === cat
                  ? 'bg-primary text-white'
                  : 'bg-white text-dark border-ec hover:bg-gray-100'
                  }`}
                style={{
                  border: selectedCat === cat ? 'none' : '1px solid #e5e7eb',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Section Header matching exact requested UI */}
        <div className="flex justify-between items-center mb-20">
          <h2 className="title-text text-dark font-600">
            {selectedCat === printerCatName || selectedCat === 'Printer Cartridges'
              ? `Popular ${printerCatName}`
              : selectedCat === steelCatName || selectedCat === 'Steel Products'
                ? `Popular ${steelCatName}`
                : `Popular ${printerCatName}`}
          </h2>
          <p
            className="text-primary font-500 cursor-pointer small-text hover:underline"
            onClick={() => {
              setSelectedCat('All');
              setSearch('');
            }}
          >
            View All Products &gt;
          </p>
        </div>

        {/* Product Cards Grid matching exact requested UI */}
        <CardLayout
          items={filteredProducts}
          cardType="product"
          imageMap={imageMap}
          imageHeight="h-200"
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
    </Container>
  );
};

export default Products;
