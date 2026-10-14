import React, { useState, useMemo, useCallback, memo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsData } from '../../../utils/apiData';
import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';
import CardLayout from '../../../components/layout/sections/CardLayout';
import Tab from '../../../components/common/Tab';
import Table from '../../../components/common/Table';
import Modal from '../../../components/common/Modal';

const GOONJ_SUPPLIER_DATA = {
    key: 'goonj',
    name: 'Goonj Communication & Electronic Scale Co.',
    tagline: 'Precision Healthcare, Hospital Furniture & Surgical Excellence',
    category: 'Hospital Holloware, OT Equipment, Autoclaves, Linen & Diagnostics',
    location: 'Dilshad Garden, Delhi, India',
    fullAddress: '58-B, Damodar Park Ind. Area, Dilshad Garden, Delhi - 110095, India',
    phone: '9873198731',
    phoneFormatted: '+91 98731 98731 / +91 98732 98731',
    contactPerson: 'Mr. Ajay Arora (Founder)',
    email: 'info@goonjcom.in',
    supportEmail: 'support@goonjcom.in',
    website: 'www.goonjcom.in',
    rating: 4.9,
    reviews: 142,
    established: '2011',
    experience: '15+ Years',
    legalStatus: 'Registered Enterprise (UDYAM & GST Registered)',
    natureOfBusiness: 'Manufacturer, Importer & Wholesale Distributor',
    panNo: 'Verified Commercial Entity',
    gstin: '07AAAFG8942K1ZV',
    moq: '1 Unit / Bulk Hospital Wholesale',
    responseRate: '99%',
    responseTime: '< 30 mins',
    fulfillmentRate: '99.8%',
    trustBadge: 'ISO 9001 (QMS) & CE Certified Healthcare Manufacturer',
    about: 'Goonj Communication & Electronic Scale Co. was founded in 2011 by Mr. Ajay Arora. Over the years, Goonj and brand CYNOR have grown into premier names in manufacturing and importing high-quality hospital holloware, operation theatre equipment, shadowless cold LED surgical lights, autoclaves, suction apparatus, hospital ICU beds, medical linens, and precision diagnostics. Serving thousands of hospitals, clinics, and healthcare centers across India.',
    trustPoints: [
        'ISO 9001 (QMS) & ISO 14001 (EMS) Certified Manufacturing',
        'CE Certificate of Compliance & RoHS Compliant Materials',
        'AISI 304 Non-Magnetic Medical Grade Stainless Steel Holloware',
        'Direct Factory Wholesale Pricing from Delhi Central Warehouse',
        'Prompt Pan-India Cargo Transit with Real-Time Consignment Tracking'
    ]
};

const SHREEHARI_SUPPLIER_DATA = {
    key: 'shreehari',
    name: 'Shreehari Surgicals & Co.',
    tagline: 'SUPPORT — Learn First Aid, Save Lives',
    category: 'First Aid Kits, Industrial Emergency Boxes, Stretchers & Trauma Care',
    location: 'Masjid Bunder, Mumbai, Maharashtra',
    fullAddress: 'Off No: 11, 12, 2nd Floor, 290/292, Vadgadi Azad Chowk CHSL, Samuel Street, Masjid Bunder (W), Mumbai - 400003, India',
    phone: '9817926992',
    phoneFormatted: '+91 98179 26992 / +91 98205 60982',
    contactPerson: 'Director / Customer Care Desk',
    email: 'shreeharisurgicals@gmail.com',
    supportEmail: 'shreeharisurgicals.co2802@gmail.com',
    website: 'www.shreeharisurgical.com',
    rating: 4.9,
    reviews: 118,
    established: '2008',
    experience: '18+ Years',
    legalStatus: 'Registered Enterprise (CE & ISO 9001:2015 Certified)',
    natureOfBusiness: 'Manufacturer, Wholesaler & Exporter',
    panNo: 'Registered Commercial Enterprise',
    gstin: '27AASFS9821L1Z4',
    moq: '10 First Aid Kits / 1 Stretcher',
    responseRate: '98%',
    responseTime: '< 45 mins',
    fulfillmentRate: '99.5%',
    trustBadge: 'CE Certified (9511/CE/R001) & ISO 9001:2015 Registered',
    about: 'Shreehari Surgicals & Co. (brand SUPPORT) is an ISO 9001:2015 and CE certified manufacturer and exporter of industrial first aid boxes, trauma kits, emergency scoop stretchers, spine boards, and wheeled evacuation stair chairs based in Masjid Bunder, Mumbai. Conforming strictly to the Indian Factories Act, Directive 2006/42/CE, and EC Directive 92/29, we supply certified emergency equipment to industrial plants, transport fleets, educational campuses, and defense teams nationwide.',
    trustPoints: [
        'CE Certificate of Compliance (Directive 2006/42/CE & 92/29, Cert No: 9511/CE/R001)',
        'ISO 9001:2015 Certified Quality Management System',
        'Section 45 Factories Act Compliant (Types A, B, C & Type 4 Kits)',
        'Extruded High-Tensile Aluminium Alloy & HDPE Trauma Stretchers',
        'Central Dispatch from Mumbai Maritime & Transport Transit Hub'
    ]
};

const KNOWN_SUPPLIERS = {
    goonj: GOONJ_SUPPLIER_DATA,
    cynor: GOONJ_SUPPLIER_DATA,
    goonjhealthcare: GOONJ_SUPPLIER_DATA,
    foxecom: GOONJ_SUPPLIER_DATA,
    shreehari: SHREEHARI_SUPPLIER_DATA,
    shreeharisurgicals: SHREEHARI_SUPPLIER_DATA,
    support: SHREEHARI_SUPPLIER_DATA,
    united: GOONJ_SUPPLIER_DATA,
    unitedbrothers: GOONJ_SUPPLIER_DATA
};

const SPEC_COLUMNS = [
    { header: 'Factsheet Field', accessor: 'field', style: { width: '38%' } },
    { header: 'Verified Business Detail', accessor: 'value', style: { width: '62%' } }
];

const GOONJ_CATEGORIES_RANGE = [
    {
        title: 'Hospital Holloware & Utensils',
        count: 'Grade 304 Stainless Steel',
        desc: 'Jointed and jointless dressing drums, surgical instrument trays with covers, catheter trays, kidney dishes, gallipots, bedpans, and Cidex sterilizing trays.',
        highlight: 'Seamless deep-drawn AISI 304 stainless steel, autoclave safe up to 134°C with smooth mirror finish.'
    },
    {
        title: 'O.T. & Examination Lights',
        count: 'LED 6, 7, 12, 20 & Ceiling',
        desc: 'Advanced cold LED examination lights, mobile procedural lamps, and 20-LED surgical operation theatre lights.',
        highlight: 'Shadow-free optical design, 50,000 hours diode lifespan, 35,000 to 100,000 Lux cold illumination.'
    },
    {
        title: 'Sterilization & Suction Apparatus',
        count: 'Standard & Radial Triple Wall',
        desc: '12x12 & 14x15 deluxe stainless steel pressure autoclaves, vertical triple-wall radial locking sterilizers, and 1/4 HP electric suction units.',
        highlight: 'Automatic pressure release valves, dual safety cut-offs, high vacuum up to -700 mmHg.'
    },
    {
        title: 'Hospital Furniture & Trolleys',
        count: 'Full Ward & ICU Range',
        desc: 'SSP emergency crash carts, stainless steel drug & ECG trolleys, stretcher trolleys, and ICU fowler beds.',
        highlight: 'Heavy epoxy powder coating, smooth ball-bearing drawers, and anti-static castor wheels.'
    },
    {
        title: 'Hospital Linen & Protective Disposables',
        count: 'AAMI Level 3 Certified',
        desc: 'Sterile disposable surgical gowns, liquid barrier gowns, reusable scrub suits, N95 particulate respirators, and cotton drape sheets.',
        highlight: 'Hydrophobic SMS/SMMS fabric, EO sterile sealed, certified viral and blood penetration barrier.'
    },
    {
        title: 'Diagnostic & Neonatal Care',
        count: 'Specialized Medical Units',
        desc: 'Neonatal jaundice LED phototherapy units, micro-infusion touchscreen syringe pumps, 12-inch patient monitors, and cardiology stethoscopes.',
        highlight: '460 nm narrow-band blue LEDs, ±2% infusion accuracy, 120-hour trend storage monitors.'
    }
];

const SHREEHARI_CATEGORIES_RANGE = [
    {
        title: 'Industrial & Factory First Aid Kits',
        count: 'Types A, B, C & Type 4',
        desc: 'Full compliance with Section 45 Factories Act. Custom packed with 28 to 38 medical components in heavy plastic or sheet metal boxes.',
        highlight: 'CE Certified, trilingual resuscitation instruction chart, tamper-evident safety latches.'
    },
    {
        title: 'Emergency Scoop & Spine Stretchers',
        count: 'Aluminium & HDPE Models',
        desc: 'High-strength aluminium alloy scoop stretchers with rapid decoupling clutch hinges, and 100% X-Ray translucent HDPE spine boards.',
        highlight: 'Prevents secondary spinal cord injury, 180 kg load capacity, water rescue buoyant.'
    },
    {
        title: 'Evacuation Stair Chairs & Wheeled Stretchers',
        count: 'Dual-Function Compact Fold',
        desc: 'Multi-function emergency evacuation chairs that transition from flat wheeled stretchers into stair-descending transport chairs.',
        highlight: 'Compact 4-fold profile for rapid emergency deployment in multi-story buildings and ambulances.'
    },
    {
        title: 'Wall-Mounted Medical Cabinets',
        count: 'Steel & SS 304 Models',
        desc: 'Heavy-gauge steel and stainless steel wall-mounting first aid cabinets with acrylic/glass doors, interior shelving, and cylinder key locks.',
        highlight: 'Keeps medications organized, clean, locked, and easily visible for emergency responders.'
    },
    {
        title: 'Personal, Vehicle & Travel Kits',
        count: 'Relief & Travel Series',
        desc: 'Compact click-lock first aid kits for family vehicles, tour operators, trekking backpacks, and residential homes.',
        highlight: 'Organized compartments, water-tight rubberized seal, high-grade burn lotions and dressings.'
    },
    {
        title: 'SafeSlide Patient Transfer Boards',
        count: 'Low-Friction Engineering',
        desc: 'High-density low-friction patient transfer slide boards for bridging the gap between hospital beds, stretchers, and OT tables.',
        highlight: 'Reduces caregiver back strain by over 70%, prevents shear damage on fragile patient skin.'
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

    const brandKey = (propBrandKey || brandName || 'goonj').toLowerCase().replace(/[^a-z0-9]/g, '');

    const isShreehari = brandKey.includes('shreehari') || brandKey.includes('support');

    const supplierInfo = useMemo(() => {
        return KNOWN_SUPPLIERS[brandKey] || (isShreehari ? SHREEHARI_SUPPLIER_DATA : GOONJ_SUPPLIER_DATA);
    }, [brandKey, isShreehari]);

    const categoriesRange = isShreehari ? SHREEHARI_CATEGORIES_RANGE : GOONJ_CATEGORIES_RANGE;

    const validProducts = useMemo(() => {
        const realProducts = productsData.filter((p) => !p.isBanner);
        if (isShreehari) {
            return realProducts.filter(p => (p.vendor || '').toLowerCase().includes('shreehari') || (p.brand || '').toLowerCase().includes('support'));
        }
        return realProducts.filter(p => (p.vendor || '').toLowerCase().includes('goonj') || (p.brand || '').toLowerCase().includes('cynor'));
    }, [isShreehari]);

    const specData = useMemo(() => [
        { id: 1, field: 'Company Name', value: supplierInfo.name },
        { id: 2, field: 'Brand Names', value: isShreehari ? 'SUPPORT (First Aid & Save Lives)' : 'Goonj & CYNOR Healthcare' },
        { id: 3, field: 'Nature of Business', value: supplierInfo.natureOfBusiness },
        { id: 4, field: 'Key Contact / Leadership', value: supplierInfo.contactPerson },
        { id: 5, field: 'Quality Certifications', value: supplierInfo.trustBadge },
        { id: 6, field: 'GST / Legal Registration', value: `${supplierInfo.gstin} (${supplierInfo.legalStatus})` },
        { id: 7, field: 'Year of Establishment', value: `${supplierInfo.established} (${supplierInfo.experience})` },
        { id: 8, field: 'Factory & Head Office Address', value: supplierInfo.fullAddress },
        { id: 9, field: 'Primary Helpline', value: `${supplierInfo.phoneFormatted} (${supplierInfo.responseRate} Response Rate)` },
        { id: 10, field: 'Official Email & Web', value: `${supplierInfo.email} | ${supplierInfo.website}` },
        { id: 11, field: 'Product Specialization', value: supplierInfo.category },
        { id: 12, field: 'Minimum Order Quantity (MOQ)', value: supplierInfo.moq },
        { id: 13, field: 'Central Dispatch Hub', value: isShreehari ? 'Masjid Bunder, Mumbai Logistics Hub' : 'Dilshad Garden, Delhi Industrial Hub' }
    ], [supplierInfo, isShreehari]);

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
