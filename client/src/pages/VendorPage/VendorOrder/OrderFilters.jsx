import React from 'react';
import { useRecoilState } from 'recoil';
import { searchTermState, selectedStatusState, orderSortByState } from '../../../recoil/orderControlPanel';
import OrderActions from './OrderActions';

const OrderFilters = ({ resetFilters }) => {
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermState);
  const [selectedStatus, setSelectedStatus] = useRecoilState(selectedStatusState);
  const [sortBy, setSortBy] = useRecoilState(orderSortByState);

  const statuses = ['All', 'Processing', 'Shipped', 'Delivered'];
  const sortOptions = [
    { value: 'default', label: 'Default' },
    { value: 'orderIdAsc', label: 'Order ID: Ascending' },
    { value: 'orderIdDesc', label: 'Order ID: Descending' },
    { value: 'dateAsc', label: 'Date: Ascending' },
    { value: 'dateDesc', label: 'Date: Descending' },
  ];

  return (
    <div className="mb-4 bg-white p-4 shadow rounded-md flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-2 flex-grow">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by date or product name..."
          className="input mb-2 p-2 border rounded-md flex-grow"
        />
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="input mb-2 p-2 border rounded-md flex-grow"
        >
          {statuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="input mb-2 p-2 border rounded-md flex-grow"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:space-x-2 justify-end">
        <OrderActions />
        <button onClick={resetFilters} className="btn btn-secondary p-2 border rounded-md bg-gray-500 text-white w-full md:w-auto">
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default OrderFilters;
