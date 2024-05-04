import React from 'react';
import Product from './Product';

const ProductTable = ({ products }) => {
  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="border px-4 py-2"></th>
          <th className="border px-4 py-2">Product Name</th>
          <th className="border px-4 py-2">Category</th>
          <th className="border px-4 py-2">Price</th>
          <th className="border px-4 py-2">Count</th>
          <th className="border px-4 py-2">Stock</th>
          <th className="border px-4 py-2">Status</th>
          <th className="border px-4 py-2">Published</th>
          <th className="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
