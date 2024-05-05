import React from 'react';
import productsData from '../../../db/products';

const OrderDetailsModal = ({ order, closeModal }) => {
  const getProductDetails = (productId) => {
    return productsData.find(product => product.id === productId);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-2">Order Details</h2>
        <div>
          <p>Order ID: {order.id}</p>
          <p>Customer: {order.customer}</p>
          <p>Total: {order.total}$</p>
          <p>Status: {order.status}</p>
          <h3 className="text-lg font-semibold mt-4">Products:</h3>
          <ul>
            {order.products.map(product => {
              const productDetails = getProductDetails(product.id);
              const totalProductPrice = productDetails.price * product.count;
              return (
                <li key={product.id}>
                  <p>Name: {productDetails.name}</p>
                  <p>Price: {productDetails.price}$</p>
                  <p>Quantity: {product.count}</p>
                  <p>Total Price: {totalProductPrice}$</p>
                  <img src={productDetails.image} alt={productDetails.name} className="w-12 h-12" />
                </li>
              );
            })}
          </ul>
        </div>
        <button onClick={closeModal} className="btn btn-primary mt-2">Close</button>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
