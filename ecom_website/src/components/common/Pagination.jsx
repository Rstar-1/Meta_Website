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

  return (
    <div className="bg-tertiary mt-4 w-full rounded-5">
      <div className="flex items-center justify-between p-10">
        <p className="text-gray mini-text">
          Showing {startItem} to {endItem} of {totalItems} {itemName}
        </p>
        <div className="flex items-center gap-4">
          <button
            className="bg-white text-gray font-500"
            style={{
              ...btnStyle,
              opacity: page === 1 ? 0.4 : 1,
              cursor: page === 1 ? "not-allowed" : "pointer"
            }}
            disabled={page === 1}
            onClick={() => handlePageClick(1)}
            title="First Page"
          >
            &laquo;
          </button>
          <button
            className="bg-white text-gray font-500"
            style={{
              ...btnStyle,
              opacity: page === 1 ? 0.4 : 1,
              cursor: page === 1 ? "not-allowed" : "pointer"
            }}
            disabled={page === 1}
            onClick={() => handlePageClick(page - 1)}
            title="Previous Page"
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }).map((_, i) => {
            const pNum = i + 1;
            // Show current page, and a few neighboring pages
            if (totalPages > 5 && Math.abs(pNum - page) > 2) {
              if (pNum === 1 || pNum === totalPages) {
                return (
                  <span key={pNum} className="text-gray px-4" style={{ fontSize: "0.775rem" }}>
                    ...
                  </span>
                );
              }
              return null;
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
          <button
            className="bg-white text-gray font-500"
            style={{
              ...btnStyle,
              opacity: page === totalPages ? 0.4 : 1,
              cursor: page === totalPages ? "not-allowed" : "pointer"
            }}
            disabled={page === totalPages}
            onClick={() => handlePageClick(page + 1)}
            title="Next Page"
          >
            &gt;
          </button>
          <button
            className="bg-white text-gray font-500"
            style={{
              ...btnStyle,
              opacity: page === totalPages ? 0.4 : 1,
              cursor: page === totalPages ? "not-allowed" : "pointer"
            }}
            disabled={page === totalPages}
            onClick={() => handlePageClick(totalPages)}
            title="Last Page"
          >
            &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;