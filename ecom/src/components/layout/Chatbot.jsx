import React, { useState, useRef, useEffect, useCallback, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../common/Button';
import Icon from '../common/Icon';
import Image from '../common/Image';
import Fields from '../forms/Fields';

import { productsData } from '../../utils/apiData';

const QUICK_ACTIONS = [
    {
        id: 'mens-rainwear',
        title: "Men's Rain Suits",
        subtitle: 'Heavy-Duty & Biker Suits',
        icon: 'ShieldCheck',
        iconBg: '#2563eb',
        reply: 'Real Rainwear crafts high-performance waterproof rain suits for men and daily commuters:\n\n• **Double Layer Protection**: Heavy PVC & Polyester with 100% heat-sealed taped seams.\n• **Biker Storm Flaps**: Dual zipper flap, reflective safety piping, and elastic wrist cuffs.\n• **Top Series**: TREX, RIDER, LEXUS, and FORCE rain suits.',
        cta: { text: "View Men's Rainwear", path: "/product?category=Men's%20Rainwear" }
    },
    {
        id: 'womens-rainwear',
        title: "Women's Rainwear",
        subtitle: 'Trench Coats & Skirt Suits',
        icon: 'Heart',
        iconBg: '#db2777',
        reply: "Explore Real Rainwear's fashionable, durable rainwear collection for women:\n\n• **All-Weather Trench Coats**: Elegant belted coats, skirt rain suits, and hooded ponchos.\n• **Lightweight & Breathable**: Easy to fold, odorless, and ultra-durable.\n• **Vibrant Hues**: From classic monsoon tones to radiant pastel shades.",
        cta: { text: "View Women's Rainwear", path: "/product?category=Women's%20Rainwear" }
    },
    {
        id: 'kids-rainwear',
        title: "Kids Raincoats",
        subtitle: 'Boys, Girls & School Bags',
        icon: 'Award',
        iconBg: '#d97706',
        reply: "Keep children completely dry and cheerful with Real Rainwear's kids collection:\n\n• **Backpack Expansion**: Special expandable back pleat comfortably shields school bags.\n• **Reflective Safety**: High-visibility trims for gloomy rainy days.\n• **Fun & Colorful**: Bright prints that boys and girls love to wear.",
        cta: { text: "View Kids Rainwear", path: "/product?category=Kids'%20Rainwear" }
    },
    {
        id: 'contact',
        title: 'Contact & Wholesale',
        subtitle: 'Mumbai Manufacturing Hub',
        icon: 'Support',
        iconBg: '#7c3aed',
        reply: `Get in touch with Real Rainwear directly for retail and bulk distribution:\n\n• **Phone / WhatsApp**: ${import.meta.env.VITE_PHONE || '+91 8104013898'}\n• **Email**: ${import.meta.env.VITE_EMAIL || 'info@realrainwear.in'}\n• **Location**: 3, 222, Durya Mansion, Kambekar Street, Masjid, Mandvi, Mumbai - 400003\n• **Pan-India Dispatch**: Direct manufacturer supply with custom branding available.`,
        cta: { text: 'Contact Us', path: '/connect' }
    }
];

const generateBotReply = (userText) => {
    const q = (userText || '').toLowerCase().trim();
    const allProducts = (productsData || []).filter((p) => !p.isBanner);

    // 1. Men's Rainwear / Rainsuit / Biker / Storm
    if (q.includes('men') || q.includes('rainsuit') || q.includes('biker') || q.includes('rider') || q.includes('trex') || q.includes('storm') || q.includes('suit') || q.includes('heavy')) {
        const matching = allProducts.filter(p => p.category?.toLowerCase().includes('men') || p.name?.toLowerCase().includes('rainsuit') || p.name?.toLowerCase().includes('trex') || p.name?.toLowerCase().includes('rider')).slice(0, 3);
        return {
            text: 'Real Rainwear men\'s rain suits are engineered for extreme downpours and high-speed two-wheeler riding:\n\n• **100% Sealed Taped Seams**: No needle hole leaks.\n• **Double Storm Flap**: Blocks wind-driven water from penetrating the zipper.\n• **Attached Hood with Drawstring**: Ergonomic fit under or over bike helmets.',
            products: matching,
            cta: { text: "View Men's Rainwear", path: "/product?category=Men's%20Rainwear" }
        };
    }

    // 2. Women's Rainwear / Trench / Skirt / Poncho / Ladies
    if (q.includes('women') || q.includes('lady') || q.includes('ladies') || q.includes('girl') || q.includes('trench') || q.includes('skirt') || q.includes('poncho')) {
        const matching = allProducts.filter(p => p.category?.toLowerCase().includes('women') || p.name?.toLowerCase().includes('women') || p.type?.toLowerCase().includes('poncho')).slice(0, 3);
        return {
            text: 'Our Women\'s Rainwear collection combines elegance with relentless waterproof performance:\n\n• **Tailored Trench Raincoats**: Belted waist, lightweight and breathable.\n• **Skirt Suits & Ponchos**: Complete protection over formal and ethnic wear.\n• **Available Colors**: Chic navy, maroon, pink, green, and vibrant yellow.',
            products: matching,
            cta: { text: "View Women's Rainwear", path: "/product?category=Women's%20Rainwear" }
        };
    }

    // 3. Kids / School / Children
    if (q.includes('kid') || q.includes('child') || q.includes('school') || q.includes('boy') || q.includes('baby') || q.includes('bag cover')) {
        const matching = allProducts.filter(p => p.category?.toLowerCase().includes('kid') || p.name?.toLowerCase().includes('kid') || p.name?.toLowerCase().includes('boy') || p.name?.toLowerCase().includes('girl')).slice(0, 3);
        return {
            text: 'Real Rainwear Kids collection is made with food-grade, odor-free waterproof fabrics:\n\n• **School Bag Expansion**: Accommodates bulky backpacks under the coat.\n• **Reflective Safety Piping**: Enhanced visibility for road safety.\n• **Soft & Non-Irritating**: Comfortable on sensitive skin.',
            products: matching,
            cta: { text: "Explore Kids Rainwear", path: "/product?category=Kids'%20Rainwear" }
        };
    }

    // 4. Quality / Waterproof / Material / Seams
    if (q.includes('quality') || q.includes('waterproof') || q.includes('leak') || q.includes('fabric') || q.includes('material') || q.includes('pvc') || q.includes('seam')) {
        const matching = allProducts.slice(0, 3);
        return {
            text: 'Real Rainwear quality engineering since 1979:\n\n• **10,000mm+ Hydrostatic Head**: Laboratory tested against intense water columns.\n• **Hot Air Taped Seams**: Every stitch line is sealed with thermo-polyurethane tape.\n• **Durable Hardware**: Rust-proof heavy brass/nylon zippers and snap buttons.',
            products: matching,
            cta: { text: 'View All Products', path: '/product' }
        };
    }

    // 5. Price / Wholesale / Cost / Quote / Dealership
    if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('wholesale') || q.includes('quote') || q.includes('bulk') || q.includes('distributor') || q.includes('dealer')) {
        const matching = allProducts.slice(0, 3);
        return {
            text: 'We provide direct factory pricing from our Mumbai manufacturing and export division:\n\n• **Wholesale & Dealership Rates**: Tiered discounts for retail shops, distributors, and institutional buyers.\n• **Custom Logo Branding**: Available for corporate gifting and delivery fleets.\n• **Prompt Pan-India Logistics**: Fast road and train cargo dispatch.',
            products: matching,
            cta: { text: 'Request Wholesale Quote', path: '/connect' }
        };
    }

    // 6. Contact / Address / Location / Phone / Hours / Showroom
    if (q.includes('contact') || q.includes('phone') || q.includes('call') || q.includes('whatsapp') || q.includes('mail') || q.includes('address') || q.includes('where') || q.includes('location') || q.includes('mumbai') || q.includes('mandvi')) {
        return {
            text: `Here is Real Rainwear direct contact information:\n\n• **Phone / WhatsApp**: ${import.meta.env.VITE_PHONE || '+91 8104013898'}\n• **Email**: ${import.meta.env.VITE_EMAIL || 'info@realrainwear.in'}\n• **Showroom**: 3, 222, Durya Mansion, Kambekar Street, Masjid, Mandvi, Mumbai - 400003, Maharashtra\n• **Timings**: Mon - Sat: 11:00 AM - 9:00 PM (Sunday Closed)`,
            cta: { text: 'View Contact Page', path: '/connect' }
        };
    }

    // 7. General search fallback
    const matching = allProducts.filter(p =>
        p.name?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.subCategory?.toLowerCase().includes(q) ||
        p.type?.toLowerCase().includes(q)
    ).slice(0, 3);

    if (matching.length > 0) {
        return {
            text: `Here are matching rainwear collections for "${userText}":`,
            products: matching,
            cta: { text: 'View Products', path: `/product?category=${encodeURIComponent(matching[0].category || "Men's Rainwear")}` }
        };
    }

    // Default Fallback
    return {
        text: 'I can help you explore Men\'s Rainsuits, Women\'s Raincoats, Kids\' school rainwear, or Trekking Ponchos. You can also ask about waterproof ratings, sizing, or wholesale quotes!',
        cta: { text: 'Browse Catalog', path: '/product' }
    };
};

const ProductCard = memo(({ product, onSelect }) => {
    const rawImg = product.image || product.images?.[0] || 'https://realrainwear.in/wp-content/uploads/2023/06/men-01.png';
    const isLocal = rawImg.startsWith('/');
    const imgSrc = isLocal ? rawImg : rawImg;

    return (
        <div
            className="rounded-8 p-8 flex items-center gap-8 cursor-pointer hover:bg-slate-50 transition-colors border border-slate-100"
            onClick={() => onSelect(product)}
            style={{ minWidth: 0 }}
        >
            <div className="w-48 h-48 rounded-6 overflow-hidden flex-shrink-0 bg-slate-100">
                <Image
                    src={imgSrc}
                    alt={product.name || 'Rainwear'}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex-1 overflow-hidden" style={{ minWidth: 0 }}>
                <p className="mini-text font-600 text-dark truncate m-0">{product.name}</p>
                <p className="mini-text text-gray truncate m-0 mt-2">{product.category}</p>
                <div className="flex items-center gap-6 mt-2">
                    <span className="mini-text font-700 text-primary">₹{product.price}</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                        <span className="mini-text text-gray line-through">₹{product.originalPrice}</span>
                    )}
                </div>
            </div>
            <Icon name="ChevronRight" width="14" height="14" className="text-gray flex-shrink-0" />
        </div>
    );
});
ProductCard.displayName = 'ProductCard';

const ChatMessage = memo(({ msg, onSelectProduct, onCtaClick }) => {
    const isBot = msg.sender === 'bot';

    const renderText = (txt) => {
        if (!txt) return null;
        const parts = txt.split(/(\*{2}.*?\*{2})/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i}>{part.slice(2, -2)}</strong>;
            }
            const lines = part.split('\n');
            return lines.map((line, j) => (
                <React.Fragment key={`${i}-${j}`}>
                    {line}
                    {j < lines.length - 1 && <br />}
                </React.Fragment>
            ));
        });
    };

    return (
        <div className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} mb-12`}>
            <div
                className={`max-w-85 rounded-12 p-10 small-text leading-relaxed ${
                    isBot
                        ? 'bg-slate-100 text-dark rounded-tl-2'
                        : 'bg-primary text-white rounded-tr-2'
                }`}
            >
                {renderText(msg.text)}

                {msg.products && msg.products.length > 0 && (
                    <div className="mt-8 flex flex-col gap-6">
                        {msg.products.map((p) => (
                            <ProductCard key={p.id} product={p} onSelect={onSelectProduct} />
                        ))}
                    </div>
                )}

                {msg.cta && (
                    <div className="mt-8 pt-6 border-t border-slate-200">
                        <button
                            type="button"
                            onClick={() => onCtaClick(msg.cta.path)}
                            className="mini-text font-600 text-primary hover:underline flex items-center gap-4 bg-transparent border-0 p-0 cursor-pointer"
                        >
                            {msg.cta.text}
                            <Icon name="ArrowRight" width="12" height="12" />
                        </button>
                    </div>
                )}
            </div>
            <span className="mini-text text-gray mt-4 px-4">{msg.time}</span>
        </div>
    );
});
ChatMessage.displayName = 'ChatMessage';

const SearchResultItem = memo(({ product, onSelect }) => {
    const rawImg = product.image || product.images?.[0] || 'https://realrainwear.in/wp-content/uploads/2023/06/men-01.png';
    const isLocal = rawImg.startsWith('/');
    const imgSrc = isLocal ? rawImg : rawImg;

    return (
        <div
            className="p-10 flex items-center gap-10 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-b-0 transition-colors"
            onClick={() => onSelect(product)}
        >
            <div className="w-44 h-44 rounded-6 overflow-hidden flex-shrink-0 bg-slate-100">
                <Image
                    src={imgSrc}
                    alt={product.name || 'Rainwear'}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex-1 overflow-hidden" style={{ minWidth: 0 }}>
                <p className="small-text font-600 text-dark truncate m-0">{product.name}</p>
                <p className="mini-text text-gray truncate m-0 mt-2">{product.category} • {product.subCategory || product.type}</p>
                <div className="flex items-center gap-6 mt-2">
                    <span className="small-text font-700 text-primary">₹{product.price}</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                        <span className="mini-text text-gray line-through">₹{product.originalPrice}</span>
                    )}
                </div>
            </div>
            <Icon name="ChevronRight" width="14" height="14" className="text-gray flex-shrink-0" />
        </div>
    );
});
SearchResultItem.displayName = 'SearchResultItem';

const SearchPanel = memo(({ onSelectProduct }) => {
    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const allProducts = useMemo(() => {
        return (productsData || []).filter((p) => !p.isBanner);
    }, []);

    const categoryList = useMemo(() => {
        const cats = new Set();
        allProducts.forEach(p => {
            if (p.category) cats.add(p.category);
        });
        return ['all', ...Array.from(cats)];
    }, [allProducts]);

    const filtered = useMemo(() => {
        let list = allProducts;
        if (selectedCategory !== 'all') {
            list = list.filter(p => p.category === selectedCategory);
        }
        if (query.trim()) {
            const q = query.toLowerCase().trim();
            list = list.filter(p =>
                p.name?.toLowerCase().includes(q) ||
                p.category?.toLowerCase().includes(q) ||
                p.subCategory?.toLowerCase().includes(q) ||
                p.type?.toLowerCase().includes(q) ||
                p.description?.toLowerCase().includes(q)
            );
        }
        return list;
    }, [allProducts, selectedCategory, query]);

    return (
        <div className="flex flex-col h-full">
            <div className="p-12 border-b border-slate-200">
                <Fields
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search rainsuits, raincoats, ponchos, kids..."
                    className="w-full"
                    autoFocus
                />

                <div className="flex items-center gap-6 overflow-x-auto mt-8 pb-4" style={{ scrollbarWidth: 'none' }}>
                    {categoryList.map(cat => (
                        <button
                            key={cat}
                            type="button"
                            onClick={() => setSelectedCategory(cat)}
                            className={`mini-text px-10 py-4 rounded-12 whitespace-nowrap border-0 cursor-pointer transition-colors ${
                                selectedCategory === cat
                                    ? 'bg-primary text-white font-600'
                                    : 'bg-slate-100 text-gray hover:bg-slate-200'
                            }`}
                        >
                            {cat === 'all' ? 'All Rainwear' : cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4" style={{ maxHeight: '340px' }}>
                {filtered.length > 0 ? (
                    filtered.map(p => (
                        <SearchResultItem key={p.id} product={p} onSelect={onSelectProduct} />
                    ))
                ) : (
                    <div className="p-24 text-center">
                        <Icon name="Search" width="32" height="32" className="text-gray mb-8 mx-auto" />
                        <p className="small-text font-500 text-dark m-0">No rainwear found</p>
                        <p className="mini-text text-gray m-0 mt-4">Try searching for "TREX", "RIDER", "Poncho", or "Kids"</p>
                    </div>
                )}
            </div>
        </div>
    );
});
SearchPanel.displayName = 'SearchPanel';

const Chatbot = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [activeMode, setActiveMode] = useState('chat');
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'bot',
            text: 'Hello! 👋 Welcome to **Real Rainwear** (Since 1979).\n\nHow can we help keep you dry today? Explore our heavy-duty rain suits, ladies trench coats, kids collection, or ask for wholesale info!',
            time: 'Just now'
        }
    ]);
    const [unreadCount, setUnreadCount] = useState(1);
    const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
    const [showBubble, setShowBubble] = useState(true);

    const messagesEndRef = useRef(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        if (isOpen && activeMode === 'chat') {
            scrollToBottom();
        }
    }, [messages, isOpen, activeMode, scrollToBottom]);

    const handleOpen = useCallback(() => {
        setIsOpen(true);
        setUnreadCount(0);
        setShowBubble(false);
        setHasOpenedOnce(true);
    }, []);

    const handleClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const handleToggle = useCallback(() => {
        if (isOpen) {
            handleClose();
        } else {
            handleOpen();
        }
    }, [isOpen, handleClose, handleOpen]);

    const handleDismissBubble = useCallback((e) => {
        e.stopPropagation();
        setShowBubble(false);
    }, []);

    const handleSelectProduct = useCallback((product) => {
        if (!product) return;
        setIsOpen(false);
        const targetPath = product.id ? `/product-detail?id=${product.id}` : '/product';
        navigate(targetPath);
    }, [navigate]);

    const handleCtaClick = useCallback((path) => {
        if (!path) return;
        setIsOpen(false);
        navigate(path);
    }, [navigate]);

    const handleSendText = useCallback((textToSend) => {
        const text = (textToSend || inputText).trim();
        if (!text) return;

        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const userMsg = {
            id: Date.now(),
            sender: 'user',
            text,
            time: timeStr
        };

        setMessages((prev) => [...prev, userMsg]);
        setInputText('');

        setTimeout(() => {
            const reply = generateBotReply(text);
            const botMsg = {
                id: Date.now() + 1,
                sender: 'bot',
                text: reply.text,
                products: reply.products,
                cta: reply.cta,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages((prev) => [...prev, botMsg]);
        }, 400);
    }, [inputText]);

    const handleQuickAction = useCallback((action) => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const userMsg = {
            id: Date.now(),
            sender: 'user',
            text: action.title,
            time: timeStr
        };

        const botMsg = {
            id: Date.now() + 1,
            sender: 'bot',
            text: action.reply,
            cta: action.cta,
            time: timeStr
        };

        setMessages((prev) => [...prev, userMsg, botMsg]);
    }, []);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendText();
        }
    }, [handleSendText]);

    return (
        <aside
            aria-label="Real Rainwear Assistant"
            className="fixed bottom-24 right-24 z-999 flex flex-col items-end"
            style={{ pointerEvents: 'none' }}
        >
            {!hasOpenedOnce && showBubble && !isOpen && (
                <div
                    onClick={handleOpen}
                    className="relative mb-12 bg-white rounded-16 p-12 pr-28 shadow-lg border border-slate-100 flex items-center gap-10 cursor-pointer animate-bounce-subtle"
                    style={{ pointerEvents: 'auto', maxWidth: '280px' }}
                >
                    <div className="w-36 h-36 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0">
                        <Icon name="Support" width="18" height="18" />
                    </div>
                    <div>
                        <p className="mini-text font-700 text-dark m-0">Real Rainwear</p>
                        <p className="mini-text text-gray m-0 mt-2">
                            Hi! 👋 Looking for raincoats, biker rain suits, or kids rainwear? Let's chat!
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={handleDismissBubble}
                        aria-label="Dismiss chat prompt"
                        className="absolute top-6 right-6 text-gray hover:text-dark border-0 bg-transparent p-2 cursor-pointer"
                    >
                        <Icon name="Close" width="12" height="12" />
                    </button>
                </div>
            )}

            {isOpen && (
                <div
                    className="bg-white rounded-16 shadow-2xl border border-slate-200 overflow-hidden flex flex-col mb-12 animate-fade-in"
                    style={{
                        pointerEvents: 'auto',
                        width: 'min(380px, calc(100vw - 32px))',
                        height: 'min(580px, calc(100vh - 120px))'
                    }}
                >
                    <div className="bg-white border-b border-slate-200 p-12 px-16 flex items-center justify-between">
                        <div className="flex items-center gap-10">
                            <div className="w-38 h-38 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0">
                                <Icon name="Support" width="20" height="20" />
                            </div>
                            <div>
                                <h3 className="small-text font-700 text-dark m-0">
                                    {activeMode === 'search' ? 'Rainwear Search' : 'Rainwear Assistant'}
                                </h3>
                                <p className="mini-text font-400 text-gray m-0">
                                    Online • Real Rainwear Live
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                onClick={() => setActiveMode(prev => prev === 'chat' ? 'search' : 'chat')}
                                className={`w-32 h-32 rounded-8 flex items-center justify-center border-0 cursor-pointer transition-colors ${
                                    activeMode === 'search'
                                        ? 'bg-primary text-white'
                                        : 'bg-slate-100 text-gray hover:text-dark hover:bg-slate-200'
                                }`}
                                aria-label={activeMode === 'search' ? 'Switch to Chat' : 'Search Rainwear'}
                                title={activeMode === 'search' ? 'Switch to Chat' : 'Search Rainwear'}
                            >
                                <Icon name={activeMode === 'search' ? 'CMS' : 'Search'} width="16" height="16" />
                            </button>

                            <button
                                type="button"
                                onClick={handleClose}
                                className="w-32 h-32 rounded-8 bg-slate-100 flex items-center justify-center text-gray hover:text-dark hover:bg-slate-200 border-0 cursor-pointer transition-colors"
                                aria-label="Close Chat"
                            >
                                <Icon name="Close" width="16" height="16" />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-hidden flex flex-col bg-slate-50">
                        {activeMode === 'search' ? (
                            <SearchPanel onSelectProduct={handleSelectProduct} />
                        ) : (
                            <>
                                <div className="flex-1 overflow-y-auto p-12 px-16" style={{ scrollbarWidth: 'thin' }}>
                                    {messages.map((msg) => (
                                        <ChatMessage
                                            key={msg.id}
                                            msg={msg}
                                            onSelectProduct={handleSelectProduct}
                                            onCtaClick={handleCtaClick}
                                        />
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>

                                <div className="p-8 px-12 bg-white border-t border-slate-200">
                                    <p className="mini-text text-gray m-0 mb-6 font-500">Quick Topics:</p>
                                    <div className="flex items-center gap-6 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
                                        {QUICK_ACTIONS.map((action) => (
                                            <button
                                                key={action.id}
                                                type="button"
                                                onClick={() => handleQuickAction(action)}
                                                className="mini-text font-600 px-10 py-5 rounded-12 bg-slate-100 hover:bg-slate-200 text-dark whitespace-nowrap border-0 cursor-pointer flex items-center gap-4 transition-colors"
                                            >
                                                <span
                                                    className="w-6 h-6 rounded-full inline-block"
                                                    style={{ backgroundColor: action.iconBg }}
                                                />
                                                {action.title}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-10 px-12 bg-white border-t border-slate-200 flex items-center gap-8">
                                    <input
                                        type="text"
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Ask about rainsuits, sizes, waterproof rating, or wholesale..."
                                        className="flex-1 px-12 py-8 rounded-8 bg-slate-100 border border-transparent focus:border-primary focus:bg-white focus:outline-none small-text text-dark"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleSendText()}
                                        disabled={!inputText.trim()}
                                        className="w-36 h-36 rounded-8 bg-primary disabled:opacity-40 text-white flex items-center justify-center border-0 cursor-pointer flex-shrink-0 transition-opacity"
                                        aria-label="Send message"
                                    >
                                        <Icon name="Send" width="16" height="16" />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            <button
                type="button"
                onClick={handleToggle}
                className="relative w-56 h-56 rounded-full bg-primary hover:bg-primary-dark text-white flex items-center justify-center shadow-xl border-0 cursor-pointer transition-all hover:scale-105 active:scale-95"
                style={{ pointerEvents: 'auto' }}
                aria-label={isOpen ? 'Close assistant' : 'Open assistant'}
            >
                <Icon name={isOpen ? 'Close' : 'Support'} width="24" height="24" />
                {unreadCount > 0 && !isOpen && (
                    <span className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-red-500 text-white mini-text font-700 flex items-center justify-center border-2 border-white">
                        {unreadCount}
                    </span>
                )}
            </button>
        </aside>
    );
};

export default memo(Chatbot);
