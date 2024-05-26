import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { customerReviewsState } from '../../recoil/customerManagement';
import { fetchCustomerReviews } from '../../API/customerManagement';

function CustomerReviews() {
  const [reviews, setReviews] = useRecoilState(customerReviewsState);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    fetchCustomerReviews(searchTerm, sortBy, sortOrder)
      .then(setReviews)
      .catch(error => console.error('Error fetching reviews:', error));
  }, [searchTerm, sortBy, sortOrder, setReviews]);

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-2">Customer Reviews</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by comment or client name"
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
            <option value="pr.Rating">Rating</option>
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
            <th className="border px-4 py-2">Comment</th>
            <th className="border px-4 py-2">Rating</th>
            <th className="border px-4 py-2">Product ID</th>
            <th className="border px-4 py-2">Client ID</th>
            <th className="border px-4 py-2">First Name</th>
            <th className="border px-4 py-2">Last Name</th>
            <th className="border px-4 py-2">Gender</th>
            <th className="border px-4 py-2">DOB</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(review => (
            <tr key={review.ProductReviewID} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{review.Comment}</td>
              <td className="border px-4 py-2">{review.Rating}</td>
              <td className="border px-4 py-2">{review.ProductID}</td>
              <td className="border px-4 py-2">{review.ClientID}</td>
              <td className="border px-4 py-2">{review.FirstName}</td>
              <td className="border px-4 py-2">{review.LastName}</td>
              <td className="border px-4 py-2">{review.Gender}</td>
              <td className="border px-4 py-2">{review.DOB}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerReviews;
