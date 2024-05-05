import React, { useState } from 'react';
import Layout from '../../../components/Layout/Layout';
import ordersData from '../../../db/orders';
import productsData from '../../../db/products';
import OrderDetailsModal from './OrderDetailsModal';

function OrderControlPanelPage() {
  const [orders, setOrders] = useState(ordersData);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(20);

  // Modal state
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal and set selected order details
  const openOrderDetailsModal = (orderId) => {
    const order = orders.find(order => order.id === orderId);
    setSelectedOrderDetails(order);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeOrderDetailsModal = () => {
    setIsModalOpen(false);
  };

  // Function to filter orders based on search term, status, and date range
  const filterOrders = () => {
    return orders.filter(order => {
      if (selectedStatus !== 'All' && order.status !== selectedStatus) {
        return false;
      }
      if (searchTerm && !order.customer.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      // Additional filtering logic based on date range can be added here
      return true;
    }).sort((a, b) => {
      if (sortBy === 'ascending') {
        return a.total - b.total;
      } else if (sortBy === 'descending') {
        return b.total - a.total;
      }
      return 0;
    });
  };

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filterOrders().slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const statuses = ['All', 'Processing', 'Shipped', 'Delivered'];

  // Calculate order range
  const startOrderIndex = indexOfFirstOrder + 1;
  const endOrderIndex = Math.min(indexOfLastOrder, filterOrders().length);

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

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    }));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Order Control Panel</h1>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrderDetails && (
        <OrderDetailsModal order={selectedOrderDetails} closeModal={closeOrderDetailsModal} />
      )}

      {/* Filter Options */}
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
          <option value="default">Order ID</option>
          <option value="ascending">Total: Low to High</option>
          <option value="descending">Total: High to Low</option>
        </select>
        <button onClick={resetFilters} className="btn btn-secondary">Reset Filters</button>
      </div>

      {/* Order List */}
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
        <th className="border px-4 py-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {currentOrders.map(order => {
        // Calculate total for each order
        const orderTotal = order.products.reduce((acc, product) => {
          const productDetails = productsData.find(p => p.id === product.id);
          return acc + productDetails.price * product.count;
        }, 0);

        return (
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
            <td className="border px-4 py-2">{orderTotal}$</td>
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
            <td className="border px-4 py-2">
              <button onClick={() => openOrderDetailsModal(order.id)} className="btn btn-primary">View Details</button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
  
  {/* Pagination and Order Range */}
  <div className="flex justify-between items-center mt-4">
    <div>
      Showing {startOrderIndex} - {endOrderIndex} of {filterOrders().length} orders
    </div>
    <ul className="flex">
      {Array.from({ length: Math.ceil(filterOrders().length / ordersPerPage) }, (_, i) => (
        <li key={i} className="mx-1">
          <button onClick={() => paginate(i + 1)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700">{i + 1}</button>
        </li>
      ))}
    </ul>
  </div>
</div>
    </div>
  );
}

export default () => (
  <Layout>
    <OrderControlPanelPage />
  </Layout>
);
