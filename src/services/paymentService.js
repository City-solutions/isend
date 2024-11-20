import axios from 'axios';

const API_URL = 'https://api.isendxpress.com/api/pay';

export const sendPaymentRequest = async (payload) => {
  try {
    console.log(payload)
    const response = await axios.post(API_URL, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Payment request failed:', error);
    throw error.response ? error.response.data : error;
  }
};

export const checkPaymentStatus = async ({ requestId }) => {
    const response = await axios.post('https://api.isendxpress.com/api/status', { requestId });
    return response.data;
  };