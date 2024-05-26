import React, { useEffect } from 'react';
import Layout from '../../../components/Layout/Layout';
import { useRecoilState } from 'recoil';
import {
  ordersState, searchTermState, selectedStatusState, orderSortByState,
} from '../../../recoil/orderControlPanel';
import { fetchOrders, updateOrderStatus as updateOrderStatusAPI } from '../../../API/vendorOrders';
import OrderDetailsModal from './OrderDetailsModal';
import OrderFilters from './OrderFilters';
import OrderActions from './OrderActions';
import OrderList from './OrderList';
import OrderPagination from './OrderPagination';

function OrderControlPanelPage() {
  const [orders, setOrders] = useRecoilState(ordersState);
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermState);
  const [selectedStatus, setSelectedStatus] = useRecoilState(selectedStatusState);
  const [sortBy, setSortBy] = useRecoilState(orderSortByState);
  const [selectedOrderDetails, setSelectedOrderDetails] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };
    fetchAllOrders();
  }, []);

  const openOrderDetailsModal = (orderId) => {
    const order = orders.find(order => order.id === orderId);
    setSelectedOrderDetails(order);
    setIsModalOpen(true);
  };

  const closeOrderDetailsModal = () => {
    setIsModalOpen(false);
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

  return (
    <Layout>
      <div className="p-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Order Control Panel</h1>

        {isModalOpen && selectedOrderDetails && (
          <OrderDetailsModal order={selectedOrderDetails} closeModal={closeOrderDetailsModal} />
        )}

        <OrderFilters resetFilters={resetFilters} />

        <OrderList
          toggleOrderSelection={(orderId) => {
            if (selectedOrders.includes(orderId)) {
              setSelectedOrders(selectedOrders.filter(id => id !== orderId));
            } else {
              setSelectedOrders([...selectedOrders, orderId]);
            }
          }}
          openOrderDetailsModal={openOrderDetailsModal}
          handleUpdateOrderStatus={handleUpdateOrderStatus}
        />

        <OrderPagination />
      </div>
    </Layout>
  );
}

export default OrderControlPanelPage;
