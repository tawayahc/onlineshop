import React, { useEffect } from 'react';
import Layout from '../../../components/Layout/Layout';
import { useRecoilState } from 'recoil';
import { ordersState, searchTermState, selectedStatusState, orderSortByState, orderCurrentPageState, ordersPerPageState, currentOrdersState, selectedOrdersState } from '../../../recoil/orderControlPanel';
import { fetchOrders, updateOrderStatus as updateOrderStatusAPI, deleteOrders } from '../../../API/vendorOrders';
import OrderDetailsModal from './OrderDetailsModal';
import OrderFilters from './OrderFilters';

function OrderControlPanelPage() {
  const [orders, setOrders] = useRecoilState(ordersState);
  const [selectedOrders, setSelectedOrders] = useRecoilState(selectedOrdersState);
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermState);
  const [selectedStatus, setSelectedStatus] = useRecoilState(selectedStatusState);
  const [sortBy, setSortBy] = useRecoilState(orderSortByState);
  const [currentPage, setCurrentPage] = useRecoilState(orderCurrentPageState);
  const [ordersPerPage] = useRecoilState(ordersPerPageState);
  const [currentOrders] = useRecoilState(currentOrdersState);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = React.useState(null);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const data = await fetchOrders(searchTerm, selectedStatus, sortBy);
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };
    fetchAllOrders();
  }, [searchTerm, selectedStatus, sortBy]);

  const openOrderDetailsModal = (orderId) => {
    const order = orders.find(order => order.id === orderId);
    setSelectedOrderDetails(order);
    setIsModalOpen(true);
  };

  const closeOrderDetailsModal = () => {
    setIsModalOpen(false);
  };

  const deleteSelectedOrders = async () => {
    try {
      await deleteOrders(selectedOrders);
      const updatedOrders = orders.filter(order => !selectedOrders.includes(order.id));
      setOrders(updatedOrders);
      setSelectedOrders([]);
    } catch (error) {
      console.error('Failed to delete orders:', error);
    }
  };

  const toggleOrderSelection = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await updateOrderStatusAPI(orderId, newStatus);
      setOrders(orders.map(order => {
        if (order.id === orderId) {
          return { ...order, status: newStatus };
        }
        return order;
      }));
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedStatus('All');
    setSortBy('default');
  };

  const startOrderIndex = (currentPage - 1) * ordersPerPage + 1;
  const endOrderIndex = Math.min(currentPage * ordersPerPage, orders.length);

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Order Control Panel</h1>

        {isModalOpen && selectedOrderDetails && (
          <OrderDetailsModal order={selectedOrderDetails} closeModal={closeOrderDetailsModal} />
        )}

        <OrderFilters resetFilters={resetFilters} />

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
                <th className="border px-4 py-2">Expected Date</th>
                <th className="border px-4 py-2">Total</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => toggleOrderSelection(order.id)}
                    />
                  </td>
                  <td className="border px-4 py-2">{order.id}</td>
                  <td className="border px-4 py-2">{order.expectedDate}</td>
                  <td className="border px-4 py-2">{order.products.reduce((acc, product) => acc + product.price * product.count, 0)}$</td>
                  <td className="border px-4 py-2">
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                      className="input"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <button onClick={() => openOrderDetailsModal(order.id)} className="btn btn-primary">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="flex justify-between items-center mt-4">
            <div>
              Showing {startOrderIndex} - {endOrderIndex} of {orders.length} orders
            </div>
            <ul className="flex">
              {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, i) => (
                <li key={i} className="mx-1">
                  <button onClick={() => setCurrentPage(i + 1)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700">{i + 1}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default OrderControlPanelPage;
