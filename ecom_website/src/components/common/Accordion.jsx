import React, { useState } from 'react';

const Accordion = ({
    items = [],
    allowMultiple = false,
    defaultOpenAll = true,
    showNumber = true,
    className = '',
    itemClassName = '',
}) => {
    const getInitialOpenState = () => {
        if (allowMultiple) {
            return defaultOpenAll ? items.map((item, idx) => (item.id !== undefined ? item.id : idx)) : [];
        }
        return items[0]?.id !== undefined ? items[0].id : (items.length > 0 ? 0 : null);
    };

    const [openState, setOpenState] = useState(getInitialOpenState);

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
                const displayNum = item.showNumber !== undefined ? item.showNumber : showNumber;

                return (
                    <div
                        key={id}
                        className={`bordb py-15 ${itemClassName}`}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: displayNum ? '24px' : '12px',
                                cursor: 'pointer',
                            }}
                            onClick={() => toggleItem(id)}
                        >
                            {/* Number Circle (Optional) */}
                            {displayNum && (
                                <p
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
                                </p>
                            )}

                            {/* Content Column */}
                            <div className='w-full' style={{ paddingTop: displayNum ? '10px' : '2px' }}>
                                <div
                                    className='flex items-center justify-between'
                                >
                                    <p className="text-dark small-text font-500">
                                        {title}
                                    </p>

                                    {/* Plus/Minus Sign */}
                                    <span
                                        style={{
                                            fontSize: isOpen ? '24px' : '20px',
                                            fontWeight: '400',
                                            lineHeight: '1',
                                            color: isOpen ? 'var(--primary)' : 'var(--dark)',
                                            userSelect: 'none',
                                            transition: 'all 0.2s ease',
                                            display: 'inline-block',
                                        }}
                                    >
                                        {isOpen ? '−' : '+'}
                                    </span>
                                </div>

                                {/* Collapsible Content */}
                                <div
                                    style={{
                                        maxHeight: isOpen ? '600px' : '0px',
                                        opacity: isOpen ? 1 : 0,
                                        overflow: 'hidden',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    }}
                                >
                                    {typeof content === 'string' ? (
                                        <p className="font-400 small-text text-gray mt-8">
                                            {content}
                                        </p>
                                    ) : (
                                        <div className="mt-8">
                                            {content}
                                        </div>
                                    )}
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