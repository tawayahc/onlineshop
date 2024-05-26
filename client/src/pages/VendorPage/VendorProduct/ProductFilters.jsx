import React from 'react';
import { useRecoilState } from 'recoil';
import {
  productSearchTermState,
  selectedCategoryState,
  productSortByState,
  productSortOrderState,
  productCategoriesState,
} from '../../../recoil/productControlPanel.js';

function ProductFilters() {
  const [searchTerm, setSearchTerm] = useRecoilState(productSearchTermState);
  const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoryState);
  const [sortBy, setSortBy] = useRecoilState(productSortByState);
  const [sortOrder, setSortOrder] = useRecoilState(productSortOrderState);
  const [productCategories] = useRecoilState(productCategoriesState);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSortBy('');
    setSortOrder('asc');
  };

  return (
    <div className="mb-8">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
        className="input mb-2"
      />

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="input mb-2"
      >
        <option value="All">All</option>
        {productCategories.map(category => (
          <option key={category.ProductCategoryID} value={category.ProductCategoryName}>
            {category.ProductCategoryName}
          </option>
        ))}
      </select>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="input mr-2"
      >
        <option value="">Sort By</option>
        <option value="Price">Price</option>
        <option value="ProductName">Product Name</option>
      </select>
      
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="input mr-2"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <button onClick={resetFilters} className="btn btn-secondary">Reset Filters</button>
    </div>
  );
}

export default ProductFilters;
