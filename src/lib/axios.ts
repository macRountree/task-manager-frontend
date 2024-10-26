import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
//*Before every request, we will check if there is a token in the local storage
api.interceptors.request.use(config => {
  const token = localStorage.getItem('LOGIN_TOKEN');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
