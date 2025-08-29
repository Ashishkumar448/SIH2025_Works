import axios from 'axios';
import { getToken, clearStorage } from '../services/storage';

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Client': 'non-browser'
  }
});

// Request interceptor to add token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearStorage();
      window.location.href = '/auth/sign-in';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
