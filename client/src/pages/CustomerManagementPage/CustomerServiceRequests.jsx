import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { customerServiceRequestsState } from '../../recoil/customerManagement';
import { fetchCustomerServiceRequests } from '../../API/customerManagement';

function CustomerServiceRequests() {
  const [requests, setRequests] = useRecoilState(customerServiceRequestsState);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    fetchCustomerServiceRequests(searchTerm, sortBy, sortOrder)
      .then(setRequests)
      .catch(error => console.error('Error fetching requests:', error));
  }, [searchTerm, sortBy, sortOrder, setRequests]);

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-2">Customer Service Requests</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by description or client name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input mb-2"
        />
        <div className="mb-2">
          <label className="mr-2">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input mr-2"
          >
            <option value="">None</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="input"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Request Date</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Client ID</th>
            <th className="border px-4 py-2">First Name</th>
            <th className="border px-4 py-2">Last Name</th>
            <th className="border px-4 py-2">Gender</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <tr key={request.RequestID} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{request.RequestDate}</td>
              <td className="border px-4 py-2">{request.RequestDescription}</td>
              <td className="border px-4 py-2">{request.ClientID}</td>
              <td className="border px-4 py-2">{request.FirstName}</td>
              <td className="border px-4 py-2">{request.LastName}</td>
              <td className="border px-4 py-2">{request.Gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerServiceRequests;
