import React, { useState, useRef, useEffect, useCallback, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../common/Button';
import Icon from '../common/Icon';
import Image from '../common/Image';
import Fields from '../forms/Fields';

import { productsData } from '../../utils/apiData';

const QUICK_ACTIONS = [
    {
        id: 'supplier',
        title: 'Supplier',
        subtitle: 'Verified Brands & Partners',
        icon: 'Users',
        iconBg: '#2563eb',
        reply: 'We partner with certified industrial suppliers and leading manufacturers to offer premium PVC solutions:\n\n• **Certified Quality**: Food-grade, fire-retardant, and polar-grade.\n• **Direct Wholesale**: Competitive bulk rates and fast cargo shipping.',
        cta: { text: 'View Suppliers', path: '/supplier' }
    },
    {
        id: 'contact',
        title: 'Get in Touch',
        subtitle: 'Speak with our team',
        icon: 'Support',
        iconBg: '#059669',
        reply: `Reach out to our customer support and sales team directly:\n\n• **Phone**: ${import.meta.env.VITE_PHONE || '07942562287'}\n• **Email**: ${import.meta.env.VITE_EMAIL || 'info@ashmitavinyls.com'}`,
        cta: { text: 'Get in Touch', path: '/connect' }
    },
    {
        id: 'blogs',
        title: 'Blogs',
        subtitle: 'Guides & Insights',
        icon: 'Reports',
        iconBg: '#7c3aed',
        reply: 'Explore our latest technical installation guides, overlap charts, and warehouse energy saving calculators.',
        cta: { text: 'Read Blogs', path: '/blog' }
    },
    {
        id: 'collection',
        title: 'Collection',
        subtitle: 'Curtains & Brackets',
        icon: 'Grid',
        iconBg: '#06b6d4',
        reply: 'Browse our full catalog of standard clear PVC rolls, polar sub-zero strips, and stainless steel mounting hardware.',
        cta: { text: 'Explore Collection', path: '/product' }
    }
];

const ProductItem = memo(({ product, onSelect }) => {
    const rawImg = product.image || product.images?.[0] || 'product/Product4.jpg';
    const priceDisplay = product.price != null ? `₹${product.price}` : (product.priceFormatted || '₹150');
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
                        placeholder="Search products..."
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
                        <p className="small-text font-500 text-dark m-0">No products found</p>
                        <p className="mini-text text-gray m-0 mt-4">Try searching for "Transparent", "Polar", or "Brackets"</p>
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
            style={{ width: '230px', maxWidth: 'calc(100vw - 48px)', animation: 'fadeInUp 0.3s ease-out' }}
            data-no-cursor="true"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-6 text-primary">
                    <Icon name="Sparkles" width="18" height="18" stroke="currentColor" />
                    <p className="small-text font-500 text-dark">ASSISTANT</p>
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
                Hi! 👋 Looking for PVC strip curtains or need help? Let's chat!
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
                    {activeMode === 'search' ? 'Product Search' : 'Support Assistant'}
                </h4>
                <p className="mini-text font-400 text-gray">Online • Catalog Live</p>
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
            Search our products, explore verified suppliers, or get in touch.
        </p>

        <div className="grid-cols-2 gap-8 mt-12">
            {QUICK_ACTIONS.map((card) => (
                <div
                    key={card.id}
                    onClick={() => onActionClick(card)}
                    className="bg-white rounded-10 p-15 cursor-pointer"
                >
                    <div
                        className="icon rounded-30 flex items-center justify-center"
                        style={{ backgroundColor: card.iconBg }}
                    >
                        <Icon name={card.icon} width="13" height="13" stroke="var(--white)" strokeWidth="2.2" />
                    </div>
                    <div className="mt-6">
                        <h5 className="headmini-text font-600 text-dark m-0">{card.title}</h5>
                        <p className="mini-text text-gray m-0 mt-2">{card.subtitle}</p>
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
            className="p-1 font-500 w-max"
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
                        <p className="mini-text font-400">{msg.text}</p>
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
                            className="mt-6"
                            onClick={() => onCtaClick(msg.cta.path)}
                        />
                    )}
                </div>
            );
        })}

        {isTyping && (
            <div
                className="bg-white rounded-16 p-10 flex items-center gap-4 b-shadow"
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
                    placeholder="Ask anything or search product..."
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
        }, 400);
    }, []);

    const handleChatInputChange = useCallback((val) => {
        setInputValue(val);
    }, []);

    const handleSend = useCallback((e) => {
        e?.preventDefault();
        const trimmed = inputValue.trim();
        if (!trimmed) return;
        setSearchQuery(trimmed);
        setActiveMode('search');
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
