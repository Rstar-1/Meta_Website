import React, { useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productsData from '../../data/product.json';
import Container from '../../components/common/Container';
import Image from '../../components/common/Image';
import Button from '../../components/common/Button';
import Tab from '../../components/common/Tab';
import Table from '../../components/common/Table';
import Banner from '../../components/layout/generic/Banner';
import SEO from '../../seo';
import bannerImg from '../../assets/about-banner.jpg';

// ─── Curated Supplier Data & Fallbacks ──────────────────────────────────────

const KNOWN_SUPPLIERS = {
    foxecom: {
        name: 'Ashmita Vinyls',
        category: 'Modern Furniture & Home Decor',
        location: 'Mumbai, MH, India',
        rating: 4.8,
        reviews: 320,
        established: '2019',
        experience: '5+ Years',
        gstin: '27AABCF1234F1ZX',
        moq: '₹5,000 / 5 Units',
        responseRate: '98%',
        responseTime: '< 2 hrs',
        fulfillmentRate: '99.4%',
        about: 'FoxEcom Furnishings is a certified OEM manufacturer and bulk distributor specializing in high-grade Scandinavian chairs, luxury velvet armchairs, and modular sofas with pan-India distribution.'
    }
};

const TRUST_POINTS = [
    '100% Quality Inspected',
    'GST Invoice with Tax Credit',
    'Pan-India Safe Cargo Shipping',
    'Verified B2B Direct Pricing'
];

const SPEC_COLUMNS = [
    { header: 'Specification Field', accessor: 'field', style: { width: '40%' } },
    { header: 'Verified Detail', accessor: 'value', style: { width: '60%' } }
];

// ─── Supplier Component ───────────────────────────────────────────────────

const Supplier = () => {
    const { brandName } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('catalog');

    const brandKey = (brandName || 'foxecom').toLowerCase().replace(/[^a-z0-9]/g, '');

    // Resolve Supplier Profile Data
    const supplierInfo = useMemo(() => {
        const found = KNOWN_SUPPLIERS[brandKey];
        const displayName = found?.name || (brandName
            ? brandName.charAt(0).toUpperCase() + brandName.slice(1)
            : 'FoxEcom Furnishings');

        return {
            name: displayName,
            category: found?.category || 'Premium Furniture & Industrial Supplies',
            location: found?.location || 'Mumbai, MH, India',
            rating: found?.rating || 4.8,
            reviews: found?.reviews || 245,
            established: found?.established || '2019',
            experience: found?.experience || '5+ Years',
            gstin: found?.gstin || '27AABCF1234F1ZX',
            moq: found?.moq || '₹5,000 (Bulk MOQ)',
            responseRate: found?.responseRate || '98%',
            responseTime: found?.responseTime || '< 2 hrs',
            fulfillmentRate: found?.fulfillmentRate || '99.2%',
            about: found?.about || `${displayName} is an authorized distributor and verified B2B vendor delivering high-quality commercial furniture, ergonomic chairs, and interior solutions for commercial enterprises.`
        };
    }, [brandKey, brandName]);

    // Filter Products for this Supplier (excluding marketing banners)
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
        { id: 1, field: 'Business Name', value: supplierInfo.name },
        { id: 2, field: 'Product Category', value: supplierInfo.category },
        { id: 3, field: 'Primary Dispatch Hub', value: supplierInfo.location },
        { id: 4, field: 'GSTIN Registration', value: `${supplierInfo.gstin} (Verified)` },
        { id: 5, field: 'Minimum Order (MOQ)', value: supplierInfo.moq },
        { id: 6, field: 'Operating Experience', value: `${supplierInfo.established} (${supplierInfo.experience})` },
        { id: 7, field: 'Dispatch & Fulfillment', value: `${supplierInfo.fulfillmentRate} On-Time SLA` }
    ], [supplierInfo]);

    const handleProductClick = useCallback((id) => {
        navigate(`/product/${id}`);
    }, [navigate]);

    const handleConnectClick = useCallback(() => {
        navigate('/connect');
    }, [navigate]);

    return (
        <>
            <SEO
                title={`${supplierInfo.name} — Verified Supplier Profile`}
                description={`Explore verified supplier profile, catalog, and wholesale pricing for ${supplierInfo.name} at ${supplierInfo.location}.`}
            />

            <Banner
                title={supplierInfo.name}
                desc="Verified Supplier Profile"
                bgImage={bannerImg}
                breadcrumbs={[
                    { label: 'Home', path: '/home' },
                    { label: 'Products', path: '/products' },
                    { label: supplierInfo.name }
                ]}
            />

            <Container>
                <div className="flex sm-grid-cols-1 gap-12 items-start w-full py-40">
                    <div className="w-25 sm-w-full grid-cols-1 gap-12">
                        <div className="bg-white border-ec p-10 rounded-5">
                            <div className="flex items-center gap-12 bordb pb-16">
                                <div
                                    className="bg-light-primary rounded-full icon-lg"
                                >
                                    <p className="font-600 text-primary para-text">
                                        {supplierInfo.name.charAt(0)}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-dark headmini-text font-600">{supplierInfo.name}</h3>
                                    <p className='mini-text text-success font-500'>✓ Verified Partner</p>
                                </div>
                            </div>

                            {/* Ratings & Quick Score */}
                            <div className="flex items-center justify-between mt-12 bg-forth p-10 rounded-8">
                                <div className="flex items-center gap-6">
                                    <span className="font-600 text-dark small-text">{supplierInfo.rating}</span>
                                    <span className="text-warning mini-text">★★★★★</span>
                                </div>
                                <span className="text-gray mini-text font-500">
                                    ({supplierInfo.reviews} Reviews)
                                </span>
                            </div>

                            {/* Quick Metrics Grid */}
                            <div className="grid-cols-2 gap-8 mt-12">
                                <div className="bg-forth p-10 rounded-8 text-center">
                                    <p className="mini-text text-gray m-0">Response Time</p>
                                    <p className="small-text font-600 text-dark m-0 mt-2">{supplierInfo.responseTime}</p>
                                </div>
                                <div className="bg-forth p-10 rounded-8 text-center">
                                    <p className="mini-text text-gray m-0">Fulfillment</p>
                                    <p className="small-text font-600 text-success m-0 mt-2">{supplierInfo.fulfillmentRate}</p>
                                </div>
                            </div>

                            {/* Compact Info List */}
                            <div className="flex flex-column gap-10 mt-16 bordt pt-16">
                                <div className="flex items-center gap-8">
                                    <span className="mini-text">📍</span>
                                    <p className="text-gray mini-text font-500 m-0">{supplierInfo.location}</p>
                                </div>
                                <div className="flex items-center gap-8">
                                    <span className="mini-text">📦</span>
                                    <p className="text-gray mini-text font-500 m-0">MOQ: {supplierInfo.moq}</p>
                                </div>
                                <div className="flex items-center gap-8">
                                    <span className="mini-text">📋</span>
                                    <p className="text-gray mini-text font-500 m-0">GST: {supplierInfo.gstin}</p>
                                </div>
                                <div className="flex items-center gap-8">
                                    <span className="mini-text">🕒</span>
                                    <p className="text-gray mini-text font-500 m-0">Experience: {supplierInfo.experience}</p>
                                </div>
                            </div>

                            {/* Contact Action */}
                            <div className="mt-16">
                                <Button
                                    text="Request B2B Quote"
                                    variant="primary"
                                    onClick={handleConnectClick}
                                    className="w-full justify-center rounded-8 font-500"
                                />
                            </div>
                        </div>

                        <div className="bg-white border-ec p-10 rounded-5">
                            <h4 className="headmini-text font-600 text-dark pb-8 bordb m-0">
                                Trust & Quality Assurance
                            </h4>
                            <div className="flex flex-column gap-10 mt-12">
                                {TRUST_POINTS.map((point, idx) => (
                                    <div key={idx} className="flex items-center gap-8 mini-text text-gray font-500">
                                        <span className="text-success font-600">✓</span>
                                        <span>{point}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="w-75 sm-w-full">
                        <Tab
                            version="v2"
                            tabs={[
                                { value: 'catalog', name: 'Product Catalog', count: validProducts.length },
                                { value: 'profile', name: 'Supplier Specifications' }
                            ]}
                            activeTab={activeTab}
                            onChange={setActiveTab}
                        />

                        {activeTab === 'catalog' && (
                            <div className="mt-20">
                                {validProducts.length > 0 ? (
                                    <div className="grid-cols-3 sm-grid-cols-2 gap-12">
                                        {validProducts.map((product) => {
                                            const formattedPrice = typeof product.price === 'number'
                                                ? `$${product.price.toFixed(2)}`
                                                : (product.priceFormatted || `$${product.price || 0}`);

                                            return (
                                                <div
                                                    key={product.id}
                                                    onClick={() => handleProductClick(product.id)}
                                                    className="bg-forth rounded-5 overflow-hidden cursor-pointer"
                                                >
                                                    <div className="h-200 sm-h-150 overflow-hidden relative bg-forth">
                                                        <Image
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="h-full w-full object-cover flex"
                                                        />
                                                    </div>
                                                    <div className="p-12">
                                                        <p className="mini-text text-gray uppercase font-500">
                                                            {product.category || 'Furniture'}
                                                        </p>
                                                        <h4 className="headmini-text font-600 text-dark line-clamp1 uppercase">
                                                            {product.name}
                                                        </h4>
                                                        <div className="flex items-center justify-between mt-8 pt-8 bordh">
                                                            <p className="font-500 small-text text-dark">
                                                                {formattedPrice}
                                                            </p>
                                                            <p className="mini-text text-primary font-500">
                                                                View →
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
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
                                <div className="bg-white border-ec p-20 rounded-5">
                                    <h4 className="mid-text font-600 text-dark mb-8">
                                        About {supplierInfo.name}
                                    </h4>
                                    <p className="small-text text-gray font-400 m-0 leading-relaxed">
                                        {supplierInfo.about}
                                    </p>
                                </div>

                                <Table
                                    columns={SPEC_COLUMNS}
                                    data={specData}
                                    showControls={false}
                                    minWidth="100%"
                                />

                                <div className="grid-cols-3 sm-grid-cols-1 gap-12 mt-4">
                                    <div className="bg-forth p-20 rounded-5">
                                        <h5 className="headmini-text font-600 text-dark">🚀 Bulk Logistics</h5>
                                        <p className="small-text text-gray mt-10">Pan-India insured express freight directly dispatched from local warehouses.</p>
                                    </div>
                                    <div className="bg-forth p-20 rounded-5">
                                        <h5 className="headmini-text font-600 text-dark">🏭 Factory Direct</h5>
                                        <p className="small-text text-gray mt-10">Zero intermediary margins with direct manufacturer wholesale slab pricing.</p>
                                    </div>
                                    <div className="bg-forth p-20 rounded-5">
                                        <h5 className="headmini-text font-600 text-dark">🛠️ Custom Finishes</h5>
                                        <p className="small-text text-gray mt-10">Custom colorways, velvet fabrics, and enterprise branding options available.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Supplier;
