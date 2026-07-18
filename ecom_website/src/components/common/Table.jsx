import React, { useState, useMemo } from "react";
import Pagination from "./Pagination";
import Icon from "./Icon";
import { resolveImagePath } from "../../utils/imageResolver";
import Image from "./Image";
import Skeleton from "./Skeleton";

// Helper function to render cell content based on column definition
const renderCellContent = (col, row, rowIdx) => {
    const cellValue = col.accessor ? row[col.accessor] : undefined;

    if (col.render) {
        return col.render(row, rowIdx);
    }

    if (col.ui && !React.isValidElement(cellValue)) {
        switch (col.ui) {
            case "profile": {
                const name = row[col.accessor] || row["username"] || row["name"] || "";
                const subText = row[col.subKey || "sub"] || row[col.emailKey || "email"] || row["email"] || row["sub"] || "";
                const imgUrl = resolveImagePath(row[col.imageKey || "image"] || row["image"] || row["avatar"] || "");
                const favColor = row[col.colorKey || "favoriteColor"] || "#6366f1";
                const imgStyle = { width: "40px", height: "40px", flexShrink: 0, ...col.imgStyle, ...col.imageStyle };
                return (
                    <div className="flex items-center gap-12">
                        {imgUrl ? (
                            <Image src={imgUrl} alt={name} className="common-img rounded-5 object-cover border-tertiary" style={imgStyle} />
                        ) : (
                            <div style={{ background: favColor, width: "32px", height: "32px", borderRadius: "50%", flexShrink: 0 }} className="center-div">
                                <p className="small-text text-white font-600" style={{ margin: 0 }}>
                                    {name ? name.charAt(0).toUpperCase() : "?"}
                                </p>
                            </div>
                        )}
                        <div>
                            <p className="text-dark small-text font-500" style={{ margin: 0 }}>{name}</p>
                            {subText && <p className="text-gray mini-text font-500" style={{ margin: 0 }}>{subText}</p>}
                        </div>
                    </div>
                );
            }
            case "arr-badge":
                return (
                    <div className="flex items-center gap-4 flex-wrap">
                        {(Array.isArray(cellValue) ? cellValue : []).map((val, idx) => (
                            <p key={idx} className="bg-light-primary text-primary mini-text capitalize px-10 py-4 rounded-5 font-500" style={{ margin: 0 }}>
                                {val}
                            </p>
                        ))}
                    </div>
                );
            case "status": {
                const isActive = !!cellValue;
                const statusColor = isActive ? "#10b981" : "#ef4444";
                return (
                    <div className="flex items-center gap-6">
                        <div style={{
                            width: "6px", height: "6px", borderRadius: "50%",
                            background: statusColor,
                            boxShadow: `0 0 6px ${statusColor}`
                        }}></div>
                        <p className={`${isActive ? "text-success" : "text-danger"} small-text font-500`} style={{ margin: 0 }}>
                            {typeof cellValue === "string" ? cellValue : (isActive ? "Active" : "Inactive")}
                        </p>
                    </div>
                );
            }
            case "badge": {
                const valStr = String(cellValue || "").toLowerCase();
                const badgeMap = {
                    admin: { bg: "#fee2e2", color: "#991b1b" },
                    user: { bg: "#dcfce3", color: "#166534" },
                    member: { bg: "#dcfce3", color: "#166534" },
                    public: { bg: "#dcfce3", color: "#166534" }
                };
                const { bg = "#eff6ff", color = "#3b82f6" } = badgeMap[valStr] || {};
                return (
                    <span
                        style={{ background: valStr ? bg : "#f1f5f9", color: valStr ? color : "#475569", display: "inline-flex" }}
                        className="mini-text capitalize px-10 py-4 rounded-20 font-500"
                    >
                        {cellValue || "-"}
                    </span>
                );
            }
            case "icon-badge": {
                const valStr = String((col.accessor ? row[col.accessor] : "") || cellValue || "").toLowerCase();
                const isPrivate = ["private", "protected", "closed"].includes(valStr);
                const isRating = col.accessor === "rating" || col.icon === "Star" || col.iconName === "Star";
                return (
                    <span
                        className="flex items-center gap-6 mini-text capitalize px-10 py-4 rounded-20 font-500"
                        style={{
                            display: "inline-flex",
                            backgroundColor: col.badgeBg || (isRating ? "#fef3c7" : (isPrivate ? "#fee2e2" : "#eff6ff")),
                            color: col.badgeColor || (isRating ? "#b45309" : (isPrivate ? "#991b1b" : "#3b82f6"))
                        }}
                    >
                        <Icon name={col.icon || col.iconName || (isRating ? "Star" : (isPrivate ? "Lock" : "Unlock"))} width="12" height="12" strokeWidth="2.5" />
                        {cellValue}
                    </span>
                );
            }
            case "text":
            case "desc":
                return (
                    <p
                        className={`text-gray mini-text ${col.ui === "desc" ? "line-clamp1" : ""}`}
                        title={col.ui === "desc" ? (cellValue || "") : undefined}
                        style={{ margin: 0 }}
                    >
                        {cellValue || "-"}
                    </p>
                );
        }
    }

    return (
        <p className="text-gray mini-text" style={{ margin: 0 }}>
            {cellValue !== undefined && cellValue !== null && cellValue !== "" ? String(cellValue) : "-"}
        </p>
    );
};

const Table = ({
    title,
    subtitle,
    headerSub,
    data = [],
    columns = [],
    totalItems = 0,
    itemsPerPage = 10,
    page = 1,
    onPageChange,
    searchQuery = "",
    onSearchChange,
    searchPlaceholder = "Search...",
    showControls = true,
    itemName = "items",
    loading = false,
    collapsible = false,
    maxVisibleColumns = 5,
    minWidth = "1100px"
}) => {
    const [expandedRowId, setExpandedRowId] = useState(null);

    const toggleRow = (id) => {
        setExpandedRowId((prev) => (prev === id ? null : id));
    };

    const subText = subtitle || headerSub;

    // Check if collapsing is active
    const hasExplicitCollapsed = columns.some((col) => col.collapsed !== undefined);
    const shouldCollapse = collapsible || hasExplicitCollapsed || (columns.filter(c => c.accessor !== "checkbox" && c.accessor !== "actions").length > maxVisibleColumns && collapsible !== false);

    const [displayHeaders, collapsedColumns] = useMemo(() => {
        let main = columns;
        let collapsed = [];
        if (shouldCollapse) {
            if (hasExplicitCollapsed) {
                main = columns.filter(c => !c.collapsed);
                collapsed = columns.filter(c => c.collapsed);
            } else {
                const checkboxCol = columns.find((c) => c.accessor === "checkbox");
                const actionsCol = columns.find((c) => c.accessor === "actions");
                const dataCols = columns.filter((c) => c.accessor !== "checkbox" && c.accessor !== "actions");
                main = [
                    ...(checkboxCol ? [checkboxCol] : []),
                    ...dataCols.slice(0, maxVisibleColumns),
                    ...(actionsCol ? [actionsCol] : [])
                ];
                collapsed = dataCols.slice(maxVisibleColumns);
            }
        }
        if (collapsed.length > 0) {
            const actionsIdx = main.findIndex(c => c.accessor === "actions");
            const expandCol = { header: "Details", accessor: "_expand", style: { width: "70px" }, className: "text-center" };
            main = [...main];
            if (actionsIdx !== -1) {
                main.splice(actionsIdx, 0, expandCol);
            } else {
                main.push(expandCol);
            }
        }
        return [main, collapsed];
    }, [columns, shouldCollapse, hasExplicitCollapsed, maxVisibleColumns]);

    const hasCollapsedCols = collapsedColumns.length > 0;

    return (
        <>
            <style>{`
                @media (max-width: 768px) {
                    .responsive-table-el {
                        min-width: max-content !important;
                    }
                    .responsive-table-el th,
                    .responsive-table-el td {
                        white-space: nowrap !important;
                    }
                }
            `}</style>
            {(title || (showControls && onSearchChange)) && (
                <div className="flex items-center">
                    {title && (
                        <div className="w-70">
                            <h2 className="mid-text text-dark font-500">
                                {title}
                            </h2>
                            {subText && <p className="text-gray font-400 mini-text mt-1">{subText}</p>}
                        </div>
                    )}
                    {showControls && onSearchChange && (
                        <div className="w-30">
                            <div className="relative w-full overflow-hidden rounded-5 border-ec">
                                <input
                                    type="text"
                                    placeholder={searchPlaceholder}
                                    className="text-dark bg-white h-input mini-text border-0 w-full"
                                    value={searchQuery}
                                    onChange={(e) => onSearchChange(e.target.value)}
                                />
                                <span className="absolute top-0 right-0 bg-white py-10 px-14 text-gray">
                                    <Icon name="Search" width="16" height="16" strokeWidth="2.5" />
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {loading ? (
                <Skeleton variant="table" columns={displayHeaders} count={5} style={{ marginTop: "12px" }} minWidth={minWidth} />
            ) : (
                <div className="table-w rounded-5 mt-12 bordl bordr" style={{ overflowX: "auto" }}>
                    <table className="w-full responsive-table-el" style={{ borderCollapse: "collapse", minWidth }}>
                        <thead>
                            <tr>
                                {displayHeaders.map((col, idx) => (
                                    <th
                                        key={idx}
                                        style={{
                                            ...col.style
                                        }}
                                        className={`bg-primary p-14 capitalize ${col.className || ""}`}
                                    >
                                        <p className={`mini-text text-white font-500 ${col.className?.includes("text-center") ? "text-center" : col.className?.includes("text-right") ? "text-right" : "text-left"}`}>
                                            {col.header}
                                        </p>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.length === 0 ? (
                            <tr>
                                <td colSpan={displayHeaders.length}>
                                    <div className="py-40 text-center bordb">
                                        <p className="head-text text-gray">🔍</p>
                                        <p className="text-gray small-text mt-7">No data found .</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            data.map((row, rowIdx) => {
                                const rowId = row._id || row.id || rowIdx;
                                const isExpanded = expandedRowId === rowId;

                                return (
                                    <React.Fragment key={rowId}>
                                        <tr className={isExpanded ? "bg-light-primary-subtle" : ""}>
                                            {displayHeaders.map((col, colIdx) => {
                                                if (col.accessor === "_expand") {
                                                    return (
                                                        <td key={colIdx} className="p-14 text-center bordb" style={{ verticalAlign: "middle" }}>
                                                            <button
                                                                type="button"
                                                                onClick={() => toggleRow(rowId)}
                                                                className="p-6 rounded-5 border-0 bg-light text-primary hover:bg-primary hover:text-white cursor-pointer flex items-center justify-center"
                                                                style={{ margin: "0 auto", transition: "all 0.2s ease", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
                                                                title={isExpanded ? "Collapse Details" : "Expand Details"}
                                                            >
                                                                <Icon name="ChevronDown" width="14" height="14" strokeWidth="2.5" />
                                                            </button>
                                                        </td>
                                                    );
                                                }

                                                return (
                                                    <td
                                                        key={colIdx}
                                                        style={{
                                                            verticalAlign: "middle",
                                                            ...col.style
                                                        }}
                                                        className={`p-14 text-dark bordb ${col.className || ""}`}
                                                    >
                                                        {renderCellContent(col, row, rowIdx)}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                        {hasCollapsedCols && isExpanded && (
                                            <tr key={`${rowId}-expanded`}>
                                                <td colSpan={displayHeaders.length} className="p-16 bordb bg-light">
                                                    <div className="bg-white p-16 rounded-5 border-ec shadow-sm" style={{ borderLeft: "4px solid var(--primary-color, #1e74db)" }}>
                                                        <div className="flex items-center justify-between mb-12">
                                                            <h4 className="mini-text text-gray font-600 uppercase tracking-wider flex items-center gap-6" style={{ margin: 0 }}>
                                                                <Icon name="Info" width="14" height="14" strokeWidth="2.5" />
                                                                Additional Specifications & Details
                                                            </h4>
                                                            <span className="mini-text text-primary font-500 bg-light-primary px-8 py-2 rounded-4">
                                                                {collapsedColumns.length} fields collapsed
                                                            </span>
                                                        </div>
                                                        <div className="grid-cols-3 gap-16">
                                                            {collapsedColumns.map((col, cIdx) => (
                                                                <div key={col.accessor || cIdx} className="bg-light p-12 rounded-5 border-ec">
                                                                    <span className="mini-text text-gray font-600 uppercase block mb-6">{col.header}</span>
                                                                    <div className="mini-text text-dark font-500">
                                                                        {renderCellContent(col, row, rowIdx)}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
            )}

            {onPageChange && totalItems > itemsPerPage && (
                <Pagination
                    page={page}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={onPageChange}
                    itemName={itemName}
                />
            )}
        </>
    );
};

export default Table;