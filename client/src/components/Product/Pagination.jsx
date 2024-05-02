import React from 'react'

export default function Pagination({ productsPerPage, length, currentPage, handlePagination }) {
  const paginationNumbers = [];

  for (let i = 1; i <= Math.ceil(length / productsPerPage); i++) {
    paginationNumbers.push(i);
  }

  return (
    <div className="join flex justify-center">
      {paginationNumbers.map((pageNumber) => (
        <button
        key={pageNumber}
        onClick={() => handlePagination(pageNumber)}
        className={currentPage === pageNumber ? 'join-item btn btn-active' : 'join-item btn' }
      >
        {pageNumber}
      </button>
      ))}
    </div>
  );
}
