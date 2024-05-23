import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentPageState, productsPerPageState,  } from '../../recoil/atom';
import { filteredProductsSelector } from '../../recoil/productsList';

export default function Pagination() {
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const productsPerPage = useRecoilValue(productsPerPageState);
  const filteredProducts = useRecoilValue(filteredProductsSelector);
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <div className="join flex justify-center">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
        <button
          key={pageNumber}
          onClick={() => setCurrentPage(pageNumber)}
          className={currentPage === pageNumber ? 'join-item btn btn-active' : 'join-item btn' }
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
}
