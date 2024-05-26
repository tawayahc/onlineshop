import React from 'react';
import { useRecoilState } from 'recoil';
import { selectedOrdersState, ordersState } from '../../../recoil/orderControlPanel';
import { deleteOrders } from '../../../API/vendorOrders';

const OrderActions = () => {
  const [selectedOrders, setSelectedOrders] = useRecoilState(selectedOrdersState);
  const [orders, setOrders] = useRecoilState(ordersState);

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

  return (
    <div className="mb-2 md:mb-0 md:mr-2">
      <button onClick={deleteSelectedOrders} className="btn btn-danger ml-4 p-2 border rounded-md bg-red-500 text-white w-full md:w-auto">
        Delete Selected
      </button>
    </div>
  );
};

export default OrderActions;
