import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import products from '../../data/products.json';
import Container from '../../components/common/Container';
import Button from '../../components/common/Button';

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

const imageMap = {
  'printer-1': printerHp88a,
  'printer-2': printerCanon74s,
  'printer-3': printerCanon746,
  'printer-4': printerEpson003,
  'printer-5': printerBrotherTn2321,
  'printer-6': printerSamsungD111s,
  'steel-1': ss304Sheets,
  'steel-2': ss304Pipes,
  'steel-3': ssCoils,
  'steel-4': ss316Rods,
};

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCat, setSelectedCat] = useState(location.state?.category || 'All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (location.state?.category) {
      setSelectedCat(location.state.category);
    }
  }, [location.state?.category]);

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCat === 'All' || p.category === selectedCat;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

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
            {['All', 'Printer Cartridges', 'Steel Products'].map((cat) => (
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
            {selectedCat === 'Printer Cartridges'
              ? 'Popular Printer Cartridges'
              : selectedCat === 'Steel Products'
                ? 'Popular Steel Products'
                : 'Popular Printer Cartridges'}
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
        <div className="grid-cols-4 md-grid-cols-2 sm-grid-cols-1 gap-12">
          {filteredProducts.map((product) => {
            const imgSrc = imageMap[product.id] || product.image;
            return (
              <div
                key={product.id}
                className="bg-white border-ec rounded-10 p-12 cursor-pointer transition-all"
                onClick={() => handleProductClick(product.id)}
              >
                <div>
                  {/* Product Image Container */}
                  <div
                    className="overflow-hidden rounded-5"

                  >
                    <img
                      src={imgSrc}
                      alt={product.name}
                      loading="lazy"
                      className="w-full object-cover h-200 flex"
                    />
                  </div>

                  {/* Product Metadata */}
                  <div className="mt-8">
                    <h3
                      className="text-dark font-600 line-clamp1"
                      style={{
                        fontSize: '1.05rem',
                        color: '#0f172a',
                        marginBottom: '4px',
                      }}
                    >
                      {product.name}
                    </h3>
                    <p
                      className="text-gray mini-text"
                      style={{ color: '#64748b', fontSize: '0.85rem' }}
                    >
                      {product.subtitle || 'Starting from'}
                    </p>
                    <p
                      className="text-dark font-600 mt-4"
                      style={{
                        color: '#0f172a',
                        fontSize: '1rem',
                        fontWeight: '700',
                        marginTop: '4px',
                      }}
                    >
                      {product.priceDisplay || `₹ ${product.price} / Piece`}
                    </p>
                  </div>
                </div>

                {/* Blue View Products Button at Bottom */}
                <div className="mt-16">
                  <Button
                    text="View Products"
                    bg="primary"
                    version="v3"
                    className="w-full font-500 py-10"
                    style={{
                      backgroundColor: '#2563eb',
                      color: '#ffffff',
                      borderRadius: '8px',
                      fontWeight: '500',
                      fontSize: '0.95rem',
                      padding: '10px 0',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product.id);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

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
