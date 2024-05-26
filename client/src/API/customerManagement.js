// src/API/customerManagement.js
import axios from 'axios';

const API_URL = 'http://localhost:3333/admin/customer';

export const fetchCustomerReviews = async (search = '', sortBy = '', sortOrder = '') => {
  try {
    const response = await axios.get(`${API_URL}/reviews`, {
      params: { search, sortBy, sortOrder },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

export const fetchCustomerServiceRequests = async (search = '', sortBy = '', sortOrder = '') => {
  try {
    const response = await axios.get(`${API_URL}/requests`, {
      params: { search, sortBy, sortOrder },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching requests:', error);
    throw error;
  }
};
