import React, { useEffect, useState } from 'react';
import { fetchProductSummary } from '../../../API/vendorProducts';

function ProductSummaryTable() {
  const [summaryData, setSummaryData] = useState([]);

  useEffect(() => {
    fetchProductSummary()
      .then(data => setSummaryData(data))
      .catch(error => console.error('Error fetching summary data:', error));
  }, []);

  console.log('Summary Data:', summaryData);

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-2">Product Summary</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Product Count</th>
            <th className="border px-4 py-2">Total Price</th>
            <th className="border px-4 py-2">Average Price</th>
            <th className="border px-4 py-2">Total Orders</th>
          </tr>
        </thead>
        <tbody>
          {summaryData.map((data, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{data.ProductCategoryName}</td>
              <td className="border px-4 py-2">{data.productCount}</td>
              <td className="border px-4 py-2">{data.totalPrice}$</td>
              <td className="border px-4 py-2">{data.avgPrice}$</td>
              <td className="border px-4 py-2">{data.totalOrders}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductSummaryTable;
