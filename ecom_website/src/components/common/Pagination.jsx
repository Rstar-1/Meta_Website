import React from "react";

const Pagination = ({
  page,
  totalItems,
  itemsPerPage,
  onPageChange,
  itemName = "items"
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startItem = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  if (totalItems === 0) return null;

  const handlePageClick = (pNum) => {
    if (pNum >= 1 && pNum <= totalPages && pNum !== page) {
      onPageChange(pNum);
    }
  };

  const btnStyle = {
    width: "28px",
    height: "28px",
    fontSize: "0.775rem",
    border: "1px solid #ececec",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
    borderRadius: "4px"
  };

  const renderNavButton = (targetPage, label, title, isDisabled) => (
    <button
      className="bg-white text-gray font-500"
      style={{
        ...btnStyle,
        opacity: isDisabled ? 0.4 : 1,
        cursor: isDisabled ? "not-allowed" : "pointer"
      }}
      disabled={isDisabled}
      onClick={() => handlePageClick(targetPage)}
      title={title}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-tertiary mt-4 w-full rounded-5">
      <div className="flex items-center justify-between p-10">
        <p className="text-gray mini-text">
          Showing {startItem} to {endItem} of {totalItems} {itemName}
        </p>
        <div className="flex items-center gap-4">
          {renderNavButton(1, "«", "First Page", page === 1)}
          {renderNavButton(page - 1, "<", "Previous Page", page === 1)}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pNum) => {
            if (totalPages > 5 && Math.abs(pNum - page) > 2) {
              return pNum === 1 || pNum === totalPages ? (
                <span key={pNum} className="text-gray px-4" style={{ fontSize: "0.775rem" }}>
                  ...
                </span>
              ) : null;
            }
            const isActive = page === pNum;
            return (
              <button
                key={pNum}
                className={isActive ? "bg-primary text-white font-500" : "bg-white text-gray font-500"}
                style={{
                  ...btnStyle,
                  color: isActive ? "#ffffff" : "var(--gray)",
                  backgroundColor: isActive ? "var(--primary)" : "#ffffff",
                  borderColor: isActive ? "var(--primary)" : "#ececec"
                }}
                onClick={() => handlePageClick(pNum)}
              >
                {pNum}
              </button>
            );
          })}
          {renderNavButton(page + 1, ">", "Next Page", page === totalPages)}
          {renderNavButton(totalPages, "»", "Last Page", page === totalPages)}
        </div>
      </div>
    </div>
  );
};

export default Pagination;