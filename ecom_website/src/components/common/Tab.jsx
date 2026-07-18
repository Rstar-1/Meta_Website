import React from "react";

const TabItem = ({ name, count, icon, isActive, onClick }) => (
    <div
        onClick={onClick}
        className={`px-20 py-9 cursor-pointer flex items-center gap-8 flex-shrink-0 tab-item ${isActive ? "active" : "rounded-5"}`}
    >
        {icon && <span className="flex items-center justify-center">{icon}</span>}
        <p className="small-text">{name}</p>
        {count !== undefined && count !== null && (
            <p className={`px-7 py-2 rounded-20 mini-text font-400 ${isActive ? "bg-primary text-white" : "bg-tertiary text-gray"}`}>
                {count}
            </p>
        )}
    </div>
);

const Tab = ({ tabs, activeTab, onChange }) => {
    return (
        <>
            <style>{`
                .tabs-container::-webkit-scrollbar { display: none; }
                .tab-item { color: var(--gray); font-weight: 500; transition: all 0.2s; }
                .tab-item:not(.active):hover { background-color: var(--forth); color: var(--dark); }
                .tab-item.active { background-color: #ffffff; color: var(--primary); font-weight: 600; border-bottom: 2px solid var(--primary); }
            `}</style>
            <div
                className="flex bordb gap-8 tabs-container"
                style={{
                    overflowX: "auto",
                    whiteSpace: "nowrap",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none"
                }}
            >
                {tabs.map((tab, idx) => {
                    const isObj = typeof tab === "object" && tab !== null;
                    const name = isObj ? (tab.name || tab.label) : tab;
                    const value = isObj ? (tab.value || name) : tab;

                    return (
                        <TabItem
                            key={idx}
                            name={name}
                            count={isObj ? tab.count : null}
                            icon={isObj ? tab.icon : null}
                            isActive={activeTab === value}
                            onClick={() => onChange?.(value)}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default Tab;