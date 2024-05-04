import React from 'react';

const Product = ({ product }) => {
  return (
    <tr>
      <td className="border px-4 py-2">
        <input
          type="checkbox"
          checked={selectedProducts.includes(product.id)}
          onChange={() => toggleProductSelection(product.id)}
        />
      </td>
      <td className="border px-4 py-2">{product.name}</td>
      <td className="border px-4 py-2">{product.category}</td>
      <td className="border px-4 py-2">{product.price}$</td>
      <td className="border px-4 py-2">{product.count}</td>
      <td className="border px-4 py-2">{product.inStock ? 'In Stock' : 'Out of Stock'}</td>
      <td className="border px-4 py-2">
        <span className={`badge ${product.inStock ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'}`}>
          {product.inStock ? 'Selling' : 'Sold Out'}
        </span>
      </td>
      <td className="border px-4 py-2">
        <input
          type="checkbox"
          className="toggle toggle-success"
          checked={product.published}
          onChange={() => toggleProductPublishing(product.id)}
        />
      </td>
      <td className="border px-4 py-2">
        <button onClick={() => openEditModal(product.id, product.name, product.price, product.category, product.count, product.published)} className="btn btn-primary">Edit</button>
      </td>
    </tr>
  );
};

export default Product;
