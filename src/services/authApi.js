import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/auth/login';


export const fetchLogin = async (credentials) => {
  try {
    if (!credentials || typeof credentials !== 'object') {
      throw new Error('Invalid credentials format');
    }

    const response = await axios.post(API_URL, credentials);

    if (!response || !response?.data || response?.data?.error) {
      throw new Error(response?.data?.error || 'Invalid response format');
    }
    
    return response.data;
    
  } catch (error) {
    let errorMessage = 'Error during login request';

    if (error.response) {
      errorMessage = `Server error: ${error.response.status}`;
    } else if (error.request) {
      errorMessage = 'No response received from the server';
    } else if (error.message) {
      errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }
};
