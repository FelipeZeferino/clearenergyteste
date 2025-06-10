/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Interceptors for request/response
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Example: attach auth token
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle common error cases
//     if (error.response?.status === 401) {
//       console.warn('Unauthorized – maybe redirect to login.');
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
