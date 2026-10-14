import React, { useState, useMemo, useCallback, memo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsData } from '../../../utils/apiData';
import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';
import CardLayout from '../../../components/layout/sections/CardLayout';
import Tab from '../../../components/common/Tab';
import Table from '../../../components/common/Table';

const JUBILANT_METAL_DATA = {
    name: 'Jubilant Metal And Alloys',
    tagline: 'Trust • Quality • Long Term Partner — Your Trusted Partner in Stainless Steel Products',
    category: 'Stainless Steel Pipes, Tubes, Flanges, Pipe Fittings, Forged Fittings & Fasteners',
    location: 'Girgaon, Mumbai, Maharashtra',
    fullAddress: 'Shop No 6, A Wing, 1st Floor, Nakoda Mehta Sunshine Heights, Khadilkar Road, Sadashiv Lane, Kakadwadi, Girgaon, Mumbai - 400004, Maharashtra, India',
    phone: '9820171740',
    phoneFormatted: '+91 9820171740',
    landline: '022 6639 4511',
    whatsapp: '+91 9867611740',
    contactPerson: 'Virendra Desai (Director)',
    email: 'info@jubilantmetal.com',
    website: 'www.jubilantmetal.com',
    rating: 4.9,
    reviews: 142,
    established: '1999',
    experience: '25+ Years',
    legalStatus: 'Registered Enterprise / Manufacturer & Exporter',
    natureOfBusiness: 'Manufacturer, Supplier, Stockist & Exporter',
    panNo: 'ATUPD4241P',
    gstin: '27ATUPD4241P1Z3',
    isoCertified: 'ISO 9001:2008 Certified Company',
    moq: 'Ready Stock / Custom Mill Consignment',
    responseRate: '99%',
    responseTime: '< 30 min',
    fulfillmentRate: '99.9%',
    trustBadge: 'ISO 9001:2008 Certified & Verified Global Exporter',
    about: 'Jubilant Metal And Alloys INC is one of the premier manufacturers, suppliers, stockists, and exporters of Stainless Steel Pipes, Tubes, Flanges, Buttweld Pipe Fittings, Forged Fittings, Fasteners, Round Bars, Sheets, and Plates based in Mumbai, India. We stock ferrous and non-ferrous alloys including SS 304/304L, SS 316/316L, 904L, Duplex 2205, Super Duplex 2507, Inconel, Monel, Hastelloy, Titanium, and Cupro-Nickel. Serving global clients across 80+ countries in refineries, chemical & petrochemical, oil & gas, power generation, sugar mills, and EPC engineering.'
};

const KNOWN_SUPPLIERS = {
    foxecom: JUBILANT_METAL_DATA,
    unitedbrothers: JUBILANT_METAL_DATA,
    united: JUBILANT_METAL_DATA,
    jubilant: JUBILANT_METAL_DATA,
    jubilantmetal: JUBILANT_METAL_DATA,
    jubilantmetalandalloys: JUBILANT_METAL_DATA,
    ashmita: JUBILANT_METAL_DATA,
    ashmitaenterprises: JUBILANT_METAL_DATA,
    ashmitavinyls: JUBILANT_METAL_DATA,
    wsi: JUBILANT_METAL_DATA
};

const TRUST_POINTS = [
    'GSTIN: 27ATUPD4241P1Z3 | ISO 9001:2008 Certified Company',
    'Full Product Scope: Pipes, Tubes, Flanges, Fittings, Fasteners, Round Bars',
    'Specialist in SS 304, 316L, 904L, Duplex, Inconel, Monel & Hastelloy',
    '100% PMI Lab Tested with EN 10204 3.1 Mill Test Certificates (MTC)',
    'Global Exports to 80+ Countries & Immediate Dispatch from Mumbai Stockyard'
];

const SPEC_COLUMNS = [
    { header: 'Factsheet Field', accessor: 'field', style: { width: '38%' } },
    { header: 'Verified Business Detail', accessor: 'value', style: { width: '62%' } }
];

const PRODUCT_CATEGORIES_RANGE = [
    {
        title: 'Stainless Steel Pipes & Tubes',
        count: 'ASTM A312 / A213 / A269',
        desc: 'Seamless and welded stainless steel, duplex, and nickel alloy pipes engineered for high pressure, thermal, and subsea fluid handling.',
        highlight: '1/8" to 24" NB, Schedule 5S to XXS, 100% hydrostatic and eddy current tested.'
    },
    {
        title: 'Stainless Steel Flanges',
        count: 'ASME B16.5 Class 150# - 2500#',
        desc: 'Heavy forged Slip On (SORF), Weld Neck (WNRF), Blind (BLRF), and Socket Weld flanges with serrated gasket facing.',
        highlight: 'Forged ASTM A182 in SS 304, 316L, F51, F53, Inconel 625, and Monel 400.'
    },
    {
        title: 'Buttweld Pipe Fittings',
        count: 'ASME B16.9 Specifications',
        desc: 'Seamless 90° & 45° elbows, equal/reducing tees, concentric/eccentric reducers, and dished caps.',
        highlight: 'Laminar flow contours, beveled weld ends, 100% radiography tested.'
    },
    {
        title: 'Stainless Steel Fasteners',
        count: 'DIN / ISO / ASTM Standards',
        desc: 'High tensile hex head bolts, heavy hex nuts, full threaded stud bolts, and washers in A2-70, A4-80, B8, and B8M.',
        highlight: 'M6 to M48 diameter, non-magnetic, corrosion-resistant thread precision.'
    },
    {
        title: 'Round Bars & Rods',
        count: 'ASTM A276 Centerless Ground',
        desc: 'Bright drawn and peeled round bars in stainless steel, duplex, Inconel, and titanium for CNC machining and shafts.',
        highlight: 'h8/h9 tolerances, 3 mm to 350 mm diameter, 100% ultrasonic tested.'
    },
    {
        title: 'Forged Fittings (3000# / 6000#)',
        count: 'ASME B16.11 Class Ratings',
        desc: 'High pressure socket weld & threaded elbows, tees, unions, couplings, hex bushings, and branch Weldolets/Sockolets.',
        highlight: 'Leak-proof for severe hydraulic, oil & gas, and chemical instrumentation.'
    }
];

const SupplierSection = ({ supplierName, brandKey: propBrandKey }) => {
    const { brandName } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('catalog');

    const brandKey = (propBrandKey || brandName || 'jubilantmetal').toLowerCase().replace(/[^a-z0-9]/g, '');

    const supplierInfo = useMemo(() => {
        const found = KNOWN_SUPPLIERS[brandKey] || JUBILANT_METAL_DATA;
        const displayName = supplierName || found.name || (brandName
            ? brandName.charAt(0).toUpperCase() + brandName.slice(1)
            : 'Jubilant Metal And Alloys');

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
        { id: 3, field: 'Key Director / Contact Person', value: supplierInfo.contactPerson },
        { id: 4, field: 'GSTIN Registration', value: `${supplierInfo.gstin} (Verified Active)` },
        { id: 5, field: 'PAN Number', value: `${supplierInfo.panNo} (Income Tax Dept. Registered)` },
        { id: 6, field: 'Quality Management Certification', value: supplierInfo.isoCertified },
        { id: 7, field: 'Year of Establishment', value: `${supplierInfo.established} (${supplierInfo.experience})` },
        { id: 8, field: 'Corporate & Sales Office', value: supplierInfo.fullAddress },
        { id: 9, field: 'Primary Helpline & Mobile', value: `${supplierInfo.phoneFormatted} / WhatsApp: ${supplierInfo.whatsapp}` },
        { id: 10, field: 'Landline Phone', value: supplierInfo.landline },
        { id: 11, field: 'Official Email & Website', value: `${supplierInfo.email} | ${supplierInfo.website}` },
        { id: 12, field: 'Product Scope', value: supplierInfo.category },
        { id: 13, field: 'Material Grades Stocked', value: 'SS 304/L, SS 316/L, SS 904L, Duplex 2205, Super Duplex 2507, Inconel, Monel, Hastelloy, Titanium' },
        { id: 14, field: 'Dispatch Hub & Port', value: 'Central Stockyard, Mumbai / Nhava Sheva (JNPT) Port Export' }
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
                                    <h5 className="headmini-text font-600 text-dark m-0">🚀 Global & Pan-India Dispatch</h5>
                                    <p className="small-text text-gray mt-10 m-0 leading-relaxed">
                                        Immediate dispatch from our Girgaon, Mumbai stockyard with export sea-worthy packing to 80+ countries worldwide.
                                    </p>
                                </div>
                                <div className="bg-forth p-20 rounded-5">
                                    <h5 className="headmini-text font-600 text-dark m-0">🏭 Stockist, Supplier & Exporter</h5>
                                    <p className="small-text text-gray mt-10 m-0 leading-relaxed">
                                        Zero intermediary markups with direct mill pricing on stainless steel pipes, fittings, flanges, and high-nickel alloys.
                                    </p>
                                </div>
                                <div className="bg-forth p-20 rounded-5">
                                    <h5 className="headmini-text font-600 text-dark m-0">✨ 100% PMI Lab Tested & Certified</h5>
                                    <p className="small-text text-gray mt-10 m-0 leading-relaxed">
                                        Complete traceability with EN 10204 3.1 Mill Test Certificates (MTC), hydrostatic testing, and third-party inspection (TUV, DNV, SGS).
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
