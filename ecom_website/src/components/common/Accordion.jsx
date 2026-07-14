import React, { useState } from 'react';

const Accordion = ({
    items = [],
    allowMultiple = false,
    className = '',
    itemClassName = '',
}) => {
    // If allowMultiple is true, state is an array of open item IDs.
    // Otherwise, state is a single ID (or null).
    const [openState, setOpenState] = useState(allowMultiple ? [] : null);

    const toggleItem = (id) => {
        if (allowMultiple) {
            if (openState.includes(id)) {
                setOpenState(openState.filter((itemId) => itemId !== id));
            } else {
                setOpenState([...openState, id]);
            }
        } else {
            setOpenState(openState === id ? null : id);
        }
    };

    const isItemOpen = (id) => {
        if (allowMultiple) {
            return openState.includes(id);
        }
        return openState === id;
    };

    return (
        <div className={`grid-cols-1 ${className}`}>
            {items.map((item, idx) => {
                const id = item.id !== undefined ? item.id : idx;
                const isOpen = isItemOpen(id);
                const title = item.title || item.question || '';
                const content = item.content || item.answer || '';
                const numStr = String(idx + 1).padStart(2, '0');

                return (
                    <div
                        key={id}
                        className={`bordb transition-all py-20 ${itemClassName}`}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '24px',
                                cursor: 'pointer',
                            }}
                            onClick={() => toggleItem(id)}
                        >
                            {/* Number Circle */}
                            <div
                                style={{
                                    width: '46px',
                                    height: '46px',
                                    borderRadius: '50%',
                                    border: '1px solid #d1d5db',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    fontSize: '15px',
                                    fontWeight: '500',
                                    color: 'var(--dark)',
                                    transition: 'border-color 0.3s ease',
                                }}
                            >
                                {numStr}
                            </div>

                            {/* Content Column */}
                            <div style={{ flex: 1, paddingTop: '10px' }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        gap: '16px',
                                    }}
                                >
                                    <h3
                                        className="text-dark"
                                        style={{
                                            fontSize: '18px',
                                            fontWeight: '600',
                                            lineHeight: '1.4',
                                            margin: 0,
                                        }}
                                    >
                                        {title}
                                    </h3>

                                    {/* Plus/Minus Sign */}
                                    <span
                                        style={{
                                            fontSize: isOpen ? '28px' : '22px',
                                            fontWeight: '400',
                                            lineHeight: '1',
                                            color: isOpen ? 'var(--warningtext)' : 'var(--dark)',
                                            userSelect: 'none',
                                            transition: 'color 0.2s ease',
                                            display: 'inline-block',
                                            transform: isOpen ? 'translateY(-2px)' : 'none',
                                        }}
                                    >
                                        {isOpen ? '−' : '+'}
                                    </span>
                                </div>

                                {/* Collapsible Answer */}
                                <div
                                    style={{
                                        maxHeight: isOpen ? '300px' : '0px',
                                        opacity: isOpen ? 1 : 0,
                                        overflow: 'hidden',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    }}
                                >
                                    <p
                                        className="text-gray"
                                        style={{
                                            fontSize: '15px',
                                            lineHeight: '26px',
                                            marginTop: '16px',
                                            marginBottom: 0,
                                            paddingRight: '40px',
                                        }}
                                    >
                                        {content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Accordion;
