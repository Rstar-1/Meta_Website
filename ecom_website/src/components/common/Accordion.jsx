import React, { useState } from 'react';
import Icon from './Icon';

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
        <div className={`grid-cols-1 gap-12 ${className}`}>
            <style>{`
        .gen-accordion-item {
          border: 1px solid #eeeeee;
          background: #ffffff;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .gen-accordion-item:hover {
          border-color: var(--primary);
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.04);
        }
        .gen-accordion-arrow-bg {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
      `}</style>

            {items.map((item, idx) => {
                const id = item.id !== undefined ? item.id : idx;
                const isOpen = isItemOpen(id);
                const title = item.title || item.question || '';
                const content = item.content || item.answer || '';

                return (
                    <div
                        key={id}
                        className={`gen-accordion-item border rounded-5 bg-white transition-all cursor-pointer ${itemClassName}`}
                        style={{
                            borderLeft: isOpen ? '4px solid var(--primary)' : '1px solid #eeeeee',
                            transform: isOpen ? 'translateY(-2px)' : 'translateY(0)',
                            boxShadow: isOpen ? '0 10px 30px rgba(59, 130, 246, 0.04)' : 'none'
                        }}
                        onClick={() => toggleItem(id)}
                    >
                        <div className="flex justify-between items-center p-10 select-none">
                            <p className={`font-500 small-text ${isOpen ? 'text-primary' : 'text-dark'}`}>
                                {title}
                            </p>
                            <div
                                className={`gen-accordion-arrow-bg transition-all duration-300 ${isOpen ? 'bg-primary text-white rotate-180' : 'bg-forth text-dark'
                                    }`}
                            >
                                <Icon name="ChevronDown" width="16" height="16" stroke="currentColor" strokeWidth="2.5" />
                            </div>
                        </div>
                        <div
                            className="overflow-hidden"
                            style={{
                                maxHeight: isOpen ? '300px' : '0px',
                                opacity: isOpen ? 1 : 0,
                                transition: 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease'
                            }}
                        >
                            <div className="p-10">
                                {content}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Accordion;
