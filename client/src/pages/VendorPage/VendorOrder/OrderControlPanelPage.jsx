import React, { useState } from 'react';
import Layout from '../../../components/Layout/Layout';
import ordersData from '../../../db/orders';

function OrderControlPanelPage() {
  const [orders, setOrders] = useState(ordersData);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  const filterOrders = () => {
    return orders.filter(order => {
      if (selectedStatus !== 'All' && order.status !== selectedStatus) {
        return false;
      }
      return order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    }).sort((a, b) => {
      if (sortBy === 'ascending') {
        return a.total - b.total;
      } else if (sortBy === 'descending') {
        return b.total - a.total;
      }
      return 0;
    });
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    }));
  };

  const deleteSelectedOrders = () => {
    const updatedOrders = orders.filter(order => !selectedOrders.includes(order.id));
    setOrders(updatedOrders);
    setSelectedOrders([]);
  };

  const toggleOrderSelection = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedStatus('All');
    setSortBy('default');
  };

  const statuses = ['All', 'Processing', 'Shipped', 'Delivered'];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Order Control Panel</h1>

      <div className="mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search orders..."
          className="input mb-2"
        />
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="input mr-2"
        >
          {statuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="input mr-2"
        >
          <option value="default">Sort By</option>
          <option value="ascending">Total: Low to High</option>
          <option value="descending">Total: High to Low</option>
        </select>
        <button onClick={resetFilters} className="btn btn-secondary">Reset Filters</button>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Order List</h2>
        <div className="flex items-center mb-2">
          <button onClick={deleteSelectedOrders} className="btn btn-danger mr-2">Delete Selected</button>
        </div>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2"></th>
              <th className="border px-4 py-2">Order ID</th>
              <th className="border px-4 py-2">Customer</th>
              <th className="border px-4 py-2">Total</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filterOrders().map(order => (
              <tr key={order.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => toggleOrderSelection(order.id)}
                  />
                </td>
                <td className="border px-4 py-2">{order.id}</td>
                <td className="border px-4 py-2">{order.customer}</td>
                <td className="border px-4 py-2">{order.total}$</td>
                <td className="border px-4 py-2">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="input"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default () => (
  <Layout>
    <OrderControlPanelPage />
  </Layout>
);
