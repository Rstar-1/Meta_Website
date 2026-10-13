import React, { useState, useRef, useEffect, useCallback, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../common/Button';
import Icon from '../common/Icon';
import Image from '../common/Image';
import Fields from '../forms/Fields';

import { productsData } from '../../utils/apiData';

const QUICK_ACTIONS = [
    {
        id: 'dilour',
        title: 'Dilour Carpets',
        subtitle: 'Automotive & Commercial',
        icon: 'Grid',
        iconBg: '#2563eb',
        reply: 'United Brothers manufactures premium needle-punch Dilour non-woven rolls in Ahmedabad:\n\n• **Acoustic Insulation**: Damps vehicle cabin and road drone by ~35%.\n• **5 Curated Shades**: Black, Grey, Beige, Brown, and Red.\n• **Automotive OEM Grade**: Easily cut, molded, and fitted around contours without edge fraying.',
        cta: { text: 'View Dilour Carpets', path: '/product?category=Dilour%20Carpets' }
    },
    {
        id: 'ribs',
        title: 'Ribs Carpets',
        subtitle: 'Anti-Slip Linear Grooves',
        icon: 'Reports',
        iconBg: '#059669',
        reply: 'Heavy-duty grooved Ribs Carpets engineered for traction and durability:\n\n• **Anti-Slip Linear Grooves**: Scrapes dirt, mud, and moisture.\n• **High-Traffic Corridors**: Perfect for commercial entrances, stairs, buses, and ramps.\n• **Rolls & Pre-cuts**: Available in Black, Grey, Brown, and Red.',
        cta: { text: 'View Ribs Carpets', path: '/product?category=Ribs%20Carpets' }
    },
    {
        id: 'rugs',
        title: 'Luxury Rugs',
        subtitle: '1800 GSM & Shalimar',
        icon: 'Sparkles',
        iconBg: '#dc2626',
        reply: 'Explore United Brothers designer rug collections:\n\n• **1800 GSM New Poly Shrink**: Ultra-dense 3D sculpted texture with integrated heavy self-backing (30 styles).\n• **Shalimar Woven Rugs**: Heritage Persian and modern geometric jacquard weaves.\n• **Stain & Water Resistant**: Made from premium color-fast polyester yarns.',
        cta: { text: 'Explore Rugs Collection', path: '/product?category=Rugs' }
    },
    {
        id: 'contact',
        title: 'Contact & Wholesale',
        subtitle: 'Ahmedabad Headquarters',
        icon: 'Support',
        iconBg: '#7c3aed',
        reply: `Get in touch with United Brothers directly:\n\n• **Phone / WhatsApp**: ${import.meta.env.VITE_PHONE || '+91 84548 38638'}\n• **Email**: ${import.meta.env.VITE_EMAIL || 'unitedbrothers879@gmail.com'}\n• **Location**: Vasna, Ahmedabad, Gujarat\n• **Direct Factory Supply**: Bulk master rolls and custom cuts shipped pan-India.`,
        cta: { text: 'Contact Us', path: '/connect' }
    }
];

const generateBotReply = (userText) => {
    const q = (userText || '').toLowerCase().trim();
    const allProducts = (productsData || []).filter((p) => !p.isBanner);

    // 1. Dilour / Automotive
    if (q.includes('dilour') || q.includes('automotive') || q.includes('car') || q.includes('boot') || q.includes('noise') || q.includes('acoustic') || q.includes('velour')) {
        const matching = allProducts.filter(p => p.category?.toLowerCase().includes('dilour') || p.name?.toLowerCase().includes('dilour')).slice(0, 3);
        return {
            text: 'United Brothers Dilour carpets are premium needle-punch non-woven rolls engineered for automotive interiors, trunk linings, and luxury flooring:\n\n• **Acoustic Insulation**: Reduces engine and road drone by ~35%.\n• **5 Rich Colors**: Black, Grey, Beige, Brown, and Red.\n• **Zero-Fray Cut**: Easy to trim and mold around vehicle footwells.',
            products: matching,
            cta: { text: 'View Dilour Carpets', path: '/product?category=Dilour%20Carpets' }
        };
    }

    // 2. Ribs / Anti-slip
    if (q.includes('rib') || q.includes('slip') || q.includes('corridor') || q.includes('groove') || q.includes('tread')) {
        const matching = allProducts.filter(p => p.category?.toLowerCase().includes('ribs') || p.name?.toLowerCase().includes('ribs')).slice(0, 3);
        return {
            text: 'Our Ribs Carpets feature heavy-duty parallel grooves designed for high-traction commercial and automotive environments:\n\n• **Anti-Slip Grip**: Scrapes soil and moisture effectively.\n• **Heavy Traffic Ready**: Withstands commercial foot traffic, ramps, and stairwells.\n• **Available in**: Black, Grey, Brown, and Red.',
            products: matching,
            cta: { text: 'View Ribs Carpets', path: '/product?category=Ribs%20Carpets' }
        };
    }

    // 3. Poly Shrink / 1800 GSM / 3D Rugs
    if (q.includes('poly') || q.includes('shrink') || q.includes('1800') || q.includes('gsm') || q.includes('3d') || q.includes('living room')) {
        const matching = allProducts.filter(p => p.subCategory?.toLowerCase().includes('poly') || p.name?.toLowerCase().includes('poly') || p.badge?.text?.includes('1800')).slice(0, 3);
        return {
            text: 'Our 1800 GSM New Poly Shrink Rugs represent the peak of modern dimensional weaving:\n\n• **High-Pile 3D Texture**: Multi-level relief creates sculpted visual depth.\n• **Integrated Self-Backing**: Heavy non-slip anchor eliminates corner curling.\n• **30 Exclusive Designs**: Available in standard living room sizes.',
            products: matching,
            cta: { text: 'Explore Poly Shrink Rugs', path: '/product?category=Rugs' }
        };
    }

    // 4. Shalimar / Persian / Traditional
    if (q.includes('shalimar') || q.includes('persian') || q.includes('traditional') || q.includes('oriental') || q.includes('heritage')) {
        const matching = allProducts.filter(p => p.subCategory?.toLowerCase().includes('shalimar') || p.name?.toLowerCase().includes('shalimar')).slice(0, 3);
        return {
            text: 'Shalimar Woven Rugs offer timeless Persian and transitional geometric artistry:\n\n• **Precision Jacquard**: Dense, color-fast lustrous polyester yarns.\n• **Easy Care**: Vacuum safe and stain-resistant.\n• **Over 30 Designs**: Sized from accent rugs to large hall centerpieces.',
            products: matching,
            cta: { text: 'Explore Shalimar Rugs', path: '/product?category=Rugs' }
        };
    }

    // 5. Price / Wholesale / Cost / Quote
    if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('wholesale') || q.includes('quote') || q.includes('bulk')) {
        const matching = allProducts.slice(0, 3);
        return {
            text: 'We offer factory-direct wholesale pricing from our Ahmedabad facility:\n\n• **Dilour & Ribs Rolls**: Starting from ₹145 - ₹175/sq.m (bulk discounts available).\n• **1800 GSM Rugs**: Wholesale rates based on dimensions and quantity.\n• **Pan-India Dispatch**: Prompt delivery for showrooms, trimmers, and dealers.',
            products: matching,
            cta: { text: 'Request Wholesale Quote', path: '/connect' }
        };
    }

    // 6. Contact / Phone / WhatsApp / Address / Location
    if (q.includes('contact') || q.includes('phone') || q.includes('call') || q.includes('whatsapp') || q.includes('mail') || q.includes('address') || q.includes('where') || q.includes('location') || q.includes('ahmedabad')) {
        return {
            text: `Here is our direct contact information:\n\n• **Phone / WhatsApp**: ${import.meta.env.VITE_PHONE || '+91 84548 38638'}\n• **Email**: ${import.meta.env.VITE_EMAIL || 'unitedbrothers879@gmail.com'}\n• **Office**: Vasna, Ahmedabad, Gujarat\n• **Timings**: Mon - Sat: 9:00 AM - 7:00 PM`,
            cta: { text: 'Get in Touch', path: '/connect' }
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
            text: `Here are matching carpet and rug collections for "${userText}":`,
            products: matching,
            cta: { text: 'View Products', path: `/product?category=${encodeURIComponent(matching[0].category || 'Dilour Carpets')}` }
        };
    }

    // 8. Default friendly fallback
    return {
        text: 'I can help you explore Dilour non-woven rolls, Ribs commercial carpets, 1800 GSM Poly Shrink rugs, or Shalimar woven rugs. You can also ask about wholesale rates, color swatches, or vehicle fitments!',
        products: allProducts.slice(0, 2),
        cta: { text: 'Explore All Collections', path: '/product' }
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
                    {activeMode === 'search' ? 'Carpet & Rug Search' : 'Flooring Assistant'}
                </h4>
                <p className="mini-text font-400 text-gray">Online • United Brothers Live</p>
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
                aria-label={activeMode === 'search' ? 'Switch to Chat' : 'Search Carpets'}
                title={activeMode === 'search' ? 'Switch to Chat' : 'Search Carpets'}
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
            Explore Dilour & Ribs rolls, 1800 GSM poly shrink rugs, or get a wholesale quote.
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
