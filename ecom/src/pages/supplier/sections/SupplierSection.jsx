import React, { useState, useMemo, useCallback, memo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsData } from '../../../utils/apiData';
import Button from '../../../components/common/Button';
import CardLayout from '../../../components/layout/sections/CardLayout';
import Tab from '../../../components/common/Tab';
import Table from '../../../components/common/Table';
import Modal from '../../../components/common/Modal';

const VASUJAVAL_PLASTICS_DATA = {
    name: 'Vasujaval Plastics',
    tagline: 'Manufacturer of Precision Closures & Accessories for Drums, Jerry Cans & IBCs',
    category: 'Bungs, Caps & Closures, Inserts, Dispensing Solutions & Packaging Accessories',
    location: 'Daman (Manufacturing Plant) | Mumbai (Sales Office)',
    fullAddress: 'Manufacturing Unit: Unit Nos. 8,9 & 12 Balaji Industrial Estate, Somnath Road, Dabhel, Daman – 396210, India | Sales Office: 303/B, Byculla Service Industries, Dadoji Konndeo Road, Byculla (E), Mumbai – 400 027, India',
    phone: '9512651119',
    phoneFormatted: '+91 95126 51119',
    email: 'sales@vasujavalplastics.com',
    rating: 4.9,
    reviews: 128,
    established: '2005',
    experience: '20+ Years',
    legalStatus: 'Manufacturing & Export Enterprise',
    natureOfBusiness: 'Manufacturer, Exporter & OEM Supplier',
    gstin: '25AABCV1234F1Z8',
    moq: '500 Pieces / Standard Batch',
    responseRate: '98%',
    responseTime: '< 1 hr',
    fulfillmentRate: '99.8%',
    trustBadge: 'ISO 9001 & UN Packaging Certified',
    about: 'Vasujaval Plastics is an India-based premier manufacturer of high-performance industrial closures and accessories for drums, jerry cans, and IBCs. For decades, we have served diverse industries—including chemicals, fertilizers, pharmaceuticals, engine oils, petroleum, paints, cosmetics, F&B, and FMCG—with reliable, precision-moulded solutions that ensure safe storage, handling, and transport of liquids and chemicals. Our manufacturing strength lies in consistent quality, robust supply capabilities, and the ability to customise closures to meet specific client requirements. From bulk procurement to niche applications, Vasujaval Plastics is a trusted partner for industrial packaging needs.'
};

const KNOWN_SUPPLIERS = {
    foxecom: VASUJAVAL_PLASTICS_DATA,
    vasujaval: VASUJAVAL_PLASTICS_DATA,
    vasujavalplastics: VASUJAVAL_PLASTICS_DATA,
    default: VASUJAVAL_PLASTICS_DATA
};

const TRUST_POINTS = [
    'ISO Certified Manufacturing Unit in Dabhel, Daman',
    '100% Prime Virgin Grade HDPE & PE Polymers (ESCR Tested)',
    'Microporous Silicone Venting & EPDM Gasket Technology',
    'Pan-India Express Safe Palletized Cargo Dispatch',
    'Direct Factory OEM & Bulk B2B Tier Pricing'
];

const SPEC_COLUMNS = [
    { header: 'Factsheet Field', accessor: 'field', style: { width: '38%' } },
    { header: 'Verified Business Detail', accessor: 'value', style: { width: '62%' } }
];

const PRODUCT_CATEGORIES_RANGE = [
    {
        title: 'Bungs & Plugs',
        count: '6+ Variants',
        desc: '50mm Bottom Ring Vented Bungs, 50mm Metal Drum Top Ring Bungs, and 75mm Heavy Duty Bung Plugs with LLDPE/PVC rings.',
        highlight: 'Continuous pressure relief, zero chemical leakage, buttress thread accuracy.'
    },
    {
        title: 'Screw Caps & Drum Lids',
        count: '14+ Variants',
        desc: '25mm to 50mm Standard & Vented Screw Caps, 150mm - 250mm Large Mouth Closures, Open-Top Lids (250mm & 350mm), and IBC DN150 Lids.',
        highlight: 'Drop impact resistance, chemical-inert seals, tamper-evident compatibility.'
    },
    {
        title: 'Neck Inserts & Protectors',
        count: '7+ Variants',
        desc: '25mm, 48mm, 50mm, 150mm, 200mm, and 250mm press-fit neck inserts and single-use dust protectors for drums & carboys.',
        highlight: 'Secondary liquid containment barrier, interference fit, clean particulate protection.'
    },
    {
        title: 'Dispensing Solutions & Valves',
        count: '11+ Variants',
        desc: 'DN80 Integrated & Welded Butterfly Valves, DN50 Split Thread & Integrated Ball Valves, and Quick-Connect Camlock Couplers.',
        highlight: 'Smooth fluid decanting, EPDM chemical-proof seals, tested up to 1.0 MPa.'
    },
    {
        title: 'Industrial Accessories & Tools',
        count: '8+ Variants',
        desc: 'Bung Dust Covers, Non-Sparking Drum Spanner Wrenches, Heavy Duty Handle Sets, Container Rivets, Lugs, Sealing Rings, and Locking Clips.',
        highlight: 'Heavy load-bearing, non-sparking safety tools, tamper-evident security.'
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
                    <p className='mini-text text-success font-500 m-0 mt-2'>✓ ISO & UN Certified</p>
                </div>
            </div>

            <div className="flex items-center justify-between mt-12 bg-forth p-10 rounded-8">
                <div className="flex items-center gap-6">
                    <span className="font-600 text-dark small-text">{supplierInfo.rating}</span>
                    <span className="text-warning mini-text">★★★★★</span>
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
                        Call {supplierInfo.phoneFormatted}
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
        const found = KNOWN_SUPPLIERS[brandKey] || VASUJAVAL_PLASTICS_DATA;
        const displayName = supplierName || found.name || (brandName
            ? brandName.charAt(0).toUpperCase() + brandName.slice(1)
            : 'Vasujaval Plastics');

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
        { id: 6, field: 'Manufacturing Unit', value: 'Unit Nos. 8,9 & 12 Balaji Industrial Estate, Somnath Road, Dabhel, Daman – 396210, India' },
        { id: 7, field: 'Corporate & Sales Office', value: '303/B, Byculla Service Industries, Dadoji Konndeo Road, Byculla (E), Mumbai – 400 027, India' },
        { id: 8, field: 'Primary Helpline', value: `${supplierInfo.phoneFormatted} (${supplierInfo.responseRate} Response Rate)` },
        { id: 9, field: 'Email Address', value: supplierInfo.email },
        { id: 10, field: 'Verification & Standards', value: supplierInfo.trustBadge },
        { id: 11, field: 'Product Category Focus', value: supplierInfo.category },
        { id: 12, field: 'Minimum Order Quantity (MOQ)', value: supplierInfo.moq },
        { id: 13, field: 'Central Dispatch Hub', value: 'Dabhel, Daman Manufacturing Plant & Mumbai Central Hub' }
    ], [supplierInfo]);

    const handleProductClick = useCallback((id) => {
        navigate(`/product/${id}`);
    }, [navigate]);

    const handleConnectClick = useCallback(() => {
        navigate('/connect');
    }, [navigate]);

    return (
        <div className='w-full'>
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
                                        Established 2005 • Daman & Mumbai, India
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
                                        Direct express cargo shipping from our Daman manufacturing plant and Mumbai central hub across all industrial centers in India.
                                    </p>
                                </div>
                                <div className="bg-forth p-20 rounded-5">
                                    <h5 className="headmini-text font-600 text-dark m-0">🏭 Manufacturer & OEM</h5>
                                    <p className="small-text text-gray mt-10 m-0 leading-relaxed">
                                        Zero intermediary markups with direct factory volume pricing for drums, jerry cans, carboys, and IBC container manufacturers.
                                    </p>
                                </div>
                                <div className="bg-forth p-20 rounded-5">
                                    <h5 className="headmini-text font-600 text-dark m-0">🛠️ Custom Moulding & Branding</h5>
                                    <p className="small-text text-gray mt-10 m-0 leading-relaxed">
                                        Options in Pantone custom colors, embossed corporate logos, bespoke thread configurations, and specialized venting membranes.
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
                                    <p className="mini-text text-gray font-500 uppercase">Quality Certification</p>
                                    <h5 className="mid-text font-600 text-dark mt-4">ISO 9001 & UN Packaging Compliant</h5>
                                    <p className="mini-text text-primary font-500 mt-6">✓ Certified Manufacturer & Chemical Packaging Entity</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

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
    );
};

export default memo(SupplierSection);
