import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout.jsx';
import CustomerReviews from './CustomerReviews.jsx';
import CustomerServiceRequests from './CustomerServiceRequests.jsx';

function CustomerManagementPage() {
  const [activeTab, setActiveTab] = useState('reviews');

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Customer Management</h1>
        <div className="mb-4">
          <button
            className={`btn ${activeTab === 'reviews' ? 'btn-primary' : 'btn-secondary'} mr-2`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
          <button
            className={`btn ${activeTab === 'requests' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('requests')}
          >
            Service Requests
          </button>
        </div>
        {activeTab === 'reviews' ? <CustomerReviews /> : <CustomerServiceRequests />}
      </div>
    </Layout>
  );
}

export default CustomerManagementPage;