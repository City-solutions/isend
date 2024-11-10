// apiService.js
import axios from 'axios';

const API_URL = 'https://api.isendxpress.com/api';

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const submitRequest = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/pickup-requests`, formData);
    return response.data;
  } catch (error) {
    console.error("Error submitting request:", error);
    throw error;
  }
};

// New method to fetch delivery status
export const fetchDeliveryStatus = async (deliveryCode) => {
  try {
    console.log(deliveryCode)
    const response = await axios.get(`${API_URL}/pickup-requests/delivery/status`, {
      params: { delivery_code: deliveryCode }
    });
    console.log(response.data.data)
    return response.data.data;  // Adjust according to the actual response structure
  } catch (error) {
    console.error("Error fetching delivery status:", error);
    throw error;
  }
};
