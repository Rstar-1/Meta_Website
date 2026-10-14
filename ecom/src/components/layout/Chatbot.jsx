import React, { useState, useRef, useEffect, useCallback, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../common/Button';
import Icon from '../common/Icon';
import Image from '../common/Image';
import Fields from '../forms/Fields';

import { productsData } from '../../utils/apiData';

const QUICK_ACTIONS = [
    {
        id: 'pipes',
        title: 'Pipes & Tubes',
        subtitle: 'ASTM A312 / A213 / A269',
        icon: 'Grid',
        iconBg: '#2563eb',
        reply: 'Jubilant Metal And Alloys supplies high-grade Stainless Steel & Nickel Alloy Pipes & Tubes:\n\n• **Seamless & Welded**: 1/8" NB to 24" NB, Schedule 5S to XXS.\n• **Grades**: SS 304/304L, 316/316L, 904L, Duplex 2205, Inconel 625.\n• **Certification**: 100% PMI tested with EN 10204 3.1 Mill Test Certificates.',
        cta: { text: 'View Pipes & Tubes', path: '/product?category=Stainless%20Steel%20Pipes%20%26%20Tubes' }
    },
    {
        id: 'flanges',
        title: 'Flanges',
        subtitle: 'ASME B16.5 150# - 2500#',
        icon: 'Reports',
        iconBg: '#059669',
        reply: 'Heavy forged flanges engineered for high-pressure, critical pipelines:\n\n• **Types**: Slip On (SORF), Weld Neck (WNRF), Blind (BLRF), Socket Weld.\n• **Standards**: ASME / ANSI B16.5, B16.47 Series A & B, DIN, BS.\n• **Materials**: Forged ASTM A182 in 304/L, 316/L, Duplex, Super Duplex & Monel.',
        cta: { text: 'View Flanges', path: '/product?category=Stainless%20Steel%20Flanges' }
    },
    {
        id: 'fittings',
        title: 'Fittings & Fasteners',
        subtitle: 'Buttweld, Forged & Bolts',
        icon: 'Sparkles',
        iconBg: '#dc2626',
        reply: 'Comprehensive piping components and high-tensile hardware:\n\n• **Buttweld (ASME B16.9)**: 90°/45° Elbows, Equal & Reducing Tees, Reducers, Caps.\n• **Forged (ASME B16.11)**: 3000# / 6000# Socket Weld & Threaded fittings.\n• **Fasteners**: Heavy Hex Bolts, Studs, Nuts & Washers in A2-70, A4-80, B8/B8M.',
        cta: { text: 'Explore Pipe Fittings', path: '/product?category=Stainless%20Steel%20Pipe%20Fittings' }
    },
    {
        id: 'contact',
        title: 'RFQ & Inquiries',
        subtitle: 'Mumbai Stockyard',
        icon: 'Support',
        iconBg: '#7c3aed',
        reply: `Connect with Jubilant Metal And Alloys directly:\n\n• **Director & Sales**: ${import.meta.env.VITE_PHONE || '+91 9820171740'} / 022 6639 4511\n• **WhatsApp**: ${import.meta.env.VITE_WHATSAPP || '+91 9867611740'}\n• **Email**: ${import.meta.env.VITE_EMAIL || 'info@jubilantmetal.com'}\n• **Stockyard & Office**: Girgaon, Mumbai - 400004, Maharashtra\n• **Immediate Dispatch**: Fast domestic delivery & global exports to 80+ countries.`,
        cta: { text: 'Request a Quote', path: '/connect' }
    }
];

const generateBotReply = (userText) => {
    const q = (userText || '').toLowerCase().trim();
    const allProducts = (productsData || []).filter((p) => !p.isBanner);

    // 1. Pipes & Tubes
    if (q.includes('pipe') || q.includes('tube') || q.includes('tubing') || q.includes('seamless') || q.includes('welded') || q.includes('a312') || q.includes('a213')) {
        const matching = allProducts.filter(p => p.categoryId === 1 || p.category?.toLowerCase().includes('pipe')).slice(0, 3);
        return {
            text: 'Jubilant Metal carries extensive stock of ASTM A312 seamless and welded stainless steel pipes:\n\n• **Size Range**: 1/8" to 24" NB (custom mill runs up to 48").\n• **Wall Thickness**: Schedule 5S, 10S, 40S, 80S, 160, and XXS.\n• **Alloys**: SS 304/L, SS 316/L, SS 321, 904L, Duplex 2205, and Inconel 625.',
            products: matching,
            cta: { text: 'View Pipes & Tubes', path: '/product?category=Stainless%20Steel%20Pipes%20%26%20Tubes' }
        };
    }

    // 2. Flanges
    if (q.includes('flange') || q.includes('sorf') || q.includes('wnrf') || q.includes('blind') || q.includes('b16.5') || q.includes('slip on') || q.includes('weld neck')) {
        const matching = allProducts.filter(p => p.categoryId === 2 || p.category?.toLowerCase().includes('flange')).slice(0, 3);
        return {
            text: 'Our forged stainless steel flanges are precision-machined to ASME / ANSI B16.5 standards:\n\n• **Pressure Classes**: 150#, 300#, 600#, 900#, 1500#, and 2500#.\n• **Face Types**: Raised Face (RF), Flat Face (FF), Ring Type Joint (RTJ).\n• **100% Traceability**: MTC EN 10204 3.1 with chemical & mechanical test results.',
            products: matching,
            cta: { text: 'View Flanges', path: '/product?category=Stainless%20Steel%20Flanges' }
        };
    }

    // 3. Pipe Fittings
    if (q.includes('fitting') || q.includes('elbow') || q.includes('tee') || q.includes('reducer') || q.includes('cap') || q.includes('buttweld') || q.includes('b16.9')) {
        const matching = allProducts.filter(p => p.categoryId === 3 || p.category?.toLowerCase().includes('fitting')).slice(0, 3);
        return {
            text: 'Our ASME B16.9 buttweld pipe fittings are engineered for smooth flow and leak-tight welds:\n\n• **Configurations**: 90° & 45° Long Radius Elbows, Concentric/Eccentric Reducers, Equal Tees.\n• **Wall Thickness**: Seamless Schedule 10S to XXS.\n• **Applications**: Refineries, power plants, chemical reactors, and naval EPC projects.',
            products: matching,
            cta: { text: 'View Pipe Fittings', path: '/product?category=Stainless%20Steel%20Pipe%20Fittings' }
        };
    }

    // 4. Fasteners
    if (q.includes('fastener') || q.includes('bolt') || q.includes('nut') || q.includes('screw') || q.includes('stud') || q.includes('washer') || q.includes('din')) {
        const matching = allProducts.filter(p => p.categoryId === 4 || p.category?.toLowerCase().includes('fastener')).slice(0, 3);
        return {
            text: 'We stock high-tensile stainless steel fasteners to DIN, ISO, and ASTM specifications:\n\n• **Products**: Hex Head Bolts (DIN 933), Heavy Hex Nuts (DIN 934), Full Thread Studs (DIN 975).\n• **Grades**: A2-70 (304), A4-80 (316), B8 Class 1/2, B8M, Duplex, Monel.\n• **Zero Corrosion**: Highly resistant to marine, atmospheric, and chemical exposure.',
            products: matching,
            cta: { text: 'Explore Fasteners', path: '/product?category=Stainless%20Steel%20Fasteners' }
        };
    }

    // 5. Price / Wholesale / Cost / RFQ / Quote
    if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('wholesale') || q.includes('quote') || q.includes('rfq') || q.includes('discount')) {
        const matching = allProducts.slice(0, 3);
        return {
            text: 'We offer competitive mill-direct prices with immediate dispatch from our Mumbai stockyard:\n\n• **Discounts**: Volume discounts on full container / truckload mill orders.\n• **Payment Terms**: Flexible L/C, TT, and advance terms for verified corporate buyers.\n• **Fast Turnaround**: Quotations delivered within 30 minutes with material test records.',
            products: matching,
            cta: { text: 'Request RFQ / Pricing', path: '/connect' }
        };
    }

    // 6. Contact / Phone / WhatsApp / Address / Location
    if (q.includes('contact') || q.includes('phone') || q.includes('call') || q.includes('whatsapp') || q.includes('mail') || q.includes('address') || q.includes('where') || q.includes('location') || q.includes('mumbai')) {
        return {
            text: `Contact Jubilant Metal And Alloys:\n\n• **Director & Sales**: ${import.meta.env.VITE_PHONE || '+91 9820171740'} / 022 6639 4511\n• **WhatsApp**: ${import.meta.env.VITE_WHATSAPP || '+91 9867611740'}\n• **Email**: ${import.meta.env.VITE_EMAIL || 'info@jubilantmetal.com'}\n• **Office**: Shop No 6, A Wing, 1st Floor, Nakoda Mehta Sunshine Heights, Khadilkar Road, Sadashiv Lane, Kakadwadi, Girgaon, Mumbai - 400004\n• **Hours**: Mon - Sat: 9:30 AM - 7:00 PM`,
            cta: { text: 'Connect With Us', path: '/connect' }
        };
    }

    // 7. General search fallback with matching products
    const matching = allProducts.filter(p =>
        p.name?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.subCategory?.toLowerCase().includes(q)
    ).slice(0, 3);

    if (matching.length > 0) {
        return {
            text: `Here are matching stainless steel and alloy products for "${userText}":`,
            products: matching,
            cta: { text: 'View Products', path: `/product?category=${encodeURIComponent(matching[0].category || 'Stainless Steel Pipes & Tubes')}` }
        };
    }

    // 8. Default friendly fallback
    return {
        text: 'I can assist you with Stainless Steel Pipes & Tubes, Forged Flanges, Buttweld Pipe Fittings, Forged Fittings, Fasteners, Round Bars, or custom raw material specifications. You can also request an instant RFQ or technical MTC datasheet!',
        products: allProducts.slice(0, 2),
        cta: { text: 'Explore All Products', path: '/product' }
    };
};

const ProductItem = memo(({ product, onSelect }) => {
    const rawImg = product.image || product.images?.[0] || '/products/dilour_black.jpg';
    const priceDisplay = product.priceFormatted || (product.price != null ? `₹${product.price}/sq.m` : '₹150/sq.m');
    const handleClick = useCallback(() => onSelect(product), [onSelect, product]);

    return (
        <div
            onClick={handleClick}
            className="flex items-center gap-12 p-8 bordb cursor-pointer hover:bg-forth transition-all"
        >
            <div className="rounded-6 overflow-hidden flex-shrink-0 bg-forth" style={{ width: '60px', height: '48px' }}>
                <Image
                    src={rawImg}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex-1 min-w-0">
                <h5 className="headmini-text font-600 text-dark line-clamp1 m-0">{product.name}</h5>
                <p className="mini-text text-gray font-500 m-0 mt-2">
                    Price: <span className="font-600 text-danger">{priceDisplay}</span>
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
                p.vendor?.toLowerCase().includes(q);
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
                        placeholder="Search carpets, rugs, dilour, ribs..."
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
                        {products.length} {products.length === 1 ? 'Product' : 'Products'} Found
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
                        <p className="small-text font-500 text-dark m-0">No carpets found</p>
                        <p className="mini-text text-gray m-0 mt-4">Try searching for "Dilour", "Ribs", "Poly Shrink", or "Shalimar"</p>
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
            className="b-shadow p-10 rounded-5 cursor-pointer bg-white"
            style={{ width: '240px', maxWidth: 'calc(100vw - 48px)', animation: 'fadeInUp 0.3s ease-out' }}
            data-no-cursor="true"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-6 text-primary">
                    <Icon name="Sparkles" width="18" height="18" stroke="currentColor" />
                    <p className="small-text font-500 text-dark uppercase tracking-wider">ASSISTANT</p>
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
            <p className="mini-text text-dark font-500 m-0">
                Hi! 👋 Looking for Dilour carpets, Ribs, or luxury rugs? Let's chat!
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
                <h4 className="headmini-text font-600 text-dark">
                    {activeMode === 'search' ? 'Alloy & Product Search' : 'Metal & Alloys Assistant'}
                </h4>
                <p className="mini-text font-400 text-gray">Online • Jubilant Metal Live</p>
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
                aria-label={activeMode === 'search' ? 'Switch to Chat' : 'Search Products'}
                title={activeMode === 'search' ? 'Switch to Chat' : 'Search Products'}
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
            Hey there 👋<br />
            How can we <span className="text-primary">help</span>?
        </h2>

        <p className="mini-text text-gray mt-6 m-0">
            Explore SS pipes & tubes, forged flanges, buttweld fittings, fasteners, or request an RFQ.
        </p>

        <div className="grid-cols-2 gap-8 mt-12">
            {QUICK_ACTIONS.map((card) => (
                <div
                    key={card.id}
                    onClick={() => onActionClick(card)}
                    className="bg-white rounded-10 p-15 cursor-pointer hover:shadow-sm transition-shadow"
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
                    placeholder="Ask about Dilour, Ribs, Rugs, or price..."
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
