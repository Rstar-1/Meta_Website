import React, { useState, useRef, useEffect, useCallback, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../common/Button';
import Icon from '../common/Icon';
import Image from '../common/Image';
import Fields from '../forms/Fields';

import { productsData } from '../../utils/apiData';
import { resolveImagePath } from '../../utils/imageResolver';

const QUICK_ACTIONS = [
    {
        id: 'pipes',
        title: 'Pipes & Tubes',
        subtitle: 'Seamless, ERW & Welded',
        icon: 'Layers',
        iconBg: '#2563eb',
        reply: 'Roxy Enterprises supplies premium industrial pipes and tubes with EN 10204 3.1 & 3.2 Mill Test Certificates:\n\n• **Stainless Steel Pipes**: Seamless & ERW in SS 304, 304L, 316, 316L, 321, 310S, and 904L.\n• **Duplex & Super Duplex**: UNS S31803 / S32205 & S32750 for offshore and high-chloride services.\n• **Carbon Steel & Alloy Steel**: ASTM A106 Gr. B, A333 Low Temp, A335 (P11, P22, P91).\n• **Custom Sizing**: Schedules Sch 10 to Sch XXS with full ultrasonic NDT testing.',
        cta: { text: 'View Pipes & Tubes', path: '/product?category=Pipes%20%26%20Tubes%20(Seamless%2C%20ERW%2C%20Welded)' }
    },
    {
        id: 'plates',
        title: 'Plates & Sheets',
        subtitle: 'Hardox, Boiler & Corten',
        icon: 'Shield',
        iconBg: '#dc2626',
        reply: 'We maintain extensive stock of high-grade industrial plates ready for immediate dispatch:\n\n• **Boiler Quality Plates**: ASTM A516 Gr. 60 / Gr. 70 for pressure vessels and autoclaves.\n• **Wear Resistant Plates**: Hardox 400, Hardox 500 & Abrex 400 for mining, crushing, and fabrication.\n• **Corten & Weathering Steel**: ASTM A588 & A242 atmospheric corrosion resistant plates.\n• **High Tensile & Structural**: S355JR, IS 2062, and quenched & tempered alloy plates.',
        cta: { text: 'Explore Industrial Plates', path: '/product?category=Industrial%20Plates%20%26%20Sheets' }
    },
    {
        id: 'alloys',
        title: 'Nickel & Superalloys',
        subtitle: 'Inconel, Monel & Hastelloy',
        icon: 'Sun',
        iconBg: '#d97706',
        reply: 'Specialty high-nickel alloys and corrosion-resistant materials for demanding process plants:\n\n• **Inconel**: Inconel 600, 625, 718, and 825 for extreme thermal and oxidizing environments.\n• **Hastelloy**: C276 and C22 for severe acid, wet chlorine, and chemical processing.\n• **Monel & Cupro-Nickel**: Monel 400, K500, and Copper-Nickel 90/10 & 70/30 for marine piping.\n• **Complete Traceability**: 100% positive material identification (PMI) verified.',
        cta: { text: 'View Nickel Alloys', path: '/product?category=Nickel%20Alloys%20%26%20High-Performance%20Superalloys' }
    },
    {
        id: 'contact',
        title: 'Procurement & Quotes',
        subtitle: 'Mumbai Stockyard Desk',
        icon: 'Phone',
        iconBg: '#059669',
        reply: `Connect with Mr. Ambalal Choudhary at Roxy Enterprises procurement desk for fast mill rate quotes and project inquiries:\n\n• **Direct Phone**: ${import.meta.env.VITE_PHONE || '+91 97692 57080'}\n• **Email**: ${import.meta.env.VITE_EMAIL || 'roxyenterprises91@gmail.com'}\n• **Mumbai Stockyard & Office**: Office no.12, 2nd Floor, Doctor Bldg D Block, Maruti Mandir Marg, 5th Kumbharwada, Mumbai - 400004 (MH), India\n• **Pan-India & Global Export**: Fast containerized cargo and road logistics with real-time MTC dispatch.`,
        cta: { text: 'Submit Procurement RFP', path: '/connect' }
    }
];

const generateBotReply = (userText) => {
    const q = (userText || '').toLowerCase().trim();
    const allProducts = (productsData || []).filter((p) => !p.isBanner);

    // 1. Pipes & Tubes (Seamless, ERW, Welded)
    if (q.includes('pipe') || q.includes('tube') || q.includes('tubing') || q.includes('seamless') || q.includes('erw') || q.includes('welded pipe') || q.includes('sch ') || q.includes('schedule') || q.includes('a106') || q.includes('a312') || q.includes('a335') || q.includes('a213')) {
        const matching = allProducts.filter(p => (p.category || '').toLowerCase().includes('pipe') || (p.name || '').toLowerCase().includes('pipe') || (p.subCategory || '').toLowerCase().includes('pipe')).slice(0, 3);
        return {
            text: 'Roxy Enterprises stocks a comprehensive range of industrial seamless, ERW, and welded pipes:\n\n• **Stainless Steel Pipes**: SS 304/304L, 316/316L, 321, 310, 904L, Duplex 2205, and Super Duplex 2507.\n• **Carbon Steel & Alloy Steel**: ASTM A106 Gr. B, ASTM A333 (Grade 6), ASTM A335 (P11, P22, P91).\n• **Certifications**: 100% EN 10204 3.1 & 3.2 Mill Test Certificates with ultrasonic NDT.',
            products: matching,
            cta: { text: 'View Pipes & Tubes', path: '/product?category=Pipes%20%26%20Tubes%20(Seamless%2C%20ERW%2C%20Welded)' }
        };
    }

    // 2. Industrial Plates & Sheets (Boiler Quality, Hardox, Corten)
    if (q.includes('plate') || q.includes('sheet') || q.includes('hardox') || q.includes('boiler') || q.includes('a516') || q.includes('corten') || q.includes('a588') || q.includes('wear') || q.includes('abrex') || q.includes('shim') || q.includes('strip')) {
        const matching = allProducts.filter(p => (p.category || '').toLowerCase().includes('plate') || (p.name || '').toLowerCase().includes('plate') || (p.name || '').toLowerCase().includes('sheet')).slice(0, 3);
        return {
            text: 'We maintain ready stock of heavy industrial plates and pressure-vessel steels:\n\n• **Boiler Quality (BQ) Plates**: ASTM A516 Gr. 60 / 70 for autoclaves, boilers, and petrochemical reactors.\n• **Abrasion Resistant Plates**: Hardox 400 & 500 for heavy earthmoving, mining chutes, and fabrication.\n• **Weathering & High Tensile**: Corten ASTM A588, IS 2062 E350, S355JR structural plates.',
            products: matching,
            cta: { text: 'View Industrial Plates', path: '/product?category=Industrial%20Plates%20%26%20Sheets' }
        };
    }

    // 3. Pipe Fittings & Butt-Weld
    if (q.includes('fitting') || q.includes('elbow') || q.includes('tee') || q.includes('reducer') || q.includes('cap') || q.includes('stub end') || q.includes('butt-weld') || q.includes('socket weld') || q.includes('union') || q.includes('nipple')) {
        const matching = allProducts.filter(p => (p.category || '').toLowerCase().includes('fitting') || (p.name || '').toLowerCase().includes('elbow') || (p.name || '').toLowerCase().includes('tee')).slice(0, 3);
        return {
            text: 'Industrial butt-weld, socket-weld, and threaded pipe fittings conforming to ASME B16.9 / B16.11:\n\n• **Types**: Long/short radius 90° & 45° elbows, equal/reducing tees, concentric/eccentric reducers, end caps.\n• **Grades**: ASTM A403 WP304/304L, WP316/316L, Duplex, ASTM A234 WPB, and Nickel alloys.\n• **Pressure Ratings**: Sch 10 to Sch XXS, and 3000# / 6000# forged socket-weld fittings.',
            products: matching,
            cta: { text: 'View Pipe Fittings', path: '/product?category=Pipe%20Fittings%20%26%20Butt-Weld%20Fittings' }
        };
    }

    // 4. Forged Steel Flanges
    if (q.includes('flange') || q.includes('weld neck') || q.includes('slip on') || q.includes('blind') || q.includes('socket weld flange') || q.includes('threaded flange') || q.includes('lap joint') || q.includes('150#') || q.includes('300#') || q.includes('600#')) {
        const matching = allProducts.filter(p => (p.category || '').toLowerCase().includes('flange') || (p.name || '').toLowerCase().includes('flange')).slice(0, 3);
        return {
            text: 'Precision forged industrial flanges adhering to ASME B16.5, DIN, and BS specifications:\n\n• **Class Ratings**: Class 150#, 300#, 600#, 900#, 1500#, and 2500# (PN6 to PN64).\n• **Configurations**: Weld Neck (WN), Slip-On (SORF), Blind (BLRF), Socket Weld (SWRF), Threaded.\n• **Metallurgy**: Stainless Steel 304/316L, ASTM A105 Carbon Steel, Alloy Steel A182 F11/F22, Inconel.',
            products: matching,
            cta: { text: 'View Flanges Range', path: '/product?category=Flanges%20(Forged%2C%20Slip-On%2C%20Blind%2C%20Weld-Neck)' }
        };
    }

    // 5. Nickel Alloys & Superalloys
    if (q.includes('nickel') || q.includes('inconel') || q.includes('hastelloy') || q.includes('monel') || q.includes('cupro') || q.includes('copper nickel') || q.includes('alloy 20') || q.includes('super duplex') || q.includes('uns ')) {
        const matching = allProducts.filter(p => (p.category || '').toLowerCase().includes('nickel') || (p.name || '').toLowerCase().includes('inconel') || (p.name || '').toLowerCase().includes('hastelloy') || (p.name || '').toLowerCase().includes('monel')).slice(0, 3);
        return {
            text: 'Specialty high-nickel superalloys engineered for aggressive corrosion and elevated temperatures:\n\n• **Inconel**: 600, 625, 718, and 825 pipes, plates, round bars, and fittings.\n• **Hastelloy**: C276, C22, and B2 for chemical and wet chlorine processing.\n• **Monel & Cupro-Nickel**: Monel 400 and Copper-Nickel 90/10 & 70/30 for marine seawater piping.',
            products: matching,
            cta: { text: 'View Nickel Alloys', path: '/product?category=Nickel%20Alloys%20%26%20High-Performance%20Superalloys' }
        };
    }

    // 6. Circles, Rings, Shims & Fasteners
    if (q.includes('circle') || q.includes('ring') || q.includes('fastener') || q.includes('bolt') || q.includes('nut') || q.includes('stud') || q.includes('washer') || q.includes('angle') || q.includes('tool steel') || q.includes('flat bar') || q.includes('d2') || q.includes('h13')) {
        const matching = allProducts.filter(p => (p.category || '').toLowerCase().includes('circle') || (p.category || '').toLowerCase().includes('fastener') || (p.name || '').toLowerCase().includes('circle') || (p.name || '').toLowerCase().includes('bolt')).slice(0, 3);
        return {
            text: 'Cut-to-size stainless steel circles, rings, precision shims, and heavy-duty fasteners:\n\n• **SS Circles & Rings**: Plasma and laser cut to exact project diameters.\n• **Industrial Fasteners**: High tensile ASTM A193 B7 / A194 2H stud bolts, SS 304/316 hex bolts & nuts.\n• **Structural & Tool Steels**: SS Angles, Channels, and D2 / H13 alloy tool steel round bars.',
            products: matching,
            cta: { text: 'View Fasteners & Hardware', path: '/product?category=Fasteners%2C%20Nuts%2C%20Bolts%20%26%20Hardware' }
        };
    }

    // 7. Mill Test Certificates & Quality
    if (q.includes('mtc') || q.includes('certificate') || q.includes('en 10204') || q.includes('3.1') || q.includes('3.2') || q.includes('testing') || q.includes('ndt') || q.includes('quality') || q.includes('pmi')) {
        return {
            text: 'All materials supplied by Roxy Enterprises adhere strictly to international quality norms:\n\n• **EN 10204 3.1 & 3.2**: Certified manufacturer test certificates issued with heat numbers.\n• **Testing Protocols**: 100% PMI spectro chemical analysis, ultrasonic flaw detection, tensile/hardness tests.\n• **Third-Party Inspection**: TUV, Lloyd’s Register, Bureau Veritas, DNV, and SGS inspections accommodated.',
            cta: { text: 'Learn About Quality Assurance', path: '/supplier' }
        };
    }

    // 8. Wholesale / Price / Quotation / RFP
    if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('wholesale') || q.includes('quote') || q.includes('quotation') || q.includes('tender') || q.includes('bulk') || q.includes('rfp')) {
        const matching = allProducts.slice(0, 3);
        return {
            text: 'We provide competitive direct stockyard pricing and project rate contracts:\n\n• **Stockyard Wholesale Rates**: Direct supply from Mumbai without intermediary markups.\n• **Quick Turnaround**: Custom Bill of Materials (BOM) quotations provided within 2 to 4 business hours.\n• **Pan-India & Global Export**: Full container load (FCL) and less than container load (LCL) dispatches.',
            products: matching,
            cta: { text: 'Request Wholesale Quotation', path: '/connect' }
        };
    }

    // 9. Contact / Address / Helplines
    if (q.includes('contact') || q.includes('phone') || q.includes('call') || q.includes('whatsapp') || q.includes('mail') || q.includes('address') || q.includes('where') || q.includes('location') || q.includes('mumbai') || q.includes('ambalal')) {
        return {
            text: `Connect with Roxy Enterprises procurement & sales desk:\n\n• **Key Person**: Mr. Ambalal Choudhary (Procurement & Sales)\n• **Phone / WhatsApp**: ${import.meta.env.VITE_PHONE || '+91 97692 57080'}\n• **Email**: ${import.meta.env.VITE_EMAIL || 'roxyenterprises91@gmail.com'}\n• **Address**: Office no.12, 2nd Floor, 20/26, Doctor Building D Block, Maruti Mandir Marg, 5th Kumbharwada, Mumbai - 400004 (MH), India\n• **Operating Hours**: Monday – Saturday: 09:30 AM – 07:00 PM IST`,
            cta: { text: 'Go to Contact Page', path: '/connect' }
        };
    }

    // 10. General search fallback with matching products
    const matching = allProducts.filter(p =>
        p.name?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.subCategory?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.vendor?.toLowerCase().includes(q)
    ).slice(0, 3);

    if (matching.length > 0) {
        return {
            text: `Here are matching steel and piping items for "${userText}":`,
            products: matching,
            cta: { text: 'View Products', path: `/product?category=${encodeURIComponent(matching[0].category || 'Pipes & Tubes (Seamless, ERW, Welded)')}` }
        };
    }

    // 11. Default friendly steel fallback
    return {
        text: 'I can assist you with Seamless & ERW Pipes, Industrial Plates (Boiler Quality, Hardox, Corten), High-Nickel Alloys (Inconel, Hastelloy, Monel), Butt-Weld Fittings, Flanges, and Mill Test Certificates (EN 10204 3.1 & 3.2). How can I assist your procurement team today?',
        products: allProducts.slice(0, 2),
        cta: { text: 'Explore All Metals', path: '/product' }
    };
};

const ProductItem = memo(({ product, onSelect }) => {
    const rawImg = resolveImagePath(product.image || product.images?.[0] || '/products/roxy/ss_pipe.jpg');
    const priceDisplay = product.priceFormatted || (product.price != null ? `₹${product.price}` : 'Factory Pricing');
    const handleClick = useCallback(() => onSelect(product), [onSelect, product]);

    return (
        <div
            onClick={handleClick}
            className="flex items-center gap-12 p-8 bordb cursor-pointer hover:bg-forth transition-all"
        >
            <div className="rounded-6 overflow-hidden flex-shrink-0 bg-forth border-ec" style={{ width: '56px', height: '56px' }}>
                <Image
                    src={rawImg}
                    alt={product.name}
                    className="w-full h-full object-contain p-2"
                />
            </div>
            <div className="flex-1 min-w-0">
                <h5 className="headmini-text font-600 text-dark line-clamp1 m-0">{product.name}</h5>
                <p className="mini-text text-gray font-500 m-0 mt-2">
                    Brand: <span className="font-600 text-dark">{product.brand || product.vendor?.split(' ')[0]}</span> • <span className="font-600 text-danger">{priceDisplay}</span>
                </p>
            </div>
        </div>
    );
});

ProductItem.displayName = 'ProductItem';

const ProductSearch = memo(({ searchQuery, onSearchChange, onSelect, onBack }) => {
    const products = useMemo(() => {
        const q = (searchQuery || '').trim().toLowerCase();
        const list = (productsData || []).filter((p) => !p.isBanner);
        const seen = new Set();
        const matched = [];
        for (const p of list) {
            const isMatch = !q ||
                p.name?.toLowerCase().includes(q) ||
                p.category?.toLowerCase().includes(q) ||
                p.subCategory?.toLowerCase().includes(q) ||
                p.vendor?.toLowerCase().includes(q) ||
                p.brand?.toLowerCase().includes(q);
            if (isMatch && !seen.has(p.name)) {
                seen.add(p.name);
                matched.push(p);
            }
        }
        return matched;
    }, [searchQuery]);

    return (
        <div className="flex flex-column h-full bg-white" data-no-cursor="true">
            <div className="p-12 bordb bg-white">
                <div className="relative flex items-center">
                    <Fields
                        type="input"
                        version="v0"
                        placeholder="Search pipes, plates, fittings, flanges, inconel, hardox..."
                        value={searchQuery}
                        onChange={onSearchChange}
                        icon="Search"
                        iconPosition="right"
                        className="w-full"
                    />
                    {searchQuery && (
                        <div className="absolute right-0 top-0 h-full flex items-center z-1 mx-3">
                            <Button
                                version="icon"
                                icon="Close"
                                iconWidth="13"
                                iconHeight="13"
                                iconStroke="var(--gray)"
                                bg="forth"
                                onClick={() => onSearchChange('')}
                                aria-label="Clear search"
                            />
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between mt-8">
                    <Button
                        text="Back to Chat"
                        icon="ChevronLeft"
                        version="none"
                        bg="transparent"
                        color="primary"
                        onClick={onBack}
                        className="font-500 w-max mini-text rounded-5 p-1"
                    />
                    <p className="mini-text text-gray font-500">
                        {products.length} {products.length === 1 ? 'Product' : 'Products'} Available
                    </p>
                </div>
            </div>

            <div className="overflow-auto p-8 flex-1 bg-white">
                {products.length > 0 ? (
                    products.map((p) => (
                        <ProductItem key={p.id} product={p} onSelect={onSelect} />
                    ))
                ) : (
                    <div className="p-24 text-center text-gray">
                        <Icon name="Search" width="28" height="28" stroke="var(--gray)" className="mx-auto mb-8 opacity-50" />
                        <p className="small-text font-500 text-dark m-0">No metal products found</p>
                        <p className="mini-text text-gray m-0 mt-4">Try searching for "Seamless Pipe", "Hardox", "Flange", "Fittings", or "Inconel"</p>
                    </div>
                )}
            </div>
        </div>
    );
});

ProductSearch.displayName = 'ProductSearch';

const ChatTeaser = memo(({ onOpen, onDismiss }) => {
    const handleDismissClick = useCallback((e) => {
        e.stopPropagation();
        onDismiss();
    }, [onDismiss]);

    return (
        <div
            onClick={onOpen}
            className="b-shadow p-10 rounded-5 cursor-pointer bg-white border-ec"
            style={{ width: '250px', maxWidth: 'calc(100vw - 48px)', animation: 'fadeInUp 0.3s ease-out' }}
            data-no-cursor="true"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-6 text-primary">
                    <Icon name="Shield" width="16" height="16" stroke="currentColor" />
                    <p className="small-text font-600 text-dark uppercase tracking-wider">ROXY METALS DESK</p>
                </div>
                <Button
                    version="icon"
                    icon="Close"
                    iconWidth="14"
                    iconHeight="14"
                    iconStroke="var(--dark)"
                    bg="forth"
                    aria-label="Dismiss teaser"
                    onClick={handleDismissClick}
                />
            </div>
            <p className="mini-text text-dark font-500 m-0 leading-tight">
                Hi! 👋 Need seamless pipes, boiler plates, nickel alloys, or mill certified fittings? Let's chat!
            </p>
        </div>
    );
});

ChatTeaser.displayName = 'ChatTeaser';

const ChatHeader = memo(({ onClose, activeMode, onToggleMode }) => (
    <div className="flex items-center justify-between p-14 bg-white bordb" data-no-cursor="true">
        <div className="flex items-center gap-10">
            <div className="icon-lg bg-primary relative rounded-30 flex items-center justify-center">
                <Icon name="Bot" width="20" height="20" stroke="var(--white)" strokeWidth="2" />
                <span className="absolute bg-success dot rounded-full bottom-0 right-0" />
            </div>
            <div>
                <h4 className="headmini-text font-600 text-dark m-0">
                    {activeMode === 'search' ? 'Metals & Steel Catalog' : 'Roxy Metal Desk'}
                </h4>
                <p className="mini-text font-400 text-success m-0 mt-1">● Roxy Enterprises Verified Live</p>
            </div>
        </div>

        <div className="flex items-center gap-6">
            <Button
                version="icon"
                icon={activeMode === 'search' ? 'Bot' : 'Search'}
                iconWidth="15"
                iconHeight="15"
                iconStroke={activeMode === 'search' ? 'var(--white)' : 'var(--dark)'}
                bg={activeMode === 'search' ? 'primary' : 'forth'}
                aria-label={activeMode === 'search' ? 'Switch to Chat' : 'Search Catalog'}
                title={activeMode === 'search' ? 'Switch to Chat' : 'Search Catalog'}
                onClick={onToggleMode}
                className="rounded-full"
            />
            <Button
                version="icon"
                icon="Close"
                iconWidth="15"
                iconHeight="15"
                iconStroke="var(--gray)"
                iconStrokeWidth="2"
                bg="forth"
                aria-label="Close Assistant"
                title="Close"
                onClick={onClose}
            />
        </div>
    </div>
));

ChatHeader.displayName = 'ChatHeader';

const ChatWelcome = memo(({ onActionClick }) => (
    <div className="h-350" data-no-cursor="true">
        <h2 className="title-text text-dark font-700 capitalize m-0">
            Roxy Metals Procurement Desk 👋<br />
            How can we <span className="text-primary">help you</span>?
        </h2>

        <p className="mini-text text-gray mt-6 m-0 leading-relaxed">
            Explore certified stainless steel pipes, industrial plates, nickel alloys, or request wholesale mill quotations.
        </p>

        <div className="grid-cols-2 gap-8 mt-12">
            {QUICK_ACTIONS.map((card) => (
                <div
                    key={card.id}
                    onClick={() => onActionClick(card)}
                    className="bg-white rounded-10 p-12 cursor-pointer hover:shadow-sm border-ec transition-shadow"
                >
                    <div
                        className="icon rounded-30 flex items-center justify-center"
                        style={{ backgroundColor: card.iconBg }}
                    >
                        <Icon name={card.icon} width="13" height="13" stroke="var(--white)" strokeWidth="2.2" />
                    </div>
                    <div className="mt-6">
                        <h5 className="headmini-text font-600 text-dark m-0">{card.title}</h5>
                        <p className="mini-text text-gray m-0 mt-2 line-clamp1">{card.subtitle}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
));

ChatWelcome.displayName = 'ChatWelcome';

const ChatMessages = memo(({ messages, isTyping, onReset, onCtaClick, onSelectProduct, messagesEndRef }) => (
    <div className="h-350" data-no-cursor="true">
        <Button
            text="Back to topics"
            icon="ChevronLeft"
            version="none"
            bg="transparent"
            color="primary"
            onClick={onReset}
            className="p-1 font-500 w-max mb-8"
        />

        {messages.map((msg, idx) => {
            const isUser = msg.sender === 'user';
            return (
                <div
                    key={idx}
                    className="flex flex-column"
                    style={{ alignItems: isUser ? 'flex-end' : 'flex-start', width: '100%' }}
                >
                    <div
                        className={`mini-text p-10 mb-8 ${isUser ? 'bg-primary text-white' : 'bg-white text-dark'}`}
                        style={{
                            maxWidth: '90%',
                            borderRadius: isUser ? '10px 10px 4px 10px' : '10px 10px 10px 4px',
                            border: isUser ? 'none' : '0.5px solid var(--tertiary)',
                            whiteSpace: 'pre-line'
                        }}
                    >
                        <p className="mini-text font-400 m-0">{msg.text}</p>
                        {msg.products && msg.products.length > 0 && (
                            <div className="mt-8 grid-cols-1 gap-6 w-full pt-6 bordt">
                                {msg.products.map((product) => (
                                    <ProductItem
                                        key={product.id}
                                        product={product}
                                        onSelect={onSelectProduct}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {msg.cta && (
                        <Button
                            text={msg.cta.text}
                            icon="ArrowRight"
                            iconPosition="right"
                            iconWidth="12"
                            iconHeight="12"
                            version="v0"
                            bg="dark"
                            color="white"
                            className="mt-4 mb-8"
                            onClick={() => onCtaClick(msg.cta.path)}
                        />
                    )}
                </div>
            );
        })}

        {isTyping && (
            <div
                className="bg-white rounded-16 p-10 flex items-center gap-4 b-shadow mb-8"
                style={{ width: 'fit-content', border: '1px solid #e2e8f0' }}
            >
                <span className="rounded-full bg-primary" style={{ width: '6px', height: '6px', animation: 'bounce 1s infinite' }} />
                <span className="rounded-full bg-primary" style={{ width: '6px', height: '6px', animation: 'bounce 1s infinite 0.2s' }} />
                <span className="rounded-full bg-primary" style={{ width: '6px', height: '6px', animation: 'bounce 1s infinite 0.4s' }} />
            </div>
        )}
        <div ref={messagesEndRef} />
    </div>
));

ChatMessages.displayName = 'ChatMessages';

const ChatInput = memo(({ inputValue, onChange, onSend }) => {
    const hasText = Boolean(inputValue?.trim());

    return (
        <div className="p-12 bg-white relative" data-no-cursor="true">
            <form onSubmit={onSend} className="relative flex items-center w-full">
                <Fields
                    type="input"
                    version="v2"
                    placeholder="Ask about first aid kits, drums, lights, quotes..."
                    value={inputValue}
                    onChange={onChange}
                    className="w-full"
                />
                <div className="absolute right-0 top-0 my-4 mx-2">
                    <Button
                        type="submit"
                        version="icon"
                        icon="Send"
                        iconWidth="18"
                        iconHeight="18"
                        iconStroke="var(--white)"
                        iconStrokeWidth="2"
                        bg={hasText ? 'primary' : 'gray'}
                        disabled={!hasText}
                        onClick={onSend}
                        aria-label="Send message"
                        title="Send"
                        className="rounded-30 p-6"
                    />
                </div>
            </form>
        </div>
    );
});

ChatInput.displayName = 'ChatInput';

const Chatbot = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [showTeaser, setShowTeaser] = useState(true);
    const [activeMode, setActiveMode] = useState('chat'); // 'chat' or 'search'
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        if (messages.length > 0) {
            scrollToBottom();
        }
    }, [messages, isTyping, scrollToBottom]);

    const handleOpen = useCallback(() => {
        setIsOpen(true);
        setShowTeaser(false);
    }, []);

    const handleClose = useCallback(() => setIsOpen(false), []);
    const handleDismissTeaser = useCallback(() => setShowTeaser(false), []);
    const handleReset = useCallback(() => setMessages([]), []);

    const handleCtaClick = useCallback((path) => {
        navigate(path);
        setIsOpen(false);
    }, [navigate]);

    const handleSelectProduct = useCallback((product) => {
        navigate(`/product/${product.id}`);
        setIsOpen(false);
    }, [navigate]);

    const handleActionClick = useCallback((action) => {
        setMessages((prev) => [...prev, { sender: 'user', text: action.title }]);
        setIsTyping(true);

        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { sender: 'bot', text: action.reply, cta: action.cta }
            ]);
            setIsTyping(false);
        }, 350);
    }, []);

    const handleChatInputChange = useCallback((val) => {
        setInputValue(val);
    }, []);

    const handleSend = useCallback((e) => {
        e?.preventDefault();
        const trimmed = inputValue.trim();
        if (!trimmed) return;

        setMessages((prev) => [...prev, { sender: 'user', text: trimmed }]);
        setInputValue('');
        setIsTyping(true);

        setTimeout(() => {
            const replyObj = generateBotReply(trimmed);
            setMessages((prev) => [
                ...prev,
                { sender: 'bot', text: replyObj.text, products: replyObj.products, cta: replyObj.cta }
            ]);
            setIsTyping(false);
        }, 400);
    }, [inputValue]);

    const handleToggleMode = useCallback(() => {
        setActiveMode((prev) => (prev === 'search' ? 'chat' : 'search'));
    }, []);

    const handleBackToChat = useCallback(() => {
        setActiveMode('chat');
        setInputValue('');
        setSearchQuery('');
    }, []);

    return (
        <>
            {!isOpen && (
                <div
                    style={{ position: 'fixed', bottom: '30px', right: '6px', zIndex: '88' }}
                    className="flex items-end justify-end gap-6"
                >
                    {showTeaser && (
                        <ChatTeaser
                            onOpen={handleOpen}
                            onDismiss={handleDismissTeaser}
                        />
                    )}

                    <Button
                        version="icon"
                        icon="Bot"
                        iconWidth="32"
                        iconHeight="32"
                        iconStroke="var(--white)"
                        iconStrokeWidth="2"
                        bg="primary"
                        aria-label="Open AI Assistant"
                        title="Open AI Assistant"
                        onClick={handleOpen}
                        className="rounded-30"
                    />
                </div>
            )}

            {isOpen && (
                <div
                    data-no-cursor="true"
                    style={{
                        position: 'fixed',
                        bottom: '10px',
                        right: '5px',
                        width: '360px',
                        height: '490px',
                        animation: 'fadeInUp 0.25s ease-out',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
                    }}
                    className="bg-white rounded-10 overflow-hidden z-999 flex flex-column"
                >
                    <ChatHeader
                        onClose={handleClose}
                        activeMode={activeMode}
                        onToggleMode={handleToggleMode}
                    />

                    {activeMode === 'search' ? (
                        <ProductSearch
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            onSelect={handleSelectProduct}
                            onBack={handleBackToChat}
                        />
                    ) : (
                        <>
                            <div className="overflow-auto p-16 bg-forth flex-1">
                                {messages.length === 0 ? (
                                    <ChatWelcome onActionClick={handleActionClick} />
                                ) : (
                                    <ChatMessages
                                        messages={messages}
                                        isTyping={isTyping}
                                        onReset={handleReset}
                                        onCtaClick={handleCtaClick}
                                        onSelectProduct={handleSelectProduct}
                                        messagesEndRef={messagesEndRef}
                                    />
                                )}
                            </div>

                            <ChatInput
                                inputValue={inputValue}
                                onChange={handleChatInputChange}
                                onSend={handleSend}
                            />
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default memo(Chatbot);
