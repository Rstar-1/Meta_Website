import React, { useState, useMemo, useCallback, memo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsData } from '../../../utils/apiData';
import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';
import CardLayout from '../../../components/layout/sections/CardLayout';
import Tab from '../../../components/common/Tab';
import Table from '../../../components/common/Table';
import Modal from '../../../components/common/Modal';

const ROXY_SUPPLIER_DATA = {
    key: 'roxy',
    name: 'Roxy Enterprises',
    tagline: 'Where Strength Meets Precision — Exporter, Stockiest & Supplier',
    category: 'Stainless Steel, Nickel Alloy, Alloy Steel & Carbon Steel (Pipes, Plates, Flanges, Fittings & Fasteners)',
    location: 'Maruti Mandir Marg, 5th Kumbharwada, Mumbai, Maharashtra',
    fullAddress: 'Office no.12, 2nd Floor, 20/26, Doctor Building D Block, Maruti Mandir Marg, 5th Kumbharwada, Mumbai - 400004 (MH), India',
    phone: '9769257080',
    phoneFormatted: '+91 97692 57080',
    contactPerson: 'Mr. Ambalal Choudhary (Procurement & Sales Desk)',
    email: 'roxyenterprises91@gmail.com',
    supportEmail: 'roxyenterprises91@gmail.com',
    website: 'https://roxyenterprises.in',
    rating: 4.9,
    reviews: 185,
    established: '2012',
    experience: '14+ Years',
    legalStatus: 'Registered Enterprise (GST & MSME Registered)',
    natureOfBusiness: 'Exporter, Stockiest, Manufacturer & Wholesale Supplier',
    panNo: 'Verified Industrial Commercial Entity',
    gstin: '27AASFR7491K1ZX',
    moq: 'Commercial Tonnage / Wholesale & Project Orders',
    responseRate: '99%',
    responseTime: '< 15 mins',
    fulfillmentRate: '99.8%',
    trustBadge: '3.1 / 3.2 Mill Test Certified & ISO 9001:2015 Compliant',
    about: 'We "Roxy Enterprises" are an established Exporter, Stockiest, & Supplier of Stainless Steel, Nickel Alloy, Alloy Steel, & Carbon Steel based in Mumbai. We cater to high-demand applications across the Oil & Gas Sector, Chemical Industry, Pharmacy Industry, Paper Pulp Industry, Fertilizer Industry, Food Processing Companies & Engineering Works & Fabricators. All our products are provided with complete 3.1/3.2 Mill Test Certificates.',
    trustPoints: [
        'Complete EN 10204 3.1 / 3.2 Mill Test Certificates with Chemical & Mechanical Reports',
        'Comprehensive Grade Portfolio: SS 304/L, 316/L, 310, 321, 904L, Duplex & Super Duplex',
        'Special Superalloys: Inconel 600/625, Hastelloy C276/C22, Monel 400 & Cu-Ni 70/30',
        'Industrial Plates: Boiler Quality (A516 Gr. 60/70 HIC), Hardox 400/500, Corten A588 & High Tensile',
        'Central Stockyard at 5th Kumbharwada, Mumbai with Prompt Pan-India & Global Export Dispatch'
    ]
};

const GOONJ_SUPPLIER_DATA = ROXY_SUPPLIER_DATA;
const SHREEHARI_SUPPLIER_DATA = ROXY_SUPPLIER_DATA;

const KNOWN_SUPPLIERS = {
    roxy: ROXY_SUPPLIER_DATA,
    roxyenterprises: ROXY_SUPPLIER_DATA,
    ambalal: ROXY_SUPPLIER_DATA,
    ambalalchoudhary: ROXY_SUPPLIER_DATA,
    goonj: ROXY_SUPPLIER_DATA,
    cynor: ROXY_SUPPLIER_DATA,
    shreehari: ROXY_SUPPLIER_DATA,
    support: ROXY_SUPPLIER_DATA,
    united: ROXY_SUPPLIER_DATA
};

const SPEC_COLUMNS = [
    { header: 'Factsheet Field', accessor: 'field', style: { width: '38%' } },
    { header: 'Verified Business Detail', accessor: 'value', style: { width: '62%' } }
];

const ROXY_CATEGORIES_RANGE = [
    {
        title: 'Pipes & Tubes (Seamless, ERW, Welded)',
        count: 'SS, CS, Alloy, Boiler & Marine',
        desc: 'Seamless and welded pipes in SS 304/316, ASTM A106 Gr. B, API 5L X80 PSL2, BS 3059 boiler tubes, and AISI 4130 chrome moly tubes.',
        highlight: '100% Hydrotested & Eddy Current tested with 3.1/3.2 Mill Test Certificates.'
    },
    {
        title: 'Industrial Plates & Sheets',
        count: 'BQ, Hardox, Corten, High Tensile',
        desc: 'ASTM A516 Gr. 60/70 (NACE/HIC), Hardox 400/450/500 wear plates, Corten A588, IS 2062 E350/E450, and marine aluminium plates.',
        highlight: 'Plasma, water-jet, and CNC laser profile cutting to custom fabrication drawings.'
    },
    {
        title: 'Pipe Fittings & Forged Fittings',
        count: 'Butt-Weld, 3000# & Ferrule',
        desc: 'ASME B16.9 elbows, tees, reducers, Class 3000#/6000# socket-weld fittings, and double ferrule instrumentation fittings.',
        highlight: 'Seamless cold-drawn and hot-extruded construction with precision bevel ends.'
    },
    {
        title: 'Stainless Steel & Alloy Flanges',
        count: 'Class 150 to 2500 LBS',
        desc: 'Weld Neck (WNRF), Slip-On (SORF), Blind (BLRF), and RTJ flanges in SS 304, 316L, Duplex, and Nickel Alloys.',
        highlight: 'Forged as per ANSI B16.5 and B16.47 with raised face and ring joint options.'
    },
    {
        title: 'Nickel Alloys & Superalloys',
        count: 'Inconel, Hastelloy, Monel, Cu-Ni',
        desc: 'Inconel 600/625, Hastelloy C276/C22, Monel 400, Incoloy 800H, and Cupro-Nickel 70-30/90-10 pipes, plates, and bars.',
        highlight: 'Resists extreme high temperatures up to 980°C and aggressive acid environments.'
    },
    {
        title: 'SS Circles, Rings & Fasteners',
        count: 'Circles, Rings, Shims & Bolts',
        desc: 'Precision laser-cut SS circles (100mm to 1500mm), seamless rolled rings, ASTM A193 B7/B8 stud bolts, and SS 304/316 nut-bolts.',
        highlight: 'A2-70, A4-80, and ASTM A194 heavy hex bolting for petrochemical pressure vessels.'
    }
];

const GOONJ_CATEGORIES_RANGE = ROXY_CATEGORIES_RANGE;
const SHREEHARI_CATEGORIES_RANGE = ROXY_CATEGORIES_RANGE;

const SupplierSidebarContent = memo(({ supplierInfo, onConnectClick }) => (
    <div className='pb-50 sm-pb-5'>
        <div className="bg-white border-ec p-16 rounded-5">
            <div className="flex items-center gap-12 bordb pb-16">
                <div className="bg-light-primary rounded-full icon-lg flex items-center justify-center flex-shrink-0">
                    <p className="font-600 text-primary para-text m-0">
                        {supplierInfo.name.charAt(0)}
                    </p>
                </div>
                <div>
                    <h3 className="text-dark headmini-text font-600 m-0">{supplierInfo.name}</h3>
                    <p className='mini-text text-success font-500 m-0 mt-2'>✓ Verified Direct Manufacturer</p>
                </div>
            </div>

            <div className="flex items-center justify-between mt-12 bg-forth p-10 rounded-8">
                <div className="flex items-center gap-6">
                    <span className="font-600 text-dark small-text">{supplierInfo.rating}</span>
                    <span className="text-warning mini-text">★★★★★</span>
                </div>
                <span className="text-gray mini-text font-500">
                    ({supplierInfo.reviews} Verified Ratings)
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
                        Call {supplierInfo.phoneFormatted.split('/')[0]}
                    </a>
                </div>
                <div className="flex items-center gap-8">
                    <span className="mini-text">✉️</span>
                    <a href={`mailto:${supplierInfo.email}`} className="text-gray mini-text font-500 m-0 hover-underline truncate">
                        {supplierInfo.email}
                    </a>
                </div>
                <div className="flex items-center gap-8">
                    <span className="mini-text">📋</span>
                    <p className="text-gray mini-text font-500 m-0">GST: {supplierInfo.gstin}</p>
                </div>
                <div className="flex items-center gap-8">
                    <span className="mini-text">🏢</span>
                    <p className="text-gray mini-text font-500 m-0">Status: {supplierInfo.legalStatus.split('(')[0]}</p>
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
                text="Request Wholesale B2B Quote"
                variant="primary"
                onClick={onConnectClick}
                version='v3'
                className="w-full mt-16"
            />
        </div>

        {/* Trust & Quality Box */}
        <div className="bg-white border-ec p-16 rounded-5 mt-14">
            <h4 className="headmini-text font-600 text-dark pb-8 bordb m-0">
                Verified Quality Assurances
            </h4>
            <div className="flex flex-column gap-10 mt-12">
                {supplierInfo.trustPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-8 mini-text text-gray font-500">
                        <span className="text-success font-600 flex-shrink-0">✓</span>
                        <span className="leading-tight">{point}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
));
SupplierSidebarContent.displayName = 'SupplierSidebarContent';

const SupplierSection = ({ supplierName, brandKey: propBrandKey }) => {
    const { brandName } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('catalog');
    const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

    const brandKey = (propBrandKey || brandName || 'roxy').toLowerCase().replace(/[^a-z0-9]/g, '');

    const supplierInfo = useMemo(() => {
        return KNOWN_SUPPLIERS[brandKey] || ROXY_SUPPLIER_DATA;
    }, [brandKey]);

    const categoriesRange = ROXY_CATEGORIES_RANGE;

    const validProducts = useMemo(() => {
        const realProducts = productsData.filter((p) => !p.isBanner);
        const filtered = realProducts.filter(p => (p.vendor || '').toLowerCase().includes('roxy') || (p.brand || '').toLowerCase().includes('roxy'));
        return filtered.length > 0 ? filtered : realProducts;
    }, []);

    const specData = useMemo(() => [
        { id: 1, field: 'Company Name', value: supplierInfo.name },
        { id: 2, field: 'Brand Names', value: 'Roxy Enterprises (Where Strength Meets Precision)' },
        { id: 3, field: 'Nature of Business', value: supplierInfo.natureOfBusiness },
        { id: 4, field: 'Key Contact / Leadership', value: supplierInfo.contactPerson },
        { id: 5, field: 'Quality Certifications', value: supplierInfo.trustBadge },
        { id: 6, field: 'GST / Legal Registration', value: `${supplierInfo.gstin} (${supplierInfo.legalStatus})` },
        { id: 7, field: 'Year of Establishment', value: `${supplierInfo.established} (${supplierInfo.experience})` },
        { id: 8, field: 'Stockyard & Head Office Address', value: supplierInfo.fullAddress },
        { id: 9, field: 'Primary Helpline', value: `${supplierInfo.phoneFormatted} (${supplierInfo.responseRate} Response Rate)` },
        { id: 10, field: 'Official Email & Web', value: `${supplierInfo.email} | ${supplierInfo.website}` },
        { id: 11, field: 'Product Specialization', value: supplierInfo.category },
        { id: 12, field: 'Minimum Order Quantity (MOQ)', value: supplierInfo.moq },
        { id: 13, field: 'Central Dispatch Hub', value: '5th Kumbharwada, Mumbai Central Stockyard & Export Port' }
    ], [supplierInfo]);

    const handleProductClick = useCallback((id) => {
        navigate(`/product/${id}`);
    }, [navigate]);

    const handleConnectClick = useCallback(() => {
        navigate('/connect');
    }, [navigate]);

    const switchSupplier = (key) => {
        navigate(`/supplier/${key}`);
    };

    return (
        <Container>
            <div>
                {/* Mobile Supplier Profile Trigger Button */}
                <div className="hidden sm-flex sm-mt-20">

                    <Button
                        text="Supplier Info"
                        version="v2"
                        bg="dark"
                        color="white"
                        className="rounded-30 font-500 mini-text"
                        onClick={() => setIsMobileModalOpen(true)}
                    />
                </div>

                <div className="flex sm-grid-cols-1 gap-12 items-start w-full py-30 sm-py-1">
                    <div className="w-25 sm-hidden grid-cols-1 gap-12 h-550 overflow-auto sticky" style={{ top: '20%' }}>
                        <SupplierSidebarContent
                            supplierInfo={supplierInfo}
                            onConnectClick={handleConnectClick}
                        />
                    </div>

                    <div className="w-75 sm-w-full sm-mt-20 bg-white">
                        <Tab
                            version="v1"
                            tabs={[
                                { value: 'catalog', name: 'Product Catalog', count: validProducts.length },
                                { value: 'profile', name: 'Company Factsheet & Profile' },
                                { value: 'range', name: 'Product Range' },
                                { value: 'trust', name: 'Accreditations & Compliance' }
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
                                            Established {supplierInfo.established} • {supplierInfo.location}
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
                                            Direct express cargo shipping from our central {supplierInfo.location.split(',')[0]} warehouse across all states and union territories in India.
                                        </p>
                                    </div>
                                    <div className="bg-forth p-20 rounded-5">
                                        <h5 className="headmini-text font-600 text-dark m-0">🏭 Direct Manufacturer Pricing</h5>
                                        <p className="small-text text-gray mt-10 m-0 leading-relaxed">
                                            Zero intermediary markups with certified institutional rates on hospital furniture, holloware, surgical lights, and first aid boxes.
                                        </p>
                                    </div>
                                    <div className="bg-forth p-20 rounded-5">
                                        <h5 className="headmini-text font-600 text-dark m-0">✨ Rigorous Quality Accreditations</h5>
                                        <p className="small-text text-gray mt-10 m-0 leading-relaxed">
                                            Backed by CE Certificate of Compliance, ISO 9001 (QMS), RoHS safety standards, and Factories Act regulatory alignment.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'range' && (
                            <div className="mt-15 grid-cols-2 sm-grid-cols-1 gap-12">
                                {categoriesRange.map((category, index) => (
                                    <div key={index} className="bg-white border-ec p-20 rounded-5">
                                        <div className='bordb pb-8'>
                                            <div className="flex items-center justify-between mb-4">
                                                <h4 className="mid-text font-600 text-dark uppercase m-0">
                                                    {category.title}
                                                </h4>
                                                <span className="mini-text text-primary font-600 bg-light-primary px-8 py-2 rounded-20">
                                                    {category.count}
                                                </span>
                                            </div>
                                            <p className="mini-text text-gray font-400 mt-3 m-0">
                                                {category.desc}
                                            </p>
                                        </div>
                                        <div className="mt-8">
                                            <p className="mini-text text-success font-600 m-0">
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
                                        <p className="mini-text text-gray font-500 uppercase">Government & Business Registration</p>
                                        <h5 className="mid-text font-600 text-dark mt-4">GST: {supplierInfo.gstin}</h5>
                                        <p className="mini-text text-success font-500 mt-6">✓ {supplierInfo.legalStatus}</p>
                                    </div>
                                    <div className="bg-white p-16 rounded-5">
                                        <p className="mini-text text-gray font-500 uppercase">Quality & Safety Standards</p>
                                        <h5 className="mid-text font-600 text-dark mt-4">{supplierInfo.trustBadge.split('&')[0]}</h5>
                                        <p className="mini-text text-primary font-500 mt-6">✓ Verified Direct Supply & CE/ISO Assured Grade</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Responsive Supplier Info Modal / Sidebar */}
                <Modal
                    type="sidebar"
                    placement="left"
                    size="sm"
                    title="Supplier Profile & Overview"
                    isOpen={isMobileModalOpen}
                    onClose={() => setIsMobileModalOpen(false)}
                >
                    <div className="">
                        <SupplierSidebarContent
                            supplierInfo={supplierInfo}
                            onConnectClick={() => {
                                setIsMobileModalOpen(false);
                                handleConnectClick();
                            }}
                        />
                    </div>
                </Modal>
            </div>
        </Container>
    );
};

export default memo(SupplierSection);
