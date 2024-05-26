import React from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { currentOrdersState, selectedOrdersState } from '../../../recoil/orderControlPanel';

const OrderList = ({ openOrderDetailsModal, handleUpdateOrderStatus }) => {
  const currentOrders = useRecoilValue(currentOrdersState);
  const [selectedOrders, setSelectedOrders] = useRecoilState(selectedOrdersState);

  const statuses = ['All', 'Processing', 'Shipped', 'Delivered'];

  const toggleOrderSelection = (orderId) => {
    setSelectedOrders(prevSelectedOrders => {
      if (prevSelectedOrders.includes(orderId)) {
        return prevSelectedOrders.filter(id => id !== orderId);
      } else {
        return [...prevSelectedOrders, orderId];
      }
    });
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-2">Order List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-blue-600">Select</th>
              <th className="px-4 py-2 text-blue-600">Order ID</th>
              <th className="px-4 py-2 text-blue-600">Expected Date</th>
              <th className="px-4 py-2 text-blue-600">Total</th>
              <th className="px-4 py-2 text-blue-600">Status</th>
              <th className="px-4 py-2 text-blue-600">Actions</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-200">
            {currentOrders.map(order => (
              <tr key={order.id} className="hover:bg-gray-100 text-gray-700">
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => toggleOrderSelection(order.id)}
                    className="form-checkbox h-3 w-3"
                  />
                </td>
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{order.expectedDate}</td>
                <td className="px-4 py-2">{order.products.reduce((acc, product) => acc + product.price * product.count, 0)}$</td>
                <td className="px-4 py-2 ">
                  <select
                    value={order.status}
                    onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                    className="input p-2 border rounded-md bg-white"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2">
                  <button onClick={() => openOrderDetailsModal(order.id)} className="btn btn-primary p-2 border rounded-md bg-blue-500 text-white">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;