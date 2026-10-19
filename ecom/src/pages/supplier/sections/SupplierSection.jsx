import React, { useState, useMemo, useCallback, memo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsData } from '../../../utils/apiData';
import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';
import CardLayout from '../../../components/layout/sections/CardLayout';
import Tab from '../../../components/common/Tab';
import Table from '../../../components/common/Table';
import Modal from '../../../components/common/Modal';

const ASHMITA_ENTERPRISES_DATA = {
    name: 'Ashmita Enterprises',
    tagline: 'Exporter & Trader — Retailer of PVC Strip Curtains from Mumbai',
    category: 'PVC Strip Curtains, PVC Rolls, PVC Sheets & Mounting Brackets',
    location: 'Bhandup West, Mumbai, Maharashtra - 400078',
    fullAddress: 'C 304, 3rd Floor, Eastern Business District, Near Mangatram Petrol Pump, L.B.S Marg Road, Bhandup West, Mumbai City, Maharashtra - 400078, India',
    phone: '07942562287',
    phoneFormatted: '+91 7942562287',
    rating: 4.3,
    reviews: 72,
    established: '2010',
    experience: '15+ Years',
    legalStatus: 'Proprietorship Firm',
    natureOfBusiness: 'Importer, Exporter, Wholesaler, Trader & Retailer',
    gstin: '27ABLPY9708M1ZK',
    moq: '1 Roll / 50 Mtrs',
    responseRate: '92%',
    responseTime: '< 2 hrs',
    fulfillmentRate: '99.5%',
    trustBadge: 'TrustSEAL Verified & Payment Protected',
    about: 'Established in 2010 at Bhandup West, Mumbai, Maharashtra, Ashmita Enterprises is a Proprietor-based firm, engaged as the foremost Importer and Wholesaler of PVC Strip Curtains, PVC Printed Rolls, PVC Sheet, PVC Roll, PVC Curtain, PVC Film, and Mounting Brackets. These products are highly demanded by customers across India for their low maintenance, optical clarity, temperature control, fine finishing, high functioning, superior durability, and longer service life.'
};

const KNOWN_SUPPLIERS = {
    foxecom: ASHMITA_ENTERPRISES_DATA,
    ashmita: ASHMITA_ENTERPRISES_DATA,
    ashmitaenterprises: ASHMITA_ENTERPRISES_DATA,
    ashmitavinyls: ASHMITA_ENTERPRISES_DATA,
    wsi: {
        ...ASHMITA_ENTERPRISES_DATA,
        name: 'W. S. I (Ashmita Enterprises)',
        category: 'W. S. I Heavy-Duty PVC Strip Curtain Rolls & Hanging Systems'
    }
};

const TRUST_POINTS = [
    'IndiaMART TrustSEAL Verified & Payment Protected',
    'GST Registered: 27ABLPY9708M1ZK (Input Tax Credit)',
    '100% Virgin Grade Flexible Polyvinyl Chloride (PVC)',
    'Pan-India Safe Cargo Dispatch from Mumbai Central Hub',
    'Direct Importer & Wholesale B2B Tier Pricing'
];

const SPEC_COLUMNS = [
    { header: 'Factsheet Field', accessor: 'field', style: { width: '38%' } },
    { header: 'Verified Business Detail', accessor: 'value', style: { width: '62%' } }
];

const PRODUCT_CATEGORIES_RANGE = [
    {
        title: 'PVC Strip Curtains',
        count: '11+ Variants',
        desc: 'W. S. I PVC Strip Curtain Roll, Opaque Black PVC Strips, Red Welding Grade, Yellow Anti-Insect Amber, and Sub-Zero Polar Freezer Grade.',
        highlight: 'Thermal insulation, 45% HVAC energy savings, high optical clarity.'
    },
    {
        title: 'PVC Rolls & Films',
        count: '7+ Variants',
        desc: 'DGT Clear Transparent PVC Roll, Soft PVC Roll, Plain PVC Roll, PVC Mattress Film, and Super Clear PVC Flexible Film.',
        highlight: 'Non-toxic, UV-stabilized, flexible thickness from 1mm to 5mm.'
    },
    {
        title: 'PVC Sheets',
        count: '7+ Variants',
        desc: 'PVC Clear Sheet, Soft PVC Sheet, Shamita Clear Transparent PVC Roll, PVC Flexible Clear Sheet, and Plain PVC Clear Sheet.',
        highlight: 'Excellent chemical resistance, high impact strength, and uniform gauge.'
    },
    {
        title: 'Plastic & Industrial Curtains',
        count: '5+ Variants',
        desc: 'PVC AC Curtain, Anti-Insect Amber Curtain, Cold Storage Blast Freezer Curtains, and Magnetic PVC Strip Curtains.',
        highlight: 'Pest prevention, acoustic noise reduction, and hygienic dust isolation.'
    },
    {
        title: 'Mounting Brackets & Hardware',
        count: 'Ready Stock',
        desc: 'Stainless Steel (SS 304) Strip Curtains Hangers, Hook-on Mounting Tracks, and Clamp Plates for wall & ceiling doorway mounting.',
        highlight: 'Zero rust, rapid individual strip replacement, heavy-duty durability.'
    },
    {
        title: 'Specialty Colored & Shield Films',
        count: 'Custom Slit',
        desc: 'PVC Rainbow Clear Sheet, Fluorescent Super Clear PVC Rolls, and Covid Isolation Partition Curtains.',
        highlight: 'Safety demarcation, tinted glare reduction, and custom doorway fit.'
    }
];

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
                onClick={onConnectClick}
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
));
SupplierSidebarContent.displayName = 'SupplierSidebarContent';

const SupplierSection = ({ supplierName, brandKey: propBrandKey }) => {
    const { brandName } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('catalog');
    const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

    const brandKey = (propBrandKey || brandName || 'foxecom').toLowerCase().replace(/[^a-z0-9]/g, '');

    const supplierInfo = useMemo(() => {
        const found = KNOWN_SUPPLIERS[brandKey] || ASHMITA_ENTERPRISES_DATA;
        const displayName = supplierName || found.name || (brandName
            ? brandName.charAt(0).toUpperCase() + brandName.slice(1)
            : 'Ashmita Enterprises');

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
        { id: 3, field: 'Legal Status', value: supplierInfo.legalStatus },
        { id: 4, field: 'Year of Establishment', value: `${supplierInfo.established} (${supplierInfo.experience})` },
        { id: 5, field: 'GSTIN Registration', value: `${supplierInfo.gstin} (Verified Active)` },
        { id: 6, field: 'Registered Address', value: supplierInfo.fullAddress },
        { id: 7, field: 'Primary Helpline', value: `${supplierInfo.phoneFormatted} (${supplierInfo.responseRate} Response Rate)` },
        { id: 8, field: 'Verification & Trust', value: supplierInfo.trustBadge },
        { id: 9, field: 'Product Category Focus', value: supplierInfo.category },
        { id: 10, field: 'Minimum Order Quantity (MOQ)', value: supplierInfo.moq },
        { id: 11, field: 'Dispatched Hub', value: 'Bhandup West, Mumbai Central Dispatch Center' }
    ], [supplierInfo]);

    const handleProductClick = useCallback((id) => {
        navigate(`/product/${id}`);
    }, [navigate]);

    const handleConnectClick = useCallback(() => {
        navigate('/connect');
    }, [navigate]);

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

                <div className="flex sm-grid-cols-1 gap-12 items-start w-full py-40 sm-py-1">
                    <div className="w-25 sm-hidden grid-cols-1 gap-12 h-550 overflow-auto sticky" style={{ top: '20%' }}>
                        <SupplierSidebarContent
                            supplierInfo={supplierInfo}
                            onConnectClick={handleConnectClick}
                        />
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
                                            Established 2010 • Mumbai, Maharashtra
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
                                            Direct express cargo shipping from our central Bhandup West, Mumbai warehouse across all states in India.
                                        </p>
                                    </div>
                                    <div className="bg-forth p-20 rounded-5">
                                        <h5 className="headmini-text font-600 text-dark m-0">🏭 Importer & Wholesaler</h5>
                                        <p className="small-text text-gray mt-10 m-0 leading-relaxed">
                                            Zero intermediary markups with direct wholesale roll pricing per kg and meter for industrial B2B buyers.
                                        </p>
                                    </div>
                                    <div className="bg-forth p-20 rounded-5">
                                        <h5 className="headmini-text font-600 text-dark m-0">🛠️ Custom Slitting & Hardware</h5>
                                        <p className="small-text text-gray mt-10 m-0 leading-relaxed">
                                            Custom width/thickness rolls, polar cold-flex compounds, anti-insect amber strips, and SS 304 mounting systems.
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
                                        <p className="mini-text text-gray font-500 uppercase">GSTIN Registration</p>
                                        <h5 className="mid-text font-600 text-dark mt-4">{supplierInfo.gstin}</h5>
                                        <p className="mini-text text-success font-500 mt-6">✓ Active & Tax-Compliant (Valid for Input Tax Credit)</p>
                                    </div>
                                    <div className="bg-white p-16 rounded-5">
                                        <p className="mini-text text-gray font-500 uppercase">IndiaMART Trust Certification</p>
                                        <h5 className="mid-text font-600 text-dark mt-4">TrustSEAL Verified Member</h5>
                                        <p className="mini-text text-primary font-500 mt-6">✓ Payment Protected & Verified Business Entity</p>
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
