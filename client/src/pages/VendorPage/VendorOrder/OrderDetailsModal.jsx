import React from 'react';

const OrderDetailsModal = ({ order, closeModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-2">Order Details</h2>
        <div>
          <p>Order ID: {order.id}</p>
          <p>Status: {order.status}</p>
          <p>Expected Date: {order.expectedDate}</p>
          <h3 className="text-lg font-semibold mt-4">Products:</h3>
          <ul>
            {order.products.map(product => (
              <li key={product.id}>
                <p>Name: {product.name}</p>
                <p>Price: {product.price}$</p>
                <p>Quantity: {product.count}</p>
                <p>Total Price: {product.price * product.count}$</p>
                <img src={product.image} alt={product.name} className="w-12 h-12" />
              </li>
            ))}
          </ul>
        </div>
        <button onClick={closeModal} className="btn btn-primary mt-2">Close</button>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
