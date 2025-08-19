import axios from 'axios';

// Next.js rewrites로 /api를 백엔드(3001)로 프록시합니다.
const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;


