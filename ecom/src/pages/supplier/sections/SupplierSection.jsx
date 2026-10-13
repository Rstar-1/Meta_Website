import React, { useState, useMemo, useCallback, memo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsData } from '../../../utils/apiData';
import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';
import CardLayout from '../../../components/layout/sections/CardLayout';
import Tab from '../../../components/common/Tab';
import Table from '../../../components/common/Table';

const UNITED_BROTHERS_DATA = {
    name: 'United Brothers',
    tagline: 'Quality Flooring Solutions — Better Floors Brighter Spaces',
    category: 'Dilour Carpets, Ribs Carpets, New Poly Shrink Rugs & Shalimar Rugs',
    location: 'Vasna, Ahmedabad, Gujarat',
    fullAddress: 'Office No. 827, Siddhi Vinayak Arcade, Vasna, Ahmedabad, Gujarat, India',
    phone: '8454838638',
    phoneFormatted: '+91 84548 38638',
    contactPerson: 'Julie Shah',
    email: 'unitedbrothers879@gmail.com',
    rating: 4.8,
    reviews: 86,
    established: '2015',
    experience: '10+ Years',
    legalStatus: 'Registered Enterprise',
    natureOfBusiness: 'Manufacturer, Wholesaler, Trader & Exporter',
    panNo: 'AAJFU3175H',
    gstin: 'Applied (PAN: AAJFU3175H)',
    moq: '1 Roll / 10 Rugs',
    responseRate: '98%',
    responseTime: '< 1 hr',
    fulfillmentRate: '99.8%',
    trustBadge: 'Verified Supplier & Quality Assured Flooring',
    about: 'United Brothers is a premier provider of high-grade flooring solutions based in Ahmedabad, Gujarat. We specialize in Dilour Carpets, Ribs Carpets, 1800 GSM New Poly Shrink Rugs, and Shalimar Woven Rugs for automotive interiors, residential spaces, and commercial facilities. We are committed to exceptional craftsmanship, acoustic comfort, superior durability, and modern aesthetic elegance.'
};

const KNOWN_SUPPLIERS = {
    foxecom: UNITED_BROTHERS_DATA,
    unitedbrothers: UNITED_BROTHERS_DATA,
    united: UNITED_BROTHERS_DATA,
    ashmita: UNITED_BROTHERS_DATA,
    ashmitaenterprises: UNITED_BROTHERS_DATA,
    ashmitavinyls: UNITED_BROTHERS_DATA,
    wsi: UNITED_BROTHERS_DATA
};

const TRUST_POINTS = [
    'PAN Registered: AAJFU3175H | GST Status: Applied',
    'Premium 1800 GSM 100% Polyester Poly Shrink Technology',
    'Heavy-Duty Automotive & Commercial Dilour & Ribs Carpets',
    'Pan-India Safe Cargo Dispatch from Ahmedabad Central Hub',
    'Direct Factory Wholesale Pricing & Extensive Ready Stock'
];

const SPEC_COLUMNS = [
    { header: 'Factsheet Field', accessor: 'field', style: { width: '38%' } },
    { header: 'Verified Business Detail', accessor: 'value', style: { width: '62%' } }
];

const PRODUCT_CATEGORIES_RANGE = [
    {
        title: 'Dilour Carpets',
        count: '5 Color Options',
        desc: 'Premium soft, durable, stylish non-woven dilour carpets engineered for automotive interiors, car trunk lining, and home flooring.',
        highlight: 'Acoustic sound absorption, thermal insulation, luxury velour finish in Black, Grey, Beige, Brown & Red.'
    },
    {
        title: 'Ribs Carpets',
        count: '4 Color Options',
        desc: 'Strong, anti-slip, long-lasting ribbed surface carpets designed for vehicle flooring, footwells, and commercial spaces.',
        highlight: 'High traction, dirt-trapping grooved channels, heavy abrasion resistance in Black, Grey, Brown & Red.'
    },
    {
        title: 'New Poly Shrink Rugs',
        count: '30 Design Collections',
        desc: '1800 GSM, 100% Polyester high pile shrink woven rugs with self backing, modern 3D shrink texture effect.',
        highlight: 'Plush underfoot comfort, non-shedding, luxury embossed finish in multiple room sizes.'
    },
    {
        title: 'Shalimar Rugs',
        count: '74 Design Collections',
        desc: 'Exquisite 182 x 270 cm & 183 x 270 cm woven area rugs blending traditional artistry with contemporary living aesthetics.',
        highlight: 'Intricate patterns, vibrant color fastness, anti-fray bound edges.'
    },
    {
        title: 'Modern & Geometric Rugs',
        count: 'Full Range',
        desc: 'Abstract and geometric pattern rugs tailored for contemporary living rooms, bedrooms, and executive offices.',
        highlight: 'Minimalist lines, balanced color palettes, easy maintenance.'
    },
    {
        title: 'Traditional & Shaggy Rugs',
        count: 'Full Range',
        desc: 'Heritage motifs and ultra-soft shaggy deep-pile rugs for warm, luxurious interiors.',
        highlight: 'Classic timeless appeal, ultra-dense fibers, maximum barefoot comfort.'
    }
];

const SupplierSection = ({ supplierName, brandKey: propBrandKey }) => {
    const { brandName } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('catalog');

    const brandKey = (propBrandKey || brandName || 'unitedbrothers').toLowerCase().replace(/[^a-z0-9]/g, '');

    const supplierInfo = useMemo(() => {
        const found = KNOWN_SUPPLIERS[brandKey] || UNITED_BROTHERS_DATA;
        const displayName = supplierName || found.name || (brandName
            ? brandName.charAt(0).toUpperCase() + brandName.slice(1)
            : 'United Brothers');

        return {
            ...found,
            name: displayName
        };
    }, [brandKey, brandName, supplierName]);

    const validProducts = useMemo(() => {
        const realProducts = productsData.filter((p) => !p.isBanner);
        if (!brandName) return realProducts;

        const filtered = realProducts.filter((p) => {
            const vendor = (p.vendor || '').toLowerCase();
            const brand = (p.brand || '').toLowerCase();
            const searchKey = brandKey.toLowerCase();
            return vendor.includes(searchKey) || brand.includes(searchKey);
        });

        return filtered.length > 0 ? filtered : realProducts;
    }, [brandKey, brandName]);

    const specData = useMemo(() => [
        { id: 1, field: 'Company Name', value: supplierInfo.name },
        { id: 2, field: 'Nature of Business', value: supplierInfo.natureOfBusiness },
        { id: 3, field: 'Contact Person', value: supplierInfo.contactPerson || 'Julie Shah' },
        { id: 4, field: 'PAN Number', value: `${supplierInfo.panNo || 'AAJFU3175H'} (Registered)` },
        { id: 5, field: 'GST Status', value: `${supplierInfo.gstin} (Registration in progress)` },
        { id: 6, field: 'Year of Establishment', value: `${supplierInfo.established} (${supplierInfo.experience})` },
        { id: 7, field: 'Registered Address', value: supplierInfo.fullAddress },
        { id: 8, field: 'Primary Helpline', value: `${supplierInfo.phoneFormatted} (${supplierInfo.responseRate} Response Rate)` },
        { id: 9, field: 'Verification & Quality', value: supplierInfo.trustBadge },
        { id: 10, field: 'Product Category Focus', value: supplierInfo.category },
        { id: 11, field: 'Minimum Order Quantity (MOQ)', value: supplierInfo.moq },
        { id: 12, field: 'Dispatched Hub', value: 'Office No. 827, Siddhi Vinayak Arcade, Vasna, Ahmedabad Hub' }
    ], [supplierInfo]);

    const handleProductClick = useCallback((id) => {
        navigate(`/product/${id}`);
    }, [navigate]);

    const handleConnectClick = useCallback(() => {
        navigate('/connect');
    }, [navigate]);

    return (
        <Container>
            <div className="flex sm-grid-cols-1 gap-12 items-start w-full py-40">
                <div className="w-25 sm-w-full grid-cols-1 gap-12 h-550 overflow-auto sticky" style={{ top: '20%' }}>
                    <div className='pb-50 sm-pb-5'>
                        <div className="bg-white border-ec p-16 rounded-5">
                            <div className="flex items-center gap-12 bordb pb-16">
                                <div className="bg-light-primary rounded-full icon-lg flex items-center justify-center">
                                    <p className="font-600 text-primary para-text m-0">
                                        {supplierInfo.name.charAt(0)}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-dark headmini-text font-600 m-0">{supplierInfo.name}</h3>
                                    <p className='mini-text text-success font-500 m-0 mt-2'>✓ TrustSEAL Verified</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-12 bg-forth p-10 rounded-8">
                                <div className="flex items-center gap-6">
                                    <span className="font-600 text-dark small-text">{supplierInfo.rating}</span>
                                    <span className="text-warning mini-text">★★★★☆</span>
                                </div>
                                <span className="text-gray mini-text font-500">
                                    ({supplierInfo.reviews} Ratings)
                                </span>
                            </div>

                            <div className="grid-cols-2 gap-8 mt-12">
                                <div className="bg-forth p-10 rounded-8 text-center">
                                    <p className="mini-text text-gray m-0">Response Rate</p>
                                    <p className="small-text font-600 text-dark m-0 mt-2">{supplierInfo.responseRate}</p>
                                </div>
                                <div className="bg-forth p-10 rounded-8 text-center">
                                    <p className="mini-text text-gray m-0">Response Time</p>
                                    <p className="small-text font-600 text-success m-0 mt-2">{supplierInfo.responseTime}</p>
                                </div>
                            </div>

                            <div className="grid-cols-1 gap-10 mt-16 bordt pt-16">
                                <div className="flex items-center gap-8">
                                    <span className="mini-text">📞</span>
                                    <a href={`tel:${supplierInfo.phone}`} className="text-primary mini-text font-600 m-0 hover-underline">
                                        Call {supplierInfo.phone}
                                    </a>
                                </div>
                                <div className="flex items-center gap-8">
                                    <span className="mini-text">📋</span>
                                    <p className="text-gray mini-text font-500 m-0">GST: {supplierInfo.gstin}</p>
                                </div>
                                <div className="flex items-center gap-8">
                                    <span className="mini-text">🏢</span>
                                    <p className="text-gray mini-text font-500 m-0">Status: {supplierInfo.legalStatus}</p>
                                </div>
                                <div className="flex items-center gap-8">
                                    <span className="mini-text">🕒</span>
                                    <p className="text-gray mini-text font-500 m-0">Est: {supplierInfo.established} ({supplierInfo.experience})</p>
                                </div>
                                <div className="flex items-center gap-8">
                                    <span className="mini-text">📦</span>
                                    <p className="text-gray mini-text font-500 m-0">MOQ: {supplierInfo.moq}</p>
                                </div>
                            </div>

                            <Button
                                text="Request B2B Quote"
                                variant="primary"
                                onClick={handleConnectClick}
                                version='v3'
                                className="w-full mt-16"
                            />
                        </div>

                        {/* Trust & Verification Box */}
                        <div className="bg-white border-ec p-16 rounded-5 mt-14">
                            <h4 className="headmini-text font-600 text-dark pb-8 bordb m-0">
                                Verified Trust Assurance
                            </h4>
                            <div className="flex flex-column gap-10 mt-12">
                                {TRUST_POINTS.map((point, idx) => (
                                    <div key={idx} className="flex items-start gap-8 mini-text text-gray font-500">
                                        <span className="text-success font-600 flex-shrink-0">✓</span>
                                        <span className="leading-tight">{point}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-75 sm-w-full sm-mt-20">
                    <Tab
                        version="v1"
                        tabs={[
                            { value: 'catalog', name: 'Product Catalog', count: validProducts.length },
                            { value: 'profile', name: 'Company Factsheet & Profile' },
                            { value: 'range', name: 'Product Range' },
                            { value: 'trust', name: 'Trust & Verification' }
                        ]}
                        activeTab={activeTab}
                        onChange={setActiveTab}
                    />

                    {activeTab === 'catalog' && (
                        <div className="mt-20">
                            {validProducts.length > 0 ? (
                                <div className="grid-cols-4 sm-grid-cols-2 gap-12">
                                    {validProducts.map((product) => (
                                        <CardLayout
                                            key={product.id}
                                            version="product"
                                            item={product}
                                            isFluid={true}
                                            onClick={() => handleProductClick(product.id)}
                                            onCategoryClick={(cat) => navigate(`/product?category=${encodeURIComponent(cat)}`)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white py-40 rounded-5 border-ec">
                                    <p className="small-text text-gray text-center capitalize font-500">
                                        No catalog items found for this supplier.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'profile' && (
                        <div className="mt-20 grid-cols-1 gap-12">
                            <div className="bg-white border-ec p-24 rounded-5">
                                <div className="flex items-center justify-between flex-wrap gap-8 mb-12">
                                    <h4 className="mid-text font-600 text-dark m-0">
                                        About {supplierInfo.name}
                                    </h4>
                                    <span className="mini-text bg-forth px-10 py-4 rounded-20 text-gray font-500">
                                        Established 2015 • Ahmedabad, Gujarat
                                    </span>
                                </div>
                                <p className="small-text text-gray font-400 m-0 leading-relaxed">
                                    {supplierInfo.about}
                                </p>
                            </div>

                            <div className="bg-white border-ec p-20 rounded-5">
                                <h4 className="headmini-text font-600 text-dark mb-14">
                                    Official Business Factsheet
                                </h4>
                                <Table
                                    columns={SPEC_COLUMNS}
                                    data={specData}
                                    showControls={false}
                                    minWidth="100%"
                                />
                            </div>

                            <div className="grid-cols-3 sm-grid-cols-1 gap-12 mt-4">
                                <div className="bg-forth p-20 rounded-5">
                                    <h5 className="headmini-text font-600 text-dark m-0">🚀 Pan-India Dispatch</h5>
                                    <p className="small-text text-gray mt-10 m-0 leading-relaxed">
                                        Direct express cargo shipping from our central Vasna, Ahmedabad warehouse across all states in India.
                                    </p>
                                </div>
                                <div className="bg-forth p-20 rounded-5">
                                    <h5 className="headmini-text font-600 text-dark m-0">🏭 Direct Manufacturer & Wholesaler</h5>
                                    <p className="small-text text-gray mt-10 m-0 leading-relaxed">
                                        Zero intermediary markups with direct factory pricing on automotive carpets, commercial roll goods, and rugs.
                                    </p>
                                </div>
                                <div className="bg-forth p-20 rounded-5">
                                    <h5 className="headmini-text font-600 text-dark m-0">✨ 1800 GSM Poly Shrink & Woven</h5>
                                    <p className="small-text text-gray mt-10 m-0 leading-relaxed">
                                        Advanced high-pile shrink technology, 100% polyester self-backing rugs, and precision needle-punch dilour & ribbed carpets.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'range' && (
                        <div className="mt-15 grid-cols-2 sm-grid-cols-1 gap-12">
                            {PRODUCT_CATEGORIES_RANGE.map((category, index) => (
                                <div key={index} className="bg-white border-ec p-20 rounded-5">
                                    <div className='bordb pb-8'>
                                        <h4 className="mid-text font-600 text-dark uppercase">
                                            {category.title}
                                        </h4>
                                        <p className="mini-text text-gray font-400 mt-3">
                                            {category.desc}
                                        </p>
                                    </div>
                                    <div className="mt-8">
                                        <p className="mini-text text-success font-600">
                                            ✓ {category.highlight}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'trust' && (
                        <div className="bg-forth p-20 rounded-5 mt-15">
                            <h4 className="mid-text font-600 text-dark">
                                Verified Credibility & Regulatory Compliance
                            </h4>
                            <div className="grid-cols-2 sm-grid-cols-1 gap-12 mt-10">
                                <div className="bg-white p-16 rounded-5">
                                    <p className="mini-text text-gray font-500 uppercase">Tax & Business Registration</p>
                                    <h5 className="mid-text font-600 text-dark mt-4">PAN: {supplierInfo.panNo || 'AAJFU3175H'}</h5>
                                    <p className="mini-text text-success font-500 mt-6">✓ Registered Commercial Enterprise (GST: Applied)</p>
                                </div>
                                <div className="bg-white p-16 rounded-5">
                                    <p className="mini-text text-gray font-500 uppercase">Quality Verification</p>
                                    <h5 className="mid-text font-600 text-dark mt-4">Quality Flooring Assured</h5>
                                    <p className="mini-text text-primary font-500 mt-6">✓ Direct Factory Supply & Trusted Commercial Grade</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Container>
    );
};

export default memo(SupplierSection);
